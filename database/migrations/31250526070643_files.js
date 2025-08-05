/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
      return knex.schema.createTable("files", (table) => {
        table.increments().primary()
        table.string("nom").notNullable().primary().unique()
        table.string("extension").notNullable()
        table.integer("size").notNullable()
        table.string("ticket_ref").notNullable()
        table.foreign("ticket_ref").references("code").inTable("tickets").onUpdate("cascade").onDelete("cascade")
        table.timestamps(true, true)
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("files")

  
};
