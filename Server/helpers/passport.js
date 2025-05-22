import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "../models/UserModel.js";

dotenv.config();

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    scope: ["profile", "email"],
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // console.log({profile});
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = new User({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails?.[0]?.value,
          avatar: profile.photos?.[0]?.value,
        });
        await user.save();
      }
      const token = user.generateAuthToken();
      return done(null, { user, token });
    } catch (error) {
      console.error(error);
      return done(error, null);
    }
  }
));

passport.serializeUser(({ user }, done) => {
  done(null, user.id); // just store the user ID
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});