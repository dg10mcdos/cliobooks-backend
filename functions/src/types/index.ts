export enum licenseStatus {
  AVAILABLE = "AVAILABLE",
  INVITE_SENT = "INVITE_SENT",
  IN_PROGRESS = "IN_PROGRESS",
  LICENSED = "LICENSED",
  RETURNED = "RETURNED",
}
export type LicenseStatus = keyof typeof licenseStatus;

export enum purchaseStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}
export type PurchaseStatus = keyof typeof purchaseStatus;

export type Book = {
  id: string;
  title: string;
  description: string;
  licenseId?: string;
};

export type LicenseAllocation = {
  id: string;
  bookId: string;
  userId: string;
  userEmail: string;
  status: LicenseStatus;
  createdAt: number;
  updatedAt: number;
};
export type Purchase = {
  id?: string;
  userId: string;
  licenseTierId: string;
  licenseQuantity: number;
  purchaseDate: number;
  cost: number;
  purchaseStatus?: purchaseStatus;
};
export type PurchaseRequestData = {
  userId: string;
  licenseTierId: string;
  purchaseId: string;
  licenseQuantity: number;
};
export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  licensesAvailable: number;
  licensesUsed: number;
};

export type LicenseTier = {
  id: string;
  lowerBound: number;
  upperBound: number;
  price: number;
};
export type BookTableDataRow = {
  id: string;
  bookTitle: string;
  lastUpdated: number;
  created: number;
  license?: LicenseAllocation;
  userEmail: string;
};
export type HelperResponse = {
  success: boolean;
  message?: string;
  data?: any;
};
