import { TextField } from "@mui/material";
import "./SearchBar.css";

interface SearchBarProps {
  searchText: string;
  placeholder: string;
  onChange: (textValue: string) => void;
  isMobileDevice: boolean;
}

const SearchBar = (props: SearchBarProps) => {
  const { searchText, placeholder, onChange, isMobileDevice } = props;

  return (
    <TextField
      className="searchbar"
      margin={isMobileDevice ? "none" : "dense"}
      variant="outlined"
      onChange={(value) => {
        onChange(value.target.value);
      }}
      placeholder={placeholder}
      value={searchText}
      size="small"
    />
  );
};

export default SearchBar;
