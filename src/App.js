import { useEffect, useState } from "react";
import Continent from "./components/Continent";
import Country from "./components/Country";

const App = () => {
  const [continents, setContinents] = useState([]);
  const [selectedContinent, setSelectedContinent] = useState("");
  const [country, setCountry] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
//   const continent = [
//       "Africa",
//       "Antarctica",
//       "Asia",
//       "Europe",
//       "North-America",
//       "Oceania",
//       "South-America",
//   ];
  const dynamic = new Set([])
  continents.forEach((item)=>{
    dynamic.add(item.continent)
  })
  const continent = Array.from(dynamic);

  useEffect(() => {
      fetchData();
  }, []);

  useEffect(() => {
      if (selectedContinent) {
          const filterData = () => {
              return continents.filter(
                  (item) => item.continent === selectedContinent
              );
          };
          setCountry(filterData());
      }
  }, [selectedContinent, continents]);

  const fetchData = async () => {
      try {
          setLoading(true);
          const response = await fetch(
              "https://covid-193.p.rapidapi.com/statistics",
              {
                  headers: {
                      "x-rapidapi-key":
                          "fe129053e1msh9796a059121d29fp18e317jsnb7be3f20053a",
                      "x-rapidapi-host": "covid-193.p.rapidapi.com",
                  },
              }
          );
          const data = await response.json();
          setContinents(data.response);
      } catch (error) {
          console.error("Error:", error);
      } finally {
          setLoading(false);
      }
  };

  const handleContinentToggle = (continent) => {
      if (selectedContinent === continent) {
          setSelectedContinent("");
      } else {
          setSelectedContinent(continent);
      }
      setSearch("");
  };

  const handleSearchChange = (event) => {
      const searchValue = event.target.value;
      setSearch(searchValue);
  };

  const filterCountryData = country.filter((val) => {
      if (search === "") {
          return val;
      } else if (
          val.country.toLowerCase().includes(search.toLowerCase())
      ) {
          return val;
      }
      return false;
  });

  return (
      <div className="container mt-5">
          <h1 className="text-center mb-4">COVID-19 Statistics by Continent and Country</h1>
          <div className="row">
              <div className="col-md-4">
                  <h2>Select a continent:</h2>
                  <ul className="list-group">
                      {continent.map((continent) => (
                          <Continent
                              key={continent}
                              continent={continent}
                              selectedContinent={selectedContinent}
                              handleContinentToggle={handleContinentToggle}
                          />
                      ))}
                  </ul>
              </div>

              <div className="col-md-8">
                  {loading ? (
                      <div>Loading...</div>
                  ) : (
                      selectedContinent && (
                          <div>
                              <h2>{selectedContinent}</h2>
                              <input
                                  type="text"
                                  className="form-control mb-3"
                                  placeholder="Search by country..."
                                  value={search}
                                  onChange={handleSearchChange}
                              />

                              <table className="table">
                                  <thead>
                                      <tr>
                                          <th>Country</th>
                                          <th>Population</th>
                                          <th>Total COVID Cases</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      {filterCountryData.map((country) => (
                                          <Country country={country} />
                                      ))}
                                  </tbody>
                              </table>
                          </div>
                      )
                  )}
              </div>
          </div>
      </div>
  );
};

export default App