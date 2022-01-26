const timeout = 10000;

// Test des fonctionnalités de prise de commande
describe("Checkout process", () => {
    let page;

    test('checkout', async () => {
        await page.goto(process.env.TESTED_WEBSITE);
        await page.waitForSelector('#user-name');
        await page.type('#user-name', process.env.TEST_LOGIN);
        await page.type('#password', process.env.TEST_PASSWORD);

        // à compléter
        await page.click('#login-button');
        await page.waitForSelector('#inventory_container');

        await page.click('#react-burger-menu-btn');
        await page.waitForSelector('.bm-menu-wrap', {hidden: false});
        await page.waitForSelector('#logout_sidebar_link');
        const button = await page.$('#logout_sidebar_link');
        await button.evaluate(b => b.click());

        await page.waitForSelector('#user-name');
        const html = await page.$eval('body', e => e.innerHTML);
        expect(html).toContain("Password for all users");


    }, timeout);

    // cette fonction est lancée avant chaque test de cette série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

});
