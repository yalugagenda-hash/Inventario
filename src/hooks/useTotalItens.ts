import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'

/**
 * Retorna o total de itens já cadastrados. Usado apenas para
 * ESTIMAR o próximo número de patrimônio no formulário — o valor
 * definitivo é sempre gerado pelo banco no momento do salvamento.
 */
export function useTotalItens() {
  return useQuery({
    queryKey: ['itens-total'],
    queryFn: async () => {
      const { count, error } = await supabase.from('itens').select('id', { count: 'exact', head: true })
      if (error) throw error
      return count || 0
    },
  })
}
