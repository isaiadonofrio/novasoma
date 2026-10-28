import React from 'react';
import { Play, Video, Image as ImageIcon } from 'lucide-react';

export function MediaViewer({ src, alt = '', className = '', autoPlay = true }) {
  if (!src) {
    return (
      <div className={`media-empty-placeholder ${className}`}>
        <ImageIcon size={28} color="#626262" />
        <span>Nessun media impostato</span>
      </div>
    );
  }

  // Check if it's a YouTube URL
  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const ytId = getYouTubeId(src);

  if (ytId) {
    return (
      <div className={`media-youtube-frame ${className}`}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${ytId}?rel=0&modestbranding=1&playsinline=1`}
          title={alt || 'Video esercizio'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="media-iframe"
        />
      </div>
    );
  }

  // Check if it's a direct video file (mp4, webm)
  const isVideo = src.match(/\.(mp4|webm|mov)(\?.*)?$/i);

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

  // Default: image or gif or webp
  return (
    <div className={`media-image-frame ${className}`}>
      <img 
        src={src} 
        alt={alt} 
        loading="lazy" 
        className="media-img-el" 
      />
    </div>
  );
}
