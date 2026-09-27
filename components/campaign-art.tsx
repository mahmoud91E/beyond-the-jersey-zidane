type FrameProps = { name: string; className?: string };

/** Intentionally typographic: no invented or third-party historical imagery. */
export function ArchiveFrame({ name, className = '' }: FrameProps) {
  return <div className={`archive-frame ${className}`}>
    <span className="frame-register">IMAGE / PENDING</span>
    <code>[{name}]</code>
    <span className="frame-caption">Descriptive placeholder · not sourced</span>
  </div>;
}

export function CampaignLockup() {
  return <div className="campaign-lockup"><strong>BEYOND THE JERSEY</strong><span>ZIDANE — FRANCE 1998 → 2006</span></div>;
}

export const artworkFormats = [
  { name: 'Hero campaign poster', kind: 'poster', year: '1998', chapter: 'I — ARRIVAL', headline: 'The jersey carries the years.', image: 'ZIDANE_1998_FINAL', shirt: 'FRANCE_1998_SHIRT', purpose: 'One defining moment, connected to its historical object.' },
  { name: 'Digital advertising banner', kind: 'banner', year: '2000', chapter: 'II — ASCENDANCE', headline: 'The No.10 era.', image: 'FRANCE_2000_MATCH', shirt: 'FRANCE_2000_SHIRT', purpose: 'A compact invitation into the chapter.' },
  { name: 'Editorial campaign card', kind: 'editorial', year: '2000', chapter: 'II — ASCENDANCE', headline: 'Success becomes authority.', image: 'FRANCE_2000_MATCH', shirt: 'FRANCE_2000_SHIRT_DETAIL', purpose: 'Image, observation and object in a readable editorial sequence.' },
  { name: 'Outdoor / DOOH poster', kind: 'outdoor', year: '2006', chapter: 'IV — RETURN', headline: 'One last run.', image: 'ZIDANE_2006_BRAZIL', shirt: 'FRANCE_2006_WHITE_SHIRT', purpose: 'A short headline and a dominant frame for distance viewing.' },
  { name: 'Retail display card', kind: 'retail', year: '1998', chapter: 'I — ARRIVAL', headline: 'Scan the moment.', image: 'ZIDANE_1998_FINAL', shirt: 'FRANCE_1998_SHIRT', purpose: 'A physical garment leads directly to its digital chapter.' },
  { name: 'Web campaign banner', kind: 'web', year: '1998', chapter: 'I — ARRIVAL', headline: 'A shirt can hold a moment.', image: 'ZIDANE_1998_FINAL', shirt: 'FRANCE_1998_SHIRT_DETAIL', purpose: 'A responsive entry point, with an object and its context.' },
  { name: 'Shirt-history card', kind: 'object', year: '1998', chapter: 'I — ARRIVAL', headline: 'France, 1998.', image: 'ZIDANE_1998_FINAL', shirt: 'FRANCE_1998_SHIRT', purpose: 'The garment first. Its historical association, clearly identified.' },
  { name: 'Campaign title lockup', kind: 'lockup', year: '2006', chapter: 'IV — RETURN', headline: 'The jersey carries the years.', image: 'ZIDANE_2006_BRAZIL', shirt: 'FRANCE_2006_WHITE_SHIRT', purpose: 'A consistent signature across eras and formats.' },
  { name: 'Social teaser', kind: 'teaser', year: '1998 → 2006', chapter: 'I–IV — THE STORY', headline: 'Eight years. More than a shirt.', image: 'FRANCE_SHIRT_ARCHIVE', shirt: 'FRANCE_1998_SHIRT_DETAIL', purpose: 'An object-led introduction, designed for a portrait feed.' },
] as const;

export function CampaignArtwork({ index }: { index: number }) {
  const a = artworkFormats[index];
  return <div className={`campaign-artwork format-${a.kind}`}>
    <CampaignLockup />
    <div className="art-heading"><span className="art-year">{a.year}</span><span className="art-chapter">CHAPTER {a.chapter}</span><h3>{a.headline}</h3></div>
    <ArchiveFrame name={a.image} className="art-documentary" />
    <div className="art-object"><ArchiveFrame name={a.shirt} /><span>France / {a.year}<br/>Edition & provenance pending</span></div>
    <div className="art-bottom"><span>{a.kind === 'retail' ? 'Scan to experience the moment · QR pending' : 'Explore the story'}</span><span>Independent concept</span></div>
  </div>;
}
