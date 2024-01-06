const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all Categories
exports.category_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: category list");
});

// Display detail page for a specific category.
exports.category_detail = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(404).json({ message: "Invalid ID" });
  }
  const category = await Category.findOne({ _id: id }).exec();
  if (category) {
    res.render("category_view", { category: category });
  } else {
    res.status(404).json({ message: "No category with specified ID" });
  }
});

// Display category create form on GET.
exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.render("category_create");
});

// Handle category create on POST.
exports.category_create_post = [
  body("categoryName")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Category name must be atleast 3 characters")
    .isLength({ max: 25 })
    .withMessage("Category name must be at most 25 characters")
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("category_create", {
        errors: errors.array(),
      });
      return;
    } else {
      const categoryExists = await Category.findOne({
        name: req.body.categoryName,
      }).exec();
      if (categoryExists) {
        res.redirect(categoryExists.url);
        return;
      }
      Category.create({ name: req.body.categoryName })
        .then((newCategory) => {
          res.redirect(newCategory.url);
        })
        .catch((error) => {
          res.render("cateogry_create", {
            errors: [
              {
                msg: "We are having issues right now, try again in a few!",
              },
            ],
          });
        });
    }
  }),
];

// Display category delete form on GET.
exports.category_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: category delete GET");
});

// Handle category delete on POST.
exports.category_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: category delete POST");
});

// Display category update form on GET.
exports.category_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: category update GET");
});

// Handle category update on POST.
exports.category_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: category update POST");
});
