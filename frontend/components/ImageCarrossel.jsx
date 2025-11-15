import React, { useState, useEffect, useRef } from 'react';

// Lista de imagens (do seu script.js)
const imagens = [
  'url("/IMG_7296.jpg")',
  'url("/IMG_7288.jpg")',
  'url("/IMG_7379.jpg")',
  'url("/IMG_7310.jpg")',
  'url("/IMG_7348.jpg")'
];

const tempo = 6 * 1000; // 6 segundos

function ImageCarrossel() {
  const [slideIndex, setSlideIndex] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Define o background inicial
    el.style.backgroundImage = imagens[slideIndex];

    const trocarBackground = () => {
      setSlideIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % imagens.length;

        // Define a próxima imagem no CSS variable e adiciona a classe de fade
        el.style.setProperty('--next-background', imagens[nextIndex]);
        el.classList.add('fade-transition');

        // Após a transição, atualiza o background principal e remove a classe
        setTimeout(() => {
          el.style.backgroundImage = imagens[nextIndex];
          el.classList.remove('fade-transition');
        }, 1000); // Duração da transição (0.5s) + delay

        return nextIndex;
      });
    };

    // Inicia o intervalo
    const intervalId = setInterval(trocarBackground, tempo);

    // Limpa o intervalo ao desmontar o componente
    return () => clearInterval(intervalId);
  }, []); // Executa apenas uma vez na montagem

  return (
    <div
      ref={sectionRef}
      className="image-carousel-section flex-[35%] bg-cover bg-center m-6 rounded-2xl"
    >
      {/* O CSS em index.css cuida da animação */}
    </div>
  );
}

export default ImageCarrossel;