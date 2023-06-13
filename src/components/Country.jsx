import React from 'react'

const Country = ({ country }) => {
    return (
        <tr key={country.country}>
            <td>{country.country}</td>
            <td>{country.population}</td>
            <td>{country.cases.total}</td>
        </tr>
    );
};

export default Country