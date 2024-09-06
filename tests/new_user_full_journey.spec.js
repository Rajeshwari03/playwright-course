import {test} from "@playwright/test"
import {ProductsPage} from "./../page_objects/ProductsPage.js"
import { Navigation } from "./../page_objects/Navigation.js"
import { Checkout } from "./../page_objects/Checkout.js"
import {LoginPage} from "../page_objects/LoginPage.js"
import { RegisterPage } from "../page_objects/RegisterPage.js"
import {v4 as uuidv4} from 'uuid'
import { DelieveryDetails } from "../page_objects/DelieveryDetails.js"
import { delieveryDetails as userAddress } from "../data/delieveryDetails.js"
import { Payment } from "../page_objects/Payment.js"
import { paymentDetails } from "../data/paymentDetails.js" 

test("New User full shopping journey", async ({page})=>{
    const productsPage=new ProductsPage(page);
    await productsPage.visit();
    await productsPage.sortByCheapest();
    await productsPage.addProductTobasket(0);
    await productsPage.addProductTobasket(1);
    await productsPage.addProductTobasket(2);

    const navigation= new Navigation(page);
    await navigation.goToCheckout();

    const checkout= new Checkout(page);
    await checkout.removeCheapestProduct();
    await checkout.continueToCheckout();
    
    const loginPage= new LoginPage(page);
    await loginPage.goToRegister();

    const registerPage= new RegisterPage(page);
    const emailId= uuidv4() + "@gamil.com";
    const password= uuidv4();
    await registerPage.registerAsNewUser(emailId, password);
    
    const delieveryDetails = new DelieveryDetails(page);
    await delieveryDetails.fillDetails(userAddress);
    await delieveryDetails.saveDetails();
    await delieveryDetails.continueToPayment();

    const payment= new Payment(page);
    await payment.activateDiscount();
    await payment.fillPaymentDetails(paymentDetails);
    await payment.completePayment();
})