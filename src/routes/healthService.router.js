import { Router } from "express";
import {
  createHealthService,
  deleteHealthService,
  getHealthService,
  getHealthServices,
  updateHealthService,
} from "../controllers/healthService.controller.js";
const router = Router();

router.route("/").post(createHealthService).get(getHealthServices);

router
  .route("/:id")
  .patch(updateHealthService)
  .delete(deleteHealthService)
  .get(getHealthService);

export default router;
