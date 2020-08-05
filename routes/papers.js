const express = require("express");
const Paper = require("../models/paper");
const router = express.Router();

router.get("/new", (req, res) => {
  res.render("papers/new", { paper: new Paper() });
});

router.get("/:slug", async (req, res) => {
  const paper = await Paper.findOne({slug: req.params.slug});
  if (paper == null) res.redirect("/dashboard");
  res.render("papers/show", { paper: paper });
});


router.post("/", async (req, res) => {
  let paper = new Paper({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
  });

  try {
    paper = await paper.save();
    res.redirect(`/papers/${paper.slug}`);
  } catch (error) {
    console.log(error);
    res.render("papers/new", { paper: paper });
  }
});

module.exports = router;
