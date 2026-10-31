const {test,expect} = require('@playwright/test');
const { only } = require('node:test');


test('Browser Context Playwright test',async ({browser})=>
{
const context = await browser.newContext();
const page= await context.newPage();
await page.goto("https://rahulshettyacademy.com/")
});

test('Page Playwright test',async ({page})=>
{
const Username=page.locator("#username");
const SignIn=page.locator("[type='submit']");
const cardTitles= page.locator(".card-body a");
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log(await page.title());
//await expect(page).toHaveTitle("Google");
await page.locator("#username").fill("parimala");
await page.locator("[type='password']").fill("Learning@830$3mK2");
await page.locator("[type='submit']").click();
console.log(await page.locator("[style*='block']").textContent());
await expect(page.locator("[style*='block']")).toContainText('Incorrect');
await Username.fill("");
await Username.fill("rahulshettyacademy");
await page.locator("[type='password']").fill("Learning@830$3mK2");

//Dropdowns:
const dropdown= await page.locator("select.form-control");
await dropdown.selectOption("consult");
await page.pause();

//RadioButton
await page.locator(".radiotextsty").last().click();
await page.locator("#okayBtn").click();
await expect(page.locator(".radiotextsty").last()).toBeChecked();

//Checkbox
await page.locator("#terms").click();
await expect(page.locator("#terms")).toBeChecked();
await page.locator("#terms").uncheck();
expect(await page.locator("#terms").isChecked()).toBeFalsy();

//Documentlink
const doclink=page.locator([href*='documents-request']);
await expect(doclink).toHaveAttribute("class","blinkingText");
await SignIn.click();

console.log(await page.locator(".card-body a").nth(0).textContent());
const allTitles=await cardTitles.allTextContents();
console.log(allTitles);

});

test('@Child Window Handle',async ({browser})=>
{
const context = await browser.newContext();
const page= await context.newPage();
const Username=page.locator("#username");
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const doclink=page.locator("[href*='documents-request']");

const [newPage]= await Promise.all(
[context.waitForEvent('page'),//listen for any new page pending, rejected, fulfilled
await doclink.click(),// new page is opened
]) // it will keep on executing the array of promises until the promises are fulfilled.

//Split the text
const text= await newPage.locator(".red").textContent();
console.log(text);
const arrayText= text.split("@");
const domain=arrayText[1].split(" ")[0];
console.log(domain);

//move back to original browser
await Username.fill(domain);
await page.pause();
}



)