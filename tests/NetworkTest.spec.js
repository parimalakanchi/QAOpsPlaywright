const {test,expect, request} = require('@playwright/test');
const {APIUtils}= require('./utils/APIUtils');
const { only } = require('node:test');
let token;
let orderID;
const loginPayload= {userEmail: "john.paul@gmail.com", userPassword: "Learning@1"};
const orderPayLoad={orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
const fakePayLoadOrders = {data:[],message:"No Orders"};

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

await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6abcfaea2be7a4bc2b7d1b5d");
async route=>
{
    //intercepting response -API response ->{playwright fakeresponse}browser -> render data on front end
    const response = await page.request.fetch(route.request());
    let body= JSON.stringify(fakePayLoadOrders);
    route.fulfill(
        {
            response,
            body,
        }
    );
}

await page.locator("button[routerlink*='myorders']").click();

await page.pause();
});