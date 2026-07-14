'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/core/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

export default function InstitutionNotFound() {
  const params = useParams();
  const slug = params?.slug as string;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white text-center px-4">
      <div className="space-y-6 max-w-md">
        <h1 className="text-8xl font-bold text-primary-500">404</h1>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-900">Content Not Found</h2>
          <p className="text-gray-500">
            The page you are looking for does not exist within this institution or has been moved.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center">
          <Button asChild variant="outline" className="rounded-full px-6 transition-all hover:bg-gray-50">
            <Link href={`/${slug}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Institution
            </Link>
          </Button>
          <Button asChild className="rounded-full px-6 transition-all hover:scale-105">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go to CoachingKart
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
