import pb from '@/lib/pocketbase/client'
import type { TestimonialRecord, CreateTestimonialInput, UpdateTestimonialInput } from '@/types'

/**
 * Busca todos os depoimentos (geralmente para o painel de administração).
 * Ordenados por sort_order crescente.
 */
export async function getTestimonials(
  filter?: string,
  sort: string = 'sort_order',
): Promise<TestimonialRecord[]> {
  const records = await pb.collection('testimonials').getFullList<TestimonialRecord>({
    sort,
    filter,
  })
  return records
}

/**
 * Busca apenas os depoimentos ATIVOS (para exibição na home pública).
 * Ordenados por sort_order crescente.
 */
export async function getActiveTestimonials(): Promise<TestimonialRecord[]> {
  const records = await pb.collection('testimonials').getFullList<TestimonialRecord>({
    filter: 'active = true',
    sort: 'sort_order',
  })
  return records
}

/**
 * Cria um novo depoimento.
 */
export async function createTestimonial(input: CreateTestimonialInput): Promise<TestimonialRecord> {
  const payload = {
    name: input.name.trim(),
    text: input.text.trim(),
    rating: input.rating !== undefined ? input.rating : 5,
    source: input.source,
    active: input.active !== undefined ? input.active : true,
    sort_order: input.sort_order !== undefined ? input.sort_order : 1,
  }

  const record = await pb.collection('testimonials').create<TestimonialRecord>(payload)
  return record
}

/**
 * Atualiza um depoimento existente.
 */
export async function updateTestimonial(
  id: string,
  data: UpdateTestimonialInput,
): Promise<TestimonialRecord> {
  const payload: Record<string, unknown> = {}
  if (data.name !== undefined) payload.name = data.name.trim()
  if (data.text !== undefined) payload.text = data.text.trim()
  if (data.rating !== undefined) payload.rating = data.rating
  if (data.source !== undefined) payload.source = data.source
  if (data.active !== undefined) payload.active = data.active
  if (data.sort_order !== undefined) payload.sort_order = data.sort_order

  const record = await pb.collection('testimonials').update<TestimonialRecord>(id, payload)
  return record
}

/**
 * Alterna o status ativo/inativo de um depoimento.
 */
export async function toggleTestimonialActive(
  id: string,
  currentStatus: boolean,
): Promise<TestimonialRecord> {
  return updateTestimonial(id, { active: !currentStatus })
}

/**
 * Exclui um depoimento.
 */
export async function deleteTestimonial(id: string): Promise<boolean> {
  await pb.collection('testimonials').delete(id)
  return true
}

/**
 * Troca ou reordena a posição de dois depoimentos adjacentes (subir/descer).
 */
export async function swapTestimonialsOrder(
  first: { id: string; sort_order: number },
  second: { id: string; sort_order: number },
): Promise<void> {
  // Para evitar conflito temporário caso haja restrição, atribuímos a ordem invertida
  await pb.collection('testimonials').update(first.id, { sort_order: second.sort_order })
  await pb.collection('testimonials').update(second.id, { sort_order: first.sort_order })
}
