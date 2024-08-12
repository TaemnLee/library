// Default library array that will store books
const myLibrary = [];
const bookContainer = document.querySelector(".cardcontainer");

// Constructor containing the infos about the title, author, pages, and read status.
function Book(title, author, pages, readstatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readstat = readstatus;
    this.info = function () {
        return (this.title + " by " + this.author + ", " + this.pages + ", " + this.readstat);
    };
}

// This function includes the book object into the array
function addBookToLibrary(book) {
    myLibrary.push(book);
}

// Created some objects so that I can see how it looks like
const book1 = new Book ("Life of Pie", "Yann Martel", "234 pages", "read");
const book2 = new Book ("What is Justice", "Bernie Sanders", "234 pages", "not read yet");
const book3 = new Book ("Hamlet", "Shakespeare", "234 pages", "not read yet");


// Calling the function that pushes the objects into the array.
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);


// Loop through the library array and display as a card.
myLibrary.forEach(function(book) {
    const card = document.createElement("div");
    card.classList.add("card");

    const bookInfo = document.createElement("p");
    bookInfo.textContent = book.info();

    card.appendChild(bookInfo);
    bookContainer.appendChild(card);
});

/***************************************************************
*                       Modal section                          *
***************************************************************/

const addButton = document.getElementById("showDialog");
const addDialog = document.getElementById("addDialog");
const outputBox = document.querySelector("output");
const confirmBtn = addDialog.querySelector("#confirmBtn");
const cancelBtn = addDialog.querySelector("#cancelBtn");

// When Add button is clicked
addButton.addEventListener("click", () => {
    addDialog.showModal();
});

// When Confirm button is clicked
confirmBtn.addEventListener("click", (event) => {
    // Prevents from submitting the fake form
    // What it does visually is that it prevents from the added books from disappearing
    // O/w, this library would refresh and the added books will disappear
    event.preventDefault();

    // This line of code will prevent the modal from keep staying opened after clicking the confirm button
    addDialog.close();

    // Get the values of the input from the modal
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const readStatus = document.querySelector("#readstatus").value;

    // Use the retrieved value as a parameter to dynamically add the books in library
    const dynamicBook = new Book (title, author, pages, readStatus);

    // Now, populate the elements so that we can display the added books
    const card = document.createElement("div");
    card.classList.add("card");

    const bookInfo = document.createElement("p");
    bookInfo.textContent = dynamicBook.info();

    card.appendChild(bookInfo);
    bookContainer.appendChild(card);
});

// When cancel button is clicked

cancelBtn.addEventListener("click", (event) => {
    // Again, prevents from submitting the fake form in default
    // This will stop the page to refreshing and getting rid of all the books in the library
    event.preventDefault();
    addDialog.close();
})
