/**
 * TODO: 
 * - Add style so that when form is open everything else if blur.
 * - Add functionality where when you're in form, if you click anywhere else other 
 *   than form it closes form.
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
    // document.querySelector('.dim').classList.remove('not-visible');
    const dim = document.querySelector('.dim');
    dim.classList.remove('not-visible');

    dim.addEventListener('click', (e) => {
        if(e.target === dim){
            form.reset();
            form.classList.add('not-visible');
            dim.classList.add('not-visible');
        }
    })
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

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const page = document.querySelector('#page').value;
    const read = document.querySelector('#read');
    const readValue = read.value;
    makeNewBook(title, author, page, readValue);

    read.value = 'off';
    form.classList.add('not-visible');
    document.querySelector('.dim').classList.add('not-visible');
});

document.addEventListener('change', (e) => {
    if (e.target.classList.contains('toggle')) {
        const checkbox = e.target;
        if (checkbox.value === 'off') {
            checkbox.value = 'on';
        } else {
            checkbox.value = 'off';
        }
        // alert(checkbox.value);
    }
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

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read
}

function makeNewBook(title, author, page, readValue){
    const newBook = new Book(title, author, page, readValue);
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
    if(newBook.read === 'on'){
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

/******************************************* Below the legacy code ********************************************/

// document.addEventListener('click', (e) => {
//     let bookChangeStatus = e.target.closest('.book');

//     if (e.target.classList.contains('not-read') || e.target.classList.contains('read')) {
//         let readButton = bookChangeStatus.querySelector('.read-status');
//         const readCheckbox = bookChangeStatus.querySelector('.toggle');
        
//         // Toggle the checkbox value and update the read status accordingly
//         if (readCheckbox.value === 'off') {
//             readCheckbox.value = 'on';
//             readButton.textContent = 'Read!';
//         } else {
//             readCheckbox.value = 'off';
//             readButton.textContent = 'Not Read...';
//         }
//     }
// });;