import { handleGoogleOAuth } from "@/models";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import configENV from "./env.config";

passport.use(
  new GoogleStrategy(
    {
      authorizationURL: configENV.googleAuthUri,
      tokenURL: configENV.googleTokenUri,
      clientID: configENV.googleClientId as string,
      clientSecret: configENV.googleClientSecret as string,
      callbackURL: configENV.googleCallbackUrl,
    },
    async function (
      accessToken: string,
      refreshToken: string,
      profile: any,
      cb: (error: any, user?: any) => void
    ) {
      try {
        const data = await handleGoogleOAuth(profile);
        return cb(null, data);
      } catch (error) {
        return cb(error, null);
      }
    }
  )
);

passport.serializeUser((user: any, done: (error: any, id?: any) => void) => {
  done(null, user);
});

passport.deserializeUser(
  (user: any, done: (error: any, user?: any) => void) => {
    done(null, user);
  }
);

export default passport;
