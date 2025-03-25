import { db } from ".";
import { Purchase, PurchaseRequestData, purchaseStatus, User } from "./types";

export const purchaseLicense = async (purchaseData: PurchaseRequestData) => {
  const tierDoc = await db
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
  const cost = purchaseData.licenseQuantity * tierData.price;

  const purchase = {
    id: purchaseData.purchaseId,
    userId: purchaseData.userId,
    licenseTierId: purchaseData.licenseTierId,
    licenseQuantity: purchaseData.licenseQuantity,
    purchaseDate: Date.now(),
    cost: cost,
    purchaseStatus: purchaseStatus.PENDING,
  } as Purchase;

  await db.collection("purchases").doc(purchaseData.purchaseId).set(purchase);

  await setTimeout(() => {}, 5000);

  if (Math.random() > 0.5) {
    await db.collection("purchases").doc(purchaseData.purchaseId).update({
      purchaseStatus: "COMPLETED",
    });
    const userDoc = await db.collection("users").doc(purchaseData.userId).get();
    const userData = userDoc.data() as User;
    await db
      .collection("users")
      .doc(purchaseData.userId)
      .update({
        licensesAvailable:
          userData.licensesAvailable + purchaseData.licenseQuantity,
      });
    return {
      success: true,
      data: {
        purchaseId: purchaseData.purchaseId,
      },
    };
  } else {
    await db.collection("purchases").doc(purchaseData.purchaseId).update({
      purchaseStatus: "FAILED",
    });
    return {
      success: false,
      message: "Purchase failed",
    };
  }
};

export const checkPurchaseStatus = async (purchaseId: string) => {
  const purchaseDoc = (await db
    .collection("purchases")
    .doc(purchaseId)
    .get()
    .then((doc) => {
      return doc.data();
    })) as Purchase;

  if (!purchaseDoc) {
    return {
      success: false,
      message: "Purchase not found",
    };
  } else {
    return {
      success: true,
      data: {
        purchaseStatus: purchaseDoc,
      },
    };
  }
};
