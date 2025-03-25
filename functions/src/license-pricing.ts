import { db } from ".";

export const getPricing = async () => {
  const pricingTiers = await db.collection("pricingInformation").get();
  return {
    success: true,
    data: pricingTiers.docs.map((doc) => doc.data()),
  };
};
