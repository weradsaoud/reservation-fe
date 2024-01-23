import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  UserCredential,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config";

export const logInWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (err: any) {
    console.error(err);
    alert(err.message);
    return null as never;
  }
};

export const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
): Promise<UserCredential> => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      email,
    });
    return res;
  } catch (err: any) {
    console.error(err);
    alert(err.message);
    return null as never;
  }
};

export const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

export const logout = async () => {
  await signOut(auth);
};

export const getIdToken = async (): Promise<string> => {
  let currentUser = auth.currentUser;
  if(currentUser){
    try {
      return await currentUser.getIdToken(true);
    } catch (error) {
      return '';
    }
  }
  return '';
}
