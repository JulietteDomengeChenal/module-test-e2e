const timeout = 15000;


describe("Auth features", () => {
    let page;

    test('login and logout', async () => {
        await page.goto(process.env.TESTED_WEBSITE);
        await page.waitForSelector('#user-name');
        await page.type('#user-name', process.env.TEST_LOGIN);
        await page.type('#password', process.env.TEST_PASSWORD);
        await page.click('#login-button');

        // à compléter
        await page.click('#header_container > div.header_secondary_container > div.right_component > span > select');
        await page.waitFor(1000);
        await page.screenshot({path: './tests/img/menu_tri.png'});
        await page.waitForSelector('#header_container > div.header_secondary_container > div.right_component > span > select > option:nth-child(3)');
        await page.select('#header_container > div.header_secondary_container > div.right_component > span > select', 'lohi');
        await page.screenshot({path: './tests/img/tri.png'});
        const array = await page.$$eval(".inventory_item_price", e => e.map((t)=> parseFloat(t.innerHTML.substr(1))));

        //***************** Code avec boucle for avant refactoring *************************
        // for(let i=1;i<7;i++){
        //     const text = await page.$eval("#inventory_container > div > div:nth-child( "+ i +") > div.inventory_item_description > div.pricebar > div", e => e.innerHTML);
        //     let newtext = text.substr(1)
        //     let number =  parseFloat(newtext)
        //     array.push(number);
        // }

        let isSorted = true
        for(let i=0;i<array.length-1;i++){
            if(array[i]>array[i+1]){
                isSorted = false
            }
        }
        //console.log(array);
        await page.screenshot({path: './tests/img/tri2.png'});
        expect(isSorted).toBe(true)

    }, timeout);


    beforeAll(async () => {
        page = await global.__BROWSER__.newPage()
    }, timeout)

});
