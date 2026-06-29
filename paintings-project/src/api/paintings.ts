const API_URL = "http://localhost:5000/api/paintings";

export async function getPaintings() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch paintings");
  return res.json();
}

export async function getPaintingById(id: string) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Painting not found");
  return res.json();
}