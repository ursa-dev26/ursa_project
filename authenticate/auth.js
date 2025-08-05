import passport from "passport";
import { Strategy } from "passport-local";
import JWT from "passport-jwt";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv"
import Affectation from "../models/affectation.js";
const { Strategy: JWTstrategiy, ExtractJwt } = JWT



dotenv.config()
/** strategie de login */
passport.use("login",
    new Strategy({ usernameField: 'email', passwordField: 'password' },
        async function verify(email, password, cb) {

            try {
                const user = await User.query()
                .select("affectations.*",
                    "users.matricule", "users.nom","users.email","users.password", "users.prenom", "users.role", "users.telephone",
                    "agences.code as agence_code", "agences.libelle as agence_libelle", "agences.localite as agence_localite")
                .findOne({ "email": email })
                .join("affectations", "affectations.user_ref", "users.matricule")
                .join("agences", "affectations.agence_ref", "agences.code");
             
                
                if (!user) {
                    return cb(null, false, { message: 'email ou mot de passe incorecte' });
                }
                try {

                    const isSame = await bcrypt.compare(password, user?.password)

                    if (isSame) { return cb(null, user); }
                    if (!isSame) {
                        return cb(null, false, { message: 'Incorrect username or password.' });
                    }
                } catch (error) {
                    
                    return cb(null, false, { message: "mot de passe invalid" })
                }

            } catch (error) {

                return cb(null, false, { message: "Erreur de chargement de donnée" })
            }


        }));

/** strategie jwt fromUrlQueryParameter*/

passport.use(new JWTstrategiy(
    {
        secretOrKey: process.env.DB_PASSWORD,
        jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token')
    },
    async (token, done) => {
        try {
            return done(null, token.user)
        } catch (error) {
            done(error)
        }
    }
))


export default passport



