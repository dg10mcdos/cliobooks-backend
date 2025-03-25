import { db } from ".";
import { HelperResponse } from "./types";

export const getBooks = async (): Promise<HelperResponse> => {
  try {
    const books = await db
      .collection("books")
      .get()
      .then((snapshot) => {
        return snapshot.docs.map((doc) => doc.data());
      });
    return {
      success: true,
      data: books,
    };
  } catch (error) {
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
