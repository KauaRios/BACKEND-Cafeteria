// Importa React, roteamento e ícones usados neste componente
import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';

// Componente de cabeçalho fixo que recebe ref, handler do carrinho e contagem de itens
const Header = forwardRef(({ onCartClick, itemCount }, ref) => {
    // Props: onCartClick -> função ao clicar no carrinho; itemCount -> número exibido no badge
    return (
        // Elemento header fixo no topo com estilos e borda
        <header ref={ref} className="fixed top-0 left-0 py-4 w-full archivo z-40 -translate-y-full bg-[#261a10] border-b border-[#4b3422] selection:bg-[#d92e1e] selection:text-[#261a10]" style={{
            color: '#003018'
        }}>
            
            {/* Container principal que alinha logo e itens de navegação */}
            <div className="container-about flex justify-between items-center">
                {/* Link para a página inicial com nome/logo */}
                <Link to="/">
                    <div className="Logo font-black uppercase tracking-tighter text-xl cursor-pointer text-[#f2a71b]">In The Pub</div>
                </Link>

                {/* Lista de links e ações (home, sobre, carrinho, usuário) */}
                <ul className="Infos flex items-center justify-center gap-6 text-[#f2d9bb]">
                    {/* Link para Home */}
                    <Link to="/">
                        <li className="cursor-pointer font-light hover:text-[#d92e1e] transition-colors duration-150 ease-out">Home</li>
                    </Link>
                    {/* Link para Sobre */}
                    <Link to="/">
                        <li className="cursor-pointer font-light hover:text-[#d92e1e] transition-colors duration-150 ease-out">Sobre</li>
                    </Link>
                    
                    {/* Item do carrinho com botão que aciona onCartClick */}
                    <li className="relative"> 
                        <button 
                            onClick={onCartClick} 
                            className="cursor-pointer font-light hover:text-[#d92e1e] transition-colors duration-150 ease-out"
                        >
                            <ShoppingCart size={28}/>
                        </button>
                        
                        {/* Badge que mostra a quantidade de itens quando maior que zero */}
                        {itemCount > 0 && (
                            <span 
                                className="absolute -top-2 -right-3 bg-[#d92e1e] text-white text-xs 
                                           font-bold rounded-full w-5 h-5 flex items-center 
                                           justify-center archivo"
                            >
                                {itemCount}
                            </span>
                        )}
                    </li>
                    
                    {/* Link para área do usuário com ícone */}
                    <Link to="/">
                        {/*<li className="cursor-pointer px-2 py-2 rounded-full border-2 border-[#f2a71b] text-[#f2a71b] font-medium archivo tracking-widest transition-all duration-300 hover:bg-[#f2a71b] hover:text-[#261a10] ease-out"><User size={28}/></li>*/}
                    </Link> 
                </ul>

            </div>

        </header>
    );
});

// Exporta o componente para uso em outras partes da aplicação
export default Header;
