/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {

    return knex.schema.createTable("resolutions", (table) => {
        table.increments()
        table.string("commentaire")
        table.string("ticket_ref")
        table.foreign("ticket_ref").references("code").inTable("tickets").deferrable("deferred")
        table.integer("affectation_ref")
        table.foreign("affectation_ref").references("id").inTable("affectations").deferrable("deferred")
        table.timestamps(true,true)

    })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists("resolutions")
};
