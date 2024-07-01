export async function up(knex) {
  return knex.schema.createTable('bookshelves', (table) => {
    table.integer('id').primary()
    table.string('username')
    table.string('bookshelf')
    table.timestamps(true, true)
  })
}

export async function down(knex) {
  return knex.schema.dropTable('bookshelves')
}
