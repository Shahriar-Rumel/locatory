const Place = require("../models/Place");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const geocoder = require("../utils/geocoder");

// @desc  Get all places
//@route GET /api/places
//@access Public
exports.getPlaces = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc  Get a place
//@route GET /api/places/:id
//@access Public
exports.getPlace = asyncHandler(async (req, res, next) => {
  const place = await Place.findById(req.params.id);

  if (!place) {
    return next(
      new ErrorResponse(`Place not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: place });
});

// @desc  Create a place
//@route Post /api/places
//@access Private
exports.createPlace = asyncHandler(async (req, res, next) => {
  //Add user to req,body
  req.body.user = req.user.id;
  const place = await Place.create(req.body);

  res.status(201).json({ success: true, data: place });
});

// @desc  Update a place
//@route Put /api/places/:id
//@access Private
exports.updatePlace = asyncHandler(async (req, res, next) => {
  let place = await Place.findById(req.params.id);
  if (!place) {
    return next(
      new ErrorResponse(`Place not found with id of ${req.params.id}`, 404)
    );
  }

  //Make sure user is the post creator
  if (place.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this place`,
        401
      )
    );
  }

  place = await Place.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: place });
});

// @desc  Delete a place
//@route Delete /api/places/:id
//@access Private
exports.deletePlace = asyncHandler(async (req, res, next) => {
  const place = await Place.findById(req.params.id);
  if (!place) {
    return next(
      new ErrorResponse(`Place not found with id of ${req.params.id}`, 404)
    );
  }
  //Make sure user is the post creator
  if (place.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to delete this place`,
        401
      )
    );
  }
  place.remove();
  res
    .status(200)
    .json({ success: true, data: {}, msg: `deleted successfully` });
});

// @desc  Get places by user
//@route GET /api/placesbyuser/
//@access Private
exports.getPlaceByUser = asyncHandler(async (req, res, next) => {
  const places = await Place.find({
    user: req.user.id,
  });

  if (!places) {
    return next(new ErrorResponse(`User didn't create a place`, 404));
  }

  res.status(200).json({ success: true, data: places });
});

// @desc      Get places within a radius
// @route     GET /api/places/radius/:zipcode/:distance
// @access    Private
exports.getPlacesInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  // Divide dist by radius of Earth
  // Earth Radius = 3,963 mi / 6,378 km
  const radius = distance / 3963;

  const places = await Place.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    success: true,
    count: places.length,
    data: places,
  });
});
