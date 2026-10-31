const {test,expect} = require('@playwright/test');
const { only } = require('node:test');
const {POManager}= require('../pageobjects/POManager');
//json->string->js object
const dataSet= JSON.parse(JSON.stringify(require('../utils/testdata_placeorder.json')));

for(const data of dataSet)
{
test(`ClientApp Page test for ${data.productName}`,async ({page})=>
{
const POmanager = new POManager(page);
const cardTitles= page.locator(".card-body b");

const loginpage= POmanager.getLoginPage();
await loginpage.goTo();
await loginpage.validLogin(data.username,data.password);
const dashboardPage= POmanager.getDashboardPage();

await dashboardPage.searchProduct(data.productName);
await dashboardPage.navigatetoCart();

const cartPage= POmanager.getCartPage();
await cartPage.checkoutfromcart();

await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
const orderID= await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
console.log(orderID);

await page.locator("button[routerlink*='myorders']").click();
await page.locator("tbody").waitFor();
const rows= await page.locator("tbody tr");
for(let i=0;i<await rows.count(); ++i)
{
    const rowOrderID= await rows.nth(i).locator("th").textContent();
    if(orderID.includes(rowOrderID))
    {
        await rows.nth(i).locator(".btn.btn-primary").click();
        await page.pause();
        break;
    }
}
const orderIDDetailpage= await page.locator(".col-text").textContent();
await expect(orderID.includes(orderIDDetailpage)).toBeTruthy();
});
}