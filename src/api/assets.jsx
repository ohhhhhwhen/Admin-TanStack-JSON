export async function fetchAssets() {
  const response = await fetch("http://localhost:3000/assets");
  return response.json();
}

export async function updateAsset(updatedAsset) {
  const response = await fetch(
    `http://localhost:3000/assets/${updatedAsset.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedAsset),
    }
  );
  return response.json();
}
