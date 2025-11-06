const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/EpressError.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");

const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

// Index Route
router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", {allListings});
}));

// New Route
router.get("/new", (req, res) => {
    res.render("listings/new.ejs");
})

// Show Route
router.get("/:id", wrapAsync(async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", {listing});
}))

//create Route
// router.post("/", 
//     validateListing, 
//     wrapAsync(async (req, res, next) => {
//         // let result = listingSchema.validate(req.body);
//         // console.log(result);
//         // if(result.error) {
//         //     throw new ExpressError(400, result.error);
//         // }
//         const newListing = new Listing(req.body.listing.image.url)
//         await newListing.save();
//         res.redirect("/listings");    
// }))

router.post(
  "/",
  validateListing,
  wrapAsync(async (req, res, next) => {

    // agar user ne image URL blank chhoda hai to ek default image de do
    if (!req.body.listing.image || !req.body.listing.image.url) {
      req.body.listing.image = {
        url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
        filename: "default"
      };
    }

    // ab ek proper object mongoose ko do
    const newListing = new Listing(req.body.listing);
    await newListing.save();

    res.redirect(`/listings/${newListing._id}`);
  })
);



// Edit Route
router.get("/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
}))

// update Route
router.put("/:id",
    validateListing,
    wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
}))

// Delete Route
router.delete("/:id", wrapAsync(async(req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing)
    res.redirect("/listings");
}))



module.exports = router;