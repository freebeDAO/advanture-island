## Init project

### 1. Install

`pnpm i`

<!-- install error, need reset npm config -->

`https://registry.npmmirror.com/`

### 2. Create and seed the database

Run the following command to create your SQLite database file. This also creates the User and Post tables that are defined in prisma/schema.prisma:

`npx prisma migrate dev --name init`

update data model

`npx prisma migrate dev`

### 3. Start the app

`pnpm run dev`

## Using the REST API

- `/api/user`: Create a new user
  - Body:
    - `email: String` (required): The email address of the user
    - `name: String` (optional): The name of the user
