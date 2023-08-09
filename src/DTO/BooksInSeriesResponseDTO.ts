import { BookDTO } from "./BookDTO";

export type BooksInSeriesResponseDTO = {
    totalPages: number;
    content: BookDTO[];
}