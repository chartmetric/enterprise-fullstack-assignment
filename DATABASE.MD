# Database Documentation

This document provides detailed information about the database schema and tables for the Chartmetric assignment.

## Connection Information

- **Host**: localhost (or `db` from within containers)
- **Port**: 5432
- **Database**: chartmetric
- **Username**: postgres
- **Password**: postgres

Connect to the database using:

```bash
make shell-db
```

Or use your preferred PostgreSQL client with the connection details above.

## Schema Overview

The database uses a schema named `chartmetric` which contains tables with music streaming data.

## Tables

### countries

Contains information about countries and regions.

| Column         | Type         | Description                                  |
| -------------- | ------------ | -------------------------------------------- |
| country_code   | VARCHAR(3)   | Primary key - ISO country code               |
| country_name   | VARCHAR(100) | Name of the country                          |
| region         | VARCHAR(50)  | Geographic region                            |
| population     | INTEGER      | Country population                           |
| spotify_market | BOOLEAN      | Whether Spotify is available (default: TRUE) |

### artists

Contains information about music artists.

| Column           | Type         | Description                                     |
| ---------------- | ------------ | ----------------------------------------------- |
| artist_id        | VARCHAR(50)  | Primary key                                     |
| artist_name      | VARCHAR(255) | Artist name                                     |
| genre            | VARCHAR(100) | Primary music genre                             |
| label            | VARCHAR(255) | Record label                                    |
| verified         | BOOLEAN      | Whether the artist is verified (default: FALSE) |
| artist_image_url | VARCHAR(255) | URL to artist image                             |
| created_at       | TIMESTAMP    | Record creation timestamp                       |
| updated_at       | TIMESTAMP    | Record update timestamp                         |

### tracks

Contains information about music tracks.

| Column          | Type         | Description                                         |
| --------------- | ------------ | --------------------------------------------------- |
| track_id        | VARCHAR(50)  | Primary key                                         |
| artist_id       | VARCHAR(50)  | Foreign key referencing artists.artist_id           |
| track_name      | VARCHAR(255) | Track name                                          |
| album_name      | VARCHAR(255) | Album name                                          |
| release_date    | DATE         | Date the track was released                         |
| duration_ms     | INTEGER      | Track duration in milliseconds                      |
| explicit        | BOOLEAN      | Whether track has explicit content (default: FALSE) |
| track_image_url | VARCHAR(255) | URL to track/album image                            |
| created_at      | TIMESTAMP    | Record creation timestamp                           |
| updated_at      | TIMESTAMP    | Record update timestamp                             |

### playlists

Contains information about music playlists.

| Column         | Type         | Description                                     |
| -------------- | ------------ | ----------------------------------------------- |
| playlist_id    | VARCHAR(50)  | Primary key                                     |
| playlist_name  | VARCHAR(255) | Playlist name                                   |
| curator_id     | VARCHAR(50)  | ID of the curator                               |
| playlist_type  | VARCHAR(50)  | Type of playlist (editorial, algorithmic, user) |
| follower_count | INTEGER      | Number of followers (default: 0)                |
| country_code   | VARCHAR(3)   | Foreign key referencing countries.country_code  |
| created_at     | TIMESTAMP    | Record creation timestamp                       |
| updated_at     | TIMESTAMP    | Record update timestamp                         |

### playlist_tracks

Junction table linking playlists and tracks.

| Column      | Type        | Description                                                 |
| ----------- | ----------- | ----------------------------------------------------------- |
| id          | SERIAL      | Primary key                                                 |
| playlist_id | VARCHAR(50) | Foreign key referencing playlists.playlist_id               |
| track_id    | VARCHAR(50) | Foreign key referencing tracks.track_id                     |
| added_at    | TIMESTAMP   | When the track was added to the playlist                    |
| position    | INTEGER     | Position of the track in the playlist                       |
| active      | BOOLEAN     | Whether the track is active in the playlist (default: TRUE) |

### daily_metrics

Contains daily performance metrics for tracks.

| Column           | Type        | Description                                     |
| ---------------- | ----------- | ----------------------------------------------- |
| id               | SERIAL      | Primary key                                     |
| date             | DATE        | Date of the metrics                             |
| track_id         | VARCHAR(50) | Foreign key referencing tracks.track_id         |
| country_code     | VARCHAR(3)  | Foreign key referencing countries.country_code  |
| streams          | INTEGER     | Number of streams (default: 0)                  |
| saves            | INTEGER     | Number of saves (default: 0)                    |
| shares           | INTEGER     | Number of shares (default: 0)                   |
| playlist_adds    | INTEGER     | Number of times added to playlists (default: 0) |
| followers        | INTEGER     | Number of new followers (default: 0)            |
| unique_listeners | INTEGER     | Number of unique listeners (default: 0)         |

## Data Relationships

- A country can have multiple playlists and daily metrics (one-to-many)
- An artist can have multiple tracks (one-to-many)
- A track can be in multiple playlists and have multiple daily metrics (one-to-many)
- A playlist can contain multiple tracks through the playlist_tracks table (many-to-many)
- Each daily metric entry is associated with both a track and a country

## Database Management

### Reset the Database

If you need to reset the database to its initial state:

```bash
make reset
```

### Explore Database Structure

```sql
-- List all tables in the chartmetric schema
\dt chartmetric.*

-- Show detailed information about a table
\d chartmetric.artists

-- Show all schemas
\dn

-- List all tables in all schemas
\dt *.*
```
