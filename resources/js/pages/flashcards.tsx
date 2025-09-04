import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Flashcard } from '@/types/app-types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Flashcards',
        href: '/flashcards',
    },
];

export default function Flashcards() {
    const { props } = usePage<{
        flashcards: Flashcard[];
    }>();

    const flashcards = props.flashcards;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Flashcards" />
            <section className="p-4 sm:p-6" aria-labelledby="flashcards-title">
                <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex w-full items-center gap-2 sm:w-auto">
                        <label htmlFor="flash-search" className="flex-1 sm:flex-none">
                            <input
                                id="flash-search"
                                type="search"
                                placeholder="Search cards…"
                                aria-label="Search flashcards"
                                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200"
                            />
                        </label>
                    </div>
                    <button
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                        aria-label="New flashcard"
                    >
                        New Flashcard
                    </button>
                </header>

                {flashcards && flashcards.length > 0 ? (
                    <ul role="list" className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white shadow-sm">
                        {flashcards.map((card) => (
                            <li key={card.id} className="flex items-start justify-between gap-4 p-4" data-card-id={card.id}>
                                <div className="flex-1">
                                    <div className="text-sm font-medium text-gray-900">{card.question}</div>
                                    <div className="mt-1 flex flex-wrap gap-1">
                                        {/* {card.tags.map((tag) => (
                                            <span key={tag} className="inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
                                                {tag}
                                            </span>
                                        ))} */}
                                    </div>
                                </div>
                                <div className="flex shrink-0 flex-col items-end gap-2">
                                    {/* <span className="rounded-md bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
                                        due {card.due_in}
                                    </span> */}
                                    <div className="flex gap-2">
                                        <button
                                            className="rounded-md border border-gray-300 bg-white p-1 text-gray-600 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            aria-label="Send to review"
                                        >
                                            ⏵
                                        </button>
                                        <button
                                            className="rounded-md border border-gray-300 bg-white p-1 text-gray-600 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            aria-label="Edit card"
                                        >
                                            ✎
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
                        <svg
                            className="h-12 w-12 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        <h3 className="mt-2 text-sm font-semibold text-gray-900">No flashcards yet</h3>
                        <p className="mt-1 text-sm text-gray-500">Get started by creating your first card.</p>
                        <div className="mt-4">
                            <button
                                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                                aria-label="Create first card"
                            >
                                Create Flashcard
                            </button>
                        </div>
                    </div>
                )}
            </section>
        </AppLayout>
    );
}
