const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Home Page
try {
  exports.index = asyncHandler(async (req, res, next) => {
    const [numCategories, numItems] = await Promise.all([
      Category.countDocuments({}).exec(),
      Item.countDocuments({}).exec(),
    ]);
    res.render("index", {
      title: "Local Videogames Home",
      category_count: numCategories,
      item_count: numItems,
    });
  });
} catch (error) {
  console.error("Error in /inventory route: ", error);
  res.status(500).send("Internal Server Error");
}

// Display list of all Categories.
exports.category_list = asyncHandler(async (req, res, next) => {
  const myCategories = await Category.find().sort({ name: 1 }).exec();
  res.render("category_list", {
    title: "Category List",
    category_list: myCategories,
  });
});

// Display detail page of a specific Category.
exports.category_detail = asyncHandler(async (req, res, next) => {
  const [myCategories, allItemsByCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }, "name description").exec(),
  ]);
  if (myCategories === null) {
    // No results.
    const err = new Error("Category not found.");
    err.status = 404;
    return next(err);
  }
  res.render("category_detail", {
    title: myCategories.name + " Category Detail",
    category: myCategories,
    category_item: allItemsByCategory,
  });
});

// Display Category create form on GET.
exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.render("category_form", {
    title: "Create Category",
  });
});

// Display Category create form on POST.
exports.category_create_post = [
  body("name", "The name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const category = new Category({
      name: req.body.name,
      description: req.body.description,
    });
    if (!errors.isEmpty()) {
      res.render("category_form", {
        title: "Create Category",
        category: category,
        errors: errors.array(),
      });
    } else {
      const categoryExists = await Category.findOne({
        name: req.body.name,
      }).exec();
      if (categoryExists) {
        res.redirect(categoryExists.url);
      } else {
        await category.save();
        res.redirect(category.url);
      }
    }
  }),
];

// Display Category delete form on GET.
exports.category_delete_get = asyncHandler(async (req, res, next) => {
  const [myCategory, allItemsByCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }, "name description").exec(),
  ]);
  if (myCategory === null) {
    // No results.
    res.redirect("/categories");
  }
  res.render("category_delete", {
    title: "Delete " + myCategory.name,
    category: myCategory,
    items: allItemsByCategory,
  });
});

// Display Category delete form on POST .
exports.category_delete_post = asyncHandler(async (req, res, next) => {
  const [myCategory, allItemsByCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }, "name description").exec(),
  ]);
  if (allItemsByCategory > 0) {
    res.render("category_delete", {
      title: "Delete " + myCategory.name,
      category: myCategory,
      items: allItemsByCategory,
    });
  } else {
    await Category.findByIdAndDelete(req.params.id);
    res.redirect("/inventory/categories");
  }
});

// Display Category update form on GET.
exports.category_update_get = asyncHandler(async (req, res, next) => {
  const [myCategory, allItemsByCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find().populate("category").exec(),
  ]);
  res.render("category_form", {
    title: "Update " + myCategory.name,
    categoryItem: allItemsByCategory,
    category: myCategory,
  });
});

// Display Category update form on POST.
exports.category_update_post = [
  //Validate and sanitize fields.
  body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("description").trim().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({
      name: req.body.name,
      description: req.body.description,
      _id: req.params.id,
    });
    if (!errors.isEmpty()) {
      const allItems = await Item.find().sort({ name: 1 }).exec();

      res.render("category_form", {
        title: "Update " + category.name,
        item: allItems,
        errors: errors.array(),
      });
      return;
    } else {
      const updateCategory = await Category.findByIdAndUpdate(
        req.params.id,
        category,
        {}
      );
      res.redirect(updateCategory.url);
    }
  }),
];
