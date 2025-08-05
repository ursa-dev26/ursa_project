/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
    return knex.schema
        .createTable("users", (table) => {
            // schema de la table utilisateur
            table.increments().primary()
            table.string("matricule").unique().primary()
            table.string("nom").notNullable()
            table.string("prenom").notNullable()
            table.string("email").notNullable().unique()
            table.string("password").notNullable()
            table.date("date_naissance").notNullable()
            table.integer("role").defaultTo(0)
            table.string("telephone").defaultTo("00269")
           
            table.timestamps(true, true)

        })

     

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("users")

};
