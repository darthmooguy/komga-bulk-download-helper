import htmlToElement from "./htmlToElement";
import last from "./last";
import generateDownloadFile from "./generateDownloadFile";
import { BookDTO } from "../DTO/BookDTO";
import { BooksListResponseDTO } from "../DTO/BooksListResponseDTO";

const SeriesHelper = {
    seriesRegex: /^\/series\/[A-Z0-9]*/,

    async addDownloadButton(): Promise<void> {
        const seriesId = last(location.pathname.split("/"));
        const body = await this.getSeriesBooks(seriesId);
        const books: BookDTO[] = body.content;

        const renderInterval = setInterval(() => {
            const seriesDownloadButton = document.querySelector(".container.container--fluid .container a.v-btn");

            if (seriesDownloadButton == null) return;

            clearInterval(renderInterval);

            document.getElementById("book-links")?.remove();

            const buttonTitle = "Download book links";
            const isDarkTheme = seriesDownloadButton.classList.contains("theme--dark");
            const booksDownloadButton = htmlToElement(
                `<button id="book-links" class="v-btn v-btn--is-elevated v-btn--has-bg ${
                    isDarkTheme ? "theme--dark" : "theme--light"
                } v-size--small" title="${buttonTitle}" style="margin-left: 20px"><span class="v-btn__content"><i aria-hidden="true" class="v-icon notranslate v-icon--left mdi mdi-file-download ${
                    isDarkTheme ? "theme--dark" : "theme--light"
                }" style="font-size: 16px;"></i> ${buttonTitle} </span></button>`
            );

            booksDownloadButton?.addEventListener("click", (_) => generateDownloadFile(books, books[0].seriesTitle));

            if (booksDownloadButton != null) {
                seriesDownloadButton.parentElement?.appendChild(booksDownloadButton);
            }
        }, 100);
    },

    async getSeriesBooks(seriesId: string): Promise<BooksListResponseDTO> {
        const response = await fetch(`/api/v1/series/${seriesId}/books?unpaged=true&sort=metadata.numberSort,asc`);
        const body = await response.json();
        return body as BooksListResponseDTO;
    },
};

export default SeriesHelper;
