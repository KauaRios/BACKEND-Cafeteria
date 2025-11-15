// Importações principais: React, roteamento, animações e componente de carrossel
import React, { useState, useRef, useLayoutEffect } from 'react';
import { Link,useNavigate} from 'react-router-dom';
import { gsap } from 'gsap';
import ImageCarrossel from '../ImageCarrossel';

// Componente da barra de progresso; recebe passo atual e renderiza indicadores
function ProgressBar({ currentStep }) {
    // Definição dos passos visíveis na barra
    const steps = [1, 2, 3];
    return (
        <div className="flex gap-2 mb-8">
            {steps.map((step) => (
                <div
                    key={step}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                        step === currentStep ? 'bg-[#D92E1E] w-10' : 'bg-[#6B594A] w-4'
                    }`}
                />
            ))}
        </div>
    );
}

// Componente principal de cadastro com múltiplos passos e animações GSAP
function Cadastro() {
    // Estado do passo atual do formulário
    const [step, setStep] = useState(1);
    // Estado dos dados do formulário (todos os campos usados)
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        cpf: '',
        telefone: '',
        dataNascimento: '',
        senha: '',
        confirmarSenha: '',
    });
       //NOVOS ESTADOS PARA ERRO E LOADING
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Hook para redirecionar

    // Referência principal do container para contexto GSAP
    const mainRef = useRef(null);
    // Referência do bloco de campos do passo atual para animar
    const formStepRef = useRef(null);
    // Referências dos elementos de título, subtítulo, progresso e botões para animação
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const progressRef = useRef(null);
    const buttonsRef = useRef(null);

    // Efeito de layout para rodar animações iniciais ao montar o componente
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(formStepRef.current, { opacity: 0, x: 30 });
            gsap.set(buttonsRef.current, { opacity: 0, y: 30 });

            const tl = gsap.timeline();
            tl.from(titleRef.current, { duration: 0.8, y: -50, opacity: 0, ease: "power3.out" })
                .from(subtitleRef.current, { duration: 0.6, y: -30, opacity: 0, ease: "power2.out" }, "<0.2")
                .from(progressRef.current, { duration: 0.5, opacity: 0, ease: "power1.out" }, "<0.1")
                .to(formStepRef.current, { duration: 0.5, opacity: 1, x: 0, ease: "power1.out" })
                .to(buttonsRef.current, { duration: 0.5, opacity: 1, y: 0, ease: "power1.out" }, "-=0.3");
        }, mainRef);
        return () => ctx.revert(); // Limpa o contexto GSAP ao desmontar
    }, []);

    // Função que anima a transição entre passos (direção baseada no incremento)
    const animateStepChange = (newStep) => {
        const direction = newStep > step ? 1 : -1;
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();
            tl.to(formStepRef.current, {
                duration: 0.3,
                opacity: 0,
                x: -50 * direction,
                ease: "power1.in"
            })
            .call(() => setStep(newStep))
            .set(formStepRef.current, { x: 50 * direction })
            .to(formStepRef.current, {
                duration: 0.3,
                opacity: 1,
                x: 0,
                ease: "power1.out"
            });
        }, mainRef);
        return () => ctx.revert(); // Reverte o contexto criado
    };

    // Handler genérico para atualizar valores do formulário por id do input
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    // Avança para o próximo passo ou submete se for o último passo
    const handleNext = (e) => {
        e.preventDefault();
        if (step < 3) {
            animateStepChange(step + 1);
        } else {
            handleSubmit(e);
        }
    };

    // Volta um passo no formulário
    const handlePrev = () => {
        if (step > 1) {
            animateStepChange(step - 1);
        }
    };

    // Submissão final do formulário (aqui apenas loga os dados)
     const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Validação local
        if (formData.senha !== formData.confirmarSenha) {
            setError("As senhas não conferem.");
            return;
        }
        if (formData.senha.length < 6) { // Exemplo de outra validação
            setError("A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        setLoading(true);

        // Prepara os dados para enviar ao PHP
        const dataToSend = new FormData();
        dataToSend.append('name', formData.nome);
        dataToSend.append('email', formData.email);
        dataToSend.append('password', formData.senha);
        dataToSend.append('cpf', formData.cpf);
        dataToSend.append('num_tel', formData.telefone); 
        dataToSend.append('data_nasc', formData.dataNascimento); 

        try {
            // Chama a API PHP (porta 8080 do Docker)
            const response = await fetch('http://localhost:8080/auth/register.php', {
                method: 'POST',
                body: dataToSend,
                credentials: 'include'
            });

            const result = await response.json();

            if (result.success) {
                // SUCESSO! Redireciona para o login com msg de sucesso
                navigate('/login?status=success');
            } else {
                // ERRO (Ex: "Email já existe" vindo do PHP)
                setError(result.error);
                // Volta para o passo 1 (onde está o email) se o erro for de email
                if (result.error.includes("email")) {
                    animateStepChange(1);
                }
            }
        } catch (err) {
            setError("Erro de conexão. Tente novamente mais tarde.");
        } finally {
            setLoading(false);
        }
    };



    // Renderiza os campos específicos de cada passo
    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <div className="mb-6">
                            <label className="block text-lg text-[#F2D9BB] mb-1.5" htmlFor="nome">Nome completo:</label>
                            <input type="text" id="nome" value={formData.nome} onChange={handleChange} className="w-full p-4 bg-[#6B594A] rounded-lg text-[#F2f2f2] outline-none focus:bg-[#7a6050]" />
                        </div>
                        <div className="mb-6">
                            <label className="block text-lg text-[#F2D9BB] mb-1.5" htmlFor="email">E-mail:</label>
                            <input type="email" id="email" value={formData.email} onChange={handleChange} className="w-full p-4 bg-[#6B594A] rounded-lg text-[#F2f2f2] outline-none focus:bg-[#7a6050]" />
                        </div>
                    </>
                );
            case 2:
                return (
                    <>
                        <div className="mb-6">
                            <label className="block text-lg text-[#F2D9BB] mb-1.5" htmlFor="cpf">CPF:</label>
                            <input type="text" id="cpf" value={formData.cpf} onChange={handleChange} className="w-full p-4 bg-[#6B594A] rounded-lg text-[#F2f2f2] outline-none focus:bg-[#7a6050]" />
                        </div>
                        <div className="flex gap-4 mb-6">
                            <div className="flex-1">
                                <label className="block text-lg text-[#F2D9BB] mb-1.5" htmlFor="telefone">Telefone:</label>
                                <input type="tel" id="telefone" value={formData.telefone} onChange={handleChange} className="w-full p-4 bg-[#6B594A] rounded-lg text-[#F2f2f2] outline-none focus:bg-[#7a6050]" />
                            </div>
                            <div className="flex-1">
                                <label className="block text-lg text-[#F2D9BB] mb-1.5" htmlFor="dataNascimento">Data de nascimento:</label>
                                <input type="date" id="dataNascimento" value={formData.dataNascimento} onChange={handleChange} className="w-full p-4 bg-[#6B594A] rounded-lg text-[#F2f2f2] outline-none focus:bg-[#7a6050]" />
                            </div>
                        </div>
                    </>
                );
            case 3:
                return (
                    <>
                        <div className="mb-6">
                            <label className="block text-lg text-[#F2D9BB] mb-1.5" htmlFor="senha">Senha:</label>
                            <input type="password" id="senha" value={formData.senha} onChange={handleChange} className="w-full p-4 bg-[#6B594A] rounded-lg text-[#F2f2f2] outline-none focus:bg-[#7a6050]" />
                        </div>
                        <div className="mb-6">
                            <label className="block text-lg text-[#F2D9BB] mb-1.5" htmlFor="confirmarSenha">Confirmar senha:</label>
                            <input type="password" id="confirmarSenha" value={formData.confirmarSenha} onChange={handleChange} className="w-full p-4 bg-[#6B594A] rounded-lg text-[#F2f2f2] outline-none focus:bg-[#7a6050]" />
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div ref={mainRef} className="flex w-full h-screen bg-[#261A10] archivo">
            {/* Coluna do carrossel de imagens */}
            <ImageCarrossel />

            <div className="w-[580px] flex-shrink-0 bg-[#261A10] flex flex-col justify-center px-16">
                
                {/* Título principal do formulário */}
                <h1 ref={titleRef} className="text-5xl font-black text-[#F2A71B] mb-2">Quase lá!</h1>
                {/* Subtítulo explicativo */}
                <p ref={subtitleRef} className="text-xl text-[#896547] mb-10">Cadastre-se para agilizar o seu próximo pedido.</p>
                
                {/* Barra de progresso com passo atual */}
                <div ref={progressRef}>
                    <ProgressBar currentStep={step} />
                </div>

                {/* 4. MOSTRAR ERRO (SE EXISTIR) */}
                {error && (
                    <p className="text-center text-red-400 mb-4 -mt-4">{error}</p>
                )}




                {/* Formulário que controla navegação e submissão */}
                <form onSubmit={handleSubmit}>
                    {/* Área dos campos do passo atual (animada) */}
                    <div ref={formStepRef}>
                        {renderStepContent()}
                    </div>
                    
                    {/* Botões de navegação (Voltar / Próximo / Cadastrar) */}
                    <div ref={buttonsRef} className="flex gap-4 mt-16">
                        {step > 1 && (
                            <button 
                                type="button" 
                                onClick={handlePrev}
                                className="flex-1 cursor-pointer p-4 bg-[#6B594A] text-[#F2D9BB] rounded-lg font-semibold transition-colors hover:bg-[#7a6050]"
                            >
                                Voltar
                            </button>
                        )}
                        
                        <button 
                            type={step === 3 ? "submit" : "button"}
                            onClick={step < 3 ? handleNext : handleSubmit}
                            className="flex-1 cursor-pointer p-4 bg-[#F2A71B] text-[#3d2817] rounded-lg font-semibold transition-colors hover:bg-[#E1960A]"
                        >
                            {step === 3 ? 'Cadastrar' : 'Próximo'}
                        </button>
                    </div>
                </form>

                {/* Link para página de login caso já tenha conta */}
                <p className="text-center text-[#AE8567] mt-8">
                    Já possui conta? <Link to="/login" className="text-[#D92E1E] font-medium hover:underline">Login</Link>
                </p>

            </div>
        </div>
    );
}

export default Cadastro;
