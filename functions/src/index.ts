import * as admin from "firebase-admin";

import { onRequest } from "firebase-functions/v2/https";
import {
  booksData,
  licenseAllocationData,
  pricingInformation,
  userData,
} from "./seed-data";

admin.initializeApp();

export const db = admin.firestore();

const seedCollection = async (collectionName: string, data: any[]) => {
  console.log(`Seeding collection: ${collectionName}`, data); // Log the data
  const collectionRef = db.collection(collectionName);
  const promises = data.map((item) =>
    collectionRef.doc(item.id || item.tier).set(item)
  );
  await Promise.all(promises);
};

export const seedDatabase = onRequest(async (request, response) => {
  console.log("Seeding user data:", userData); // Log userData
  await db.collection("users").doc(userData.id).set(userData);
  await seedCollection("books", booksData);
  await seedCollection("licenseAllocations", licenseAllocationData);
  await seedCollection("pricingInformation", pricingInformation);
  response.send("Database seeded successfully");
});
