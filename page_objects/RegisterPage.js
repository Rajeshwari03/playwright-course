export class RegisterPage{
    constructor(page){
        this.page=page;
        this.emailInput= page.locator('[placeholder="E-Mail"]');
        this.passwordInput= page.locator('[placeholder="Password"]');
        this.submitForm=page.locator('[type="submit"]');
    }
    registerAsNewUser= async(email, password) =>{
        await this.emailInput.waitFor();
        await this.emailInput.fill(email);
        await this.passwordInput.waitFor();        
        await this.passwordInput.fill(password);
        await this.submitForm.waitFor();
        await this.submitForm.click();
        // await this.page.pause();
    }
}