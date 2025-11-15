// Importa hooks do React e ícones usados no componente
import { useState, useRef } from 'react';
import { Plus, ChevronRight, ChevronLeft } from "lucide-react";

// Mapeamento das categorias do cardápio (id => nome)
const categorias = {
    1: "Entradas",
    2: "Sashimi",
    3: "Sushi",
    4: "Rolls",
    5: "Pratos Quentes",
    6: "Temaki",
    7: "Jyo",
    8: "Hots",
    9: "Combinados",
    10: "Hamburguers",
    11: "Sobremesas",
    12: "Bebidas",
    13: "Bebidas alcólicas"
};

// Dados dos itens do menu agrupados por categoria (idCategoria => [itens])
const menuItens = {
    "1": [ // Entradas
        {
            id: 101,
            imgUrl: "/entradas/missobiru.png",
            nome: "Missobiru",
            descricao: "Sopa de pasta de soja com pedaços de tofu",
            preco: 19.00,
        },
        {
            id: 105,
            imgUrl: "/entradas/mix.png",
            nome: "Mix de cogumelos",
            descricao: "Shitake e shimeji na manteiga especial",
            preco: 37.00,
        },
        {
            id: 106,
            imgUrl: "/entradas/ceviche.png",
            nome: "Ceviche",
            descricao: "Peixe branco, cebola roxa, marinado com suco de limão e laranja, pimenta dedo de moça, coentro, pimenta japonesa togarashi",
            preco: 54.00,
        },
        {
            id: 107,
            imgUrl: "/entradas/harumaki.png",
            nome: "Harumaki",
            descricao: "Pastelzinho chinês com recheio de queijo, legumes, camarão ou salmão",
            preco: 41.00,
        },
        {
            id: 108,
            imgUrl: "/entradas/gyoza.png",
            nome: "Gyoza especial In (4 unid)",
            descricao: "Pastel japonês grelhado, coberto com geleia de pimenta",
            preco: 44.00,
        },
        {
            id: 109,
            imgUrl: "/entradas/tempura.png",
            nome: "Tempura legumes",
            descricao: "Legumes empanado na farinha",
            preco: 43.00,
        },
        {
            id: 110,
            imgUrl: "/entradas/pastel_frango.png",
            nome: "Pastel frango (2 unid)",
            descricao: "undefined",
            preco: 43.00,
        },
        {
            id: 111,
            imgUrl: "/entradas/pastel_camarao1.png",
            nome: "Pastel camarão (2 unid)",
            descricao: "undefined",
            preco: 46.00,
        },
        {
            id: 112,
            imgUrl: "/entradas/pastel_camarao2.png",
            nome: "Pastel camarão/cream cheese (2 unid)",
            descricao: "undefined",
            preco: 46.00,
        },
        {
            id: 113,
            imgUrl: "/entradas/pastel_queijo.png",
            nome: "Pastel queijo (2 unid)",
            descricao: "undefined",
            preco: 39.00,
        },
        {
            id: 114,
            imgUrl: "/entradas/pastel_carne.png",
            nome: "Pastel carne (2 unid)",
            descricao: "undefined",
            preco: 34.00,
        },
    ],
    "2": [ // Sashimi
        {
            id: 201,
            imgUrl: "/sashimi/salmao.png",
            nome: "Sashimi salmão (10 fatias)",
            descricao: "undefined",
            preco: 47.00,
        },
        {
            id: 202,
            imgUrl: "/sashimi/salmao_selado.png",
            nome: "Sashimi salmão selado (10 fatias)",
            descricao: "undefined",
            preco: 49.00,
        },
        {
            id: 203,
            imgUrl: "/sashimi/peixe_branco.png",
            nome: "Sashimi peixe branco (10 fatias)",
            descricao: "undefined",
            preco: 40.00,
        },
        {
            id: 204,
            imgUrl: "/sashimi/atum.png",
            nome: "Sashimi atum (10 fatias)",
            descricao: "undefined",
            preco: 40.00,
        },
        {
            id: 205,
            imgUrl: "/sashimi/salmao_roast.png",
            nome: "Sashimi roast de salmão (10 fatias)",
            descricao: "undefined",
            preco: 51.00,
        },
        {
            id: 206,
            imgUrl: "/sashimi/salmao_black.png",
            nome: "Sashimi salmão black (10 fatias)",
            descricao: "undefined",
            preco: 51.00,
        },
        {
            id: 207,
            imgUrl: "/sashimi/mix_sashimi.png",
            nome: "Sashimi mix (15 fatias)",
            descricao: "Salmão, atum, peixe branco",
            preco: 67.00,
        },
    ],
    "3": [ // Sushi (Peixe com Arroz)
        {
            id: 301,
            imgUrl: "/sushi/salmao.png",
            nome: "Sushi salmão (2 unid)",
            descricao: "undefined",
            preco: 22.00,
        },
        {
            id: 302,
            imgUrl: "",
            nome: "Sushi salmão selado (2 unid)",
            descricao: "undefined",
            preco: 25.00,
        },
        {
            id: 303,
            imgUrl: "",
            nome: "Sushi atum (2 unid)",
            descricao: "undefined",
            preco: 22.00,
        },
        {
            id: 304,
            imgUrl: "",
            nome: "Sushi peixe branco (2 unid)",
            descricao: "undefined",
            preco: 19.00,
        },
        {
            id: 305,
            imgUrl: "",
            nome: "Sushi negi (2 unid)",
            descricao: "undefined",
            preco: 18.00,
        },
        {
            id: 306,
            imgUrl: "",
            nome: "Sushi kani (2 unid)",
            descricao: "undefined",
            preco: 18.00,
        },
        {
            id: 307,
            imgUrl: "",
            nome: "Sushi haddock (2 unid)",
            descricao: "undefined",
            preco: 24.00,
        },
        {
            id: 308,
            imgUrl: "",
            nome: "Sushi skin (2 unid)",
            descricao: "undefined",
            preco: 16.00,
        },
        {
            id: 309,
            imgUrl: "",
            nome: "Sushi polvo (2 unid)",
            descricao: "undefined",
            preco: 28.00,
        },
    ],
    "4": [ // Rolls (Maki / Uramaki)
        {
            id: 401,
            imgUrl: "",
            nome: "Salmão maki",
            descricao: "Nori, arroz e salmão",
            preco: 28.00,
        },
        {
            id: 402,
            imgUrl: "",
            nome: "Tekka maki",
            descricao: "Nori, arroz e atum",
            preco: 25.00,
        },
        {
            id: 403,
            imgUrl: "",
            nome: "Philadelfia salmão roll",
            descricao: "Nori, arroz, salmão, cream cheese",
            preco: 40.00,
        },
        {
            id: 404,
            imgUrl: "",
            nome: "Skin uramaki",
            descricao: "Nori, arroz, pele de salmão grelhada e cebolinha",
            preco: 39.00,
        },
        {
            id: 405,
            imgUrl: "",
            nome: "California uramaki",
            descricao: "Nori, arroz, manga, pepino japonês e kani",
            preco: 40.00,
        },
        {
            id: 406,
            imgUrl: "",
            nome: "Philadelfia uramaki",
            descricao: "Nori, arroz, salmão, cebolinha e cream cheese",
            preco: 45.00,
        },
        {
            id: 407,
            imgUrl: "",
            nome: "Haddock uramaki",
            descricao: "Nori, arroz, salmão, haddock, cream cheese coberto com molho teriaki",
            preco: 50.00,
        },
        {
            id: 408,
            imgUrl: "",
            nome: "Havocado ebi",
            descricao: "Nori, arroz, camarão empanado, cream cheese, envolvido com abacate e molho teriaki",
            preco: 51.00,
        },
        {
            id: 409,
            imgUrl: "",
            nome: "Havocado salmão",
            descricao: "Nori, arroz, salmão, cream cheese, envolvido com abacate e molho teriaki",
            preco: 50.00,
        },
        {
            id: 410,
            imgUrl: "",
            nome: "Gojiro roll",
            descricao: "Nori, arroz, salmão, abacate, kani, kimchi, gergelim, molho teriaki",
            preco: 57.00,
        },
    ],
    "5": [ // Pratos Quentes (Yakisoba, Teppan, Botequim)
        {
            id: 501,
            imgUrl: "",
            nome: "Teppan yaki frango",
            descricao: "Acompanhado de legumes",
            preco: 59.00,
        },
        {
            id: 502,
            imgUrl: "",
            nome: "Teppan yaki salmão",
            descricao: "Acompanhado de legumes",
            preco: 70.00,
        },
        {
            id: 503,
            imgUrl: "",
            nome: "Teppan yaki filé",
            descricao: "Acompanhado de legumes",
            preco: 70.00,
        },
        {
            id: 504,
            imgUrl: "",
            nome: "Yakimeshi",
            descricao: "Arroz com legumes, ovo e cebolinha",
            preco: 37.00,
        },
        {
            id: 505,
            imgUrl: "",
            nome: "Teppan especial in",
            descricao: "Nobre corte de filé mignon ou salmão na manteiga com cebola",
            preco: 88.00,
        },
        {
            id: 506,
            imgUrl: "",
            nome: "Yakisoba de frango (1 porção)",
            descricao: "undefined",
            preco: 54.00,
        },
        {
            id: 507,
            imgUrl: "",
            nome: "Yakisoba de camarão (1 porção)",
            descricao: "undefined",
            preco: 72.00,
        },
        {
            id: 508,
            imgUrl: "",
            nome: "Yakisoba de frutos do mar",
            descricao: "Camarão, lula, polvo, peixe",
            preco: 69.00,
        },
        {
            id: 509,
            imgUrl: "",
            nome: "Yakisoba de legumes",
            descricao: "undefined",
            preco: 49.00,
        },
        {
            id: 510,
            imgUrl: "",
            nome: "Filé de mignon acebolado",
            descricao: "Com torradas",
            preco: 95.00,
        },
        {
            id: 511,
            imgUrl: "",
            nome: "Filé frango acebolado",
            descricao: "Com torradas",
            preco: 65.00,
        },
        {
            id: 512,
            imgUrl: "",
            nome: "Calabresa acebolada",
            descricao: "Com calabresa acebolada",
            preco: 59.00,
        },
        {
            id: 513,
            imgUrl: "",
            nome: "Anéis de lula à milanesa",
            descricao: "Farinha panko servido com molho",
            preco: 71.00,
        },
        {
            id: 514,
            imgUrl: "",
            nome: "Batata frita (1 porção)",
            descricao: "undefined",
            preco: 33.00,
        },
        {
            id: 515,
            imgUrl: "",
            nome: "Tirashi",
            descricao: "Generosa porção de arroz japonês temperado (shari), gergelim, kani, salmão skin, 5 sashimis de salmão, 5 sashimis de atum, 5 sashimis de peixe branco e camarão",
            preco: 91.00,
        },
    ],
    "6": [ // Temaki
        {
            id: 601,
            imgUrl: "",
            nome: "Salmão tradicional",
            descricao: "Nori, arroz, salmão e cebolinha",
            preco: 41.00,
        },
        {
            id: 602,
            imgUrl: "",
            nome: "Atum tradicional",
            descricao: "Nori, arroz, atum e cebolinha",
            preco: 43.00,
        },
        {
            id: 603,
            imgUrl: "",
            nome: "Salmão philadelfia",
            descricao: "Nori, arroz, salmão, cebolinha e cream cheese",
            preco: 45.00,
        },
        {
            id: 604,
            imgUrl: "",
            nome: "Skin",
            descricao: "Nori, arroz, pele de salmão grelhada e cebolinha",
            preco: 38.00,
        },
    ],
    "7": [ // Jyo
        {
            id: 701,
            imgUrl: "",
            nome: "Jyo",
            descricao: "Nori, arroz, salmão, cebolinha e pêra (esfirra japonesa)",
            preco: 46.00,
        },
        {
            id: 702,
            imgUrl: "",
            nome: "Salmão grelhado",
            descricao: "Salmão grelhado no arroz com cream cheese, servido com teriaki",
            preco: 46.00,
        },
        {
            id: 703,
            imgUrl: "",
            nome: "Salmão ebi",
            descricao: "Salmão grelhado, envolvido no arroz com cream cheese, camarão, cebolinha e gergelim, servido com teriaki",
            preco: 48.00,
        },
        {
            id: 704,
            imgUrl: "",
            nome: "Especial salmão alho poró",
            descricao: "Salmão grelhado envolvido no arroz com cream cheese, cebolinha, gergelim, servido com teriaki e coberto de alho poró frito",
            preco: 51.00,
        },
        {
            id: 705,
            imgUrl: "",
            nome: "Salmão shitake",
            descricao: "Tiras de salmão grelhado no arroz com shitake e cream cheese, servido com teriaki",
            preco: 45.00,
        },
        {
            id: 706,
            imgUrl: "",
            nome: "Misto (6 unid.)",
            descricao: "2 salmão ebi, 2 especial alho poró, 2 jyos de geleia e 2 jyos de ebi",
            preco: 56.00,
        },
        {
            id: 707,
            imgUrl: "",
            nome: "Kupy",
            descricao: "Tiras de salmão grelhado no arroz com cream cheese, cebolinha, gergelim, coberto de alho poró frito, servido no massarico",
            preco: 49.00,
        },
    ],
    "8": [ // Hots
        {
            id: 801,
            imgUrl: "",
            nome: "Hot philadelfia",
            descricao: "Nori, arroz, salmão, cream cheese, cebolinha e geleia de pimenta",
            preco: 50.00,
        },
        {
            id: 802,
            imgUrl: "",
            nome: "Hot salmão philadelfia",
            descricao: "Nori, arroz, salmão, cebolinha, farinha panko e cream cheese, servido com teriaki",
            preco: 51.00,
        },
        {
            id: 803,
            imgUrl: "",
            nome: "Hot roast de salmão",
            descricao: "Nori, arroz, salmão, servido com teriaki",
            preco: 46.00,
        },
        {
            id: 804,
            imgUrl: "",
            nome: "Hot especial",
            descricao: "Nori, arroz, salmão de camarão, kani, cream cheese e cebolinha, servido com teriaki",
            preco: 57.00,
        },
        {
            id: 805,
            imgUrl: "",
            nome: "Hot camiebi",
            descricao: "Nori, arroz, camarão, cebolinha, farinha panko, cream cheese e molho teriaki, envolvido no salmão",
            preco: 63.00,
        },
        {
            id: 806,
            imgUrl: "",
            nome: "Hot especial com alho poró",
            descricao: "Arroz, salmão, camarão empanado, gergelim e cebolinha, servido com teriaki",
            preco: 56.00,
        },
    ],
    "9": [ // Combinados
        {
            id: 901,
            imgUrl: "",
            nome: "Kioto - 20 peças",
            descricao: "4 sashimis de salmão/4 sashimis de salmão philadelfia/8 philadelfia/4 sushis",
            preco: 97.00,
        },
        {
            id: 902,
            imgUrl: "",
            nome: "Tokyo - 30 peças",
            descricao: "5 sashimis de salmão/5 sashimis de atum/5 philadelfia/ 5 california/4 sushis de salmão/4 sushis de atum/2 sushis de peixe branco",
            preco: 143.00,
        },
        {
            id: 903,
            imgUrl: "",
            nome: "Samurai - 45 peças",
            descricao: "5 sashimis de salmão/5 sashimis de atum/5 sashimis de peixe branco/5 sashimis de salmão selado/5 philadelfia/5 california/2 sushis de salmão/2 sushis de atum/2 sushis de peixe branco/ 2 salmão zen/2 philadelfia/5 hots",
            preco: 189.00,
        },
        {
            id: 904,
            imgUrl: "",
            nome: "Mix do chefe - 65 peças",
            descricao: "10 sashimis de salmão/5 sashimis de atum/5 sashimis de peixe branco/5 sashimis selado/5 sashimis de haddock/3 sushis de salmão/3 sushis de atum/3 sushis de peixe branco/3 sushis haddock/3 sushis skin/ 6 goast ebi/8 philadelfia hulamaki/10 hots salmão philadelfia",
            preco: 259.00,
        },
        {
            id: 905,
            imgUrl: "",
            nome: "Especial in - 72 peças",
            descricao: "5 sashimis de salmão/5 sashimis de atum/5 sashimis de peixe branco/5 sashimis selado/5 sashimis de haddock/3 sushis de salmão/3 sushis de atum/3 sushis de peixe branco/3 sushis haddock/3 sushis skin/ 5 salmão ebi/5 jyo/5 salmão alho poró/ 10 hots especial/10 california especial",
            preco: 288.00,
        },
    ],
    "10": [ // Hamburguers
        {
            id: 1001,
            imgUrl: "/hamburguers/carne.png",
            nome: "In-crível carne",
            descricao: "180 gramas de carne bovina, com queijo e salada",
            preco: 47.00,
        },
        {
            id: 1002,
            imgUrl: "/hamburguers/jack.png",
            nome: "In-crível jack",
            descricao: "180 gramas de carne bovina, com queijo, salada e molho jack daniels. acompanha batata frita e anel onion",
            preco: 58.00,
        },
        {
            id: 1003,
            imgUrl: "/hamburguers/frango.png",
            nome: "In-crível frango",
            descricao: "180 gramas de frango, com queijo e salada",
            preco: 48.00,
        },
        {
            id: 1004,
            imgUrl: "/hamburguers/gourmet.png",
            nome: "In-crível gourmet",
            descricao: "180 gramas de carne bovina ou frango, com shitake, cebola e barbecue",
            preco: 52.00,
        },
        {
            id: 1005,
            imgUrl: "/hamburguers/mega.png",
            nome: "Mega in-crível carne",
            descricao: "360 gramas de carne bovina, com queijo e salada",
            preco: 65.00,
        },
    ],
    "11": [ // Sobremesas
        {
            id: 1101,
            imgUrl: "",
            nome: "In-sanga",
            descricao: "Banana com chocolate com avelã, servido com sorvete de creme e cobertura opcional com calda de chocolate",
            preco: 50.00,
        },
        {
            id: 1102,
            imgUrl: "",
            nome: "Tempura de sorvete",
            descricao: "Bolo de laranja com recheio de sorvete de creme empanado na farinha panko, coberto com calda de chocolate e acompanhado de frutas",
            preco: 45.00,
        },
        {
            id: 1103,
            imgUrl: "",
            nome: "Petit gateau",
            descricao: "Acompanhado de sorvete de creme",
            preco: 41.00,
        },
        {
            id: 1104,
            imgUrl: "",
            nome: "Banana caramelada (2 unid)",
            descricao: "Banana caramelada acompanhada de sorvete",
            preco: 40.00,
        },
        {
            id: 1105,
            imgUrl: "",
            nome: "Sorvete (bola)",
            descricao: "undefined",
            preco: 11.00,
        },
        {
            id: 1106,
            imgUrl: "",
            nome: "Harumaki goiabada c/ cream cheese (2 unid)",
            descricao: "undefined",
            preco: 19.00,
        },
        {
            id: 1107,
            imgUrl: "",
            nome: "Harumaki nutella/ avelã com chocolate nobre (2 unid)",
            descricao: "undefined",
            preco: 22.00,
        },
        {
            id: 1108,
            imgUrl: "",
            nome: "Harumaki nutella (2 unid)",
            descricao: "undefined",
            preco: 19.00,
        },
        {
            id: 1109,
            imgUrl: "",
            nome: "Harumaki banana (2 unid)",
            descricao: "undefined",
            preco: 18.00,
        },
        {
            id: 1110,
            imgUrl: "",
            nome: "Harumaki doce de leite (2 unid)",
            descricao: "undefined",
            preco: 20.00,
        },
    ],
    "12": [ // Bebidas (Não Alcoólicas)
        {
            id: 1201,
            imgUrl: "",
            nome: "Refrigerante lata",
            descricao: "Coca, coca zero, guaraná",
            preco: 8.50,
        },
        {
            id: 1202,
            imgUrl: "",
            nome: "Schweppes",
            descricao: "Citrus, tônica",
            preco: 8.50,
        },
        {
            id: 1203,
            imgUrl: "",
            nome: "Del valle lata",
            descricao: "undefined",
            preco: 8.50,
        },
        {
            id: 1204,
            imgUrl: "",
            nome: "Água sem gás",
            descricao: "undefined",
            preco: 5.00,
        },
        {
            id: 1205,
            imgUrl: "",
            nome: "Guaraviton",
            descricao: "undefined",
            preco: 6.00,
        },
        {
            id: 1206,
            imgUrl: "",
            nome: "Água tônica",
            descricao: "undefined",
            preco: 8.50,
        },
        {
            id: 1207,
            imgUrl: "",
            nome: "Água garrafinha",
            descricao: "Com gás / sem gás",
            preco: 7.00,
        },
        {
            id: 1208,
            imgUrl: "",
            nome: "Sucos",
            descricao: "Laranja, abacaxi, limão, maracujá, morango",
            preco: 9.00,
        },
        {
            id: 1209,
            imgUrl: "",
            nome: "H2oh!",
            descricao: "undefined",
            preco: 9.00,
        },
        {
            id: 1210,
            imgUrl: "",
            nome: "Gatorade limão",
            descricao: "undefined",
            preco: 10.00,
        },
        {
            id: 1211,
            imgUrl: "",
            nome: "Smirnoff ice",
            descricao: "undefined",
            preco: 16.00,
        },
        {
            id: 1212,
            imgUrl: "",
            nome: "Red bull",
            descricao: "Energético",
            preco: 18.00,
        },
    ],
    "13": [ // Bebidas alcólicas (Cervejas, Drinks, Doses)
        {
            id: 1301,
            imgUrl: "",
            nome: "Eisenbahn 355ml",
            descricao: "undefined",
            preco: 13.00,
        },
        {
            id: 1302,
            imgUrl: "",
            nome: "Therezópolis 500ml",
            descricao: "undefined",
            preco: 22.00,
        },
        {
            id: 1303,
            imgUrl: "",
            nome: "Baden baden 600ml",
            descricao: "undefined",
            preco: 22.00,
        },
        {
            id: 1304,
            imgUrl: "",
            nome: "Stella artois 330ml",
            descricao: "undefined",
            preco: 13.00,
        },
        {
            id: 1305,
            imgUrl: "",
            nome: "Corona 330ml",
            descricao: "undefined",
            preco: 14.00,
        },
        {
            id: 1306,
            imgUrl: "",
            nome: "Antarctica original 600ml",
            descricao: "undefined",
            preco: 14.00,
        },
        {
            id: 1307,
            imgUrl: "",
            nome: "Kirin ichiban (japão) 330ml",
            descricao: "undefined",
            preco: 12.00,
        },
        {
            id: 1308,
            imgUrl: "",
            nome: "Super bock (portugal) 330ml",
            descricao: "undefined",
            preco: 14.00,
        },
        {
            id: 1309,
            imgUrl: "",
            nome: "Amstel 600ml",
            descricao: "undefined",
            preco: 18.00,
        },
        {
            id: 1310,
            imgUrl: "",
            nome: "Leffe 330ml",
            descricao: "undefined",
            preco: 24.00,
        },
        {
            id: 1311,
            imgUrl: "",
            nome: "Birra moretti (itália) 330ml",
            descricao: "undefined",
            preco: 19.00,
        },
        {
            id: 1312,
            imgUrl: "",
            nome: "Corona (méxico) 600ml",
            descricao: "undefined",
            preco: 16.00,
        },
        {
            id: 1313,
            imgUrl: "",
            nome: "Sol (méxico) 600ml",
            descricao: "undefined",
            preco: 16.00,
        },
        {
            id: 1314,
            imgUrl: "",
            nome: "Quilmes 970ml",
            descricao: "undefined",
            preco: 27.00,
        },
        {
            id: 1315,
            imgUrl: "",
            nome: "Patagonia 740ml",
            descricao: "undefined",
            preco: 27.00,
        },
        {
            id: 1316,
            imgUrl: "",
            nome: "Norteña 960ml",
            descricao: "undefined",
            preco: 27.00,
        },
        {
            id: 1317,
            imgUrl: "",
            nome: "Budweiser 343ml",
            descricao: "undefined",
            preco: 12.00,
        },
        {
            id: 1318,
            imgUrl: "",
            nome: "Budweiser 600ml",
            descricao: "undefined",
            preco: 18.00,
        },
        {
            id: 1319,
            imgUrl: "",
            nome: "Heineken 600ml",
            descricao: "undefined",
            preco: 19.00,
        },
        {
            id: 1320,
            imgUrl: "",
            nome: "Miller 600ml",
            descricao: "undefined",
            preco: 17.00,
        },
        {
            id: 1321,
            imgUrl: "",
            nome: "Paulaner 500ml",
            descricao: "undefined",
            preco: 34.00,
        },
        {
            id: 1322,
            imgUrl: "",
            nome: "Kaishi 500ml",
            descricao: "undefined",
            preco: 33.00,
        },
        // Drinks
        {
            id: 1323,
            imgUrl: "",
            nome: "Aperol spritz",
            descricao: "undefined",
            preco: 36.00,
        },
        {
            id: 1324,
            imgUrl: "",
            nome: "Gin tônica",
            descricao: "Gordons e beefeater",
            preco: 38.00,
        },
        {
            id: 1325,
            imgUrl: "",
            nome: "Mojito",
            descricao: "Rum da casa",
            preco: 38.00,
        },
        // Vinho e Espumantes
        {
            id: 1326,
            imgUrl: "",
            nome: "Concha y toro",
            descricao: "undefined",
            preco: 62.00,
        },
        {
            id: 1327,
            imgUrl: "",
            nome: "Gato",
            descricao: "undefined",
            preco: 65.00,
        },
        {
            id: 1328,
            imgUrl: "",
            nome: "Casillero del diablo",
            descricao: "undefined",
            preco: 92.00,
        },
        {
            id: 1329,
            imgUrl: "",
            nome: "Chandon brut",
            descricao: "undefined",
            preco: 128.00,
        },
        {
            id: 1330,
            imgUrl: "",
            nome: "Chandon brut rose",
            descricao: "undefined",
            preco: 138.00,
        },
        // Doses
        {
            id: 1331,
            imgUrl: "",
            nome: "Saquê kirin dourado (dose)",
            descricao: "undefined",
            preco: 22.00,
        },
        {
            id: 1332,
            imgUrl: "",
            nome: "Absolut (dose)",
            descricao: "undefined",
            preco: 20.00,
        },
        {
            id: 1333,
            imgUrl: "",
            nome: "Red label (dose)",
            descricao: "undefined",
            preco: 27.00,
        },
        {
            id: 1334,
            imgUrl: "",
            nome: "Black label (dose)",
            descricao: "undefined",
            preco: 37.00,
        },
        {
            id: 1335,
            imgUrl: "",
            nome: "Ballantines 12 anos (dose)",
            descricao: "undefined",
            preco: 27.00,
        },
        {
            id: 1336,
            imgUrl: "",
            nome: "Chivas regal (dose)",
            descricao: "undefined",
            preco: 24.00,
        },
        {
            id: 1337,
            imgUrl: "",
            nome: "Jack daniel/honey (dose)",
            descricao: "undefined",
            preco: 33.00,
        },
        // Caipis
        {
            id: 1338,
            imgUrl: "",
            nome: "Caipisaquê morango",
            descricao: "undefined",
            preco: 35.00,
        },
        {
            id: 1339,
            imgUrl: "",
            nome: "Caipisaquê kiwi",
            descricao: "undefined",
            preco: 32.00,
        },
        {
            id: 1340,
            imgUrl: "",
            nome: "Caipisaquê lichia",
            descricao: "undefined",
            preco: 38.00,
        },
        {
            id: 1341,
            imgUrl: "",
            nome: "Caipivodka limão",
            descricao: "undefined",
            preco: 32.00,
        },
        {
            id: 1342,
            imgUrl: "",
            nome: "Caipivodka morango",
            descricao: "undefined",
            preco: 35.00,
        },
        {
            id: 1343,
            imgUrl: "",
            nome: "Caipivodka kiwi",
            descricao: "undefined",
            preco: 32.00,
        },
        {
            id: 1344,
            imgUrl: "",
            nome: "Caipivodka lichia",
            descricao: "undefined",
            preco: 37.00,
        },
    ]
};

// Componente principal que recebe onAddItem para adicionar itens ao carrinho
export default function SelectorCardapio({ onAddItem }) {

    // Estado da categoria atualmente selecionada (string id)
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("1");
    // Lista de itens filtrada pela categoria selecionada
    const itensDaCategoria = menuItens[categoriaSelecionada] || [];

    // Ref para o contêiner do seletor de categorias (scroll horizontal)
    const seletorRef = useRef(null); 
    // Ref para o contêiner dos itens do cardápio (scroll horizontal)
    const itensRef = useRef(null); 

    // Scrolla o seletor de categorias para a esquerda
    const scrollLeft = () => {
        if (seletorRef.current) {
            seletorRef.current.scrollBy({ left: -200, behavior: 'smooth' });
        }
    };
    // Scrolla o seletor de categorias para a direita
    const scrollRight = () => {
        if (seletorRef.current) {
            seletorRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
    };
    // Scrolla a lista de itens para a esquerda
    const scrollItensLeft = () => {
        if (itensRef.current) {
            itensRef.current.scrollBy({ left: -420, behavior: 'smooth' });
        }
    };
    // Scrolla a lista de itens para a direita
    const scrollItensRight = () => {
        if (itensRef.current) {
            itensRef.current.scrollBy({ left: 420, behavior: 'smooth' });
        }
    };

    // Atualiza a categoria selecionada ao clicar em uma categoria
    const handleClick = (key) => {
        setCategoriaSelecionada(key);
    };

    return (
        // Seção principal do seletor e lista de itens do cardápio
        <section className="py-8 bg-[#f2d9bb] flex flex-col justify-between items-center gap-8">
            
            <div className="w-full max-w-[75%] flex flex-row items-center gap-2">
                {/* Botão scroll esquerda do seletor de categorias */}
                <button 
                    onClick={scrollLeft}
                    className="p-1 rounded-full bg-[#261a10]/50 text-[#f2d9bb] cursor-pointer hover:bg-[#f2a71b]/83 hover:text-[#261a10] transition-colors"
                >
                    <ChevronLeft size={24} />
                </button>
                    
                {/* Contêiner rolável com as categorias */}
                <div 
                    ref={seletorRef} 
                    className="seletor container-about flex-1 overflow-x-scroll flex flex-row items-center gap-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" 
                    id="seletor"
                >
                    {Object.entries(categorias).map(([key, value]) => {
                        const isSelected = key === categoriaSelecionada;
                        const baseClasses = "whitespace-nowrap px-3 py-1.5 rounded-md transition-colors duration-150 ease-out text-xl";
                        const selectedClasses = "text-[#261a10] bg-[#f2a71b]"; 
                        const unselectedClasses = "text-[#f2d9bb] bg-[#261a10]/75 hover:bg-[#f2a71b] hover:text-[#261a10]"; 
                        const finalClasses = `${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`;

                        return (
                            // Link de categoria que ao clicar seleciona sem navegar
                            <a 
                                key={key} 
                                href={`#categoria-${key}`} 
                                className={finalClasses}
                                onClick={(e) => { e.preventDefault(); handleClick(key); }}
                            >
                                {value}
                            </a>
                        );
                    })}
                </div>

                {/* Botão scroll direita do seletor de categorias */}
                <button 
                    onClick={scrollRight}
                    className="p-1 rounded-full bg-[#261a10]/50 text-[#f2d9bb] cursor-pointer hover:bg-[#f2a71b]/83 hover:text-[#261a10] transition-colors"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {itensDaCategoria.length === 0 ? (
                
                // Mensagem exibida quando não há itens na categoria
                <div className='w-full max-w-[75%] text-center py-10'>
                    <p className='archivo font-black text-2xl text-[#261a10]'>Nenhum item encontrado nesta categoria.</p>
                </div>

            ) : (

                <div className="w-full max-w-[75%] flex flex-row items-center gap-2">

                    {/* Botão scroll esquerda da lista de itens */}
                    <button 
                        onClick={scrollItensLeft}
                        className="p-1 rounded-full bg-[#261a10]/50 text-[#f2d9bb] cursor-pointer hover:bg-[#f2a71b]/83 hover:text-[#261a10] transition-colors"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    {/* Contêiner rolável com os cartões de itens */}
                    <div 
                        ref={itensRef}
                        className="itensCardapio container-about flex-1 flex flex-row justify-start items-start gap-4 
                                    overflow-x-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    >

                    {itensDaCategoria.map((item) => (
                        // Cartão de item com imagem, info e botão de adicionar
                        <div 
                            key={item.id} 
                            className='p-3 w-72 flex-shrink-0 bg-[#f7f4d6] h-[32rem] rounded-md flex flex-col items-start gap-4 shadow-md transition-all hover:shadow-2xl'
                        >
                            <div className='relative w-full'>
                                <div 
                                    className='w-full h-64 bg-cover bg-center rounded-md'
                                    style={{ backgroundImage: `url(${item.imgUrl})` }}
                                ></div>
                                {/* Tags de destaque (novo / mais vendido) */}
                                <div className='absolute top-2 left-2 flex flex-col gap-1 uppercase'>
                                    {item.novo && (
                                        <span className='px-2 py-0.5 bg-green-600 text-white text-md font-bold rounded-md'>novo</span>
                                    )}
                                    {item.maisVendido && (
                                        <span className='px-2 py-0.5 bg-[#f2a71b] text-black text-md font-bold rounded-md flex flex-row justify-center items-center gap-1'><Plus size={20}/> vendido</span>
                                    )}
                                </div>
                            </div>

                            {/* Nome e descrição do item */}
                            <div className='flex flex-col justify-start items-start gap-2 flex-1 overflow-hidden'>
                                <h3 className='archivo font-black text-2xl text-[#261a10]'>{item.nome}</h3>

                                <p className="desc lora text-gray-500 text-xl line-clamp-3">{item.descricao}</p>
                            </div>

                            {/* Botão de adicionar e exibição do preço */}
                            <div className='flex flex-row justify-between items-center w-full mt-2'>
                                <button 
                                    onClick={() => onAddItem(item)}
                                    className='p-1 rounded-full bg-[#f2a71b] text-xl cursor-pointer transition-all hover:shadow-xl hover:bg-[#ce8315]'
                                >
                                    <Plus size={32} className='text-[#261a10]'/></button>
                                <span className='text-2xl font-black text-[#d92e1e]'>
                                    R$ {item.preco.toFixed(2).replace('.', ',')}
                                </span>
                            </div>
                        </div>
                    ))}
                    </div>

                    {/* Botão scroll direita da lista de itens */}
                    <button 
                        onClick={scrollItensRight}
                        className="p-1 rounded-full bg-[#261a10]/50 text-[#f2d9bb] cursor-pointer hover:bg-[#f2a71b]/83 hover:text-[#261a10] transition-colors"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            )} 
        </section>
    )
}
