import { Model } from "objection";
import User from "./user.js";
import Agence from "./agence.js";

class Ticket extends Model {
    // Table name is the only required property.

    static get tableName() {
        return 'tickets';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ["code", "titre", "affectation_ref","incident", "libelle_incident"],
            properties: {
                id: { type: "integer" },
                code: { type: "string", maxLength: 255 },
                titre: { type: "string",  maxLength: 255 },
                affectation_ref: { type: "integer"},
                incident: { type: "string" },
                libelle_incident: { type: "string" },
                status: { type: "integer" },
                priorite: { type: "string",  maxLength: 255 },
                description: { type: "string", maxLength: 255 }
            }
        }

    }
    
}
export default Ticket