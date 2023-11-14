const myLibrary = [];
const addButton = document.getElementById("add-btn");
const bookDialog = document.getElementById("bookDialog");
const output = document.querySelector("output");
const confirmBtn = document.getElementById("confirmBtn");
const cancelBtn = document.getElementById("cancelBtn");
const table = document.querySelector(".main table");
const placeholder = new Book('Naruto', "Musashi Kishimoto", 100, true);
const placeholder2 = new Book('One Piece', "Oda", 100, true);
const placeholder3 = new Book('Bleach', "Kubo", 100, false);
myLibrary.push(placeholder, placeholder2, placeholder3);

updateTable();
remove();
updateStatus();

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function () {
        console.log(title + " by " + author + ", " + pages + " pages, " + read);
    }
}

function addBookToLibrary() {
    const title = document.getElementById('title')
    const author = document.getElementById('author');
    const pages = document.getElementById('pages');
    const status = document.getElementById('read');
    const read = checkStatus(status.value);
    const book = new Book(title.value, author.value, pages.value, read);
    myLibrary.push(book);
    clearInput();
}

function clearInput() {
    const title = document.getElementById('title')
    const author = document.getElementById('author');
    const pages = document.getElementById('pages');
    const status = document.getElementById('read');
    title.value = '';
    author.value = '';
    pages.value = '';
    status.value = 'read';
}

function updateStatus() {
    const selects = document.querySelectorAll(".main select")
    selects.forEach(select => {
        select.addEventListener("change", () => {
            myLibrary[select.dataset.index].read = checkStatus(select.value);
        })
    });
}
function updateTable() {
    const tbody = document.querySelector("tbody");
    tbody.textContent = '';

    for (let i = 0; i < myLibrary.length; i++) {
        const row = document.createElement('tr');
        const title = document.createElement('td');
        const author = document.createElement('td');
        const pages = document.createElement('td');
        const status = document.createElement('td');
        const close = document.createElement('td');

        title.textContent = myLibrary[i].title;
        author.textContent = myLibrary[i].author;
        pages.textContent = myLibrary[i].pages;

        const select = document.createElement('select');
        const option = document.createElement('option');
        const option2 = document.createElement('option');
        option.value = 'read';
        option.textContent = 'Read';
        option2.value = 'unread';
        option2.textContent = 'Unread';
        select.append(option);
        select.append(option2);
        status.append(select);
        select.dataset.index = i;

        select.value = setStatus(myLibrary[i].read);
        select.classList.add('read');

        const span = document.createElement('span');
        span.textContent = 'close';
        span.classList.add('material-symbols-outlined');
        span.classList.add('closeBtn');
        span.dataset.index = i;
        close.append(span);

        row.append(title);
        row.append(author);
        row.append(pages);
        row.append(status);
        row.append(close);
        row.dataset.index = i;
        tbody.append(row);
    }

}

function remove() {
    const removeBtns = document.querySelectorAll(".closeBtn");
    removeBtns.forEach(removeBtn => {
        removeBtn.addEventListener('click', (e) => {
            myLibrary.splice(e.target.dataset.index, 1);
            const query = "[data-index=\"" + e.target.dataset.index + "\" ]";
            const row = document.querySelector(query);
            row.remove();
        });
    });
}

function setStatus(read) {
    if (read) {
        return 'read';
    } else {
        return 'unread';
    }

}
function checkStatus(status) {
    return status == 'read';
}

addButton.addEventListener("click", () => {
    bookDialog.showModal();
});

cancelBtn.addEventListener("click", () => {
    clearInput();
});

confirmBtn.addEventListener("click", (event) => {
    event.preventDefault(); // We don't want to submit this fake form
    addBookToLibrary();
    updateTable();
    remove();
    updateStatus(); 
    bookDialog.close(); // Have to send the select box value here.
});