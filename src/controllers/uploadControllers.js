import supabase from "../config/supabase.js";
import prisma from "../config/db.js";

// Upload Product Image
export const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const file = req.file

        const { data, error } = await supabase
            .storage
            .from('jewelry')
            .upload(`Public/${Date.now()}_${file.originalname}`, file.buffer, {
                cacheControl: '3600',
                upsert: false,
                contentType: req.file.mimetype,
            })

        if (error) throw error;
        const data_url = supabase
            .storage
            .from('jewelry').getPublicUrl(data.path);
        const publicUrl = data_url.data.publicUrl

        const product = await prisma.image.create({
            data: { url: publicUrl },
        });

        res.status(200).json({ message: "File uploaded successfully", product });
    } catch (err) {
        res.status(500).json({ error: err.message });

    }
};

// Get all products
export const getProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
};
