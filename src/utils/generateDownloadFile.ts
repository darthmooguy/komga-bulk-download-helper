import { BookDTO } from "../DTO/BookDTO";

export default async function generateDownloadFile(books: BookDTO[], filename: string) {
    const lineBreakChar = navigator.userAgent.indexOf("Windows") > -1 ? "\r\n" : "\n";
    const downloadLinks = books.map((book) => `${location.origin}/api/v1/books/${book.id}/file`).join(lineBreakChar);

    const element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(downloadLinks));
    element.setAttribute("download", `${filename}.txt`);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
