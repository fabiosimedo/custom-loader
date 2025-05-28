import React, { useState } from 'react';
import VideoLoader from './VideoLoader';
import loaderGif from './img/giphyskate.gif';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && (
        <VideoLoader
          mediaSrc={loaderGif}       // <– aqui usamos o seu gif
          fadeDuration={800}         // fade-in/out em 800ms
          displayDuration={6000}     // exibe o gif por 6s antes de desaparecer
          size={250}                 // diâmetro do círculo em pixels
          onFinish={() => setLoading(false)}
        />
      )}

      {!loading && (
        <div>
          <h1>🚀 Seu App está pronto!</h1>
          {/* resto do conteúdo */}
        </div>
      )}
    </>
  );
};

export default App;
