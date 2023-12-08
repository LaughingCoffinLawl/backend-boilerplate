const Item = require("../models/item");
const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all Categories.
exports.item_list = asyncHandler(async (req, res, next) => {
  const myItems = await Item.find().sort({ name: 1 }).exec();

  res.render("item_list", {
    title: "Item lists",
    items: myItems,
  });
});

// Display detail page of a specific Category.
exports.item_detail = asyncHandler(async (req, res, next) => {
  const myItem = await Item.findById(req.params.id).populate("category").exec();
  if (myItem === null) {
    // No results.
    const err = new Error("Item not found!");
    err.status = 404;
    return next(err);
  }
  res.render("item_detail", {
    title: "Item Detail",
    item: myItem,
    categories: myItem.category,
  });
});

// Display Category create form on GET.
exports.item_create_get = asyncHandler(async (req, res, next) => {
  const [myItem, allCategories] = await Promise.all([
    Item.find().sort({ name: 1 }).populate("category").exec(),
    Category.find().sort({ name: 1 }).exec(),
  ]);
  res.render("item_form", {
    title: "Create Item",
    items: myItem,
    categories: allCategories,
  });
});

// Display Category create form on POST.
exports.item_create_post = [
  body("name", "The name must contain at least 3 chatacters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("description").trim().escape(),
  body("category", "Choose at least a category"),
  body("price", "Insert a price in the correct form (xx.xx)").trim().escape(),
  body("stock", "Insert how many items are in stock in the sore")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const myItem = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
    });
    if (!errors.isEmpty()) {
      res.render("item_form", {
        title: "Create Item",
        items: myItem,
        errors: errors.array(),
      });
    } else {
      const itemExists = await Item.findOne({
        name: req.body.name,
      }).exec();
      if (itemExists) {
        res.redirect(itemExists.url);
      } else {
        await myItem.save();
        res.redirect(myItem.url);
      }
    }
  }),
];

// Display Category delete form on GET.
exports.item_delete_get = asyncHandler(async (req, res, next) => {
  const myItem = await Item.findById(req.params.id).exec();
  if (myItem === null) {
    //No results.
    res.redirect("/items");
  }
  res.render("item_delete", {
    title: "Delete " + myItem.name,
    items: myItem,
  });
});

// Display Category delete form on POST .
exports.item_delete_post = asyncHandler(async (req, res, next) => {
  const myItem = await Item.findById(req.params.id).exec();
  await Item.findByIdAndDelete(req.params.id);
  res.redirect("/inventory/items");
});

// Display Category update form on GET.
exports.item_update_get = asyncHandler(async (req, res, next) => {
  const [myItem, allCategories] = await Promise.all([
    Item.findById(req.params.id).exec(),
    Category.find().sort({ name: 1 }).exec(),
  ]);
  res.render("item_form", {
    title: "Update " + myItem.name,
    items: myItem,
    categories: allCategories,
  });
});

// Display Category update form on POST.
exports.item_update_post = [
  (req, res, next) => {
    // Converts the category to an array.
    if (!Array.isArray(req.body.category)) {
      req.body.category =
        typeof req.body.category === "undefined" ? [] : [req.body.category];
    }
    next();
  },

  //Validate and sanitize fields.
  body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("description").trim().escape(),
  body("category.*").escape(),
  body("price", "Insert a price (xx.xx)").trim().escape(),
  body("stock", "Insert how many items are in stock")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category:
        typeof req.body.category === "undefined" ? [] : req.body.category,
      price: req.body.price,
      stock: req.body.stock,
      image: req.file ? req.file.filename : null,
      _id: req.params.id,
    });
    if (!errors.isEmpty()) {
      const allCategories = await Category.find().sort({ name: 1 }).exec();

      for (let i = 0; i < allCategories.length; i++) {
        if (item.category.indexOf(allCategories[i]._id) > -1) {
          allCategories[i].checked = "true";
        }
      }
      res.render("item_form", {
        title: "Update " + item.name,
        categories: allCategories,
        items: item,
        errors: errors.array(),
      });
      return;
    } else {
      const updateItem = await Item.findByIdAndUpdate(req.params.id, item, {});
      res.redirect(updateItem.url);
    }
  }),
];
