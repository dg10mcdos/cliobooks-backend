import { db } from ".";
import {
  booksData,
  licenseAllocationData,
  pricingInformation,
  userData,
} from "./seed-data";
const seedCollection = async (collectionName: string, data: any[]) => {
  console.log(`Seeding collection: ${collectionName}`, data); // Log the data
  const collectionRef = db.collection(collectionName);
  const promises = data.map((item) =>
    collectionRef.doc(item.id || item.tier).set(item)
  );
  await Promise.all(promises);
};

export const seedDatabase = async () => {
  try {
    console.log("Seeding user data:", userData); // Log userData
    await db.collection("users").doc(userData.id).set(userData);
    await seedCollection("books", booksData);
    await seedCollection("licenseAllocations", licenseAllocationData);
    await seedCollection("pricingInformation", pricingInformation);
    return {
      success: true,
      message: "Database seeded successfully",
    };
  } catch (error) {
    console.error("Error seeding database:", error);
    return {
      success: false,
      message: "Failed to seed database",
    };
  }
};
