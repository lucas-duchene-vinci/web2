import type { Dog } from "./types";
import { useEffect, useState } from "react";

const RandomDog = () => {

    const [dog, setDog] = useState<Dog | undefined>(undefined);

     const fetchDogImage = () => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDog({
          dog: data.message ?? "No dog found",
          status: data.status ?? "Error",
        });
      });
  };

  useEffect(() => {
    fetchDogImage();
  }, []);


    if (!dog) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <h3>Random dog</h3>
            <img src={dog.dog} alt="dogImg" style={{maxHeight: 300}} />
            <p>{dog.status}</p>
        </div>
    )
};

export default RandomDog;