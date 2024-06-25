export async function seed(knex) {
  // Deletes ALL existing entries
  //   await knex('books').del()

  // Inserts seed entries
  await knex('books').insert([
    {
      username: 'Sonia',
      book_id: 'abc',
      title: 'Fourth Wing',
      author: 'Rebecca Yarros',
      image:
        'http://books.google.com/books/content?id=E-OLEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      start_date: '12 May 2023',
      end_date: '16 May 2023',
      review: true,
      rating: true,
    },
    {
      username: 'Sonia',
      book_id: 'abcd1234',
      title: 'Tomorrow, and Tomorrow, and Tomorrow',
      author: 'Gabrielle Zevin',
      image:
        'http://books.google.com/books/content?id=pLpHEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
      review: true,
      rating: true,
    },
    {
      username: 'Sonia',
      book_id: '1234',
      title: 'Legend',
      image:
        'http://books.google.com/books/content?id=Wzuy7A522B4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      author: 'Marie Lu',
      review: true,
      rating: true,
    },
    {
      username: 'Sonia',
      book_id: 'newbook',
      title: 'newbook',
      image: '',
      author: 'newbook',
      review: false,
      rating: false,
    },
    {
      username: 'Sonia',
      book_id: 'test',
      title: 'test',
      image: '',
      author: 'test',
      review: false,
      rating: false,
    },
  ])
}
