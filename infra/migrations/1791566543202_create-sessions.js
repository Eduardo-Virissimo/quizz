exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE sessions (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      token_hash varchar(64) NOT NULL UNIQUE,
      user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      created_at timestamptz NOT NULL DEFAULT now(),
      expires_at timestamptz NOT NULL
    );
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE sessions;
  `);
};
