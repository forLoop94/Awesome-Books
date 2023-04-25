const displaySection = document.querySelector('[data-display]');
const addBtn = document.querySelector('button');
const title = document.querySelector('[data-title]');
const author = document.querySelector('[data-author]');
const list = document.querySelector('[data-list]');
const add = document.querySelector('[data-add]');
const contact = document.querySelector('[data-contact]');

const bookList = document.querySelector('[data-book-list]');
const addBook = document.querySelector('[data-add-book]');
const contactInfo = document.querySelector('[data-contact-info]');

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
    book.appendChild(removeBtn);
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

list.addEventListener('click', () => {
  bookList.style.display = 'flex';
  contactInfo.style.display = 'none';
  addBook.style.display = 'none';
});

add.addEventListener('click', () => {
  bookList.style.display = 'none';
  contactInfo.style.display = 'none';
  addBook.style.display = 'flex';
});

contact.addEventListener('click', () => {
  bookList.style.display = 'none';
  contactInfo.style.display = 'flex';
  addBook.style.display = 'none';
});

const dateTime = document.querySelector('.date');
const date = new Date();
const dateNow = date.toDateString();
const timeNow = date.toLocaleTimeString();
const finalDateTime = dateNow.concat(', ', timeNow);
dateTime.innerHTML = finalDateTime;