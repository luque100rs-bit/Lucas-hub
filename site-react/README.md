# BL Escadas — site em React

Reconstrução do site da BL Escadas Pré-Moldadas em **React + TypeScript + Tailwind CSS v4 + Motion**, mesmo conteúdo, fotos reais e links do site em HTML (`../site`), que continua intacto.

## Como rodar

```bash
cd site-react
npm install
npm run dev            # servidor de desenvolvimento
npm run build          # pasta dist/ (publicar no Netlify, Cloudflare Pages etc.)
npm run build:single   # dist-single/index.html: o site inteiro em um arquivo só (fotos e vídeo dentro)
```

## Estrutura

- `src/content.ts`: textos, modelos, fotos, perguntas. É aqui que se troca o conteúdo.
- `src/components/sections/`: Hero, Sobre, Catálogo, Projetos, Diferenciais, Como funciona, Dúvidas, Orçamento, Rodapé.
- `src/components/magic/`: componentes de efeito (ver abaixo).
- `src/assets/`: fotos e vídeo já otimizados. Os originais ficam em `../site/fotos`.
- `src/lib/whatsapp.ts`: número, redes sociais e montagem do link do WhatsApp.

## Componentes "estilo Magic UI"

Os componentes em `src/components/magic/` (`BlurFade`, `Marquee`, `ShimmerButton`, `BorderBeam`, `MagicCard`) **foram escritos do zero para este projeto**, com nomes e props parecidos com os da Magic UI. **Não são os arquivos oficiais**: ao construir o site, o ambiente não tinha acesso a `magicui.design` nem a `21st.dev`, e os MCPs deles não estavam conectados.

Para trocar por versões oficiais, com acesso liberado, a Magic UI documenta a instalação pelo CLI do shadcn (`npx shadcn@latest add "https://magicui.design/r/<nome>"`). Confira o comando atual em https://magicui.design/docs. Como cada componente fica em um arquivo, a troca não mexe nas seções.

## O que existe e funciona

- Abertura com a escada sendo desenhada (só na primeira visita da sessão) e vídeo no topo.
- Títulos que sobem palavra por palavra, textos que aparecem ao rolar, rolagem suave (Lenis).
- Menu flutuante com a seção atual destacada e menu em tela cheia no celular.
- Catálogo: "Pedir orçamento" de cada modelo já escolhe o modelo no formulário.
- Projetos com filtros, visualização ampliada (teclado, Esc e gesto de deslizar).
- Perguntas frequentes, formulário com validação que abre o WhatsApp com a mensagem pronta.
- Respeita "reduzir movimento": sem tela de abertura, sem vídeo automático, sem animações.

## Pendências que dependem de informação da empresa

- Fonte dos títulos: hoje Cormorant Garamond. Se houver uma fonte da marca, trocar em `src/index.css` (`--font-serif`).
- O vídeo do topo é uma animação 3D enviada pelo cliente, não uma obra da BL: confirmar permissão de uso.
- Fotos de obra melhores (escada pronta, ambiente limpo) deixam o resultado mais profissional.
