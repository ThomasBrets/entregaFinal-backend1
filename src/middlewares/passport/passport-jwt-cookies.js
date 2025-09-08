import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import config from "../../config/config.js";

const cookieExtractor = (req) => {
    return req.cookies.accessToken
}

const strategyConfig = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: config.JWT_SECRET
}

const verifyToken = async (jwt_payload, done) => {
  if (!jwt_payload) return done(null, false, { messages: "User not found" });
  return done(null, jwt_payload);
};

passport.use("jwt", new Strategy(strategyConfig, verifyToken))