export async function up(knex) {
  return knex.schema.createTable('books', (table) => {
    table.increments('id').primary() // Primary key
    table.string('username')
    table.string('book_id').unique() // Unique book_id from Google Books API
    table.string('title')
    table.string('author')
    table.string('image')
    table.string('description')
    table.string('start_date')
    table.string('end_date')
    table.boolean('review_exist').defaultTo(false)
    table.boolean('rating_exist').defaultTo(false)
    table.timestamps(true, true)
  })
}

export async function down(knex) {
  return knex.schema.dropTable('books')
}
