import React, { createContext, useState } from 'react';

export const FavoritesContext = createContext();

// Dummy data from TMDB
const dummyData = [
  {
    adult: false,
    backdrop_path: "/6aYZjRsRCDGuzWbNo43Jsi2thh.jpg",
    genre_ids: [12, 14, 10749, 10751],
    id: 2270,
    original_language: "en",
    original_title: "Stardust",
    overview: "In a countryside town bordering on a magical land, a young man makes a promise to his beloved that he'll retrieve a fallen star by venturing into the magical realm. His journey takes him into a world beyond his wildest dreams and reveals his true identity.",
    popularity: 32.938,
    poster_path: "/7zbFmxy3DqKYL2M8Hop6uylp2Uy.jpg",
    release_date: "2007-08-09",
    title: "Stardust",
    video: false,
    vote_average: 7.277,
    vote_count: 3937,
    stars: 0, // Add star count property
  },
  {
    adult: false,
    backdrop_path: "/gl0jzn4BupSbL2qMVeqrjKkF9Js.jpg",
    genre_ids: [12, 14, 16],
    id: 128,
    original_language: "ja",
    original_title: "もののけ姫",
    overview: "Ashitaka, a prince of the disappearing Emishi people, is cursed by a demonized boar god and must journey to the west to find a cure. Along the way, he encounters San, a young human woman fighting to protect the forest, and Lady Eboshi, who is trying to destroy it. Ashitaka must find a way to bring balance to this conflict.",
    popularity: 91.744,
    poster_path: "/cMYCDADoLKLbB83g4WnJegaZimC.jpg",
    release_date: "1997-07-12",
    title: "Princess Mononoke",
    video: false,
    vote_average: 8.338,
    vote_count: 7779,
    stars: 0, // Add star count property
  },
  {
    adult: false,
    backdrop_path: "/sEDxbBJUgz3cM5cRr7HESlThTJS.jpg",
    genre_ids: [878, 35, 12, 10749],
    id: 11379,
    original_language: "en",
    original_title: "The Adventures of Buckaroo Banzai Across the 8th Dimension",
    overview: "Adventurer/surgeon/rock musician Buckaroo Banzai and his band of men, the Hong Kong Cavaliers, take on evil alien invaders from the 8th dimension.",
    popularity: 23.944,
    poster_path: "/a7K5OcylQbWtCbrUzegfi31yaSs.jpg",
    release_date: "1984-08-15",
    title: "The Adventures of Buckaroo Banzai Across the 8th Dimension",
    video: false,
    vote_average: 6.001,
    vote_count: 407,
    stars: 0, // Add star count property
  },
];

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(dummyData);
  const [personalQueue, setPersonalQueue] = useState([]);

  const toggleFavorite = (item) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.find((fav) => fav.id === item.id);
      if (isFavorite) {
        return prevFavorites.map((fav) =>
          fav.id === item.id ? { ...fav, stars: fav.stars + 1 } : fav
        );
      } else {
        return [...prevFavorites, { ...item, stars: 1 }];
      }
    });
  };

  const addToPersonalQueue = (item) => {
    setPersonalQueue((prevQueue) => {
      if (!prevQueue.some((queueItem) => queueItem.id === item.id)) {
        const newQueue = [...prevQueue, item];
        console.log("Updated Personal Queue: ", newQueue); // Debug log
        return newQueue;
      }
      return prevQueue;
    });
  };
  console.log("Current Personal Queue: ", personalQueue);

  return (
    <FavoritesContext.Provider value={{ favorites, personalQueue, toggleFavorite, addToPersonalQueue }}>
      {children}
    </FavoritesContext.Provider>
  );
};