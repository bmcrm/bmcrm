import type { ReactElement } from 'react';
import * as Sentry from '@sentry/react';

type ProfiledAppProps = {
	element: ReactElement;
}

const SentryProfiler = ({ element }: ProfiledAppProps) => {
	const Profiler = Sentry.withProfiler(() => element);
	return <Profiler />;
};

export default SentryProfiler;