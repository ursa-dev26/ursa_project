
import { Model } from "objection";

class User extends Model {

    /** 
     * @function tableName()
     * un mettateur pour recuperer le nom de la table 
     */
    static get tableName() {
        return "users"
    }

    /**
     * @function jsonSchema()
     * @return  un schema de validation de donné pour chaque entré creer
     */
    static get jsonSchema() {
    
        return {
            type: 'object',
            required: ['matricule', 'nom', 'prenom', 'date_naissance','telephone'],
            properties: {
                id: { type: 'integer', },
                matricule: { type: 'string', maxLength: 255 },
                nom: { type: 'string',maxLength: 255 },
                prenom: { type: 'string',maxLength: 255 },
                email: { type: 'string',maxLength: 255 },
                password: { type: 'string',maxLength: 255 },
                date_naissance: { type: 'string' },
                role:{type: "integer"} ,
                telephone:{type: 'string'} 

                
            }
        };
    }

}


export default User