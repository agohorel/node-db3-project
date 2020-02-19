const express = require("express");
const Schemes = require("./scheme-model.js");
const validation = require("./scheme-validation.js");

const router = express.Router();

router.get("/", (req, res) => {
  Schemes.find()
    .then(schemes => {
      res.json(schemes);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get schemes" });
    });
});

router.get("/:id", validation.schemeID, (req, res) => {
  const { id } = req.params;

  Schemes.findById(id)
    .then(scheme => {
      if (scheme) {
        res.json(scheme);
      } else {
        res
          .status(404)
          .json({ message: "Could not find scheme with given id." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get schemes" });
    });
});

router.get("/:id/steps", (req, res) => {
  const { id } = req.params;

  Schemes.findSteps(id)
    .then(steps => {
      if (steps.length) {
        res.json(steps);
      } else {
        res
          .status(404)
          .json({ message: "Could not find steps for given scheme" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get steps" });
    });
});

router.post("/", validation.schemeBody, async (req, res) => {
  const schemeData = req.body;

  try {
    const [schemeID] = await Schemes.add(schemeData);
    const scheme = await Schemes.findById(schemeID);
    res.status(201).json(scheme);
  } catch (error) {
    res.status(500).json({ message: "Failed to create new scheme" });
  }
});

// router.post("/:id/steps", (req, res) => {
//   const stepData = req.body;
//   const { id } = req.params;

//   Schemes.findById(id)
//     .then(scheme => {
//       if (scheme) {
//         Schemes.addStep(stepData, id).then(step => {
//           res.status(201).json(step);
//         });
//       } else {
//         res
//           .status(404)
//           .json({ message: "Could not find scheme with given id." });
//       }
//     })
//     .catch(err => {
//       res.status(500).json({ message: "Failed to create new step" });
//     });
// });

router.put(
  "/:id",
  [validation.schemeID, validation.schemeBody],
  async (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    try {
      const hasBeenUpdated = await Schemes.update(changes, id);
      if (hasBeenUpdated) {
        const updatedPost = await Schemes.findById(id);
        res.status(200).json(updatedPost);
      } else {
        res
          .status(404)
          .json({ message: "Could not find scheme with given id" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to update scheme" });
    }
  }
);

router.delete("/:id", validation.schemeID, async (req, res) => {
  const { id } = req.params;

  try {
    const itemToBeDeleted = await Schemes.findById(id);
    await Schemes.remove(id);
    res.status(200).json(itemToBeDeleted);
  } catch (error) {
    res.status(500).json({ message: "Failed to delete scheme" });
  }
});

router.post(
  "/:id/add-step",
  [validation.schemeID, validation.stepBody],
  async (req, res) => {
    try {
      await Schemes.addStep(req.body, req.params.id);
      const steps = await Schemes.findSteps(req.params.id);
      res.status(201).json(steps);
    } catch (error) {
      res.status(500).json({ message: "Failed to add step" });
    }
  }
);

module.exports = router;
