import express from "express";


import Agence from "../controllers/controllerAgence.js";
import Tickets from "../controllers/controllerTicket.js";
import Materiels from "../controllers/controllerMateriel.js";
import Assignations from "../controllers/controllerAssignation.js";
import Incidents from "../controllers/controllerIncident.js";
import Affectations from "../controllers/controllerAffectation.js";
import multer from "multer";
import FileController from "../controllers/controllerFiles.js";
import Transaction from "../controllers/controllerTransaction.js";
import passport from "../authenticate/auth.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import Users from "../controllers/controllerUsers.js";
dotenv.config()



/**
 * instatiation des routes
 */

const route = express.Router()
const ob_agence = new Agence()
const ob_ticket = new Tickets()
const ob_materiel = new Materiels()
const ob_transation = new Transaction()
const ob_assign = new Assignations()
const ob_incident = new Incidents()
const ob_affectation = new Affectations()
const ob_file = new FileController()
const ob_user = new Users()

/** definition des routes */




route.get("/", (req, res) => {

	if (req.cookies) {
		res.json(req.cookies)
	} else {
		res.json({ cookie: null })
	}
})


route.get('/logout', function (req, res, next) {
	req.session.destroy(function (err) { // Destroy server-side session
		if (err) {
			return next(err);
		}

		res.clearCookie('authuser'); // Clear the session cookie
		res.redirect('/'); // Redirect to a desired page after logout
	});
});

// route login
route.post("/login", (req, res, next) => {
	passport.authenticate('login', async (err, user) => {
		try {

			if (err) {
				const error = new Error('une erreur est survenue')
				return next(error)
			}

			if (!user) {

				return next(res.json({ message: "Aucun utilisateur trouvé" }))
			}
			req.login(user, { session: false }, async error => {
				if (error) {
					return next(error)
				}
				// creation de jwt par son paquet jsonwebtoken
				const authToken = jwt.sign({ user: user }, process.env.DB_PASSWORD, { expiresIn: "1d" })
				res.cookie('authuser', { data: user, token: authToken },
					{
						httpOnly: true,
						maxAge: 3600000,
						secure: false   // en production changé la valeur en true pour garantir que les cookies soit envoié s'implement par https
					})

				res.json({ data: user, token: authToken })
			})



		} catch (error) {
			return next(error)
		}
	})(req, res, next)
})







/**
 * different route des agence 
 */
route.post("/user/add", (req, res) => {
    ob_user.add(req, res)
})
route.delete("/user/delete/:user", (req, res) => { ob_user.del(req, res) })
route.patch("/user/update/:user", (req, res) => { ob_user.update(req, res) })
route.get("/user/edit/:user", (req, res) => { ob_user.edit(req, res) })
route.post("/user/showrols", (req, res) => { ob_user.showrols(req, res) })
route.get("/user/show", (req, res) => {
    ob_user.show(req, res)
})


route.post("/agence/add", (req, res) => { ob_agence.add(req, res) })
route.get("/agence/show", (req, res) => { ob_agence.show(req, res) })
route.get("/agence/edit/:agence", (req, res) => { ob_agence.edit(req, res) })
route.delete("/agence/delete/:agence", (req, res) => { ob_agence.del(req, res) })
route.patch("/agence/update/:agence", (req, res) => { ob_agence.update(req, res) })

/** 
 * route pour les ticket
 */

route.post("/ticket/add", (req, res) => { ob_ticket.add(req, res) })
route.get("/ticket/show", (req, res) => { ob_ticket.show(req, res) })
route.get("/ticket/join", (req, res) => { ob_ticket.showJoin(req, res) })
route.get("/ticket/nojoin", (req, res) => { ob_ticket.showNojoin(req, res) })

route.get("/ticket/assigne", (req, res) => { ob_assign.showassigne(req, res) })
route.get("/ticket/assignejoin", (req, res) => { ob_assign.showassignejoin(req, res) })

route.get("/ticket/edit/:ticket", (req, res) => { ob_ticket.edit(req, res) })
route.post("/ticket/showByUser", (req, res) => { ob_ticket.showByUser(req, res) })
route.delete("/ticket/delete/:ticket", (req, res) => { ob_ticket.del(req, res) })
route.patch("/ticket/update/:ticket", (req, res) => { ob_ticket.update(req, res) })
route.get("/ticket/file/:ticket", (req, res) => { ob_ticket.getfile(req, res) })
/** 
 * route pour les piece joint du ticket ticket
 */



route.post("/file/add", (req, res) => { ob_file.add(req, res) })
route.get("/file/show", (req, res) => { ob_file.show(req, res) })
route.get("/file/edit/:ticket", (req, res) => { ob_file.edit(req, res) })


route.get("/download/:file", (req, res) => { ob_file.download(req, res) })




// upload file
// configuration du storage pour le telechargement
const storage = multer.diskStorage({
	destination: (req, file, done) => {
		done(null, "uploads")
	},
	filename: (req, file, done) => {
		done(null, file.originalname);
	},

})
// extension des fichier autorisé
const fileFilter = (req, file, done) => {
	const isArchive = file.originalname.match(/.(zip|7z|rar|tar|gz|cpio|img|tgz )$/)
	const isword = file.originalname.match(/.(docx|doc|docm|dot|dotx|dotm)$/)
	const isExcel = file.originalname.match(/.(xls|xlsx|xlsm|xlsb|xltx|xltm)$/)
	const isPowerpoint = file.originalname.match(/.(ppt|pptx|pptm|potx|potm)$/)
	const isAuther = file.originalname.match(/.(pdf|rtf|txt|xml)$/)
	const isImage = file.originalname.match(/.(jpg|jpeg|png|gif|svg|webp|tiff|tif|bmp|psd|ai|heic|heif|avif|raw|ico|eps)$/)
	isword || isExcel || isPowerpoint || isArchive || isAuther || isImage ? true : false

	if (!(isword || isExcel || isPowerpoint || isArchive || isAuther || isImage))
		return done(
			false,
		);
	done(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter })
route.post("/ticket/file", upload.single('file'), ob_ticket.upload)

/** 
 * route pour les materiel
 */

route.post("/materiel/add", (req, res) => { ob_materiel.add(req, res) })
route.get("/materiel/show", (req, res) => { ob_materiel.show(req, res) })
route.get("/materiel/edit/:materiel", (req, res) => { ob_materiel.edit(req, res) })
route.get("/materiel/find/:materiel", (req, res) => { ob_materiel.findOne(req, res) })
route.delete("/materiel/delete/:materiel", (req, res) => { ob_materiel.del(req, res) })
route.patch("/materiel/update/:materiel", (req, res) => { ob_materiel.update(req, res) })
/** 
 * route pour les transaction
 */

route.post("/transaction/add", (req, res) => { ob_transation.add(req, res) })
route.get("/transaction/show", (req, res) => { ob_transation.show(req, res) })
route.get("/transaction/edit/:id", (req, res) => { ob_transation.edit(req, res) })
route.delete("/transaction/delete/:id", (req, res) => { ob_transation.del(req, res) })
route.patch("/transaction/update/:id", (req, res) => { ob_transation.update(req, res) })
/** 
 * route pour les assignation
 */

route.post("/assignation/add", (req, res) => { ob_assign.add(req, res) })
route.get("/assignation/show", (req, res) => { ob_assign.show(req, res) })

route.get("/assignation/showjoin", (req, res) => { ob_assign.showassignejoin(req, res) })
route.get("/assignation/shownojoin", (req, res) => { ob_assign.showassigne(req, res) })


route.get("/assignation/edit/:assign", (req, res) => { ob_assign.edit(req, res) })
route.delete("/assignation/delete/:assign", (req, res) => { ob_assign.del(req, res) })
route.patch("/assignation/update/:assign", (req, res) => { ob_assign.update(req, res) })


/** 
 * route pour les incidents
 */

route.post("/incident/add", (req, res) => { ob_incident.add(req, res) })
route.get("/incident/show", (req, res) => { ob_incident.show(req, res) })
route.get("/incident/edit/:incident", (req, res) => { ob_incident.edit(req, res) })
route.delete("/incident/delete/:incident", (req, res) => { ob_incident.del(req, res) })
route.patch("/incident/update/:incident", (req, res) => { ob_incident.update(req, res) })
/** 
 * route pour les affectations
 */

route.post("/affectation/add", (req, res) => { ob_affectation.add(req, res) })
route.get("/affectation/show", (req, res) => { ob_affectation.show(req, res) })
route.get("/affectation/find/:user", (req, res) => { ob_affectation.find(req, res) })
route.get("/affectation/edit/:affect", (req, res) => { ob_affectation.edit(req, res) })
route.delete("/affectation/delete/:affect", (req, res) => { ob_affectation.del(req, res) })
route.patch("/affectation/update/:affect", (req, res) => { ob_affectation.update(req, res) })


export default route
