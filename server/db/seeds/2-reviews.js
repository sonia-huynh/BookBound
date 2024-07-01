export async function seed(knex) {
  // Deletes ALL existing entries
  // await knex('reviews').del()

  // Inserts seed entries
  await knex('reviews').insert([
    {
      book_id: 'FourthWing',
      review: 'This book is so amazing blah blah blah',
    },
    {
      book_id: 'TomorrowTomorrowTomorrow',
      review: 'This book can only be read by tomorrow ofc',
    },
    {
      book_id: 'Legend',
      review: 'I am a legend nah nah nah',
    },
  ])
}
