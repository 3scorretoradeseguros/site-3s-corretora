import pb from '@/lib/pocketbase/client'

/* Preferências públicas do site, guardadas na coleção `site_settings`
   (chave = setting_key, valor = value em texto). */

export const REVIEWSEGURO_BADGE_KEY = 'reviewseguro_badge_enabled'

type SiteSettingRecord = {
  id: string
  setting_key: string
  value: string
}

const isNotFound = (err: any) => err?.status === 404

export async function getReviewSeguroBadgeEnabled(): Promise<boolean> {
  try {
    const record = await pb
      .collection('site_settings')
      .getFirstListItem<SiteSettingRecord>(`setting_key='${REVIEWSEGURO_BADGE_KEY}'`)
    return record.value === 'true'
  } catch (err: any) {
    if (isNotFound(err)) return false
    throw err
  }
}

export async function setReviewSeguroBadgeEnabled(enabled: boolean): Promise<boolean> {
  const value = enabled ? 'true' : 'false'
  try {
    const record = await pb
      .collection('site_settings')
      .getFirstListItem<SiteSettingRecord>(`setting_key='${REVIEWSEGURO_BADGE_KEY}'`)
    await pb.collection('site_settings').update(record.id, { value })
  } catch (err: any) {
    if (!isNotFound(err)) throw err
    await pb.collection('site_settings').create({ setting_key: REVIEWSEGURO_BADGE_KEY, value })
  }
  return enabled
}
