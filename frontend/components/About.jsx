import React, { useLayoutEffect, useRef, forwardRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const imgUrl = ['/IMG_7379.jpg', '/IMG_7398.jpg'];

const About = forwardRef((props, ref) => {
    const navigate = useNavigate();

    const irParaCardapio = () => {
        navigate("/login");
    }

    // Refs do Título
    const textLine1Ref = useRef(null);
    const textLine2Ref = useRef(null);
    const textLine3Ref = useRef(null);
    
    // Refs do Bloco 1
    const img1Ref = useRef(null);
    const textBlock1Ref = useRef(null); // Ref Adicionada

    // Refs do Bloco 2
    const textBlock2Ref = useRef(null); // Ref Adicionada
    const imgBlock2Ref = useRef(null); // Ref Adicionada

    // Ref do Botão
    const ctaRef = useRef(null);

    const splitText = (text) => {
        return text.split('').map((char, index) => (
            <span key={index} className="inline-block" style={{ whiteSpace: 'pre' }}>
                {char}
            </span>
        ));
    };

    useLayoutEffect(() => {
        // Usamos o 'ref' principal (da seção) como o escopo do GSAP
        const ctx = gsap.context(() => {
            
            // --- 1. Animação do Título Principal ---
            // Esta timeline anima as 3 linhas do título
            const headerTl = gsap.timeline({
                scrollTrigger: {
                    trigger: textLine1Ref.current, // Gatilho na primeira linha
                    start: 'top 85%', // Começa quando 85% dela estiver visível
                    toggleActions: 'play none none reverse',
                }
            });
            headerTl.from(textLine1Ref.current.children, { y: 20, autoAlpha: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out' })
                .from(textLine2Ref.current.children, { y: 20, autoAlpha: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out' }, '-=0.3')
                .from(textLine3Ref.current.children, { y: 20, autoAlpha: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out' }, '-=0.3');

            // --- 2. Animação do Bloco "Quem somos?" (Container 1) ---
            // Gatilho único para os dois elementos (imagem e texto)
            const block1Trigger = img1Ref.current.parentElement; 
            
            gsap.from(img1Ref.current, {
                x: -40, autoAlpha: 0, duration: 0.8, ease: 'power2.out',
                scrollTrigger: {
                    trigger: block1Trigger,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse',
                }
            });
            gsap.from(textBlock1Ref.current, { // Usando a nova ref
                x: 40, autoAlpha: 0, duration: 0.8, ease: 'power2.out',
                scrollTrigger: {
                    trigger: block1Trigger,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse',
                }
            });

            // --- 3. Animação do Bloco 2 (Container 2) ---
            const block2Trigger = textBlock2Ref.current.parentElement;

            gsap.from(textBlock2Ref.current, { // Usando a nova ref
                x: -40, autoAlpha: 0, duration: 0.8, ease: 'power2.out',
                scrollTrigger: {
                    trigger: block2Trigger,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse',
                }
            });
            gsap.from(imgBlock2Ref.current, { // Usando a nova ref
                x: 40, autoAlpha: 0, duration: 0.8, ease: 'power2.out',
                scrollTrigger: {
                    trigger: block2Trigger,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse',
                }
            });

            // --- 4. Animação do Botão CTA ---
            // Oculta o botão inicialmente (GSAP vai torná-lo visível)
            gsap.set(ctaRef.current, { autoAlpha: 0, y: 30 });
            gsap.to(ctaRef.current, {
                y: 0, autoAlpha: 1, duration: 0.8, ease: 'power2.out',
                scrollTrigger: {
                    trigger: ctaRef.current,
                    start: 'top 90%', // Anima quando o botão estiver quase visível
                    toggleActions: 'play none none reverse',
                }
            });

        }, ref); // O 'ref' do 'forwardRef' é o escopo

        return () => ctx.revert();
    }, [ref]); // Dependência do 'forwardRef'

    return (
        <section
            ref={ref}
            className="min-h-screen w-full flex flex-col items-center justify-center relative py-28 historia text-[#f2a71b] selection:bg-[#d92e1e] selection:text-[#f2a71b]"
            style={{ backgroundColor: '#261a10' }}
        >
            <div className="container flex flex-col justify-center items-center text-center gap-24">

                <div>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold lora">
                        <p ref={textLine1Ref} className="mb-3">{splitText("Sabor que conecta culturas,")}</p>
                        <p ref={textLine2Ref}>{splitText("tradição que abraça.")}</p>
                    </h2>
                    <p ref={textLine3Ref} className="text-2xl md:text-3xl lora italic text-[#d92e1e] mt-4">
                        {splitText("In The Pub, onde o sushi vira arte.")}
                    </p>
                </div>

                {/* Seções "atacadas" */}
                <div className='flex flex-col gap-8 text-left items-start text-lg md:text-xl text-[#f2d9bb] lora'>

                    <div className='container-about flex flex-row gap-12 items-center bg-[#f2d9bb] rounded-xl w-full h-128 overflow-hidden shadow-2xl transition-all hover:shadow-none'>
                        
                        {/* Imagem Bloco 1 */}
                        <span ref={img1Ref} style={{ backgroundImage: `url(${imgUrl[0]})` }} className='w-[48%] h-full bg-bottom bg-cover'></span>
                        
                        {/* Texto Bloco 1 (REF ADICIONADA AQUI) */}
                        <div ref={textBlock1Ref} className='h-full py-16 px-1 flex flex-col gap-8 text-left items-start text-[#261a10] w-[52%]'>
                            <h2 className='text-4xl font-black archivo'>Quem somos?</h2>
                            {/* O 'paragraph1Ref' antigo não é mais necessário para a animação, 
                                pois estamos animando o 'textBlock1Ref' (o pai) */}
                            <p className='w-5/6 text-justify lora'>O In The Pub Japonês nasceu com a ideia de reunir sabores do mundo em um único lugar. O que começou como um pub irlandês com opções variadas evoluiu para um espaço dedicado à culinária japonesa, conhecido pelo aconchego, autenticidade e atendimento acolhedor. Mesmo pequeno, o restaurante entrega uma experiência marcante, com ingredientes frescos e importados diretamente do Japão.</p>
                        </div>

                    </div>
                    
                    <div className="container-about flex flex-row gap-8 items-center h-86">
                        
                        {/* Texto Bloco 2 (REF ADICIONADA AQUI) */}
                        <div ref={textBlock2Ref} className='w-1/3 bg-[#f2a71b] rounded-xl p-8 max-h-full flex justify-center items-center text-justify shadow-2xl transition-all hover:shadow-none'>
                            <p className='text-[#261a10] text-[22px] lora'>O In The Pub une a tradição japonesa ao clima descontraído de um pub, oferecendo uma experiência sensorial única. Pratos como o Hot Especial Alho-Poró e o Jyo Misto transformam cada refeição em uma lembrança memorável.</p>
                        </div>

                        {/* Imagem Bloco 2 (REF ADICIONADA AQUI) */}
                        <div ref={imgBlock2Ref} style={{backgroundImage: `url(${imgUrl[1]})`}} className='w-2/3 bg-center bg-cover rounded-xl min-h-full shadow-2xl transition-all hover:shadow-none'></div>
                        
                    </div>
                </div>

                <button onClick={irParaCardapio}>
                    {/* A classe 'opacity-0' foi removida, 
                        o GSAP (gsap.set) agora cuida disso */}
                    <span
                        ref={ctaRef}
                        className='cursor-pointer inline-block border-2 border-[#f2a71b] text-[#f2a71b] px-8 py-3 rounded-full text-sm font-semibold archivo tracking-widest uppercase hover:bg-[#f2a71b] hover:text-[#261a10] mt-8 transition-all duration-300 ease-out'
                    >
                        Explore nosso Cardápio
                    </span>
                </button>

            </div>
            <div></div>
        </section>
    );
});

export default About;