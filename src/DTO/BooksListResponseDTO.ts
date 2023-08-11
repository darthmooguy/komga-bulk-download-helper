import { BookDTO } from "./BookDTO";

export type BooksListResponseDTO = {
    totalPages: number;
    content: BookDTO[];
};
