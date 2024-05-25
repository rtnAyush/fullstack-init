import { z } from "zod";

export const createPlantSchema = z.object({
	name: z.string().min(2).max(255),
	address: z.string().min(2).max(255),
	phone: z.string().min(6).max(20),
	zipcode: z.string().min(5).max(10),
	language: z.string().min(2).max(50),
	website: z.string().url(),
	active: z.boolean(),
	kpis: z.array(z.string()),
});

export const updatePlantSchema = z.object({
	name: z.string().min(2).max(255).optional(),
	address: z.string().min(2).max(255).optional(),
	phone: z.string().min(6).max(20).optional(),
	zipcode: z.string().min(5).max(10).optional(),
	language: z.string().min(2).max(50).optional(),
	website: z.string().url().optional(),
	active: z.boolean().optional(),
	kpis: z.array(z.string()),
});
