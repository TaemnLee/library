// Default library array that will store books
const myLibrary = [];
const bookContainer = document.querySelector(".cardcontainer");

// Global input variable
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readStatusInput = document.querySelector("#readstatus");

// Constructor containing the infos about the title, author, pages, and read status.
function Book(title, author, pages, readstatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readstatus = readstatus;
}

// Define the .info() and .isRead() function on the prototype object.
// Significantly better memory usage than putting into the constructor
Book.prototype.info = function() {
    return (this.title + " by " + this.author + ", " + this.pages + " pages");
}

Book.prototype.isRead = function() {
    return (this.readstatus ? "Read" : "Unread");
}

Book.prototype.toggleReadStatus = function() {
    this.readstatus = !this.readstatus;
}

// This function updates the placeholder text based on the existence of the books in the library
function updateMainText() {
    const mainText = document.querySelector(".emptyText");
    if (myLibrary.length === 0) {
        mainText.style.display = "block";
    } else {
        mainText.style.display = "none";
    }
}

// This function creates dynamic book object by calling the constructor
function addBookToLibrary() {
    // Get the values of the input from the modal
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    // This input has a type of "checkbox" so we use .checked instead of .value
    const readStatus = readStatusInput.checked;


    /*********************** Construct Book objects ************************/
    // Use the retrieved value as a parameter to dynamically add the books in library
    const dynamicBook = new Book (title, author, pages, readStatus);
    // Store the book object into the library array
    myLibrary.push(dynamicBook);
    updateMainText();

    /*********** DOM manipulation ************/
    // Now, populate the elements so that we can display the added books
    const card = document.createElement("div");
    card.classList.add("card");

    // Create p and button element
    const bookInfo = document.createElement("p");
    bookInfo.textContent = dynamicBook.info();
    const readBtn = document.createElement("button");
    readBtn.textContent = dynamicBook.isRead();
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.setAttribute("data-index", myLibrary.length-1);

    // When remove button is clicked
    removeBtn.addEventListener("click", function() {
        const index = this.getAttribute("data-index");
        myLibrary.splice(index, 1);
        bookContainer.removeChild(card);

        updateDataAttribute(index);
        updateMainText();
    });

    // When read/unread button is clicked
    readBtn.addEventListener("click", function() {
        // Change the read status of the book
        dynamicBook.toggleReadStatus();
        // Update the display accordingly to the status
        readBtn.textContent = dynamicBook.isRead();
    })

    // Now, append everything to display in the library
    card.appendChild(bookInfo);
    card.appendChild(readBtn);
    card.appendChild(removeBtn);
    bookContainer.appendChild(card);
}

// Function to update the index of remove button when one is removed from the array
function updateDataAttribute(startIndex) {
    const removeButtons = document.querySelectorAll("button[data-index]");
    for (let i = startIndex; i < removeButtons.length; i++) {
        removeButtons[i].setAttribute("data-index", i);
    };
};


/***************************************************************
*                       Modal section                          *
***************************************************************/

const addButton = document.getElementById("showDialog");
const addDialog = document.getElementById("addDialog");
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

    // Check the validity - need this to due to the preventDefault
    const form = document.querySelector("form");
    form.checkValidity()
        ? (addDialog.close(), addBookToLibrary(), clearInput())
        : form.reportValidity();
});

// When cancel button is clicked

cancelBtn.addEventListener("click", (event) => {
    // Again, prevents from submitting the fake form in default
    // This will stop the page to refreshing and getting rid of all the books in the library
    event.preventDefault();
    addDialog.close();
    clearInput();
})

// A function that clears up the input
function clearInput() {
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    readStatusInput.checked = false;
} 