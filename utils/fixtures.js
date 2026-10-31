const base = require('@playwright/test');

const {APIUtils}= require('./utils/APIUtils');
const loginPayload= {userEmail: "john.paul@gmail.com", userPassword: "Learning@1"};
const {request} = require('@playwright/test');
const orderPayLoad={orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]};

exports.customtest = base.test.extend({

authenticatedPage : async({browser}, use)=>
{
const context = await browser.newContext();
const page = await context.newPage();
const email= "john.paul@gmail.com";
await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
await page.locator("#userEmail").fill(email);
await page.locator("#userPassword").fill("Learning@1");
await page.locator("#login").click();
await page.waitForLoadState('networkidle'); 
await use(page);
},

createOrder: async({}, use)=>
{
    const apiContext = await request.newContext();
    const apiUtils= new APIUtils(apiContext,loginPayload);
    const response = await apiUtils.createOrder(orderPayLoad);
    await use(response);
},

testDataForOrder: {
    productName : 'ADIDAS ORIGINAL'
}
}
);
