export async function up(knex) {
  return knex.schema.createTable('dates', (table) => {
    table.increments('id').primary() // Primary key
    table
      .string('book_id')
      .references('book_id')
      .inTable('books')
      .onDelete('CASCADE')
    table.string('start_date').nullable()
    table.string('end_date').nullable()
    table.timestamps(true, true)
  })
}

export async function down(knex) {
  return knex.schema.dropTable('dates')
}
