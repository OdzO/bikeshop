# Bike Shop

This is a home project to learn and demo how a simple webshop can be built with Angular as frontend, AWS as backend and integrate developer tools like Github and SonarCloud.

[Demo page](http://odzo-bikeshop.s3-website.us-east-2.amazonaws.com/ "Demo page")

## Features

### Basic webshop
- List products (dynamic filtering)
- Manage cart

### User handling with AWS Cognito
- Guest customer (without login)
- Customer sign up and login
- Admin user (edit product data)

### CRUD actions on products for admins
- Create/update/delete products on the UI

## Structure

### Angular (frontend)
- Angular Material
- Documentation: generate with command `$ npm run compodoc`

### AWS (backend)
![AWS diagram](/documentation/images/bikeshop-aws.png?raw=true "AWS diagram")
* S3 - Storage for the final build of the Angular application. Accessible online.
* DynamoDB - DB storage for product and site data.
* Lambda - The logic for CRUD operations on the database.
* API Gateway - Provide access to the Lambda function with credential handling (Cognito)
* Cognito - User handling: some actions in the applications only available for users in specific groups (logged in customer, admin). Product data manipulation (create, delete, update) only accessable for admins.

### Development flow
![Dev flow](/documentation/images/bikeshop-devflow.png?raw=true "Dev flow")
- Github with actions
- SonarCloud

