import React from 'react';
import {MenuItem} from 'react-bootstrap';

const SuggestionList = (props) => {

  const handleSelect = (suggestion) => {
    return () => {
      props.onClick(suggestion);
    };
  };

  const suggestions = props.suggestions.map(
    suggestion => <MenuItem onSelect={handleSelect(suggestion)} key={suggestion.value}>{suggestion.label}</MenuItem>
  );

  return(
    <ul className="dropdown-menu" style={{display: 'block'}} tabIndex="0">
      { suggestions }
    </ul>
  );
};

export default SuggestionList;
