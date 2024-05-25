import { Request, Response } from "express";
import { User } from "../models/user.model";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const login = async (req: Request, res: Response): Promise<void> => {
	const { email, password } = req.body;

	try {
		const existingUser = await User.findOne({ email }).populate([
			"plantId",
		]);

		if (!existingUser) {
			throw "User not exists.";
		}
		if (!existingUser?.active) {
			throw "Inactive user";
		}

		const passwordsMatch = await Password.compare(
			existingUser.password,
			password
		);
		if (!passwordsMatch) {
			throw "Invalid credentials";
		}

		const userJwt = jwt.sign(
			{
				id: existingUser.id,
				email: existingUser.email,
				role: existingUser.role,
				plantId: existingUser.plantId,
				firstName: existingUser.firstName,
				lastName: existingUser.lastName,
			},
			process.env.JWT_KEY!
		);

		res.status(200).send({
			user: {
				_id: existingUser._id,
				firstName: existingUser.firstName,
				lastName: existingUser.lastName,
				email: existingUser.email,
				role: existingUser.role,
				plantId: existingUser.plantId,
			},
			userJwt,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error ?? "Internal server error" });
	}
};

export const updateProfile = async (req: any, res: Response): Promise<void> => {
	const { firstName, lastName } = req.body;
	try {
		const updatedUser = await User.findByIdAndUpdate(
			req.user.id, // User ID from req.user
			{ firstName, lastName }, // New profile fields
			{ new: true } // Return the updated document
		).select("_id");
		if (!updatedUser) throw "User not found";

		res.status(200).json(updatedUser);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error ?? "Internal server error" });
	}
};

export const getMyProfile = async (req: any, res: Response): Promise<void> => {
	try {
		const user = await User.findById(req.user.id).select([
			"_id",
			"firstName",
			"lastName",
			"role",
		]);
		// Check if user is found
		if (user) {
			// Return profile details
			res.status(200).json(user);
		} else {
			throw "User not found";
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const updatePassword = async (
	req: any,
	res: Response
): Promise<void> => {
	const { currentPassword, newPassword } = req.body;
	try {
		// Find the user by ID
		const user = await User.findById(req.user.id);

		// Check if user exists
		if (!user) {
			res.status(404).json({ message: "User not found" });
			return;
		}

		const passwordsMatch = await Password.compare(
			user.password,
			currentPassword
		);
		if (!passwordsMatch) {
			throw "Invalid password";
		}

		// Update the password
		user.password = newPassword;
		await user.save();

		res.status(200).json({ message: "Password updated successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error ?? "Internal server error" });
	}
};

export const createAdmin = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const { firstName, lastName, email, phone, plantId, active } = req.body;

		// Create the admin
		const admin = new User({
			firstName,
			lastName,
			email,
			phone,
			role: "ADMIN",
			plantId,
			password: "Password$1234",
			active: true,
		});
		await admin.save();

		res.status(201).json({ message: "Admin created successfully", admin });
	} catch (error: any) {
		console.error("Error creating admin:", error);
		res.status(500).json({
			message:
				error.code === 11000 ? "Email already exists" : error.message,
		});
	}
};

export const updateAdmin = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const { firstName, lastName, email, phone, role, plantId, active } =
			req.body;
		const { id } = req.params;

		// Check if the admin exists
		const admin = await User.findById(id);
		if (!admin) {
			res.status(404).json({ message: "Admin not found" });
			return;
		}


		// Update the admin
		admin.firstName = firstName;
		admin.lastName = lastName;
		admin.email = email;
		admin.phone = phone;
		admin.active = active;
		admin.role = role;
		admin.plantId = plantId;

		await admin.save();

		res.status(200).json({ message: "Admin updated successfully", admin });
	} catch (error: any) {
		console.error("Error updating admin:", error);
		res.status(500).json({
			message: error ? error.message : "Internal server error",
		});
	}
};

export const listAdmins = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		let filter: any = {}; // Default filter
		filter = {
			role: { $ne: "SUPER_ADMIN" },
		};

		if (req.query.plantId) {
			filter = {
				...filter,
				plantId: new mongoose.Types.ObjectId(
					req.query.plantId.toString()
				),
			};
		}

		const admins = await User.find(filter)
			.select(["-password"])
			.populate("plantId");

		res.status(200).json(admins);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error ?? "Internal server error" });
	}
};

// Controller method to get a admin by its ID
export const getAdminById = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { id } = req.params; // Extract the admin ID from the request parameters

	try {
		// Find the admin by its ID in the database
		const admin = await User.findById(id)
			.select([
				"_id",
				"firstName",
				"lastName",
				"role",
				"email",
				"phone",
				"plantId",
				"active",
			])
			.populate(["plantId"]);

		res.status(200).json(admin);
	} catch (error) {
		// If an error occurs during the database operation, return an error response
		console.error("Error fetching location by ID:", error);
		res.status(500).json({ message: error ?? "Internal server error" });
	}
};

// Controller method to get total admin users and total users without superadmin
export const getUserStats = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		// Total admin users count
		const adminCount = await User.countDocuments({ role: "ADMIN" });

		// Total users count without superadmin
		const usersWithoutSuperadminCount = await User.countDocuments({
			role: { $ne: "SUPER_ADMIN" },
		});

		// Return the user statistics as a response
		res.status(200).json({
			adminCount,
			usersWithoutSuperadminCount,
		});
	} catch (error) {
		// If an error occurs during the database operation, return an error response
		console.error("Error fetching user statistics:", error);
		res.status(500).json({ message: error ?? "Internal server error" });
	}
};

// created new user for different roles
export const createUser = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const {
			firstName,
			lastName,
			email,
			phone,
			plantId,
			role,
			active,
			screenIds,
			screens,
		} = req.body;

		// Create the admin
		const newUser = new User({
			firstName,
			lastName,
			email,
			phone,
			role,
			plantId,
			password: "Password$1234",
			active: true,
			screens,
		});
		await newUser.save();

		res.status(201).json({ message: "user created successfully", newUser });
	} catch (error: any) {
		console.error(
			"Error creating user:",
			error.code === 11000 ? "Email already exists" : error
		);
		res.status(500).json({
			message:
				error.code === 11000 ? "Email already exists" : error.message,
		});
	}
};

// update
export const updateUser = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const {
			firstName,
			lastName,
			email,
			phone,
			role,
			plantId,
			screenIds,
			screens,
		} = req.body;

		const { id } = req.params;

		// Check if the admin exists
		const foundUser = await User.findById(id);
		if (!foundUser) {
			res.status(404).json({ message: "User not found" });
			return;
		}

		// Update the admin
		foundUser.firstName = firstName;
		foundUser.lastName = lastName;
		foundUser.email = email;
		foundUser.phone = phone;
		// foundUser.active = active;
		foundUser.role = role;
		foundUser.plantId = plantId;
		foundUser.screens = screens;

		await foundUser.save();

		res.status(200).json({
			message: "Admin updated successfully",
			foundUser,
		});
	} catch (error) {
		console.error("Error updating admin:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};
// list users
export const listUsers = async (req: Request, res: Response): Promise<void> => {
	try {
		let filter: any = {};

		if (req.query.plantId) {
			filter = {
				...filter,
				plantId: new mongoose.Types.ObjectId(
					req.query.plantId.toString()
				),
			};
		}

		filter = {
			...filter,
			role: { $nin: ["SUPER_ADMIN", "ADMIN"] },
		};

		const users = await User.find(filter)
			.select(["-password"])
			.populate(["plantId"]);

		res.status(200).json(users);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error ?? "Internal server error" });
	}
};
