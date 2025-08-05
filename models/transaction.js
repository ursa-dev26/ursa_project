import { Model } from 'objection'

class ModelTransaction extends Model {

    /** 
  * @function tableName()
  * un mettateur pour recuperer le nom de la table 
  */
    static get tableName() {
        return 'transactions';
    }

    /**
   * @function jsonSchema()
   * @return  un schema de validation de donné pour chaque entré creer
   */
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['qté', 'objet', 'agence_ref', 'materiel_ref'],
            properties: {
                id: { type: 'integer', },
                qté: { type: 'integer'},
                objet: { type: 'string',maxLength: 255 },
                agence_ref: { type: 'string',maxLength: 255 },
                materiel_ref: { type: 'integer' },
            }
        }

    }

}
export default ModelTransaction