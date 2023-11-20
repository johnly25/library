class Library {
    constructor() {
        this.library = [];
    }
}

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info() {
        console.log(title + " by " + author + ", " + pages + " pages, " + read);
    }
}

class Display {
    constructor() {
        this.myLibrary = new Library();
    }

    setup() {
        const placeholder = new Book('Naruto', "Musashi Kishimoto", 100, true);
        const placeholder2 = new Book('One Piece', "Oda", 100, true);
        const placeholder3 = new Book('Bleach', "Kubo", 100, false);
        this.myLibrary.library.push(placeholder);
        this.myLibrary.library.push(placeholder2);
        this.myLibrary.library.push(placeholder3);
        this.updateScreen();
    }

    updateScreen() {
        const tbody = document.querySelector('tbody');
        tbody.textContent = "";
        for (let i = 0; i < this.myLibrary.library.length; i++) {
            const tr = document.createElement("tr");
            for (const key in this.myLibrary.library[i]) {
                let td = document.createElement('td');
                if (key == 'read') {
                    td = this.addSelect(td, this.myLibrary.library[i][key]);
                } else {
                    td.textContent = this.myLibrary.library[i][key];
                }
                tr.append(td);
            }
            let td = document.createElement('td');
            td = this.addRemove(td);
            tr.append(td);
            tbody.append(tr);
        }
    }

    addSelect(td, read) {
        const select = document.createElement('select');
        const option = document.createElement('option');
        const option2 = document.createElement('option');
        option.value = 'read';
        option.textContent = 'Read';
        option2.value = 'unread';
        option2.textContent = 'Unread';
        select.append(option);
        select.append(option2);
        select.classList.add('read');
        td.append(select);
        if (read) {
            select.value = 'read';
        } else {
            select.value = 'unread';
        }
        return td;
    }

    addRemove(td) {
        const span = document.createElement('span');
        span.textContent = 'close';
        span.classList.add('material-symbols-outlined');
        span.classList.add('closeBtn');
        //span.dataset.index = i;
        td.append(span);
        return td;
    }


    clearInput() {
        const title = document.getElementById('title')
        const author = document.getElementById('author');
        const pages = document.getElementById('pages');
        const status = document.getElementById('read');
        title.value = '';
        author.value = '';
        pages.value = '';
        status.value = 'read';
    }
}

const display = new Display();
const library = new Library();
display.setup();

