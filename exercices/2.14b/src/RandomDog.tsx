import type { Dog } from "./types";
import { useEffect, useState } from "react";

const RandomDog = () => {
  const [dog, setDog] = useState<Dog | undefined>(undefined);
  const [isHovered, setIsHovered] = useState(false);

  const fetchDogImage = async () => {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const doggy = await response.json();
      setDog({
        dog: doggy.message ?? "No dog found",
        status: doggy.status ?? "Error",
      });
    } catch (error) {
      console.error("Failed to fetch dog image", error);
      setDog({ dog: "Failed to fetch dog image", status: "Error" });
    }
  };

  useEffect(() => {
    fetchDogImage();

    const intervalId = setInterval(() => {
      if (!isHovered) {
        fetchDogImage();
      }
    }, 5000);

    return () => clearInterval(intervalId); // Clean up the interval on unmount
  }, [isHovered, setIsHovered]);

  if (!dog) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h3>Random dog</h3>
      <img
        src={dog.dog}
        alt="Random dog"
        style={{ maxHeight: 300 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    </div>
  );
};

export default RandomDog;
