exports.up = (pgm) => {
  pgm.sql(`
    CREATE EXTENSION IF NOT EXISTS citext;

    CREATE TABLE users (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      username citext NOT NULL UNIQUE,
      email citext NOT NULL UNIQUE,
      password_hash varchar(72) NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now()
    );
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE users;
  `);
};
