const form = document.getElementById('add-book-form');
const formBookTitle = form.querySelector('input[name="title"]');
const formBookAuthor = form.querySelector('input[name="author"]');
const bookList = JSON.parse(localStorage.getItem('bookList')) || [];

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
      if (bookList[i].title === this.title && bookList[i].author === this.author) {
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
      const bookTitle = document.createElement('h3');
      bookTitle.innerText = this.title;
      bookContainer.appendChild(bookTitle);
      const bookAuthor = document.createElement('h3');
      bookAuthor.innerText = this.author;
      bookContainer.appendChild(bookAuthor);
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
