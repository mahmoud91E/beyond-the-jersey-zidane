import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir:'./tests',
  use:{baseURL:process.env.QA_BASE_URL || 'http://127.0.0.1:3000', browserName:'chromium', channel:'msedge'},
  webServer:process.env.QA_BASE_URL ? undefined : {command:'npm run dev',url:'http://127.0.0.1:3000',reuseExistingServer:!process.env.CI,timeout:120000},
  projects:[
    {name:'desktop',use:{viewport:{width:1440,height:1000}}},
    {name:'mobile',use:{viewport:{width:390,height:844},isMobile:true,hasTouch:true}},
    {name:'narrow-reduced',use:{viewport:{width:320,height:740},reducedMotion:'reduce'}}
  ]
});
