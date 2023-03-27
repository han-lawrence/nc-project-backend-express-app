const request = require('supertest');
const db = require('../db/connection.js');
const data = require('../db/data/test-data/index');
const seed = require('../db/seeds/seed.js');
const app = require('../app.js');
const { errorMessage } = require('../controllers/error-handling.controller');

beforeEach(() => seed(data));

afterAll(() =>{
  if (db.end) db.end()
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

    test('should return a 404 status code and a "Page not found" message if the path is notfound', () => {
			const req = {};
			const res = {
				status: function (code) {
					expect(code).toEqual(404);
					return this;
				},
				send: function (message) {
					expect(message).toEqual({ msg: 'Page not found' });
				},
			};
			errorMessage(req, res);
		});
  
	});

describe('2. GET /api/articles/:article_id', () => {
	test('200: responds with an object that has a specific list of properties linked to its parametric id', () => {
    return request(app)
    .get("/api/articles/3")
    .expect(200)
    .then(({ body }) => {
      const {article} = body; 
      expect(article).toBeInstanceOf(Object);
      // console.log(article);
      expect(article).toHaveProperty("article_id");
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
      })

    });

  });

  test('returns a 404 error when the article is not found', () => {
		return request(app)
			.get('/api/articles/999')
			.expect(404)
			.then(({ body }) => {
				expect(body).toEqual({ msg: 'Invalid ID'});
			});
	});

  



  });


