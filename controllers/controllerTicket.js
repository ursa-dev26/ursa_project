import Ticket from "../models/ticket.js"
import G_error from "../err/gestErrror.js"
import isValuePresent from "../validate.js"
import { toastSms } from "../helpers/sendMassage.js"



class Tickets {
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
            const { code, titre, joinfile, affectation_ref, incident, libelle_incident, status, priorite, description } = req?.body
            const data = {
                code: code,
                titre: titre,
                affectation_ref: affectation_ref,
                incident: incident,
                libelle_incident: libelle_incident,
                status: status,
                priorite: priorite,
                description: description,
                joinfile: joinfile
            }

            const result = await Ticket.query().insert(data)
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
     *  @param _ 
     *  @param res 
     * fonction de recuperation de tout les tickets
     * 
     */
    show = async (_, res) => {
        try {
            const data = await Ticket.query()
                .select("tickets.*", "users.nom", "users.prenom",
                    "agences.libelle as libelle_agence", "agences.localite as localite_agence")
                .join("affectations", "tickets.affectation_ref", "affectations.id")
                .join("agences", "agences.code", "affectations.agence_ref")
                .join("users", "users.matricule", "affectations.user_ref")

            isValuePresent(data) ?
                toastSms(res, true, data) :
                toastSms(res, false, "Aucun element n'a été trouvé")
        } catch (error) {

            toastSms(res, false, "Fatal error")
        }
    }

    /**
    *  @function showJoin()
    *  @param _ 
    *  @param res 
    */
    showJoin = async (_, res) => {
        try {
            const data = await Ticket.query()
                .select("tickets.*", "users.nom", "users.prenom",
                    "agences.libelle as libelle_agence", "agences.localite as localite_agence",)
                .select(Ticket.raw("array_agg(files.nom) as file"))
                .join("affectations", "tickets.affectation_ref", "affectations.id")
                .join("agences", "agences.code", "affectations.agence_ref")
                .join("users", "users.matricule", "affectations.user_ref")
                .join("files", "files.ticket_ref", "tickets.code")
                .groupBy("tickets.code")
                .groupBy("users.nom")
                .groupBy("users.prenom")
                .groupBy("agences.libelle")
                .groupBy("agences.localite")
                .where({"joinfile": true,"status":0 })


            isValuePresent(data) ?
                toastSms(res, true, data) :
                toastSms(res, false, "Aucun element n'a été trouvé")
        } catch (error) {

            toastSms(res, false, "Fatal error")
        }
    }

    /**
   *  @function showJoin()
   *  @param _ 
   *  @param res 
   */
    showNojoin = async (_, res) => {
        try {
            const data = await Ticket.query()
                .select("tickets.*", "users.nom", "users.prenom",
                    "agences.libelle as libelle_agence", "agences.localite as localite_agence")
                .join("affectations", "tickets.affectation_ref", "affectations.id")
                .join("agences", "agences.code", "affectations.agence_ref")
                .join("users", "users.matricule", "affectations.user_ref")
                .where({"joinfile": false,"status":0 })

            isValuePresent(data) ?
                toastSms(res, true, data) :
                toastSms(res, false, "Aucun element n'a été trouvé")
        } catch (error) {
            toastSms(res, false, "Fatal error")
        }
    }






    /**
    *  @function showassignejoin()
    *  @param _ 
    *  @param res 
    */
    showassignejoin = async (_, res) => {
        try {
            const data = await Ticket.query()
                .select("tickets.*", "users.nom", "users.prenom",
                    "agences.libelle as libelle_agence", "agences.localite as localite_agence",)
                .select(Ticket.raw("array_agg(files.nom) as file"))
                .join("affectations", "tickets.affectation_ref", "affectations.id")
                .join("agences", "agences.code", "affectations.agence_ref")
                .join("users", "users.matricule", "affectations.user_ref")
                .join("files", "files.ticket_ref", "tickets.code")
                .where({ "tickets.status": 1, "joinfile": true })
                .groupBy("tickets.code")
                .groupBy("users.nom")
                .groupBy("users.prenom")
                .groupBy("agences.libelle")
                .groupBy("agences.localite")

            isValuePresent(data) ?
                toastSms(res, true, data) :
                toastSms(res, false, "Aucun element n'a été trouvé")
        } catch (error) {

            toastSms(res, false, "Fatal error")
        }
    }


    /**
  *  @function showassigne()
  *  @param _ 
  *  @param res 
  */
    showassigne = async (_, res) => {
        try {
            const data = await Ticket.query()
                .select("tickets.*", "users.nom", "users.prenom",
                    "agences.libelle as libelle_agence", "agences.localite as localite_agence")
                .join("affectations", "tickets.affectation_ref", "affectations.id")
                .join("agences", "agences.code", "affectations.agence_ref")
                .join("users", "users.matricule", "affectations.user_ref")
                .where({ "tickets.status": 1, "joinfile": false })

            isValuePresent(data) ?
                toastSms(res, true, data) :
                toastSms(res, false, "Aucun element n'a été trouvé")
        } catch (error) {
            toastSms(res, false, "Fatal error")
        }
    }

    
    /**
        *  @function getfile()
        *  @param _ 
        *  @param res 
        * 
        * 
        */
    getfile = async (req, res) => {
        const { ticket } = req?.params

        try {
            const data = await Ticket.query()
                .select("tickets.*", "users.nom", "users.prenom", "files.nom as nomfile",
                    "agences.libelle as libelle_agence", "agences.localite as localite_agence")
                .join("affectations", "tickets.affectation_ref", "affectations.id")
                .join("agences", "agences.code", "affectations.agence_ref")
                .join("users", "users.matricule", "affectations.user_ref")
                .join("files", "files.ticket_ref", "tickets.code")
                .where({ "tickets.code": ticket })


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
     * fonction de recuperation d'un ticket
     * 
     */
    edit = async (req, res) => {
        try {
            const { ticket } = req?.params
            const data = await Ticket.query()
             .select("tickets.*", "users.nom", "users.prenom",
                    "agences.libelle as libelle_agence", "agences.localite as localite_agence","agences.code as code_agence")
                .select(Ticket.raw("array_agg(files.nom) as file"))
                .join("affectations", "tickets.affectation_ref", "affectations.id")
                .join("agences", "agences.code", "affectations.agence_ref")
                .join("users", "users.matricule", "affectations.user_ref")
                .join("files", "files.ticket_ref", "tickets.code")
                .where({ "tickets.code": ticket})
                .groupBy("tickets.code")
                .groupBy("users.nom")
                .groupBy("users.prenom")
                .groupBy("agences.libelle")
                .groupBy("agences.localite")
                .groupBy("agences.code")
                
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
     *  @function editNojoin()
     *  @param req 
     *  @param res 
     * fonction de recuperation d'un ticket
     * 
     */
    editNojoin = async (req, res) => {
        try {
            const { ticket } = req?.params
            const data = await Ticket.query()
             .select("tickets.*", "users.nom", "users.prenom",
                    "agences.libelle as libelle_agence", "agences.localite as localite_agence","agences.code as code_agence")
                .join("affectations", "tickets.affectation_ref", "affectations.id")
                .join("agences", "agences.code", "affectations.agence_ref")
                .join("users", "users.matricule", "affectations.user_ref")
                .where({ "tickets.code": ticket})
                
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
     * suppression d'un ticket
     * 
     */

    del = async (req, res) => {
        try {
            const { ticket } = req?.params
            const data = await Ticket.query().findOne({ "tickets.code": ticket })
            if (isValuePresent(data)) {
                const result = await Ticket.query()
                    .delete()
                    .where({ "code": ticket })

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
                getError(error, res)
            }
        }
    }
    /**
     *  @function update()
     *  @param req 
     *  @param res 
     * fonction de recuperation d'un ticket
     * 
     */

    update = async (req, res) => {
        const { ticket } = req?.params
        

        try {

            const data = await Ticket.query()
                .select("tickets.*", "users.nom", "users.prenom",
                    "agences.libelle as libelle_agence", "agences.localite as localite_agence",)
                .join("affectations", "tickets.affectation_ref", "affectations.id")
                .join("agences", "agences.code", "affectations.agence_ref")
                .join("users", "users.matricule", "affectations.user_ref")
                .where({ "tickets.code": ticket})

                

            if (isValuePresent(data)) {
                const result = await Ticket.query()
                    .patch(req?.body)
                    .where({ "code": ticket })

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


    upload = async (req, res) => {
        if (!req.file) {
            return res.status(400).send({ message: 'No file uploaded.' });
        }
        res.send({ message: `File uploaded successfully: ${req.file.filename}` });

    }
    /**
     *  @function showByUser()
     *  @param req 
     *  @param res 
     * recupere les tickets appartir d'un  utilisateur
     * 
     */

    showByUser = async (req, res) => {
        try {
            const { user } = req?.body
            const data = await Ticket.query()
                .select("tickets.*",
                    "users.matricule", "users.nom", "users.prenom", "users.role",
                    "incidents.code as code_incident", "incidents.type as type_incident",
                    "agences.code as code_agence", "agences.libelle as libelle_agence", "agences.localite as localite_agence"

                )
                .join("affectations", "tickets.affectation_ref", "affectations.id")
                .join("incidents", "tickets.incident_ref", "incidents.id")
                .join("users", "affectations.user_ref", "users.matricule")
                .join("agences", "affectations.agence_ref", "agences.code")
                .where({ "users.matricule": user })

            isValuePresent(data) ?
                toastSms(res, true, data) :
                toastSms(res, false, "Aucun element n'as été trouvée")

        } catch (error) {

            if (error) {
                this.erreur.getError(error, res)
            }
        }

    }
}

export default Tickets

