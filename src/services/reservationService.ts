import axios from "axios";
import { baseUrl, reserveUrl } from "../config";
import { getAppUser } from "./authService";

export const reserve = async (name: string, date: string) => {
  await axios.post(
    baseUrl + reserveUrl,
    {
      name: name,
      date: date,
    },
    {
      headers: {
        Authorization: getAppUser()?.idToken,
      },
    }
  );
};
