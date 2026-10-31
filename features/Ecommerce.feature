Feature: Ecommerce validations

Scenario: Placing the Order
    Given a login to Ecommerce application with "john.paul@gmail.com" and "Learning@1"
    When Add "Zara Coat 3" to Cart
    Then Verify "Zara Coat 3" is displayed in the Cart
    When Enter valid details and Place the Order
    Then Verify order in present in the OrderHistory