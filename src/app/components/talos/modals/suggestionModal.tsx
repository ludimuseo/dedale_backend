import emailjs from '@emailjs/browser'
import { addDoc, collection } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { useRef, useState } from 'react'

import { useAppSelector } from '@/app/hooks'
import { StateAuth } from '@/app/services/redux/slices/reducerAuth'
import { db } from '@/firebase/firebase'
import { State } from '@/types'

import AddDocument from '../suggestion/AddDocument'
import BottomSuggestionForm from '../suggestion/BottomSuggestionForm'
import SuggestionTitle from '../suggestion/SuggestionTitle'
import SuggestionUserInfo from '../suggestion/SuggestionUserInfo'

interface SuggestionModalProps {
  isOpen: boolean
  onClose: () => void
  name: string | undefined
  category: string | undefined
}

const SuggestionModal = ({
  isOpen,
  onClose,
  name,
  category,
}: SuggestionModalProps) => {
  const { user }: StateAuth = useAppSelector((state: State) => state.auth)
  const form = useRef<HTMLFormElement>(null)

  const [suggestionText, setSuggestionText] = useState<string>('')
  const [suggestionImg, setSuggestionImg] = useState<File | null>(null)
  const [isSending, setIsSending] = useState(false)
  const [emailData, setEmailData] = useState({})
  const [imgFirebaseLink, setImgFirebaseLink] = useState("")

  //TODO: Add doc to firestore storage
  const handleFileUpload = async (file: File | null) => {
    if (!file) return
    const storage = getStorage();
    const storageRef = ref(storage, `${user?.pseudo ?? 'unknown'}/${file.name}`)
    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setImgFirebaseLink(downloadURL)
      console.log("File uploaded successfully. Download URL:", downloadURL)

    } catch (error) {
      console.error("Error uploading file:", error);
      console.log(error)
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSuggestionImg(event.target.files[0])
    }
  }

  //register in firebase database
  const sendToFirestore = async () => {
    try {
      const docRef = await addDoc(collection(db, 'contacts'), { ...emailData })
      const id = docRef.id
      if (id) {
        console.log('Données enregistrées en base de donnée')
      }
    } catch (error) {
      console.error("Erreur sur l'envoi du formulaire", error)
      alert("Une erreur s'est produite.")
      return
    }
  }

  const sendSuggestion = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSending(true)
    if (!user?.email) {
      alert('❌ Vous devez être connecté pour envoyer une suggestion.')
      setIsSending(false)
      return
    }
    if (!suggestionText) {
      alert('❌ Vous devez sasir votre suggestion.')
      setIsSending(false)
      return
    }
    const templateParams = {
      user_email: user.email,
      user_name: user.pseudo ?? 'Inconnu',
      suggestion_text: suggestionText,
      suggestion_image: suggestionImg ? suggestionImg.name : 'Aucune image',
      suggestion_date: new Date().toLocaleDateString(),
      suggestion_title: name ?? 'Sans titre',
      suggestion_category: category ?? 'Non spécifiée',
      suggestion_image_firebase_link: imgFirebaseLink,
      suggestion_status: '',
    }
    setEmailData({ ...templateParams })
    //VITE_YOUR_SERVICE_ID => Remplacez par votre Service ID EmailJS
    //VITE_YOUR_TEMPLATE_ID => Remplacez par votre Template ID EmailJS
    //VITE_YOUR_PUBLIC_KEY => Remplacez par votre Clé Publique EmailJS

    emailjs
      .send(
        String(import.meta.env.VITE_YOUR_SERVICE_ID),
        String(import.meta.env.VITE_YOUR_TEMPLATE_ID),
        templateParams,
        String(import.meta.env.VITE_YOUR_PUBLIC_KEY)
      )
      .then(
        (response) => {
          console.log(
            'Email envoyé avec succès !',
            response.status,
            response.text
          )
          void sendToFirestore() //firestore
          alert('🎉 Votre suggestion a été envoyée avec succès.')
          setSuggestionText('')
          setSuggestionImg(null)
          void handleFileUpload(suggestionImg)
          onClose()
          setIsSending(false)
        },
        (error: unknown) => {
          console.error('Erreur lors de l’envoi de l’email:', error)
          alert("Une erreur s'est produite lors de l'envoi de la suggestion.")
          setIsSending(false)
        }
      )
  }

  if (!isOpen) return null
  return (
    <form ref={form} onSubmit={sendSuggestion}>
      <div
        className="modal modal-open"
        role="dialog"
        aria-labelledby="Fenêtre de suggestion">
        <div className="modal-box relative">
          <button
            className="btn btn-circle btn-primary btn-sm absolute right-2 top-2"
            onClick={() => {
              onClose()
            }}>
            <span className="font-extrabold text-stone-50">✕</span>
          </button>
          <SuggestionTitle
            title="Envoyer votre suggestion à Ludi Muséo"
          />
          <textarea
            disabled={isSending}
            className="w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Écrivez votre suggestion..."
            value={suggestionText}
            onChange={(e) => {
              setSuggestionText(e.target.value)
            }}></textarea>

          <AddDocument
            isSending={isSending}
            handleImageUpload={handleImageUpload}
            imgName={suggestionImg?.name}
            label="Ajouter une image"
          />

          <SuggestionUserInfo
            pseudo={user?.pseudo ?? 'Inconnu'}
            date={new Date().toLocaleDateString()}
            name={name ?? 'Non defni'}
            category={category ?? 'Non defni'}
          />
          <BottomSuggestionForm
            isSending={isSending}
            onClose={() => {
              onClose()
            }}
          />
        </div>
      </div>
    </form>
  )
}

export default SuggestionModal
