const addBtn = document.querySelector('button');
const title = document.querySelector('[data-title]');
const author = document.querySelector('[data-author]');
const displaySection = document.querySelector('[data-display]');


const bookCollection = [];

const addBook = () => {
  const book = document.createElement('article');
  book.className = 'displayed-book';
  book.innerHTML = `<div>${title.value}</div><div>${author.value}</div><button class='remove'>Remove</button><hr>`;

  displaySection.appendChild(book);
  bookCollection.push(book);
  const removeBtns = document.querySelectorAll('.remove');
  removeBtns.forEach((button) => {
    button.addEventListener('click', () => {
      button.parentNode.remove();
    })
  })
}

addBtn.addEventListener('click', () => {
  addBook();
})
