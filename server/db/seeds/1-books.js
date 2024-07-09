export async function seed(knex) {
  // Deletes ALL existing entries
  //   await knex('books').del()

  // Inserts seed entries
  await knex('books').insert([
    {
      username: 'Sonia',
      book_id: 'FourthWing',
      title: 'Fourth Wing',
      author: 'Rebecca Yarros',
      image:
        'http://books.google.com/books/content?id=E-OLEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      review_exist: true,
      rating_exist: true,
    },
    {
      username: 'Sonia',
      book_id: 'TomorrowTomorrowTomorrow',
      title: 'Tomorrow, and Tomorrow, and Tomorrow',
      author: 'Gabrielle Zevin',
      image:
        'http://books.google.com/books/content?id=pLpHEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
      review_exist: true,
      rating_exist: true,
    },
    {
      username: 'Sonia',
      book_id: 'Legend',
      title: 'Legend',
      image:
        'http://books.google.com/books/content?id=Wzuy7A522B4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      author: 'Marie Lu',
      review_exist: true,
      rating_exist: true,
    },
  ])
}
