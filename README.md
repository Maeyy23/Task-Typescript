This is a project to show the transaction process from creating a transaction to cancelling or asking for a refund.

Step 1, clone this project using https://github.com/Maeyy23/Task-Typescript.git

Step 2, install the dependencies and dev dependencies using npm install

Step 3, run the project using "npm" or "yarn" run dev

Step 4, add an .env file "PORT" and "MONGO_URI" as shown in the env.example

Step 5, there are 6 endpoint
i. create a customer in the database using the endpoint http://localhost:5002/api/create-user and req.body {
"name":"",
"email": "",
"address": ""
} POST

ii. create a service in the database using the endpoint http://localhost:5002/api/create-service and req.body {
"nameOfService": "",
"description": "",
"price": number
} POST

iii. create a transaction using the endpoint http://localhost:5002/api/create and req.body{
"customerId": "",
"serviceId": "",
"amount": number
} POST

iv: cancel an order using the endpoint http://localhost:5002/api/cancel/:transactionId PUT

v: refund using this endpoint http://localhost:5002/api/refund/:transactionId PUT

vi: get all Transactions using the endpoint http://localhost:5002/api/transactions GET
