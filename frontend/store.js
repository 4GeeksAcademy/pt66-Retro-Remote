export const initialStore = () => {
  return {
    token: null,
    movies: [],
    shows: []
  }
};

export default function storeReducer(state, action={}) {
  switch (action.type) {
    case 'login':
      return state;
    case 'set_movies':
      console.log('Setting movies:', action.payload); // Log the action payload
      return {
        ...state,
        movies: action.payload.results || action.payload // Ensure it handles the correct payload structure
      };
    case 'set_shows':
      console.log('Setting shows:', action.payload); // Log the action payload
      return {
        ...state,
        shows: action.payload.results || action.payload // Ensure it handles the correct payload structure
      };
    default:
      return state;
  }
}
