import knex from "knex";
import knexfile from "../knexfile.js"
import { Model } from "objection";

const getConfigDB=()=>{
    const db=knex(knexfile.development)
    Model.knex(db)
} 

export default getConfigDB