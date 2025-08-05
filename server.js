import express from "express";
import dotenv from "dotenv";
import route from "./routes/routes.js";
import protectedRoute from "./routes/protectedRoute.js";
import getConfigDB from "./database/db_config.js";
import cors from "cors"
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser"


/**configuration des variable d'environement */
dotenv.config()
getConfigDB()
const PORT = process.env.PORT || 5000

/* 
    <>
    ``
    * instanciation du server express
*/

const app = express()
//definition des middleware des cors de requete

const corsOptions = {
    origin: 'http://192.168.123.52:5173', // react app client
    credentials: true, 
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(session({
    secret: 'Pa55er#',
    resave: false,
    saveUninitialized: false,
    cookie:{
          secure: true, 
        httpOnly: true,
    } 
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser())


app.use(route)  // authorisation d'utilisation des routes


// route protegé par jwt
app.use("/ursa",
    passport.authenticate("jwt", { session: false }),
    protectedRoute
)





/** ecoute de la connectivite du server */

app.listen(PORT, () => {
    console.log(`le server tourne sur le port ${PORT}`);

})