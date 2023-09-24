const grid = document.querySelector('.grid');
const myLibrary = [];

const sample = [{title: 'The Lord of the Rings', author: 'J. R. R. Tolkien', numOfPages: 1178, read: true}];
for (let book of sample) {
    addBookToLibrary(book);
}

function Book(title, author, numOfPages, read) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);

    const newBook = document.createElement('div');
    newBook.classList.add('book');
    for (let key in book) {
        let newAttribute;
        if (key == 'read') {
            newAttribute = document.createElement('button');
            newAttribute.classList.add(book[key] == true ? 'read-true' : 'read-false');
            newAttribute.textContent = book[key] == true ? 'Read' : 'Not Read';
            newAttribute.addEventListener('click', () => {
                if (newAttribute.textContent == 'Read') {
                    book.read = false;
                    newAttribute.textContent = 'Not Read';
                    newAttribute.classList.remove('read-true');
                    newAttribute.classList.add('read-false');
                } else {
                    book.read = true;
                    newAttribute.textContent = 'Read';
                    newAttribute.classList.remove('read-false');
                    newAttribute.classList.add('read-true');
                }
            });
        } else {
            newAttribute = document.createElement('div');
            newAttribute.classList.add(key);
            newAttribute.textContent = book[key];
        }
        newBook.appendChild(newAttribute);

    }
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Delete';
    newBook.appendChild(deleteButton);
    grid.appendChild(newBook);
    deleteButton.addEventListener('click', () => {
        grid.removeChild(newBook);
        myLibrary.splice(findIndexOfBook(book.title), 1);
    });
}

function findIndexOfBook(bookTitle) {
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].title == bookTitle) {
            return i;
        }
    }
    return -1;
}

function checkDuplicateBook(bookTitle) {
    for (let element of myLibrary) {
        if (element.title == bookTitle)  {
            console.log('we in');
            return true;
        }
    };
    return false;
}

function addErrorDiv(title) {
    let errorDiv = form.querySelector('.error-div');
    if (checkDuplicateBook(title)) {
        if (!errorDiv) {
            let errorDiv = document.createElement('div');
            errorDiv.classList.add('error-div');
            errorDiv.textContent = 'This book is already in the library';
            form.querySelector('.title-div').appendChild(errorDiv);
        }
        return true;
    }
    return false;
}

function deleteErrorDiv() {
    let errorDiv = form.querySelector('.error-div');
    if (errorDiv) {
        form.querySelector('.title-div').removeChild(errorDiv);
    }
}

const newButton = document.querySelector('.new-button');
const dialog = document.getElementById('new-dialog');
const form = dialog.querySelector('.dialog-form');
const dialogCancelButton = document.getElementById('cancel');
const dialogSubmitButton = document.getElementById('submit');

const searchButton = document.querySelector('.search-button');
const deleteAllButton = document.querySelector('.delete-all-button');

dialog.addEventListener('click', () => dialog.close());
form.addEventListener('click', (e) => e.stopPropagation());

newButton.addEventListener('click', () => {
    deleteErrorDiv();
    form.reset();
    dialog.showModal();
});

dialogCancelButton.addEventListener('click', () => {
    dialog.close();
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    if (addErrorDiv(title)) {
        console.log('success');
        return;
    } 
    const author = document.getElementById('author').value;
    const numOfPages = document.getElementById('numOfPages').value;
    const read = document.getElementById('read').value == "Read" ? true : false;
    addBookToLibrary(new Book(title, author, numOfPages, read));
    dialog.close();
});

let dialogReadButton = dialog.querySelector('.read-button');
dialogReadButton.addEventListener('click', () => {
    console.log(dialogReadButton.value);
    if (dialogReadButton.value == 'Read') {
        dialogReadButton.value = 'Not Read';
        dialogReadButton.classList.remove('read-true');
        dialogReadButton.classList.add('read-false')
    } else {
        dialogReadButton.value = 'Read';
        dialogReadButton.classList.remove('read-false');
        dialogReadButton.classList.add('read-true')
    }
});

deleteAllButton.addEventListener('click', () => {
    while (grid.firstChild) {
        if (grid.lastChild.firstChild) {
            myLibrary.splice(findIndexOfBook(grid.lastChild.firstChild.textContent), 1);
        }
        grid.removeChild(grid.lastChild);
    }
});