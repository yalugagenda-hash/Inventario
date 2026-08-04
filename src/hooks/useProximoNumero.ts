import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'

/**
 * Calcula o menor número inteiro positivo ainda não utilizado
 * DENTRO da mesma combinação (mesmo prefixo: ambiente + categoria
 * + nome do item). Usado apenas para a PRÉVIA no formulário — o
 * valor definitivo é sempre recalculado pelo banco (trigger
 * gerar_patrimonio) no momento do salvamento.
 */
export function useProximoNumero(prefixo: string) {
  return useQuery({
    queryKey: ['itens-proximo-numero', prefixo],
    enabled: !!prefixo,
    queryFn: async () => {
      const { data, error } = await supabase.from('itens').select('patrimonio').ilike('patrimonio', `${prefixo}-%`)
      if (error) throw error

      const usados = new Set<number>()
      for (const row of data || []) {
        const match = row.patrimonio?.match(/-(\d+)$/)
        if (match) usados.add(parseInt(match[1], 10))
      }

      let candidato = 1
      while (usados.has(candidato)) candidato++
      return candidato
    },
  })
}
