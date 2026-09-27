import { chromium } from '@playwright/test';
import fs from 'node:fs';
fs.mkdirSync('qa/screenshots',{recursive:true});
const browser=await chromium.launch({channel:'msedge'});
const report=[];
for(const [name,width,height] of [['desktop',1440,1000],['tablet',820,1180],['mobile',390,844],['narrow',320,740]]) {
  const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  page.on('console',msg=>{if(msg.type()==='error')errors.push(msg.text())});
  await page.goto('http://127.0.0.1:3000/');
  for(const id of ['hero','chapter-1998','chapter-2000','chapter-2002-2004','chapter-2006','stage-farewell','campaign','social','activation','measurement']) {
    await page.locator(`#${id}`).evaluate(el=>el.scrollIntoView({block:'start',behavior:'instant'}));
    const overflow=await page.evaluate(()=>({page:document.documentElement.scrollWidth>innerWidth,offenders:[...document.querySelectorAll('main *')].filter(el=>{const r=el.getBoundingClientRect();return r.width>0&&(r.right>innerWidth+1||r.left< -1)}).slice(0,8).map(el=>el.className)}));
    report.push({viewport:name,section:id,...overflow});
    if(name!=='narrow')await page.screenshot({path:`qa/screenshots/${name}-${id}.png`});
  }
  for(const selector of ['.campaign-editorial','.campaign-banner','.campaign-retail','.reel-grid','.story-mockups','.social-posts','.activation-preview']){
    await page.locator(selector).scrollIntoViewIfNeeded();
    if(name!=='narrow')await page.locator(selector).screenshot({path:`qa/screenshots/${name}-${selector.slice(1)}.png`});
  }
  await page.getByRole('button',{name:'View Reel 01 storyboard'}).click();
  if(name!=='narrow')await page.screenshot({path:`qa/screenshots/${name}-storyboard-dialog.png`});
  report.push({viewport:name,section:'storyboard-dialog',overflow:await page.getByRole('dialog').evaluate(el=>el.scrollWidth>el.clientWidth+1)});
  await page.keyboard.press('Escape');
  report.push({viewport:name,consoleErrors:errors});
  await page.close();
}
await browser.close();
fs.writeFileSync('qa/layout-report.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
