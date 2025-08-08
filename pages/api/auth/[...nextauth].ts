import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
  async redirect({ url, baseUrl }) {
    // Redirect to the callbackUrl (url) if it's local, else fallback to /home
    if (url.startsWith(baseUrl)) {
      return url;
    }
    return baseUrl + "/home";
  },
},

});

export { handler as GET, handler as POST };
export default handler;
