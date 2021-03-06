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

export async function ApiServiceSearch(query) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=en-US&query=${query}&page=1&include_adult=false`
  );
  if (response.ok) {
    return response.json();
  }
  return await Promise.reject(new Error("not found"));
}

export async function ApiServiceDetails(moviesId) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${moviesId}?api_key=${KEY}`
  );
  if (response.ok) {
    return response.json();
  }
  return await Promise.reject(new Error("not found"));
}

export async function ApiServiceDetailsCredits(moviesId) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${moviesId}/credits?api_key=${KEY}`
  );
  if (response.ok) {
    return response.json();
  }
  return await Promise.reject(new Error("not found"));
}

export async function ApiServiceDetailsReviews(moviesId) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${moviesId}/reviews?api_key=${KEY}`
  );
  if (response.ok) {
    return response.json();
  }
  return await Promise.reject(new Error("not found"));
}
