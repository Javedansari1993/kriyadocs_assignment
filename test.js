import React, { useState, useEffect } from 'react';

const App = () => {
  const [continents, setContinents] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loading, setLoading] = useState(false);
console.log(continents)
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://covid-193.p.rapidapi.com/statistics', {
        headers: {
          'x-rapidapi-key': 'fe129053e1msh9796a059121d29fp18e317jsnb7be3f20053a',
          'x-rapidapi-host': 'covid-193.p.rapidapi.com'
        },
      });
      const data = await response.json();
      setContinents(data.response);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setSelectedCountry(null);
  };

  const filteredContinents = continents.filter((continent) =>
    continent.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-3">
      <h1>COVID Reports</h1>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by country..."
        value={search}
        onChange={handleSearchChange}
      />
      {loading ? (
        <p>Loading...</p>
      ) : selectedCountry ? (
        <div>
          <h2>{selectedCountry.country}</h2>
          <p>Population: {selectedCountry.population}</p>
          <table className="table">
            <thead>
              <tr>
                <th>Cases</th>
                <th>Deaths</th>
                <th>Tests</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>New: {selectedCountry.cases.new || '-'}</td>
                <td>New: {selectedCountry.deaths.new || '-'}</td>
                <td>1M Pop: {selectedCountry.tests['1M_pop']}</td>
              </tr>
              <tr>
                <td>Active: {selectedCountry.cases.active}</td>
                <td>Total: {selectedCountry.deaths.total}</td>
                <td>Total: {selectedCountry.tests.total}</td>
              </tr>
              <tr>
                <td>Critical: {selectedCountry.cases.critical}</td>
                <td>1M Pop: {selectedCountry.deaths['1M_pop']}</td>
                <td></td>
              </tr>
              <tr>
                <td>Recovered: {selectedCountry.cases.recovered}</td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <button className="btn btn-primary" onClick={() => setSelectedCountry(null)}>Back</button>
        </div>
      ) : (
        <ul className="list-group">
          {filteredContinents.map((continent) => (
            <li className="list-group-item" key={continent.country}>
              <button className="btn btn-primary" onClick={() => handleCountryClick(continent)}>
                + {continent.country}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
