import type { ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '../config/queryClient';

type ReactQueryProviderProps = {
	children: ReactNode;
	isDevtools?: boolean;
};

const ReactQueryProvider = ({ children, isDevtools = true }: ReactQueryProviderProps) => (
	<QueryClientProvider client={queryClient}>
		{children}
		{isDevtools && (
			<ReactQueryDevtools initialIsOpen={false} buttonPosition={'bottom-left'} />
		)}
	</QueryClientProvider>
);

export default ReactQueryProvider;