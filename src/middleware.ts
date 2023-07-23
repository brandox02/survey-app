import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
   const isBackoffice = request.nextUrl.pathname.includes('/backoffice');
   const isLogin = request.nextUrl.pathname.includes('/login');
   const token = request.cookies.get('auth')?.value;
   if(token){
         if(request.nextUrl.pathname === '/' || isLogin){
         return NextResponse.redirect(new URL('/backoffice/surveys', request.url))
      }
   }else {
      if(isBackoffice || request.nextUrl.pathname === '/'){  
         return NextResponse.redirect(new URL('/login', request.url))
      }
   }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/:path*',
}