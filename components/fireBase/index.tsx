import React, { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ContextChat } from "../../components/context/ContextChat";
import * as firebase from "firebase";
import app from 'firebase/app';

interface IFireBaseProps {

}

const FireBase: React.FunctionComponent<IFireBaseProps> = ({ }) => {
  const Ctx = useContext(ContextChat);
  
  useEffect(() => {

    if (firebase.messaging.isSupported()) {
      const config = {
        apiKey: "AIzaSyCA4ylNBAIX_HqLCDrB5we0mK1EvK43doI",
        authDomain: "javaproject-251506.firebaseapp.com",
        projectId: "javaproject-251506",
        storageBucket: "javaproject-251506.appspot.com",
        messagingSenderId: "742253838312",
        appId: "1:742253838312:web:57672758e271fda5a9ee5d",
        measurementId: "G-G50VDG2CM2"
      };
      if (firebase.apps.length === 0) {
        try {
          app.initializeApp(config);
        }
        catch {
          Ctx.setIsNotSupport(true)
          return console.log("FireBase Installation failed because Your Country IP");
        }
      }
      const messaging = firebase.messaging();
      Notification.requestPermission(function (permission) {
        return permission
      })
        .then(function (permission) {
          if (permission === "granted") return messaging.getToken();
        })
        .then(function (tokenFire) {
          tokenFire && Ctx.setCurrentChatToken(tokenFire)
        })
      messaging.onMessage((payload) => {
        Ctx.setUpdateChatListBool(!Ctx.updateChatListBool)
      });
    }


  }, [Ctx.updateChatListBool]);



  return (<></>);
};

export default FireBase;
