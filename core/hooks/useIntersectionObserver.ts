import { useEffect, useRef, useState, RefObject } from 'react';

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
    triggerOnce?: boolean;
}

export function useIntersectionObserver<T extends HTMLElement>(
    options: UseIntersectionObserverOptions = { triggerOnce: true, threshold: 0.1 }
): [RefObject<T | null>, boolean] {
    const [isIntersecting, setIntersecting] = useState(false);
    const targetRef = useRef<T>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIntersecting(true);
                if (options.triggerOnce && targetRef.current) {
                    observer.unobserve(targetRef.current);
                }
            } else if (!options.triggerOnce) {
                setIntersecting(false);
            }
        }, options);

        const currentTarget = targetRef.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        };
    }, [options.threshold, options.root, options.rootMargin, options.triggerOnce]);

    return [targetRef, isIntersecting];
}
