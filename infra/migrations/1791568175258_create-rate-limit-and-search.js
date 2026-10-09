exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE rate_limits (
      bucket text NOT NULL,
      window_start timestamptz NOT NULL,
      hits integer NOT NULL DEFAULT 1,
      PRIMARY KEY (bucket, window_start)
    );

    CREATE EXTENSION IF NOT EXISTS pg_trgm;
    CREATE INDEX quizzes_title_trgm_idx on quizzes USING GIN (title gin_trgm_ops);
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE rate_limits;
    DROP INDEX quizzes_title_trgm_idx;
  `);
};
