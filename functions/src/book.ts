import { logger } from "firebase-functions/v2";
import { db } from ".";
import { BookTableDataRow, HelperResponse } from "./types";

export const getBooks = async (): Promise<HelperResponse> => {
  try {
    const licenses = await db
      .collection("licenseAllocations")
      .get()
      .then((snapshot) => {
        return snapshot.docs.map((doc) => doc.data());
      });
    const books = await db
      .collection("books")
      .get()
      .then((snapshot) => {
        return snapshot.docs.map((doc) => doc.data());
      });
    logger.log(licenses[1]);
    const booksWithLicenses: BookTableDataRow[] = books.map((book) => {
      const license = licenses.find((license) => license.bookId === book.id);
      return {
        id: book.id,
        bookTitle: book.title,
        lastUpdated: license?.updatedAt,
        created: license?.createdAt,
        userEmail: license?.userEmail,
        license: license?.id,
      } as BookTableDataRow;
    });

    // TODO: Join the books with any licenses that are available
    return {
      success: true,
      data: booksWithLicenses,
    };
  } catch (error) {
    logger.log("Failed to get books", error);
    return {
      success: false,
      message: "Failed to get books",
    };
  }
};
export const updateBook = async (
  bookId: string,
  data: any
): Promise<HelperResponse> => {
  try {
    // TODO: update any license information
    await db.collection("books").doc(bookId).update(data);
    return {
      success: true,
      message: "Book updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to update book",
    };
  }
};
