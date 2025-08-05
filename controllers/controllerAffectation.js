import G_error from "../err/gestErrror.js"
import Affectation from "../models/affectation.js"
import isValuePresent from "../validate.js"
import { toastSms } from "../helpers/sendMassage.js"

class Affectations {
    erreur = null
    constructor() {
        this.erreur = new G_error()
    }

    /**
*  @function add()
*  @param req  
*  @param res  
*  add data
*/

    add = async (req, res) => {
        try {
            const { user_ref, agence_ref, fonction } = req?.body
            const data = {
                user_ref: user_ref,
                agence_ref: agence_ref,
                fonction: fonction
            }
            const result = await Affectation.query().insert(data)
            isValuePresent(result) ?
                result?.id != 0 ?
                    toastSms(res, true, req?.body) :
                    toastSms(res, false, "data not save") :
                toastSms(res, false, "data save error")


        } catch (error) {
            if (error) {
                this.erreur.getError(error, res)
            }
        }
    }
    /**
*  @function show()
*  @param req  
*  @param res  
*  show all data
*/

    show = async (req, res) => {
        try {
            const data = await Affectation.query()
                .select("affectations.*",
                    "users.matricule", "users.nom", "users.prenom", "users.role", "users.telephone",
                    "agences.code as agence_code", "agences.libelle as agence_libelle", "agences.localite as agence_localite")
                .join("users", "affectations.user_ref", "users.matricule")
                .join("agences", "affectations.agence_ref", "agences.code")

            isValuePresent(data) ?
                toastSms(res, true, data) :
                toastSms(res, false, "Aucun element n'a été trouvé")
                
        } catch (error) {
              toastSms(res, false, "Fatal error")
        }
    }

    /**
*  @function edit()
*  @param req  
*  @param res  
*  edit data
*/

    edit = async (req, res) => {
        try {
            const { affect } = req?.params
            const data = await Affectation.query()
                .select("affectations.*",
                    "users.matricule", "users.nom", "users.prenom", "users.role", "users.telephone",
                    "agences.code as agence_code", "agences.libelle as agence_libelle", "agences.localite as agence_localite")
                .join("users", "affectations.user_ref", "users.matricule")
                .join("agences", "affectations.agence_ref", "agences.code")
                .where({ "affectations.user_ref": affect })

            isValuePresent(data) ?
                toastSms(res, true, data) :
                res.send({ data: [], message: "Aucun element n'est trouvé" })

        } catch (error) {
            if (error) {
                this.erreur.getError(error, res)
            }
        }
    }

    /**
*  @function edit()
*  @param req  
*  @param res  
*  edit data
*/

    find = async (req, res) => {
        try {
            const { user } = req?.params
            const data = await Affectation.query()
                .select("affectations.*",
                    "users.matricule", "users.nom", "users.prenom", "users.role", "users.telephone",
                    "agences.code as agence_code", "agences.libelle as agence_libelle", "agences.localite as agence_localite")
                .join("users", "affectations.user_ref", "users.matricule")
                .join("agences", "affectations.agence_ref", "agences.code")
                .where({ "affectations.user_ref": user })

            isValuePresent(data) ?
                toastSms(res, true, data) :
                res.send("Aucun element n'est trouvé")

        } catch (error) {
            if (error) {
                this.erreur.getError(error, res)
            }
        }
    }

    /**
*  @function del()
*  @param req  
*  @param res  
*  delete data
*/
    del = async (req, res) => {
        try {
            const { affect } = req?.params
            const data = await Affectation.query()
                .select("affectations.*",
                    "users.matricule", "users.nom", "users.prenom", "users.role", "users.telephone",
                    "agences.code as agence_code", "agences.libelle as agence_libelle", "agences.localite as agence_localite")
                .join("users", "affectations.user_ref", "users.matricule")
                .join("agences", "affectations.agence_ref", "agences.code")
                .where({ "affectations.id": affect })

            if (isValuePresent(data)) {
                const result = await Affectation.query()
                    .delete()
                    .where({ "affectations.id": affect })

                isValuePresent(result) ?
                    result == 1 ?
                        toastSms(res, true, data) :
                        toastSms(res, false, "Erreur de suppression") :
                    toastSms(res, false, "fatal error")

            } else {
                toastSms(res, false, "Cette enregistrement n'existe pas")
            }
        } catch (error) {
            if (error) {
                this.erreur.getError(error, res)
            }
        }
    }

    /**
*  @function update()
*  @param req  
*  @param res  
*  fonction de mise a jour
*/
    update = async (req, res) => {
        try {

            const { affect } = req?.params
            const data = await Affectation.query()
                .select("affectations.*",
                    "users.matricule", "users.nom", "users.prenom", "users.role", "users.telephone",
                    "agences.code as agence_code", "agences.libelle as agence_libelle", "agences.localite as agence_localite")
                .join("users", "affectations.user_ref", "users.matricule")
                .join("agences", "affectations.agence_ref", "agences.code")
                .where({ "affectations.user_ref": affect })

            if (isValuePresent(data)) {
                const result = await Affectation.query()
                    .patch(req?.body)
                    .where({ "affectations.user_ref": affect })

                isValuePresent(result) ?
                    result == 1 ?
                        toastSms(res, true, data) :
                        toastSms(res, false, "erreur de mise a jour") :
                    toastSms(res, false, "Fatal error")
            } else {
                toastSms(res, false, "Cette enregistrement n'existe pas a la base de donnée")
            }

        } catch (error) {
            if (error) {
                this.erreur.getError(error, res)
            }
        }
    }


}

export default Affectations