import React, { ErrorInfo, ReactNode } from "react";
import { InvalidateQueryFilters, QueryClient, useQueryClient } from "@tanstack/react-query";

type ErrorFallbackProps = {
  resetErrorBoundary: () => void;
};

type ErrorFallbackType = (props: ErrorFallbackProps) => ReactNode;

type ErrorBoundaryProps = {
  fallback?: ErrorFallbackType;
  children: ReactNode;
  queryKey?: InvalidateQueryFilters;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
};

type ErrorBoundaryClassProps = ErrorBoundaryProps & {
  queryClient: QueryClient;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

const initialState: State = { hasError: false, error: null };

function DefaultFallback({ resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="text-center">
      <p className="text-14">데이터 불러오기에 실패했어요.</p>
      <p className="text-14">잠시 후 다시 시도해주세요.</p>
      <button
        className="mt-10 h-34 w-80 rounded-6 bg-brand-primary text-14 font-semibold"
        onClick={resetErrorBoundary}
      >
        새로고침
      </button>
    </div>
  );
}

class ErrorBoundaryClass extends React.Component<ErrorBoundaryClassProps, State> {
  constructor(props: ErrorBoundaryClassProps) {
    super(props);
    this.state = initialState;
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    const { onError } = this.props;
    onError?.(error, errorInfo);
  }

  resetErrorBoundary = (): void => {
    const { queryClient, queryKey } = this.props;
    if (queryKey) {
      queryClient.invalidateQueries(queryKey);
    }
    this.setState(initialState);
  };

  render(): ReactNode {
    const { hasError, error } = this.state;
    const { fallback = DefaultFallback, children } = this.props;

    if (hasError && error) {
      return fallback({ resetErrorBoundary: this.resetErrorBoundary });
    }

    return children;
  }
}

function ErrorBoundary(props: ErrorBoundaryProps) {
  const queryClient = useQueryClient();
  return <ErrorBoundaryClass {...props} queryClient={queryClient} />;
}

export default ErrorBoundary;
