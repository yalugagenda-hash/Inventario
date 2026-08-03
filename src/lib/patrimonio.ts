/**
 * Gera a sigla (3 letras por padrão) de um texto: maiúsculas,
 * sem acento e sem espaços/números. Usado só para a PRÉVIA no
 * formulário — o valor final e definitivo é gerado pelo banco
 * (trigger gerar_patrimonio), que garante numeração sem duplicar.
 */
export function sigla(texto: string, tamanho = 3): string {
  const semAcento = (texto || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  const apenasLetras = semAcento.replace(/[^a-zA-Z]/g, '')
  return apenasLetras.slice(0, tamanho).toUpperCase()
}

export function montarPatrimonioPreview(
  ambiente: string,
  categoria: string,
  nome: string,
  proximoNumero: number,
): string {
  const numero = String(proximoNumero).padStart(3, '0')
  const partes = [sigla(ambiente), sigla(categoria), sigla(nome)].filter(Boolean)
  return `YAL${partes.length ? '-' + partes.join('-') : ''}-${numero}`
}
