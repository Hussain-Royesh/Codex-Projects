import express from "express";
import type { Request, Response } from "express";
import {
  createMatch,
  createPlayer,
  deleteMatch,
  deletePlayer,
  getMatchById,
  getMatches,
  getPlayerById,
  getPlayers,
  updateMatch,
  updatePlayer
} from "../data/contentStore";
import { authenticate, authorizeRoles } from "../middleware/authMiddleware";

const router = express.Router();
const adminOnly = [authenticate, authorizeRoles("admin")];

router.get("/players", async (request, response) => {
  const players = await getPlayers();
  response.json({ players });
});

router.get("/players/:id", async (request, response) => {
  const player = await getPlayerById(request.params.id);

  if (!player) {
    return response.status(404).json({ message: "Player not found" });
  }

  return response.json({ player });
});

router.post("/players", adminOnly, async (request: Request, response: Response) => {
  if (!request.body.name) {
    return response.status(400).json({ message: "Player name is required" });
  }

  const player = await createPlayer(request.body);
  return response.status(201).json({ player });
});

router.put("/players/:id", adminOnly, async (request: Request, response: Response) => {
  const player = await updatePlayer(String(request.params.id), request.body);

  if (!player) {
    return response.status(404).json({ message: "Player not found" });
  }

  return response.json({ player });
});

router.delete("/players/:id", adminOnly, async (request: Request, response: Response) => {
  const deleted = await deletePlayer(String(request.params.id));

  if (!deleted) {
    return response.status(404).json({ message: "Player not found" });
  }

  return response.status(204).send();
});

router.get("/matches", async (request, response) => {
  const matches = await getMatches();
  response.json({ matches });
});

router.get("/matches/:id", async (request, response) => {
  const match = await getMatchById(request.params.id);

  if (!match) {
    return response.status(404).json({ message: "Match not found" });
  }

  return response.json({ match });
});

router.post("/matches", adminOnly, async (request: Request, response: Response) => {
  if (!request.body.date || !request.body.time) {
    return response.status(400).json({ message: "Match date and time are required" });
  }

  const match = await createMatch(request.body);
  return response.status(201).json({ match });
});

router.put("/matches/:id", adminOnly, async (request: Request, response: Response) => {
  const match = await updateMatch(String(request.params.id), request.body);

  if (!match) {
    return response.status(404).json({ message: "Match not found" });
  }

  return response.json({ match });
});

router.delete("/matches/:id", adminOnly, async (request: Request, response: Response) => {
  const deleted = await deleteMatch(String(request.params.id));

  if (!deleted) {
    return response.status(404).json({ message: "Match not found" });
  }

  return response.status(204).send();
});

export default router;
