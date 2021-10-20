DROP TABLE IF EXISTS contributions CASCADE;
CREATE TABLE contributions (
  id SERIAL PRIMARY KEY NOT NULL,
  contribution VARCHAR(255) NOT NULL,
  stories_id INTEGER REFERENCES stories(id)
);
