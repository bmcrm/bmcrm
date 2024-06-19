import { AppRouter } from 'app/providers/AppRouter';
import * as Sentry from '@sentry/react';

const App = () => {
  return (
    <div className='app'>
      <AppRouter />
    </div>
  );
};

export default Sentry.withProfiler(App);
