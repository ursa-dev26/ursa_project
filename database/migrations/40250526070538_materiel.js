/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("materiels",(table)=>{
        table.increments().primary()
        table.string("adresse_mac").unique()
        table.string("serial_number").unique()
        table.string("libelle")
        table.date("date_mise_service").notNullable()
        table.string("etat").notNullable()
        table.timestamps(true,true)

    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("materiels")
  
};
