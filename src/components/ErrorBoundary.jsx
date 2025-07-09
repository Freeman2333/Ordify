import React from "react";

import { centerScreen } from "../../styles/sharedClasses";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("Error caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={`${centerScreen} text-red-500 text-center px-4`}>
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              Something went wrong
            </h2>
            <p>{this.state.error?.message || "An unknown error occurred."}</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
