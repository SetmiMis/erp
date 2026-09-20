// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Login (/) aur Register page public hain.
  const isPublicPath = path === '/' || path === '/register';

  // Browser se token nikalein.
  const token = request.cookies.get('token')?.value || '';

  // Case 1: Agar user logged in hai (token hai) aur public page (login/register) par ja raha hai...
  // ...to usko seedha dashboard par bhej do.
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
  }

  // Case 2: Agar user logged in nahi hai (token nahi hai) aur private page kholne ki koshish kar raha hai...
  // ...to usko login page par bhej do.
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  // Agar upar ki koi condition match nahi hoti, to user ko page access karne do.
  return NextResponse.next();
}

// Yeh middleware kin-kin pages par chalega.
export const config = {
  matcher: [
    /*
     * Un pages ko chhodkar sabhi pages par yeh middleware chalega
     * jinki shuruaat in se hoti hai:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};