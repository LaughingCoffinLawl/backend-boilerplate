const express = require("express");
const router = express.Router();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.params.id);
  },
});

const upload = multer({ storage: storage });

// Require controller modules.
const category_controller = require("../controllers/categoryController");
const item_controller = require("../controllers/itemController");

/* GET inventory home page. */
router.get("/", category_controller.index);

/// CATEGORY ROUTES ///

// GET request for creating a Category.
router.get("/category/create", category_controller.category_create_get);

// POST request for creating Category.
router.post("/category/create", category_controller.category_create_post);

// GET request to delete Category.
router.get("/category/:id/delete", category_controller.category_delete_get);

// POST request to delete Category.
router.post("/category/:id/delete", category_controller.category_delete_post);

// GET request to update Book.
router.get("/category/:id/update", category_controller.category_update_get);

// POST request to update Book.
router.post("/category/:id/update", category_controller.category_update_post);

// GET request for one Category.
router.get("/category/:id", category_controller.category_detail);

// GET request for list of all Categories.
router.get("/categories", category_controller.category_list);

/// ITEMS ROUTES ///

// GET request for creating an ITEM.
router.get("/item/create", item_controller.item_create_get);

// POST request for creating ITEMS.
router.post(
  "/item/create",
  upload.single("image"),
  item_controller.item_create_post
);

// GET request to delete ITEM.
router.get("/item/:id/delete", item_controller.item_delete_get);

// POST request to delete ITEM.
router.post("/item/:id/delete", item_controller.item_delete_post);

// GET request to update ITEM.
router.get("/item/:id/update", item_controller.item_update_get);

// POST request to update ITEM.
router.post(
  "/item/:id/update",
  upload.single("image"),
  item_controller.item_update_post
);

// GET request for one Item.
router.get("/item/:id/", item_controller.item_detail);

// GET request for list of all Items.
router.get("/items", item_controller.item_list);

module.exports = router;
