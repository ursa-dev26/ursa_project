import { Model } from "objection";

class Incident extends Model {

      /**
     * @function  tableName() 
     * @return  nom de la table
     * 
     */
    static get tableName() {
        return 'incidents';
    }

      /**
     * @function  jsonSchema() 
     * @return  un schema de validation de donné pour chaque entré creer 
     * 
     */
    static get jsonSchema() {
        return {
            type: 'object',
            required: ["type","nom","description"] ,
            properties: {
                id:{type:"integer"} ,
                type:{type:"string",maxLength: 255} ,
                nom:{type:"string",maxLength: 255} ,
                description:{type:"string",maxLength: 255} ,
            }
        }

    }


}
export default Incident;