const request = require('supertest');
const db = require('../db/connection.js');
const data = require('../db/data/test-data/index');
const seed = require('../db/seeds/seed.js');
const app = require('../app.js');

beforeEach(() => seed(data));

afterAll(() => db.end());

describe('1. GET /api/topics', () => {
	test('status 200, responds with an array of park objects', () => {
		return request(app)
			.get('/api/topics')
			.expect(200)
			.then(({ body }) => {
				const { topics } = body;
				expect(topics).toBeInstanceOf(Array);
				expect(topics).toHaveLength(3);
				topics.forEach((topic) => {
					expect(topic).toEqual(
						expect.objectContaining({
							description: expect.any(String),
							slug: expect.any(String),
						})
					);
				});
			});
	});
  
	});

