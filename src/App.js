import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredCountries = data.filter((item) =>
    item.name.common.toLowerCase().includes(search.toLowerCase())
  );

  const getCountriesData = async () => {
    try {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const countries = await res.json();
      setData(countries);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCountriesData();
  }, []);

  return (
    <div className="appContainer">
      <input
        type="text"
        placeholder="Search for countries"
        value={search}
        onChange={handleSearch}
        className="searchBar"
      />

      <div className="containerStyle">
        {search === ""
          ? // Display all countries if search is empty
            data.map((item) => (
              <div className="cardStyle" key={item.name.common}>
                <img
                  src={item.flags.png}
                  alt={`flag of ${item.name.common}`}
                  className="imagesStyle"
                />
                <h2>{item.name.common}</h2>
              </div>
            ))
          : // Display filtered countries based on the search input
            filteredCountries.map((item) => (
              <div className="cardStyle" key={item.name.common}>
                <img
                  src={item.flags.png}
                  alt={`flag of ${item.name.common}`}
                  className="imagesStyle"
                />
                <h2>{item.name.common}</h2>
              </div>
            ))}
      </div>
    </div>
  );
}

export default App;
