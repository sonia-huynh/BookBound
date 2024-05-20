export async function up(knex) {
  return knex.schema.createTable('books', (table) => {
    table.integer('id').primary()
    table.string('username')
    table.string('book_id')
    table.string('title')
    table.string('author')
    table.string('image')
    table.string('review')
    table.integer('rating')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('books')
}
