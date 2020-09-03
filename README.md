# Farmers-Market-App
During the pandemic COVID-19, farmers are no longer able to sell their products and customers are no longer able to buy fresh local food.
You will design:

1. A web application for farmers (React and Angular) to add their products, browse orders, and contact customers when orders are ready for contactless pickup.
2. A mobile application (React Native) for customers to shop for products, and make orders.
3. Backend REST API (NodeJS, MongoDB) to support both applications above.

Web Application Workflow
● Farmers will sign up/sign in before they can use the application.
● Main functionalities are
○ Add, Delete, Update, Retrieve products (as inventory).
○ Orders have 3 status, pending, ready, complete.
○ Farmers can see all orders and filter them by status.
○ Once the order is prepared and ready for pick up, the farmer will
update the order status to ‘ready’, and an automatic email will
be sent to customers with the pick-up date and time.
○ Once the order is picked up, farmers will update the order status
to ‘complete’.


Mobile Application Workflow
● Customers will sign up/sign in before they can use the application.
● Customers can browse all farmers. Farmers should be sorted by
reputation. Check the farmer’s reputation algorithm below.
● Customers can browse all products in the inventory for the selected
farmer.
● Customers can add products from one farmer at a time to their shopping
cart. (An order cannot contain products from more than 1 farmer).
● Customers can check out the shopping cart, then an order should be
created with the status ‘pending’ and update the inventory, an
 automatic email should be sent to both farmer and customer with the
order details.
● Customers can see their orders history and filter by date and status.
● Customers can pick up their orders, and pay the farmers.
● After the order status is changed to ‘complete’, customers may leave an
optional rating and feedback. The rating can be one of three values: excellent, good, and bad.


Farmers Reputation Algorithm

The system generates farmers’ reputation automatically based on customers rating as following:
An excellent rating adds 1 point to the farmer’s reputation score. A bad rating deducts 1 point from the farmer’s reputation score. A good rating does not change the farmer’s reputation score.

Superuser Account

The user collection in the database must have a superuser account. (Role is superuser).
Superuser may log in to the Web Application (similar to farmer’s) and see a dashboard with the following functionalities.
● List all farmers and customers accounts, activates/deactivates and reset their password.
● List all transactions and filter them by date.
● List all requests in the log file. (check the technical details)

Technical Details :-

● All pictures must be uploaded and stored on either Amazon S3 or Google Cloud Storage.
● Use JWT for authentication and authorization.
● You need to follow REST convention to build the server application.
● The backend API documentation contains the following:
○ Entity, HTTP Verb, Request Header and Body, Response Header, and Body (You may use Swagger to generate this API documentation).
● Use Github issue tracking to plan your daily schedule/tasks.
● Use feature branches for each task/issue/feature.
● A daily push is required.
● Deploy the server-side application and the client web application to the Cloud.

● Log all the backend API requests to a file.
