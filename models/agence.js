import { Model } from "objection"; 

/**
 * @class Agence
 *  
 * model de class agence   
 */

class Agence extends Model {

    /**
     * @function tableName() 
     * @return la table agence
     * un getter pour recuperer la table  
     */

    static get tableName() {
        return "agences"
    } 


    /**
     * @function  jsonSchema() 
     * @return  un schema de validation de donné pour chaque entré creer 
     * 
     */

    static get jsonSchema(){
        return {
            type:"object",
            required:["code","libelle","localite"],
            properties:{
                id:{type:"integer"}, 
                code:{type: "string",maxLength: 255}, 
                libelle:{type: "string",maxLength: 255}, 
                localite:{type: "string",maxLength: 255}, 
            }  

        } 
    } 
} 

export default Agence