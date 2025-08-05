import { Model } from "objection";

class FileModel extends Model {

    /** 
     * @function tableName()
     * un mettateur pour recuperer le nom de la table 
     */
    static get tableName() {
        return "files"
    }

    /**
     * @function jsonSchema()
     * @return  un schema de validation de donné pour chaque entré creer
     */
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['nom', 'extension', 'size', 'ticket_ref'],

            properties: {
                id: { type: 'integer', },
                nom: { type: 'string',maxLength: 255 },
                extension: { type: 'string' },
                size: { type: 'integer'},
                ticket_ref: { type: 'string' },
            }
        };
    }

}


export default FileModel