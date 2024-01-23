import { UserCredential } from "firebase/auth";
import {
  getIdToken,
  logInWithEmailAndPassword,
  logout,
  registerWithEmailAndPassword,
  sendPasswordReset,
} from "./firebaseService";
import { AppUser } from "../models/appUser";
import axios from "axios";
import { addUserUrl, baseUrl, getUserUrl } from "../config";

const appUser: AppUser = new AppUser();

export const logIn = async (email: string, password: string) => {
  const userCredential: UserCredential = await logInWithEmailAndPassword(
    email,
    password
  );
  if (userCredential) {
    //TODO retrieve AppUser data from backend and construct the loggedin user.
    appUser.idToken = await getIdToken();
    appUser.email = userCredential.user.email as string;
    appUser.isLoggedIn = true;
    let res = await axios.get(baseUrl + getUserUrl, {
      headers: {
        Authorization: appUser.idToken,
      },
    });
    appUser.name = res.data.name;
    localStorage.setItem("appUser", JSON.stringify(appUser));
  }
};

export const signUp = async (email: string, password: string, name: string) => {
  const userCredential: UserCredential = await registerWithEmailAndPassword(
    name,
    email,
    password
  );
  if (userCredential) {
    //TODO construct AppUser and register him in the backend database.
    try {
      appUser.idToken = await getIdToken();
      appUser.email = userCredential.user.email as string;
      appUser.name = name;
      appUser.isLoggedIn = true;
      localStorage.setItem("appUser", JSON.stringify(appUser));
      await axios.post(baseUrl + addUserUrl, appUser);
    } catch (error) {
      console.error(error);
    }
  }
};

export const resetPassword = async (email: string) => {
  await sendPasswordReset(email);
};

export const logOut = async () => {
  localStorage.removeItem("appUser");
  await logout();
};

export const isAuthenticated = (): boolean => {
  let userSTR = localStorage.getItem("appUser");
  if (userSTR) {
    let user = JSON.parse(userSTR);
    console.log("isAuthenticated: ", user.isLoggedIn);

    return user.isLoggedIn;
  }
  console.log("isAuthenticated: ", false);
  return false;
};

export const getAppUser = (): AppUser | null => {
  let userSTR = localStorage.getItem("appUser");
  if (userSTR) {
    let user = JSON.parse(userSTR);
    return user;
  }
  return null;
};
