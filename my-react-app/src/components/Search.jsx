import React from 'react';

const Search = ({onChange, clickSearch, toggleSearch}) => {
  return(
    <form className="search-container">
      <input type="type" onChange={onChange}></input>
      <button className="search-button btn" type="reset" onClick={clickSearch}>Search</button>
      <button className="btn" onClick={(e) => toggleSearch(e)}>Go to Watch List</button>
    </form>
  )
}

export default Search;