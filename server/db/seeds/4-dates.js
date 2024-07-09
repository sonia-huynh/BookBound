export async function seed(knex) {
  // Deletes ALL existing entries
  // await knex('reviews').del()

  // Inserts seed entries
  await knex('dates').insert([
    {
      book_id: 'FourthWing',
      start_date: '2024-07-03',
      end_date: '2024-07-08',
    },
    {
      book_id: 'TomorrowTomorrowTomorrow',
      start_date: '',
      end_date: '',
    },
  ])
}
