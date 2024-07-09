export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('dates').del()
  await knex('reviews').del()
  await knex('ratings').del()
  await knex('books').del()
}
