export async function up(knex) {
  return knex.schema.createTable('books', (table) => {
    table.increments('id').primary() // Primary key
    table.string('username')
    table.string('book_id').unique() // Unique book_id from Google Books API
    table.string('title')
    table.string('author')
    table.string('image')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('books')
}