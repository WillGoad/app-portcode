export const USER_TOKEN = 'user-token'
export const USER_ID = 'user-id'
export const DISPLAY_NAME = 'display-name'
export const USER_EMAIL = 'user-email'

const JWT_SECRET_KEY: string | undefined = process.env.JWT_SECRET_KEY!

export function getJwtSecretKey(): string {
  if (!JWT_SECRET_KEY || JWT_SECRET_KEY.length === 0) {
    throw new Error('The environment variable JWT_SECRET_KEY is not set.')
  }
  console.log(JWT_SECRET_KEY)
  return JWT_SECRET_KEY
}