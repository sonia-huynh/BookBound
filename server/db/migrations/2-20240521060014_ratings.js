export async function up(knex) {
  return knex.schema.createTable('ratings', (table) => {
    table.integer('id').primary()
    table.string('username')
    table
      .string('book_id')
      .references('book_id')
      .inTable('books')
      .onDelete('CASCADE')
    table.string('title')
    table.integer('rating')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('ratings')
}
