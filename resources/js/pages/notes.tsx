import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Note, Tag } from '@/types/app-types';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Notes',
        href: '/notes',
    },
];

export default function Notes() {
    const { props } = usePage<{
        notes: Note[];
    }>();

    const [markdown, setMarkdown] = useState<string>('# New note\n\nStart typing...');
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notes" />
            <section className="p-4 sm:p-6" aria-labelledby="notes-title">
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Notes list */}
                    <div className="rounded-lg border border-gray-200 bg-white shadow-sm" role="list" aria-label="Notes list">
                        {props.notes && props.notes.length > 0 ? (
                            <ul className="divide-y divide-gray-200">
                                {props.notes.map((note: Note) => (
                                    <li
                                        key={note.id}
                                        data-note-id={note.id}
                                        className="cursor-pointer p-4 hover:bg-gray-50"
                                        onClick={() => {
                                            setSelectedNote(note);
                                            setMarkdown(`# ${note.title}\n\n${note.excerpt ?? ''}`);
                                        }}
                                    >
                                        <h3 className="text-sm font-semibold text-gray-900">{note.title}</h3>
                                        {note.excerpt && <p className="mt-1 text-sm text-gray-600">{note.excerpt}</p>}
                                        <div className="mt-2 flex flex-wrap items-center gap-2">
                                            {note.tags.map((tag: Tag) => (
                                                <span
                                                    key={tag.id}
                                                    className="inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
                                                >
                                                    {tag.title}
                                                </span>
                                            ))}
                                            <time dateTime="2025-09-04" className="ml-auto text-xs text-gray-400">
                                                Updated: Sep 4, 2025
                                            </time>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="flex flex-col items-center justify-center p-10 text-center text-gray-500">
                                <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                                <p className="mt-2 text-sm">No notes yet — create one to get started.</p>
                            </div>
                        )}
                    </div>

                    {/* Markdown editor + preview */}
                    <div className="rounded-lg border border-gray-200 bg-white shadow-sm" role="region" aria-label="Note editor">
                        <div className="flex h-full flex-col">
                            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2">
                                <h3 className="text-sm font-medium text-gray-900">{selectedNote ? `Editing: ${selectedNote.title}` : 'New Note'}</h3>
                            </div>

                            <div className="grid flex-1 grid-cols-1 divide-y divide-gray-200 lg:grid-cols-2 lg:divide-x lg:divide-y-0">
                                {/* Editor */}
                                <div className="flex flex-col">
                                    <label htmlFor="markdown-editor" className="sr-only">
                                        Note (Markdown)
                                    </label>
                                    <textarea
                                        id="markdown-editor"
                                        rows={12}
                                        value={markdown}
                                        onChange={(e) => setMarkdown(e.target.value)}
                                        className="flex-1 resize-none border-0 p-4 text-sm text-gray-900 focus:ring-0"
                                    />
                                </div>

                                {/* Preview */}
                                <div className="prose prose-sm max-w-none overflow-y-auto p-4">
                                    <ReactMarkdown>{markdown}</ReactMarkdown>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 border-t border-gray-200 bg-gray-50 px-4 py-3">
                                <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none">
                                    Save Note
                                </button>
                                <button
                                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    disabled
                                    title="Select text to enable"
                                >
                                    Create Flashcard from selection
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
