import { Model } from 'objection'

class Resolution extends Model {

    static get tableName() {
        return 'resolutions';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['commentaire','ticket_ref','affectation_ref'], 
            properties: {
                commentaire:{type:"string",maxLength: 255},
                ticket_ref:{type:"string",maxLength: 255},
                affectation_ref:{type:"integer"}
            }
        }
    }
}
export default Resolution