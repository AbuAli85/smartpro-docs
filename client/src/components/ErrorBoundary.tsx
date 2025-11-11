import { cn } from "@/lib/utils";
import { AlertTriangle, RotateCcw, Home, Mail } from "lucide-react";
import { Component, ReactNode } from "react";
import { formatErrorForUser, logError } from "@/lib/errorUtils";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  showDetails: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      showDetails: false 
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console and error tracking service
    logError(error, { errorInfo });
    
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      const errorDetails = formatErrorForUser(this.state.error);

      return (
        <div className="flex items-center justify-center min-h-screen p-8 bg-background">
          <div className="flex flex-col items-center w-full max-w-2xl p-8">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
              <AlertTriangle
                size={32}
                className="text-destructive flex-shrink-0"
              />
            </div>

            <h1 className="text-2xl font-bold mb-2 text-center">Oops! Something went wrong</h1>
            
            <p className="text-muted-foreground text-center mb-8 max-w-md">
              {errorDetails.userMessage}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={() => window.location.reload()}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-lg",
                  "bg-primary text-primary-foreground",
                  "hover:opacity-90 cursor-pointer transition-opacity"
                )}
                aria-label="Reload page"
              >
                <RotateCcw size={18} aria-hidden="true" />
                Reload Page
              </button>

              <button
                onClick={() => window.location.href = '/'}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-lg",
                  "border border-input bg-background",
                  "hover:bg-accent hover:text-accent-foreground",
                  "cursor-pointer transition-colors"
                )}
                aria-label="Go to homepage"
              >
                <Home size={18} aria-hidden="true" />
                Go Home
              </button>
            </div>

            <button
              onClick={() => this.setState({ showDetails: !this.state.showDetails })}
              className="text-sm text-muted-foreground hover:text-foreground underline mb-4"
            >
              {this.state.showDetails ? 'Hide' : 'Show'} technical details
            </button>

            {this.state.showDetails && (
              <div className="w-full space-y-4">
                <div className="p-4 rounded-lg bg-muted overflow-auto max-h-96">
                  <h3 className="font-semibold mb-2 text-sm">Error Details:</h3>
                  <pre className="text-xs text-muted-foreground whitespace-pre-wrap break-words">
                    {this.state.error?.message}
                  </pre>
                </div>

                {this.state.error?.stack && (
                  <div className="p-4 rounded-lg bg-muted overflow-auto max-h-96">
                    <h3 className="font-semibold mb-2 text-sm">Stack Trace:</h3>
                    <pre className="text-xs text-muted-foreground whitespace-pre-wrap break-words">
                      {this.state.error.stack}
                    </pre>
                  </div>
                )}

                <div className="text-xs text-muted-foreground text-center">
                  <p>Error occurred at: {errorDetails.timestamp}</p>
                </div>
              </div>
            )}

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Need help? Contact our support team
              </p>
              <a 
                href="mailto:support@thesmartpro.io" 
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <Mail size={16} aria-hidden="true" />
                support@thesmartpro.io
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
