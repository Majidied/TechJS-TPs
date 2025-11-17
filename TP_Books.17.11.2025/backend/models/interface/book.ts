import { StatusEnum } from '../../tools/statusEnum';
import { FormatEnum } from '../../tools/formatEnum';
export default interface Book {
    id: string;
    title: string;
    author: string;
    pages: number;
    status: StatusEnum;
    price: number;
    pagesRead: number;
    format: FormatEnum;
    suggestedBy: string;
    finished: boolean;
}
