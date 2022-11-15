import '../styles/globals.css'
import '../styles/geosearch.css'
import type { AppProps } from 'next/app'
import BaseLayout from '../components/layout/BaseLayout'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "flickity/css/flickity.css"
import 'leaflet/dist/leaflet.css';
import 'react-lazy-load-image-component/src/effects/blur.css';


import React , {useEffect , useContext} from 'react';
import localforage from 'localforage';
import { toast } from "react-toastify";
import Head from 'next/head';
import ContextContainer from '../components/context/ContextContainer'

function MyApp({ Component, pageProps, router }: AppProps) {

  async function userIp() {
    // const res = await (await fetch('https://api.ipgeolocation.io/ipgeo?apiKey=c58af4aba9a645ceaaacbc69ece42a40', { method: 'GET' })).json()
    // if (res) {
    localforage.setItem("userIp", "168.1.1.4")
    // localforage.setItem("userIp", res.ip)
    localforage.setItem("userCountry", "country_name")
    // localforage.setItem("userCountry", res.country_name)
    localforage.setItem("countryFlagUrl", "country_flag")
    // localforage.setItem("countryFlagUrl", res.country_flag)
    // }
  }

  useEffect(() => {
    if (!navigator.onLine) {
      toast("Internet Connection Lost", { type: "error" })
      setTimeout(() => {
        alert("Internet Connection Lost")
      }, 1000)
      return
    } else userIp()
  }, [])

  return (
    <>
      <Head>
        <title>optics4less | online platform</title>
        <link rel={"canonical"} href={"http://optics4less.com/"} />
        <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' />
        {/* <link rel="preload" as="font" /> */}
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/ico" sizes="72x72" href="/pwa/assets/icons/icon-72x72.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="mask-icon" href="/pwa/assets/icons/icon-512x512.png" color="#ffffff" />
        <meta name="msapplication-TileColor" content="#FBF9F7" />
        <meta name="theme-color" content="#FBF9F7" />

        <meta property={"og:image"} content={"/assets/about-logo.png"} />
        <meta property={"og:title"}
          content={"ptic4Less is an online platform that bridges the gap between optical wear manufacturers, retailers and consumers."} />
        <meta property={"og:url"} content={"http://optics4less.com/"} />
        <meta property={"og:type"} content={"website"} />
        <meta property={"og:description"}
          content={"ptic4Less is an online platform that bridges the gap between optical wear manufacturers, retailers and consumers."} />

      </Head>
      <ContextContainer>
        <BaseLayout>
          <div className="wow_fade_scale" key={router.route}>
            {/* @ts-ignore */}
            <Component {...pageProps} />
          </div>
        </BaseLayout>
      </ContextContainer>

      <ToastContainer
        position="top-right"
        hideProgressBar={false} newestOnTop
        closeOnClick theme='light'
        pauseOnFocusLoss
        draggable pauseOnHover
      />
    </>
  )


}

export default MyApp
