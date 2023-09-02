/**
 * TODO: 
 * - Fix checkbox bug.
 * - Add style so that when form is open everything else if blur.
 * - Add functionality where when you're in form, if you click anywhere else other than form it closes form.
 */

const addBook = document.querySelector('.add');
const addSection = document.querySelector('.add-book');
const form = document.querySelector('form');
const bookContainer = document.querySelector('.book-container');
const title = document.querySelector('.title');
const author = document.querySelector('.author');
const pages = document.querySelector('.pages');
const read = document.querySelector('.not-read');
const readStatus = document.querySelector('.read-status');

let counter = 0; 
const library = [];

addBook.addEventListener('click', () => {
    addSection.classList.remove('not-visible');
    addSection.classList.add('visible');
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const page = document.querySelector('#page').value;
    const read = document.querySelector('#read').value;
    form.classList.add('not-visible');

    makeNewBook(title, author, page, read);
});

document.addEventListener('click', (e) => {
    let bookToRemove;
    if(e.target.classList.contains('remove')){
        bookToRemove = e.target.closest('.book');
    }

    if(bookToRemove){
        const bookIndex = library.findIndex(book => book.title === bookToRemove.querySelector('.title').textContent);
        if(bookIndex !== -1){
            library.splice(bookIndex, 1);
        }
    }

    bookToRemove.remove();
});

document.addEventListener('click', (e) => {
    let bookChangeStatus = e.target.closest('.book');

    if(e.target.classList.contains('not-read')){
        let readButton = bookChangeStatus.querySelector('.not-read');
        readButton.classList.remove('not-read');
        readButton.classList.add('read');
        readButton.textContent = "Read !";
    }else if(e.target.classList.contains('read')){
        let readButton = bookChangeStatus.querySelector('.read');
        readButton.classList.remove('read');
        readButton.classList.add('not-read');
        readButton.textContent = "Not Read...";
    }
});

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = function() {
        if(this.read === 'on'){
            read = true;
        }else{
            read = false;
        }
    }
}

function makeNewBook(title, author, page, read){
    const newBook = new Book(title, author, page, read);
    library.push(newBook);
    counter++;

    const book = document.createElement('div');
    book.classList.add('book');

    const titleElement = document.createElement('p');
    titleElement.classList.add('title');
    titleElement.textContent = `\" ${title} \"`;

    const authorElement = document.createElement('p');
    authorElement.classList.add('author');
    authorElement.textContent = author;

    const pageElement = document.createElement('p');
    pageElement.classList.add('pages');
    pageElement.textContent = `${page} pages`;

    const readElement = document.createElement('button');
    if(newBook.read === true){
        readElement.classList.add('btn', 'read', 'read-status');
        readElement.textContent = 'Read!'
    }else{
        readElement.classList.add('btn', 'not-read', 'read-status');
        readElement.textContent = 'Not Read...'
    }

    const removeElement = document.createElement('button');
    removeElement.classList.add('btn', 'remove');
    removeElement.textContent = "Remove"

    book.appendChild(titleElement);
    book.appendChild(authorElement);
    book.appendChild(pageElement);
    book.appendChild(readElement);
    book.appendChild(removeElement);

    bookContainer.appendChild(book);

    form.reset();
}
