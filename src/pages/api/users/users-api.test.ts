import '@testing-library/jest-dom';
import User from 'core/domain/models/user';
import 'isomorphic-fetch';

describe('Users API ROUTE', () => {
  it('should return a list of users', async () => {
    const response = await fetch('http://localhost:3000/api/users');
    const { users } = await response.json();
    expect(response.status).toBe(200);
    const isArray = Array.isArray(users);

    expect(isArray).toBe(true);
  });

  it('should create a new user', async () => {
    const randomId = new Date().getTime();
    const newUser: Partial<User> = {
      email: `${randomId}mail@test.com`,
      firstName: 'Test',
      lastName: 'User',
      password: 'test',
    };

    const response = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    const { user } = await response.json();
    expect(response.status).toBe(200);
    expect(user.email).toBe(newUser.email);
  });

  it('should return a user', async () => {
    // Get first user
    const response = await fetch('http://localhost:3000/api/users');
    const { users } = await response.json();
    const firstUser = users[0];
    const userId = firstUser._id;

    const responseUser = await fetch(
      `http://localhost:3000/api/users/${userId}`,
    );
    const { user } = await responseUser.json();
    expect(responseUser.status).toBe(200);
    expect(user.email).toBe(firstUser.email);
  });

  it('should update a user', async () => {
    // Get first user
    const response = await fetch('http://localhost:3000/api/users');
    const { users } = await response.json();
    const firstUser = users[0];
    const userId = firstUser._id;
    const newDate = new Date().getDate();
    const newEmail = `email-${newDate}@test.com`;
    const responseUser = await fetch(
      `http://localhost:3000/api/users/${userId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email: newEmail,
          firstName: `${newDate}First`,
          lastName: `${newDate}Last`,
        }),
      },
    );

    const { user } = await responseUser.json();
    expect(responseUser.status).toBe(200);
    expect(user.email).toBe(newEmail);
    expect(user.firstName).toBe(`${newDate}First`);
    expect(user.lastName).toBe(`${newDate}Last`);
  });
});
