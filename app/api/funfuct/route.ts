import { NextResponse } from "next/server";

const mockFacts = [
  "Once tried to apply for interdimensional insurance but got denied instantly.",
  "Has a secret stash of portal fluid hidden in their socks.",
  "Once challenged Rick to a burping contest and lost spectacularly.",
  "Is rumored to be Morty’s cousin in an alternate timeline.",
  "Claims to have seen Mr. Poopybutthole breakdance once.",
];

export async function POST() {
  const randomFact = mockFacts[Math.floor(Math.random() * mockFacts.length)];
  return NextResponse.json({ fact: randomFact });
}
