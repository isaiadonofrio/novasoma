import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Unhandled application error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleResetState = () => {
    try {
      localStorage.removeItem('corpo_active_workout_draft_v1');
    } catch (e) {
      console.warn('Could not clear active draft:', e);
    }
    window.location.hash = '';
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1c1917',
          color: '#f5f5f4',
          fontFamily: 'Inter, system-ui, sans-serif',
          padding: '24px'
        }}>
          <div style={{
            maxWidth: '480px',
            width: '100%',
            backgroundColor: '#292524',
            borderRadius: '16px',
            padding: '32px',
            border: '1px solid #44403c',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '16px' }}>⚠️</div>
            <h1 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px', color: '#fafaf9' }}>
              Something went wrong
            </h1>
            <p style={{ fontSize: '14px', color: '#a8a29e', lineHeight: 1.5, marginBottom: '20px' }}>
              An unexpected error occurred in Nova Soma. Your workout history and custom exercises stored on this device remain safe.
            </p>
            {this.state.error?.message && (
              <pre style={{
                backgroundColor: '#1c1917',
                padding: '12px',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#f87171',
                overflowX: 'auto',
                marginBottom: '24px',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}>
                {this.state.error.message}
              </pre>
            )}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={this.handleReload}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  backgroundColor: '#ea580c',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Reload App
              </button>
              <button
                type="button"
                onClick={this.handleResetState}
                style={{
                  padding: '10px 16px',
                  backgroundColor: '#3b3836',
                  color: '#e7e5e4',
                  border: '1px solid #57534e',
                  borderRadius: '10px',
                  fontWeight: 500,
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Clear Workout Draft & Reload
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

