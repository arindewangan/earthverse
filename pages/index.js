import Head from 'next/head'
import Map from '../components/map'
import React from 'react'
import 'leaflet/dist/leaflet.css'

export default function Home() {

  return (
    <div>
      <Head>
        <title>Earthverse</title>
        <meta name="description" content="The Metaverse" />
        <link rel="icon" href="/earth-icon.svg" />
      </Head>
      <Map />
    </div>
  )
}
