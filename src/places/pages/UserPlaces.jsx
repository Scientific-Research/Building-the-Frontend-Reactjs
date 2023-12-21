import React from "react";
import { useParams } from "react-router-dom";

import { PlaceList } from "./../components/PlaceList";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "one of the most famous sky scrapers in the world!",
    imageUrl: "https://media.timeout.com/images/101705309/750/422/image.webp",
    address: "20 W 34th St., New York, NY 10001, United States",
    location: {
      lat: 40.7484405,
      lng: -73.9856644,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Emp. State Building",
    description: "one of the most famous sky scrapers in the world!",
    imageUrl: "https://media.timeout.com/images/101705309/750/422/image.webp",
    address: "20 W 34th St., New York, NY 10001, United States",
    location: {
      lat: 40.7484405,
      lng: -73.9856644,
    },
    creator: "u2",
  },
];

export const UserPlaces = () => {
  const userId = useParams().userId;
  const loadedPalces = DUMMY_PLACES.filter((place) => place.creator === userId);
  //   return <PlaceList items={DUMMY_PLACES} />;
  return <PlaceList items={loadedPalces} />;
};
