# Special Guest Page — Content Archive

This file documents content from the original `special-guest/index.html` (vanilla static page)
that was migrated into the React app at `ux-chats-app/src/BecomeAGuest.tsx` (route `/become-a-guest`).

Source: `special-guest/index.html` (deleted after migration)
Destination: `ux-chats-app/src/BecomeAGuest.tsx`

---

## Hero Section (migrated)

- **Heading:** "Be a guest. Share your UX story."
- **Description:** "UX Chats is looking for designers, researchers, and product people who've got something real to say. No corporate talking points. No rehearsed answers. Just raw, honest conversations about the work."
- **CTAs:** "Nominate yourself →" (links to form), "What to expect" (links to FAQ)
- **Stickers:** 🎤 30 min chat, 📹 recorded live, 🌍 remote-friendly

The React version has different copy — more concise hero with "Want to be a special guest?" heading
and links to Luma for proposing talks.

---

## "You're a fit if…" Signs Section (added to React app)

Three cards describing who should apply:

1. **🔥 You've got opinions** — "You don't just follow design trends — you question them. You've got hot takes, hard-won lessons, and stories from the trenches."
2. **🤔 You've failed (and learned)** — "The projects that went sideways taught you more than the smooth ones. We want to hear about those."
3. **⚡ You keep it real** — "No jargon, no gatekeeping, no 'leverage our synergies.' Just honest talk about what works and what doesn't."

---

## Form Section (migrated)

- Form action: `https://formspree.io/f/mdavogvj`
- Fields: first name, last name, LinkedIn, portfolio/website, topics, reason
- Note about checking Luma events: `https://luma.com/TheUXChats?k=c`
- Disclaimer: "We'll get back to you within a week. No spam, ever."
- Uses Formspree for form submissions

---

## FAQ Section (added to React app)

Four Q&A items:

1. **How long is the chat?** — "About 30 minutes. We'll hop on a video call, record it, and keep it loose — like two designers chatting over coffee."
2. **Do I need to prepare?** — "Nope. Just show up with something you're excited to talk about. We'll steer the conversation, you just bring the energy."
3. **What happens after recording?** — "We edit it down, post it on YouTube, and share it with the community. You'll get a link to preview before it goes live."
4. **I'm early in my career — can I still apply?** — "Absolutely. We love fresh perspectives. If you've got thoughts about design and a willingness to share them, you're qualified."

---

## CTA Band (redundant with React app's Footer)

"Ready to talk?" — Links to Discord. This is already covered by the Footer component's cta-band.

---

## Vanilla Components Used

- `<ux-footer>` — replaced by React `Footer` component (`ux-chats-app/src/components/Footer.tsx`)
- No `<ux-fact-chip>` usage in this page (it was an empty Web Component; tags are styled natively)
