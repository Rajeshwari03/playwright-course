import { expect } from "@playwright/test"

export class Checkout{
    constructor(page){
        this.page=page
        this.basketCards=page.locator('[data-qa="basket-card"]')
        this.basketItemPrice=page.locator('[data-qa="basket-item-price"]')
        this.basketItemRemoveBtn= page.locator('[data-qa="basket-card-remove-item"]')
        this.continueToCheckoutBtn=page.locator('[data-qa="continue-to-checkout"]')
    }
    removeCheapestProduct= async()=> {
        await this.basketCards.first().waitFor()
        await this.basketItemPrice.first().waitFor()
        const itemsBeforeRemoval= await this.basketCards.count()
        const allPriceTexts= await this.basketItemPrice.allInnerTexts()
        const justumbers= allPriceTexts.map((element)=>{
            const withoutDollarSign=element.replace("$","")
            return parseInt(withoutDollarSign, 10)
        })
        const smallestPrice= Math.min(justumbers)
        const smallestPriceIndex= justumbers.indexOf(smallestPrice)
        const specificRemoveBtn=this.basketItemRemoveBtn.nth(smallestPriceIndex)
        await specificRemoveBtn.waitFor()
        await specificRemoveBtn.click()
        await expect(this.basketCards).toHaveCount(itemsBeforeRemoval-1)
        // console.warn({justumbers})
    }
    continueToCheckout= async() =>{
        await this.continueToCheckoutBtn.waitFor()
        await this.continueToCheckoutBtn.click()
        await this.page.waitForURL(/\/login/, {timeout:3000})
    }
}