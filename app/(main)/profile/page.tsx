import { UserProfile } from "@/modules/institutes/profile";

export const metadata = {
    title: 'Your Profile | CoachingKart',
    description: 'Manage your personal account settings and preferences.',
};

export default function ProfilePage() {
    return <UserProfile />;
}
