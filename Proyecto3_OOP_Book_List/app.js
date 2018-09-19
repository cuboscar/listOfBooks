//BookConstructor

function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}
// UI constructor
function UI() { }

UI.prototype.addBookToList = function (book) {
    const list = document.getElementById("book-list");
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>`;
    list.appendChild(row);
}
UI.prototype.showAlert = function (message, className) {
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

//Add deleteBook
UI.prototype.deleteBook = function (target) {
    if (target.className === "delete") {
        target.parentElement.parentElement.remove()
    }
}

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

        ui.addBookToList(book);
        ui.clearFields();
        ui.showAlert("Book successfully added", "success")
    }
    e.preventDefault();
}

//Add Clear Field using prototype 
UI.prototype.clearFields = function () {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
}

document.getElementById("book-list").addEventListener('click', function (e) {
    console.log("click");
    ui = new UI();
    ui.deleteBook(e.target);
    ui.showAlert("Book successfully removed", "success")
    e.preventDefault();
})