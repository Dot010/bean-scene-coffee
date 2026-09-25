// bean-scene-coffee/
// ├── app/
// │   ├── favicon.ico
// │   ├── globals.css          # Variáveis CSS, resets e cores da paleta do Figma
// │   ├── layout.tsx           # Importação de fontes (Google Fonts) e wrapper raiz
// │   └── page.tsx             # Server Component principal que junta as secções
// ├── components/
// │   ├── ui/                  # Componentes atómicos e agnósticos
// │   │   ├── button.tsx       # Botão genérico com suporte a variantes (Primary, Secondary)
// │   │   ├── input.tsx        # Campo de texto reutilizável (usado na Newsletter)
// │   │   └── card.tsx         # Estrutura base para cartões
// │   └── landing/             # Secções específicas da Landing Page do Figma
// │       ├── navbar.tsx       # Menu superior e botões de ação
// │       ├── hero.tsx         # Secção principal com título "Coffee" e animação GSAP
// │       ├── discover.tsx     # Bloco "Discover the best coffee"
// │       ├── product-card.tsx # Cartão individual para cada bebida
// │       ├── product-grid.tsx # Grelha "Enjoy a new blend of coffee style"
// │       ├── features.tsx     # Bloco "Why are we different?" (4 ícones)
// │       ├── promo-banner.tsx # Banner escuro "Get a chance to have an Amazing morning"
// │       ├── testimonials.tsx # Slider/Cartão "Our coffee perfection feedback"
// │       ├── newsletter.tsx   # Formulário "Subscribe to get the Latest News"
// │       └── footer.tsx       # Rodapé com links e redes sociais
// ├── data/                    # Ficheiros JSON/TS com o conteúdo estático do Figma
// │   ├── products.ts          # Lista de cafés (Cappuccino, Espresso, etc., preços, fotos)
// │   ├── features.ts          # Dados dos 4 diferenciais da marca
// │   └── testimonials.ts      # Avaliações dos clientes (Jonny Thomas, etc.)
// ├── lib/                     # Utilitários globais e configurações de ferramentas
// │   ├── gsap.ts              # Registo seguro do GSAP, ScrollTrigger e useGSAP
// │   └── utils.ts             # Função cn() para mesclar classes do Tailwind CSS
// ├── types/                   # Contratos e tipos TypeScript
// │   └── index.ts             # Interfaces (Product, Feature, Testimonial)
// ├── public/                  # Ativos estáticos otimizados
// │   └── assets/
// │       ├── icons/           # Ícones SVG personalizados do Figma
// │       └── images/          # Imagens extraídas organizadas por secção
// │           ├── hero-bg.jpg
// │           ├── discover.png
// │           ├── products/    # cappuccino.png, espresso.png, etc.
// │           └── feedback/    # avatar-jonny.jpg
// ├── .prettierrc              # Regras de formatação automática do Prettier
// ├── .prettierignore
// ├── tailwind.config.ts       # Extensão da paleta de cores (coffee-dark, coffee-amber)
// └── tsconfig.json
// Papel de Cada Pasta na Prática
// app/page.tsx: Funciona como um orquestrador. Apenas importa e coloca as secções da pasta components/landing/ na ordem correta, sem ter lógica de animação ou estilos diretos.

// components/landing/: Onde fica a maioria do código visual. Os componentes que precisam de animação com GSAP recebem a diretiva 'use client' no topo do ficheiro.

// data/: Impede que o código dos componentes fique cheio de textos extensos. Quando precisar de alterar o preço de um café ou o texto de um depoimento, altera apenas nesta pasta.

// public/assets/: Separa as imagens por secção para facilitar a substituição de ficheiros do Figma sem perder o rasto no projeto.