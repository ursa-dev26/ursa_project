import { Model } from 'objection'

class Assignation extends Model {

    static get tableName() {
        return 'assignations';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['affectation_assign','ticket_ref'], 
            properties: {
                status:{type:"integer"},
                affectation_assign:{type:"integer"},
                ticket_ref:{type:"string",maxLength: 255},
            }
        }
    }


}
export default Assignation