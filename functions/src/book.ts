import { logger } from "firebase-functions/v2";
import { db } from ".";
import {
  Book,
  BookTableDataRow,
  HelperResponse,
  LicenseAllocation,
  licenseStatus,
} from "./types";
import { v4 as uuid } from "uuid";

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
        status: license?.status,
        license: license?.id,
      } as BookTableDataRow;
    });

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
export const assignLicense = async (
  bookId: string,
  userId: string,
  userEmail: string
): Promise<HelperResponse> => {
  try {
    const oldLicenseId = (
      await db
        .collection("books")
        .doc(bookId)
        .get()
        .then((doc) => {
          return doc.data() as Book;
        })
    ).licenseId;
    if (!oldLicenseId) {
      const license = {
        id: uuid(),
        bookId: bookId,
        userId: userId,
        userEmail: userEmail,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        status: licenseStatus.INVITE_SENT,
      } as LicenseAllocation;
      await db.collection("books").doc(bookId).update({
        licenseId: license.id,
      });
      await db.collection("licenseAllocations").doc(license.id).set(license);
      return {
        success: true,
        data: license.id,
      };
    } else {
      logger.log("old license");
      await db.collection("licenseAllocations").doc(oldLicenseId).update({
        status: licenseStatus.INVITE_SENT,
        userEmail: userEmail,
        userId: userId,
        updatedAt: Date.now(),
      });
      return {
        success: true,
        data: oldLicenseId,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Failed to assign license",
    };
  }
};
export const returnLicense = async (
  bookId: string
): Promise<HelperResponse> => {
  const book = await db
    .collection("books")
    .doc(bookId)
    .get()
    .then((doc) => {
      return doc.data() as Book;
    });
  if (!book.licenseId) {
    return {
      success: false,
      message: "No license assigned to this book",
    };
  }
  try {
    logger.log("LICENCE ID:", book.licenseId);
    await db
      .collection("licenseAllocations")
      .doc(book.licenseId)
      .update({
        status: licenseStatus.RETURNED,
        updatedAt: Date.now(),
      } as LicenseAllocation);
    logger.log("hit2");

    return {
      success: true,
      message: "License returned successfully",
    };
  } catch (error) {
    logger.log("hit3");

    return {
      success: false,
      message: "Failed to return license",
    };
  }
};
