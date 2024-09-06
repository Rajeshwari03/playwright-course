import { expect } from "@playwright/test";
import { timeout } from "../playwright.config";

export class Payment{
    constructor(page){
        this.page=page;
        this.discountCode=page.frameLocator('[data-qa="active-discount-container"]')
                                .locator('[data-qa="discount-code"]');
        this.discountCodeInput= page.locator('[data-qa="discount-code-input"]');
        this.activateDiscountButton= page.locator('[data-qa="submit-discount-button"]');
        this.discoutActiveMessage=page.locator('[data-qa="discount-active-message"]');
        this.actualPriceWithDollar=page.locator('[data-qa="total-value"]');
        this.discountedPrice=page.locator('[data-qa="total-with-discount-value"]');
        this.cardOwnerInput= page.locator('[data-qa="credit-card-owner"]');
        this.cardNumberInput= page.locator('[data-qa="credit-card-number"]');
        this.validityInput= page.locator('[data-qa="valid-until"]');
        this.cvvInput= page.locator('[data-qa="credit-card-cvc"]');
        this.payButton= page.locator('[data-qa="pay-button"]');
    }
    activateDiscount= async() =>{
        const code= await this.discountCode.innerText();
        //option1 for laggy inputs
        await this.discountCodeInput.fill(code);
        await expect(this.discountCodeInput).toHaveValue(code);

        //option2 for laggy inputs, but need to change timeout in playeright.config.js file
        // await this.discountCodeInput.focus();
        // await this.page.keyboard.type(code, {delay: 500});
        // expect(await this.discountCodeInput.inputValue()).toBe(code);
        // await this.page.pause();
        expect(await this.discountedPrice.isVisible()).toBe(false);
        expect(await this.discoutActiveMessage.isVisible()).toBe(false);
        await this.activateDiscountButton.waitFor();
        await this.activateDiscountButton.click();
        await this.discoutActiveMessage.waitFor();
        // expect(this.discoutActiveMessage).toHaveText("Discount activated!");
        await this.discountedPrice.waitFor();
        const actaulPriceText= await this.actualPriceWithDollar.innerText();
        const actualPriceInString= actaulPriceText.replace("$","");
        const actualPriceInNumber= parseInt(actualPriceInString, 10);

        const discountPriceText= await this.discountedPrice.innerText()
        const discountPriceInString= discountPriceText.replace("$","");
        const discountPriceInNumber= parseInt(discountPriceInString, 10);
        expect(discountPriceInNumber).toBeLessThan(actualPriceInNumber);        
    }

    fillPaymentDetails = async(paymentDetails) => {
        await this.cardOwnerInput.waitFor();
        await this.cardOwnerInput.fill(paymentDetails.cardOwner);
        await this.cardNumberInput.fill(paymentDetails.cardNumber);
        await this.validityInput.fill(paymentDetails.validity);
        await this.cvvInput.fill(paymentDetails.cvv);
        
        // await this.page.pause();
    }
    completePayment = async() => {
        await this.payButton.waitFor();
        await this.payButton.click();
        await this.page.waitForURL(/\/thank-you/, {timeout: 3000});
    }
}