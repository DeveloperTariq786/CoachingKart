import { ShieldCheck, MonitorPlay, Zap, Users, LucideIcon } from 'lucide-react';

/**
 * Trust Feature Interface
 */
export interface TrustFeature {
    icon: LucideIcon;
    color: 'blue' | 'indigo' | 'amber' | 'emerald';
    title: string;
    description: string;
}

/**
 * Trust Features Data
 */
export const TRUST_FEATURES: TrustFeature[] = [
    {
        icon: ShieldCheck,
        color: "blue",
        title: "Verified Institutes",
        description: "Every center listed is physically verified to ensure safety and quality education for students."
    },
    {
        icon: MonitorPlay,
        color: "indigo",
        title: "Hybrid Advantage",
        description: "The best of both worlds: Personalized offline attention + 24/7 online resource access."
    },
    {
        icon: Zap,
        color: "amber",
        title: "Instant Updates",
        description: "Never miss a class update. Get SMS and App notifications for schedule changes or tests."
    },
    {
        icon: Users,
        color: "emerald",
        title: "Community Focused",
        description: "Built specifically to support local tuition centers and help them compete with ed-tech giants."
    }
];
