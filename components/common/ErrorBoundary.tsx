import { Component, PropsWithChildren, ReactNode } from "react";

interface ErrorBoundaryProps {
    fallback: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

export class ErrorBoundary extends Component<PropsWithChildren<ErrorBoundaryProps>, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }
    static defaultProps = {
        fallback: <h1>Something went wrong.</h1>,
    };
    static getDerivedStateFromError(error: unknown) {
        return { hasError: true };
    }
    componentDidCatch(error: unknown, errorInfo: unknown) {
        console.log(error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}
