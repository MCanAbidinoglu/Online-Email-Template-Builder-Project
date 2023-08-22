import firebase from "firebase/compat/app"
import "firebase/compat/auth"

const app = firebase.initializeApp({
    apiKey: 'AIzaSyCI_K22cY4kqbnjU4mb4UWIouvH571eqj0',
    authDomain: 'email-builder-dev.firebaseapp.com',
    projectId: 'email-builder-dev',
    storageBucket: 'email-builder-dev.appspot.com',
    messagingSenderId: '887229054345',
    appId: '1:887229054345:web:d36d214787a3a15f067558'
})

export const auth = app.auth()
export default app