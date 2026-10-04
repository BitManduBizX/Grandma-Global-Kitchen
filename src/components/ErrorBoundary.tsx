import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RotateCcw, HeartHandshake } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by Grandma\'s Kitchen ErrorBoundary:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center p-6 text-[#2B2D42]">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#E85D04]/20 shadow-xl text-center space-y-5">
            <div className="w-16 h-16 mx-auto bg-[#E85D04]/10 text-[#E85D04] rounded-2xl flex items-center justify-center">
              <HeartHandshake className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-serif font-bold text-[#2B2D42]">
                Don't You Worry, Darling!
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed">
                Even the best kitchen pots boil over once in a while. Grandma caught the slip before any food was ruined!
              </p>
            </div>
            <button
              onClick={this.handleReset}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 bg-[#E85D04] hover:bg-[#F48C06] text-white font-medium rounded-xl shadow-md transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Reheat the Kettle & Refresh
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
