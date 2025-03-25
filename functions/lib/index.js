"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.seedDatabase = exports.db = void 0;
const admin = __importStar(require("firebase-admin"));
const https_1 = require("firebase-functions/v2/https");
const seed_data_1 = require("./seed-data");
admin.initializeApp();
exports.db = admin.firestore();
const seedCollection = (collectionName, data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Seeding collection: ${collectionName}`, data); // Log the data
    const collectionRef = exports.db.collection(collectionName);
    const promises = data.map((item) => collectionRef.doc(item.id || item.tier).set(item));
    yield Promise.all(promises);
});
exports.seedDatabase = (0, https_1.onRequest)((request, response) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Seeding user data:", seed_data_1.userData); // Log userData
    yield exports.db.collection("users").doc(seed_data_1.userData.id).set(seed_data_1.userData);
    yield seedCollection("books", seed_data_1.booksData);
    yield seedCollection("licenseAllocations", seed_data_1.licenseAllocationData);
    yield seedCollection("pricingInformation", seed_data_1.pricingInformation);
    response.send("Database seeded successfully");
}));
//# sourceMappingURL=index.js.map