
const myLibrary = [];

function Book() {}

function createBook(title, author, pageNum, isRead) {
    let newBook = Object.create(Book.prototype);
    return newBook.init(title, author, pageNum, isRead);
}

function addBookToLibrary() {
    let newBook = createBook();
    myLibrary.push(newBook);
}

function removeBookFromLibrary(id) {
    myLibrary.splice(id, 1);
}

function displayBooks() {
    myLibrary.forEach(book => {
        // create new element to hold book card
        // it is styled in css but html is structured here
    });
}

Book.prototype.init = function (title, author, pageNum, isRead) {
    this.title = title;
    this.author = author;
    this.pageNum = pageNum;
    this.isRead = isRead;
};

Book.prototype.read = function () {
    this.isRead = true;
};

Book.prototype.removeRead = function () {
    this.isRead = false;
};

Book.prototype.info = function () {
    let info = isRead ?
        `${this.title} by ${this.author}, ${this.pageNum}, read!` :
        `${this.title} by ${this.author}, ${this.pageNum}, not read yet`;
    return info;
};

addBookToLibrary();
console.dir(myLibrary);
removeBookFromLibrary(0);
console.dir(myLibrary);