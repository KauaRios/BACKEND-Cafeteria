import React, { useRef, useLayoutEffect, useState } from 'react';
import { X } from 'lucide-react';
import gsap from 'gsap';
import { CartItem } from './CartItem'; 

// Componente: barra lateral do carrinho
export function CartSidebar({ 
  onClose,
  items = [], 
  onUpdateQuantity, 
  onRemoveItem 
}) {

  // Refs para acessar elementos DOM usados nas animações
  const cartRef = useRef(null);
  const overlayRef = useRef(null);

  // Estado para controlar quando iniciar animação de fechamento
  const [isClosing, setIsClosing] = useState(false);

  // Dispara animação de fechamento (define estado)
  const triggerClose = () => {
    setIsClosing(true);
  };

  // useLayoutEffect para gerenciar animações de entrada/saída com GSAP
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (isClosing) {
        gsap.to(overlayRef.current, { 
          opacity: 0, 
          duration: 0.3, 
          pointerEvents: 'none' 
        });
        gsap.to(cartRef.current, { 
          x: '100%', 
          duration: 0.4, 
          ease: 'power3.in',
          onComplete: onClose 
        });
      } else {
        gsap.from(overlayRef.current, { 
          opacity: 0, 
          duration: 0.3, 
          pointerEvents: 'auto' 
        });
        gsap.from(cartRef.current, { 
          x: '100%', 
          duration: 0.4, 
          ease: 'power3.out' 
        });
      }
    }, [cartRef, overlayRef]);

    return () => ctx.revert(); 
  }, [isClosing, onClose]);

  // Cálculo de valores exibidos no rodapé do carrinho
  const subtotal = items.reduce((acc, item) => acc + (item.preco * item.quantity), 0);
  const taxaServico = 0.99;
  const frete = 9.99;
  const total = subtotal + taxaServico + frete;

  // --- NOVA FUNÇÃO: REDIRECIONAMENTO WHATSAPP ---
  const finalizarPeloWhatsapp = () => {
    // 1.NÚMERO DO ZAP (DDI + DDD + NUMERO)
    const numeroLoja = "+5521987112208"; 

    if (items.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }

    let mensagem = "👋 Olá! Gostaria de finalizar o seguinte pedido:\n\n";
    
    items.forEach((item) => {
      // Nota: Assumi que o nome do prato é 'item.nome'. Se for 'item.name' ou 'item.titulo'
      const valorItem = item.preco * item.quantity;
      mensagem += `🍔 *${item.quantity}x ${item.nome || item.name || "Item"}*\n`; 
      mensagem += `   (R$ ${item.preco.toFixed(2)} cada) = R$ ${valorItem.toFixed(2)}\n`;
    });

    mensagem += `\n📦 *Subtotal:* R$ ${subtotal.toFixed(2)}`;
    mensagem += `\n🚚 *Taxas e Frete:* R$ ${(taxaServico + frete).toFixed(2)}`;
    mensagem += `\n💰 *TOTAL:* R$ ${total.toFixed(2)}`;
    mensagem += `\n\n📍 *Endereço de Entrega:* \n(Escreva aqui)`;

    const textoCodificado = encodeURIComponent(mensagem);
    const linkZap = `https://wa.me/${numeroLoja}?text=${textoCodificado}`;
    
    window.open(linkZap, '_blank');
  };
  // ----------------------------------------------

  return (
    <main>
      {/* Overlay semitransparente */}
      <div
        ref={overlayRef}
        onClick={triggerClose}
        className="fixed inset-0 bg-black opacity-50 z-40 cursor-pointer"
      />

      {/* Painel do carrinho */}
      <aside
        ref={cartRef}
        className="fixed top-0 right-0 h-full w-full max-w-[800px] bg-[#F9F5E9] text-[#261A10] 
                   shadow-xl flex flex-col z-50"
      >
        {/* Cabeçalho */}
        <header className="flex items-center justify-between p-8 bg-[#F2A71B] shadow-md">
          <h2 className="text-2xl archivo font-black text-[#261A10]">SEU CARRINHO</h2>
          <button 
            onClick={triggerClose}
            className="text-[#261A10] p-1 rounded-full hover:bg-black/10 transition-colors cursor-pointer"
          >
            <X size={28} />
          </button>
        </header>

        {/* Lista de itens */}
        <div className="flex-grow p-8 overflow-y-auto lora">
          {items.length === 0 ? (
            <p className="text-center text-[#6B594A]">Seu carrinho está vazio.</p>
          ) : (
            items.map((item, index) => (
              <React.Fragment key={item.id}>
                <CartItem 
                  item={item} 
                  onUpdateQuantity={onUpdateQuantity}
                  onRemove={onRemoveItem}
                />
                {index < items.length - 1 && (
                  <hr className="border-dashed border-[#6B594A]/80 my-4" />
                )}
              </React.Fragment>
            ))
          )}
        </div>

        {/* Rodapé */}
        <footer className="p-8 border-t-2 border-[#6B594A]/50">
          <div className="space-y-2 text-[#6B594A] lora">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxa de serviço:</span>
              <span>R$ {taxaServico.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between">
              <span>Frete:</span>
              <span>R$ {frete.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>

          <hr className="border-dashed border-[#6B594A]/80 my-4" />

          <div className="flex justify-between items-center text-[#261A10] archivo font-bold text-2xl mb-6">
            <span>Total:</span>
            <span>R$ {total.toFixed(2).replace('.', ',')}</span>
          </div>

          {/* Botões */}
          <div className="flex flex-col gap-3 archivo font-semibold">
            <button className="w-full py-4 px-6 rounded-full border border-[#6B594A] text-[#6B594A] cursor-pointer hover:bg-black/5 transition-colors">
              CONTINUAR COMPRANDO
            </button>
            
            {/* AQUI ESTÁ O BOTÃO MODIFICADO */}
            <button 
              onClick={finalizarPeloWhatsapp}
              className="w-full py-4 px-6 rounded-full bg-[#F2A71B] text-[#261A10] font-bold cursor-pointer hover:bg-[#E0991A] transition-colors"
            >
              FINALIZAR COMPRA
            </button>
          </div>
        </footer>
      </aside>
    </main>
  );
}