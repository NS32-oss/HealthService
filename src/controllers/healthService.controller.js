import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import { HealthService } from "../models/healthservice.model.js";
import apiResponse from "../utils/apiResponse.js";

// Add a new health service
const createHealthService = asyncHandler(async (req, res) => {
  const {
    serviceName,
    providerName,
    yearOfEstablishment,
    price,
    discount,
    serviceDuration,
    description,
    category,
    availability,
    languageSupported,
  } = req.body;

  // Check for required fields
  if (
    [
      serviceName,
      providerName,
      yearOfEstablishment,
      price,
      serviceDuration,
      category,
      availability,
    ].includes(undefined)
  ) {
    throw new apiError(400, "Please provide all the required fields");
  }

  // Check for existing health service
  const existingHealthService = await HealthService.findOne({ serviceName });
  if (existingHealthService) {
    return res
      .status(409)
      .json(new apiResponse(409, "Health service name already exists"));
  }

  // Create a new health service
  const newHealthService = new HealthService({
    serviceName,
    providerName,
    yearOfEstablishment,
    price,
    discount,
    serviceDuration,
    description,
    category,
    availability,
    languageSupported,
  });

  // Check if health service creation was successful
  if (!newHealthService) {
    throw new apiError(500, "Error creating the health service");
  }

  // Save the new health service
  await newHealthService.save();
  return res
    .status(200)
    .json(new apiResponse(200, "Health service added successfully", newHealthService));
});

// Update an existing health service
const updateHealthService = asyncHandler(async (req, res) => {
  const healthServiceId = req.params.id;
  const {
    serviceName,
    providerName,
    yearOfEstablishment,
    price,
    discount,
    serviceDuration,
    description,
    category,
    availability,
    languageSupported,
  } = req.body;

  // Create an object with the fields to update
  const objectField = {};
  if (serviceName) objectField.serviceName = serviceName;
  if (providerName) objectField.providerName = providerName;
  if (yearOfEstablishment) objectField.yearOfEstablishment = yearOfEstablishment;
  if (price) objectField.price = price;
  if (discount) objectField.discount = discount;
  if (serviceDuration) objectField.serviceDuration = serviceDuration;
  if (description) objectField.description = description;
  if (category) objectField.category = category;
  if (availability) objectField.availability = availability;
  if (languageSupported) objectField.languageSupported = languageSupported;

  // Update the health service and return the updated document
  const healthService = await HealthService.findByIdAndUpdate(
    healthServiceId,
    objectField,
    { new: true }
  );

  // Check if the health service was found and updated
  if (!healthService) {
    throw new apiError(404, "Health service not found");
  }

  return res
    .status(200)
    .json(new apiResponse(200, "Health service updated successfully", healthService));
});

// Delete a health service
const deleteHealthService = asyncHandler(async (req, res) => {
  const healthServiceId = req.params.id;

  // Find and delete the health service by ID
  const healthService = await HealthService.findByIdAndDelete(healthServiceId);

  // Check if the health service was found
  if (!healthService) {
    throw new apiError(404, "Health service not found");
  }

  return res
    .status(200)
    .json(new apiResponse(200, "Health service deleted successfully", healthService));
});

// Get health services with optional filters and pagination
const getHealthServices = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    filterBy,
    sortBy,
    sortType = "desc",
  } = req.query;

  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  const filter = {};

  // If a filter is provided, set up a search for multiple fields
  if (filterBy) {
    const searchFields = ['serviceName', 'providerName', 'category', 'description', 'languageSupported'];
    const searchRegex = new RegExp(filterBy, 'i'); // Create a case-insensitive regex

    // Build the filter object for the search
    filter.$or = searchFields.map(field => ({
      [field]: { $regex: searchRegex }
    }));
  }

  // Set sorting criteria based on query parameters
  let sortCriteria = {};
  if (sortBy) {
    sortCriteria[sortBy] = sortType === "desc" ? -1 : 1;
  } else {
    sortCriteria = { createdAt: -1 }; // Default sort by createdAt
  }

  // Fetch health services based on filter, sort, and pagination
  const healthServices = await HealthService.find(filter)
    .sort(sortCriteria)
    .skip((pageNumber - 1) * limitNumber)
    .limit(limitNumber);

  // Calculate total items and pages for pagination
  const totalItems = await HealthService.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / limitNumber);

  // Check if any health services were found
  if (!healthServices || healthServices.length === 0) {
    throw new apiError(404, "Health services not found");
  }

  return res.status(200).json(
    new apiResponse(200, "Health services found", {
      healthServices,
      pagination: {
        currentPage: pageNumber,
        totalPages,
        totalItems,
      },
    })
  );
});

// Get a single health service by ID
const getHealthService = asyncHandler(async (req, res) => {
  const healthServiceId = req.params.id;

  // Find the health service by ID
  const healthService = await HealthService.findById(healthServiceId);

  // Check if the health service was found
  if (!healthService) {
    throw new apiError(404, "Health service not found");
  }

  return res
    .status(200)
    .json(new apiResponse(200, "Health service found", healthService));
});

// Export the functions for use in routes
export { createHealthService, updateHealthService, deleteHealthService, getHealthServices, getHealthService };
