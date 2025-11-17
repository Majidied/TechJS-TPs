import { Schema, model, Document } from 'mongoose';
import { StatusEnum } from '../tools/statusEnum';
import { FormatEnum } from '../tools/formatEnum';

export interface BookDocument extends Document {
    title: string;
    author: string;
    pages: number;
    status: StatusEnum;
    price: number;
    pagesRead: number;
    format: FormatEnum;
    suggestedBy: string;
    finished: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const bookSchema = new Schema<BookDocument>(
    {
        title: { type: String, required: true, trim: true },
        author: { type: String, required: true },
        pages: { type: Number, min: 1, required: true },
        status: {
            type: String,
            enum: Object.values(StatusEnum),
        },
        price: { type: Number, min: 0, required: true },
        pagesRead: {type: Number, min: 0, required: true,
            validate: {
                validator(value: number) {
                    return value <= this.pages;
                },
                message: 'Pages read cannot exceed total pages',
            },
        },
        format: {
            type: String,
            enum: Object.values(FormatEnum),
        },
        suggestedBy: { type: String},
        finished: { type: Boolean, default: false },
    },
    { timestamps: true }
);

bookSchema.pre('save', function(next) {
    if (this.pagesRead >= this.pages) {
        this.finished = true;
    }
    next();
});

export default model<BookDocument>('Book', bookSchema);