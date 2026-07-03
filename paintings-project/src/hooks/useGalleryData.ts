import { useEffect, useState } from "react";
import { getPaintings } from "../api/paintings";
import { getCategories } from "../api/categories";

type Painting = {
    _id?: string;
    title: string;
    artist: string;
    imageUrls?: string[];
};

type Category = {
    _id: string;
    name: string;
    slug: string;
};

export function useGalleryData(activeFilter: string, search: string) {
    const [paintings, setPaintings] = useState<Painting[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Load categories once
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (err) {
                console.error("Failed to load categories");
            }
        };

        loadCategories();
    }, []);

    // Load paintings when filter OR search changes
    useEffect(() => {
        const loadPaintings = async () => {
            try {
                setLoading(true);
                setError("");

                const category =
                    activeFilter === "all" ? undefined : activeFilter;

                const data = await getPaintings(category, search);

                setPaintings(data);
            } catch (err) {
                setError("Failed to load paintings");
            } finally {
                setLoading(false);
            }
        };

        loadPaintings();
    }, [activeFilter, search]);

    return {
        paintings,
        categories,
        loading,
        error,
    };
}