let myLibrary = [];
let newBook;

class Book {
    constructor(title, author, pages, read) {
        this.title = title.value;
        this.author = author.value;
        this.pages = pages.value + ' pages';
        this.read = read.checked;
    }
}

function modalPopup() {
    const submitBtn = document.querySelector('.submit-btn'),
        modal = document.querySelector('.modal'),
        overlay = document.querySelector('.overlay'),
        addBtn = document.querySelector('.addBtn');
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (validateInputs()) {
            overlay.style.display = 'none';
            modal.style.display = 'none';
            addBookToLibrary();
        }
    });

    addBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        clearErrorMessages();
        overlay.style.display = 'block';
    });
    overlay.addEventListener('click', () => {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    });
}

function validateInputs() {
    const title = document.getElementById('title');
    const author = document.getElementById('author');
    const pages = document.getElementById('pages');

    const emptyInputs = [];

    if (title.value.trim() === '') {
        emptyInputs.push(title);
    }

    if (author.value.trim() === '') {
        emptyInputs.push(author);
    }

    if (pages.value.trim() === '') {
        emptyInputs.push(pages);
    }

    if (emptyInputs.length > 0) {
        displayErrorMessages(emptyInputs);
        return false;
    }

    return true;
}

function displayErrorMessages(inputs) {
    const errorMessageClass = 'error';
    const existingErrorMessages = document.querySelectorAll(`.${errorMessageClass}`);
    existingErrorMessages.forEach((errorMessage) => {
        errorMessage.remove();
    });

    inputs.forEach((inputElement) => {
        const errorMessage = document.createElement('p');
        errorMessage.classList.add(errorMessageClass);
        errorMessage.textContent = 'Please fill in this field';

        inputElement.parentNode.insertBefore(errorMessage, inputElement.nextSibling);

        inputElement.classList.add('input-error');
    });
}

function clearErrorMessages() {
    const errorMessages = document.querySelectorAll('.error');
    errorMessages.forEach((errorMessage) => {
        errorMessage.remove();
    });
}


function addBookToLibrary() {
    newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    setData();
    render();
    restore();
}

function render() {
    const display = document.querySelector('.books-panel');
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => display.removeChild(card));

    for (let i = 0; i < myLibrary.length; i++) {
        createBook(myLibrary[i]);
    }
}

function createBook(item) {
    const booksPanel = document.querySelector('.books-panel');
    const cardBlock = document.createElement('div');
    const titleBlock = document.createElement('h3');
    const authorBlock = document.createElement('h5');
    const pagesBlock = document.createElement('p');
    const readBtn = document.createElement('button');
    const removeBtn = document.createElement('button');

    cardBlock.classList.add('card');
    cardBlock.setAttribute('id', myLibrary.indexOf(item));

    titleBlock.textContent = item.title;
    cardBlock.appendChild(titleBlock);

    authorBlock.textContent = item.author;
    cardBlock.appendChild(authorBlock);

    pagesBlock.textContent = item.pages;
    cardBlock.appendChild(pagesBlock);

    readBtn.classList.add('readBtn')
    cardBlock.appendChild(readBtn);
    if (item.read === false) {
        readBtn.textContent = 'Not Read';
        readBtn.style.backgroundColor = '#e04f63';
    } else {
        readBtn.textContent = 'Read';
        readBtn.style.backgroundColor = '#63da63'
    }

    removeBtn.textContent = 'Remove';
    removeBtn.setAttribute('id', 'removeBtn');
    cardBlock.appendChild(removeBtn);

    booksPanel.appendChild(cardBlock);

    removeBtn.addEventListener('click', () => {
        myLibrary.splice(myLibrary.indexOf(item), 1);
        setData();
        render();
    });

    readBtn.addEventListener('click', () => {
        item.read = !item.read;
        setData();
        render();
    });
}

function setData() {
    localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
}

function restore() {
    if (!localStorage.myLibrary) {
        render();
    } else {
        let objects = localStorage.getItem('myLibrary')
        objects = JSON.parse(objects);
        myLibrary = objects;
        render();
    }
}

restore();
modalPopup();