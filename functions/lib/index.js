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
exports.updatePublisherDetailsRequest = exports.getPublisherDetailsRequest = exports.checkPurchaseStatusRequest = exports.purchaseLicenseRequest = exports.getPricingRequest = exports.updateBookRequest = exports.getBooksRequest = exports.seedDatabaseRequest = exports.db = void 0;
const admin = __importStar(require("firebase-admin"));
const https_1 = require("firebase-functions/v2/https");
const seed_database_1 = require("./seed-database");
const book_1 = require("./book");
const license_pricing_1 = require("./license-pricing");
const license_purchase_1 = require("./license-purchase");
const publisher_1 = require("./publisher");
admin.initializeApp();
exports.db = admin.firestore();
exports.seedDatabaseRequest = (0, https_1.onRequest)((request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, seed_database_1.seedDatabase)();
    if (!result.success) {
        response.status(500).send("Failed to seed database");
        return;
    }
    response.send("Database seeded successfully");
}));
// book.ts
exports.getBooksRequest = (0, https_1.onRequest)((request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, book_1.getBooks)();
    if (!result.success) {
        response.status(500).send("Failed to get books");
        return;
    }
    response.send(result.data);
}));
exports.updateBookRequest = (0, https_1.onRequest)((request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId, data } = request.body;
    const result = yield (0, book_1.updateBook)(bookId, data);
    if (!result.success) {
        response.status(500).send("Failed to update book");
        return;
    }
    response.send(result.message);
}));
// license-pricing.ts
exports.getPricingRequest = (0, https_1.onRequest)((request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, license_pricing_1.getPricing)();
    if (!result.success) {
        response.status(500).send("Failed to get pricing information");
        return;
    }
    response.send(result.data);
}));
// license-purchase.ts
exports.purchaseLicenseRequest = (0, https_1.onRequest)((request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { purchaseData } = request.body;
    const result = yield (0, license_purchase_1.purchaseLicense)(purchaseData);
    if (!result.success) {
        response.status(500).send(result.message);
        return;
    }
    response.send(result.data);
}));
exports.checkPurchaseStatusRequest = (0, https_1.onRequest)((request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { purchaseId } = request.body;
    const result = yield (0, license_purchase_1.checkPurchaseStatus)(purchaseId);
    if (!result.success) {
        response.status(500).send(result.message);
        return;
    }
    response.send(result.data);
}));
// publisher.ts
exports.getPublisherDetailsRequest = (0, https_1.onRequest)((request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = request.body;
    const result = yield (0, publisher_1.getPublisherDetails)(userId);
    if (!result.success) {
        response.status(500).send(result.message);
        return;
    }
    response.send(result.data);
}));
exports.updatePublisherDetailsRequest = (0, https_1.onRequest)((request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, data } = request.body;
    const result = yield (0, publisher_1.updatePublisherDetails)(userId, data);
    if (!result.success) {
        response.status(500).send(result.message);
        return;
    }
    response.send(result.message);
}));
//# sourceMappingURL=index.js.map