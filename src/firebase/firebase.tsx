import {
  type FirebaseApp,
  type FirebaseOptions,
  initializeApp,
} from 'firebase/app'
import { type Auth, getAuth } from 'firebase/auth'
import { type Firestore, getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig: FirebaseOptions = {
  apiKey: String(import.meta.env.VITE_FIREBASE_API_KEY),
  appId: String(import.meta.env.VITE_FIREBASE_APP_ID),
  authDomain: String(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
  measurementId: String(import.meta.env.VITE_FIREBASE_MEASURE_ID),
  messagingSenderId: String(import.meta.env.VITE_FIREBASE_MSID),
  projectId: String(import.meta.env.VITE_FIREBASE_PROJECT_ID),
  storageBucket: String(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
}

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
const auth: Auth = getAuth(app)

// Firestore Dadatabase
const db: Firestore = getFirestore(app)

export { app, auth, db }
