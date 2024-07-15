const http = require('http');
const server = require('../src/server');
const querystring = require('querystring');

const makeRequest = (options, postData = null) => {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, body: JSON.parse(data) });
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    if (postData) {
      req.write(postData);
    }

    req.end();
  });
};

describe('Character Creation Routes', () => {
  let serverInstance;
  beforeAll((done) => {
    serverInstance = server.listen(3000, done);
  });

  afterAll((done) => {
    serverInstance.close(done);
  });

  it('should create a character', async () => {
    const postData = querystring.stringify({
      class: 'Warrior',
      gender: 'Male',
      funFact: 'Loves to cook'
    });

    const options = {
      hostname: 'localhost',
      port: 3000,
      path: `/create-character?${postData}`,
      method: 'POST'
    };

    const response = await makeRequest(options);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message', 'Character created successfully');
    expect(response.body).toHaveProperty('character');
    expect(response.body.character).toMatchObject({
      class: 'Warrior',
      gender: 'Male',
      funFact: 'Loves to cook'
    });
  });

  it('should confirm character creation', async () => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/confirm-character',
      method: 'POST'
    };

    const response = await makeRequest(options);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Character creation confirmed');
  });

  it('should view the character', async () => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/view-character',
      method: 'GET'
    };

    const response = await makeRequest(options);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('character');
    expect(response.body.character).toMatchObject({
      class: 'Warrior',
      gender: 'Male',
      funFact: 'Loves to cook'
    });
  });
});
