const express = require("express");
const router = express.Router();

// Require controller modules.
const category_controller = require("../controllers/categoryController");
const item_controller = require("../controllers/itemController");

/* GET inventory home page. */
router.get("/", category_controller.index);

/// CATEGORY ROUTES ///

// GET request for creating a Category.
router.get("/category/create", category_controller.category_create_get);

// POST request for creating Category.
router.get("/category/create", category_controller.category_create_post);

// GET request to delete Category.
router.get("/category/delete", category_controller.category_delete_get);

// POST request to delete Category.
router.get("/category/delete", category_controller.category_delete_post);

// GET request to update Book.
router.get("/category/:id/update", category_controller.category_update_get);

// POST request to update Book.
router.get("/category/:id/update", category_controller.category_update_post);

// GET request for one Category.
router.get("/category/:id", category_controller.category_detail);

// GET request for list of all Categories.
router.get("/category/:id/categories", category_controller.category_list);

/// ITEMS ROUTES ///

// GET request for creating a Category.
router.get("/item/create", item_controller.item_create_get);

// POST request for creating Category.
router.get("/item/create", item_controller.item_create_post);

// GET request to delete Category.
router.get("/item/delete", item_controller.item_delete_get);

// POST request to delete Category.
router.get("/item/delete", item_controller.item_delete_post);

// GET request to update Book.
router.get("/item/:id/update", item_controller.item_update_get);

// POST request to update Book.
router.get("/item/:id/update", item_controller.item_update_post);

// GET request for one Category.
router.get("item/:id/update", item_controller.item_detail);

// GET request for list of all Categories.
router.get("item/:id/update", item_controller.item_list);

module.exports = router;
