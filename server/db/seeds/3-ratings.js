export async function seed(knex) {
  // Deletes ALL existing entries
  // await knex('reviews').del()

  // Inserts seed entries
  await knex('ratings').insert([
    {
      book_id: 'abc',
      rating: 4,
    },
    {
      book_id: 'abcd1234',
      rating: 4,
    },
    {
      book_id: '1234',
      rating: 5,
    },
  ])
}
