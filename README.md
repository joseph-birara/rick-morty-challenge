


````md
# Rick and Morty Explorer

A small prototype app where users can search characters by location in the Rick and Morty universe and get a fun, AI-generated fact.

---

## a. How I Approached the Problem and Why
I broke the task into 3 clear steps:
1. **Data fetching** – Use the official Rick and Morty GraphQL API to get all characters living in a given location.
2. **Presentation** – Display each character with structured information (name, species, origin, image) using a reusable `CharacterCard` component.
3. **Enrichment** – Add one fun fact using an AI service. Since this prototype doesn’t use a real API key, I mocked the AI with a random fact generator to keep the architecture realistic without external dependencies.

This approach kept the solution simple, modular, and aligned with the given requirements.

---

## b. The Model / Structure I Chose
I represented the data using TypeScript-friendly models instead of rendering raw JSON:

- **Character**
  ```ts
  {
    id: string;
    name: string;
    image: string;
    species: string;
    origin: { name: string };
    funFact?: string;
  }
````

* **Location**

  ```ts
  {
    name: string;
    residents: Character[];
  }
  ```

Additionally, I kept an **in-memory history** of searches:

```ts
Character[][] // array of past searches, each containing an array of Characters
```

---

## c. The AI Prompt I Used

If using a real AI model, I would call it once per search with this prompt:

```
Give me a funny, one-sentence fact about a character named {name}, 
who is a {species} from {origin}, in the Rick and Morty universe.
```

Since no API key was provided, I mocked the response with a set of predefined Rick & Morty–style facts, chosen randomly.

---

## d. What Works, What Doesn’t, and What I’d Improve With More Time

### ✅ What Works

* Users can search characters by location (e.g., “Earth”).
* Displays structured character info (image, name, species, origin).
* Adds one AI-generated (mocked) fun fact per search.
* Tracks all past searches in memory and displays a history.

### What Doesn’t

* The fun fact is mocked, not from a real AI.
* No persistent storage — refreshing the page clears history.
* Minimal error handling and no input validation beyond empty strings.

### What I’d Improve

* Integrate a real AI API (e.g., OpenAI) to generate fun facts dynamically.
* Add a **clear history** button and search caching for efficiency.
* Improve error handling (e.g., location not found vs. API errors).
* Expand fun facts to all characters instead of just one.
* Add pagination or infinite scroll for locations with many residents.
* Write tests (unit + integration) for components and services.

---

