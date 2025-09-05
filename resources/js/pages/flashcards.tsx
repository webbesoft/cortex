import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Flashcard, FlashcardForm, Tag } from '@/types/app-types';
import { Form, Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Flashcards',
        href: '/flashcards',
    },
];

export default function Flashcards() {
    const { props } = usePage<{
        flashcards: Flashcard[];
        availableTags: Tag[];
    }>();

    let params = new URLSearchParams(window.location.search);

    const flashcards = props.flashcards;

    const [open, setOpen] = useState(false);
    const [editingCard, setEditingCard] = useState<Flashcard | null>(null);

    const {
        data: formdata,
        setData,
        post,
        put,
        processing,
        errors,
        reset,
        clearErrors,
    } = useForm<FlashcardForm>({
        question: '',
        answer: '',
        tag: '',
    });

    const openCreateDialog = () => {
        reset();
        setEditingCard(null);
        setOpen(true);
    };

    const openEditDialog = (card: Flashcard) => {
        setData({
            question: card.question,
            answer: card.answer,
            tag: card.tags.length > 0 ? card.tags[0].title : '',
        });
        setEditingCard(card);
        setOpen(true);
    };

    const submit: FormEventHandler = (e: any) => {
        e.preventDefault();
        clearErrors();

        if (editingCard) {
            put(`/flashcards/${editingCard.id}`, {
                preserveState: true,
                onSuccess: () => {
                    setOpen(false);
                },
                onError: (formErrors) => {
                    console.error('Form submission error:', formErrors);
                },
            });
        } else {
            post('/flashcards', {
                preserveState: true,
                onSuccess: () => {
                    setOpen(false);
                    reset('answer', 'question', 'tag');
                },
                onError: (formErrors) => {
                    console.error('Form submission error:', formErrors);
                },
            });
        }
    };

    useEffect(() => {
        if (params.get('create')) {
            setOpen(true);
        }
        params.delete('create');
        console.log(params);
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Flashcards" />
            <section className="p-4 sm:p-6" aria-labelledby="flashcards-title">
                <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex w-full items-center gap-2 sm:w-auto">
                        <label htmlFor="flash-search" className="flex-1 sm:flex-none">
                            <Input id="flash-search" type="search" placeholder="Search cards…" aria-label="Search flashcards" />
                        </label>
                    </div>
                    <Button onClick={openCreateDialog}>New Flashcard</Button>
                </header>

                {flashcards && flashcards.length > 0 ? (
                    <ul role="list" className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white shadow-sm">
                        {flashcards.map((card) => (
                            <li key={card.id} className="flex items-start justify-between gap-4 p-4" data-card-id={card.id}>
                                <div className="flex-1">
                                    <div className="text-sm font-medium text-gray-900">{card.question}</div>
                                    <div className="mt-1 flex flex-wrap gap-1">
                                        {card.tags &&
                                            card.tags.map((tag) => (
                                                <Badge key={tag.id} variant="outline">
                                                    {tag.title}
                                                </Badge>
                                            ))}
                                    </div>
                                </div>
                                <div className="flex shrink-0 flex-col items-end gap-2">
                                    <div className="flex gap-2">
                                        <Form action={'/flashcards/' + card.id + '/review'} method="post">
                                            <Button type="submit" variant="outline" size="icon" aria-label="Send to review">
                                                ⏵
                                            </Button>
                                        </Form>
                                        <Button variant="outline" size="icon" aria-label="Edit card" onClick={() => openEditDialog(card)}>
                                            ✎
                                        </Button>
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
                            <Button onClick={openCreateDialog}>Create Flashcard</Button>
                        </div>
                    </div>
                )}

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="sm:max-w-lg">
                        <form onSubmit={(e) => submit(e)}>
                            <DialogHeader>
                                <DialogTitle>{editingCard ? 'Edit Flashcard' : 'New Flashcard'}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="question">Question</Label>
                                    <Input
                                        id="question"
                                        value={formdata.question}
                                        onChange={(e) =>
                                            setData((currentData) => ({
                                                ...currentData,
                                                question: e.target.value,
                                            }))
                                        }
                                        placeholder="Enter your question…"
                                    />
                                    {errors.question && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.question}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="answer">Answer</Label>
                                    <Textarea
                                        id="answer"
                                        value={formdata.answer}
                                        onChange={(e) =>
                                            setData((currentData) => ({
                                                ...currentData,
                                                answer: e.target.value,
                                            }))
                                        }
                                        placeholder="Enter the answer…"
                                        rows={4}
                                    />
                                    {errors.answer && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.answer}</p>}
                                </div>
                                <div className="gap-2">
                                    <Label htmlFor="tags">Tags</Label>
                                    <Combobox
                                        options={props.availableTags.map((tag) => ({ label: tag.title, value: tag.title.toLowerCase() }))}
                                        value={formdata.tag}
                                        handleValueChange={(value) => {
                                            setData((currentData) => ({
                                                ...currentData,
                                                tag: value,
                                            }));
                                        }}
                                        placeholder="Select or search tags…"
                                        emptyText="No tags found"
                                    />
                                    {errors.tag && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.tag}</p>}
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {/* {formdata.tag.map((tag) => ( */}
                                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">{formdata.tag}</span>
                                        {/* ))} */}
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {editingCard ? 'Update' : 'Save'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </section>
        </AppLayout>
    );
}
