const KEY = "7b5c027beb1723358e7047ebab76ed47";

export async function ApiServiceHome() {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${KEY}`
  );
  if (response.ok) {
    return response.json();
  }
  return await Promise.reject(new Error("not found"));
}

export async function ApiServiceSearch({ query }) {
  const response = await fetch(`
https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=en-US&query=${query}&page=1&include_adult=false`);
  if (response.ok) {
    return response.json();
  }
  return await Promise.reject(new Error("not found"));
}

export async function ApiServiceDetails({ movieId }) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${KEY}&language=en-USappend_to_response`
  );
  if (response.ok) {
    return response.json();
  }
  return await Promise.reject(new Error("not found"));
}
