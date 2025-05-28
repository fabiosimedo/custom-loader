import React, { FC, useMemo } from 'react';

type FullScreenWaveBubbleLoaderProps = {
  duration?: string;     // ex: "4s"
  loaderColor?: string;  // cor monocromática
  bubbleCount?: number;  // quantas bolhas simultâneas
};

const FullScreenWaveBubbleLoader: FC<FullScreenWaveBubbleLoaderProps> = ({
  duration = '4s',
  loaderColor = '#4a90e2',
  bubbleCount = 20,
}) => {
  // para gerar trajetórias aleatórias de bolhas
  const durSec = parseFloat(duration);
  const bubbles = useMemo(() => {
    return Array.from({ length: bubbleCount }, () => {
      const angle = Math.random() * Math.PI * 2;
      const dx = 50 * Math.cos(angle); // deslocamento X
      const dy = 50 * Math.sin(angle); // deslocamento Y
      // atraso aleatório no início da animação
      const begin = `${(Math.random() * durSec).toFixed(2)}s`;
      return { dx, dy, begin };
    });
  }, [bubbleCount, durSec]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      <svg
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradiente monocromático */}
          <radialGradient id="monoGrad" cx="50%" cy="50%" r="50%">
            <stop offset="30%" stopColor={loaderColor} stopOpacity="1" />
            <stop offset="100%" stopColor={loaderColor} stopOpacity="0.2" />
          </radialGradient>

          {/* Sombra externa */}
          <filter id="dropShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
            <feOffset in="blur" dx="0" dy="2" result="offsetBlur" />
            <feMerge>
              <feMergeNode in="offsetBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Ondulação no contorno */}
          <filter id="ripple">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.02"
              numOctaves="2"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur={duration}
                values="0.02;0.05;0.02"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in2="noise"
              in="SourceGraphic"
              scale="10"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>

        {/* Círculo principal preenchendo toda a tela */}
        <circle
          cx={50}
          cy={50}
          r={50}
          fill="url(#monoGrad)"
          filter="url(#dropShadow) url(#ripple)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            dur={duration}
            repeatCount="indefinite"
          />
        </circle>

        {/* Bolhas saindo em direções aleatórias */}
        {bubbles.map(({ dx, dy, begin }, i) => (
          <circle key={i} cx={50} cy={50} r={2} fill="#fff" opacity={0}>
            {/* move usando translate para direção (dx, dy) */}
            <animateTransform
              attributeName="transform"
              type="translate"
              from="0 0"
              to={`${dx} ${dy}`}
              dur={duration}
              begin={begin}
              repeatCount="indefinite"
            />
            {/* fade out */}
            <animate
              attributeName="opacity"
              values="1;0"
              dur={duration}
              begin={begin}
              repeatCount="indefinite"
            />
            {/* aumenta de tamanho */}
            <animate
              attributeName="r"
              values="2;8"
              dur={duration}
              begin={begin}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>
    </div>
  );
};

export default FullScreenWaveBubbleLoader;
