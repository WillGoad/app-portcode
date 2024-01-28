import { type NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  // validate the user is authenticated
  return NextResponse.redirect(new URL('/onboarding', "https://www.portco.de/"))

}