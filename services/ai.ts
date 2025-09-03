export async function getFunFact(name: string, species: string, origin: string) {
  try {
    const res = await fetch("/api/funfact/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, species, origin }),
    });

    if (!res.ok) {
      console.error("Fun fact API returned error", res.status);
      return "Could not generate a fun fact.";
    }

    const data = await res.json();
    return data.fact || "No fun fact found.";
  } catch (err) {
    console.error("Error fetching fun fact:", err);
    return "Could not generate a fun fact.";
  }
}
