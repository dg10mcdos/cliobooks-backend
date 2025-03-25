"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = void 0;
const _1 = require(".");
const seed_data_1 = require("./seed-data");
const seedCollection = (collectionName, data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Seeding collection: ${collectionName}`, data); // Log the data
    const collectionRef = _1.db.collection(collectionName);
    const promises = data.map((item) => collectionRef.doc(item.id || item.tier).set(item));
    yield Promise.all(promises);
});
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Seeding user data:", seed_data_1.userData); // Log userData
        yield _1.db.collection("users").doc(seed_data_1.userData.id).set(seed_data_1.userData);
        yield seedCollection("books", seed_data_1.booksData);
        yield seedCollection("licenseAllocations", seed_data_1.licenseAllocationData);
        yield seedCollection("pricingInformation", seed_data_1.pricingInformation);
        return {
            success: true,
            message: "Database seeded successfully",
        };
    }
    catch (error) {
        console.error("Error seeding database:", error);
        return {
            success: false,
            message: "Failed to seed database",
        };
    }
});
exports.seedDatabase = seedDatabase;
//# sourceMappingURL=seed-database.js.map