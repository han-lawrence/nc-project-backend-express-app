
const request = require('supertest');
const db = require('../db/connection.js');
const data = require('../db/data/test-data/index');
const seed = require('../db/seeds/seed.js');
const app = require('../app.js');
const { errorMessage } = require('../controllers/error-handling.controller');
const sorted = require('jest-sorted');

beforeEach(() => seed(data));

afterAll(() =>{
   return db.end()
})

describe('3. GET /api/topics', () => {
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

describe('4. GET /api/articles/:article_id', () => {
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
	test('returns a 400 error when the article ID is not found', () => {
		return request(app)
			.get('/api/articles/999')
			.expect(400)
			.then(({ body }) => {
				expect(body).toEqual({ msg: 'Invalid ID' });
			});
	});

  test('returns a 400 error when another data type is used in place of a number', () => {
		return request(app)
			.get('/api/articles/imNotAnumber')
			.expect(400)
			.then(({ body }) => {
				expect(body).toEqual({ msg: 'Invalid ID' });
			});
	});
});

describe('5.GET /api/articles', () => {

  test('200: responds with an array of objects, with each object having correct keys including commet count', () => {
	return request(app)
		.get('/api/articles')
		.expect(200)
		.then(({ body }) => {
			const { articles } = body;
      console.log(body)
			expect(articles).toBeInstanceOf(Array);
      expect(articles).toHaveLength(12);
      expect(articles).toBeSorted({ key:'created_at', descending: true })
      articles.forEach((article) =>{
        expect(article).toMatchObject({
        author:expect.any(String),
        title:expect.any(String),
        article_id:expect.any(Number),
        topic:expect.any(String),
        created_at:expect.any(String),
        votes:expect.any(Number),
        article_img_url:expect.any(String),
        comment_count: expect.any(Number)
        })
      })
		
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

describe('6.GET /api/articles/:article_id/comments', () => {
  test('200: accepts a article_id query which responds with only comments only from that article_id', () => {
    return request(app)
      .get('/api/articles/1/comments')
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(comments).toBeInstanceOf(Array);
        expect(comments).toHaveLength(11);
        expect(comments).toBeSorted({ key: 'created_at', descending: true });
        comments.forEach((comment) => {
          expect(comment).toMatchObject({
						author: expect.any(String),
						comment_id: expect.any(Number),
						created_at: expect.any(String),
						votes: expect.any(Number),
						body: expect.any(String),
						article_id: expect.any(Number),
					});
        });
      });
  });
  test('200 returns empty array when no comment is found', () => {
		return request(app)
			.get('/api/articles/2/comments')
			.expect(200)
			.then(({ body }) => {
       const { comments } = body;
       expect(comments).toBeInstanceOf(Array);
				expect(comments).toEqual([]);
			});
	});


  test('400 returns empty array when no comment is found', () => {
		return request(app)
			.get('/api/articles/IamNotANumber/comments')
			.expect(400)
			.then(({ body }) => {
				const { msg } = body;
				expect(msg).toBe("Invalid ID");
			});
	});


  test('404 returns empty array when no comment is found', () => {
		return request(app)
			.get('/api/articles/202020/comments')
			.expect(404)
			.then(({ body }) => {
				const { msg } = body;
				expect(msg).toBe('Article not found');
			});
	});

  


});

describe('7. POST /api/articles/:article_id/comments', () => {
	test('status 201, responds with a new comment when all the properties are provided', () => {
		const object = {
			username: 'butter_bridge',
			body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
		};

		return request(app)
			.post('/api/articles/1/comments')
			.send(object)
			.expect(201)
			.then((response) => {
				const { body } = response;
				const { comment } = body;
				expect(comment).toHaveProperty('article_id');
				console.log(comment);
				expect(Object.keys(comment).length).toBe(2);
				expect(comment.comment).toMatchObject({
					author: expect.any(String),
					body: expect.any(String),
					article_id: expect.any(Number),
				});
			});
	});

  test('returns a 404 username does not exist', () => {
 const commentToPost = {username: '', body: 'Game was great' };
  return request(app)
	.post('/api/reviews/3/comments')
	.send(commentToPost)
	.expect(404)
	.then(({ body }) => {
	expect(body).toEqual({ msg: 'Incorrect File Path' });
		});
});


test(' returns a 400 if the data to post is missing body.', () => {
	const item = { username: 'Hannah77' };
	return request(app)
		.post('/api/articles/3/comments')
		.send(item)
		.expect(400)
		.then(({ body }) => expect(body.msg).toBe('Invalid format'));
});



test('returns 400 if the data to post is not in an accurate format.', () => {
        const item = {wrongFormat: 'value'};
        return request(app)
        .post('/api/articles/3/comments')
        .send(item)
        .expect(400)
        .then(({body}) => expect(body.msg).toBe('Invalid format'));

});



describe('PATCH/api/articles/:article_id', () => {
	test('200: updates the votes as required - patch is created.', () => {
		const item = { inc_votes: 10 };
		return request(app)
			.patch('/api/articles/3')
			.send(item)
			.expect(200)
			.then(({ body }) => {
				const { article } = body;
				expect(article).toMatchObject({
					author: expect.any(String),
					title: expect.any(String),
					article_id: 3,
					topic: expect.any(String),
					created_at: expect.any(String),
					votes: 10,
					article_img_url: expect.any(String),
					body: expect.any(String),
				});
			});
	});
  test('returns 400 if id is not a valid format', () => {
        const item = {inc_votes: 11};
        return request(app)
        .patch('/api/articles/incorretID')
        .send(item)
        .expect(400)
        .then(({body}) => {
            const {msg} = body;
            expect(msg).toBe('Invalid ID');
        })

});

test ('returns a 400 if inc_votes is missing.', () => {
        const item = {};
        return request(app)
        .patch('/api/articles/3')
        .send(item)
        .expect(400)
        .then(({body}) => {
            const {msg} = body;
            expect(msg).toBe('Invalid Format');
        });
});


test('returns a 404 found if the username is not found.', () => {
        const item = {
					username: 'Hannah77',
					body: 'Replacing the quiet elegance of the dark suit',
				};
        return request(app)
        .post('/api/articles/3/comments')
        .send(item)
        .expect(404)
        .then(({body}) => expect(body.msg).toBe('Username not found'));

});

test('returns a 404 if no article matches ID.', () => {
	const item = {
		username: 'Hannah77',
		body: 'Replacing the quiet elegance of the dark suit',
	};
	return request(app)
		.post('/api/articles/77777777/comments')
		.send(item)
		.expect(404)
		.then(({ body }) => {
			const { msg } = body;
			expect(msg).toBe('ID not found');
		});
});


});

});
