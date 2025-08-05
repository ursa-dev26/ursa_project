import Materiel from "../models/materiel.js"
import G_error from "../err/gestErrror.js"
import isValuePresent from "../validate.js"
import { toastSms } from "../helpers/sendMassage.js"


class Materiels {
    erreur = null
    constructor() {
        this.erreur = new G_error()

    }


    /**
     *  @function add()
     *  @param req 
     *  @param res 
     * fonction d'ajout d'un ticket
     * 
     */

    add = async (req, res) => {
        try {
            const { adresse_mac, serial_number, libelle, date_mise_service, etat } = req?.body
            const data = {
                adresse_mac: adresse_mac,
                serial_number: serial_number,
                libelle: libelle,
                date_mise_service: date_mise_service,
                etat: etat
            }

            const result = await Materiel.query().insert(data)
            if (isValuePresent(result)) {
                isValuePresent(result) ?
                    result?.id != 0 ?
                        toastSms(res, true, req?.body) :
                        toastSms(res, false, "Erreur d'insertion des données") :
                    toastSms(res, false, "une erreur s'est produit lors de l'insertion des données")

            } else {
                toastSms(res, false, "Fatal error")
            }

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
     * fonction d'ajout d'un ticket
     * 
     */
    show = async (req, res) => {
        try {
            const data = await Materiel.query()
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
     *  @function edit()
     *  @param req 
     *  @param res 
     * fonction d'ajout d'un ticket
     * 
     */
    edit = async (req, res) => {
        try {
            const { materiel } = req?.params
            const data = await Materiel.query().findOne({ "id": materiel })
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
     *  @function edit()
     *  @param req 
     *  @param res 
     * fonction d'ajout d'un ticket
     * 
     */
    findOne = async (req, res) => {
        try {
            const { materiel } = req?.params
            const data = await Materiel.query().findOne({ "adresse_mac": materiel })
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
     *  @function del()
     *  @param req 
     *  @param res 
     * fonction d'ajout d'un ticket
     * 
     */
    del = async (req, res) => {
        try {
            const { materiel } = req?.params
            const data = await Materiel.query().findOne({ "id": materiel })
            if (isValuePresent(data)) {
                const result = await Materiel.query()
                    .delete()
                    .where({ "id": materiel })
                isValuePresent(result) ?
                    result == 1 ?
                        toastSms(res, true, data) :
                        toastSms(res, false, "Erreur de suppression") :
                    toastSms(res, false, "Fatal erreur")
            } else {
                toastSms(res, false, "l'enregistrement cible n'existe pas")
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
     * fonction d'ajout d'un ticket
     * 
     */
    update = async (req, res) => {
        try {
            const { materiel } = req?.params
            const data = await Materiel.query().findOne({ "id": materiel })
            if (isValuePresent(data)) {
                const result = await Materiel.query()
                    .patch(req?.body)
                    .where({ "id": materiel })

                isValuePresent(result) ?
                    result == 1 ?
                        toastSms(res, true, data) :
                        toastSms(res, false, "Erreur de mise a jour") :
                    toastSms(res, false, "l'enregistrement cible n'existe pas")


            } else {
                toastSms(res, false, "Fatal error")
            }

        } catch (error) {
            if (error) {
                this.erreur.getError(error, res)
            }
        }
    }

}

export default Materiels