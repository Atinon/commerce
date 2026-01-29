import session from "express-session";

interface SessionOptions {
  secret: string;
  isProduction: boolean;
}

export function sessionMiddleware({ secret, isProduction }: SessionOptions) {
  return session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
    },
  });
}
