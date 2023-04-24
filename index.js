const addBtn = document.querySelector('button');
const title = document.querySelector('[data-title]');
const author = document.querySelector('[data-author]');
const displaySection = document.querySelector('[data-display]');

let bookCollection = [];

const books = localStorage.getItem('books');
const allBooks = JSON.parse(books);
if (books) {
  bookCollection = allBooks;
}

const addBook = (title, author) => {
  function Book(title, author) {
    this.title = title;
    this.author = author;
  }

  const newBook = new Book(title, author);

  bookCollection = bookCollection.concat(newBook);
  localStorage.setItem('books', JSON.stringify(bookCollection));
};

const removeBook = (i) => {
  bookCollection.splice(i, 1);
  localStorage.setItem('books', JSON.stringify(bookCollection));
};

const display = () => {
  displaySection.innerHTML = '';
  for (let i = 0; i < bookCollection.length; i += 1) {
    const book = document.createElement('article');
    book.className = 'displayed-book';
    const bookDetails = bookCollection[i];
    book.innerHTML = `<div>${bookDetails.title}</div><div>${bookDetails.author}</div>`;
    const removeBtn = document.createElement('button');
    removeBtn.innerHTML = 'remove';
    removeBtn.addEventListener('click', () => {
      removeBook(i);
      display();
    });
    const divider = document.createElement('hr')
    book.appendChild(removeBtn);
    book.appendChild(divider);
    displaySection.appendChild(book);
  }
};

addBtn.addEventListener('click', () => {
  const bookTitle = title.value;
  const bookAuthor = author.value;
  addBook(bookTitle, bookAuthor);
  display();
  title.value = '';
  author.value = '';
});

display();
