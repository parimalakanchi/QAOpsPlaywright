class DashboardPage{

    constructor(page)
    {
        this.products= page.locator(".card-body");
        this.productsText= page.locator(".card-body b");
        this.cart= page.locator("[routerlink*='cart']");
        this.page=page;
    }

    async searchProduct(productName)
    {
        const titles= await this.productsText.allTextContents();
        console.log(titles);
        
        const count= await this.products.count();
        for( let i=0; i <count; ++i)
        {
            if(await this.products.nth(i).locator("b").textContent()==productName)
            {
                // add to cart
                this.page.console(productName);
                await this.products.nth(i).locator("text=Add To Cart").click();
                await this.page.pause();
                break;
            }
        }
    }   

    async navigatetoCart()
    {
        await this.cart.click();
    }
    
}
module.exports= {DashboardPage};