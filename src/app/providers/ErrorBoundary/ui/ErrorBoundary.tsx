import { Component, type ErrorInfo, type ReactNode, Suspense } from 'react';
import { PageError } from 'widgets/PageError';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log(error, info.componentStack);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) return <Suspense><PageError/></Suspense>;

    return children;
  }
}

export default ErrorBoundary;