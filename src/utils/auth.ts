import {LOCAL_STORAGE_KEY_TOKEN} from "@/constants/localStorage";

export const getToken = () => {
  return localStorage.getItem(LOCAL_STORAGE_KEY_TOKEN);
};

export const setToken = (token: string) => {
  return localStorage.setItem(LOCAL_STORAGE_KEY_TOKEN, token);
};
