import { Component, PropsWithChildren, ReactNode } from "react";

interface ErrorBoundaryProps {
    fallback?: ReactNode;
    renderFallback?: ((error: Error) => ReactNode);
}

interface ErrorBoundaryState {
    error?: Error;
}

export class ErrorBoundary extends Component<PropsWithChildren<ErrorBoundaryProps>, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { error: undefined };
    }
    static defaultProps = {
        fallback: null,
    };
    static getDerivedStateFromError(error: unknown) {
        return { error };
    }
    componentDidCatch(error: unknown, errorInfo: unknown) {
        console.log(error, errorInfo);
    }
    render() {
        if (this.state.error) {
            return this.props.fallback ?? this.props.renderFallback?.(this.state.error) ?? null;
        }
        return this.props.children;
    }
}
