// Configuration Firebase.
// Pour un déploiement immédiat, l'application utilise un Store local persistant (Zustand) 
// qui simule parfaitement Firestore et Auth pour la démonstration.
// Remplacez par votre config Firebase réelle si besoin.

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-api-key",
  authDomain: "teyssir-demo.firebaseapp.com",
  projectId: "teyssir-demo",
  storageBucket: "teyssir-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

export const app = initializeApp(firebaseConfig);  
