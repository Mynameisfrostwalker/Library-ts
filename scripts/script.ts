interface NovelPrototype  {
    info: () => string,
}

interface Novel extends NovelPrototype  {
    title: string,
    author: string,
    pages: number,
    read: string,
}

let library: Novel[] = [];

function Book(this: Novel, title: string, author:string, pages:number, read:string): void {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function (this: Novel) {
    `${this.title}, by ${this.author}, ${this.pages} pages, ${this.read}.`
}

const addBookToLibrary = (title: string, author: string, pages: number, read: string) => {
    library.push(new (Book as any)(title, author, pages, read));
}

