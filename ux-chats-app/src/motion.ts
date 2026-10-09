import { useEffect } from "react";
import { animate, inView, scroll, stagger } from "motion";
import Lenis from "lenis";

// Several elements already use CSS `transform` for rotation (polaroids, call card, stickers),
// so everything here animates opacity plus the independent CSS `translate` property.
// That way the zine rotations are never overwritten.
const EASE = [0.22, 1, 0.36, 1] as const;

// Smooth inertial scroll for the whole site. Mount once, high in the tree.
export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ anchors: true, lerp: 0.1 });
    let raf = 0;
    const tick = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
}

// Entrances, scroll reveals and parallax for the home page.
export function useSiteMotion() {
  useEffect(() => {
    const stops: Array<() => void> = [];

    // HERO: stagger the copy in on load, then the call card.
    const heroCopy = document.querySelectorAll<HTMLElement>(".hero-copy > *");
    if (heroCopy.length) {
      animate(
        heroCopy,
        { opacity: [0, 1], translate: ["0px 28px", "0px 0px"] },
        { duration: 0.7, ease: EASE, delay: stagger(0.09) },
      );
    }
    const call = document.querySelector<HTMLElement>(".hero-visual .call");
    if (call) {
      animate(call, { opacity: [0, 1], translate: ["0px 50px", "0px 0px"] }, { duration: 0.9, ease: EASE, delay: 0.25 });
    }

    // SCROLL REVEALS: every .reveal fades and rises once as it enters the viewport.
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.in)"));

    // Grids reveal their children one after another instead of as a single block.
    const staggerParents = ".cards, .games";
    reveals.forEach((el) => {
      if (!el.matches(staggerParents)) return;
      el.classList.add("in"); // the container itself stays visible, its children do the motion
      const kids = Array.from(el.children) as HTMLElement[];
      kids.forEach((k) => (k.style.opacity = "0"));
      stops.push(
        inView(el, () => {
          animate(
            kids,
            { opacity: [0, 1], translate: ["0px 36px", "0px 0px"] },
            { duration: 0.6, ease: EASE, delay: stagger(0.1) },
          ).then(() => kids.forEach((k) => { k.style.opacity = ""; k.style.translate = ""; }));
        }, { amount: 0.2 }),
      );
    });

    reveals
      .filter((el) => !el.matches(staggerParents) && !el.classList.contains("in"))
      .forEach((el) => {
        stops.push(
          inView(el, () => {
            animate(el, { opacity: [0, 1], translate: ["0px 32px", "0px 0px"] }, { duration: 0.6, ease: EASE })
              .then(() => { el.classList.add("in"); el.style.opacity = ""; el.style.translate = ""; });
          }, { amount: 0.15 }),
        );
      });

    // PARALLAX: tilted collage pieces drift at different speeds as you scroll past.
    const drift: Array<[string, number]> = [
      [".pol-1", -30], [".pol-2", 40], [".pol-3", -20],
      [".crew-shot .frame", 24], [".host-photo", -22],
    ];
    drift.forEach(([sel, px]) => {
      const el = document.querySelector<HTMLElement>(sel);
      if (!el) return;
      stops.push(
        scroll(
          (p: number) => { el.style.translate = `0px ${((p - 0.5) * px * 2).toFixed(1)}px`; },
          { target: el, offset: ["start end", "end start"] },
        ),
      );
    });

    // Events cards: lift on hover, press on click.
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".next-up-card"));
    cards.forEach((c) => {
      const on = () => animate(c, { translate: "0px -6px" }, { type: "spring", stiffness: 380, damping: 22 });
      const off = () => animate(c, { translate: "0px 0px" }, { type: "spring", stiffness: 380, damping: 22 });
      const down = () => animate(c, { translate: "0px 2px" }, { duration: 0.08 });
      c.addEventListener("pointerenter", on);
      c.addEventListener("pointerleave", off);
      c.addEventListener("pointerdown", down);
      c.addEventListener("pointerup", on);
      stops.push(() => {
        c.removeEventListener("pointerenter", on);
        c.removeEventListener("pointerleave", off);
        c.removeEventListener("pointerdown", down);
        c.removeEventListener("pointerup", on);
      });
    });

    return () => stops.forEach((s) => s());
  }, []);
}
