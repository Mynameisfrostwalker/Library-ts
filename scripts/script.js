"use strict";
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
