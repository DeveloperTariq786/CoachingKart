import Link from 'next/link';
import { Button } from '@/core/components/ui/button';
import { Home } from 'lucide-react';

export default function GlobalNotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4">
            <div className="space-y-6 max-w-md">
                <h1 className="text-9xl font-bold text-primary-500">404</h1>
                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold text-gray-900">Page Not Found</h2>
                    <p className="text-gray-500">
                        Oops! The page you are looking for does not exist or has been moved.
                    </p>
                </div>
                <div className="pt-4">
                    <Button asChild className="rounded-full px-8 h-12 text-base font-medium transition-all hover:scale-105">
                        <Link href="/">
                            <Home className="mr-2 h-5 w-5" />
                            Back to Home
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
