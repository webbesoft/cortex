import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Review, ReviewForm } from '@/types/app-types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Reviews',
        href: '/reviews',
    },
];

export default function Reviews() {
    const { props } = usePage<{ due_reviews: Review[] }>();
    const { data, setData, post, errors, clearErrors } = useForm<ReviewForm>();
    const dueReviews: Review[] = Array.isArray(props.due_reviews) ? props.due_reviews : [];

    // session state driven from actual data
    const [index, setIndex] = useState<number>(0);
    const total = dueReviews.length;
    const [revealed, setRevealed] = useState(false);
    const [sessionComplete, setSessionComplete] = useState(false);
    const [xpEarned, setXpEarned] = useState(0);
    const XP_PER_CARD = 5;

    const current = dueReviews[index] ?? null;

    const cardVariants = {
        front: { rotateY: 0 },
        back: { rotateY: 180 },
    };

    async function handleQuality() {
        if (!current) return;

        setXpEarned((s) => s + XP_PER_CARD);

        try {
            post(`/reviews/${current.id}/grade`, { preserveState: true });
        } catch (e) {}

        const next = index + 1;
        setRevealed(false);
        if (next >= total) {
            setSessionComplete(true);
        } else {
            setIndex(next);
        }
    }

    function handleSkip() {
        const next = index + 1;
        setRevealed(false);
        if (next >= total) {
            setSessionComplete(true);
        } else {
            setIndex(next);
        }
    }

    if (total === 0) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Reviews" />
                <section className="p-4 sm:p-6" aria-labelledby="review-title">
                    <header className="mb-4">
                        <h2 id="review-title" className="text--primary-foreground text-lg font-semibold">
                            Review Session
                        </h2>
                    </header>

                    <div className="bg--card text--card-foreground rounded-lg border border-dashed border-gray-200 p-8 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 12h6M12 9v6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="text--muted-foreground mt-4 text-sm font-semibold">No reviews due today</h3>
                        <p className="mt-2 text-sm text-gray-500">You're all caught up — come back tomorrow or add more cards.</p>
                        <div className="mt-4 flex justify-center gap-3">
                            <Button asChild>
                                <a href="/flashcards">Browse Flashcards</a>
                            </Button>
                            <Button variant="outline" asChild>
                                <a href="/notes">Open Notes</a>
                            </Button>
                        </div>
                    </div>
                </section>
            </AppLayout>
        );
    }

    useEffect(() => {
        handleQuality();
    }, [data.quality_choice]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Reviews" />

            <section className="p-4 sm:p-6" aria-labelledby="review-title">
                <header className="mb-4">
                    <h2 id="review-title" className="text-lg font-semibold text-gray-900">
                        Review Session
                    </h2>
                </header>

                {/* Progress */}
                <Card className="bg--card text--card-foreground mb-6">
                    <CardContent className="p-4">
                        <div className="mb-2 text-sm text-gray-700">
                            Card <strong>{index + 1}</strong> of <strong>{total}</strong>
                        </div>
                        <Progress value={((index + 1) / Math.max(1, total)) * 100} />
                    </CardContent>
                </Card>

                {/* Review Card with Flip Animation */}
                <div className="relative mb-6 h-64 [perspective:1000px]">
                    <motion.div
                        className="absolute inset-0 h-full w-full"
                        animate={revealed ? 'back' : 'front'}
                        variants={cardVariants}
                        transition={{ duration: 0.6 }}
                        style={{
                            transformStyle: 'preserve-3d',
                        }}
                    >
                        {/* Front */}
                        <Card
                            className="bg--card text--card-foreground absolute inset-0 flex flex-col"
                            style={{ backfaceVisibility: 'hidden' }}
                            aria-hidden={revealed}
                            role="group"
                            aria-label="Flashcard front"
                        >
                            <CardHeader className="flex items-center justify-between px-4 py-3">
                                <div className="flex flex-wrap gap-2">
                                    {(Array.isArray(current?.flashcard.tags) ? current!.flashcard.tags : [])
                                        .slice(0, 3)
                                        .map((t: any, idx: number) => {
                                            const label = typeof t === 'string' ? t : (t?.title ?? String(t));
                                            return (
                                                <span key={idx} className="inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
                                                    {label}
                                                </span>
                                            );
                                        })}
                                </div>
                                {/* <div className="text-xs text-gray-500">est. 45s</div> */}
                            </CardHeader>

                            <CardContent className="flex flex-1 items-center justify-center px-6 text-center">
                                <CardTitle className="text-base font-medium">{current?.flashcard.question}</CardTitle>
                            </CardContent>

                            <CardFooter className="flex justify-center px-4 py-3">
                                <Button onClick={() => setRevealed(true)} aria-label="Reveal answer">
                                    Reveal Answer
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Back */}
                        <Card
                            className="bg--card text--card-foreground absolute inset-0 flex flex-col"
                            style={{
                                backfaceVisibility: 'hidden',
                                transform: 'rotateY(180deg)',
                            }}
                            aria-hidden={!revealed}
                            role="region"
                            aria-live="polite"
                            aria-label="Flashcard answer"
                        >
                            <CardHeader className="flex items-center justify-between px-4 py-3">
                                <div className="flex flex-wrap gap-2">
                                    {(Array.isArray(current?.flashcard.tags) ? current!.flashcard.tags : [])
                                        .slice(0, 3)
                                        .map((t: any, idx: number) => {
                                            const label = typeof t === 'string' ? t : (t?.title ?? String(t));
                                            return (
                                                <span key={idx} className="inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
                                                    {label}
                                                </span>
                                            );
                                        })}
                                </div>
                                <div className="text-xs text-gray-500">est. 45s</div>
                            </CardHeader>

                            <CardContent className="flex-1 overflow-y-auto px-6">
                                <p className="mb-4 text-sm text-gray-700">{current?.flashcard.answer ?? '— no answer provided —'}</p>
                                <a
                                    className="text-sm font-medium text-blue-600 hover:underline"
                                    href={`/notes/${current?.flashcard.id ?? ''}`}
                                    aria-label="Open linked note"
                                >
                                    See linked note
                                </a>

                                {/* Quality buttons */}
                                <div className="mt-6">
                                    <div className="mb-2 text-sm font-medium text-gray-700">How did you do?</div>
                                    <div className="flex flex-wrap gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setData({ quality_choice: 0 })}
                                            data-quality={0}
                                            aria-label="Again"
                                        >
                                            Again
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => setData({ quality_choice: 3 })}
                                            data-quality={3}
                                            aria-label="Hard"
                                        >
                                            Hard
                                        </Button>
                                        <Button
                                            variant="default"
                                            size="sm"
                                            onClick={() => setData({ quality_choice: 4 })}
                                            data-quality={4}
                                            aria-label="Good"
                                        >
                                            Good
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={() => setData({ quality_choice: 5 })}
                                            data-quality={5}
                                            aria-label="Easy"
                                        >
                                            Easy
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* Session footer */}
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={handleSkip}>
                            Skip
                        </Button>
                        <Button variant="outline" onClick={() => setSessionComplete(true)}>
                            End Session
                        </Button>
                    </div>
                    <div className="text-sm font-medium text-green-600" aria-live="polite">
                        XP +{xpEarned}
                    </div>
                </div>

                {/* Session complete modal */}
                <Dialog open={sessionComplete && dueReviews.length == 0} onOpenChange={setSessionComplete}>
                    <DialogContent className="sm:max-w-sm">
                        <DialogHeader>
                            <DialogTitle className="text-center">Session Complete</DialogTitle>
                        </DialogHeader>
                        <div className="text-center text-sm text-gray-600">
                            Reviewed: <strong>{total}</strong> · XP gained: <strong>{xpEarned}</strong>
                        </div>
                        <div className="mt-4 flex justify-center">
                            <Button asChild>
                                <a href="/dashboard">Back to Dashboard</a>
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </section>
        </AppLayout>
    );
}
