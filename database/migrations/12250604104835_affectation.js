/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("affectations", (table) => {
        table.increments().primary()
        table.string("user_ref").notNullable()
        table.foreign("user_ref").references("matricule").inTable("users").onUpdate("cascade").onDelete("cascade")
        table.string("agence_ref").notNullable()
        table.foreign("agence_ref").references("code").inTable("agences").onUpdate("cascade").onDelete("cascade")
        table.string("fonction")

        table.timestamps(true, true)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists("affectations")
};
