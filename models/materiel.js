import { Model } from 'objection'

class Materiel extends Model {

    /** 
  * @function tableName()
  * un mettateur pour recuperer le nom de la table 
  */
    static get tableName() {
        return 'materiels';
    }

    /**
   * @function jsonSchema()
   * @return  un schema de validation de donné pour chaque entré creer
   */
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['serial_number', 'libelle', 'date_mise_service', 'etat'],
            properties: {
                id: { type: 'integer', },
                adresse_mac: { type: 'string',maxLength: 255 },
                serial_number: { type: 'string',maxLength: 255 },
                libelle: { type: 'string',maxLength: 255 },
                date_mise_service: { type: 'string' },
                etat: { type: 'string',maxLength: 255  }
            }
        }

    }

}
export default Materiel