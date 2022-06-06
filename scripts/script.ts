let main = document.querySelector("main");

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

addBookToLibrary("Les miserables", "Victor Hugo", 954, "Not read");
addBookToLibrary("The Stranger", "Albert Camus", 137, "Read");

createCards()