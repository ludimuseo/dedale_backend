import {
  type FirebaseApp,
  type FirebaseOptions,
  initializeApp,
} from 'firebase/app'
import { type Auth, getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MSID,
  measurementId: process.env.FIREBASE_MEASURE_ID,
  appId: process.env.FIREBASE_APP_ID,
}

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
const auth: Auth = getAuth(app)

export { app, auth }
