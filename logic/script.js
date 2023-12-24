
let myLibrary = [];

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
    let dialog = document.querySelector('dialog');
    editBtn.setAttribute('type', 'button');
    editBtn.addEventListener('click', () => {
        dialog.showModal();
        document.getElementById('title').value = newBook.title;
        document.getElementById('author').value = newBook.author;
        document.getElementById('pageNum').value = newBook.pageNum;
        document.getElementById('isRead').value = newBook.isRead;
        document.getElementById('url').value = newBook.url;
        dialog.returnValue = card.getAttribute('data-id');
    });
    editBtn.textContent = 'Edit';

    deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    editBtn.innerHTML = '<i class="fa-solid fa-pencil"></i>';

    let title = document.createElement('h3');
    title.textContent = newBook.title;

    let readStatus = document.createElement('div');
    readStatus.textContent = (newBook.isRead === true ? 'Read' : 'Not Read');

    let pic = document.createElement('div');
    if (newBook.url){
        pic.textContent = '';
        pic.style.backgroundImage = `url('${newBook.url}')`;
    } else {
        pic.textContent = 'No Cover Added';
        pic.style.backgroundImage = `none`;
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

doneBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let doneModeDetected = dialog.returnValue == "" || typeof +dialog.returnValue !== "number";
    if (doneModeDetected) {
        dialog.returnValue = 'done';
    } // else dialog return value is already a card number of the card number and book id to be edited
    dialog.close();
});

addBtn.addEventListener('click', (e) => {
    clearForm();
    dialog.showModal();
    // TODO: Disable button on show of modal
});

dialog.addEventListener('close', (e) => {
    let titleInput = document.querySelector('.modal-content #title').value;
    let authorInput = document.querySelector('.modal-content #author').value;
    let pageNumInput = document.querySelector('.modal-content #pageNum').value;
    let isReadInput = document.querySelector('.modal-content #isRead').value;
    let urlInput = document.querySelector('.modal-content #url').value;

    if (dialog.returnValue === 'done') {
        let newBook = createBook(titleInput, authorInput, pageNumInput, isReadInput, myLibrary.length, urlInput);
        addBookToLibrary(newBook);
    } else if (typeof +dialog.returnValue === "number") {
        let bookID = +dialog.returnValue;
        let bookToEdit = myLibrary[bookID];

        bookToEdit.title = titleInput;
        bookToEdit.author = authorInput;
        bookToEdit.pageNum = pageNumInput;
        bookToEdit.isRead = isReadInput;
        bookToEdit.url = urlInput;

        let bookContainer = document.querySelector('.books-display');
        let cardToEdit = bookContainer.querySelector(`section[data-id="${bookID}"]`);
        // Found card with that id now edit
        // edit card and edit book with form information
        let title = cardToEdit.querySelector('h3.title');
        title.textContent = bookToEdit.title;
        // cardToEdit.querySelector('author').value;
        // cardToEdit.querySelector('pageNum').value;
        let readStatus = cardToEdit.querySelector('div.read-status');
        readStatus.textContent = (bookToEdit.isRead === true ? 'Read' : 'Not Read');

        let pic = cardToEdit.querySelector('div.pic');
        if (bookToEdit.url){
            pic.textContent = '';
            pic.style.backgroundImage = `url('${bookToEdit.url}')`;
        } else {
            pic.textContent = 'No Cover Added';
            pic.style.backgroundImage = `none`;
        }
        
        dialog.returnValue = "";
    }
});

let demoBtn = document.querySelector('.demo');
demoBtn.addEventListener('click', () => {
    demoLibrary = [
        createBook("Mistborn: The Final Empire", "Brandon Sanderson", 537, true, 0, "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1617768316i/68428.jpg"),
        createBook("A Game of Thrones", "George R. R. Martin", 801, false, 1, "https://www.dymocks.com.au/Pages/ImageHandler.ashx?q=9780006479888&w=&h=570"),
        createBook('The Outsiders', 'S. E. Hinton', 192, true, 2, 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1442129426i/231804.jpg'),
        createBook('The Handmaid\'s Tale', 'Margaret Atwood', 311, true, 3, 'https://m.media-amazon.com/images/I/71mfL5OGNNL._AC_UF894,1000_QL80_.jpg'),
        createBook('The Girl with All the Gifts', 'M. R. Carey', 460, true, 4, 'https://books.google.co.za/books/content?id=ujuYj2OiqfAC&pg=PP1&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U3a8P2DDXN3NTTlm60mDGkJKsAGGg&w=1280'),
        createBook('Bird Box', 'Josh Malerman', 270, false, 5, 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1570393096i/44646576.jpg'),
        createBook('The Paper Mache Man', 'Jesse Pullins', 63, false, 6, 'https://m.media-amazon.com/images/I/715rXjbxCLL._SY466_.jpg'),
        createBook('Annihilation', 'Jeff VandaMeer', 195, false, 7, 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1403941587i/17934530.jpg'),
        createBook('Legend', 'Marie Lu', 318, true, 8, 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1460224537i/29863662.jpg'),
        createBook('The Hunger Games', 'Suzanne Collins', 384, true, 9, 'https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/614SwlZNtJL._AC_UF1000,1000_QL80_.jpg'),
        createBook('The Power of Five: Raven\'s Gate', 'Anthony Horowitz', 304, true, 10, 'https://m.media-amazon.com/images/I/91wENOjV7RL._SY466_.jpg'),
        createBook('Firefight', 'Brandon Sanderson', 341, true, 11, 'https://www.wordsworth.co.za/cdn/shop/products/96740_611ed506724ed2.22620491_9781473217706_7d7a2125-8ef4-499f-a6d0-a75fcb764558_260x400.jpg?v=1676304524'),
        createBook('Uglies', 'Scott Westerfield', 432, true, 12, 'https://scottwesterfeld.com/wp/wp-content/uploads/2009/07/uglies1.jpg'),
        createBook('Infected', 'Scott Sigler', 342, false, 13, 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1439359012i/2331954.jpg'),
        createBook('The Institute', 'Stephen King', 561, false, 14, 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1549241208i/43798285.jpg'),
    ];

    for (let i = 0; i < demoLibrary.length; i++) {
        addBookToLibrary(demoLibrary[i]);
    }
});



/* Eleantris https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/81NENdDCAGL._AC_UF1000,1000_QL80_.jpg */