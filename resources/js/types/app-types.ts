import { Auth } from '.';

export interface DashboardTypes {
    ziggy: {
        appEnvironment: string;
    };
    auth: Auth;
    streak: number;
}

export interface Note {
    id: number;
    title: string;
    body_md: string;
    tags: Tag[];
}

export interface Tag {
    id: number;
    title: string;
}

export interface Flashcard {
    id: number;
    question: string;
    answer: string;
    tags: Tag[];
}

export interface Review {
    id: number;
    flashcard: Flashcard;
    review_date?: string;
    ease_factor?: number;
    interval?: number;
    due_at?: string;
}

// FORMS
export interface FlashcardForm {
    question: string;
    answer: string;
    tag: string;
}

export interface ReviewForm {
    quality_choice: number;
}

export interface NoteForm {
    id?: number;
    title: string;
    body_md: string;
}
