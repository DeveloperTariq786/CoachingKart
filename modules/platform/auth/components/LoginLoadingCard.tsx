// 'use client';

// import React from 'react';
// import Lottie from 'lottie-react';
// import pulseAnimation from '@/public/animation/finding.json';

// interface LoginLoadingCardProps {
//     variant?: 'session' | 'redirect';
// }

// const PulseLoader: React.FC<{ size?: number }> = ({ size = 72 }) => (
//     <Lottie animationData={pulseAnimation} loop autoplay style={{ width: size, height: size }} />
// );

// export const LoginLoadingCard: React.FC<LoginLoadingCardProps> = ({ variant = 'session' }) => {
//     const isRedirect = variant === 'redirect';

//     return (
//         <main className="flex min-h-screen items-center justify-center bg-primary-50 px-6">
//             <div
//                 className={`relative w-full max-w-sm overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)] animate-in fade-in zoom-in-95 duration-500 ${
//                     isRedirect ? 'ring-1 ring-emerald-100' : ''
//                 }`}
//             >
//                 <div
//                     className={`absolute inset-0 ${
//                         isRedirect
//                             ? 'bg-gradient-to-br from-emerald-50/60 via-white to-primary-50/30'
//                             : 'bg-gradient-to-br from-primary-50/40 via-white to-slate-50/40'
//                     }`}
//                 />
//                 <div
//                     className={`absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl ${
//                         isRedirect ? 'bg-emerald-100/70' : 'bg-primary-100/60'
//                     }`}
//                 />

//                 <div className="relative z-10 flex flex-col items-center px-8 py-12">
//                     <PulseLoader size={72} />
//                     <p className="mt-4 text-sm font-semibold text-slate-700">
//                         {isRedirect ? 'Taking you to your courses…' : 'Checking your session…'}
//                     </p>
//                     <p className="mt-1 text-xs font-medium text-slate-400">Just a moment</p>
//                 </div>
//             </div>
//         </main>
//     );
// };

// export default LoginLoadingCard;
