import express from "express";
import { getPublicUsers } from "../data/users";
import { authenticate, authorizeRoles } from "../middleware/authMiddleware";

const router = express.Router();

router.use(authenticate);
router.use(authorizeRoles("admin"));

router.get("/dashboard", (request, response) => {
  response.json({
    message: "Welcome to the admin dashboard",
    user: request.user,
    permissions: [
      "manage_users",
      "manage_players",
      "manage_matches",
      "manage_news",
      "manage_gallery",
      "manage_sponsors"
    ]
  });
});

router.get("/users", (request, response) => {
  response.json({
    users: getPublicUsers()
  });
});

export default router;
