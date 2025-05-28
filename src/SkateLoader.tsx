import React, { FC } from 'react';

type WaveBubbleLoaderProps = {
  size?: number;       // diâmetro em px
  duration?: string;   // tempo de um ciclo completo (ex: "4s")
  color?: string;      // cor base em hex ou nome (monocromático)
};

const WaveBubbleLoader: FC<WaveBubbleLoaderProps> = ({
  size = 120,
  duration = '4s',
  color = '#4a90e2',   // azul como default
}) => (
  <div style={{ width: size, height: size }}>
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <defs>
        {/* 1) Gradiente monocromático do centro pra fora */}
        <radialGradient id="monoGrad" cx="50%" cy="50%" r="50%">
          <stop offset="30%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.2" />
        </radialGradient>

        {/* 2) Sombra externa */}
        <filter id="dropShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
          <feOffset in="blur" dx="0" dy="2" result="offsetBlur" />
          <feMerge>
            <feMergeNode in="offsetBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* 3) Filtro de ondulação (ripple) para deformar o contorno */}
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

      {/* 4) Círculo principal com gradiente, sombra e ondulação */}
      <circle
        cx={50}
        cy={50}
        r={40}
        fill="url(#monoGrad)"
        filter="url(#dropShadow) url(#ripple)"
      >
        {/* rodando lentamente para reforçar o movimento */}
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 50 50"
          to="360 50 50"
          dur={duration}
          repeatCount="indefinite"
        />
      </circle>

      {/* 5) Bolhas surgindo do centro */}
      {[0, 1, 2, 3, 4].map(i => {
        const begin = (i * parseFloat(duration) / 5).toFixed(2) + 's';
        return (
          <circle
            key={i}
            cx={50}
            cy={50}
            r={2}
            fill={color}
            opacity={0}
          >
            {/* sobe e some */}
            <animate
              attributeName="cy"
              dur={duration}
              values="50;10"
              begin={begin}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              dur={duration}
              values="1;0"
              begin={begin}
              repeatCount="indefinite"
            />
            {/* cresce um pouco no caminho */}
            <animate
              attributeName="r"
              dur={duration}
              values="2;6"
              begin={begin}
              repeatCount="indefinite"
            />
          </circle>
        );
      })}
    </svg>
  </div>
);

export default WaveBubbleLoader;
