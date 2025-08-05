/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {

   return knex.schema.createTable("assignations",(table) => {
        table.increments().primary()
        table.integer("status").defaultTo(0)
        table.integer("affectation_assign").notNullable()
        table.foreign("affectation_assign").references("id").inTable("affectations").onUpdate("cascade").onDelete("cascade")
        table.string("ticket_ref")
        table.foreign("ticket_ref").references("code").inTable("tickets").onUpdate("cascade").onDelete("cascade")

        table.timestamps(true,true)
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("assignations")

};
