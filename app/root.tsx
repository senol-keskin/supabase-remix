import { cssBundleHref } from '@remix-run/css-bundle'
import { json, type LinksFunction } from '@remix-run/node'
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react'
import { createClient } from '@supabase/supabase-js'
import { useState } from 'react'

import stylesheet from '~/tailwind.css'

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
  { rel: 'stylesheet', href: stylesheet },
]

export const loader = function () {
  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  }

  return json({ env })
}

export default function App() {
  const { env } = useLoaderData<typeof loader>()
  const [supabaseClient] = useState(() => createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY))

  const siginIn = () => {
    supabaseClient.auth.signInWithPassword({
      email: 'senol@supabase.com',
      password: 'sup3rs3cur3',
    })
  }

  const signOut = () => {
    supabaseClient.auth.signOut()
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <button
          type="button"
          onClick={siginIn}
          className="rounded-md bg-indigo-600 px-3 py-2  leading-5 text-white hover:bg-indigo-500"
        >
          siginin
        </button>
        <button
          type="button"
          onClick={signOut}
          className="rounded-md bg-indigo-600 px-3 py-2  leading-5 text-white hover:bg-indigo-500"
        >
          signout
        </button>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
