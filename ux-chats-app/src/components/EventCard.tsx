import type { ReactNode } from "react";
import { Button, Tag } from "./";

type EventVariant = "upcoming" | "past";

interface MetaItem {
  icon: string;
  text: string;
}

interface CardAction {
  label: string;
  href: string;
  variant?: "yellow" | "line" | "primary";
}

interface EventCardData {
  month: string;
  day: string;
  time: string;
  tag: string;
  tagVariant?: "yellow" | "sky" | "pink" | "default";
  title: string;
  description: ReactNode;
  meta?: MetaItem[];
  buttons?: CardAction[];
}

export interface EventCardProps {
  variant?: EventVariant;
  data: EventCardData;
  className?: string;
}

export function EventCard({
  variant = "upcoming",
  data,
  className = "",
}: EventCardProps) {
  const isPast = variant === "past";

  const sticker = isPast ? (
    <span className="next-up-sticker past">Past event</span>
  ) : (
    <span className="next-up-sticker">Next up →</span>
  );

  const dateBlock = (
    <div className={`next-up-date${isPast ? " past" : ""}`}>
      <span className="month">{data.month}</span>
      <span className="day">{data.day}</span>
      <span className="time">{data.time}</span>
    </div>
  );

  return (
    <div className={`next-up-wrap${isPast ? " past" : ""} ${className}`.trim()}>
      {sticker}
      <div className={`next-up-card${isPast ? " past" : ""}`}>
        {dateBlock}
        <div className="next-up-body">
          <Tag
            variant={data.tagVariant ?? "yellow"}
            size="sm"
            className="next-up-tag"
          >
            {data.tag}
          </Tag>
          <h3>{data.title}</h3>
          <p className="desc">{data.description}</p>
          {data.meta && data.meta.length > 0 && (
            <div className="next-up-meta">
              {data.meta.map((m, i) => (
                <span key={i}>
                  {m.icon} {m.text}
                </span>
              ))}
            </div>
          )}
          {data.buttons && data.buttons.length > 0 && (
            <div className="next-up-actions">
              {data.buttons.map((btn, i) => (
                <Button
                  key={i}
                  as="a"
                  href={btn.href}
                  variant={btn.variant ?? (isPast ? "line" : "yellow")}
                  target="_blank"
                  rel="noopener"
                >
                  {btn.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
