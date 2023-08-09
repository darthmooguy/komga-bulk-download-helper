import { BookDTO } from "./DTO/BookDTO";
import { BooksInSeriesResponseDTO } from "./DTO/BooksInSeriesResponseDTO";

/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
function htmlToElement(html: string) : Node | null {
    const template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

async function getSeriesBooks(seriesId: string) : Promise<BooksInSeriesResponseDTO> {
    const response = await fetch(`/api/v1/series/${seriesId}/books?unpaged=true&sort=metadata.numberSort,asc`);
    const body = await response.json();
    return body as BooksInSeriesResponseDTO;
}

async function generateDownloadFile() {
    const seriesId = location.pathname.split('/')[2];
    const body = await getSeriesBooks(seriesId);
    const books: BookDTO[] = body.content;

    const downloadLinks = books.map(book => `${location.origin}/api/v1/books/${book.id}/file`).join("\n");

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(downloadLinks));
    element.setAttribute('download', `${books[0].seriesTitle}.txt`);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}

(function () {
    const downloadButtonParent = document.querySelector('.container.container--fluid .container a.v-btn')?.parentElement;
    const downloadButton = htmlToElement('<button href="" class="v-btn v-btn--is-elevated v-btn--has-bg theme--dark v-size--small" title="Download file containing download links for all books" style="margin-left: 20px"><span class="v-btn__content"><i aria-hidden="true" class="v-icon notranslate v-icon--left mdi mdi-file-download theme--dark" style="font-size: 16px;"></i> Download file containing download links for all books </span></button>');

    downloadButton?.addEventListener('click', (_) => generateDownloadFile());

    if (downloadButton != null) {
        downloadButtonParent?.appendChild(downloadButton);
    }
})();
