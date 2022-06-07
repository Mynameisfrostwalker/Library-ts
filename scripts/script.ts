let header = document.querySelector("header");
let main = document.querySelector("main");
let form = document.querySelector("form");
let bookButton = document.querySelector(".newBook");
let formButton = document.querySelector(".form-submit");

interface NovelPrototype  {
    info: () => string,
}

interface Novel extends NovelPrototype  {
    title: string,
    author: string,
    pages: string,
    read: string,
}

let library: Novel[] = [];

function Book(this: Novel, title: string, author:string, pages:number, read:string): void {
    this.title = `"${title}"`;
    this.author = `by ${author}`;
    this.pages = `${pages} pages`;
    this.read = read;
}

Book.prototype.info = function (this: Novel) {
    `${this.title}, by ${this.author}, ${this.pages} pages, ${this.read}.`
}

const addBookToLibrary = (title: string, author: string, pages: number, read: string) => {
    library.push(new (Book as any)(title, author, pages, read));
}

function hasKey<Obj>(obj: Obj, key: PropertyKey): key is keyof Obj {
    return key in obj;
}

const createCards = () => {
    main?.replaceChildren();
    library.forEach(book => {
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
                    button.textContent = `${book[property]}`;
                    card.appendChild(button);
                }
            }
        }

        main?.appendChild(card);
    })
}

const showForm = () => {
    form?.classList.remove("invisible");
    main?.classList.add("blur");
    header?.classList.add("blur");
    bookButton?.removeEventListener("click", showForm);
}

const submitBook = (e: Event) => {
    e.preventDefault();

    let inputs = form?.querySelectorAll("input");
    if(inputs !== undefined) {
        let title = inputs[0].value;
        let author = inputs[1].value;
        let page = inputs[2].value;
        let read = inputs[3].value === "on" ? "Read" : "Not read";
        addBookToLibrary(
            title,
            author,
            parseInt(page),
            read
        );
    }

    createCards();
    form?.classList.add("invisible");
    main?.classList.remove("blur");
    header?.classList.remove("blur");
    bookButton?.addEventListener("click", showForm);
}

bookButton?.addEventListener("click", showForm);
formButton?.addEventListener("click", submitBook);

addBookToLibrary("Les miserables", "Victor Hugo", 954, "Not read");
addBookToLibrary("The Stranger", "Albert Camus", 137, "Read");

createCards()