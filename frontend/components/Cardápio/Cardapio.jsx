import { useLayoutEffect, useRef, useState, useCallback } from 'react'; // importa hooks do React
import { gsap } from 'gsap'; // importa GSAP para animações
import { Link } from 'react-router-dom'; // importa Link do react-router (não usado aqui)
import Header from './HeaderCardapio.jsx'; // componente de cabeçalho do cardápio
import SelectorCardapio from './SelectorCardapio.jsx'; // componente que lista itens do cardápio
import { CartSidebar } from '../Carrinho/CartSideBar.jsx'; // componente da barra lateral do carrinho
import '../../src/App.css'; // importa estilos globais

const imgUrl = ['/IMG_7313.jpg']; // array com caminho(s) de imagem de fundo

export default function Cardapio() {
    const headerRef = useRef(null); // ref para o cabeçalho usado pela animação

    const [isCartOpen, setIsCartOpen] = useState(false); // controla visibilidade do carrinho
    const [cartItems, setCartItems] = useState([]); // estado dos itens no carrinho

    const handleAddItem = useCallback((itemToAdd) => {
        // adiciona item ao carrinho ou incrementa quantidade se já existir
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === itemToAdd.id);
            
            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === itemToAdd.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevItems, { ...itemToAdd, quantity: 1 }];
        });
        setIsCartOpen(true); // abre o carrinho ao adicionar item
    }, []);

    const handleUpdateQuantity = useCallback((itemId, newQuantity) => {
        // atualiza a quantidade de um item no carrinho
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            )
        );
    }, []);

    const handleRemoveItem = useCallback((itemId) => {
        // remove item do carrinho pelo id
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    }, []);

    const handleOpenCart = useCallback(() => {
        // abre o carrinho
        setIsCartOpen(true);
    }, []);

    const handleCloseCart = useCallback(() => {
        // fecha o carrinho
        setIsCartOpen(false);
    }, []);

    const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0); // soma total de itens no carrinho

    useLayoutEffect(() => {
        // anima o cabeçalho quando o componente monta
        gsap.to(headerRef.current, {
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
        });
    }, []);

    return (
        <>
            {/* cabeçalho com contador e botão do carrinho */}
            <Header 
                ref={headerRef} 
                onCartClick={handleOpenCart} 
                itemCount={totalItemCount} 
            />

            <main className='flex h-screen w-full'>
                
                <div className='w-3/5 h-full bg-[#261a10] flex flex-col justify-center items-center text-left'>
                    {/* seção esquerda com título e call-to-action */}
                    <div className='flex flex-col justify-center items-start gap-8 text-left'>
                        
                        <div className="relative pr-24">
                            <h1 className='text-[#f2a71b] font-black text-9xl archivo leading-30'>
                                Sushi<br />
                                Vinho
                            </h1>
                            <span 
                                className='text-[#d92e1e] archivo font-normal italic text-9xl 
                                           absolute top-0 right-16' 
                                style={{ transform: 'translateY(32%)' }}
                            >
                                &amp;
                            </span>
                        </div>

                        <p className='text-[#f2d9bb] text-2xl lora'>
                            — simples assim. <br />
                            Um menu que equilibra frescor, sabor e atitude.
                        </p>

                        <button className='bg-[#d92e1e] text-[#261a10] cursor-pointer py-2 px-4 rounded-md hover:bg-[#c81d0d] hover:text-[#261a10] transition duration-300 text-xl font-bold'>
                            Ver promoção
                        </button>
                    </div>
                </div>
                
                {/* seção direita com imagem de fundo */}
                <div className="w-2/5 h-full bg-left bg-cover flex justify-center items-center text-white text-3xl"
                style={{backgroundImage: `url(${imgUrl[0]})`}}>
                </div>

            </main>

            {/* componente que lista itens do cardápio e permite adicionar ao carrinho */}
            <SelectorCardapio onAddItem={handleAddItem} />

            {/* renderiza barra lateral do carrinho quando aberta */}
            {isCartOpen && (
                <CartSidebar 
                    onClose={handleCloseCart}
                    items={cartItems}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemoveItem={handleRemoveItem}
                />
            )}
        </>
    )
}
