import * as admin from "firebase-admin";
import { onRequest } from "firebase-functions/v2/https";
import { seedDatabase } from "./seed-database";
import { getBooks, updateBook } from "./book";

admin.initializeApp();

export const db = admin.firestore();

export const seedDatabaseRequest = onRequest(async (request, response) => {
  const result = await seedDatabase();
  if (!result.success) {
    response.status(500).send("Failed to seed database");
    return;
  }
  response.send("Database seeded successfully");
});
export const getBooksRequest = onRequest(async (request, response) => {
  const result = await getBooks();
  if (!result.success) {
    response.status(500).send("Failed to get books");
    return;
  }
  response.send(result.data);
});
export const updateBookRequest = onRequest(async (request, response) => {
  const { bookId } = request.query;
  const data = request.body;
  const result = await updateBook(bookId as string, data);
  if (!result.success) {
    response.status(500).send("Failed to update book");
    return;
  }
  response.send(result.message);
});
// TODO: Lay out rest of the functions here
