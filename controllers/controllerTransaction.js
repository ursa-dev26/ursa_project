import G_error from "../err/gestErrror.js"
import isValuePresent from "../validate.js"
import { toastSms } from "../helpers/sendMassage.js"
import ModelTransaction from "../models/transaction.js"

class Transaction {
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
            const { qté, objet, agence_ref, materiel_ref } = req?.body
            const data = {
                qté: qté,
                objet: objet,
                agence_ref: agence_ref,
                materiel_ref: materiel_ref
            }
            const result = await ModelTransaction.query().insert(data)
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
            const data = await ModelTransaction.query()
                .select("transactions.*",
                    "materiels.adresse_mac", "materiels.serial_number", "materiels.libelle", "materiels.date_mise_service", "materiels.etat",
                    "agences.code as agence_code", "agences.libelle as agence_libelle", "agences.localite as agence_localite")
                .join("materiels", "transactions.materiel_ref", "materiels.id")
                .join("agences", "transactions.agence_ref", "agences.code")

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
*  edit data
*/

    edit = async (req, res) => {
        try {
            const { id } = req?.params
            const data = await ModelTransaction.query()
                .select("transactions.*",
                    "materiels.adresse_mac", "materiels.serial_number", "materiels.libelle", "materiels.date_mise_service", "materiels.etat",
                    "agences.code as agence_code", "agences.libelle as agence_libelle", "agences.localite as agence_localite")
                .join("materiels", "transactions.materiel_ref", "materiels.id")
                .join("agences", "transactions.agence_ref", "agences.code")
                .where({ "transactions.id": id })

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
            const data = await ModelTransaction.query()
                .select("transactions.*",
                    "materiels.adresse_mac", "materiels.serial_number", "materiels.libelle", "materiels.date_mise_service", "materiels.etat",
                    "agences.code as agence_code", "agences.libelle as agence_libelle", "agences.localite as agence_localite")
                .join("materiels", "transactions.materiel_ref", "materiels.id")
                .join("agences", "transactions.agence_ref", "agences.code")
                .where({ "transactions.id": id })

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
            const { id } = req?.params
            const data = await ModelTransaction.query()
                .select("transactions.*",
                    "materiels.adresse_mac", "materiels.serial_number", "materiels.libelle", "materiels.date_mise_service", "materiels.etat",
                    "agences.code as agence_code", "agences.libelle as agence_libelle", "agences.localite as agence_localite")
                .join("materiels", "transactions.materiel_ref", "materiels.id")
                .join("agences", "transactions.agence_ref", "agences.code")
                .where({ "transactions.id": id })

            if (isValuePresent(data)) {
                const result = await ModelTransaction.query()
                    .delete()
                    .where({ "transactions.id": id })

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

            const { id } = req?.params
            const data = await ModelTransaction.query()
                .select("transactions.*",
                    "materiels.adresse_mac", "materiels.serial_number", "materiels.libelle", "materiels.date_mise_service", "materiels.etat",
                    "agences.code as agence_code", "agences.libelle as agence_libelle", "agences.localite as agence_localite")
                .join("materiels", "transactions.materiel_ref", "materiels.id")
                .join("agences", "transactions.agence_ref", "agences.code")
                .where({ "transactions.id": id })

            if (isValuePresent(data)) {
                const result = await ModelTransaction.query()
                    .patch(req?.body)
                    .where({ "transactions.id": id })

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

export default Transaction