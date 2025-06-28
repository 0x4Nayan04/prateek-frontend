'use client';

import {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
	Suspense
} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface FilterState {
	techStack: string[];
	industry: string[];
}

interface FilterContextType {
	filters: FilterState;
	setFilters: (filters: FilterState) => void;
	clearFilters: () => void;
	removeFilter: (type: 'techStack' | 'industry', value: string) => void;
	activeFilterCount: number;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function useFilters() {
	const context = useContext(FilterContext);
	if (!context) {
		throw new Error('useFilters must be used within a FilterProvider');
	}
	return context;
}

interface FilterProviderProps {
	children: ReactNode;
}

function FilterProviderInner({ children }: FilterProviderProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [filters, setFiltersState] = useState<FilterState>({
		techStack: [],
		industry: []
	});

	// Initialize filters from URL on mount
	useEffect(() => {
		const techStackParam = searchParams.get('techStack');
		const industryParam = searchParams.get('industry');

		const initialFilters: FilterState = {
			techStack: techStackParam ? techStackParam.split(',') : [],
			industry: industryParam ? industryParam.split(',') : []
		};

		setFiltersState(initialFilters);
	}, [searchParams]);

	// Update URL when filters change
	const updateURL = (newFilters: FilterState) => {
		const params = new URLSearchParams();

		if (newFilters.techStack.length > 0) {
			params.set('techStack', newFilters.techStack.join(','));
		}

		if (newFilters.industry.length > 0) {
			params.set('industry', newFilters.industry.join(','));
		}

		const query = params.toString();
		const newURL = query ? `?${query}` : window.location.pathname;

		router.push(newURL, { scroll: false });
	};

	const setFilters = (newFilters: FilterState) => {
		setFiltersState(newFilters);
		updateURL(newFilters);
	};

	const clearFilters = () => {
		const clearedFilters = { techStack: [], industry: [] };
		setFiltersState(clearedFilters);
		updateURL(clearedFilters);
	};

	const removeFilter = (type: 'techStack' | 'industry', value: string) => {
		const newFilters = {
			...filters,
			[type]: filters[type].filter((item) => item !== value)
		};
		setFilters(newFilters);
	};

	const activeFilterCount = filters.techStack.length + filters.industry.length;

	return (
		<FilterContext.Provider
			value={{
				filters,
				setFilters,
				clearFilters,
				removeFilter,
				activeFilterCount
			}}>
			{children}
		</FilterContext.Provider>
	);
}

export function FilterProvider({ children }: FilterProviderProps) {
	return (
		<Suspense fallback={<div>{children}</div>}>
			<FilterProviderInner>{children}</FilterProviderInner>
		</Suspense>
	);
}
