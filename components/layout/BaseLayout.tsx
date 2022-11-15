import { NextPage } from "next";
import { NextRouter } from "next/router";
import { useEffect, useContext } from "react";
import Nav from "./Nav";
import Footer from './Footer'
import Head from "next/head";
import ContextContainer from '../context/ContextContainer'
import FireBase from "../fireBase";
import ServerError from "../notFoundComponent/ServerError";
import { ContextFailLoad } from "../../components/context/ContextFailLoad";
import { useRouter } from "next/router";


export default function BaseLayout({ children }: any) {
  const router = useRouter()
  const CtxFail = useContext(ContextFailLoad);


  useEffect(() => {
    CtxFail.setFailedLoad(false)
  }, [router.asPath]);



  return (
    <>
      <FireBase />
      <Nav />
      {CtxFail.failLoad == true && router.pathname != '/' ?
        <>
          <ServerError />
        </>
        :
        <>
          {children}
        </>
      }
      <Footer />
    </>
  )
}


