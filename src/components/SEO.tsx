import Head from 'next/head'
import React from 'react'
import { useRouter } from 'next/router'
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  GET_TITLE,
  OG_URL,
  SITE_NAME,
  TWITTER_HANDLE,
} from '../constants'

export function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
}: {
  title?: string
  description?: string
}) {
  const router = useRouter()
  return (
    <Head>
      <title>{GET_TITLE(title)}</title>
      <meta charSet={'utf-8'} />
      <meta name={'viewport'} content={'width=device-width, initial-scale=1'} />
      <meta name="author" content="Bhanu Teja P" />
      <meta property="og:type" content="website" />
      <meta name={'description'} content={description} />
      <meta name={'twitter:card'} content={'summary'} />
      <meta name={'twitter:creator'} content={TWITTER_HANDLE} />
      <meta property={'og:title'} content={GET_TITLE(title)} />
      <meta property={'og:description'} content={description} />
      <meta property={'og:url'} content={`${OG_URL}${router.asPath}`} />
      <meta property={'og:image'} content={'/logo.png'} />
      <meta property={'og:site_name'} content={SITE_NAME} />
    </Head>
  )
}
