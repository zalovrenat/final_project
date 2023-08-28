import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyC3a9HaaX25fP6iWfgHEzyfmWS9RnaXQ04",
  authDomain: "padawans122-final-renat.firebaseapp.com",
  projectId: "padawans122-final-renat",
  storageBucket: "padawans122-final-renat.appspot.com",
  messagingSenderId: "186184519855",
  appId: "1:186184519855:web:c847e5c399cf02faa4045a",
  databaseURL: "https://padawans122-final-renat-default-rtdb.firebaseio.com/",
  storageBucket: "gs://padawans122-final-renat.appspot.com"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);