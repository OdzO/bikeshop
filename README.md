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
![AWS diagram](/bikeshop-aws.png?raw=true "AWS diagram")
* __S3__ - Storage for the final build of the Angular application. Accessible online.
* __DynamoDB__ - DB storage for product and site data.
* __Lambda__ - The logic for CRUD operations on the database.
* __API Gateway__ - Provide access to the Lambda function with credential handling (Cognito)
* __Cognito__ - User handling: some actions in the applications only available for users in specific groups (logged in customer, admin). Product data manipulation (create, delete, update) only accessable for admins.

### Development flow
![Dev flow](/bikeshop-devflow.png?raw=true "Dev flow")
- Github with actions
- SonarCloud

