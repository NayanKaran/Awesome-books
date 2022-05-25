const form = document.getElementById('add-book-form');
const formBookTitle = form.querySelector('input[name="title"]');
const formBookAuthor = form.querySelector('input[name="author"]');
const bookList = JSON.parse(localStorage.getItem('bookList')) || [];

const displayDate = () => {
  const date = new Date();
  const options = {
    weekday: undefined,
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const [month, time] = [
    date.toLocaleDateString(undefined, options),
    date.toLocaleTimeString().toLocaleLowerCase(),
  ];
  document.getElementById('time').innerHTML = `${month}, ${time}`;
};
displayDate();
setInterval(displayDate, 1000);

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  addBook() {
    bookList.push(this);
    localStorage.setItem('bookList', JSON.stringify(bookList));
  }

  removeBook(bookContainer) {
    bookContainer.remove();
    for (let i = 0; i < bookList.length; i += 1) {
      if (
        bookList[i].title === this.title
        && bookList[i].author === this.author
      ) {
        bookList.splice(i, 1);
        localStorage.setItem('bookList', JSON.stringify(bookList));
      }
    }
  }

  addBookElement() {
    const bookListContainer = document.getElementById('book-list-container');
    const bookContainer = document.createElement('div');
    bookContainer.classList.add('book');
    {
      const bookDetails = document.createElement('h3');
      bookDetails.innerText = `"${this.title}" by ${this.author}`;
      bookContainer.appendChild(bookDetails);
      const removeBotton = document.createElement('button');
      removeBotton.type = 'button';
      removeBotton.innerText = 'Remove';
      removeBotton.addEventListener('click', () => {
        this.removeBook(bookContainer);
      });
      bookContainer.appendChild(removeBotton);
      const horizontalSeperator = document.createElement('hr');
      bookContainer.appendChild(horizontalSeperator);
    }
    bookListContainer.appendChild(bookContainer);
  }
}

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
