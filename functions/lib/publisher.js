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
exports.updatePublisherDetails = exports.getPublisherDetails = void 0;
const _1 = require(".");
const getPublisherDetails = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userDoc = yield _1.db
        .collection("users")
        .doc(userId)
        .get()
        .then((doc) => {
        return doc.data();
    });
    if (userDoc) {
        return {
            success: true,
            data: {
                user: userDoc,
            },
        };
    }
    else {
        return {
            success: false,
            message: "User not found",
        };
    }
});
exports.getPublisherDetails = getPublisherDetails;
const updatePublisherDetails = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield _1.db.collection("users").doc(userId).update(data);
        return {
            success: true,
            message: "User details updated successfully",
        };
    }
    catch (error) {
        return {
            success: false,
            message: "Failed to update user details",
        };
    }
});
exports.updatePublisherDetails = updatePublisherDetails;
//# sourceMappingURL=publisher.js.map