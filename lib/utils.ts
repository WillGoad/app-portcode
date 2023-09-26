import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { DISPLAY_NAME, USER_EMAIL, USER_TOKEN } from "./constants";
import { setCookie } from "cookies-next";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const setUserCookies = (username: string, email: string, accessToken: string) => {
    setCookie(USER_TOKEN, accessToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 Days in seconds
    });
    setCookie(DISPLAY_NAME, username, {
        maxAge: 60 * 60 * 24 * 30, // 30 Days in seconds
    });
    setCookie(USER_EMAIL, email, {
        maxAge: 60 * 60 * 24 * 30, // 30 Days in seconds
    });
}
