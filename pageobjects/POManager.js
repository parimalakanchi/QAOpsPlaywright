const {Loginpage } = require("./Loginpage");
const {DashboardPage} = require("./DashboardPage");
const {CartPage} = require("./CartPage");

class POManager
{
    constructor(page)
    {
        this.loginPage = new Loginpage(page);
        this.dashboardPage = new DashboardPage(page);
        this.cartPage= new CartPage(page);
        this.page= page;
    }

getLoginPage()
{
    return this.loginPage;
}

getDashboardPage()
{
    return this.dashboardPage;
}

getCartPage()
{
    return this.cartPage;
}
}
module.exports = {POManager};