let header = document.querySelector("header");
let main = document.querySelector("main");
let form = document.querySelector("form");
let bookButton = document.querySelector(".newBook");
let formButton = document.querySelector(".form-submit");

let library: Book[] = [];

/*

interface NovelPrototype  {
    info: () => string,
}

interface Novel extends NovelPrototype  {
    title: string,
    author: string,
    pages: string,
    read: string,
}

function Book(this: Novel, title: string, author:string, pages:number, read:string): void {
    this.title = `"${title}"`;
    this.author = `by ${author}`;
    this.pages = `${pages} pages`;
    this.read = read;
}

Book.prototype.info = function (this: Novel) {
    `${this.title}, by ${this.author}, ${this.pages} pages, ${this.read}.`
}

*/

class Book {
    title: string;
    author: string;
    pages: string;
    read: string;
    constructor(title: string, author: string, pages: number, read: string) {
        this.title = `"${title}"`;
        this.author = `by ${author}`;
        this.pages = `${pages} pages`;
        this.read = read;
    }
    info() {
        return `${this.title}, by ${this.author}, ${this.pages} pages, ${this.read}.`;
    }
}

const addBookToLibrary = (title: string, author: string, pages: number, read: string) => {
    library.push(new Book(title, author, pages, read));
}

function hasKey<Obj>(obj: Obj, key: PropertyKey): key is keyof Obj {
    return key in obj;
}

const createCards = () => {
    main?.replaceChildren();
    for(let i = 0; i <library.length; i++) {
        let book = library[i];
        const card = document.createElement("div");
        card.classList.add("card");
        const key = Object.keys(book);

        for(let i = 0; i < key.length; i++) {
            let property = key[i]
            if(hasKey(book, property)) {
                if(property !== "read") {
                    const p = document.createElement("p");
                    p.textContent = `${book[property]}`;
                    card.appendChild(p);
                } else {
                    const button = document.createElement("button");
                    button.classList.add("read-button");
                    button.textContent = `${book[property]}`;
                    button.addEventListener("click", changeReadStatus)
                    card.appendChild(button);
                }
            }
        }

        const removeButton = document.createElement("button");
        removeButton.classList.add("remove-button");
        removeButton.textContent = "Remove";
        card.appendChild(removeButton);
        card.setAttribute("data-index", `${i}`)
        main?.appendChild(card);
        removeButton.addEventListener("click", removeBookFromLibrary)
    }
}

const showForm = () => {
    const removeButtons = document.querySelectorAll(".remove-button");
    const readButtons = document.querySelectorAll(".read-button");
    form?.classList.remove("invisible");
    main?.classList.add("blur");
    header?.classList.add("blur");
    bookButton?.removeEventListener("click", showForm);
    removeButtons.forEach((button) => {
        button?.removeEventListener("click", removeBookFromLibrary);
    })
    readButtons.forEach((button) => {
        button?.removeEventListener("click", changeReadStatus);
    })
}

const submitBook = (e: Event) => {
    const removeButtons = document.querySelectorAll(".remove-button");
    const readButtons = document.querySelectorAll(".read-button");
    e.preventDefault();

    let inputs = form?.querySelectorAll("input");
    if(inputs !== undefined) {
        let title = inputs[0].value;
        let author = inputs[1].value;
        let page = inputs[2].value;
        let read = inputs[3].value === "on" ? "Read" : "Not read";
        console.log(inputs[3].value);
        addBookToLibrary(
            title,
            author,
            parseInt(page),
            read
        );
        inputs.forEach((input) => {
            input.value = "";
        })
    }

    createCards();
    form?.classList.add("invisible");
    main?.classList.remove("blur");
    header?.classList.remove("blur");
    bookButton?.addEventListener("click", showForm);
    removeButtons.forEach((button) => {
        button?.addEventListener("click", removeBookFromLibrary);
    })
    readButtons.forEach((button) => {
        button?.addEventListener("click", changeReadStatus);
    })
}

function removeBookFromLibrary(e: Event) {
    if(e.target instanceof Element){
        const card = e.target.parentElement;
        const attribute = parseInt(card?.getAttribute("data-index") ?? "");
        library.splice(attribute, 1);
        createCards();
    }
}

function changeReadStatus(e: Event) {
    if(e.target instanceof Element){
        const card = e.target.parentElement;
        const attribute = parseInt(card?.getAttribute("data-index") ?? "");
        library[attribute].read = library[attribute].read === "Read" ? "Not read" : "Read";
        createCards();
    }
}

bookButton?.addEventListener("click", showForm);
formButton?.addEventListener("click", submitBook);