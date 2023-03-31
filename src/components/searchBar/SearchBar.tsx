interface SearchBarProps {
  searchText: string;
  placeholder: string;
  onChange: (textValue: string) => void;
}

const SearchBar = (props: SearchBarProps) => {
  const { searchText, placeholder, onChange } = props;
  const barStyle = {
    width: "20rem",
    background: "#F0F0F0",
    border: "none",
    padding: "0.5rem",
    margin: "5px",
  };
  return (
    <input
      style={barStyle}
      key="search-bar"
      value={searchText}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchBar;
