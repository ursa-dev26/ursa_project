import G_error from "../err/gestErrror.js"
import Incident from "../models/Incident.js"
import isValuePresent from "../validate.js"
import { toastSms } from "../helpers/sendMassage.js"

class Incidents {
    erreur = null

    constructor() {
        this.erreur = new G_error()
    }


    /**
    *  @function add()
    *  @param req  
    *  @param res  
    * fonction d'ajout
    */
    add = async (req, res) => {
        try {

            const { type, nom,description } = req?.body
            const data = {
                type: type,
                nom: nom,
                description:description
            }

            const result = await Incident.query().insert(data)
            isValuePresent(result) ?
                result.id != 0 ?
                    toastSms(res, true, result) :
                    toastSms(res, false, "aucun ligne n'as été ajouté") :
                toastSms(res, false, "Erreur de sauvegarde")

        } catch (error) {
            console.log(error);

            if (error) {
                this.erreur.getError(error, res)
            }
        }
    }
    /**
   *  @function show()
   *  @param req  
   *  @param res  
   * fonction d'affichage
   */
    show = async (req, res) => {
        try {
            const data = await Incident.query()
            isValuePresent(data) ?
                toastSms(res, true, data) :
                toastSms(res, false, "Aucun element n'as été trouvé")

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
   * fonction d'edition
   */
    edit = async (req, res) => {
        try {
            const { incident } = req?.params
            const data = await Incident.query().findOne({ "id": incident })
            isValuePresent(data) ?
                toastSms(res, true, data) :
                toastSms(res, false, "Aucun element n'as été trouvé")
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
   * fonction de supression
   */
    del = async (req, res) => {

        try {
            const { incident } = req?.params
            const data = await Incident.query().findOne({ "id": incident })
            if (isValuePresent(data)) {
                const result = await Incident.query()
                    .delete()
                    .where({ "id": incident })

                isValuePresent(result) ?
                    result == 1 ?
                        toastSms(res, true, data) :
                        toastSms(res, false, "Erreur de supression") :
                    toastSms(res, false, "Fatal error")
            } else {
                toastSms(res, false, "Element introuvable")
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
            const { incident } = req?.params
            const data = await Incident.query().findOne({ "id": incident })
            if (isValuePresent(data)) {
                const result = await Incident.query()
                    .patch(req?.body)
                    .where({ "id": incident })

                isValuePresent(result) ?
                    result == 1 ?
                        toastSms(res, true, data) :
                        toastSms(res, false, "erreur de mise a jour") :
                    toastSms(res, false, "Fatal error")

            } else {
                toastSms(res, false, "Element introuvable")
            }

        } catch (error) {
            if (error) {
                this.erreur.getError(error, res)
            }
        }
    }

}

export default Incidents