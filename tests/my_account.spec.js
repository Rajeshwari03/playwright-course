import * as dotenv from "dotenv"
dotenv.config()
import {test} from '@playwright/test';
import {MyAccountPage} from './../page_objects/MyAccountPage.js';
import { getLoginToken } from "../api-calls/getLoginToken";
import { adminDetails } from '../data/userDetails.js';

test.skip("My Account Login using cokkie injection and Mocking Network Request", async({page}) =>{
    const loginToken= await getLoginToken(adminDetails.username, adminDetails.password);
    await page.route("**/api/address**", async()=>{
        await route.fulfill({
            status: 500,
            ContentType : "appliaction/json",
            body : JSON.stringify({message:"PLAYWRIGHT ERRROR FROM MOCKING"}),
        })
    })
    const myAccount= new MyAccountPage(page);
    await myAccount.visit();
    await page.evaluate(([loginTokenInsideBrowserCode])=>{
        document.cookie= "token="+ loginTokenInsideBrowserCode;
    }, [loginToken]);
    await myAccount.waitForHeading();
    await myAccount.waitForErrorMessage();
    
})