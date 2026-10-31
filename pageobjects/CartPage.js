class CartPage
{
    constructor(page)
    {
        this.Cartelement= page.locator("h3:has-text('ZARA COAT 3')");
        this.Checkout = page.locator("text=Checkout");
        this.Country= page.locator("[placeholder*='Country']");
        this.SelectCountry= page.locator(".ta-results");
        this.usernamevalid= page.locator(".user__name [type='text']");
        this.submit=page.locator(".btnn.action__submit");
        this.page= page;
    }

    async checkoutfromcart()
    {
        await this.page.locator("div li").first().waitFor();
        const bool= await this.Cartelement.isVisible();
        await expect(bool).toBeTruthy();

        await this.Checkout.click();
        await this.Country.pressSequentially("ind",{delay:150});
        const dropdown= this.SelectCountry;
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
    expect( await this.usernamevalid.first()).toHaveText(username);
    await this.submit.click();
    }
}
module.exports= {CartPage};