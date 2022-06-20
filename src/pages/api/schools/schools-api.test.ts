import '@testing-library/jest-dom';
import School from 'core/domain/models/school';
import 'isomorphic-fetch';

describe('Schools API ROUTE', () => {
  it('should return a list of schools', async () => {
    const response = await fetch('http://localhost:3000/api/schools');
    const { schools } = await response.json();
    expect(response.status).toBe(200);
    const isArray = Array.isArray(schools);

    expect(isArray).toBe(true);
  });

  it('should create a new school', async () => {
    const randomId = new Date().getTime();
    const newSchool: Partial<School> = {
      email: `${randomId}mail@test.com`,
      name: `${randomId} School`,
      phone: `${randomId}1234567890`,
      address: `${randomId} Address`,
      city: `${randomId} City`,
      logo: 'https://picsum.photos/200',
    };

    const response = await fetch('http://localhost:3000/api/schools', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(newSchool),
    });

    const { school } = await response.json();
    expect(response.status).toBe(200);
    expect(school.email).toBe(newSchool.email);
  });

  it('should return a school', async () => {
    // Get first school
    const response = await fetch('http://localhost:3000/api/schools');
    const { schools } = await response.json();
    const firstSchool = schools[0];
    const schoolId = firstSchool._id;

    const responseSchool = await fetch(
      `http://localhost:3000/api/schools/${schoolId}`,
    );
    const { school } = await responseSchool.json();
    expect(responseSchool.status).toBe(200);
    expect(school.email).toBe(firstSchool.email);
  });

  it('should update a school', async () => {
    // Get first school
    const response = await fetch('http://localhost:3000/api/schools');
    const { schools } = await response.json();
    const firstSchool = schools[0];
    const schoolId = firstSchool._id;
    const newDate = new Date().getDate();
    const newEmail = `email-${newDate}@test.com`;
    const responseSchool = await fetch(
      `http://localhost:3000/api/schools/${schoolId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email: newEmail,
        }),
      },
    );

    const { school } = await responseSchool.json();
    expect(responseSchool.status).toBe(200);
    expect(school.email).toBe(newEmail);
    expect(school.name).toBe(firstSchool.name);
  });
});
