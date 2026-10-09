exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE attempts (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      quiz_id uuid NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
      user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      score integer NOT NULL CHECK (score >= 0),
      total integer NOT NULL CHECK (total > 0),
      created_at timestamptz NOT NULL DEFAULT now(),
      CHECK (score <= total)
    );

    CREATE INDEX attempts_user_id_idx ON attempts(user_id, created_at DESC);
    CREATE INDEX attempts_quiz_score_idx ON attempts(quiz_id, score DESC, created_at);

    CREATE TABLE attempts_answers (
      attempt_id uuid NOT NULL REFERENCES attempts(id) ON DELETE CASCADE,
      question_id uuid NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
      option_id uuid NOT NULL REFERENCES options(id) ON DELETE CASCADE,
      is_correct boolean NOT NULL,
      PRIMARY KEY (attempt_id, question_id)
    );
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE attempts_answers;
    DROP TABLE attempts;
  `);
};
