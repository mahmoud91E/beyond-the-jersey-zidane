import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('complete narrative, no overflow, runtime errors or accessibility violations', async ({page})=>{
  test.setTimeout(180000);
  const errors:string[]=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('Beyondthe Jersey.');
  for(const id of ['hero','quick','audience','insight','market','opportunity','story','campaign','social','activation','measurement','reflection','about','sources']){
    const section=page.locator(`#${id}`);
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1)).toBe(true);
    // Audit each editorial region at its reading position. A whole-page
    // contrast audit of this long document stalls in Edge on this machine.
    const audit = new AxeBuilder({page}).include(`#${id}`);
    if(id==='hero')audit.include('.navigation');
    const result=await audit.withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
    expect(result.violations, `Accessibility in ${id}`).toEqual([]);
  }
  await expect(page.getByText('Measurement framework — no campaign data collected yet.')).toBeVisible();
  expect(errors).toEqual([]);
});

test('index, chapter anchors, modal, carousel and measurement disclosures work',async({page})=>{
  await page.goto('/');
  const index=page.getByRole('button',{name:/Index/});
  await index.click();
  await expect(index).toHaveAttribute('aria-expanded','true');
  await page.locator('#section-index').getByRole('link',{name:'2000 · Ascendance'}).click();
  await expect(page).toHaveURL(/#chapter-2000$/);
  await expect(index).toHaveAttribute('aria-expanded','false');
  await expect(page.getByText('His growing stature turns the number 10 shirt into a recognizable symbol',{exact:false})).toBeVisible();
  const open=page.getByRole('button',{name:'View Reel 01 storyboard'});
  await open.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(open).toBeFocused();
  await page.locator('.supporting-social > summary').click();
  await page.getByRole('button',{name:'Next →'}).click();
  await expect(page.locator('.slide:visible h4')).toHaveText('A moment.');
  await page.getByRole('button',{name:'View all slides'}).click();
  await expect(page.locator('.slide:visible')).toHaveCount(5);
  await page.locator('.full-framework > summary').click();
  await page.locator('#measurement summary').filter({hasText:'QR scan rate'}).click();
  await expect(page.getByText('Distinct QR URLs plus sampled exposure counts',{exact:false})).toBeVisible();
});

test('reduced motion keeps the complete story readable',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/#chapter-2006');
  expect(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
  for(const id of ['1998','2000','2002-2004','2006'])await expect(page.locator(`#chapter-${id}`)).toBeVisible();
  await expect(page.locator('#stage-farewell')).toBeVisible();
});

test('supporting formats and activation preserve object-to-chapter mapping',async({page})=>{
  await page.goto('/');
  await page.getByText('Explore supporting campaign formats', {exact:false}).click();
  await expect(page.locator('.campaign-outdoor')).toBeVisible();
  await page.getByRole('button',{name:'View outdoor / dooh poster',exact:true}).click();
  await expect(page.getByRole('dialog')).toContainText('One last run.');
  await page.keyboard.press('Escape');
  for (const [year,chapter] of [['1998','1998'],['2000','2000'],['2002','2002-2004'],['2004','2002-2004'],['2006','2006']]) {
    await page.getByLabel('Display object',{exact:true}).selectOption(year);
    await expect(page.locator('.display-study code')).toContainText(year);
    await expect(page.locator('.mobile-landing .rule-link')).toHaveAttribute('href',`#chapter-${chapter}`);
    await expect(page.locator('.trigger-card .rule-link')).toHaveAttribute('href',`#chapter-${chapter}`);
  }
  await page.locator('.mobile-landing summary').click();
  await expect(page.locator('.mobile-landing details')).toContainText('Retail availability is not connected');
  await expect(page.locator('.qr-placeholder')).toContainText('Not scannable');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});

test('recruiter route, contact destinations and claim boundaries',async({page})=>{
  await page.goto('/');
  const quick=page.locator('#quick');
  await expect(quick).toContainText('AI/Codex/Astra');
  await expect(quick).toContainText('No professional sports-marketing experience is claimed.');
  const order=await page.locator('main > section').evaluateAll(els=>els.map(el=>el.id));
  expect(order).toEqual(['hero','quick','audience','insight','market','opportunity','story','campaign','social','activation','measurement','reflection','about','sources']);
  const words=await page.locator('#hero, #quick, #audience').evaluateAll(els=>els.map(el=>(el as HTMLElement).innerText).join(' ').trim().split(/\s+/).length);
  expect(words).toBeLessThan(600);
  await expect(page.getByRole('link',{name:'EMAIL MAHMOUD'})).toHaveAttribute('href','mailto:mahmoudabdullah320@gmail.com');
  await expect(page.getByRole('link',{name:'VIEW LINKEDIN'})).toHaveAttribute('href','https://www.linkedin.com/in/mahmoud-elshafey-a353a7242');
  await expect(page.locator('#measurement')).toContainText('Product discovery rate');
  await expect(page.locator('.full-framework')).not.toHaveAttribute('open','');
  await expect(page.locator('body')).not.toContainText('Accessible by default');
  await expect(page.locator('#about')).not.toContainText('Not supplied');
  const broken=await page.locator('a[href^="#"]').evaluateAll(links=>links.map(a=>a.getAttribute('href')!).filter(href=>!document.getElementById(href.slice(1))));
  expect(broken).toEqual([]);
});


test('keyboard route, dialog focus, hero image and local assets',async({page})=>{
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link',{name:'Skip to content'})).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main$/);
  const index=page.getByRole('button',{name:/Index/});
  await index.focus();await page.keyboard.press('Enter');
  await page.keyboard.press('Tab');
  await expect(page.locator('#section-index a').first()).toBeFocused();
  await page.keyboard.press('Escape');await expect(index).toBeFocused();
  const opener=page.getByRole('button',{name:'View Reel 01 storyboard'});
  await opener.focus();await page.keyboard.press('Enter');
  await expect(page.getByRole('button',{name:'Close enlarged view'})).toBeFocused();
  await page.keyboard.press('Tab');
  // Native dialogs may cycle through browser chrome (reported as BODY).
  // They must never tab into the inert page underneath.
  expect(await page.evaluate(()=>document.activeElement===document.body||!!document.activeElement?.closest('dialog'))).toBe(true);
  await page.keyboard.press('Tab');
  expect(await page.evaluate(()=>!!document.activeElement?.closest('dialog'))).toBe(true);
  // At small viewports the scrollable dialog itself is a keyboard stop.
  if(await page.evaluate(()=>document.activeElement?.tagName==='DIALOG'))await page.keyboard.press('Tab');
  await expect(page.getByRole('button',{name:'Close enlarged view'})).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  expect(await page.evaluate(()=>document.activeElement===document.body||!!document.activeElement?.closest('dialog'))).toBe(true);
  await page.keyboard.press('Escape');await expect(opener).toBeFocused();
  const disclosure=page.locator('.full-framework > summary');await disclosure.focus();await page.keyboard.press('Enter');
  await expect(page.locator('.full-framework')).toHaveAttribute('open','');
  const img=page.locator('.hero-photo-field img');
  expect(await img.evaluate((el:HTMLImageElement)=>el.complete&&el.naturalWidth>0)).toBe(true);
  const response=await page.request.get('/favicon.svg');expect(response.ok()).toBe(true);
});
