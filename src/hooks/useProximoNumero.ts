import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'

/**
 * Calcula o menor número inteiro positivo ainda não utilizado
 * pelos itens cadastrados. Usado apenas para a PRÉVIA no formulário
 * — o valor definitivo é sempre recalculado pelo banco (trigger
 * gerar_patrimonio) no momento do salvamento, evitando duplicidade.
 */
export function useProximoNumero() {
  return useQuery({
    queryKey: ['itens-proximo-numero'],
    queryFn: async () => {
      const { data, error } = await supabase.from('itens').select('numero')
      if (error) throw error

      const usados = new Set((data || []).map((d: any) => d.numero).filter((n: number | null) => n != null))

      let candidato = 1
      while (usados.has(candidato)) candidato++
      return candidato
    },
  })
}
