'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { routes, protectedRoutes } from '@/resources';
import {
	Flex,
	Spinner,
	Button,
	Heading,
	Column,
	PasswordInput
} from '@once-ui-system/core';
import NotFound from '@/app/not-found';

interface RouteGuardProps {
	children: React.ReactNode;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
	const pathname = usePathname();
	const [isRouteEnabled, setIsRouteEnabled] = useState(false);
	const [isPasswordRequired, setIsPasswordRequired] = useState(false);
	const [password, setPassword] = useState('');
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [error, setError] = useState<string | undefined>(undefined);
	const [loading, setLoading] = useState(true);
	const [mounted, setMounted] = useState(false);
	const abortControllerRef = useRef<AbortController | null>(null);
	const isMountedRef = useRef(false);

	useEffect(() => {
		setMounted(true);
		isMountedRef.current = true;

		// Cleanup function
		return () => {
			isMountedRef.current = false;
			if (abortControllerRef.current) {
				abortControllerRef.current.abort();
			}
		};
	}, []);

	useEffect(() => {
		// Cancel any previous operations
		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
		}

		// Create new abort controller for this pathname
		abortControllerRef.current = new AbortController();
		const currentController = abortControllerRef.current;

		const performChecks = async () => {
			if (!isMountedRef.current) return;

			setLoading(true);
			setIsRouteEnabled(false);
			setIsPasswordRequired(false);
			setIsAuthenticated(false);

			const checkRouteEnabled = () => {
				if (!pathname) return false;

				if (pathname in routes) {
					return routes[pathname as keyof typeof routes];
				}

				const dynamicRoutes = ['/blog', '/work'] as const;
				for (const route of dynamicRoutes) {
					if (pathname?.startsWith(route) && routes[route]) {
						return true;
					}
				}

				return false;
			};

			const routeEnabled = checkRouteEnabled();
			if (!isMountedRef.current) return;
			setIsRouteEnabled(routeEnabled);

			if (protectedRoutes[pathname as keyof typeof protectedRoutes]) {
				if (!isMountedRef.current) return;
				setIsPasswordRequired(true);

				try {
					const response = await fetch('/api/check-auth', {
						signal: currentController.signal
					});

					if (currentController.signal.aborted) return;

					if (response.ok && isMountedRef.current) {
						setIsAuthenticated(true);
					}
				} catch (error: any) {
					if (error.name === 'AbortError') {
						// Request was cancelled, ignore
						return;
					}
					console.error('Auth check failed:', error);
				}
			}

			if (isMountedRef.current) {
				setLoading(false);
			}
		};

		performChecks();

		// Cleanup for this effect
		return () => {
			if (currentController) {
				currentController.abort();
			}
		};
	}, [pathname]);

	const handlePasswordSubmit = async () => {
		if (!isMountedRef.current) return;

		// Create new abort controller for password submission
		const controller = new AbortController();

		try {
			const response = await fetch('/api/authenticate', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ password }),
				signal: controller.signal
			});

			if (controller.signal.aborted) return;

			if (response.ok && isMountedRef.current) {
				setIsAuthenticated(true);
				setError(undefined);
			} else if (isMountedRef.current) {
				setError('Incorrect password');
			}
		} catch (error: any) {
			if (error.name === 'AbortError') {
				// Request was cancelled, ignore
				return;
			}
			if (isMountedRef.current) {
				setError('Authentication failed');
			}
		}
	};

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

	if (isPasswordRequired && !isAuthenticated) {
		return (
			<Column
				paddingY='128'
				maxWidth={24}
				gap='24'
				center>
				<Heading
					align='center'
					wrap='balance'>
					This page is password protected
				</Heading>
				<Column
					fillWidth
					gap='8'
					horizontal='center'>
					<PasswordInput
						id='password'
						label='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						errorMessage={error}
					/>
					<Button onClick={handlePasswordSubmit}>Submit</Button>
				</Column>
			</Column>
		);
	}

	return <>{children}</>;
};

export { RouteGuard };
