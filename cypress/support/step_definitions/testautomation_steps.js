import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const productName = 'Light Spotted Tabby Cat'
const itemPriceWithCurrency= '$300.00';
const cartTotalPriceWithCurrency= '$900.00';
const addToCartRequest = '**/cart.js';

Given("I am on the store homepage", () => {
    cy.visit("https://testautomation.bigcartel.com/");
    //cy.screenshot();
});

Given("I am on the product page for {string}", (productName) => {
    cy.visit(`https://testautomation.bigcartel.com/product/${productName.toLowerCase().replace(" ", "-")}`);
});

When("I search for {string}", (searchTerm) => {
    cy.get("#below-header-search-input").type(`${searchTerm}{enter}`);
});

Then("I should see search results", () => {
    cy.url().should('contain', '&search=Tabby+Cat')
    cy.wait(300)
    cy.contains('Dark Spotted Tabby Cat')
    cy.contains(productName)
    //cy.screenshot();
});

When("I click on the first product in the results", () => {
    cy.contains(productName).click()
    cy.wait(300)
});

When("I add it to the cart", () => {
    cy.intercept('POST', '**/cart.js').as('addToCart');
    cy.get('.button-add-text').click();
    cy.wait('@addToCart').its('response.statusCode').should('eq', 200);
});

Then("I should be on the product page for {string}", (productName) => {
    cy.url().should('contain', '/product/white-tabby-cat')
    cy.contains('Model Name: Indi')
    cy.contains(productName)
    cy.get('div.page-subheading-price').contains('300.00')
    //cy.screenshot();
});

When("I select the color {string}", (color) => {
    cy.get('#option_group_5888110').select('30861526');
});

When("I select the age {string}", (age) => {
    cy.get('#option_group_5888113').select('30861541');
});

When("I increase the quantity to {int}", (quantity) => {
    cy.get('#quantity').clear('3');
    cy.get('#quantity').type('3');
});

Then("the selected color should be {string}", (color) => {
    cy.get('#option_group_5888110').should('have.id', 'option_group_5888110');
});

Then("the selected age should be {string}", (age) => {
    cy.get('#option_group_5888113').should('have.id', 'option_group_5888113');
});

Then("the quantity should be {int}", (quantity) => {
    cy.get('#quantity').should('have.value', '3');
});

Then("the cart total should be {string}", (quantity) => {
    cy.get('.header-cart-total').should('have.text', cartTotalPriceWithCurrency);
});

Then("the cart total items count should be {int}", (quantity) => {
    cy.get('#quantity').should('have.value', '3');
    //cy.screenshot();
});

When("I add the item to the cart", () => {
    cy.get(".add-to-cart-button").click();
});

When("I proceed to the cart", () => {
    cy.intercept('GET', '**/cart').as('viewCart');
    cy.get('.product-form-cart-link-text').click();
    cy.wait('@viewCart').its('response.statusCode').should('eq', 200);
    cy.wait(1000);
    cy.url().should('contain', '/cart')
    cy.get('.page-title').should('have.text', 'Cart');
});

Then("the cart page should contain the product details: {string}, {string}, {string}, {int}, {string} with sub total {string}", (productName, color, age, quantity) => {
    cy.url().should('contain', '/cart');
    cy.get('.page-title').should('have.text', 'Cart');
    cy.get('.header-cart-count').should('have.text', '3');
    cy.get('.header-cart-total').should('have.text', cartTotalPriceWithCurrency);
    cy.get('.cart-item-details-name').should('have.text', productName);
    cy.get('.cart-item-details-option').should('have.text', 'Colour: White / Age: 4YRS');
    cy.get('.cart-item-details-unit-price-inline').should('have.text', itemPriceWithCurrency);
    cy.get('#item_369374479_qty').should('have.value', '3');
    cy.get('.cart-item-details-price').should('have.text', cartTotalPriceWithCurrency);
    cy.get('.cart-subtotal-amount').should('have.text', cartTotalPriceWithCurrency);
    //cy.screenshot();
});

Then("the cart page should contain page elements to continue shopping, provide the sub total and to continue the checkout", () => {
    cy.url().should('contain', '/cart')
    cy.get('.page-title').should('have.text', 'Cart');
    cy.get('.cart-sub-footer > .icon-link').should('have.text', '\n            \n          Continue shopping\n          ');
    cy.get('.cart-subtotal-label').should('have.text', 'Subtotal');
    cy.get('.cart-subtotal-amount').should('have.text', cartTotalPriceWithCurrency);
    cy.get('.cart-footer > .button').should('have.class', 'checkout-button');
    //cy.screenshot();
});

When("product {string} with color {string} with age {string} and quantity {int} is added to the cart", (productName, color, age, quantity) => {
    cy.get('#option_group_5888110').select('30861526');
    cy.wait(500);
    cy.get('#option_group_5888113').select('30861541');
    cy.wait(500);
    cy.get('#quantity').clear('3');
    cy.get('#quantity').type('3');
    cy.wait(500);
    cy.intercept('POST', '**/cart.js').as('addToCart');
    cy.get('.button-add-text').click();
    cy.wait('@addToCart').its('response.statusCode').should('eq', 200);
    cy.wait(500);
    cy.get('.header-cart-total').should('have.text', cartTotalPriceWithCurrency);
    cy.wait(500);
    cy.get('#quantity').should('have.value', '3');
    //cy.screenshot();
});

When("{string} with {string} with {string} and {int} is added to the cart", (productName, color, age, quantity) => {
    cy.get('#option_group_5888110').select('30861526');
    cy.wait(500);
    cy.get('#option_group_5888113').select('30861541');
    cy.wait(500);
    cy.get('#quantity').clear('3');
    cy.get('#quantity').type('3');
    cy.wait(500);
    //cy.screenshot();
    cy.intercept('POST', '**/cart.js').as('addToCart');
    cy.get('.button-add-text').click();
    cy.wait('@addToCart').its('response.statusCode').should('eq', 200);
    cy.wait(500);
    cy.get('.header-cart-total').should('have.text', cartTotalPriceWithCurrency);
    cy.wait(500);
    cy.get('#quantity').should('have.value', '3');
    //cy.screenshot();
});

When("I continue to the checkout", () => {
    cy.get('.cart-footer > .checkout-button').click();
});

Then("The checkout proceeds to the checkout page", () => {
    cy.url().should('contain', '/checkout/')
    cy.get('h1').should('have.text', 'We’re not set up to take payments.');
    //cy.screenshot();
});

When("I navigate to the contact page", () => {
    cy.contains('Contact').click()
});

Then("I see the contact form", () => {
    cy.url().should('eq','https://testautomation.bigcartel.com/contact')
    cy.get('.page-title').should('have.text', 'Contact');
    cy.get(':nth-child(1) > .form-label').should('have.text', 'Name');
    cy.get(':nth-child(2) > .form-label').should('have.text', 'Email');
    cy.get(':nth-child(3) > .form-label').should('have.text', 'Subject');
    cy.get('.contact-textarea-group > .form-label').should('have.text', 'Message');
    cy.get('.recaptcha-note').should('have.text', '.grecaptcha-badge { visibility: hidden; }Protected by reCAPTCHA. Google\'s Privacy Policy and Terms of Service apply.');
    cy.get('.contact-send > .button').should('have.class', 'send-message-button');
});

When('I submit the contact form', function () {
    cy.get('.contact-send > .button').click();
});

When(/^I fill the contact form with (.*), (.*), (.*), (.*)$/, function (Name, Email, Subject, Message ) {
    cy.get('#name').type(Name);
    cy.get('#email').type(Email);
    cy.get('#subject').type(Subject);
    cy.get('#message').type(Message);
    cy.get('#name').should('have.value', Name);
    cy.get('#email').should('have.value', Email);
    cy.get('#subject').should('have.value', Subject);
    cy.get('#message').should('have.value', Message);
    //cy.screenshot();
});

Then('I see a recaptcha to complete', function () {
    //cy.screenshot();
    cy.get('[style="width: 100%; height: 100%; position: fixed; top: 0px; left: 0px; z-index: 2000000000; background-color: rgb(255, 255, 255); opacity: 0.5;"]').should('have.attr', 'style', 'width: 100%; height: 100%; position: fixed; top: 0px; left: 0px; z-index: 2000000000; background-color: rgb(255, 255, 255); opacity: 0.5;');
});
