import htmlToElement from "./htmlToElement";
import last from "./last";
import generateDownloadFile from "./generateDownloadFile";
import { BookDTO } from "../DTO/BookDTO";
import { BooksListResponseDTO } from "../DTO/BooksListResponseDTO";

const ReadListHelper = {
    readListRegex: /^\/readlists\/[A-Z0-9]*/,

    async addDownloadButton(): Promise<void> {
        const readListId = last(location.pathname.split("/"));
        const body = await this.getReadListBooks(readListId);
        const books: BookDTO[] = body.content;

        const renderInterval = setInterval(() => {
            const readListDownloadButton = document.querySelector(".container.container--fluid .row a.v-btn");

            if (readListDownloadButton == null) return;

            clearInterval(renderInterval);

            document.getElementById("book-links")?.remove();

            const buttonTitle = "Download book links";
            const isDarkTheme = readListDownloadButton.classList.contains("theme--dark");
            const booksDownloadButton = htmlToElement(
                `<button id="book-links" class="v-btn v-btn--is-elevated v-btn--has-bg ${
                    isDarkTheme ? "theme--dark" : "theme--light"
                } v-size--small" title="${buttonTitle}" style="margin-left: 20px"><span class="v-btn__content"><i aria-hidden="true" class="v-icon notranslate v-icon--left mdi mdi-file-download ${
                    isDarkTheme ? "theme--dark" : "theme--light"
                }" style="font-size: 16px;"></i> ${buttonTitle} </span></button>`
            );

            booksDownloadButton?.addEventListener("click", (_) =>
                generateDownloadFile(books, document.querySelector(".v-toolbar__title span")?.textContent ?? books[0].seriesTitle)
            );

            if (booksDownloadButton != null) {
                readListDownloadButton.parentElement?.appendChild(booksDownloadButton);
            }
        }, 100);
    },

    async getReadListBooks(readListId: string): Promise<BooksListResponseDTO> {
        const response = await fetch(`/api/v1/readlists/${readListId}/books?unpaged=true`);
        const body = await response.json();
        return body as BooksListResponseDTO;
    },
};

export default ReadListHelper;
