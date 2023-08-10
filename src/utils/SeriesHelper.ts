import htmlToElement from "./htmlToElement";
import { BookDTO } from "../DTO/BookDTO";
import { BooksInSeriesResponseDTO } from "../DTO/BooksInSeriesResponseDTO";

const SeriesHelper = {
    seriesRegex: /^\/series\/[A-Z0-9]*/,

    async addDownloadButton(): Promise<void> {
        const seriesId = location.pathname.split("/")[2];
        const body = await this.getSeriesBooks(seriesId);
        const books: BookDTO[] = body.content;

        const renderInterval = setInterval(() => {
            const seriesDownloadButton = document.querySelector(".container.container--fluid .container a.v-btn");

            if (seriesDownloadButton == null) return;

            clearInterval(renderInterval);
            ///TODO: Follow current light/dark theme
            const booksDownloadButton = htmlToElement(
                '<button href="" class="v-btn v-btn--is-elevated v-btn--has-bg theme--dark v-size--small" title="Download book links" style="margin-left: 20px"><span class="v-btn__content"><i aria-hidden="true" class="v-icon notranslate v-icon--left mdi mdi-file-download theme--dark" style="font-size: 16px;"></i> Download book links </span></button>'
            );

            booksDownloadButton?.addEventListener("click", (_) => this.generateDownloadFile(books));

            if (booksDownloadButton != null) {
                seriesDownloadButton.parentElement?.appendChild(booksDownloadButton);
            }
        }, 100);
    },

    async getSeriesBooks(seriesId: string): Promise<BooksInSeriesResponseDTO> {
        const response = await fetch(`/api/v1/series/${seriesId}/books?unpaged=true&sort=metadata.numberSort,asc`);
        const body = await response.json();
        return body as BooksInSeriesResponseDTO;
    },

    async generateDownloadFile(books: BookDTO[]) {
        // TODO: Use Windows line breaks if on Windows
        const downloadLinks = books.map((book) => `${location.origin}/api/v1/books/${book.id}/file`).join("\n");

        const element = document.createElement("a");
        element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(downloadLinks));
        element.setAttribute("download", `${books[0].seriesTitle}.txt`);

        element.style.display = "none";
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    },
};

export default SeriesHelper;
