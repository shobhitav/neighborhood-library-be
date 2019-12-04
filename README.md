# API Documentation

#### Backend delpoyed to Heroku (https://muovivlio.herokuapp.com/)

## Getting started

To get the server running locally:

- Clone this repo
- **yarn install** to install all required dependencies
- **yarn server** to start the local server
- **yarn test** to start server using testing environment

### Backend framework goes here

🚫 Why did you choose this framework?

-    Point One
-    Point Two
-    Point Three
-    Point Four

## Endpoints

#### User Routes
API prefix: `/api/users`

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/:id`                | admins, logged in user  | Returns user info.                     |
| POST   | `/`                   | admins, logged in user  | Updates user information.              |
| PUT    | `/:id`                | admins, logged in user  | Returns info for a single user.        |
| DELETE | `/:id`                | admins, logged in user  | Delete user.                           |

#### Lender Routes
API prefix: `/api/lender-collection`

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/:lender-id`           | admins, logged in user  | Returns books added by lender.                     |
| POST   | `/`                     | admins, logged in user  | Adds book record for lender.                       |
| PUT    | `/:id`                  | admins, logged in user  | Updates if book is available.                      |
| DELETE | `/:id`                  | admins, logged in user  | Deletes book record for lender.                    |
#### Borrower Routes
API prefix: `/api/borrower-wishlist`

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/:borrower_id`         | admins, logged in user  | Returns wishlisted books added by borrow.        |
| POST   | `/`                     | admins, logged in user  | Adds book record to borrower wishlist.         |
| PUT    | `/:id`                  | admins, logged in user  | Updates book request status for borrow record.    |
| DELETE | `/:id`                  | admins, logged in user  | Deletes wishlisted book for borrower.         |

#### User Routes
API prefix: `/api/transaction`

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| POST   | `/:id`                | admins, logged in user  | Adds lend/borrow transaction.          |
| PUT    | `/:id`                   | admins, logged in user  | Updates lend/borrow transaction.|


# Data Model

#### USERS

---

```
{
  id: UUID
  user_name: STRING
  user_email: STRING
  user_identity: STRING (classification of login)
  user_credential: STRING
  city: STRING
  state: STRING
}
```

#### LENDER COLLECTION

---

```
{
  id: UUID
  lender_id: INTEGER (references id in USERS table)
  google_book_id: STRING
  isbn: INTEGER
  is_available: BOOLEAN
}
```

#### BORROWER WISHLIST

---

```
{
  id: UUID
  borrower_id: INTEGER (references id in USERS table)
  google_book_id: STRING
  isbn: STRING
  request_to_borrow: BOOLEAN (defaults to false)
}
```

#### TRANSACTIONS

---

```
{
  id: UUID
  borrower_id: INTEGER (references id in USERS table)
  lender_id: INTEGER (references id in USERS table)
  google_book_id: STRING
  isbn: STRING
  borrow_time: TIMESTAMP (auto assigned)
  return_time: TIMESTAMP (auto assigned)
}
```


## Actions

#### USERS

- `getUserById(id)` -> Returns user info by user ID
- `addUsers(info)` -> Creates user
- `updateUser(info, id)` -> Updates user by user ID
- `removeUser(id)` -> Deletes user by user ID

#### LENDERS

- `findBooksByLenderId(lender_id)` -> Returns all books by lender ID
- `findBookById(id)` -> Returns lendable book by ID
- `addBook(lenderBook)` -> Creates lendable book
- `toggleAvailability(lenderBook)` -> Updates book available status by google_book_id
- `removeBook(lenderBook)` -> Deletes lendable book by lender ID

#### BORROWERS

- `findBooksByBorrowerId(borrower_id)` -> Returns books by borrower ID
- `findBookById(id)` -> Returns book by borrower ID
- `addBook(borrowWishlist)` -> Creates borrow request for book
- `toggleRequestToBorrow(borrowWishlist)` -> Toggles borrow request flag in UI
- `removeBook(borrowWishlist)` -> Deletes book request

#### TRANSACTIONS

- `findTransactionById(id)` -> Returns transaction info
- `addTransaction(info)` -> Creates transaction
- `updateReturnTime(id)` -> Updates transaction with returned book date


## Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:
- PGHOST = postgreSQL host
- PGDB = postgreSQL database name
- PGUSER = postgreSQL super user name
- PGPASS = postgreSQL super user password
- googleClientID = Google API ID (Google+ API)
- googleClientSecret = Google API secret
- DB_ENV = set to "development", plans to impliment "production"
    
## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

 **If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**
 - Check first to see if your issue has already been reported.
 - Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
 - Create a live example of the problem.
 - Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](https://github.com/Lambda-School-Labs/neighborhood-library-fe) for details on the fronend of our project.