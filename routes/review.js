const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");

const { isLoggedIn, isReviewauthor } = require("../middleware.js");

const ReviewController = require("../controller/reviews.js");


// ---------------------
// Server-side validation
// ---------------------
const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);

    if (error) {
        const errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(errMsg, 400);
    } else {
        next();
    }
};


// ---------------------
// Create Review
// POST /listings/:id/reviews
// ---------------------
router.post(
    "/reviews",
    isLoggedIn,
    validateReview,
    wrapAsync(ReviewController.createReview)
);


// ---------------------
// Delete Review
// DELETE /listings/:id/reviews/:reviewId
// ---------------------
router.delete(
    "/reviews/:reviewId",
    isLoggedIn,
    isReviewauthor,
    wrapAsync(ReviewController.destroyReview)   // ✅ FIXED NAME
);


module.exports = router;