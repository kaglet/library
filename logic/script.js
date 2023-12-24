
const myLibrary = [];

function Book() { }

function createBook(title, author, pageNum, isRead, id, url) {
    let newBook = Object.create(Book.prototype);
    return newBook.init(title, author, pageNum, isRead, id, url);
}

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);

    let card = document.createElement('section');
    let bookContainer = document.querySelector('.books-display');
    card.setAttribute('data-id', newBook.id);
    card.classList.add('card');

    let deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('type', 'button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        removeBookFromLibrary(card.getAttribute('data-id'));
    });

    let editBtn = document.createElement('button');
    editBtn.setAttribute('type', 'button');
    editBtn.addEventListener('click', () => {

    });
    editBtn.textContent = 'Edit';

    deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    editBtn.innerHTML = '<i class="fa-solid fa-pencil"></i>';

    let title = document.createElement('h3');
    title.textContent = newBook.title;

    let readStatus = document.createElement('div');
    readStatus.textContent = (newBook.isRead === true ? 'Read' : 'Not Read');

    let pic = document.createElement('div');
    if (url){
        pic.style.backgroundImage = `url('${newBook.url}')`;
    } else {
        pic.textContent = 'No Cover Added';
    }

    pic.classList.add('pic');
    editBtn.classList.add('edit');
    deleteBtn.classList.add('delete');
    title.classList.add('title');
    readStatus.classList.add('read-status');

    bookContainer.appendChild(card);

    card.appendChild(pic);
    card.appendChild(editBtn);
    card.appendChild(deleteBtn);
    card.appendChild(title);
    card.appendChild(readStatus);

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

function clearForm() {
    document.getElementById('title').value = "";
    document.getElementById('author').value = "";
    document.getElementById('pageNum').value = "";
    document.getElementById('isRead').checked = false;
    document.getElementById('url').value = "";
}

Book.prototype.init = function (title, author, pageNum, isRead, id, url) {
    this.title = title;
    this.author = author;
    this.pageNum = pageNum;
    this.isRead = isRead;
    this.id = id;
    this.url = url;
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

let doneBtn = document.querySelector('.done');
let cancelBtn = document.querySelector('.cancel');
let modal = document.querySelector('.modal');
let addBtn = document.querySelector('.add');
let dialog = document.querySelector('dialog');

cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // default return value setting won't occur with prevent default
    dialog.returnValue = 'cancel';
    dialog.close();
});

addBtn.addEventListener('click', (e) => {
    clearForm();
    dialog.showModal();
    // TODO: Disable button on show of modal
});

dialog.addEventListener('close', (e) => {
    switch (dialog.returnValue) {
        case 'done':
            let title = document.getElementById('title').value;
            let author = document.getElementById('author').value;
            let pageNum = document.getElementById('pageNum').value;
            let isRead = document.getElementById('isRead').value;
            let url = document.getElementById('url').value;
            let newBook = createBook(title, author, pageNum, isRead, myLibrary.length, url);
            addBookToLibrary(newBook);
            break;

        default:
            break;
    }
});

/* Eleantris https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/81NENdDCAGL._AC_UF1000,1000_QL80_.jpg */