import { Button } from "./Button";

export interface CTABandProps {
  discordHref?: string;
}

export function CTABand({ discordHref = "https://discord.gg/RamJrPZpYd" }: CTABandProps) {
  return (
    <section className="cta-band" id="join" data-surface="dark">
      <div className="wrap" style={{ textAlign: "center" }}>
        <h2>Come hang out<br />in the <span className="y">Discord.</span></h2>
        <p>Curious, creative, and wonderfully casual UX people are already in there. Pull up a chair.</p>
        <div className="cta-actions">
          <Button as="a" href={discordHref} variant="yellow" size="lg" target="_blank" rel="noopener">
            Join the Discord →
          </Button>
        </div>
      </div>
    </section>
  );
}
