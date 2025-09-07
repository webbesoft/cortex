import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Review } from '@/types/app-types';
import { Head, usePage } from '@inertiajs/react';
import { Flame } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    const { props } = usePage<{
        streak: number;
        xp: number;
        due_today_count: number;
        due_today_overview: Review[];
    }>();

    const xpPerLevel = 200;
    const currentLevel = Math.floor(props.xp / xpPerLevel) + 1;
    const xpIntoLevel = props.xp % xpPerLevel;
    const xpProgress = (xpIntoLevel / xpPerLevel) * 100;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 sm:p-6">
                <section className="grid gap-6 md:grid-cols-3">
                    {/* Streak Card */}
                    <Card className="bg--card text--card-foreground flex flex-col items-center justify-center text-center">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-orange-600">
                                <Flame className="h-6 w-6" />
                                Streak
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold">{props.streak}</div>
                            <p className="text-sm text-muted-foreground">Day streak</p>
                        </CardContent>
                    </Card>

                    {/* XP / Level Card */}
                    <Card className="bg--card text--card-foreground col-span-2">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>XP Progress</CardTitle>
                            <Badge variant="secondary">Level {currentLevel}</Badge>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-2 text-sm font-medium">
                                {props.xp} / {xpPerLevel * currentLevel} XP
                            </div>
                            <Progress value={xpProgress} />
                        </CardContent>
                    </Card>

                    {/* Due Today */}
                    <Card className="bg--card text--card-foreground col-span-1 flex flex-col items-center justify-center">
                        <CardHeader>
                            <CardTitle>Due Today</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center gap-3">
                            <div className="text-4xl font-bold">{props.due_today_count}</div>
                            <p className="text-sm text-muted-foreground">Cards due</p>
                            <Button size="sm">
                                <a href="/reviews">Start Review</a>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="bg--card text--card-foreground col-span-2">
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="flex gap-2">
                            <Button variant="outline">
                                <a href="/flashcards?create=true">Add Flashcard</a>
                            </Button>
                            <Button variant="outline">New Note</Button>
                        </CardContent>
                    </Card>

                    {/* Quick Due List */}
                    <Card className="bg--card text--card-foreground col-span-3">
                        <CardHeader>
                            <CardTitle>Quick Due List</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-3">
                            {props.due_today_overview && props.due_today_overview.length > 0 ? (
                                props.due_today_overview.map((review) => (
                                    <div key={review.id} className="flex items-center justify-between rounded-lg border p-3">
                                        <div>
                                            <div className="font-medium">{review.flashcard.question}</div>
                                            {review.flashcard.tags.length > 0 && (
                                                <div className="mt-1 flex gap-1">
                                                    {review.flashcard.tags.map((tag) => (
                                                        <Badge key={tag.id} variant="outline">
                                                            {tag.title}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <Badge variant="destructive">Due today</Badge>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground">No cards due today 🎉</p>
                            )}
                        </CardContent>
                    </Card>
                </section>
            </div>
        </AppLayout>
    );
}
