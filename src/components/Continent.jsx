import React from 'react'

const Continent = ({ continent, selectedContinent, handleContinentToggle }) => {
    return (
        <li
            onClick={() => handleContinentToggle(continent)}
            className={`list-group-item ${continent === selectedContinent ? "active" : ""}`}
        >
            {continent}{" "}
            {continent === selectedContinent ? "-" : "+"}
        </li>
    );
};

export default Continent