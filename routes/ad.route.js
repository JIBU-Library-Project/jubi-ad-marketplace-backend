const { Router } = require("express");
const {
  getAllAds,
  getAdsById,
  postAds,
  deleteAd,
  updateAd,
  getAdsByVendorId,
} = require("../controllers/ads.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer.middleware");
const router = Router();

router.get("/api/adverts", getAllAds);
router.get("/api/adverts/:id", authenticate, getAdsById);
router.post(
  "/api/adverts/post",
  authenticate,
  authorize(["vendor"]),
  upload.array("files", 5),
  postAds
);
router.delete(
  "/api/adverts/:id",
  authenticate,
  authorize(["vendor"]),
  deleteAd
);

router.patch("/api/adverts/:id", authenticate, authorize(["vendor"]), updateAd);

router.get(
  "/api/vendor/adverts",
  authenticate,
  authorize(["vendor"]),
  getAdsByVendorId
);

module.exports = router;
