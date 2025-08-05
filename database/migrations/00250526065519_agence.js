/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("agences",(table)=>{
        table.increments().primary()
        table.string("code",5).unique().primary()
        table.string("libelle").notNullable()
        table.string("localite").notNullable()
        table.timestamps(true,true)
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

    return knex.schema.dropTableIfExists("agences")
  
};
