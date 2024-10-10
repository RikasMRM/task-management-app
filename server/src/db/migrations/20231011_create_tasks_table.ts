import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  const tableExists = await knex.schema.hasTable("tasks");

  if (!tableExists) {
    return knex.schema.createTable("tasks", (table) => {
      table.increments("id").primary();
      table.string("title").notNullable();
      table.text("description");
      table.enu("priority", ["low", "medium", "high"]).notNullable();
      table.date("due_date").notNullable();
      table.timestamps(true, true);
    });
  } else {
    console.log('Table "tasks" already exists. Skipping creation.');
  }
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("tasks");
}
