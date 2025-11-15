import './App.css' // estilos globais do app
import { useLayoutEffect, useRef } from 'react' // hooks React para efeitos e refs
import { gsap } from 'gsap' // biblioteca de animação
import { ScrollTrigger } from 'gsap/ScrollTrigger' // plugin GSAP para controle por scroll

import HeroSection from '../components/HeroSection' // componente da seção principal (hero)
import About from '../components/About' // componente da seção "About"
import Header from '../components/Header' // componente do cabeçalho

gsap.registerPlugin(ScrollTrigger) // registra o plugin ScrollTrigger no GSAP

function App() { // componente raiz da aplicação
  const headerRef = useRef(null) // ref para manipular o header via GSAP
  const aboutRef = useRef(null) // ref para a seção About que serve de gatilho

  useLayoutEffect(() => { // efeito que roda após o layout ser aplicado
    const ctx = gsap.context(() => { // contexto GSAP para escopo e limpeza segura
      gsap.to(headerRef.current, { // anima o header até y = 0
        y: 0,
        duration: 0.6, // duração da animação
        ease: 'power2.out', // curva de easing da animação
        scrollTrigger: { // configurações do gatilho de scroll
          trigger: aboutRef.current, // elemento que dispara a animação
          start: 'top top', // ponto de início do gatilho
          toggleActions: 'play none none reverse', // ações ao entrar/sair do gatilho
          refreshPriority: -1, // prioridade de refresh do ScrollTrigger
        },
      });
    });

    return () => {
      ctx.revert(); // limpa todas as animações/contexts ao desmontar
    };
  }, []); // executa apenas na montagem do componente

  return (
    <>
      <Header ref={headerRef} /> {/* cabeçalho referenciado para animação */}
      <HeroSection /> {/* seção principal (hero) */}
      <About ref={aboutRef} /> {/* seção About usada como gatilho de scroll */}
    </>
  )
}

export default App // exporta o componente App como padrão