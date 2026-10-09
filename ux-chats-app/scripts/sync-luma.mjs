// Pulls the public Luma calendar (iCal feed) and writes src/data/events.json.
// Free, no API key. Run by `npm run build` and by the scheduled GitHub Action.
// If Luma is unreachable, the previous events.json is kept so the build never breaks.
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ICS_URL = "https://api.lu.ma/ics/get?entity=calendar&id=cal-wljii79z6HNE6nR";
const OUT = resolve(dirname(fileURLToPath(import.meta.url)), "../src/data/events.json");
const TZ = "America/Los_Angeles";

function parseIcsDate(v) {
  const m = v.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/);
  if (!m) throw new Error(`Bad date: ${v}`);
  return new Date(Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +m[6]));
}

function unescapeText(s) {
  return s.replace(/\\n/gi, "\n").replace(/\\([,;\\])/g, "$1");
}

function parse(ics) {
  // RFC 5545 line unfolding: a line starting with a space continues the previous one.
  const lines = ics.replace(/\r\n/g, "\n").replace(/\n[ \t]/g, "").split("\n");
  const events = [];
  let cur = null;

  for (const line of lines) {
    if (line === "BEGIN:VEVENT") cur = {};
    else if (line === "END:VEVENT" && cur) {
      const start = parseIcsDate(cur.DTSTART);
      const end = cur.DTEND ? parseIcsDate(cur.DTEND) : new Date(start.getTime() + 3600_000);
      const title = unescapeText(cur.SUMMARY ?? "UX Chats Event");
      const desc = unescapeText(cur.DESCRIPTION ?? "");
      const loc = unescapeText(cur.LOCATION ?? "");
      const id = (cur.UID ?? "").split("@")[0];
      // Prefer the short luma.com/xxxx link from the description, else the event page.
      const url =
        desc.match(/https:\/\/luma\.com\/[A-Za-z0-9]+(?=\s|$)/)?.[0] ??
        (loc.startsWith("https://luma.com/") ? loc : `https://luma.com/event/${id}`);
      const fmt = (o) =>
        new Intl.DateTimeFormat("en-US", { timeZone: TZ, ...o }).format(start);
      const isCommunity = /community night/i.test(title);
      events.push({
        id,
        title,
        start: start.toISOString(),
        end: end.toISOString(),
        month: fmt({ month: "short" }),
        day: fmt({ day: "numeric" }),
        time: `${fmt({ hour: "numeric", minute: "2-digit" })} PT`,
        url,
        kind: isCommunity ? "community" : "guest",
        free: /free/i.test(title) || isCommunity,
      });
      cur = null;
    } else if (cur) {
      const i = line.indexOf(":");
      if (i === -1) continue;
      const key = line.slice(0, i).split(";")[0]; // drop params like ;CN="..."
      if (!(key in cur)) cur[key] = line.slice(i + 1);
    }
  }
  return events;
}

async function main() {
  try {
    const res = await fetch(ICS_URL, { signal: AbortSignal.timeout(20_000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    if (!text.includes("BEGIN:VCALENDAR")) throw new Error("Not an iCal feed");

    const now = Date.now();
    // Keep events until they finish, so tonight's event stays up during and after start.
    const upcoming = parse(text)
      .filter((e) => new Date(e.end).getTime() >= now)
      .sort((a, b) => a.start.localeCompare(b.start));

    mkdirSync(dirname(OUT), { recursive: true });
    writeFileSync(OUT, JSON.stringify({ syncedAt: new Date().toISOString(), events: upcoming }, null, 2) + "\n");
    console.log(`Synced ${upcoming.length} upcoming Luma events -> src/data/events.json`);
  } catch (err) {
    console.warn(`Luma sync failed (${err.message}).`);
    if (existsSync(OUT)) console.warn("Keeping the existing src/data/events.json.");
    else {
      mkdirSync(dirname(OUT), { recursive: true });
      writeFileSync(OUT, JSON.stringify({ syncedAt: null, events: [] }, null, 2) + "\n");
      console.warn("Wrote an empty events.json.");
    }
  }
}

main();
