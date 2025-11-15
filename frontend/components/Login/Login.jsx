import React, { useRef, useLayoutEffect,useState} from 'react';
import { Link,useNavigate} from 'react-router-dom';
import { gsap } from 'gsap';
import ImageCarrossel from '../ImageCarrossel.jsx';

function Login() {
  const mainRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const formRef = useRef(null);



// --- Hooks para o formulário e navegação ---
  const navigate = useNavigate(); // Para redirecionar após o login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState(null); // Para exibir erros de login
  const [loading, setLoading] = useState(false);




  // Animação inicial
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Esconde os elementos do formulário antes de animar
      gsap.set(formRef.current.children, { opacity: 0, y: 30 });
      
      const tl = gsap.timeline();
      
      tl.from(titleRef.current, {
        duration: 0.8,
        y: -50,
        opacity: 0,
        ease: "power3.out"
      })
      .from(subtitleRef.current, {
        duration: 0.6,
        y: -30,
        opacity: 0,
        ease: "power2.out"
      }, "<0.2") // Começa 0.2s depois do início da animação anterior
      .to(formRef.current.children, {
        duration: 0.5,
        opacity: 1,
        y: 0,
        stagger: 0.1, // Anima um de cada vez
        ease: "power1.out"
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Impede o recarregamento da página
    setError(null);
    setLoading(true);

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    if (remember) {
      formData.append('manter_conectado', 'on');
    }

    try {
      // Chama o PHP na porta 8080 do Docker
      const response = await fetch('http://localhost:8080/auth/login.php', { 
        method: 'POST',
        body: formData,
        credentials: 'include' // ESSENCIAL para o cookie "remember_me"
      });

      const data = await response.json();
      // O React agora checa 'data.success'
      if (data.success) {
        navigate('/cardapio'); // Redireciona
      } else {
        setError(data.error); // Mostra o erro (ex: "E-mail ou senha incorretos.")
      }
    } catch (err) {
      setError('Não foi possível conectar ao servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={mainRef} className="flex w-full h-screen bg-[#261A10] archivo">
      {/* Seção da Imagem (Reutilizada) */}
      <ImageCarrossel />

      {/* Seção de Login */}
      <div className="w-[580px] flex-shrink-0 bg-[#261A10] flex flex-col justify-center px-16">
        
        {/* Títulos */}
        <h1 ref={titleRef} className="text-5xl font-black text-[#F2A71B] mb-2">Bem-vindo(a)!</h1>
        <p ref={subtitleRef} className="text-xl text-[#896547] mb-10">É bom ter você de volta!</p>
        
        {/* Formulário */}
        <form ref={formRef} onSubmit={handleSubmit} >
          {/* Email */}
          <div className="mb-6">
            <label className="block text-lg text-[#F2D9BB] mb-1.5" htmlFor="email">Email ou Telefone:</label>
            <input 
              type="text" 
              id="email" 
              className="w-full p-4 bg-[#6B594A] rounded-lg text-[#F2f2f2] outline-none focus:bg-[#7a6050]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          {/* Senha */}
          <div className="mb-6">
            <label className="block text-lg text-[#F2D9BB] mb-1.5" htmlFor="password">Senha:</label>
            <input 
              type="password" 
              id="password" 
              className="w-full p-4 bg-[#6B594A] rounded-lg text-[#F2f2f2] outline-none focus:bg-[#7a6050]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              
            />
          </div>
          
          {/* Rodapé do formulário */}
          <div className="flex justify-between items-center mb-7">
            <div className="flex items-center gap-1.5">
              <input type="checkbox" id="remember" className="w-4 h-4 cursor-pointer accent-[#F2A71B]" />
              <label className="text-base text-[#AE8567] cursor-pointer" htmlFor="remember">Manter conectado</label>
            </div>
            <a href="#" className="text-base text-[#AE8567] no-underline transition-colors hover:text-[#F2A71B]">
              Esqueceu sua senha?
            </a>
          </div>
          
          {/* Botão de login */}
          <button 
            type="submit" 
            className="w-full p-[18px] bg-[#F2A71B] border-none rounded-xl text-lg font-semibold text-[#3d2817] cursor-pointer transition-colors mb-7 hover:bg-[#E1960A] disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
          
          {/* Link para cadastro */}
          <p className="text-center text-base text-[#AE8567]">
            Não tem uma conta? <Link to="/cadastro" className="text-[#D92E1E] no-underline font-medium transition-colors hover:underline">Cadastre-se</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;