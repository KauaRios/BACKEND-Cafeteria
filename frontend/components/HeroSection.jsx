import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
    const imageUrl = '/IMG_7310.jpg';
    // https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop

    const mainContainerRef = useRef(null);
    const headerRef = useRef(null);
    const footerRef = useRef(null);
    const imagePlaceholderRef = useRef(null);
    const fullscreenImageRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const introTl = gsap.timeline();

            introTl.from(headerRef.current.children, {
                opacity: 0,
                y: -40,
                duration: 1.2,
                stagger: 0.2,
                ease: 'power3.out',
            })
            .from(imagePlaceholderRef.current, {
                opacity: 0,
                scale: 0.95,
                duration: 1,
                ease: 'power2.out',
            }, '-=0.8')
            .from(footerRef.current.children, {
                opacity: 0,
                y: 40,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out',
            }, '-=0.7');

            const heroTl = gsap.timeline({
                scrollTrigger: {
                    trigger: mainContainerRef.current,
                    start: 'top top',
                    end: '+=1500',
                    scrub: 1.2,
                    pin: true,
                },
            });

            const placeholderRect = imagePlaceholderRef.current.getBoundingClientRect();
            
            heroTl.to(headerRef.current, { opacity: 0, y: -50, duration: 0.5 })
              .to(footerRef.current, { opacity: 0, y: 50, duration: 0.5 }, '<')
              .to(imagePlaceholderRef.current, { opacity: 0, duration: 0.5 }, '<')
              .fromTo(fullscreenImageRef.current, {
                  clipPath: `inset(${placeholderRect.top}px ${window.innerWidth - placeholderRect.right}px ${window.innerHeight - placeholderRect.bottom}px ${placeholderRect.left}px round 10px)`,
              }, {
                  clipPath: 'inset(0px 0px 0px 0px round 0px)',
                  duration: 1,
                  ease: 'power2.inOut',
              }, '<');
        }, mainContainerRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <div
                ref={fullscreenImageRef}
                style={{ backgroundImage: `url(${imageUrl})` }}
                className="fixed top-0 left-0 w-screen h-screen bg-cover bg-bottom"
            />
            <div ref={mainContainerRef} className='selection:bg-[#d92e1e] selection:text-[#f2a71b]'>
                <section
                    className="container h-screen w-full flex flex-col items-center p-8 md:p-12 text-[#f2a71b]"
                >
                    <header ref={headerRef} className="text-center w-full">
                        <h1 className="archivo text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter">
                            In The Pub
                        </h1>
                        <p className="lora text-lg md:text-xl mt-7 text-[#f2d9bb]">
                            O sabor do In The Pub não está no prato, mas na experiência.
                        </p>
                    </header>

                    <main className="flex-grow flex flex-col items-center justify-center w-full my-2">
                        <div className="text-center">
                            <div
                                ref={imagePlaceholderRef}
                                className="w-[30vh] h-[40vh] md:w-[35vh] md:h-[45vh]"
                            />
                        </div>
                    </main>

                    <footer ref={footerRef} className="w-full flex flex-col justify-center items-center gap-8">
                        <p className="text-sm md:text-base archivo text-[#9a7f69]">Cada um tem sua própria história.</p>
                        <svg
                            className="w-6 h-6 opacity-80 animate-bounce text-[#f2a71b]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            />
                        </svg>
                    </footer>
                </section>
            </div>
        </>
    );
};

export default HeroSection;