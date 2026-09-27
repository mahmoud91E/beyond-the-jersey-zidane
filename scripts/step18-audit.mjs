import { chromium } from '@playwright/test';
import fs from 'node:fs';
fs.mkdirSync('qa/screenshots',{recursive:true});
const browser=await chromium.launch({channel:'msedge'});const report=[];
for(const [name,width,height] of [['desktop',1440,1000],['tablet',820,1180],['mobile',390,844],['narrow',320,740]]){
 const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});const errors=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
 await page.goto('http://127.0.0.1:3000/');
 const reading=await page.locator('#hero,#quick,#audience').evaluateAll(els=>els.map(e=>e.innerText).join(' ').trim().split(/\s+/).length);
 const pageHeight=await page.evaluate(()=>document.documentElement.scrollHeight);
 const checks=[];
 for(const id of ['hero','quick','audience','chapter-2006','campaign','social','activation','measurement','about']){
  const element=page.locator(`#${id}`);await element.scrollIntoViewIfNeeded();
  checks.push({id,overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1)});
  if(['desktop','mobile'].includes(name))await element.screenshot({path:`qa/screenshots/step18-${name}-${id}.png`});
 }
 report.push({viewport:name,width,height,pageHeight,overviewWords:reading,checks,errors});await page.close();
}
await browser.close();fs.writeFileSync('qa/step18-layout-report.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
