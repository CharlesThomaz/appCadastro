import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    return knex.schema.createTable('tbl_user', (table) => {
    table.increments('idUser').primary();
    table.string('nameUser').notNullable();
    table.string('emailUser').unique().notNullable();
  });



}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('tbl_user');
}

