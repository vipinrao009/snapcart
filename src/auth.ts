import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectTODatabase } from "./lib/db";
import User from "./models/user.model";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request) {
        await connectTODatabase();

        const email = credentials.email;
        const password = credentials.password as string;

        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("User not found please register first"); // yaha par return se error handle is liye nahi kiya gaya hai kyuki authorize function me ye error deta hai kyuki ye sirf YOU CAN’T RETURN NextResponse.json()
        }

        const isMatched = await bcrypt.compare(password, user.Password);
        if (!isMatched) {
          throw new Error("Incorrect Password");
        }

        // Return a plain object that will be available as `user` in callbacks
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  // callback ek function hota hai jo login ke baad token and session ke through user ka data browser me store karata hai

  callbacks: {
    // jwt token ke ander user ka data store karta hai (token automatecally generate ho jata hai jab user login hota hai to but uske ander user ka data nahi hota hai)
    jwt({ token, user }) {
      if (user) {
        token.id = user.id,
        token.name = user.name,
        token.email = user.email,
        token.role = user.role
      }
      return token
    },

    session({session, token}){
        if(session.user){
            session.user.id = token.id as string
            session.user.name = token.name as string
            session.user.email = token.email as string
            session.user.role = token.role as string
        }
        return session
    }
  },

  pages:{
    signIn:"/login",
    error:"/login"
  },

  session:{
    strategy:"jwt",
    maxAge:10*24*60*60*1000
  }, 

  secret:process.env.AUTH_SECRET
});
