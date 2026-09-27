import { chromium } from '@playwright/test';
const browser=await chromium.launch({channel:'msedge'});
for(const [name,width,height] of [['desktop',1440,1000],['mobile',390,844],['narrow',320,740]]){
 const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('http://127.0.0.1:3000/');
 await page.locator('.hero-photo-field img').evaluate(img=>img.decode());
 console.log(name,await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,photo:document.querySelector('.hero-photo-field img').naturalWidth,summaryWords:document.querySelector('.quick-grid').innerText.split(/\s+/).length,audienceWords:document.querySelector('#audience').innerText.split(/\s+/).length})),errors);
 for(const id of ['hero','quick','chapter-2006']){await page.locator(`#${id}`).evaluate(el=>el.scrollIntoView({block:'start',behavior:'instant'}));await page.screenshot({path:`qa/screenshots/final-${name}-${id}.png`});}
 await page.close();
}
await browser.close();
