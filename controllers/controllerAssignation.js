import G_error from "../err/gestErrror.js"
import Assignation from "../models/assignation.js"
import isValuePresent from "../validate.js"
import { toastSms } from "../helpers/sendMassage.js"
import Ticket from "../models/ticket.js"

class Assignations {
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
            const { status, affectation_assign, ticket_ref } = req?.body
            const data = {
                status: status,
                affectation_assign: affectation_assign,
                ticket_ref: ticket_ref
            }

            const result = await Assignation.query()
                .insert(data)
            isValuePresent(result) ?
                result.id != 0 ?
                    toastSms(res, true, req?.body) :
                    toastSms(res, false, "Aucun ligne n'a été ajouté") :
                toastSms(res, false, "Erreur de sauvegarde")
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
    * affiche tous les données
    * "agences.code as code_agence","agences.libelle as libelle_agence","agences.localite as agence_localite"
    */
    show = async (req, res) => {
        try {
            const data = await Assignation.query()
                .select("assignations.*",
                    "users.matricule as matricule_assign", "users.nom as nom_assign", "users.prenom as prenom_assign",
                    "tickets.code as code_tic", "tickets.titre as titre_tic", "tickets.affectation_ref",
                    "tickets.status as status_tic",
                    "tickets.priorite", "tickets.description", "affectations.user_ref",
                    "agences.code as code_agence", "agences.libelle as libelle_agence", "agences.localite as agence_localite"
                )
                .join("users", "assignations.user_assign", "users.matricule")
                .join("tickets", "assignations.ticket_ref", "tickets.code")
                .join("affectations", "tickets.affectation_ref", "affectations.id")
                .join("agences", "affectations.agence_ref", "agences.code")

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
   *  @function showJoin()
   *  @param _   .select(Ticket.raw("array_agg(files.nom) as file"))
   *  @param res 
   */
    showassignejoin = async (_, res) => {
        try {
            const data = await Ticket.query()
                .select("tickets.*", "users.*",
                    "agences.libelle as libelle_agence", "agences.localite as localite_agence")
                .select(Ticket.raw("array_agg(DISTINCT files.nom) as file"))
                .select(Assignation.raw("array_agg(assignations.affectation_assign) as affectation"), Assignation.raw("array_agg(assignations.id) as idassign"))
                .join("assignations", "assignations.ticket_ref", "tickets.code")
                .join("files", "files.ticket_ref", "tickets.code")
                .join("affectations", "tickets.affectation_ref", "affectations.id")
                .join("users", "users.matricule", "affectations.user_ref")
                .join("agences", "agences.code", "affectations.agence_ref")
                .groupBy("tickets.code")
                .groupBy("users.matricule")
                .groupBy("agences.code")
                .where({ "tickets.status": 1, "joinfile": true })


            isValuePresent(data) ?
                toastSms(res, true, data) :
                toastSms(res, false, "Aucun element n'a été trouvé")
        } catch (error) {
            console.log("err", error);

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
                .select("tickets.*", "users.*",
                    "agences.libelle as libelle_agence", "agences.localite as localite_agence")
                .select(Assignation.raw("array_agg(assignations.affectation_assign) as affectation"), Assignation.raw("array_agg(assignations.id) as idassign"))
                .join("assignations", "assignations.ticket_ref", "tickets.code")
                .join("affectations", "tickets.affectation_ref", "affectations.id")
                .join("users", "users.matricule", "affectations.user_ref")
                .join("agences", "agences.code", "affectations.agence_ref")
                .groupBy("tickets.code")
                .groupBy("users.matricule")
                .groupBy("agences.code")
                .where({ "tickets.status": 1, "joinfile": false })

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
    *  affiche la ligne concerné
    */
    edit = async (req, res) => {
        try {
            const { assign } = req?.params

            const data = await Assignation.query()
                .select("assignations.*",
                    "users.matricule as matricule_assign", "users.nom as nom_assign", "users.prenom as prenom_assign",
                    "tickets.code as code_tic", "tickets.titre as titre_tic", "tickets.affectation_ref",
                    "tickets.status as status_tic",
                    "tickets.priorite", "tickets.description", "affectations.user_ref",
                    "agences.code as code_agence", "agences.libelle as libelle_agence", "agences.localite as agence_localite"
                )
                .join("users", "assignations.user_assign", "users.matricule")
                .join("tickets", "assignations.ticket_ref", "tickets.code")
                .join("affectations", "tickets.affectation_ref", "affectations.id")
                .join("agences", "affectations.agence_ref", "agences.code")
                .where({ "assignations.id": assign })
            isValuePresent(data) ?
                toastSms(res, true, data) :
                toastSms(res, false, "Aucun élément n'as été trouvé")

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
    *  supprime un enregistrement
    */
    del = async (req, res) => {
        try {
            const { assign } = req?.params
            const data = await Assignation.query()
                .select("assignations.*")
                .where({ "assignations.id": assign })
            if (isValuePresent(data)) {
                const result = await Assignation.query()
                    .delete()
                    .where({ "id": assign })
                isValuePresent(result) ?
                    result == 1 ?
                        toastSms(res, true, data) :
                        toastSms(res, false, "erreur de suppression") :
                    toastSms(res, false, "Fatal error")
            } else {
                toastSms(res, false, "Cette element n'existe pas a la base de donnée")
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
    *  mise a jour des données
    */
    update = async (req, res) => {
        try {
            const { assign } = req?.params

            const data = await Assignation.query()
                .select("assignations.*")
                .where({ "assignations.id": assign })
            if (isValuePresent(data)) {
                const result = await Assignation.query()
                    .patch(req?.body)
                    .where({ "id": assign })

                isValuePresent(result) ?
                    result == 1 ?
                        toastSms(res, true, data) :
                        toastSms(res, false, "Erreur de mise a jour") :
                    toastSms(res, false, "Fatal error")

            } else {
                toastSms(res, false, "Cette Assignation n'existe pas dans la base")
            }
        } catch (error) {
            if (error) {
                this.erreur.getError(error, res)
            }
            console.log(err);

        }
    }


}

export default Assignations