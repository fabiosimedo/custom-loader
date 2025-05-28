import React, { useState } from 'react';
import VideoLoader from './VideoLoader';
import gif1 from './img/giphyskate.gif';
import gif2 from './img/giphyskate2.gif';
import gif3 from './img/giphyskate3.gif';
import gif4 from './img/giphyskate4.gif';
import gif5 from './img/giphyskate5.gif';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const gifs = [gif1, gif2, gif3, gif4, gif5];

  const randomIndex = Math.floor(Math.random() * gifs.length);
const selectedGif = gifs[randomIndex];


  return (
    <>
      {loading && (
        <VideoLoader
          mediaSrc={selectedGif}       // <– aqui usamos o seu gif
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
