const LoadingSpinner = ({ fullscreen = false, label = 'Loading…' }) => {
  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgb(var(--fm-bg))]/85 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4">
          <span className="spinner-fm" aria-hidden="true" />
          <p className="text-muted text-sm font-medium">{label}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex w-full items-center justify-center py-24">
      <span className="spinner-fm" aria-hidden="true" />
    </div>
  );
};

export default LoadingSpinner;
