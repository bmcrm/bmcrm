import ReactDOM from 'react-dom/client';
import { useEffect } from 'react';
import { BrowserRouter, useLocation, useNavigationType, createRoutesFromChildren, matchRoutes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import * as Sentry from '@sentry/react';
import { ReactQueryProvider } from '@app/providers/ReactQueryProvider';
import { ErrorBoundary } from '@app/providers/ErrorBoundary';
import App from '@app/App';
import '@app/styles/index.scss';

Sentry.init({
	dsn: import.meta.env.VITE_SENTRY_DSN,
	integrations: [
		Sentry.reactRouterV6BrowserTracingIntegration({
			useEffect,
			useLocation,
			useNavigationType,
			createRoutesFromChildren,
			matchRoutes,
		}),
		Sentry.browserTracingIntegration(),
		Sentry.replayIntegration(),
	],

	tracesSampleRate: 1.0,
	replaysSessionSampleRate: 1.0,
	replaysOnErrorSampleRate: 1.0,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<ErrorBoundary>
			<ReactQueryProvider>
				<App/>
				<Toaster/>
			</ReactQueryProvider>
		</ErrorBoundary>
	</BrowserRouter>
);
