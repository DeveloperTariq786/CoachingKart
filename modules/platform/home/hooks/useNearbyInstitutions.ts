'use client';

import { useQuery } from '@tanstack/react-query';
import { useState, useEffect, useCallback } from 'react';
import { institutionService } from '@/modules/platform/institutions/services/institution.service';
import { NearMeInstitution } from '@/modules/platform/institutions/types/institution.types';

interface UserCoordinates {
    latitude: number;
    longitude: number;
}

type LocationStatus = 'idle' | 'loading' | 'granted' | 'denied' | 'error';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
const STORAGE_KEY = 'coachingkart_user_coords';

/* ── LocalStorage helpers ──────────────────────────────────────── */
function getSavedCoordinates(): UserCoordinates | null {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (parsed?.latitude && parsed?.longitude) return parsed;
        return null;
    } catch {
        return null;
    }
}

function saveCoordinates(coords: UserCoordinates) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(coords));
    } catch {
        // silently fail
    }
}

/* ── Google Maps fallback ──────────────────────────────────────── */
async function getLocationFromGoogleMaps(): Promise<UserCoordinates> {
    const response = await fetch(
        `https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_MAPS_API_KEY}`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) }
    );
    if (!response.ok) throw new Error('Google Maps Geolocation failed');
    const data = await response.json();
    return { latitude: data.location.lat, longitude: data.location.lng };
}

/* ── useUserLocation hook ──────────────────────────────────────── */
function useUserLocation(shouldFetch: boolean) {
    const [coordinates, setCoordinates] = useState<UserCoordinates | null>(null);
    const [status, setStatus] = useState<LocationStatus>('idle');

    // On mount, try to load cached coordinates immediately
    useEffect(() => {
        const cached = getSavedCoordinates();
        if (cached) {
            setCoordinates(cached);
            setStatus('granted');
        }
    }, []);

    const fetchLocation = useCallback(async () => {
        if (!shouldFetch || status === 'loading') return;
        // If we already have cached coords, still try to refresh silently
        // but don't block the UI

        setStatus((prev) => (prev === 'granted' ? 'granted' : 'loading'));

        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const coords = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    };
                    setCoordinates(coords);
                    saveCoordinates(coords);
                    setStatus('granted');
                },
                async () => {
                    // Browser geolocation failed – try Google Maps API
                    try {
                        const coords = await getLocationFromGoogleMaps();
                        setCoordinates(coords);
                        saveCoordinates(coords);
                        setStatus('granted');
                    } catch {
                        // If we already have cached coords, keep using them
                        if (!coordinates) {
                            setStatus('denied');
                        }
                    }
                },
                { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 }
            );
        } else {
            try {
                const coords = await getLocationFromGoogleMaps();
                setCoordinates(coords);
                saveCoordinates(coords);
                setStatus('granted');
            } catch {
                if (!coordinates) {
                    setStatus('error');
                }
            }
        }
    }, [shouldFetch, status, coordinates]);

    // Trigger fresh location fetch when section becomes visible
    useEffect(() => {
        if (shouldFetch && status !== 'loading') {
            fetchLocation();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shouldFetch]);

    // Manual trigger for the "Allow Location" button
    const requestLocation = useCallback(() => {
        setStatus('idle');
        // Small delay to let state update, then fetch
        setTimeout(() => fetchLocation(), 50);
    }, [fetchLocation]);

    return { coordinates, status, requestLocation };
}

/* ── useNearbyInstitutions hook ────────────────────────────────── */
export const useNearbyInstitutions = (isVisible: boolean) => {
    const { coordinates, status: locationStatus, requestLocation } = useUserLocation(isVisible);

    const hasCoords = !!coordinates;
    const isResolved = locationStatus === 'granted' || locationStatus === 'denied' || locationStatus === 'error';

    const query = useQuery({
        queryKey: ['nearby-institutions', coordinates?.latitude ?? 'none', coordinates?.longitude ?? 'none'],
        queryFn: () => {
            // If user never gave location, call without lat/long/radius
            if (!coordinates) {
                return institutionService.getNearMeInstitutions({ limit: 4 });
            }
            return institutionService.getNearMeInstitutions({
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                radius: 50,
                limit: 4,
            });
        },
        enabled: isResolved,
        staleTime: 1000 * 60 * 10, // 10 minutes
        retry: 1,
        select: (data) => data.data,
    });

    return {
        institutions: (query.data ?? []) as NearMeInstitution[],
        isLoading: locationStatus === 'loading' || (isResolved && query.isLoading),
        isError: query.isError,
        locationDenied: locationStatus === 'denied',
        locationStatus,
        requestLocation,
    };
};
