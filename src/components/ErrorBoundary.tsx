import React, { ReactNode } from "react";
import { ErrorFallbackView } from "./ErrorFallbackView";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: undefined };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        console.error("Error caught in ErrorBoundary:", error, info);
    }

    render() {
        const { hasError, error } = this.state;

        if (hasError) {
            return <ErrorFallbackView error={error} />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
