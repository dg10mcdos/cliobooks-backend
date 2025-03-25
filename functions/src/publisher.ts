import { logger } from "firebase-functions/v2";
import { db } from ".";

export const getPublisherDetails = async (userId: string) => {
  logger.log("Getting publisher details", userId);
  const userDoc = await db
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
  } else {
    return {
      success: false,
      message: "User not found",
    };
  }
};

export const updatePublisherDetails = async (userId: string, data: any) => {
  try {
    await db.collection("users").doc(userId).update(data);
    return {
      success: true,
      message: "User details updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to update user details",
    };
  }
};
