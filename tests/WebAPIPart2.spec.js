const {test,expect} = require('@playwright/test');
let WebContext;
test.beforeAll(async({browser})=>
{
const context = await browser.newContext();
const page = await context.newPage();
const email= "john.paul@gmail.com";
await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
await page.locator("#userEmail").fill(email);
await page.locator("#userPassword").fill("Learning@1");
await page.locator("#login").click();

await page.waitForLoadState('networkidle'); // Wait till all network calls are idle
await context.storageState({path: 'state.json'});
WebContext= await browser.newContext({storageState:'state.json'});

})

test('ClientApp Page test',async ()=>
{
const page= await WebContext.newPage();
await page.goto("https://rahulshettyacademy.com/client");
const email= "john.paul@gmail.com";
const productName="ZARA COAT 3";
const cardTitles= page.locator(".card-body b");
const products= page.locator(".card-body");
await products.first().waitFor();
const allTitles= await cardTitles.allTextContents();
console.log(allTitles);

const count= await products.count();
for( let i=0; i <count; ++i)
{
    if(await products.nth(i).locator("b").textContent()==productName)
    {
        // add to cart
        await products.nth(i).locator("text=Add To Cart").click();
        break;
    }
}
await page.locator("[routerlink*='cart']").click();
await page.locator("div li").first().waitFor();
const bool= await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
await expect(bool).toBeTruthy();

await page.locator("text=Checkout").click();
page.locator("[placeholder*='Country']").pressSequentially("ind",{delay:150});
const dropdown= page.locator(".ta-results");
await dropdown.waitFor();
const optionscount= await dropdown.locator("button").count();
for(let i =0; i<optionscount; ++i)
{
    const text = await dropdown.locator("button").nth(i).textContent();
    console.log(text);
    if(text===" India")
    {
        await dropdown.locator("button").nth(i).click();
        break;
    }
}
expect( await page.locator(".user__name [type='text']").first()).toHaveText(email);
await page.locator(".btnn.action__submit").click();
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