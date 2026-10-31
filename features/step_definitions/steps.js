const { Given, When, Then } = require('@cucumber/cucumber')
const {POManager}= require('../pageobjects/POManager');
const {test, expect, playwright} = require('@playwright/test');

Given('a login to Ecommerce application with {string} and {string}', async function (string, string2) {
const browser = await playwright.chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();
const POmanager = new POManager(page);
const loginpage= POmanager.getLoginPage();
await loginpage.goTo();
await loginpage.validLogin(data.username,data.password);
});
When('Add {string} to Cart', function (string) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('Verify {string} is displayed in the Cart', function (string) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When('Enter valid details and Place the Order', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('Verify order in present in the OrderHistory', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});