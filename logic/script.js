
const myLibrary = [];

function Book() {}

function createBook(title, author, pageNum, isRead, id) {
    let newBook = Object.create(Book.prototype);
    return newBook.init(title, author, pageNum, isRead, id);
}

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);

    let card = document.createElement('section');
    let bookContainer = document.querySelector('.books-display');
    card.setAttribute('data-id', newBook.id);
    card.textContent += newBook.info();

    let deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('type', 'button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        removeBookFromLibrary(card.getAttribute('data-id'));
    });

    bookContainer.appendChild(card);
    card.appendChild(deleteBtn);
    // DO NOT NEED TO UPDATE BOOK INDICES
}

function removeBookFromLibrary(id) {
    myLibrary.splice(id, 1);
    let bookContainer = document.querySelector('.books-display');
    let bookToRemove = bookContainer.querySelector(`section[data-id="${id}"]`);

    bookContainer.removeChild(bookToRemove);
    updateBookIndices();
}

function updateBookIndices() {
    myLibrary.forEach((book, i) => {
        book.id = i;
    });
    let cards = document.querySelectorAll('[data-id]');
    cards.forEach((card, i) => {
        card.setAttribute('data-id', i);
    });
    
    // TODO: update indices visually optionally for debugging purposes or update with CSS counter
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
    let newBook = createBook('title', 'author', 'pageNum', true, myLibrary.length);
    addBookToLibrary(newBook);
}