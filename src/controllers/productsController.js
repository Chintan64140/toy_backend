import multer from "multer";
import prisma from "../config/db.js";
import path from "path";
import fs from "fs";
// Set up storage for image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// GET all products
export const getProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany({ include: { createdBy: true } });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
};

// POST create a new product
export const createProduct = async (req, res) => {
    try {
        const { name, productType, userId } = req.body;
        if (!name || !productType || !userId) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const product = await prisma.product.create({
            data: { name, productType, userId },
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: "Failed to create product" });
    }
};

// DELETE a product
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ error: "Product ID is required" });
        }
        await prisma.product.delete({ where: { id } });
        res.status(200).json({ message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete product" });
    }
};

export const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No image provided" });
        }
        // Convert image buffer to base64 string
        const imageBase64 = req.file.buffer.toString("base64");
        res.status(200).json({ image: imageBase64 });
    } catch (error) {
        res.status(500).json({ error: "Failed to upload image" });
    }
};



