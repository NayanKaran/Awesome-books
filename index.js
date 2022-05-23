let bookList = JSON.parse(localStorage.getItem('bookList'));

function removeBook(title, element) {
  element.remove();
  for (let i = 0; i < bookList.length; i += 1) {
    if (bookList[i].title === title) {
      bookList.splice(i);
      localStorage.setItem('bookList', JSON.stringify(bookList));
    }
  }
}

function addBookElement(title, author) {
  const bookListContainer = document.getElementById('book-list-container');
  const bookContainer = document.createElement('div');
  {
    const bookTitle = document.createElement('h3');
    bookTitle.innerText = title;
    bookContainer.appendChild(bookTitle);
    const bookAuthor = document.createElement('h3');
    bookAuthor.innerText = author;
    bookContainer.appendChild(bookAuthor);
    const removeBotton = document.createElement('button');
    removeBotton.type = 'button';
    removeBotton.innerText = 'Remove';
    removeBotton.addEventListener('click', () => {
      removeBook(title, bookContainer);
    });
    bookContainer.appendChild(removeBotton);
    const horizontalSeperator = document.createElement('hr');
    bookContainer.appendChild(horizontalSeperator);
  }
  bookListContainer.appendChild(bookContainer);
}

function addBook(title, author) {
  bookList.push({
    title,
    author,
  });
  localStorage.setItem('bookList', JSON.stringify(bookList));
  addBookElement(title, author);
}

if (bookList) {
  for (let i = 0; i < bookList.length; i += 1) {
    addBookElement(bookList[i].title, bookList[i].author);
  }
} else {
  bookList = [];
}

const form = document.getElementById('add-book-form');
const formBookTitle = form.querySelector('input[name="title"]');
const formBookAuthor = form.querySelector('input[name="author"]');

form.addEventListener('submit', (event) => {
  addBook(formBookTitle.value, formBookAuthor.value);
  formBookTitle.value = '';
  formBookAuthor.value = '';
  event.preventDefault();
});
