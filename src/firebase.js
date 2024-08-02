import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyB_z0W6-K_bmlvBLLEwYYxfC91IAxK5WD4",
  authDomain: "food-delivery-website-79d6f.firebaseapp.com",
  projectId: "food-delivery-website-79d6f",
  storageBucket: "food-delivery-website-79d6f.appspot.com",
  messagingSenderId: "499304447312",
  appId: "1:499304447312:web:4e8c484a9bca190f380055"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, login, signup, logout };