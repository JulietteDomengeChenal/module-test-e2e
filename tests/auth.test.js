const timeout = 10000;

// Test des fonctionnalités d'authentification
describe("Auth features", () => {
    let page;

    test('login and logout', async () => {
        await page.goto(process.env.TESTED_WEBSITE);
        await page.waitForSelector('#user-name');
        await page.type('#user-name', process.env.TEST_LOGIN);
        await page.type('#password', process.env.TEST_PASSWORD);

        // à compléter
        await page.click('#login-button');
        await page.waitForSelector('#inventory_container');
        const html = await page.$eval('body', e => e.innerHTML);
        expect(html).toContain("Products");

    }, timeout);

    // cette fonction est lancée avant chaque test de cette série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

});
