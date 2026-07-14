'use client';

import React, { Suspense } from 'react';
import { PaymentSimulation } from '@/modules/institutes/payment/components/PaymentSimulation';
import { Loader2 } from 'lucide-react';

export default function PaymentPage() {
    return (
        <div className="bg-background flex min-h-screen items-center justify-center py-16">
            <div className="relative w-full overflow-hidden">
                <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 flex justify-center">
                    <div className="h-64 w-full max-w-5xl rounded-full bg-primary-100/50 blur-3xl" />
                </div>

                <div className="mx-auto flex w-full max-w-xl flex-col gap-10 px-6 sm:px-8">

                    <Suspense fallback={
                        <div className="mx-auto flex min-h-[360px] w-full flex-col items-center justify-center gap-4 rounded-[2rem] border border-primary-100 bg-background/95 px-6 text-center shadow-[0_24px_80px_-32px_rgba(15,23,42,0.25)]">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
                                <Loader2 className="h-7 w-7 animate-spin" />
                            </div>
                            <p className="text-sm font-semibold text-slate-600">Loading payment details...</p>
                        </div>
                    }>
                        <PaymentSimulation />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}