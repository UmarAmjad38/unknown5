import { useEffect, useState } from "react";

const RandomLetter = () => {
  const [letter, setLetter] = useState("A");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0987654321";
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      setLetter(alphabet[randomIndex]);
    }, 1000); // Change every 1 second

    return () => clearInterval(intervalId);
  }, []);
  return <>{letter}</>;
};

export default RandomLetter;
