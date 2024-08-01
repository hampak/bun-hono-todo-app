import { createKindeServerClient, GrantType, type SessionManager, type UserType } from "@kinde-oss/kinde-typescript-sdk";
import type { Context } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";

// Client for authorization code flow
export const kindeClient = createKindeServerClient(GrantType.AUTHORIZATION_CODE, {
  authDomain: process.env.KINDE_DOMAIN as string,
  clientId: process.env.KINDE_CLIENT_ID as string,
  clientSecret: process.env.KINDE_CLIENT_SECRET,
  redirectURL: process.env.KINDE_REDIRECT_URI as string,
  logoutRedirectURL: process.env.KINDE_LOGOUT_REDIRECT_URI
});

// let store: Record<string, unknown> = {};

export const sessionManager = (c: Context): SessionManager => ({
  async getSessionItem(key: string) {
    const result = getCookie(c, key)

    // if (result) {
    //   const now = new Date()
    //   const expires = new Date(now.getTime() + 10 * 1000)

    //   const cookieOptions = {
    //     httpOnly: true, // so it cannot be accessed by js
    //     secure: true, // for ssl connection
    //     sameSite: "Lax", // to prevent cross-site forgery attacks 
    //     expires
    //   } as const;

    //   setCookie(c, key, result, cookieOptions)
    // }

    return result
  },
  async setSessionItem(key: string, value: unknown) {

    const now = new Date()
    const expires = new Date(now.getTime() + 10 * 1000)

    const cookieOptions = {
      httpOnly: true, // so it cannot be accessed by js
      secure: true, // for ssl connection
      sameSite: "Lax", // to prevent cross-site forgery attacks 
      // expires
    } as const;
    if (typeof value === "string") {
      setCookie(c, key, value, cookieOptions)
    } else {
      setCookie(c, key, JSON.stringify(value), cookieOptions)
    }
  },
  async removeSessionItem(key: string) {
    deleteCookie(c, key);
  },
  async destroySession() {
    ["id_token", "access_token", "user", "refresh_token"].forEach((key) => {
      deleteCookie(c, key)
    })
  }
})

export const extendSession: MiddlewareHandler = async (c: Context, next) => {
  const session = sessionManager(c);

  // Example key, replace with actual key or loop over expected keys
  const keys = ['id_token', 'access_token', 'user', 'refresh_token'];

  for (const key of keys) {
    const value = await session.getSessionItem(key);
    if (value) {
      // Extend the cookie expiration time
      const now = new Date()
      const expires = new Date(now.getTime() + 15 * 60 * 1000)

      const cookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: 'Lax',
        expires
      } as const;

      if (typeof value === "string") {
        setCookie(c, key, value, cookieOptions)
      } else {
        setCookie(c, key, JSON.stringify(value), cookieOptions)
      }
    }
  }

  await next();
};

type Env = {
  Variables: {
    user: UserType
  }
}


// export const getUser = createMiddleware<Env>(async (c, next) => {
//   try {
//     const manager = sessionManager(c)
//     const isAuthenticated = await kindeClient.isAuthenticated(manager)
//     if (!isAuthenticated) {
//       return c.json({
//         error: "You're unauthorized",
//       }, 401)
//     }

//     const user = await kindeClient.getUserProfile(manager)
//     c.set("user", user)
//     await next()
//   } catch (error) {
//     console.error(error)
//     return c.json({
//       error: "You're unauthorized",
//     }, 401)
//   }
// })