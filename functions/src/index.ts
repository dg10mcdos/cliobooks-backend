import * as admin from "firebase-admin";

import { onRequest } from "firebase-functions/v2/https";
import {
  booksData,
  licenseAllocationData,
  pricingInformation,
  userData,
} from "./types/seed-data";

// const firebaseConfig = {
//   apiKey: "AIzaSyAHEK-QxCvZD_A2_CJR0vv22QBdc_2z4aU",
//   authDomain: "cliobooks-ffb4b.firebaseapp.com",
//   projectId: "cliobooks-ffb4b",
//   storageBucket: "cliobooks-ffb4b.firebasestorage.app",
//   messagingSenderId: "732167774090",
//   appId: "1:732167774090:web:ef04719874fa00b6023273",
// };

admin.initializeApp();

const db = admin.firestore();

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
