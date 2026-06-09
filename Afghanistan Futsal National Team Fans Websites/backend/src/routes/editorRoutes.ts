import express from "express";
import { authenticate, authorizeRoles } from "../middleware/authMiddleware";

const router = express.Router();

router.use(authenticate);
router.use(authorizeRoles("admin", "editor"));

router.get("/dashboard", (request, response) => {
  response.json({
    message: "Welcome to the editor dashboard",
    user: request.user,
    permissions: ["create_news", "update_news", "manage_gallery", "manage_videos"]
  });
});

router.get("/content-tools", (request, response) => {
  response.json({
    tools: ["news_editor", "gallery_manager", "video_manager"]
  });
});

export default router;
