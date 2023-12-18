
const myLibrary = [];

function Book() {}

function createBook(title, author, pageNum, isRead, id) {
    let newBook = Object.create(Book.prototype);
    return newBook.init(title, author, pageNum, isRead, id);
}

function addBookToLibrary() {
    let newBook = createBook('title', 'author', 'pageNum', true, myLibrary.length);
    myLibrary.push(newBook);

    let card = document.createElement('section');
    let bookContainer = document.querySelector('.books-display');
    card.setAttribute('data-id', newBook.id);
    card.textContent = 'I am book ' + newBook.id + ' ';
    card.textContent += book.info();

    let deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('type', 'button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        removeBookFromLibrary(newBook.id);
    });

    bookContainer.appendChild(card);
    // DO NOT NEED TO UPDATE BOOK INDICES
}

function removeBookFromLibrary(id) {
    myLibrary.splice(id, 1);
    let bookContainer = document.querySelector('.books-display');
    let bookToRemove = bookContainer.querySelector(`[data-id]="${id}"`);

    bookContainer.remove(bookToRemove);
    updateBookIndices();
}

function clearBookDisplay(bookContainer) {
    let cardsList = document.querySelectorAll('.books-display > section');
    if (cardsList.length === 0) {
        return;
    }

    while (bookContainer.firstChild) {
        bookContainer.removeChild(grid.lastChild);
    }
}

function updateBookIndices() {
    myLibrary.forEach((book, i) => {
        book.id = i;
    })
}

function displayBooks() {
    myLibrary.forEach((book, i) => {
        let card = document.createElement('section');
        let bookContainer = document.querySelector('.books-display');
        card.setAttribute('data-id', i);
        card.textContent = 'I am book ' + i + ' ';
        card.textContent += book.info();

        let deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('type', 'button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            removeBookFromLibrary(i);
        });

        bookContainer.appendChild(card);
        // create new element to hold book card
        // it is styled in css but html is structured here just by nesting children then controlling layout
        // create html examples or not needed since I know I can do it rather display and debug from here
    });
}

Book.prototype.init = function (title, author, pageNum, isRead, id) {
    this.title = title;
    this.author = author;
    this.pageNum = pageNum;
    this.isRead = isRead;
    this.id = id;
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

for (let i = 0; i < 21; i++) {
    addBookToLibrary();
}

displayBooks();
console.dir(myLibrary);