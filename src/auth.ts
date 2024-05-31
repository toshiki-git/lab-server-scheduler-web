import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export const config: NextAuthConfig = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  basePath: "/api/auth",
  callbacks: {
    async signIn({ profile }) {
      try {
        const res = await fetch("http://localhost:8080/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: profile?.name,
            email: profile?.email,
            image_url: profile?.picture,
          }),
        });

        if (!res.ok) {
          console.error(`Error: ${res.statusText}`);
          return false;
        }

        return true;
      } catch (error) {
        console.error("Error during signIn callback:", error);
        return false;
      }
    },
    authorized({ request, auth }) {
      try {
        const { pathname } = request.nextUrl;
        if (pathname === "protected-page") return !!auth;
        return true;
      } catch (err) {
        return false;
      }
    },
    jwt({ token, trigger, session }) {
      if (trigger === "update") token.name = session.user.name;
      return token;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
