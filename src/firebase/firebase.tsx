import { type Auth, getAuth } from 'firebase/auth'
import {
  type FirebaseApp,
  type FirebaseOptions,
  initializeApp,
} from 'firebase/app'
import { type Firestore, getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig: FirebaseOptions = {
  apiKey: String(import.meta.env.VITE_FIREBASE_API_KEY),
  authDomain: String(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
  projectId: String(import.meta.env.VITE_FIREBASE_PROJECT_ID),
  storageBucket: String(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: String(import.meta.env.VITE_FIREBASE_MSID),
  measurementId: String(import.meta.env.VITE_FIREBASE_MEASURE_ID),
  appId: String(import.meta.env.VITE_FIREBASE_APP_ID),
}

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
const auth: Auth = getAuth(app)

// Firestore Dadatabase
const db: Firestore = getFirestore(app)

export { app, auth, db }
