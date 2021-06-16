import React, { useState, useEffect } from 'react';

const Search = () => {
  const [input, setInput] = useState('');

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value }, console.log(input));
  };

  return (
    <div>
      <form className="form">
        <input type="search" name="input" placeholder="Have a question? Search for answers..." className="search-field" onChange={handleChange} />
        <button type="submit" className="search-button">
          <img src="search.png" alt="Search" />
        </button>
      </form>
    </div>
  );
};

export default Search;
