import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCTD3uu95-llvk3CSsaCQQFbiIRJT-dcj4",
    authDomain: "ema-jhon-82.firebaseapp.com",
    projectId: "ema-jhon-82",
    storageBucket: "ema-jhon-82.appspot.com",
    messagingSenderId: "843976340779",
    appId: "1:843976340779:web:f601c3e8b465c42518416e"
  };

  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app)