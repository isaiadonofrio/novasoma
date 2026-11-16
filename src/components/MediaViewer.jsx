import { useState, useCallback } from 'react';
import { Image as ImageIcon, Video } from 'lucide-react';

/**
 * Shared image renderer with smooth decode fade-in when loading lazily,
 * while rendering immediately when already present in the browser cache.
 */
export function FadeImage({ src, alt = '', className = '', loading = 'lazy' }) {
  const [loadedSrc, setLoadedSrc] = useState(null);
  const loaded = Boolean(src && loadedSrc === src);

  const handleImgRef = useCallback((node) => {
    if (node && node.complete && node.naturalWidth > 0) {
      setLoadedSrc(src);
    }
  }, [src]);

  return (
    <img
      ref={handleImgRef}
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      onLoad={() => setLoadedSrc(src)}
      onError={() => setLoadedSrc(src)}
      className={`${className} is-fade-img ${loaded ? 'is-loaded' : ''}`}
    />
  );
}

export function MediaViewer({ src, alt = '', className = '', autoPlay = true }) {
  if (!src) {
    return (
      <div className={`media-empty-placeholder ${className}`}>
        <ImageIcon size={28} color="var(--faint)" />
        <span>No media attached</span>
      </div>
    );
  }

  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const ytId = getYouTubeId(src);

  if (ytId) {
    const isOffline = typeof navigator !== 'undefined' && navigator.onLine === false;
    if (isOffline) {
      return (
        <div className={`media-empty-placeholder ${className}`}>
          <Video size={28} color="var(--faint)" />
          <span style={{ fontSize: '12px' }}>Offline: YouTube video unavailable without network</span>
        </div>
      );
    }
    return (
      <div className={`media-youtube-frame ${className}`}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${ytId}?rel=0&modestbranding=1&playsinline=1`}
          title={alt || 'Exercise video'}
          sandbox="allow-scripts allow-presentation allow-popups"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="media-iframe"
        />
      </div>
    );
  }

  const isVideo = /\.(mp4|webm|mov)(\?.*)?$/i.test(src) || /^data:video\//i.test(src);

  if (isVideo) {
    return (
      <div className={`media-video-frame ${className}`}>
        <video
          src={src}
          autoPlay={autoPlay}
          loop
          muted
          playsInline
          controls
          className="media-video-el"
        />
      </div>
    );
  }

  return (
    <div className={`media-image-frame ${className}`}>
      <FadeImage
        src={src}
        alt={alt}
        loading="lazy"
        className="media-img-el"
      />
    </div>
  );
}
