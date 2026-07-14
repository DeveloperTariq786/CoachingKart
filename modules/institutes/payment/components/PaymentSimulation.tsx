'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/core/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/core/components/ui/card';
import { Loader2, CheckCircle2, AlertCircle, ShieldCheck, ArrowLeft, GraduationCap, ArrowRight } from 'lucide-react';
import { paymentService } from '../services/payment.service';
import { useInstitute } from '@/modules/institutes/institute/hooks/useInstitute';
import { useBatchSubjects } from '@/modules/institutes/lectures/hooks/useBatchSubjects';
import { toast } from 'sonner';
import { cn } from '@/core/lib/utils/utils';

export const PaymentSimulation: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { details, slug: instituteSlug } = useInstitute();

    const batchId = searchParams.get('batchId');
    const slug = searchParams.get('slug');
    const batchNameFromUrl = searchParams.get('batchName');
    const resolvedSlug = instituteSlug || slug;

    const { data: batchData, isLoading: isBatchLoading } = useBatchSubjects(batchId || undefined);

    const [status, setStatus] = useState<'idle' | 'applying' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [secondsLeft, setSecondsLeft] = useState(10);

    useEffect(() => {
        if (!batchId) {
            setErrorMessage('Missing batch information');
            setStatus('error');
        }
    }, [batchId]);

    useEffect(() => {
        if (status !== 'success') return;

        setSecondsLeft(10);
        const interval = setInterval(() => {
            setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, [status]);

    const goToBatches = () => {
        router.back();
    };

    const handlePayment = async () => {
        if (!batchId) return;

        setStatus('applying');

        try {
            const response = await paymentService.applyForBatch({ batchId });

            if (response.success) {
                setStatus('success');
                toast.success('Enrollment successful!');

                setTimeout(() => {
                    goToBatches();
                }, 10000);
            } else {
                setStatus('error');
                setErrorMessage(response.message || 'Failed to apply for batch');
            }
        } catch (err: any) {
            setStatus('error');
            setErrorMessage(err.response?.data?.message || 'An error occurred during enrollment');
        }
    };

    const institutionName = details?.name || 'Institution';
    const institutionLogo = details?.logo;
    const batchName = batchNameFromUrl || batchData?.batch?.name || (batchId ? `${batchId.slice(0, 8)}...` : 'Unavailable');

    if (status === 'error') {
        return (
            <Card className="mx-auto w-full max-w-md overflow-hidden rounded-3xl border-rose-100 bg-background shadow-lg animate-in fade-in zoom-in-95 duration-500">
                <div className="h-1.5 bg-rose-500" />
                <CardContent className="flex flex-col items-center px-8 pt-10 pb-8 text-center">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
                        <AlertCircle className="h-7 w-7" />
                    </div>
                    <CardTitle className="mb-2 text-xl font-bold text-foreground">Enrollment Failed</CardTitle>
                    <CardDescription className="mb-8 text-sm leading-6 text-slate-500">{errorMessage}</CardDescription>
                    <Button
                        onClick={() => router.back()}
                        variant="outline"
                        className="h-11 w-full rounded-xl font-semibold"
                    >
                        <ArrowLeft size={16} className="mr-2" />
                        Back to Batches
                    </Button>
                </CardContent>
            </Card>
        );
    }

    if (status === 'success') {
        return (
            <Card className="mx-auto w-full max-w-md overflow-hidden rounded-3xl border-emerald-100 bg-background shadow-lg animate-in fade-in zoom-in-95 duration-500">
                <div className="h-1.5 bg-emerald-500" />
                <CardContent className="flex flex-col items-center px-8 pt-10 pb-8 text-center">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500">
                        <CheckCircle2 className="h-7 w-7" />
                    </div>
                    <CardTitle className="mb-2 text-xl font-bold text-foreground">Request Submitted</CardTitle>
                    <CardDescription className="mb-8 text-sm leading-6 text-slate-500">
                        Please wait for admin approval to access this batch. You&apos;ll be notified once it&apos;s approved.
                    </CardDescription>
                    <Button
                        onClick={goToBatches}
                        className="h-12 w-full rounded-xl bg-primary-600 text-sm font-bold text-white shadow-md transition-all hover:bg-primary-700 active:scale-[0.99]"
                    >
                        Explore Batches
                    </Button>
                    <p className="mt-4 text-xs font-medium text-slate-400">
                        Redirecting automatically in {secondsLeft}s&hellip;
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="mx-auto w-full max-w-md overflow-hidden rounded-3xl border-primary-100/70 bg-background shadow-lg animate-in fade-in slide-in-from-bottom-8 duration-700">
            <CardHeader className="px-7 pb-4 pt-7 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-primary-100 bg-primary-50 text-primary-600">
                    {institutionLogo ? (
                        <Image
                            src={institutionLogo}
                            alt={institutionName}
                            width={56}
                            height={56}
                            className="h-full w-full object-contain"
                        />
                    ) : (
                        <GraduationCap size={24} className="stroke-[2.5]" />
                    )}
                </div>
                {/* <CardTitle className="text-xl font-bold text-foreground">Confirm Your Enrollment</CardTitle> */}
                <CardDescription className="mt-1 text-sm leading-6 text-slate-500 pt-8">
                   You&apos;re joining <span className="font-semibold text-slate-500">{batchName}</span> at <span className="font-semibold text-slate-500">{institutionName}</span>. Click to Confirm your enrollment.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5 px-7 pb-7">
                <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
                    <div className="flex items-center justify-between text-sm">
                        <span className=" font-semibold">Institution</span>
                        <span className="font-semibold text-slate-500">{institutionName}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold">Batch name</span>
                        <span className="font-semibold text-slate-500">
                            {isBatchLoading && !batchNameFromUrl ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (   
                                batchName
                            )}
                        </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold">Approval Required</span>
                        <span className="font-semibold text-slate-500">Institute Admin</span>
                    </div>
                </div>

                <Button
    onClick={handlePayment}
    className={cn(
        'h-12 w-full rounded-xl bg-primary-600 text-sm font-bold text-white shadow-md transition-all hover:bg-primary-700 active:scale-[0.99]',
        status !== 'idle' && 'cursor-not-allowed'
    )}
    disabled={status !== 'idle'}
>
    {status === 'idle' ? (
        <div className="flex items-center justify-center gap-2">
            <span>Enroll</span>
            <ArrowRight className="h-4 w-4" />
        </div>
    ) : (
        <div className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Enrolling...</span>
        </div>
    )}
</Button>

                <p className="text-center text-xs leading-5 text-slate-400">
                    By confirming, you agree to <span className="font-semibold text-foreground">{institutionName}</span>&apos;s Terms of Service and Privacy Policy.
                </p>
            </CardContent>
        </Card>
    );

};