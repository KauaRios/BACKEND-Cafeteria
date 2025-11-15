import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

// Header: componente React que renderiza um cabeçalho fixo com logo e itens de navegação
const Header = forwardRef((props, ref) => {
    return (
        <header ref={ref} className="fixed top-0 left-0 py-4 w-full archivo z-40 -translate-y-full bg-[#261a10] border-b border-[#4b3422] selection:bg-[#d92e1e] selection:text-[#261a10]" style={{
            color: '#003018'
        }}>
            
            <div className="container-about flex justify-between items-center">

                <div className="Logo font-black uppercase tracking-tighter text-md cursor-pointer text-[#f2a71b]">In The Pub</div>

                <ul className="Infos flex items-center justify-center gap-6 text-[#f2d9bb]">
                    {/* Home */}
                    <li className="cursor-pointer font-light hover:text-[#d92e1e] transition-colors duration-150 ease-out">Home</li>

                    {/* Sobre */}
                    <li className="cursor-pointer font-light hover:text-[#d92e1e] transition-colors duration-150 ease-out">Sobre</li>

                    {/* História */}
                    <li className="cursor-pointer font-light hover:text-[#d92e1e] transition-colors duration-150 ease-out">História</li>

                    {/* Cardápio (link para login) */}
                    <Link to="/login">
                        <li className="cursor-pointer px-4 py-1 rounded-full border-2 border-[#f2a71b] text-[#f2a71b] font-medium archivo tracking-widest transition-all duration-300 hover:bg-[#f2a71b] hover:text-[#261a10] ease-out">Cardápio</li>
                    </Link>
                </ul>

            </div>

        </header>
    );
});

export default Header;