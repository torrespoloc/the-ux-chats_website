export interface MarqueeProps {
  items: string[];
}

export function Marquee({ items }: MarqueeProps) {
  return (
    <div className="marquee">
      <div className="track">
        {items.map((item) => <span key={item}>{item}</span>)}
        {items.map((item) => <span key={item + "-dup"}>{item}</span>)}
      </div>
    </div>
  );
}
