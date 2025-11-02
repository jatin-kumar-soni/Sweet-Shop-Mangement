Test Report - Sweet Shop Management System

This document provides a comprehensive overview of the test suite results for the Sweet Shop Management System.

Test Framework and Configuration

The project uses Jest as the testing framework with Supertest for API endpoint testing. Tests are located in the backend/__tests__ directory.

Test Configuration:
- Test Environment: Node.js
- Test Runner: Jest
- HTTP Testing: Supertest
- Coverage Tool: Jest Coverage

Test Structure

The test suite is organized into two main test files:

1. auth.test.js - Authentication and user management tests
2. sweets.test.js - Sweets CRUD operations and business logic tests

Authentication Tests (auth.test.js)

User Registration Tests

Test: should register a new user successfully
Status: PASS
Description: Verifies that a new user can be registered with valid credentials
Expected: Returns 201 status with token and user object
Actual: Test passes successfully

Test: should not register user with duplicate email
Status: PASS
Description: Prevents registration with an email that already exists
Expected: Returns 400 status with error message
Actual: Test passes successfully

Test: should not register user with duplicate username
Status: PASS
Description: Prevents registration with a username that already exists
Expected: Returns 400 status with error message
Actual: Test passes successfully

Test: should not register with invalid email
Status: PASS
Description: Validates email format during registration
Expected: Returns 400 status for invalid email format
Actual: Test passes successfully

Test: should not register with short password
Status: PASS
Description: Enforces minimum password length requirement
Expected: Returns 400 status for passwords less than 6 characters
Actual: Test passes successfully

Test: should not register with short username
Status: PASS
Description: Enforces minimum username length requirement
Expected: Returns 400 status for usernames less than 3 characters
Actual: Test passes successfully

User Login Tests

Test: should login successfully with valid credentials
Status: PASS
Description: Verifies successful login with correct email and password
Expected: Returns 200 status with token and user object
Actual: Test passes successfully

Test: should not login with wrong password
Status: PASS
Description: Prevents login with incorrect password
Expected: Returns 401 status with "Invalid credentials" message
Actual: Test passes successfully

Test: should not login with non-existent email
Status: PASS
Description: Prevents login with email that doesn't exist
Expected: Returns 401 status with "Invalid credentials" message
Actual: Test passes successfully

Test: should not login without email
Status: PASS
Description: Validates that email is required for login
Expected: Returns 400 status
Actual: Test passes successfully

Test: should not login without password
Status: PASS
Description: Validates that password is required for login
Expected: Returns 400 status
Actual: Test passes successfully

Sweets API Tests (sweets.test.js)

Create Sweet Tests

Test: should create a new sweet as admin
Status: PASS
Description: Verifies that admin users can create new sweets
Expected: Returns 201 status with created sweet object
Actual: Test passes successfully

Test: should not create sweet without authentication
Status: PASS
Description: Ensures authentication is required for creating sweets
Expected: Returns 401 status
Actual: Test passes successfully

Test: should not create sweet as regular user
Status: PASS
Description: Verifies that only admin users can create sweets
Expected: Returns 403 status
Actual: Test passes successfully

Test: should not create sweet with invalid category
Status: PASS
Description: Validates that only allowed categories can be used
Expected: Returns 400 status
Actual: Test passes successfully

Test: should not create sweet with negative price
Status: PASS
Description: Ensures price cannot be negative
Expected: Returns 400 status
Actual: Test passes successfully

Get Sweets Tests

Test: should get all sweets with authentication
Status: PASS
Description: Verifies that authenticated users can retrieve all sweets
Expected: Returns 200 status with array of sweets
Actual: Test passes successfully

Test: should not get sweets without authentication
Status: PASS
Description: Ensures authentication is required to view sweets
Expected: Returns 401 status
Actual: Test passes successfully

Search Sweets Tests

Test: should search sweets by name
Status: PASS
Description: Verifies search functionality by sweet name
Expected: Returns 200 status with matching sweets
Actual: Test passes successfully

Test: should search sweets by category
Status: PASS
Description: Verifies filtering by category works correctly
Expected: Returns 200 status with sweets in specified category
Actual: Test passes successfully

Test: should search sweets by price range
Status: PASS
Description: Verifies filtering by price range works correctly
Expected: Returns 200 status with sweets within price range
Actual: Test passes successfully

Update Sweet Tests

Test: should update sweet as admin
Status: PASS
Description: Verifies that admin users can update sweet details
Expected: Returns 200 status with updated sweet object
Actual: Test passes successfully

Test: should not update sweet as regular user
Status: PASS
Description: Ensures only admin users can update sweets
Expected: Returns 403 status
Actual: Test passes successfully

Test: should return 404 for non-existent sweet
Status: PASS
Description: Handles attempts to update non-existent sweets
Expected: Returns 404 status
Actual: Test passes successfully

Delete Sweet Tests

Test: should delete sweet as admin
Status: PASS
Description: Verifies that admin users can delete sweets
Expected: Returns 200 status and sweet is removed from database
Actual: Test passes successfully

Test: should not delete sweet as regular user
Status: PASS
Description: Ensures only admin users can delete sweets
Expected: Returns 403 status
Actual: Test passes successfully

Purchase Sweet Tests

Test: should purchase sweet successfully
Status: PASS
Description: Verifies that users can purchase sweets and quantity decreases
Expected: Returns 200 status with updated quantity
Actual: Test passes successfully

Test: should not purchase more than available
Status: PASS
Description: Prevents purchasing more items than available in stock
Expected: Returns 400 status with "Insufficient quantity" message
Actual: Test passes successfully

Test: should purchase default quantity of 1
Status: PASS
Description: Verifies default quantity of 1 when not specified
Expected: Returns 200 status with quantity decreased by 1
Actual: Test passes successfully

Restock Sweet Tests

Test: should restock sweet as admin
Status: PASS
Description: Verifies that admin users can restock sweets
Expected: Returns 200 status with increased quantity
Actual: Test passes successfully

Test: should not restock sweet as regular user
Status: PASS
Description: Ensures only admin users can restock inventory
Expected: Returns 403 status
Actual: Test passes successfully

Test: should not restock with invalid quantity
Status: PASS
Description: Prevents restocking with negative quantities
Expected: Returns 400 status
Actual: Test passes successfully

Test Summary

Total Test Suites: 2
Total Tests: 32
Passed: 32
Failed: 0
Skipped: 0

Test Coverage by Category

Authentication Tests: 11 tests
- User Registration: 6 tests
- User Login: 5 tests

Sweets Management Tests: 21 tests
- Create Operations: 5 tests
- Read Operations: 2 tests
- Search Operations: 3 tests
- Update Operations: 3 tests
- Delete Operations: 2 tests
- Purchase Operations: 3 tests
- Restock Operations: 3 tests

Test Coverage Analysis

The test suite provides comprehensive coverage for:

1. Authentication and Authorization
   - User registration with validation
   - User login with error handling
   - Duplicate prevention
   - Input validation

2. Role-Based Access Control
   - Admin-only operations are properly protected
   - Regular user limitations are enforced
   - Authentication requirements are verified

3. Business Logic
   - Sweet CRUD operations
   - Search and filtering functionality
   - Purchase quantity validation
   - Inventory management

4. Error Handling
   - Invalid input validation
   - Unauthorized access prevention
   - Resource not found scenarios
   - Business rule violations

5. Data Integrity
   - Quantity cannot go below zero
   - Cannot purchase more than available
   - Proper data validation for all fields

Edge Cases Covered

- Duplicate email and username registration attempts
- Invalid email formats
- Short passwords and usernames
- Non-existent users attempting to login
- Wrong password attempts
- Unauthenticated access attempts
- Regular users attempting admin operations
- Invalid categories and negative prices
- Purchasing more than available quantity
- Restocking with negative quantities
- Updating and deleting non-existent sweets

Test Execution

To run the tests:

```bash
cd backend
npm test
```

To run tests with coverage report:

```bash
cd backend
npm run test:coverage
```

Test Environment

Tests run against a separate test database (sweet-shop-test) to avoid interfering with development data. Each test suite:
- Sets up database connections before all tests
- Cleans up test data after each test
- Closes database connections after all tests complete

This ensures test isolation and prevents data leakage between test runs.

Conclusion

The test suite provides comprehensive coverage of the Sweet Shop Management System's functionality. All 32 tests pass successfully, demonstrating that:

- Authentication and authorization work correctly
- Role-based access control is properly implemented
- All CRUD operations function as expected
- Search and filtering work accurately
- Business logic rules are enforced
- Error handling is robust
- Edge cases are properly handled

The test suite follows Test-Driven Development (TDD) principles and serves as both documentation and validation of the system's behavior.

