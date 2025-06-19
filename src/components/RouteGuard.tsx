'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { routes } from '@/resources';
import { Flex, Spinner } from '@once-ui-system/core';
import NotFound from '@/app/not-found';

interface RouteGuardProps {
	children: React.ReactNode;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
	const pathname = usePathname();
	const [isRouteEnabled, setIsRouteEnabled] = useState(false);
	const [loading, setLoading] = useState(true);
	const [mounted, setMounted] = useState(false);
	const isMountedRef = useRef(false);

	useEffect(() => {
		setMounted(true);
		isMountedRef.current = true;

		// Cleanup function
		return () => {
			isMountedRef.current = false;
		};
	}, []);

	useEffect(() => {
		const checkRouteEnabled = () => {
			if (!pathname) return false;

			if (pathname in routes) {
				return routes[pathname as keyof typeof routes];
			}

			const dynamicRoutes = ['/work'] as const;
			for (const route of dynamicRoutes) {
				if (pathname?.startsWith(route) && routes[route]) {
					return true;
				}
			}

			return false;
		};

		if (!isMountedRef.current) return;

		setLoading(true);
		const routeEnabled = checkRouteEnabled();
		setIsRouteEnabled(routeEnabled);
		setLoading(false);
	}, [pathname]);

	// During hydration, render children to match SSR
	if (!mounted) {
		return <>{children}</>;
	}

	if (loading) {
		return (
			<Flex
				fillWidth
				paddingY='128'
				horizontal='center'>
				<Spinner />
			</Flex>
		);
	}

	if (!isRouteEnabled) {
		return <NotFound />;
	}

	return <>{children}</>;
};

export { RouteGuard };
