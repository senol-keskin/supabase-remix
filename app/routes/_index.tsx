import type { LoaderFunction } from '@remix-run/node'

import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { createClient } from '@supabase/supabase-js'

export const loader: LoaderFunction = async () => {
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

  const { data } = await supabase.from('profiles').select()

  return json({
    data,
  })
}

export default function Index() {
  const data = useLoaderData<typeof loader>()

  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
