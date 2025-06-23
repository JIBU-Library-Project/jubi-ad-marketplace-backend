const { Router } = require("express");
const {
  getAllAds,
  getAdsById,
  postAds,
} = require("../controllers/ads.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer.middleware");
const router = Router();

router.get("/api/adverts", authenticate, getAllAds);
router.get("/api/adverts/:id", authenticate, getAdsById);
router.post(
  "/api/adverts/post",
  authenticate,
  authorize(["vendor"]),
  upload.array("files", 5),
  postAds
);
module.exports = router;
