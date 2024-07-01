export async function up(knex) {
  return knex.schema.createTable('reviews', (table) => {
    table.increments('id').primary() // Primary key
    table
      .string('book_id')
      .references('book_id')
      .inTable('books')
      .onDelete('CASCADE')
    table.string('username')
    table.text('review')
    table.timestamps(true, true)
  })
}

export async function down(knex) {
  return knex.schema.dropTable('reviews')
}
