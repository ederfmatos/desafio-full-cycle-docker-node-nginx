import "dotenv/config";
import express from "express";
import mysql from "mysql";
import { faker } from "@faker-js/faker";

const app = express();

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

function findAllUsers() {
  return new Promise((resolve, reject) => {
    connection.query("SELECT id, name FROM users", (error, users) => {
      if (error) return reject(error);
      return resolve(users);
    });
  });
}

app.get("/app", async (request, response) => {
  const name = faker.name.fullName();

  connection.beginTransaction();
  connection.query(`INSERT INTO users (name) VALUES ('${name}')`);
  connection.commit();

  const users = await findAllUsers();

  response.send(`
      <html>
        <head>
            <title>Full Cycle</title>
        </head>

        <body>
            <h1>Full Cycle Rocks!</h1>
            <ul>
            ${users.map((user) => `<li>${user.name}</li>`).join("\n\t")}
            </ul>
        </body>
      </html>
    `);
});

app.listen(3000, () => console.log("Application running"));
