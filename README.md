# Bike Shop

This is a home project to learn and demo how a simple webshop can be built with Angular as frontend, AWS as backend and integrate developer tools like Github and SonarCloud.

## Features

### Basic webshop
- List products (dynamic filtering)
- Manage cart

### User handling with AWS Cognito
- Guest customer (without login)
- Customer sign up and login
- Admin user (edit product data)

### CRUD actions on products for admins
- 

## Structure

### Angular (frontend)
- Angular Material
- Documentation generated

### AWS (backend)
![Employee data](/documentation/images/bikeshop-aws.png?raw=true "AWS diagram")
- S3
Storage for the final build of the Angular application. Accessible online.
- DynamoDB
DB storage for product and site data.
- Lambda
The logic for CRUD operations on the database.
- API Gateway
Provide access to the Lambda function with credential handling (Cognito)
- Cognito
User handling: some actions in the applications only available for users in specific groups (logged in customer, admin). Product data manipulation (create, delete, update) only accessable for admins.

### Development flow
- Github with actions
- SonarCloud
- Compodoc

