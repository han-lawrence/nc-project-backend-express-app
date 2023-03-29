const request = require('supertest');
const db = require('../db/connection.js');
const data = require('../db/data/test-data/index');
const seed = require('../db/seeds/seed.js');
const app = require('../app.js');
const { errorMessage } = require('../controllers/error-handling.controller');

beforeEach(() => seed(data));

afterAll(() =>{
   return db.end()
})

describe('1. GET /api/topics', () => {
	test('status 200, responds with an array of topic objects', () => {
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
  	test('returns a 404 error when endpoint is not found ', () => {
			return request(app)
				.get('/api/invalid-endpoint')
				.expect(404)
				.then(({ body }) => {
					expect(body).toEqual({ msg: 'Incorrect File Path' });
				});
		});


  
	});

describe('2. GET /api/articles/:article_id', () => {
	test('200: responds with an object that has a specific list of properties linked to its parametric id', () => {
		return request(app)
			.get('/api/articles/3')
			.expect(200)
			.then(({ body }) => {
				const { article } = body;
				expect(article).toBeInstanceOf(Object);
				// console.log(article);
				expect(article).toHaveProperty('article_id');
				expect(Object.keys(article).length).toBe(8);
				expect(article).toMatchObject({
					title: expect.any(String),
					topic: expect.any(String),
					author: expect.any(String),
					body: expect.any(String),
					created_at: expect.any(String),
					votes: expect.any(Number),
					article_img_url: expect.any(String),
					article_id: expect.any(Number),
				});
			});
	});
	test('returns a 404 error when the article ID is not found', () => {
		return request(app)
			.get('/api/articles/999')
			.expect(404)
			.then(({ body }) => {
				expect(body).toEqual({ msg: 'Invalid ID' });
			});
	});

  test('returns a 400 error when another data type is used in place of a number', () => {
		return request(app)
			.get('/api/articles/imNotAnumber')
			.expect(400)
			.then(({ body }) => {
				expect(body).toEqual({ msg: 'Invalid Id' });
			});
	});
});


