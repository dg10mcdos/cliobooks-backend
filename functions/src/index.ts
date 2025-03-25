import * as admin from "firebase-admin";
import { onRequest } from "firebase-functions/v2/https";
import { seedDatabase } from "./seed-database";
import { getBooks, updateBook, assignLicense, returnLicense } from "./book";
import { getPricing } from "./license-pricing";
import { purchaseLicense, checkPurchaseStatus } from "./license-purchase";
import { getPublisherDetails, updatePublisherDetails } from "./publisher";

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

// book.ts
export const getBooksRequest = onRequest(async (request, response) => {
  const result = await getBooks();
  if (!result.success) {
    response.status(500).send("Failed to get books");
    return;
  }
  response.send(result.data);
});
export const updateBookRequest = onRequest(async (request, response) => {
  const { bookId, data } = request.body;
  const result = await updateBook(bookId, data);
  if (!result.success) {
    response.status(500).send("Failed to update book");
    return;
  }
  response.send(result.message);
});

// license-pricing.ts
export const getPricingRequest = onRequest(async (request, response) => {
  const result = await getPricing();
  if (!result.success) {
    response.status(500).send("Failed to get pricing information");
    return;
  }
  response.send(result.data);
});

// license-purchase.ts
export const purchaseLicenseRequest = onRequest(async (request, response) => {
  const { purchaseData } = request.body;
  const result = await purchaseLicense(purchaseData);
  if (!result.success) {
    response.status(500).send(result.message);
    return;
  }
  response.send(result.data);
});
export const checkPurchaseStatusRequest = onRequest(
  async (request, response) => {
    const { purchaseId } = request.body;
    const result = await checkPurchaseStatus(purchaseId);
    if (!result.success) {
      response.status(500).send(result.message);
      return;
    }
    response.send(result.data);
  }
);

// publisher.ts
export const getPublisherDetailsRequest = onRequest(
  async (request, response) => {
    const userId = request.query.userId as string;
    const result = await getPublisherDetails(userId);
    if (!result.success) {
      response.status(500).send(result.message);
      return;
    }
    response.send(result.data);
  }
);
export const updatePublisherDetailsRequest = onRequest(
  async (request, response) => {
    const { userId, data } = request.body;
    const result = await updatePublisherDetails(userId, data);
    if (!result.success) {
      response.status(500).send(result.message);
      return;
    }
    response.send(result.message);
  }
);
export const assignLicenseRequest = onRequest(async (request, response) => {
  const { bookId, userId, userEmail } = request.body;
  const result = await assignLicense(bookId, userId, userEmail);
  if (!result.success) {
    response.status(500).send(result.message);
    return;
  }
  response.send(result.data);
});
export const returnLicenseRequest = onRequest(async (request, response) => {
  const { bookId } = request.body;
  const result = await returnLicense(bookId);
  if (!result.success) {
    response.status(500).send(result.message);
    return;
  }
  response.send(result.data);
});
