/**
 * Four corner brackets overlaid on a relatively-positioned parent —
 * the classic HUD "target lock" framing.
 */
export const HudCorners = ({ color = 'border-primary/60', size = 'w-3 h-3' }: { color?: string; size?: string }) => (
  <span aria-hidden="true" className="pointer-events-none absolute inset-0">
    <span className={`absolute top-0 left-0 ${size} border-t-2 border-l-2 ${color}`} />
    <span className={`absolute top-0 right-0 ${size} border-t-2 border-r-2 ${color}`} />
    <span className={`absolute bottom-0 left-0 ${size} border-b-2 border-l-2 ${color}`} />
    <span className={`absolute bottom-0 right-0 ${size} border-b-2 border-r-2 ${color}`} />
  </span>
);
