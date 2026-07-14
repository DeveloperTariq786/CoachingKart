'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { MapPin, Phone } from 'lucide-react';
import { Skeleton } from '@/core/components/ui/skeleton';
import { institutionCenterService } from '../services/center.service';
import { InstitutionCenter } from '../types/center.types';
import { useCenterStore } from '../store/useCenterStore';
import { useIntersectionObserver } from '@/core/hooks/useIntersectionObserver';

interface InstitutionCentersProps {
    institutionName?: string;
    institutionId?: string;
}

const InstitutionCenters: React.FC<InstitutionCentersProps> = ({
    institutionName = 'Elite Academy',
    institutionId
}) => {
    const { centersCache, setCenters: setCentersCache } = useCenterStore();
    const [sectionRef, isInView] = useIntersectionObserver<HTMLElement>();

    const cachedData = institutionId ? centersCache[institutionId] : null;
    const [centers, setCenters] = useState<InstitutionCenter[]>(
        cachedData ? cachedData.centers : []
    );
    const [totalCenters, setTotalCenters] = useState<number>(
        cachedData ? cachedData.total : 0
    );
    const [isLoading, setIsLoading] = useState(!cachedData);

    useEffect(() => {
        const fetchCenters = async () => {
            if (!institutionId) return;

            const cached = centersCache[institutionId];
            if (cached) {
                setCenters(cached.centers);
                setTotalCenters(cached.total);
                setIsLoading(false);
                return;
            }

            if (!isInView) return;

            try {
                setIsLoading(true);
                const response = await institutionCenterService.getInstitutionCenters(institutionId);
                if (response.success) {
                    setCenters(response.data.centers);
                    setTotalCenters(response.data.totalCenters);
                    setCentersCache(institutionId, response.data.centers, response.data.totalCenters);
                }
            } catch (error) {
                console.error('Error fetching institution centers:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCenters();
    }, [institutionId, centersCache, setCentersCache, isInView]);

    const handleMapClick = (lat?: number, lng?: number) => {
        if (lat !== undefined && lng !== undefined && lat !== null && lng !== null) {
            window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank');
        }
    };

    return (
        <section ref={sectionRef} className="py-16 md:py-20 bg-background min-h-[400px]">
            <div className="w-full px-4 sm:px-6 lg:px-10">

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-white border border-primary-100 shadow-sm text-primary-600 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide mb-4">
                        <MapPin size={16} />
                        <span>Locations</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                        Explore Our <span className="text-primary-600">Centers</span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-sm md:text-base text-slate-500 text-center md:whitespace-nowrap">
                        <span className="font-semibold text-primary-600">
                            {institutionName}
                        </span>{' '}
                        has {isLoading ? '...' : totalCenters} convenient{' '}
                        {totalCenters === 1 ? 'location' : 'locations'} to serve you.
                    </p>
                </div>

                {/* Centers Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {isLoading ? (
                        [...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-xl overflow-hidden border border-slate-100 h-[300px]"
                            >
                                <Skeleton className="w-full aspect-video bg-slate-100 rounded-none" />
                                <div className="p-4 space-y-4">
                                    <Skeleton className="h-4 w-2/3 bg-slate-100" />
                                    <div className="space-y-2.5">
                                        <Skeleton className="h-3.5 w-full bg-slate-100" />
                                        <Skeleton className="h-3.5 w-3/4 bg-slate-100" />
                                        <div className="pt-1 border-t border-slate-100">
                                            <Skeleton className="h-3.5 w-1/2 bg-slate-100 mt-2.5" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        centers.map((center) => (
                            <div
                                key={center.id}
                                onClick={() =>
                                    handleMapClick(
                                        center.location?.latitude,
                                        center.location?.longitude
                                    )
                                }
                                className={`
                                    group bg-background rounded-xl overflow-hidden
                                    border border-slate-100
                                    hover:border-primary-200 hover:shadow-md
                                    transition-all duration-200
                                    ${center.location ? 'cursor-pointer' : ''}
                                `}
                            >
                                {/* Image */}
                                <div className="relative w-full aspect-video overflow-hidden">
                                    <Image
                                        src={center.image}
                                        alt={center.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                                    <div className="absolute bottom-3 left-3.5">
                                        <h3 className="text-white font-semibold text-base drop-shadow">
                                            {center.name}
                                        </h3>
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="p-4 flex flex-col gap-0">
                                    {/* Address row */}
                                    <div className="flex items-start gap-2.5 py-3">
                                        <div className="w-7 h-7 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 shrink-0 mt-0.5">
                                            <MapPin size={13} />
                                        </div>
                                        <span className="text-[13px] text-slate-500 leading-snug line-clamp-2">
                                            {center.location
                                                ? `${center.location.address}, ${center.location.city}, ${center.location.state}`
                                                : 'Address not available'}
                                        </span>
                                    </div>

                                    {/* Divider */}
                                    <div className="border-t border-slate-100" />

                                    {/* Phone row */}
                                    <div className="flex items-center gap-2.5 py-3">
                                        <div className="w-7 h-7 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 shrink-0">
                                            <Phone size={13} />
                                        </div>
                                        <span className="text-[13px] text-slate-500">
                                            {center.phone}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default InstitutionCenters;