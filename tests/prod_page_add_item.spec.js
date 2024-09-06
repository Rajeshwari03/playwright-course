import {test, expect} from "@playwright/test";

test.skip("Product Page Add To Basket", async ({page})=>{
     await page.goto("/")  //baseURL is present in playwright.config.js file
     // await page.pause();
     const addToBasketButton=page.locator('[data-qa="product-button"]').first()
     const basketCounter=page.locator('[data-qa="header-basket-count"]')
     const checkoutButton=page.getByRole('link', { name: 'Checkout' })
     
     await addToBasketButton.waitFor()
     await expect(addToBasketButton).toHaveText("Add to Basket")
     await expect(basketCounter).toHaveText("0")

     await addToBasketButton.click();

     await expect(basketCounter).toHaveText("1")
     await expect(addToBasketButton).toHaveText("Remove from Basket")
   
     await checkoutButton.waitFor()
     await checkoutButton.click()
     await page.waitForURL("/basket")


    



})