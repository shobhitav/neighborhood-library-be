🚫 Each student has a required minimum number of meaningful PRs each week per the rubric.  Contributing to docs does NOT count as a PR to meet your weekly requirements.

# API Documentation

#### Backend delpoyed to Heroku (https://muovivlio.herokuapp.com/)

## Getting started

To get the server running locally:

- Clone this repo
- Create a .env file with the following keys:
    PGHOST=[localhost]
    PGDB=[database name]
    PGUSER=[database user]
    PGPASS=[database user password]
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
API prefix: `/api/users/`

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
| GET    | `/:lender-id`           | n/a                 | Returns books added by lender.                     |
| POST   | `/`                     | n/a                 | Adds book record for lender.                       |
| PUT    | `/:id`                  | n/a                 | Updates if book is available.                      |
| DELETE | `/:id`                  | n/a                 | Deletes book record for lender.                    |

#### Borrower Routes
API prefix: `/api/borrower-wishlist`

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/:borrower_id`         | n/a                 | Returns books added by borrow.                     |
| POST   | `/`                     | n/a                 | Adds book record for borrower.                     |
| PUT    | `/:id`                  | n/a                 | Updates if book request status for borrow.         |
| DELETE | `/:id`                  | n/a                 | Deletes book for borrower.                         |

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

`` ->
`` ->
`` ->
`` ->

#### LENDERS

`findBooksByLenderId(lender_id)` -> Returns all books by lender ID
`findBookById(id)` -> Returns lendable book by ID
`addBook(lenderBook)` -> Creates lendable book
`toggleAvailability(lenderBook)` -> Updates book available status by google_book_id
`removeBook(lenderBook)` -> Deletes lendable book by lender ID


#### BORROWERS

`findBooksByBorrowerId(borrower_id)` -> Returns books by borrower ID
`findBookById(id)` -> Returns book by borrower ID
`addBook(borrowWishlist)` -> Creates borrow request for book
`toggleRequestToBorrow(borrowWishlist)` -> Toggles borrow request flag in UI
`removeBook(borrowWishlist)` -> Deletes book request


## 3️⃣ Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

🚫 These are just examples, replace them with the specifics for your app
    
    *  STAGING_DB - optional development db for using functionality not available in SQLite
    *  NODE_ENV - set to "development" until ready for "production"
    *  JWT_SECRET - you can generate this by using a python shell and running import random''.join([random.SystemRandom().choice('abcdefghijklmnopqrstuvwxyz0123456789!@#\$%^&amp;*(-*=+)') for i in range(50)])
    *  SENDGRID_API_KEY - this is generated in your Sendgrid account
    *  stripe_secret - this is generated in the Stripe dashboard
    
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

See [Frontend Documentation](🚫link to your frontend readme here) for details on the fronend of our project.
🚫 Add DS iOS and/or Andriod links here if applicable.