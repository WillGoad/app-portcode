import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { DISPLAY_NAME, USER_EMAIL, USER_NAME, USER_TOKEN } from "./constants";
import { setCookie, deleteCookie } from "cookies-next";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const setUserCookies = (username: string, displayname: string, email: string, accessToken: string) => {
    setCookie(USER_TOKEN, accessToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 Days in seconds
        sameSite: "strict",
    });
    setCookie(DISPLAY_NAME, displayname, {
        maxAge: 60 * 60 * 24 * 30, // 30 Days in seconds
        sameSite: "strict",
    });
    setCookie(USER_EMAIL, email, {
        maxAge: 60 * 60 * 24 * 30, // 30 Days in seconds
        sameSite: "strict",
    });
    setCookie(USER_NAME, username, {
        maxAge: 60 * 60 * 24 * 30, // 30 Days in seconds
        sameSite: "strict",
    });
}

//Function to delete all cookies
export const deleteAllCookies = () => {
    deleteCookie(USER_TOKEN);
    deleteCookie(DISPLAY_NAME);
    deleteCookie(USER_EMAIL);
    deleteCookie(USER_NAME);
};
