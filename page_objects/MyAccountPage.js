export class MyAccountPage{
    constructor(page){
        this.page=page;
        this.myAccountHeading = page.locator("h1");
        this.errorMessage= page.locator("[data-qa='error-message]");
    }
    visit = async() =>{
        await this.page.goto("/my-account");

    }
    waitForHeading = async() =>{
        await this.myAccountHeading.waitFor();
    }
    waitForErrorMessage = async()=>{
        await this.errorMessage.waitFor();
    }
}