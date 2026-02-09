import { Router } from "express";

const router = Router();

router.post("/login", (req, res) => {
  res.send("login post");
});

export default router;
