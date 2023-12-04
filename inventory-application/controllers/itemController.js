const Item = require("../models/category");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all Categories.
exports.item_list = asyncHandler(async (req, res, next) => {
  res.send("DID NOT implemented yet. Items list!");
});

// Display detail page of a specific Category.
exports.item_detail = asyncHandler(async (req, res, next) => {
  res.send("DID NOT implemented yet. Items detail!");
});

// Display Category create form on GET.
exports.item_create_get = asyncHandler(async (req, res, next) => {
  res.send("DID NOT implemented yet. Items create GET!");
});

// Display Category create form on POST.
exports.item_create_post = asyncHandler(async (req, res, next) => {
  res.send("DID NOT implemented yet. Items create POST!");
});

// Display Category delete form on GET.
exports.item_delete_get = asyncHandler(async (req, res, next) => {
  res.send("DID NOT implemented yet. Items delete GET!");
});

// Display Category delete form on POST .
exports.item_delete_post = asyncHandler(async (req, res, next) => {
  res.send("DID NOT implemented yet. Items delete POST!");
});

// Display Category update form on GET.
exports.item_update_get = asyncHandler(async (req, res, next) => {
  res.send("DID NOT implemented yet. Items update GET!");
});

// Display Category update form on POST.
exports.item_update_post = asyncHandler(async (req, res, next) => {
  res.send("DID NOT implemented yet. Items update POST!");
});
