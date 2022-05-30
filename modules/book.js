export class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  addBook = () => {
    bookList.push(this);
    localStorage.setItem("bookList", JSON.stringify(bookList));
  }

  removeBook = (bookContainer) => {
    bookContainer.remove();
    for (let i = 0; i < bookList.length; i += 1) {
      if (
        bookList[i].title === this.title &&
        bookList[i].author === this.author
      ) {
        bookList.splice(i, 1);
        localStorage.setItem("bookList", JSON.stringify(bookList));
      }
    }
  }

  addBookElement = () => {
    const bookListContainer = document.getElementById("book-list-container");
    const bookContainer = document.createElement("div");
    bookContainer.classList.add("book");
    {
      const bookDetails = document.createElement("h3");
      bookDetails.innerText = `"${this.title}" by ${this.author}`;
      bookContainer.appendChild(bookDetails);
      const removeBotton = document.createElement("button");
      removeBotton.type = "button";
      removeBotton.innerText = "Remove";
      removeBotton.addEventListener("click", () => {
        this.removeBook(bookContainer);
      });
      bookContainer.appendChild(removeBotton);
      const horizontalSeperator = document.createElement("hr");
      bookContainer.appendChild(horizontalSeperator);
    }
    bookListContainer.appendChild(bookContainer);
  }
}
