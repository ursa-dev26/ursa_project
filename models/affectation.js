import { Model } from 'objection'

class Affectation extends Model {

    static get tableName() {
        return 'affectations';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['user_ref','agence_ref','fonction'], 
            properties: {
                user_ref:{type:"string"},
                agence_ref:{type:"string"},
                fonction:{type:"string",maxLength: 255}
            }
        }
    }
}
export default Affectation