import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyCWQ2urB-xgOlLmk0ua0ZwYNi9NI5E57eo',
	authDomain: 'etalon-63854.firebaseapp.com',
	databaseURL:
		'https://etalon-63854-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'etalon-63854',
	storageBucket: 'etalon-63854.appspot.com',
	messagingSenderId: '102192243250',
	appId: '1:102192243250:web:34470bc68f1895f2bcd22b',
	measurementId: 'G-NRTLGWLVBG',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth()

export { app, auth }
export const db = getFirestore(app)
