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
    excerpt?: string;
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
}
