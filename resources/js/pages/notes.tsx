import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Note, NoteForm } from '@/types/app-types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { ReactEventHandler, useState } from 'react';
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

    const [selectedNote, setSelectedNote] = useState<Note | null>(null);

    const { data, setData, errors, post, put, clearErrors, reset } = useForm<NoteForm>();

    const submit: ReactEventHandler = (e) => {
        e.preventDefault();
        clearErrors();

        if (selectedNote) {
            put('/notes/' + selectedNote.id, {
                onSuccess: () => {
                    reset('title', 'body_md');
                },
            });
        } else {
            post('/notes', {
                onSuccess: () => {
                    reset('title', 'body_md');
                },
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notes" />
            <section className="p-4 sm:p-6" aria-labelledby="notes-title">
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Notes list */}
                    <div className="rounded-lg border shadow-sm" role="list" aria-label="Notes list">
                        {props.notes && props.notes.length > 0 ? (
                            <ul className="divide--muted divide-y">
                                {props.notes.map((note: Note) => (
                                    <li
                                        key={note.id}
                                        data-note-id={note.id}
                                        className="hover:bg--accent hover:text--accent-foreground cursor-pointer p-4"
                                        onClick={() => {
                                            setSelectedNote(note);
                                            setData({ id: note.id, title: note.title, body_md: note.body_md });
                                        }}
                                    >
                                        <h3 className="text-sm font-semibold">{note.title}</h3>
                                        {note.body_md && <p className="mt-1 text-sm text-muted-foreground">{note.body_md}</p>}
                                        <div className="mt-2 flex flex-wrap items-center gap-2">
                                            {/* {note.tags.map((tag: Tag) => (
                                                <span
                                                    key={tag.id}
                                                    className="inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
                                                >
                                                    {tag.title}
                                                </span>
                                            ))} */}
                                            <time dateTime="2025-09-04" className="ml-auto text-xs text-muted-foreground">
                                                Updated: {note.updated_at}
                                            </time>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="flex flex-col items-center justify-center p-10 text-center">
                                <svg className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                                <p className="mt-2 text-sm">No notes yet — create one to get started.</p>
                            </div>
                        )}
                    </div>

                    <div className="bg--card text--card-foreground rounded-lg border shadow-sm" role="region" aria-label="Note editor">
                        <form onSubmit={submit}>
                            <div className="flex h-full flex-col">
                                <div className="flex items-center justify-between border-b px-4 py-2">
                                    <h3 className="text-sm font-medium">{selectedNote ? `Editing: ${selectedNote.title}` : 'New Note'}</h3>
                                </div>

                                <div className="flex flex-col">
                                    <Label htmlFor="note-title" className="p-2">
                                        Title
                                    </Label>
                                    <Input
                                        id="note-title"
                                        type="text"
                                        placeholder="Note title"
                                        value={data.title}
                                        onChange={(e) => setData({ ...data, title: e.target.value })}
                                        className="text--card-foreground flex-1 resize-none border-0 p-4 text-sm focus:ring-0"
                                    />
                                    {errors.title && <p className="text--destructive p-2">{errors.title}</p>}
                                </div>

                                <Separator />

                                <div className="grid flex-1 grid-cols-1 divide-y divide-muted lg:grid-cols-2 lg:divide-x lg:divide-y-0">
                                    {/* Editor */}
                                    <div className="flex flex-col">
                                        <label htmlFor="markdown-editor" className="sr-only">
                                            Note (Markdown)
                                        </label>
                                        <textarea
                                            id="markdown-editor"
                                            rows={12}
                                            value={data.body_md}
                                            placeholder="Contents"
                                            onChange={(e) => setData({ ...data, body_md: e.target.value })}
                                            className="flex-1 resize-none border-0 p-4 text-sm focus:ring-0"
                                        />
                                        {errors.body_md && <p className="text--destructive">{errors.body_md}</p>}
                                    </div>

                                    {/* Preview */}
                                    <div className="prose prose-sm max-w-none overflow-y-auto p-4">
                                        <ReactMarkdown>{data.body_md}</ReactMarkdown>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-2 border-t border-accent px-4 py-3">
                                    <button
                                        type="submit"
                                        className="rounded-lg bg-chart-2 px-4 py-2 text-sm font-medium shadow focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                                    >
                                        Save Note
                                    </button>
                                    {/* <button
                                        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        disabled
                                        title="Select text to enable"
                                    >
                                        Create Flashcard from selection
                                    </button> */}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
