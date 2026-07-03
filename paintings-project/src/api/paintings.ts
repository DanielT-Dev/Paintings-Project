const API_URL = "http://localhost:5000/api/paintings";

// -----------------------------------------------------------------------------
// GET ALL PAINTINGS (with optional category filter)
// -----------------------------------------------------------------------------

export async function getPaintings(category?: string) {
  const url = category
    ? `${API_URL}?category=${category}`
    : API_URL;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch paintings");
  }

  return res.json();
}

// -----------------------------------------------------------------------------
// GET SINGLE PAINTING BY ID
// -----------------------------------------------------------------------------

export async function getPaintingById(id: string) {
  const res = await fetch(`${API_URL}/${id}`);

  if (!res.ok) {
    throw new Error("Painting not found");
  }

  return res.json();
}