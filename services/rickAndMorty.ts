export async function fetchCharactersByLocation(location: string) {
  const query = `
    query ($name: String!) {
      locations(filter: { name: $name }) {
        results {
          name
          residents {
            id
            name
            image
            species
            origin {
              name
            }
          }
        }
      }
    }
  `;

  const res = await fetch("https://rickandmortyapi.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { name: location } }),
    cache: "no-store", // ensures fresh data
  });

  const json = await res.json();
  const results = json.data?.locations?.results?.[0]?.residents || [];
  return results;
}
