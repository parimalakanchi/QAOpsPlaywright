const {test,expect, request} = require('@playwright/test');
const {APIUtils}= require('./utils/APIUtils');
const { only } = require('node:test');
let token;
let orderID;
const loginPayload= {userEmail: "john.paul@gmail.com", userPassword: "Learning@1"};
const orderPayLoad={orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]};

let response;
test.beforeAll(async() =>
{
    const apiContext = await request.newContext();
    const apiUtils= new APIUtils(apiContext,loginPayload);
    response = await apiUtils.createOrder(orderPayLoad);
});

test('Place the order',async ({page})=>
{

await page.addInitScript(value =>{

    window.localStorage.setItem('token',value);
}, response.token);

await page.goto("https://rahulshettyacademy.com/client");

await page.locator("button[routerlink*='myorders']").click();
await page.locator("tbody").waitFor();
const rows= await page.locator("tbody tr");
for(let i=0;i<await rows.count(); ++i)
{
    const rowOrderID= await rows.nth(i).locator("th").textContent();
    if(response.orderID.includes(rowOrderID))
    {
        await rows.nth(i).locator(".btn.btn-primary").click();
        break;
    }
}
const orderIDDetailpage= await page.locator(".col-text").textContent();
await page.pause();
await expect(response.orderID.includes(orderIDDetailpage)).toBeTruthy();
});