import Agence from "../models/agence.js"
import G_error from "../err/gestErrror.js"
import isValuePresent from "../validate.js"
import { toastSms } from "../helpers/sendMassage.js"




class Agences {
    erreur = null
    constructor() {
        this.erreur = new G_error()

    }
    /**
     * @function add() 
     * @param req  
     * @param res  
     * stock tous les agence dans la base de donné 
     */
    add = async (req, res) => {
        try {
            const { code, libelle, localite } = req?.body
            const data = {
                code: code,
                libelle: libelle,
                localite: localite
            }

            const result = await Agence.query().insert(data)

            isValuePresent(result) ?
                result?.id != 0 ?
                    toastSms(res, true, req?.body) :
                    toastSms(res, false, "data not save") :
                toastSms(res, false, "Data save error")

        } catch (error) {
            if (error) {
                this.erreur.getError(error, res)
            }
        }
    }

    /**
     * @function show() 
     * @param req  
     * @param res 
     * affiche les agence disponible a la base de donné
     */

    show = async (req, res) => {

        try {
            const data = await Agence.query()
            isValuePresent(data) ?
                toastSms(res, true, data) :
                toastSms(res, false, "Aucun element n'a été trouvé")
        } catch (error) {
            if (error) {
                this.erreur.getError(error, res)
            }
        }
    }

    /**
     * @function edit() 
     * @param req  
     * @param res
     * returne une sortie d'agence
     */

    edit = async (req, res) => {

        try {
            const { agence } = req?.params
            const result = await Agence.query().findOne({ "code": agence })
            isValuePresent(result) ?
                toastSms(res, "succes", result) :
                toastSms(res, false, "Aucun agence n'as été trouvé")
        } catch (error) {
            if (error) {
                this.erreur.getError(error, res)
            }
        }
    }

    /**
     * @function del() 
     * @param req  
     * @param res  
     * supprime une Agence
     */
    del = async (req, res) => {

        try {
            const { agence } = req?.params
            const data = await Agence.query().findOne({ "code": agence })
            if (isValuePresent(data)) {
                const result = await Agence.query()
                    .delete()
                    .where("code", agence)

                isValuePresent(result) ?
                    result == 1 ?
                        toastSms(res, true, data) :
                        toastSms(res, false, "Agence non trouvé") :
                    toastSms(res, false, "Erreur de supression")

            } else {
                toastSms(res, false, "Agence non trouvé")
            }
        } catch (error) {
            console.log(error);

            if (error) {
                this.erreur.getError(error, res)
            }
        }
    }

    /**
     * @function update() 
     * @param req  
     * @param res
     * mettre a jour l'agence ciblé
     */

    update = async (req, res) => {

        try {
            const { agence } = req?.params
            const data = await Agence.query().findOne({ "code": agence })
            if (isValuePresent(data)) {
                const result = await Agence.query().patch(req?.body)
                    .where({ "code": agence })

                isValuePresent(result) ?
                    result == 1 ?
                        toastSms(res, true, data) :
                        toastSms(res, false, "Erreur de mise a jour") :
                    toastSms(res, false, "Fatal error")

            } else {
                toastSms(res, false, "Cette agence n'existe pas")
            }
        } catch (error) {
            if (error) {
                this.erreur.getError(error, res)
            }
        }
    }


}

export default Agences

