"use strict";
let header = document.querySelector("header");
let main = document.querySelector("main");
let form = document.querySelector("form");
let bookButton = document.querySelector(".newBook");
let formButton = document.querySelector(".form-submit");
let library = [];
function Book(title, author, pages, read) {
    this.title = `"${title}"`;
    this.author = `by ${author}`;
    this.pages = `${pages} pages`;
    this.read = read;
}
Book.prototype.info = function () {
    `${this.title}, by ${this.author}, ${this.pages} pages, ${this.read}.`;
};
const addBookToLibrary = (title, author, pages, read) => {
    library.push(new Book(title, author, pages, read));
};
function hasKey(obj, key) {
    return key in obj;
}
const createCards = () => {
    main === null || main === void 0 ? void 0 : main.replaceChildren();
    for (let i = 0; i < library.length; i++) {
        let book = library[i];
        const card = document.createElement("div");
        card.classList.add("card");
        const key = Object.keys(book);
        for (let i = 0; i < key.length; i++) {
            let property = key[i];
            if (hasKey(book, property)) {
                if (property !== "read") {
                    const p = document.createElement("p");
                    p.textContent = `${book[property]}`;
                    card.appendChild(p);
                }
                else {
                    const button = document.createElement("button");
                    button.classList.add("read-button");
                    button.textContent = `${book[property]}`;
                    button.addEventListener("click", changeReadStatus);
                    card.appendChild(button);
                }
            }
        }
        const removeButton = document.createElement("button");
        removeButton.classList.add("remove-button");
        removeButton.textContent = "Remove";
        card.appendChild(removeButton);
        card.setAttribute("data-index", `${i}`);
        main === null || main === void 0 ? void 0 : main.appendChild(card);
        removeButton.addEventListener("click", removeBookFromLibrary);
    }
};
const showForm = () => {
    const removeButtons = document.querySelectorAll(".remove-button");
    const readButtons = document.querySelectorAll(".read-button");
    form === null || form === void 0 ? void 0 : form.classList.remove("invisible");
    main === null || main === void 0 ? void 0 : main.classList.add("blur");
    header === null || header === void 0 ? void 0 : header.classList.add("blur");
    bookButton === null || bookButton === void 0 ? void 0 : bookButton.removeEventListener("click", showForm);
    removeButtons.forEach((button) => {
        button === null || button === void 0 ? void 0 : button.removeEventListener("click", removeBookFromLibrary);
    });
    readButtons.forEach((button) => {
        button === null || button === void 0 ? void 0 : button.removeEventListener("click", changeReadStatus);
    });
};
const submitBook = (e) => {
    const removeButtons = document.querySelectorAll(".remove-button");
    const readButtons = document.querySelectorAll(".read-button");
    e.preventDefault();
    let inputs = form === null || form === void 0 ? void 0 : form.querySelectorAll("input");
    if (inputs !== undefined) {
        let title = inputs[0].value;
        let author = inputs[1].value;
        let page = inputs[2].value;
        let read = inputs[3].value === "on" ? "Read" : "Not read";
        console.log(inputs[3].value);
        addBookToLibrary(title, author, parseInt(page), read);
        inputs.forEach((input) => {
            input.value = "";
        });
    }
    createCards();
    form === null || form === void 0 ? void 0 : form.classList.add("invisible");
    main === null || main === void 0 ? void 0 : main.classList.remove("blur");
    header === null || header === void 0 ? void 0 : header.classList.remove("blur");
    bookButton === null || bookButton === void 0 ? void 0 : bookButton.addEventListener("click", showForm);
    removeButtons.forEach((button) => {
        button === null || button === void 0 ? void 0 : button.addEventListener("click", removeBookFromLibrary);
    });
    readButtons.forEach((button) => {
        button === null || button === void 0 ? void 0 : button.addEventListener("click", changeReadStatus);
    });
};
function removeBookFromLibrary(e) {
    var _a;
    if (e.target instanceof Element) {
        const card = e.target.parentElement;
        const attribute = parseInt((_a = card === null || card === void 0 ? void 0 : card.getAttribute("data-index")) !== null && _a !== void 0 ? _a : "");
        library.splice(attribute, 1);
        createCards();
    }
}
function changeReadStatus(e) {
    var _a;
    if (e.target instanceof Element) {
        const card = e.target.parentElement;
        const attribute = parseInt((_a = card === null || card === void 0 ? void 0 : card.getAttribute("data-index")) !== null && _a !== void 0 ? _a : "");
        library[attribute].read = library[attribute].read === "Read" ? "Not read" : "Read";
        createCards();
    }
}
bookButton === null || bookButton === void 0 ? void 0 : bookButton.addEventListener("click", showForm);
formButton === null || formButton === void 0 ? void 0 : formButton.addEventListener("click", submitBook);
