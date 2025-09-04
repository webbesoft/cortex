`reviews` Table

Each row represents one attempt at reviewing one flashcard by a given user.
It stores the history + scheduling metadata needed for SM-2 (the Anki algorithm).

Columns

id: primary key.

flashcard_id: which card was reviewed.

user_id: who did the review.

review_date: when this review happened.

Now the SM-2–specific fields:

quality (0–5): how well the user recalled the card, chosen via UI buttons.

0–2 = Fail (Again, Incorrect).

3 = Hard (barely got it).

4 = Good (recalled correctly, not too hard).

5 = Easy (perfect recall).
This feeds into the scheduler.

interval (integer, in days): how long until this card will next be shown.

Example: after the 1st successful review, interval might be 1. After the 2nd, 6. After that, it grows: 6 → 15 → 37 days, etc.

ease_factor (float, usually starts at 2.5): this number governs how fast the interval grows for that card.

Higher = card will be shown less often (because you keep remembering it).

Lower = card will be shown more often (because you struggle with it).

It’s updated every review using the SM-2 formula.

due_at: exact timestamp when the card should next appear in the review queue.

Calculated as review_date + interval.

xp_events Table

This is the log of gamification points (XP) so you can:

track how XP was earned,

undo/recalculate if needed,

generate streaks/levels analytics.

Columns

id: primary key.

user_id: who earned the XP.

type: what action gave XP.

amount: how much XP was awarded.

meta_json: optional context (card id, note id, session id).

created_at: timestamp.

Typical type values for the MVP

"review_card" → awarded when a user completes a review of one flashcard.

"session_complete" → small bonus for finishing a review session.

"streak_bonus" → daily streak reward.

"add_flashcard" → XP for creating a new card (encourages building the deck).

"add_note" → XP for creating a note (encourages using the notes feature).

(later you could add "qbank_attempt", "boss_exam", "ai_clip_cleanup", etc.)
