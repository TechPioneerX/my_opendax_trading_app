import { createClient } from '@supabase/supabase-js'
import type { NextApiRequest, NextApiResponse } from 'next'

const supabaseUrl: string = process.env.SUPABASE_URL || ''
const supabaseServiceKey: string = process.env.SUPABASE_SERVICE_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseServiceKey)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  let bucket = null

  const { data, error: bucketErr } = await supabase.storage.getBucket('logos')

  bucket = data

  if (bucketErr && bucketErr.message === 'The resource was not found') {
    const { data, error } = await supabase.storage.createBucket('logos', {
      public: true,
    })

    bucket = data

    if (error) {
      return res.status(400).send({
        error: `Couldn't create a new bucket: ${error.message}`,
      })
    }
  }

  res.status(200).json({ bucket })
}
