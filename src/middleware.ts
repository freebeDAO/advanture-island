import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

export const config = {
  matcher: [
    '/((?!login|public|_next|api|auth|favicon.ico|robots.txt|sitemap.xml|images|fonts|_vercel).*)'
  ],
};