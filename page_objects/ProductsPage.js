import {expect} from '@playwright/test'
import { Navigation } from './Navigation.js';
import { isDesktopViewport } from '../utils/isDesktopView.js';

export class ProductsPage{
    constructor(page){
        this.page=page
        this.addButtons=this.page.locator('[data-qa="product-button"]')
        this.sortDropdown=this.page.locator('[data-qa="sort-dropdown"]')
        this.productTitles=this.page.locator('[data-qa="product-title"]')
    } 

    visit =async()=>{
        await this.page.goto("/")
    }
   
    addProductTobasket= async(index)=>{
        const specificAddButton=this.addButtons.nth(index)
        await specificAddButton.waitFor()
        expect(specificAddButton).toHaveText("Add to Basket")
        const navigation=new Navigation(this.page);
        let counterBeforeAdding;
        if (isDesktopViewport(this.page)) {
            counterBeforeAdding=await navigation.getBasketCount();
        }
        await specificAddButton.click();
        expect(specificAddButton).toHaveText("Remove from Basket");
        if (isDesktopViewport(this.page)) {
            const counterAfterAdding=await navigation.getBasketCount();
            expect(counterAfterAdding).toBeGreaterThan(counterBeforeAdding);
        }
        
        
    }
    sortByCheapest = async() => {
        await this.sortDropdown.waitFor()
        await this.productTitles.first().waitFor()
        const productTitlesBeforeSorting =await this.productTitles.allInnerTexts()
        await this.sortDropdown.selectOption("price-asc")
        const productTitlesAfterSorting =await this.productTitles.allInnerTexts()
        expect(productTitlesBeforeSorting).not.toEqual(productTitlesAfterSorting)

    }
}