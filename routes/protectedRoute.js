import express from "express";
import Users from "../controllers/controllerUsers.js";





const ob_user = new Users()
/**
 * instantiation des controleurs
 */
const route = express.Router()





// definition des route privé
route.get("/mail", (req, res) => {
    res.json({
        message: "le systeme vous a bien reconu",
        user: req.user,
        token: req.query.token
    })
})

/** route pour les utilisateur */



//route pour les utilisateur
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





export default route