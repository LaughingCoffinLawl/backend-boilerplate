const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Home Page
exports.index = function (req, res) {
  res.send("NOT IMPLEMENTED: Inventory home page");
};

// Display list of all Categories.
exports.category_list = asyncHandler(async (req, res, next) => {
  res.send("DID NOT implemented yet. Categories list!");
});

// Display detail page of a specific Category.
exports.category_detail = asyncHandler(async (req, res, next) => {
  res.send("DID NOT implemented yet. Category detail!");
});

// Display Category create form on GET.
exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.send("DID NOT implemented yet. Categories create GET!");
});

// Display Category create form on POST.
exports.category_create_post = asyncHandler(async (req, res, next) => {
  res.send("DID NOT implemented yet. Categories create POST!");
});

// Display Category delete form on GET.
exports.category_delete_get = asyncHandler(async (req, res, next) => {
  res.send("DID NOT implemented yet. Categories delete GET!");
});

// Display Category delete form on POST .
exports.category_delete_post = asyncHandler(async (req, res, next) => {
  res.send("DID NOT implemented yet. Categories delete POST!");
});

// Display Category update form on GET.
exports.category_update_get = asyncHandler(async (req, res, next) => {
  res.send("DID NOT implemented yet. Categories update GET!");
});

// Display Category update form on POST.
exports.category_update_post = asyncHandler(async (req, res, next) => {
  res.send("DID NOT implemented yet. Categories update POST!");
});
