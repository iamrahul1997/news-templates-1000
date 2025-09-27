// const API_URL =
//   "https://api.coinsae.com/api/v1/client?uri=https://rollandearn.com&api_key=Test@!3";

// export async function getPosts() {
//   try {
//     const response = await fetch(API_URL);
//     if (!response.ok) throw new Error(`Error ${response.status}`);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("API fetch error:", error);
//     return null;
//   }
// }

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const SITE_URL = import.meta.env.VITE_SITE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export async function getPosts(page = 1) {
  const API_URL = `${BASE_URL}?uri=${SITE_URL}&page=${page}&api_key=${API_KEY}`;

  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error(`Error ${res.status}`);
  }

  return res.json();
}
