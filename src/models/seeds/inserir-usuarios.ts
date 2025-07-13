import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("tbl_user").del();

    // Inserts seed entries
    await knex("tbl_user").insert([
        { nameUser: "José Pereira", emailUser: "ze@email.com" },
        { nameUser: "Antônio Lombardi", emailUser: "tom@email.com" },
        { nameUser: "Anne Rosa", emailUser: "anne@email.com" }
    ]);
};
