import { toastSms } from "../helpers/sendMassage.js"

class G_error {
    constructor() {

    }
    /**
     * @param  
     * @param 
     * gestion d'erreur 
     */
   getError(error,res) {
        error.name == "UniqueViolationError" ?
            toastSms(res, false,{message:"Cette enregistrement existe"} ) :
            error.name == "DataError" ?
                toastSms(res, false, "Verifier le type de donné a saisir") :
                error.name == "ValidationError"?
                    toastSms(res, false, "Veuillez renseigner tout les champs") :
                    error.name == "ConstraintViolationError" ?
                        toastSms(res, false, "Veuillez verifier les champs unique","ConstraintViolationError") :
                        error.name == "ReferenceError" ?
                            toastSms(res, false, "Erreur de reference. veuillez verifier") :
                            error.name == "DBError" ?
                                toastSms(res, false, "Erreur au niveau de la base de donnée") :
                                error.name =="ForeignKeyViolationError"?
                                toastSms(res, false, "La reference indiqué n'existe pas") :
                                error.name =="NotNullViolationError"?
                                toastSms(res, false, "Veuiller renseillez tous les clé etrangere") :
                                toastSms(res, false, "Fatal error")

    }


}
export default G_error
