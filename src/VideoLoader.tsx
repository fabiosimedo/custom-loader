import React, { FC, useEffect, useRef, useState } from 'react';

type VideoLoaderProps = {
  /** caminho do .mp4 ou do .gif */
  mediaSrc: string;

  /** duração do fade-in e fade-out (ms) */
  fadeDuration?: number;

  /** apenas para gifs: tempo total de exibição antes de começar o fade (ms) */
  displayDuration?: number;

  /** diâmetro do círculo (px ou qualquer CSS válido, ex: '30vw') */
  size?: number | string;

  /** callback ao fim do fade-out */
  onFinish?: () => void;
};

const VideoLoader: FC<VideoLoaderProps> = ({
  mediaSrc,
  fadeDuration = 1500,
  displayDuration = 5000,
  size = 200,
  onFinish,
}) => {
  const [visible, setVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // detecta automaticamente se é gif
  const isGif = mediaSrc.toLowerCase().endsWith('.gif');

  useEffect(() => {
    // fade-in quase imediato
    const inId = window.setTimeout(() => setVisible(true), 10);

    let finishTimeout: number;

    if (isGif) {
      // para GIF: espera displayDuration, faz fade-out e depois onFinish
      finishTimeout = window.setTimeout(() => {
        setVisible(false);
        window.setTimeout(() => onFinish?.(), fadeDuration);
      }, displayDuration);
    } else {
      // para vídeo: play + onended
      const vid = videoRef.current;
      if (vid) {
        vid.play().catch(() => {});
        vid.onended = () => {
          setVisible(false);
          window.setTimeout(() => onFinish?.(), fadeDuration);
        };
      }
    }

    return () => {
      clearTimeout(inId);
      clearTimeout(finishTimeout);
      const vid = videoRef.current;
      if (vid) vid.onended = null;
    };
  }, [isGif, displayDuration, fadeDuration, onFinish]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: visible ? 1 : 0,
        transition: `opacity ${fadeDuration}ms ease-in-out`,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          overflow: 'hidden',
          boxShadow: '0 0 30px rgba(0,0,0,0.5)',
          backgroundColor: '#000',
        }}
      >
        {isGif ? (
          <img
            src={mediaSrc}
            alt="Loading…"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        ) : (
          <video
            ref={videoRef}
            src={mediaSrc}
            muted
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        )}
      </div>
    </div>
  );
};

export default VideoLoader;
