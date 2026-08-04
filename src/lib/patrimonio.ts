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

interface EntidadeComSigla {
  nome?: string | null
  sigla?: string | null
}

/** Usa a sigla customizada cadastrada, se existir; senão gera das 3 primeiras letras do nome. */
function resolverSigla(entidade?: EntidadeComSigla | null, tamanho = 3): string {
  if (!entidade) return ''
  if (entidade.sigla && entidade.sigla.trim()) return entidade.sigla.trim().toUpperCase()
  return sigla(entidade.nome || '', tamanho)
}

export function montarPatrimonioPreview(
  ambiente: EntidadeComSigla | null | undefined,
  categoria: EntidadeComSigla | null | undefined,
  nomeItem: string,
  proximoNumero: number,
): string {
  const numero = String(proximoNumero).padStart(3, '0')
  const partes = [resolverSigla(ambiente), resolverSigla(categoria), sigla(nomeItem)].filter(Boolean)
  return `YAL${partes.length ? '-' + partes.join('-') : ''}-${numero}`
}
