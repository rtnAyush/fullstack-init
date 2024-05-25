import express from "express";
import {
	createAdmin,
	createUser,
	getAdminById,
	getMyProfile,
	getUserStats,
	listAdmins,
	listUsers,
	login,
	updateAdmin,
	updatePassword,
	updateProfile,
	updateUser,
} from "../controllers/auth.controller";
import validate from "../middlewares/validation";
import {
	LoginSchema,
	createAdminSchema,
	createUserSchema,
	updateAdminSchema,
	updatePasswordSchema,
	updateProfileSchema,
	updateUserSchema,
} from "../schemas/users.schema";
import { verifyTokenAndRole } from "../middlewares/validate-access";
import { USER_ROLES } from "../constants";

const router = express.Router();

router.post("/login", validate(LoginSchema), login);

router.post(
	"/update-profile",
	validate(updateProfileSchema),
	verifyTokenAndRole(USER_ROLES.VIEWER),
	updateProfile
);

router.post(
	"/change-password",
	validate(updatePasswordSchema),
	verifyTokenAndRole(USER_ROLES.VIEWER),
	updatePassword
);

router.get("/my-profile", verifyTokenAndRole(USER_ROLES.VIEWER), getMyProfile);

router.post("/create-admin", validate(createAdminSchema), createAdmin);

router.get(
	"/get-admins/:id",
	verifyTokenAndRole(USER_ROLES.SUPER_ADMIN),
	getAdminById
);

router.get("/get-admins", listAdmins);

router.post(
	"/update-admin/:id",
	validate(updateAdminSchema),
	updateAdmin
);

router.get("/stats", verifyTokenAndRole(USER_ROLES.SUPER_ADMIN), getUserStats);

router.get("/", listUsers);
router.post("/create-user", validate(createUserSchema), createUser);
router.post("/update-user/:id", validate(updateUserSchema), updateUser);
export default router;
