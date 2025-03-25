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
exports.updateBook = exports.getBooks = void 0;
const _1 = require(".");
const getBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield _1.db
            .collection("books")
            .get()
            .then((snapshot) => {
            return snapshot.docs.map((doc) => doc.data());
        });
        // TODO: Join the books with any licenses that are available
        return {
            success: true,
            data: books,
        };
    }
    catch (error) {
        return {
            success: false,
            message: "Failed to get books",
        };
    }
});
exports.getBooks = getBooks;
const updateBook = (bookId, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // TODO: update any license information
        yield _1.db.collection("books").doc(bookId).update(data);
        return {
            success: true,
            message: "Book updated successfully",
        };
    }
    catch (error) {
        return {
            success: false,
            message: "Failed to update book",
        };
    }
});
exports.updateBook = updateBook;
//# sourceMappingURL=book.js.map