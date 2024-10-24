import {
  type FirebaseApp,
  type FirebaseOptions,
  initializeApp,
} from 'firebase/app'
import { type Auth, getAuth } from 'firebase/auth'
import { type Firestore, getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyCPs9eDug88NcIYKf8ObOh17-lzBv20VLE',
  authDomain: 'dedale-db58f.firebaseapp.com',
  projectId: 'dedale-db58f',
  storageBucket: 'dedale-db58f.appspot.com',
  messagingSenderId: '715477120087',
  measurementId: 'G-PTZT20830P',
  appId: '1:715477120087:web:f8095baa5455a4c9ce5f12',
}

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
const auth: Auth = getAuth(app)

// Firestore Dadatabase
const db: Firestore = getFirestore(app)

export { app, auth, db }
