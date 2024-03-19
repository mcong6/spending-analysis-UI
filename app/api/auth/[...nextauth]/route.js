import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github"

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),

    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const user={username:"admin",password:"123",name:"Admin"}
        if(user.username=='admin' && user.password=="123"){
          return user
        }
        // const res = await fetch("/your/endpoint", {
        //   method: 'POST',
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" }
        // })
        // const user = await res.json()

        // if (res.ok && user) {
        //   return user
        // }
        // return null
      }
    })
  ]
}

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };