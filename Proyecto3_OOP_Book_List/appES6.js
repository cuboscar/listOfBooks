/**
 * 
 * Refactoring Book List App using ES6 Classes
 * 
 */
console.log("ES6 JS File");

//Class Book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//Class User Interface
class UI {
    addBookToList(book) {
        const list = document.getElementById("book-list");
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>`;
        list.appendChild(row);
    }
    showAlert(message, className) {
        //create DIV element
        const div = document.createElement('div')
        div.className = `alert ${className}`;
        div.innerText = message;
        //Get PArent to insert node
        const container = document.querySelector(".container");
        const form = document.querySelector("#book-form");
        container.insertBefore(div, form);
        //Delete Alert after 3secs
        setTimeout(function () {
            document.querySelector(".alert").remove();

        }, 3000);
    }
    deleteBook(target) {
        if (target.className === "delete") {
            target.parentElement.parentElement.remove()
        }
    }
    clearFields() {
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("isbn").value = "";
    }

}
// Local Storage Class
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
            console.log(typeof (books))
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static displayBooks() {
        const books = Store.getBooks();

        books.forEach(function (book) {
            const ui = new UI;

            // Add book to UI
            ui.addBookToList(book);
        });
    }

    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach(function (book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

//Event Handlers 

//Create Event Listener for submit 
const bookForm = document.getElementById("book-form")
bookForm.addEventListener('submit', handlerSubmit);
function handlerSubmit(e) {
    //Get values from HTML form
    e.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const isbn = document.getElementById("isbn").value;
    //Instantiate Object Book 
    const book = new Book(title, author, isbn);

    //Instantiate UI
    const ui = new UI();

    //console.log(title, author, isbn);
    if (title === "" || author === "" || isbn === "") {
        console.log("ERROR")
        ui.showAlert("Fields should not be empty", "error")
    } else {
        Store.addBook(book);
        ui.addBookToList(book);
        ui.clearFields();
        ui.showAlert("Book successfully added", "success")
    }
    e.preventDefault();
}

document.getElementById("book-list").addEventListener('click', function (e) {
    console.log("click");
    ui = new UI();
    Store.removeBook(e.target.parentElement.previousElementSibling.innerText);
    ui.deleteBook(e.target);

    //Store.removeBook(e.target);
    ui.showAlert("Book successfully removed", "success")
    e.preventDefault();
})
window.addEventListener("load", function (e) {
    Store.displayBooks()
})
