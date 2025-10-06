Feature: Cypress Test POC ➝ Contact and Checkout flow

  Scenario Outline: Submit a contact enquiry ➝ triggers recaptcha
    Given I am on the store homepage
    When I navigate to the contact page
    Then I see the contact form
    When I fill the contact form with <Name>, <Email>, <Subject>, <Message>
    And I submit the contact form
    Then I see a recaptcha to complete
    Examples:
      | Name  | Email           | Subject                      | Message                |
      | Obvio | obvio@obvio.biz | Test contact message subject | This is a test message |

  Scenario: Search for an item ➝ view the product
    Given I am on the store homepage
    When I search for "Tabby Cat"
    Then I should see search results
    When I click on the first product in the results
    Then I should be on the product page for "Light Spotted Tabby Cat"

  Scenario: Choose options on the product page ➝ add to the cart
    Given I am on the product page for "White-tabby-cat"
    When I select the color "Colour: White"
    And I select the age "Age: 4YRS"
    And I increase the quantity to 3
    And I add it to the cart
    Then the selected color should be "Colour: White"
    And the selected age should be "Age: 4YRS"
    And the quantity should be 3
    And the cart total should be '$900.00'
    And the cart total items count should be 3

  Scenario Outline: Choose options on the product page ➝ add to the cart
    Given I am on the product page for <Product>
    When I select the color <color>
    And I select the age <age>
    And I increase the quantity to <quantity>
    And I add it to the cart
    Then the selected color should be <color>
    And the selected age should be <age>
    And the quantity should be <quantity>
    And the cart total should be <cartTotal>
    And the cart total items count should be <quantity>
    Examples:
      | Product           | color           | age         | quantity | cartTotal |
      | "White-tabby-cat" | "Colour: White" | "Age: 4YRS" | 3        | '$900.00' |

  Scenario: Add item to cart ➝ continue to cart ➝ verify cart details ➝ continue the checkout
    Given I am on the product page for "White-tabby-cat"
    And product "White-tabby-cat" with color "Colour: White" with age "Age: 4YRS" and quantity 3 is added to the cart
    When I proceed to the cart
    Then the cart page should contain the product details: "Light Spotted Tabby Cat", "Colour: White", "Age: 4YRS", 3, '$300.00' with sub total '$900.00'
    When I continue to the checkout
    Then The checkout proceeds to the checkout page

  Scenario Outline: Add item to cart ➝ continue to cart ➝ verify cart details ➝ continue the checkout
    Given I am on the product page for <Product>
    And <Product> with <color> with <age> and <quantity> is added to the cart
    When I proceed to the cart
    Then the cart page should contain the product details: <itemName>, <color>, <age>, <quantity>, <itemPrice> with sub total <subTotal>
    And the cart page should contain page elements to continue shopping, provide the sub total and to continue the checkout
    When I continue to the checkout
    Then The checkout proceeds to the checkout page
    Examples:
      | Product           | color           | age         | quantity | itemName                  | itemPrice | subTotal  |
      | "White-tabby-cat" | "Colour: White" | "Age: 4YRS" | 3        | "Light Spotted Tabby Cat" | '$300.00' | '$900.00' |
