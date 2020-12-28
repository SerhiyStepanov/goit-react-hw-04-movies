const KEY = "7b5c027beb1723358e7047ebab76ed47";

export function ApiServiceHome() {
  return fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${KEY}`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error("not found"));
  });
}

export function ApiServiceSearch({ query }) {
  return fetch(`
https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=en-US&query=${query}&page=1&include_adult=false`).then(
    (response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error("not found"));
    }
  );
}

export function ApiServiceDetails({ movieId }) {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits/reviews?api_key=${KEY}&language=en-US`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error("not found"));
  });
}
