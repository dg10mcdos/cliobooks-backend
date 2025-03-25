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
exports.checkPurchaseStatus = exports.purchaseLicense = void 0;
const _1 = require(".");
const types_1 = require("./types");
const uuid_1 = require("uuid");
const purchaseLicense = (purchaseData) => __awaiter(void 0, void 0, void 0, function* () {
    const tierDoc = yield _1.db
        .collection("pricingInformation")
        .doc(purchaseData.licenseTierId)
        .get()
        .then((doc) => {
        return doc.data();
    });
    if (!tierDoc) {
        throw new Error("License tier not found");
    }
    const tierData = tierDoc.data();
    const purchaseId = (0, uuid_1.v4)();
    const cost = purchaseData.licenseQuantity * tierData.price;
    const purchase = {
        id: purchaseId,
        userId: purchaseData.userId,
        licenseTierId: purchaseData.licenseTierId,
        licenseQuantity: purchaseData.licenseQuantity,
        purchaseDate: Date.now(),
        cost: cost,
        purchaseStatus: types_1.purchaseStatus.PENDING,
    };
    yield _1.db.collection("purchases").doc(purchaseId).set(purchase);
    yield setTimeout(() => { }, 5000);
    if (Math.random() > 0.5) {
        yield _1.db.collection("purchases").doc(purchaseId).update({
            purchaseStatus: "COMPLETED",
        });
        const userDoc = yield _1.db.collection("users").doc(purchaseData.userId).get();
        const userData = userDoc.data();
        yield _1.db
            .collection("users")
            .doc(purchaseData.userId)
            .update({
            licensesAvailable: userData.licensesAvailable + purchaseData.licenseQuantity,
        });
        return {
            success: true,
            data: {
                purchaseId,
            },
        };
    }
    else {
        yield _1.db.collection("purchases").doc(purchaseId).update({
            purchaseStatus: "FAILED",
        });
        return {
            success: false,
            message: "Purchase failed",
        };
    }
});
exports.purchaseLicense = purchaseLicense;
const checkPurchaseStatus = (purchaseId) => __awaiter(void 0, void 0, void 0, function* () {
    const purchaseDoc = (yield _1.db
        .collection("purchases")
        .doc(purchaseId)
        .get()
        .then((doc) => {
        return doc.data();
    }));
    if (!purchaseDoc) {
        return {
            success: false,
            message: "Purchase not found",
        };
    }
    else {
        return {
            success: true,
            data: {
                purchaseStatus: purchaseDoc,
            },
        };
    }
});
exports.checkPurchaseStatus = checkPurchaseStatus;
//# sourceMappingURL=license-purchase.js.map