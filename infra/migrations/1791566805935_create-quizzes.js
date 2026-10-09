exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE quizzes (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      owner_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      title varchar(120) NOT NULL,
      description varchar(500) NOT NULL,
      category varchar(40) NOT NULL DEFAULT 'geral',
      created_at timestamptz NOT NULL DEFAULT now()
    );

    CREATE INDEX quizzes_owner_id_idx ON quizzes(owner_id);
    CREATE INDEX quizzes_created_at_idx ON quizzes(created_at DESC);

    CREATE TABLE questions (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      quiz_id uuid NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
      sort_order integer NOT NULL CHECK (sort_order > 0),
      statement varchar(500) NOT NULL,
      UNIQUE (quiz_id, sort_order)
    );

    CREATE TABLE options (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      question_id uuid NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
      sort_order integer NOT NULL CHECK (sort_order > 0),
      label varchar(250) NOT NULL,
      is_correct boolean NOT NULL DEFAULT false,
      UNIQUE (question_id, sort_order)
    );

    CREATE UNIQUE INDEX options_one_correct_per_question ON options(question_id) WHERE is_correct;
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE options;
    DROP TABLE questions;
    DROP TABLE quizzes;
  `);
};
