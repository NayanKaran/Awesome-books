import bookList from './modules/booklist.js';
import Book from './modules/book.js';
import { DateTime } from './modules/luxon.js';

const form = document.getElementById('add-book-form');
const formBookTitle = form.querySelector('input[name="title"]');
const formBookAuthor = form.querySelector('input[name="author"]');

const displayDate = () => {
  const dt = DateTime.now();
  document.getElementById('time').innerHTML = `${dt.toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS)}`;
};
displayDate();
setInterval(displayDate, 1000);

form.addEventListener('submit', (event) => {
  const newBook = new Book(formBookTitle.value, formBookAuthor.value);
  newBook.addBook();
  newBook.addBookElement();
  formBookTitle.value = '';
  formBookAuthor.value = '';
  event.preventDefault();
});

if (bookList) {
  for (let i = 0; i < bookList.length; i += 1) {
    const newBook = new Book(bookList[i].title, bookList[i].author);
    newBook.addBookElement();
  }
}

const listLink = document.getElementById('list-link');
const addBookLink = document.getElementById('add-new-link');
const contactLink = document.getElementById('contact-link');
const bookSection = document.getElementById('books-section');
const formContainer = document.getElementById('form-container');
const contactPage = document.getElementById('contact-page');

listLink.addEventListener('click', () => {
  listLink.style.color = 'blue';
  addBookLink.style.color = 'black';
  contactLink.style.color = 'black';
  bookSection.style.display = 'flex';
  bookSection.style.flexDirection = 'column';
  formContainer.style.display = 'none';
  contactPage.style.display = 'none';
});

addBookLink.addEventListener('click', () => {
  listLink.style.color = 'black';
  addBookLink.style.color = 'blue';
  contactLink.style.color = 'black';
  formContainer.style.display = 'flex';
  formContainer.style.flexDirection = 'column';
  bookSection.style.display = 'none';
  contactPage.style.display = 'none';
});

contactLink.addEventListener('click', () => {
  listLink.style.color = 'black';
  addBookLink.style.color = 'black';
  contactLink.style.color = 'blue';
  contactPage.style.display = 'flex';
  contactPage.style.flexDirection = 'column';
  bookSection.style.display = 'none';
  formContainer.style.display = 'none';
});
