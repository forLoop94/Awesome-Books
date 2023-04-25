const displaySection = document.querySelector('[data-display]');
const addBtn = document.querySelector('button');
const title = document.querySelector('[data-title]');
const author = document.querySelector('[data-author]');

class NewBook {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class Book {
  constructor() {
    this.bookCollection = [];
    this.getBooksFromLocalStorage();
  }

  addBook(title, author) {
    const newBook = new NewBook(title, author);
    this.bookCollection = this.bookCollection.concat(newBook);
    localStorage.setItem('books', JSON.stringify(this.bookCollection));
  }

  removeBook(i) {
    this.bookCollection.splice(i, 1);
    localStorage.setItem('books', JSON.stringify(this.bookCollection));
  }

  getBooksFromLocalStorage() {
    const books = localStorage.getItem('books');
    const allBooks = JSON.parse(books);
    if (books) {
      this.bookCollection = allBooks;
    }
  }
}

const newBooks = new Book();

const display = () => {
  const { bookCollection } = newBooks;
  displaySection.innerHTML = '';
  for (let i = 0; i < bookCollection.length; i += 1) {
    const book = document.createElement('article');
    const bookDetails = bookCollection[i];
    book.className = 'displayed-book';
    if (i % 2 !== 0) {
      book.classList.add('light-background');
    }
    book.innerHTML = `<div>${bookDetails.title} by ${bookDetails.author}</div>`;
    const removeBtn = document.createElement('button');
    removeBtn.innerHTML = 'Remove';
    removeBtn.className = 'remove';
    removeBtn.addEventListener('click', () => {
      newBooks.removeBook(i);
      display();
    });
    // const divider = document.createElement("hr");
    book.appendChild(removeBtn);
    // book.appendChild(divider);
    displaySection.appendChild(book);
  }
};

display();

addBtn.addEventListener('click', () => {
  const bookTitle = title.value;
  const bookAuthor = author.value;
  if (bookTitle !== '' && bookAuthor !== '') {
    newBooks.addBook(bookTitle, bookAuthor);
  }
  display();
  title.value = '';
  author.value = '';
});
