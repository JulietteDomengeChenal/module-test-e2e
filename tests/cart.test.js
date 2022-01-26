const timeout = 15000;

// Test des fonctionnalités de gestion du panier
describe("Cart features", () => {
    let page;

    test('add to cart', async () => {
        await page.goto(process.env.TESTED_WEBSITE);
        await page.waitForSelector('#user-name');
        await page.type('#user-name', process.env.TEST_LOGIN);
        await page.type('#password', process.env.TEST_PASSWORD);

        // à compléter
        await page.click('#login-button');
        await page.waitForSelector('#inventory_container');
        await page.click('#add-to-cart-sauce-labs-backpack');

        await page.waitForSelector('#shopping_cart_container');
        await page.click('.shopping_cart_link');

        await page.waitForSelector('#cart_contents_container');
        const html = await page.$eval('body', e => e.innerHTML);
        expect(html).toContain("Sauce Labs Backpack");

    }, timeout);


    // cette fonction est lancée avant chaque test de cette série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

});
