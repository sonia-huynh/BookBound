export async function seed(knex) {
  // Deletes ALL existing entries
  // await knex('reviews').del()

  // Inserts seed entries
  await knex('ratings').insert([
    {
      book_id: 'FourthWing',
      rating: 4,
    },
    {
      book_id: 'TomorrowTomorrowTomorrow',
      rating: 4,
    },
    {
      book_id: 'Legend',
      rating: 5,
    },
  ])
}
