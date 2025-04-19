import 'dotenv/config'
import {expressjwt as jwt} from 'express-jwt'
import jwksRsa from 'jwks-rsa'
 
const Auth0checkJWT = jwt({
    secret: jwksRsa.expressJwtSecret({
      jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
    }),
    audience: process.env.AUTH0_AUDIENCE,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ["RS256"],
  });

export default Auth0checkJWT