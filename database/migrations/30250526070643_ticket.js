/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {

    return knex.schema.createTable("tickets", (table) => {
        table.increments().primary()
        table.string("code").notNullable().primary()
        .comment("le code du ticket sera generer dynamiquement par le systeme")
        table.string("titre").notNullable()
        table.integer("affectation_ref").notNullable()
        .comment("reference de l'auteur du ticket")
        table.foreign("affectation_ref").references("id").inTable("affectations").onUpdate("cascade").onDelete("cascade")
        table.string("incident").notNullable()
        .comment("3 type d'incident : materiel, reseaux et applicatif")
        table.string("libelle_incident")
        .comment("mac adresse si materiel ou type de pane reseau si reseau ou nom de l'application si applicatif")
        table.integer("status").notNullable().defaultTo(0)
        .comment("le status du ticket enumerera l'etat d'avancement de resolutions")
        table.string("priorite").notNullable()
        table.string("description")
        .comment("un bref decription pour bien illustré et etayer le probleme")
        table.boolean("joinfile").defaultTo(false).comment('determine si le ticket a été joigner avec un fichier')

        table.timestamps(true, true)
    })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists("tickets")
    
};
