import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("❌ Uncaught error in ErrorBoundary:", error, errorInfo);
    // Optional: Integrate error reporting (e.g., Sentry)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload(); // Full reload to reset app state
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen text-center text-gray-700 px-4">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong.</h1>
          <p className="mb-4">An unexpected error occurred in the app.</p>
          {this.state.error && (
            <pre className="text-sm text-gray-500 bg-gray-100 p-2 rounded max-w-md overflow-auto">
              {this.state.error.toString()}
            </pre>
          )}
          <button
            onClick={this.handleReset}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Reload App
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
