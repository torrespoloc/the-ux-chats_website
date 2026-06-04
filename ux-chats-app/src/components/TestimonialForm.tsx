import { useState, type FormEvent } from "react";
import { Button } from "./Button";

export function TestimonialForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", quote: "" });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.quote.trim()) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="testimonial-submitted reveal in">
        <div className="stamp">✦</div>
        <h3 className="display">Thanks, {form.name.split(" ")[0]}!</h3>
        <p>We'll review your testimonial and add it to the wall. See you at the next UX Chat!</p>
        <Button variant="yellow" onClick={() => { setSubmitted(false); setForm({ name: "", role: "", quote: "" }); }}>
          Write another
        </Button>
      </div>
    );
  }

  return (
    <form className="testimonial-form reveal in" onSubmit={handleSubmit} noValidate>
      <div className="tf-sticker">add yours ✦</div>
      <div className="tf-fields">
        <label>
          <span className="tf-label">Name <span aria-label="required">*</span></span>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
          />
        </label>
        <label>
          <span className="tf-label">Role <span className="opt">(optional)</span></span>
          <input
            type="text"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            placeholder="e.g. Product Designer @ Co."
          />
        </label>
        <label>
          <span className="tf-label">Your story <span aria-label="required">*</span></span>
          <textarea
            required
            rows={4}
            value={form.quote}
            onChange={(e) => setForm({ ...form, quote: e.target.value })}
            placeholder="What's been your favorite UX Chats moment?"
          />
        </label>
        <Button variant="yellow" type="submit">Share it →</Button>
      </div>
    </form>
  );
}
