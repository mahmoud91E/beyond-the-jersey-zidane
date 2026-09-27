'use client';

import { useState, type ReactNode } from 'react';
import { ArchiveFrame, CampaignLockup } from './campaign-art';

const objects = [
  { year: '1998', chapter: '1998', name: 'Arrival', roman: 'I', shirt: 'FRANCE_1998_SHIRT', image: 'ZIDANE_1998_FINAL' },
  { year: '2000', chapter: '2000', name: 'Ascendance', roman: 'II', shirt: 'FRANCE_2000_SHIRT', image: 'FRANCE_2000_MATCH' },
  { year: '2002', chapter: '2002-2004', name: 'Weight', roman: 'III', shirt: 'FRANCE_2002_SHIRT', image: 'FRANCE_2002' },
  { year: '2004', chapter: '2002-2004', name: 'Weight', roman: 'III', shirt: 'FRANCE_2004_SHIRT', image: 'FRANCE_2004_ENGLAND' },
  { year: '2006', chapter: '2006', name: 'Return', roman: 'IV', shirt: 'FRANCE_2006_WHITE_SHIRT', image: 'ZIDANE_2006_BRAZIL' },
];

export function ActivationPreview({ renderShare }: { renderShare: (id: string) => ReactNode }) {
  const [selected, setSelected] = useState('1998');
  const object = objects.find(item => item.year === selected)!;
  return <div className="activation-preview">
    <div className="activation-controls">
      <div><p className="eyebrow">Try the proposed journey</p><p className="fine">Choose a display object to preview its card and mobile entry point.</p></div>
      <div><label htmlFor="display-object">Display object</label><select id="display-object" value={selected} onChange={event => setSelected(event.target.value)}>{objects.map(item => <option key={item.year} value={item.year}>France / {item.year}</option>)}</select></div>
    </div>
    <p className="sr-only" role="status">Previewing France {object.year}, Chapter {object.roman} — {object.name}.</p>
    <div className="activation-spread">
      <figure className="display-study">
        <p className="eyebrow">01 / See the jersey</p>
        <div className="display-plinth"><ArchiveFrame name={object.shirt}/></div>
        <figcaption>Proposed display / France {object.year}. Garment edition and provenance pending. No physical installation produced.</figcaption>
      </figure>
      <article className="trigger-card">
        <p className="eyebrow">02 / Scan</p><CampaignLockup/>
        <h3>Scan the moment.</h3><p>{object.year} / {object.name}</p>
        <div className="qr-placeholder">QR PLACEHOLDER<small>Not scannable · public URL pending</small></div>
        <p className="fine">Destination: Chapter {object.roman} — {object.name}. A readable short link would accompany the final QR.</p>
        <a className="rule-link" href={`#chapter-${object.chapter}`}>Preview chapter destination ↗</a>
      </article>
      <article className="mobile-landing" aria-label="Mobile landing preview">
        <p className="eyebrow">03 / Mobile entry</p><CampaignLockup/>
        <ArchiveFrame name={object.image}/>
        <p className="eyebrow">{object.year} / Chapter {object.roman}</p><h3>{object.name}</h3>
        <a className="rule-link" href={`#chapter-${object.chapter}`}>Experience the moment ↗</a>
        <details key={selected}><summary>Explore this shirt</summary><p>France / {object.year}</p><p>Edition, condition and provenance await verification. No match-worn claim is made.</p><p>Retail availability is not connected in this concept. If this shirt is unavailable, continue with the archive story. Related heritage products would be recommended only after an availability check; none are offered here.</p></details>
        {renderShare(object.chapter)}
        <p className="fine">Save by bookmarking the chapter. Shared links work on this device during local preview; public sharing requires deployment.</p>
      </article>
    </div>
  </div>;
}

