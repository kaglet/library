
const myLibrary = [];

function Book() {}

function createBook(title, author, pageNum, isRead) {
    let newBook = Object.create(Book.prototype);
    return newBook.init(title, author, pageNum, isRead);
}

function addBookToLibrary() {
    let newBook = createBook('title', 'author', 'pageNum', true);
    myLibrary.push(newBook);
}

function removeBookFromLibrary(id) {
    myLibrary.splice(id, 1);
}

function displayBooks() {
    myLibrary.forEach((book, i) => {
        let card = document.createElement('section');
        let bookContainer = document.querySelector('.books-display');
        card.setAttribute('data-id', i);
        card.textContent = 'I am book ' + i;
        card.textContent += book.info();

        bookContainer.appendChild(card);
        // create new element to hold book card
        // it is styled in css but html is structured here just by nesting children then controlling layout
        // create html examples or not needed since I know I can do it rather display and debug from here
    });
}

Book.prototype.init = function (title, author, pageNum, isRead) {
    this.title = title;
    this.author = author;
    this.pageNum = pageNum;
    this.isRead = isRead;
    return this;
};

Book.prototype.read = function () {
    this.isRead = true;
};

Book.prototype.removeRead = function () {
    this.isRead = false;
};

Book.prototype.info = function () {
    let info = this.isRead ?
        `${this.title} by ${this.author}, ${this.pageNum}, read!` :
        `${this.title} by ${this.author}, ${this.pageNum}, not read yet`;
    return info;
};

addBookToLibrary();
addBookToLibrary();
addBookToLibrary();
addBookToLibrary();
addBookToLibrary();
addBookToLibrary();
addBookToLibrary();
addBookToLibrary();
addBookToLibrary();
addBookToLibrary();
addBookToLibrary();
addBookToLibrary();
addBookToLibrary();
addBookToLibrary();
addBookToLibrary();
addBookToLibrary();
addBookToLibrary();
addBookToLibrary();
addBookToLibrary();
addBookToLibrary();
displayBooks();
console.dir(myLibrary);