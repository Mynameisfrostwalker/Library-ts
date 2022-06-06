"use strict";
let main = document.querySelector("main");
let library = [];
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
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
    library.forEach(book => {
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
                    button.textContent = `${book[property]}`;
                    card.appendChild(button);
                }
            }
        }
        main === null || main === void 0 ? void 0 : main.appendChild(card);
    });
};
addBookToLibrary("Les miserables", "Victor Hugo", 954, "Not read");
addBookToLibrary("Stranger", "Albert Camus", 137, "Read");
createCards();
