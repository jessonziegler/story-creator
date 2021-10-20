DROP TABLE IF EXISTS contribution CASCADE;
CREATE TABLE contribution (
  id SERIAL PRIMARY KEY NOT NULL,
  contribution VARCHAR(255) NOT NULL,
  stories_id INTEGER REFERENCES stories(id)
);
