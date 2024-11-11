import { createClient } from '@supabase/supabase-js'
import formidable from 'formidable'
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'

const supabaseUrl: string = process.env.SUPABASE_URL || ''
const supabaseServiceKey: string = process.env.SUPABASE_SERVICE_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Disable default body parser cause we parse body using `formidable`
export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const form = new formidable.IncomingForm()

  form.parse(req, async function (err, fields, files) {
    const fileName = Object.keys(files)[0]
    const newFile: any = files
    const newFileName = newFile[fileName].originalFilename

    if (err) {
      return res
        .status(400)
        .send({ error: `${fileName} parsing error: ${err}` })
    }

    //@ts-ignore
    const file = fs.readFileSync(files[fileName].filepath)

    const { error: uploadErr } = await supabase.storage
      .from('logos')
      .upload(newFileName, file, {
        upsert: true,
      })

    if (uploadErr) {
      return res.status(400).send({
        error: `${newFileName} upload error: ${uploadErr.message}`,
      })
    }

    const publicURL = supabase.storage.from('logos').getPublicUrl(newFileName)

    if (!publicURL) {
      return res.status(400).send({
        error: `${newFileName} getting public URL error`,
      })
    }

    res.status(200).json({ publicURL })
  })
}
