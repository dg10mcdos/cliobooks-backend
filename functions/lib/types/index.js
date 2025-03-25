"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchaseStatus = exports.licenseStatus = void 0;
var licenseStatus;
(function (licenseStatus) {
    licenseStatus["AVAILABLE"] = "AVAILABLE";
    licenseStatus["INVITE_SENT"] = "INVITE_SENT";
    licenseStatus["IN_PROGRESS"] = "IN_PROGRESS";
    licenseStatus["LICENSED"] = "LICENSED";
    licenseStatus["RETURNED"] = "RETURNED";
})(licenseStatus || (exports.licenseStatus = licenseStatus = {}));
var purchaseStatus;
(function (purchaseStatus) {
    purchaseStatus["PENDING"] = "PENDING";
    purchaseStatus["COMPLETED"] = "COMPLETED";
})(purchaseStatus || (exports.purchaseStatus = purchaseStatus = {}));
//# sourceMappingURL=index.js.map