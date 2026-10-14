import areaExterna from './assets/fotos/escada-area-externa.jpg'
import caracol from './assets/fotos/escada-caracol.jpg'
import emL2 from './assets/fotos/escada-em-l-madeira-2.jpg'
import emL from './assets/fotos/escada-em-l-madeira.jpg'
import acessoLaje from './assets/fotos/escada-externa-laje.jpg'
import flutuanteInstalacao from './assets/fotos/escada-flutuante-instalacao.jpg'
import flutuanteLateral from './assets/fotos/escada-flutuante-lateral.jpg'
import flutuanteQuarto from './assets/fotos/escada-flutuante-quarto.jpg'
import flutuante from './assets/fotos/escada-flutuante.jpg'
import reta from './assets/fotos/escada-reta-dois-pavimentos.jpg'

export type Category = 'flutuante' | 'l' | 'reta' | 'externa' | 'caracol'

export interface Photo {
  src: string
  alt: string
  title: string
  subtitle: string
  category: Category
  big?: boolean
  width: number
  height: number
}

export const photos: Photo[] = [
  { src: flutuante, title: 'Escada flutuante', subtitle: 'Quarto', category: 'flutuante', big: true, width: 860, height: 1147, alt: 'Escada flutuante de concreto pronta, com degraus presos na parede e tubos de apoio' },
  { src: emL2, title: 'Escada em L', subtitle: 'Revestida em madeira', category: 'l', width: 860, height: 1147, alt: 'Escada em L com degraus revestidos em madeira e guarda-corpo preto' },
  { src: flutuanteLateral, title: 'Escada flutuante', subtitle: 'Vista lateral', category: 'flutuante', width: 860, height: 1147, alt: 'Vista lateral de escada flutuante de concreto subindo junto à parede' },
  { src: acessoLaje, title: 'Acesso à laje', subtitle: 'Área externa', category: 'externa', width: 860, height: 1147, alt: 'Escada de concreto externa levando à laje, vista de cima' },
  { src: reta, title: 'Escada reta', subtitle: 'Dois pavimentos', category: 'reta', big: true, width: 860, height: 1147, alt: 'Escada reta longa de concreto com degraus vazados em construção de dois pavimentos' },
  { src: flutuanteInstalacao, title: 'Escada flutuante', subtitle: 'Na instalação', category: 'flutuante', width: 647, height: 1147, alt: 'Escada flutuante recém-instalada, ainda com escoramento de madeira' },
  { src: emL, title: 'Escada em L', subtitle: 'Patamar em leque', category: 'l', width: 860, height: 1147, alt: 'Escada em L com degraus em madeira e patamar em leque' },
  { src: areaExterna, title: 'Corredor lateral', subtitle: 'Área externa', category: 'externa', width: 860, height: 1147, alt: 'Escada de concreto em corredor externo estreito' },
  { src: flutuanteQuarto, title: 'Escada flutuante', subtitle: 'Ambiente integrado', category: 'flutuante', width: 860, height: 1147, alt: 'Escada flutuante de concreto em ambiente integrado com quarto' },
  { src: caracol, title: 'Escada caracol', subtitle: 'Fachada', category: 'caracol', width: 645, height: 860, alt: 'Escada caracol de concreto com corrimão na fachada de uma casa' },
]

export const filters: { id: Category | 'all'; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'flutuante', label: 'Flutuante' },
  { id: 'l', label: 'Em L' },
  { id: 'reta', label: 'Reta' },
  { id: 'externa', label: 'Área externa' },
  { id: 'caracol', label: 'Caracol' },
]

export interface Model {
  name: string
  text: string
  cta: string
  /** nome exato da opção no formulário */
  option: string
  image?: { src: string; alt: string; position?: string; width: number; height: number }
  plan?: 'u' | 'custom'
  accent?: boolean
}

export const models: Model[] = [
  { name: 'Escada flutuante', option: 'Escada flutuante', cta: 'Pedir orçamento', text: 'Os degraus saem direto da parede, sem viga embaixo. Deixa o ambiente leve e fica linda com revestimento de madeira.', image: { src: flutuante, alt: 'Escada flutuante de concreto com degraus engastados na parede', width: 860, height: 1147 } },
  { name: 'Escada em L', option: 'Escada em L', cta: 'Pedir orçamento', text: 'Faz uma curva de 90° num patamar. Boa pra quando a escada precisa correr junto de duas paredes.', image: { src: emL, alt: 'Escada em L com degraus revestidos em madeira', position: '50% 70%', width: 860, height: 1147 } },
  { name: 'Escada reta', option: 'Escada reta', cta: 'Pedir orçamento', text: 'Um lance só, direto de um piso ao outro. É a mais simples de encaixar e instalar.', image: { src: reta, alt: 'Escada reta longa de concreto em construção de dois pavimentos', width: 860, height: 1147 } },
  { name: 'Escada caracol', option: 'Escada caracol', cta: 'Pedir orçamento', text: 'Gira em volta de um eixo central. Resolve o acesso em espaço bem apertado.', image: { src: caracol, alt: 'Escada caracol de concreto com corrimão na fachada de uma casa', width: 645, height: 860 } },
  { name: 'Escada em U', option: 'Escada em U', cta: 'Pedir orçamento', text: 'Dois lances com volta de 180°. Ocupa menos comprimento, ótima pra pé-direito alto.', plan: 'u' },
  { name: 'Sob medida', option: 'Sob medida / ainda não sei', cta: 'Contar meu caso', text: 'Vão torto, pé-direito fora do padrão ou uma ideia que você já tem na cabeça. Manda as medidas e uma foto que a gente estuda o seu caso.', plan: 'custom', accent: true },
]

export const marqueeItems = [
  'Escada flutuante',
  'Escada em L',
  'Escada reta',
  'Escada caracol',
  'Escada em U',
  'Sob medida',
  'Fabricação em Nova Iguaçu',
  'Atendemos todo o Rio de Janeiro',
]

export const facts = [
  { title: 'Medida conferida', text: 'Tudo checado antes de ir pro molde.', icon: 'ruler' },
  { title: 'Chega pronta', text: 'Peça curada, é só instalar.', icon: 'stairs' },
  { title: 'Prazo curto', text: 'Sem esperar cura dentro da obra.', icon: 'clock' },
  { title: 'Fala com quem faz', text: 'Orçamento direto pelo WhatsApp.', icon: 'chat' },
] as const

export const comparison = [
  ['Forma, ferragem e escoramento montados dentro da obra', 'A peça chega pronta e é só instalar'],
  ['Dias esperando o concreto curar antes de usar', 'A cura acontece na fábrica, antes da entrega'],
  ['Acabamento depende das condições do canteiro', 'Moldada com medida conferida, degrau por degrau'],
  ['Mais sujeira, entulho e gente trabalhando no local', 'Instalação limpa, sem obra molhada'],
] as const

export const steps = [
  { title: 'Você chama', text: 'Manda as medidas do vão e uma foto pelo WhatsApp, ou marca uma visita pra gente medir.' },
  { title: 'Orçamento', text: 'Com o modelo e as medidas em mãos, você recebe o valor e o prazo certinho.' },
  { title: 'Fabricação', text: 'A escada é moldada sob medida, conferida e curada antes de sair.' },
  { title: 'Instalação', text: 'Levamos até a obra e montamos no lugar. Pronta pra subir.' },
] as const

export const faq = [
  { q: 'Preciso saber as medidas antes de pedir orçamento?', a: 'Ajuda bastante, mas não é obrigatório. Com a altura de piso a piso, a largura e o comprimento disponível já dá pra fazer uma estimativa. Se preferir, a gente combina uma visita e mede no local.' },
  { q: 'Vocês fazem a instalação também?', a: 'Fazemos. A escada sai da fábrica pronta e a nossa equipe leva e monta no lugar, então você não precisa procurar outra pessoa pra isso.' },
  { q: 'Quanto tempo demora?', a: 'Depende do modelo e da nossa agenda de fabricação. O prazo exato vem junto com o orçamento, antes de você fechar qualquer coisa.' },
  { q: 'Dá pra colocar revestimento depois?', a: 'Dá sim. Muita gente reveste os degraus com madeira, porcelanato ou pedra depois da instalação, como na escada em L das fotos. Se você já sabe o acabamento, avisa no orçamento que a gente considera a espessura.' },
  { q: 'Atendem a minha região?', a: 'Fabricamos em Nova Iguaçu e atendemos todo o Rio de Janeiro e região. Manda o bairro da obra no WhatsApp que a gente confirma o frete.' },
] as const

export const formModels = [
  'Escada flutuante',
  'Escada reta',
  'Escada em L',
  'Escada em U',
  'Escada caracol',
  'Escada clássica com corrimão',
  'Revestimento amadeirado',
  'Sob medida / ainda não sei',
]

export const navLinks = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'catalogo', label: 'Catálogo' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'diferenciais', label: 'Diferenciais' },
  { id: 'orcamento', label: 'Orçamento' },
] as const

export const menuLinks = [
  { id: 'sobre', label: 'Sobre nós' },
  { id: 'catalogo', label: 'Catálogo' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'diferenciais', label: 'Diferenciais' },
  { id: 'processo', label: 'Como funciona' },
  { id: 'duvidas', label: 'Dúvidas' },
  { id: 'orcamento', label: 'Orçamento' },
] as const

export const aboutPhotos = [
  { src: flutuanteInstalacao, alt: 'Escada flutuante recém-instalada, ainda com escoramento de madeira', caption: 'Na instalação', width: 647, height: 1147 },
  { src: flutuanteLateral, alt: 'Escada flutuante de concreto com degraus presos na parede', caption: 'Escada flutuante', width: 860, height: 1147 },
  { src: emL2, alt: 'Escada em L com degraus revestidos em madeira', caption: 'Com acabamento', width: 860, height: 1147 },
]

export const contactPhoto = { src: emL2, alt: 'Escada em L com degraus revestidos em madeira, feita pela BL Escadas', width: 860, height: 1147 }
