import {
    initializeApp
} from "firebase/app";
import {
    getStorage
} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAQ0G43QxLygU2klH-wVZ3bKq0sybpk8I8",
    authDomain: "acaproject-df424.firebaseapp.com",
    projectId: "acaproject-df424",
    storageBucket: "acaproject-df424.appspot.com",
    messagingSenderId: "627952758312",
    appId: "1:627952758312:web:8c03eff0f4cdd74173cf1d"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

export default storage