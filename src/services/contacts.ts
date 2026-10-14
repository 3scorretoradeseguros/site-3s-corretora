import pb from '@/lib/pocketbase/client'
import type { ContactRecord, CreateContactInput, ContactStatus } from '@/types'

export async function createContact(input: CreateContactInput): Promise<ContactRecord> {
  const whatsappClean = input.whatsapp.trim()
  const emailClean = input.email.trim()

  const payload = {
    name: input.name.trim(),
    whatsapp: whatsappClean,
    email: emailClean,
    // Mantemos contact preenchido com WhatsApp / E-mail para compatibilidade
    contact: `${whatsappClean} | ${emailClean}`,
    need: input.need,
    message: input.message?.trim() || '',
    status: 'novo' as ContactStatus,
  }

  const record = await pb.collection('contacts').create<ContactRecord>(payload)
  return record
}

export async function getContacts(
  filter?: string,
  sort: string = '-created',
): Promise<ContactRecord[]> {
  const records = await pb.collection('contacts').getFullList<ContactRecord>({
    sort,
    filter,
  })
  return records
}

export async function updateContactStatus(
  id: string,
  status: ContactStatus,
): Promise<ContactRecord> {
  const record = await pb.collection('contacts').update<ContactRecord>(id, { status })
  return record
}

export async function deleteContact(id: string): Promise<boolean> {
  await pb.collection('contacts').delete(id)
  return true
}
