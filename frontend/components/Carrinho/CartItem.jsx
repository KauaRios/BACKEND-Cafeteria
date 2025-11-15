export function CartItem({ item, onUpdateQuantity, onRemove }) {
  // Diminui a quantidade ou remove o item se for 1
  const handleDecrease = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    } else {
      onRemove(item.id);
    }
  };

  // Aumenta a quantidade em 1
  const handleIncrease = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  return (
    <div className="flex gap-6">
      {/* Imagem do produto (backgroundImage) */}
      <div
        className="w-32 h-32 bg-[#D92E1E] rounded-md flex-shrink-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${item.imgUrl})` }}
      />

      {/* Área principal: nome/controles à esquerda e remover/preço à direita */}
      <div className="flex-grow flex flex-row justify-between">
        {/* Nome do produto e controles de quantidade */}
        <div className="flex flex-col justify-between py-1">
          <h3 className="archivo font-semibold text-3xl">{item.nome}</h3>

          {/* Controles: diminuir, quantidade atual, aumentar */}
          <div className="flex items-center border border-[#6B594A]/50 rounded-md min-w-[120px] justify-between lora w-fit">
            <button
              onClick={handleDecrease}
              className="px-4 py-1 text-lg cursor-pointer rounded-l-md hover:bg-black/10 transition-colors"
            >
              -
            </button>

            {/* Quantidade atual */}
            <span className="px-3 text-md">{item.quantity}</span>

            <button
              onClick={handleIncrease}
              className="px-4 py-1 text-lg cursor-pointer rounded-r-md hover:bg-black/10 transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Botão remover e exibição do preço */}
        <div className="flex flex-col justify-between items-end py-1">
          <button
            onClick={() => onRemove(item.id)}
            className="text-[#D92E1E] lora font-semibold text-sm uppercase cursor-pointer hover:underline"
          >
            REMOVER
          </button>

          {/* Preço formatado (R$ 0,00) */}
          <span className="archivo font-bold text-2xl">
            R$ {item.preco.toFixed(2).replace('.', ',')}
          </span>
        </div>
      </div>
    </div>
  );
}
