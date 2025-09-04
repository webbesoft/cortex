import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    const { props } = usePage<{
        streak: number;
    }>();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <section className="mvp-section mvp-dashboard" data-view="dashboard">
                    <div className="mvp-dashboard__grid">
                        <div className="mvp-dashboard__main">
                            {/* <!-- Streak Card --> */}
                            <article className="mvp-card mvp-streak-card">
                                <div className="mvp-streak-card__content">
                                    <div className="mvp-streak-icon">
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                            <path
                                                d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </div>
                                    <div className="mvp-streak-info">
                                        <div className="mvp-streak-count">{props.streak}</div>
                                        {/* <!-- data: user.streak_days --> */}
                                        <div className="mvp-streak-label">Day streak</div>
                                    </div>
                                </div>
                            </article>

                            <article className="mvp-card mvp-xp-card">
                                <div className="mvp-xp-header">
                                    <span className="mvp-xp-current">XP 1,240 / 1,500</span>
                                    {/* <!-- data: user.xp / user.xp_next --> */}
                                    <span className="mvp-level-badge">Level 12</span>
                                    {/* <!-- data: user.level --> */}
                                </div>
                                <div className="mvp-progress" role="progressbar" aria-valuenow={1240} aria-valuemin={0} aria-valuemax={1500}>
                                    <div className="mvp-progress__fill" style={{ width: '82.67%' }}></div>
                                </div>
                            </article>

                            {/* <!-- Cards Due Today --> */}
                            <article className="mvp-card mvp-due-card">
                                <div className="mvp-due-card__count">18</div>
                                {/* <!-- data: dashboard.cards_due_today --> */}
                                <div className="mvp-due-card__label">Cards due today</div>
                                <button className="mvp-btn mvp-btn--primary">Start Review</button>
                            </article>

                            {/* <!-- Quick Actions --> */}
                            <div className="mvp-quick-actions">
                                <button className="mvp-btn mvp-btn--ghost">Add Flashcard</button>
                                <button className="mvp-btn mvp-btn--ghost">New Note</button>
                            </div>
                        </div>

                        <div className="mvp-dashboard__sidebar">
                            {/* <!-- Quick Due List --> */}
                            <article className="mvp-card mvp-due-list">
                                <h3 className="mvp-due-list__title">Quick due list</h3>
                                <div className="mvp-due-list__items">
                                    <div className="mvp-due-item" data-card-id="fc_101">
                                        {/* <!-- data: dashboard.upcoming[0] --> */}
                                        <div className="mvp-due-item__content">
                                            <div className="mvp-due-item__question">Best initial test for suspected PE?</div>
                                            <div className="mvp-due-item__tags">
                                                <span className="mvp-chip">Pulm</span>
                                                <span className="mvp-chip">Dx</span>
                                            </div>
                                        </div>
                                        <div className="mvp-due-badge mvp-due-badge--now">due now</div>
                                    </div>
                                    <div className="mvp-due-item" data-card-id="fc_102">
                                        {/* <!-- data: dashboard.upcoming[1] --> */}
                                        <div className="mvp-due-item__content">
                                            <div className="mvp-due-item__question">First-line treatment for anaphylaxis?</div>
                                            <div className="mvp-due-item__tags">
                                                <span className="mvp-chip">ER</span>
                                                <span className="mvp-chip">Tx</span>
                                            </div>
                                        </div>
                                        <div className="mvp-due-badge">due 2d</div>
                                    </div>
                                    <div className="mvp-due-item" data-card-id="fc_103">
                                        {/* <!-- data: dashboard.upcoming[2] --> */}
                                        <div className="mvp-due-item__content">
                                            <div className="mvp-due-item__question">Characteristic ECG change in hyperkalemia?</div>
                                            <div className="mvp-due-item__tags">
                                                <span className="mvp-chip">Cardio</span>
                                            </div>
                                        </div>
                                        <div className="mvp-due-badge">due 3d</div>
                                    </div>
                                    <div className="mvp-due-item" data-card-id="fc_104">
                                        {/* <!-- data: dashboard.upcoming[3] --> */}
                                        <div className="mvp-due-item__content">
                                            <div className="mvp-due-item__question">Most sensitive marker for MI?</div>
                                            <div className="mvp-due-item__tags">
                                                <span className="mvp-chip">Cardio</span>
                                                <span className="mvp-chip">Labs</span>
                                            </div>
                                        </div>
                                        <div className="mvp-due-badge">due 5d</div>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                </section>

                {/* <!-- Review Session Section --> */}
                <section className="mvp-section mvp-review" data-view="review" style={{ display: 'none' }}>
                    {/* <!-- Progress Header --> */}
                    <div className="mvp-review-header">
                        <div className="mvp-review-progress-text">Card 5 of 25</div>
                        {/* <!-- data: review_session.current_index / review_session.total --> */}
                        <div className="mvp-progress mvp-progress--small" role="progressbar" aria-valuenow={5} aria-valuemin={0} aria-valuemax={25}>
                            <div className="mvp-progress__fill" style={{ width: '20%' }}></div>
                        </div>
                    </div>

                    {/* <!-- Review Card --> */}
                    <article className="mvp-card mvp-review-card" data-card-id="fc_123">
                        {/* <!-- data: review_session.current_card.id --> */}
                        <div className="mvp-review-card__front">
                            <div className="mvp-review-card__question">
                                {/* Describe the classic triad of nephrotic syndrome. */}
                                {/* <!-- data: review_session.current_card.question --> */}
                            </div>
                            <div className="mvp-review-card__tags">
                                <span className="mvp-chip">Nephrology</span>
                                {/* <!-- data: review_session.current_card.tags --> */}
                            </div>
                            <div className="mvp-review-card__meta">
                                <span className="mvp-time-estimate">est. 45s</span>
                                {/* <!-- data: review_session.current_card.est_seconds --> */}
                            </div>
                        </div>

                        <div className="mvp-review-card__actions mvp-review-card__actions--front">
                            <button className="mvp-btn mvp-btn--primary mvp-reveal-btn">Reveal Answer</button>
                        </div>

                        {/* <!-- Back side (hidden by default, shown with .mvp-is-revealed) --> */}
                        <div className="mvp-review-card__back" style={{ display: 'none' }}>
                            <div className="mvp-review-card__answer">
                                {/* Proteinuria >3.5 g/day, hypoalbuminemia, edema. Often
              hyperlipidemia on labs.
              <!-- data: review_session.current_card.answer --> */}
                            </div>
                            <div className="mvp-review-card__note-link">
                                <a href="#" className="mvp-note-link">
                                    📝 Nephrotic syndrome essentials
                                </a>
                                {/* <!-- data: review_session.current_card.note_link --> */}
                            </div>
                        </div>

                        <div className="mvp-review-card__actions mvp-review-card__actions--back" style={{ display: 'none' }}>
                            <div className="mvp-quality-buttons">
                                <button className="mvp-btn mvp-btn--quality" data-quality="0">
                                    Again
                                </button>
                                <button className="mvp-btn mvp-btn--quality" data-quality="3">
                                    Hard
                                </button>
                                <button className="mvp-btn mvp-btn--quality" data-quality="4">
                                    Good
                                </button>
                                <button className="mvp-btn mvp-btn--quality" data-quality="5">
                                    Easy
                                </button>
                            </div>
                        </div>
                    </article>

                    {/* <!-- Session Footer --> */}
                    <div className="mvp-session-footer">
                        <div className="mvp-session-footer__actions">
                            <button className="mvp-btn mvp-btn--ghost">Skip</button>
                            <button className="mvp-btn mvp-btn--ghost">End Session</button>
                        </div>
                        <div className="mvp-session-xp">
                            <span className="mvp-xp-earned">+45 XP this session</span>
                        </div>
                    </div>

                    {/* <!-- Session Complete Modal (hidden by default) --> */}
                    <div className="mvp-modal mvp-session-complete-modal" role="dialog" aria-modal="true" style={{ display: 'none' }}>
                        <div className="mvp-modal__backdrop"></div>
                        <div className="mvp-modal__content">
                            <div className="mvp-session-complete">
                                <div className="mvp-confetti-placeholder">🎉</div>
                                <h2>Session Complete!</h2>
                                <div className="mvp-session-stats">
                                    <div className="mvp-stat">
                                        <div className="mvp-stat__value">85%</div>
                                        <div className="mvp-stat__label">Accuracy</div>
                                    </div>
                                    <div className="mvp-stat">
                                        <div className="mvp-stat__value">+180</div>
                                        <div className="mvp-stat__label">XP Gained</div>
                                    </div>
                                </div>
                                <button className="mvp-btn mvp-btn--primary">Back to Dashboard</button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <!-- Flashcards Section --> */}
                <section className="mvp-section mvp-flashcards" data-view="flashcards" style={{ display: 'none' }}>
                    <div className="mvp-flashcards-header">
                        <input type="search" className="mvp-search" placeholder="Search flashcards…" aria-label="Search flashcards" />
                        <button className="mvp-btn mvp-btn--primary">New Flashcard</button>
                    </div>

                    <div className="mvp-flashcards-list">
                        <article className="mvp-card mvp-flashcard-item" data-card-id="fc_123">
                            {/* <!-- data: flashcards[0] --> */}
                            <div className="mvp-flashcard-item__content">
                                <div className="mvp-flashcard-item__question">Describe the classic triad of nephrotic syndrome.</div>
                                <div className="mvp-flashcard-item__tags">
                                    <span className="mvp-chip">Nephrology</span>
                                </div>
                            </div>
                            <div className="mvp-flashcard-item__meta">
                                <div className="mvp-due-badge mvp-due-badge--now">due now</div>
                                <button className="mvp-btn-icon" aria-label="Review now">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <polygon points="5,3 19,12 5,21" fill="currentColor" />
                                    </svg>
                                </button>
                                <button className="mvp-btn-icon" aria-label="Edit">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" />
                                        <path d="m18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                </button>
                            </div>
                        </article>

                        <article className="mvp-card mvp-flashcard-item" data-card-id="fc_124">
                            {/* <!-- data: flashcards[1] --> */}
                            <div className="mvp-flashcard-item__content">
                                <div className="mvp-flashcard-item__question">Causes of transudative pleural effusion?</div>
                                <div className="mvp-flashcard-item__tags">
                                    <span className="mvp-chip">Pulm</span>
                                </div>
                            </div>
                            <div className="mvp-flashcard-item__meta">
                                <div className="mvp-due-badge">due 6d</div>
                                <button className="mvp-btn-icon" aria-label="Review now">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <polygon points="5,3 19,12 5,21" fill="currentColor" />
                                    </svg>
                                </button>
                                <button className="mvp-btn-icon" aria-label="Edit">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" />
                                        <path d="m18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                </button>
                            </div>
                        </article>
                    </div>

                    {/* <!-- Flashcard Editor Modal --> */}
                    <div className="mvp-modal mvp-flashcard-editor-modal" role="dialog" aria-modal="true" style={{ display: 'none' }}>
                        <div className="mvp-modal__backdrop"></div>
                        <div className="mvp-modal__content">
                            <div className="mvp-flashcard-editor">
                                <h2>Edit Flashcard</h2>
                                <form className="mvp-form">
                                    <div className="mvp-form-group">
                                        <label htmlFor="question">Question</label>
                                        <textarea id="question" className="mvp-textarea" rows={3}></textarea>
                                    </div>
                                    <div className="mvp-form-group">
                                        <label htmlFor="answer">Answer</label>
                                        <textarea id="answer" className="mvp-textarea" rows={4}></textarea>
                                    </div>
                                    <div className="mvp-form-group">
                                        <label htmlFor="tags">Tags (comma separated)</label>
                                        <input id="tags" type="text" className="mvp-input" />
                                    </div>
                                    <div className="mvp-form-group">
                                        <label htmlFor="note-link">Link to Note</label>
                                        <select id="note-link" className="mvp-select">
                                            <option>Select a note...</option>
                                        </select>
                                    </div>
                                    <div className="mvp-form-actions">
                                        <button type="button" className="mvp-btn mvp-btn--ghost">
                                            Cancel
                                        </button>
                                        <button type="submit" className="mvp-btn mvp-btn--primary">
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <!-- Notes Section --> */}
                <section className="mvp-section mvp-notes" data-view="notes" style={{ display: 'none' }}>
                    <div className="mvp-notes-list">
                        <article className="mvp-card mvp-note-item" data-note-id="note_78">
                            {/* <!-- data: notes[0] --> */}
                            <div className="mvp-note-item__content">
                                <h3 className="mvp-note-item__title">Nephrotic syndrome essentials</h3>
                                <div className="mvp-note-item__excerpt">Definition, causes, workup and management highlights</div>
                                <div className="mvp-note-item__meta">
                                    <div className="mvp-note-item__tags">
                                        <span className="mvp-chip">Nephrology</span>
                                        <span className="mvp-chip">Boards</span>
                                    </div>
                                    <span className="mvp-note-item__date">2 hours ago</span>
                                </div>
                            </div>
                        </article>
                    </div>

                    {/* <!-- Notes Editor --> */}
                    <div className="mvp-notes-editor">
                        <div className="mvp-notes-editor__header">
                            <button className="mvp-btn mvp-btn--ghost mvp-preview-toggle">Preview</button>
                            <button className="mvp-btn mvp-btn--ghost mvp-btn--disabled" disabled>
                                Create Flashcard from selection
                            </button>
                            <button className="mvp-btn mvp-btn--primary">Save Note</button>
                        </div>
                        <div className="mvp-notes-editor__content">
                            <div className="mvp-notes-editor__input">
                                <textarea className="mvp-textarea mvp-markdown-editor" placeholder="Write your notes in markdown..."></textarea>
                            </div>
                            <div className="mvp-notes-editor__preview">
                                <div className="mvp-markdown-preview">
                                    <h1>Preview</h1>
                                    <p>Your rendered markdown will appear here...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <!-- Profile Section --> */}
                <section className="mvp-section mvp-profile" data-view="profile" style={{ display: 'none' }}>
                    <div className="mvp-profile-header">
                        <div className="mvp-avatar mvp-avatar--large">DM</div>
                        {/* <!-- data: user.initials --> */}
                        <h2>Dr. Bear</h2>
                        {/* <!-- data: user.name --> */}
                        <p className="mvp-profile-email">bear@example.com</p>
                    </div>

                    <div className="mvp-profile-stats">
                        <div className="mvp-stat">
                            <div className="mvp-stat__value">1,240</div>
                            {/* <!-- data: user.xp --> */}
                            <div className="mvp-stat__label">Total XP</div>
                        </div>
                        <div className="mvp-stat">
                            <div className="mvp-stat__value">21</div>
                            {/* <!-- data: user.longest_streak --> */}
                            <div className="mvp-stat__label">Longest Streak</div>
                        </div>
                    </div>

                    <div className="mvp-profile-settings">
                        <div className="mvp-setting-item">
                            <label className="mvp-toggle">
                                <input type="checkbox" checked />
                                <span className="mvp-toggle__slider"></span>
                                <span className="mvp-toggle__label">Daily reminder</span>
                            </label>
                        </div>
                        <button className="mvp-btn mvp-btn--ghost mvp-btn--disabled" disabled>
                            Export APKG
                        </button>
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
