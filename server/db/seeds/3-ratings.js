export async function seed(knex) {
  // Deletes ALL existing entries
  // await knex('reviews').del()

  // Inserts seed entries
  await knex('ratings').insert([
    {
      book_id: 'abc',
      title: 'Fourth Wing',
      rating: 4,
    },
    {
      book_id: 'abcd1234',
      title: 'Tomorrow, and Tomorrow, and Tomorrow',
      rating: 4,
    },
    {
      book_id: '1234',
      title: 'Legend',
      rating: 5,
    },
  ])
}
