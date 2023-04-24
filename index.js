const addBtn = document.querySelector('button');
const title = document.querySelector('[data-title]');
const author = document.querySelector('[data-author]');
const displaySection = document.querySelector('[data-display]');
const inputFields = document.querySelectorAll('.input-field');

let bookCollection = [];

const books = localStorage.getItem('books')
const allBooks = JSON.parse(books);
if (books) {
  bookCollection = allBooks;
}

const addBook = (title, author) => {
  console.log(bookCollection)
  // const book = document.createElement('article');
  // book.className = 'displayed-book';
  // book.innerHTML = `<div>${title.value}</div><div>${author.value}</div><button class='remove'>Remove</button><hr>`;
  function book(title, author) {
    this.title = title
    this.author = author
  };

  const newBook = new book(title, author)

  // displaySection.appendChild(book);
  bookCollection.push(newBook);
  localStorage.setItem('books', JSON.stringify(bookCollection))
  // console.log(bookCollection);
  // const removeBtns = document.querySelectorAll('.remove');
  // removeBtns.forEach((button) => {
  //   button.addEventListener('click', () => {
  //     button.parentNode.remove();
  //   });
  // });
};

addBtn.addEventListener('click', () => {
  const bookTitle = title.value;
  console.log(bookTitle);
  const bookAuthor = author.value;
  addBook(bookTitle, bookAuthor);
  display();
  title.value = '';
  author.value = '';
});

const removeBook=(i)=>{
 bookCollection.splice(i, 1);
 localStorage.setItem("books", JSON.stringify(bookCollection));
 display();
} 

const display = () => {
  displaySection.innerHTML = "";
  for (let i = 0; i < bookCollection.length; i++) {
    const book = document.createElement('article');
    book.className = 'displayed-book';
    const bookDetails = bookCollection[i];
    book.innerHTML = `<div>${bookDetails.title}</div><div>${bookDetails.author}</div><button onClick={removeBook(${i})} class='remove'>Remove</button><hr>`;
    displaySection.appendChild(book);
   }
}
 display();

