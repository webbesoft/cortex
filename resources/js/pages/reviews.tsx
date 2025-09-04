import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Reviews',
        href: '/reviews',
    },
];

export default function Reviews() {
    const { props } = usePage<{
        streak: number;
    }>();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Reviews" />
            {/* <!-- REVIEW SESSION SECTION --> */}

            <section className="mvp-section mvp-review" aria-labelledby="review-title">
                <header className="mvp-section__header">
                    <h2 id="review-title" className="mvp-heading">
                        Review Session
                    </h2>
                </header>
                ```
                <div className="mvp-card mvp-review__meta" role="region" aria-label="Review progress">
                    <div className="mvp-review__progress">
                        <div className="mvp-review__count">
                            Card <strong>5</strong> of <strong>25</strong>
                        </div>
                        {/* <!-- data: review_session.current_index review_session.total --> */}
                        <div
                            className="mvp-progress mvp-progress--small"
                            role="progressbar"
                            aria-valuemin={0}
                            aria-valuemax={25}
                            aria-valuenow={5}
                            aria-label="Session progress"
                        >
                            <div className="mvp-progress__fill" style={{ width: 'calc(5 / 25 * 100%)' }} aria-hidden="true"></div>
                        </div>
                    </div>
                </div>
                {/* <!-- Review card (front visible) --> */}
                <article className="mvp-card mvp-card--review" data-card-id="fc_123" data-due="now" role="article" aria-labelledby="card-front-1">
                    {/* <!-- data: review_session.current_card.id --> */}
                    <header className="mvp-card__meta">
                        <div className="mvp-card__tags">
                            <span className="mvp-chip">Nephrology</span>
                            {/* <!-- data: review_session.current_card.tags[0] --> */}
                        </div>
                        <div className="mvp-card__time">est. 45s</div>
                        {/* <!-- data: review_session.current_card.est_seconds --> */}
                    </header>

                    <div className="mvp-card__front" id="card-front-1">
                        <h3 className="mvp-card__question">Describe the classic triad of nephrotic syndrome.</h3>
                        {/* <!-- data: review_session.current_card.question --> */}
                    </div>

                    <footer className="mvp-card__controls">
                        <button className="mvp-btn mvp-btn--primary" aria-label="Reveal answer">
                            Reveal Answer
                        </button>
                    </footer>
                </article>
                {/* <!-- Review card (answer revealed example) --> */}
                <article className="mvp-card mvp-card--review mvp-is-revealed" data-card-id="fc_123" role="article" aria-labelledby="card-front-2">
                    <header className="mvp-card__meta">
                        <div className="mvp-card__tags">
                            <span className="mvp-chip">Nephrology</span>
                        </div>
                        <div className="mvp-card__time">est. 45s</div>
                    </header>

                    <div className="mvp-card__front" id="card-front-2" aria-hidden="true">
                        <h3 className="mvp-card__question">Describe the classic triad of nephrotic syndrome.</h3>
                    </div>

                    <div className="mvp-card__back" role="region" aria-live="polite" aria-label="Answer content">
                        <p className="mvp-card__answer">Proteinuria &gt;3.5 g/day, hypoalbuminemia, edema. Often hyperlipidemia on labs.</p>
                        {/* <!-- data: review_session.current_card.answer --> */}
                        <a className="mvp-card__note-link" href="#" aria-label="Open linked note" data-note-id="note_78">
                            See note: Nephrotic syndrome essentials
                        </a>
                        {/* <!-- data: review_session.current_card.note_link --> */}
                        <div className="mvp-quality">
                            <div className="mvp-quality__label">How did you do?</div>
                            <div className="mvp-quality__buttons" role="group" aria-label="Quality choices">
                                <button className="mvp-btn mvp-btn--ghost" data-quality="0" aria-label="Again">
                                    Again
                                </button>
                                <button className="mvp-btn mvp-btn--ghost" data-quality="3" aria-label="Hard">
                                    Hard
                                </button>
                                <button className="mvp-btn mvp-btn--primary" data-quality="4" aria-label="Good">
                                    Good
                                </button>
                                <button className="mvp-btn mvp-btn--primary" data-quality="5" aria-label="Easy">
                                    Easy
                                </button>
                            </div>
                        </div>
                    </div>
                </article>
                <div className="mvp-session-footer">
                    <div className="mvp-session-footer__left">
                        <button className="mvp-btn mvp-btn--ghost" aria-label="Skip card">
                            Skip
                        </button>
                        <button className="mvp-btn mvp-btn--ghost" aria-label="End session">
                            End Session
                        </button>
                    </div>
                    <div className="mvp-session-footer__right" aria-live="polite">
                        <span className="mvp-xp-earned">XP +60</span>
                    </div>
                </div>
                {/* <!-- Session complete modal (hidden by default). To show, add .mvp-session-complete to <body> --> */}
                <div className="mvp-modal" role="dialog" aria-modal="true" aria-labelledby="session-complete-title" hidden>
                    <div className="mvp-modal__content">
                        <div className="mvp-modal__confetti" aria-hidden="true">
                            {/* <!-- confetti svg placeholder --> */}
                            <svg width="80" height="40" viewBox="0 0 80 40">
                                <circle cx="10" cy="10" r="3" />
                                <rect x="30" y="8" width="4" height="8" />
                                <path d="M60 10l3 6" strokeWidth="2" />
                            </svg>
                        </div>
                        <h3 id="session-complete-title">Session Complete</h3>
                        <p className="mvp-modal__summary">
                            Accuracy: <strong>84%</strong> · XP gained: <strong>60</strong>
                        </p>
                        <div className="mvp-modal__actions">
                            <button className="mvp-btn mvp-btn--primary" aria-label="Back to dashboard">
                                Back to Dashboard
                            </button>
                        </div>
                    </div>
                </div>
                ```
            </section>
        </AppLayout>
    );
}
