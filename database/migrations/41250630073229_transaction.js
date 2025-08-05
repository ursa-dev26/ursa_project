/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("transactions", (table) => {
        table.increments().primary()
        table.integer("qté").defaultTo(0)
        table.string("objet")
        table.string("agence_ref")
        table.foreign("agence_ref").references("code").inTable("agences").onUpdate("cascade").onDelete("cascade")
        table.integer("materiel_ref")
        table.foreign("materiel_ref").references("id").inTable("materiels").onUpdate("cascade").onDelete("cascade")
        table.timestamps(true, true)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists("transactions")

};
