export const WA_NUMBER = '5521964318649'
export const PHONE_LABEL = '(21) 96431-8649'
export const INSTAGRAM_URL = 'https://www.instagram.com/blescadas'
export const FACEBOOK_URL = 'https://www.facebook.com/blescadas'
export const DEFAULT_MESSAGE =
  'Olá! Vi o site da BL Escadas e queria um orçamento de escada pré-moldada.'

export const waUrl = (text: string = DEFAULT_MESSAGE) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`
