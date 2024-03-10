import { useEffect, useState } from "react";

const AdAPI = () => {
  const [adData, setAdData] = useState([]);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  useEffect(() => {
    fetch("https://samuelg900.github.io/adCheckers/ad.json")
      .then((response) => response.json())
      .then((data) => {
        console.log("SUCCESS");
        setAdData(data);
      })
      .catch((error) => {
        console.log("FAIL");
        console.log(error.message);
      });
  }, []);

  useEffect(() => {
    if (adData.length > 0) {
      const interval = setInterval(() => {
        setCurrentAdIndex((prevIndex) => (prevIndex + 1) % adData.length);
      }, 10000); // changes every 10 secs
      return () => clearInterval(interval);
    }
  }, [adData]);

  return (
    <div className="APIcss">
      <div className="LimitText">{adData[currentAdIndex]?.text}</div>
    </div>
  );
};

export default AdAPI;
