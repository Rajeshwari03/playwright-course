import { expect } from "@playwright/test";

export class DelieveryDetails{
    constructor(page){
        this.page=page;
        this.firstNameInput= page.locator('[data-qa="delivery-first-name"]');
        this.lastNameInput= page.locator('[data-qa="delivery-last-name"]');
        this.streetInput= page.locator('[data-qa="delivery-address-street"]');
        this.postcodeInput= page.locator('[data-qa="delivery-postcode"]');
        this.cityInput= page.locator('[data-qa="delivery-city"]');
        this.countryDropdown= page.locator('[data-qa="country-dropdown"]');
        this.saveAddressButton= page.locator('[data-qa="save-address-button"]');
        this.savedAddressContainer= page.locator('[data-qa="saved-address-container"]');
        this.savedAddresFirstName=page.locator('[data-qa="saved-address-firstName"]');
        this.savedAddressLastName=page.locator('[data-qa="saved-address-lastName"]');
        this.savedAddressStreetName=page.locator('[data-qa="saved-address-street"]');
        this.savedAddressPostCode=page.locator('[data-qa="saved-address-postcode"]');
        this.savedAddressCityName=page.locator('[data-qa="saved-address-city"]');
        this.savedAddressCountryName=page.locator('[data-qa="saved-address-country"]');
        this.cotinueToPaymentButton= page.locator('[data-qa="continue-to-payment-button"]');
    }
    fillDetails= async(userAddress) =>{
        // await this.page.pause();
        await this.firstNameInput.waitFor();
        await this.firstNameInput.fill(userAddress.first_name);
        await this.lastNameInput.waitFor();
        await this.lastNameInput.fill(userAddress.last_name);
        await this.streetInput.waitFor();
        await this.streetInput.fill(userAddress.street_name);
        await this.postcodeInput.waitFor();
        await this.postcodeInput.fill(userAddress.postcode);
        await this.cityInput.waitFor();
        await this.cityInput.fill(userAddress.city_name);
        await this.countryDropdown.waitFor();
        await this.countryDropdown.selectOption(userAddress.country_name);
    }

    saveDetails= async() =>{
        const beforeClickingSaveButton= await this.savedAddressContainer.count();
        await this.saveAddressButton.waitFor();
        await this.saveAddressButton.click();
        await this.savedAddressContainer.waitFor();
        expect(await this.savedAddressContainer).toHaveCount(beforeClickingSaveButton + 1);
        await this.savedAddresFirstName.first().waitFor();
        expect(await this.firstNameInput.inputValue()).toBe(await this.savedAddresFirstName.innerText());
        expect(await this.lastNameInput.inputValue()).toBe(await this.savedAddressLastName.innerText());
        expect(await this.streetInput.inputValue()).toBe(await this.savedAddressStreetName.innerText());
        expect(await this.postcodeInput.inputValue()).toBe(await this.savedAddressPostCode.innerText());
        expect(await this.cityInput.inputValue()).toBe(await this.savedAddressCityName.innerText());
        expect(await this.countryDropdown.inputValue()).toBe(await this.savedAddressCountryName.innerText());
    }

    continueToPayment= async() =>{
        await this.cotinueToPaymentButton.waitFor();
        await this.cotinueToPaymentButton.click();
        await this.page.waitForURL(/\/payment/, {timeout: 3000});
    }
}