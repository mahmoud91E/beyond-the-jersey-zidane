import { chromium } from '@playwright/test';
const browser=await chromium.launch({channel:'msedge'});
for(const [name,width,height] of [['desktop',1440,1000],['mobile',390,844]]){
 const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});await page.goto('http://127.0.0.1:3000/');
 for(const id of ['quick','measurement']){
  await page.locator(`#${id}`).evaluate(el=>el.scrollIntoView({block:'start',behavior:'instant'}));
  await page.screenshot({path:`qa/screenshots/step18-${name}-${id}-viewport.png`});
  console.log(name,id,await page.evaluate(()=>({focus:document.activeElement?.tagName,skip:getComputedStyle(document.querySelector('.skip-link')).top,scrollY})));
 }
 await page.close();
}
await browser.close();
