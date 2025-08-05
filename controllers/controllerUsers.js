import User from "../models/user.js"
import G_error from "../err/gestErrror.js"
import isValuePresent from "../validate.js"
import { toastSms } from "../helpers/sendMassage.js"
import { hashPWD } from "./controlePassword.js"

class Users {
    erreur = null
    constructor() {
        this.erreur = new G_error()
    }





    /**
     * @function add() 
     * @param req  
     * @param res  
     * Ajout d'utilisateur
     * 
     */
    add = async (req, res) => {
        try {
            const { matricule, nom, prenom, email, password, date_naissance, role, telephone } = req.body
            const data = {
                matricule: matricule,
                nom: nom,
                prenom: prenom,
                email: email,
                password: await hashPWD(password),
                date_naissance: date_naissance,
                role: role,
                telephone: telephone
            }

            const result = await User.query().insert(data)
            isValuePresent(result) ?
                toastSms(res, true, req.body) :
                toastSms(res, false, "Erreur de sauvegarde de données")
        } catch (error) {
            console.log(error);

            if (error) {
                this.erreur.getError(error, res)
            }
        }
    }




    /**
     * @function show() 
     * @param _ 
     * @param res 
     * affiche tous les utilisateurs
     * 
     */
    show = async (req, res) => {
        try {
            const data = await User.query()

            isValuePresent(data) ?
                toastSms(res, true, {userAuth:req.cookies,data:data} ) :
                toastSms(res, false, "Aucun element n'a été trouvé")
        } catch (error) {

            toastSms(res, false, "Fatal error")
        }

    }
    /**
     * @function del() 
     * @param req 
     * @param res 
     * suppression d'un utilisateur
     */
    del = async (req, res) => {

        const { user } = req?.params
        try {
            const data = await User.query()
                .findOne({ "matricule": user })
            if (isValuePresent(data)) {
                //requete de suppression
                const result = await User.query()
                    .delete()
                    .where("matricule", user)
                isValuePresent(result) ?
                    result == 1 ?
                        toastSms(res, true, data) :
                        toastSms(res, false, "Utilisateur non trouvé") :
                    toastSms(res, false, "Erreur de supression")
            } else {
                toastSms(res, false, "Cette enregistrement n'existe pas à la base de donnée")
            }

        } catch (error) {
            this.erreur.getError(error, res)
        }
    }

    /**
     * @function update()
     * @param req  
     * @param res  
     *  mettre à jour d'un utilisateur 
     */
    update = async (req, res) => {

        try {

            const { user } = req?.params
            const exist = await User.query()
                .findOne({ "matricule": user })

            if (isValuePresent(exist)) {
                const result = await User.query()
                    .patch(req?.body)
                    .where("matricule", user)

                isValuePresent(result) ?
                    result == 1 ?
                        res.send(toastSms(res, true, exist)) :
                        res.send(toastSms(res, false, "Erreur de modification")) :
                    res.send(toastSms(res, false, "Fatal error"))
            } else {
                res.status(203).send(toastSms(res, false, "Cette enregistrement n'existe pas à la base de donnée"))

            }
        } catch (error) {
            this.erreur.getError(error, res)

        }
    }

    /**
     * @function edit()
     * @param req
     * @param res 
     *  
     * on cherche a trouvé un enregistrement a partir de son id
     */
    edit = async (req, res) => {
        try {
            const { user } = req?.params
            const result = await User.query()
                .findOne({ "matricule": user })
            isValuePresent(result) ?
                toastSms(res, "succes", result) :
                toastSms(res, false, "Utilisateur non trouvé")
        } catch (error) {
            this.erreur.getError(error, res)
        }
    }


    /**
     * @function showrols() 
     * @param req 
     * @param res 
     * trouvé un utilisateur en fonction de son role
     */
    showrols = async (req, res) => {
        try {
            const { role } = req?.body
            const result = await User.query()
                .where({ "role": role })
            isValuePresent(result) ?
                toastSms(res, true, result) :
                toastSms(res, false, "Aucun utilisateur n'as se role")
        } catch (error) {
            this.erreur.getError(error, res)
        }
    }


}


export default Users
