\c nc_news_test

SELECT comments.comment_id, comments.votes, comments.created_at, comments.author, comments.body, articles.article_id
      FROM comments
      RIGHT JOIN articles ON articles.article_id = comments.article_id
      WHERE articles.article_id = $1
      ORDER BY comments.created_at DESC;