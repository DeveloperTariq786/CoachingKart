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

            // Check cache even if not in view to avoid stuck shimmer
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
                console.error("Error fetching institution centers:", error);
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-600 px-4 py-2 rounded-full text-sm font-bold mb-4">
                        <MapPin size={16} />
                        <span>Our Centers</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Visit Our Centers
                    </h2>
                    <p className="text-slate-500 max-w-xl mx-auto text-base md:text-lg">
                        <span className="font-semibold text-primary-600">{institutionName}</span> has {isLoading ? '...' : totalCenters} convenient {totalCenters === 1 ? 'location' : 'locations'} to serve you.
                    </p>
                </div>

                {/* Centers Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {isLoading ? (
                        [...Array(4)].map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-slate-100 h-[320px]">
                                <Skeleton className="w-full aspect-video bg-slate-200 rounded-none" />
                                <div className="p-5">
                                    <Skeleton className="h-6 w-3/4 mb-4 bg-slate-200" />
                                    <div className="space-y-3">
                                        <Skeleton className="h-4 w-full bg-slate-200" />
                                        <Skeleton className="h-4 w-1/2 bg-slate-200" />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        centers.map((center) => (
                            <div
                                key={center.id}
                                onClick={() => handleMapClick(center.location?.latitude, center.location?.longitude)}
                                className={`group bg-background rounded-2xl overflow-hidden border border-slate-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300 ${center.location ? 'cursor-pointer' : ''}`}
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
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                    <div className="absolute bottom-4 left-4">
                                        <h3 className="text-white font-bold text-xl drop-shadow-lg">
                                            {center.name}
                                        </h3>
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="p-5">
                                    <div className="flex flex-col gap-3 text-sm text-slate-600">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 shrink-0">
                                                <MapPin size={14} />
                                            </div>
                                            <span className="line-clamp-2">
                                                {center.location
                                                    ? `${center.location.address}, ${center.location.city}, ${center.location.state}`
                                                    : 'Address not available'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 shrink-0">
                                                <Phone size={14} />
                                            </div>
                                            <span>{center.phone}</span>
                                        </div>
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
