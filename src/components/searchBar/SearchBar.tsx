import { TextField } from "@mui/material";

interface SearchBarProps {
  searchText: string;
  placeholder: string;
  onChange: (textValue: string) => void;
}

const SearchBar = (props: SearchBarProps) => {
  const { searchText, placeholder, onChange } = props;
  const barStyle = {
    background: "#F0F0F0",
    color: "black",
  };
  return (
    <TextField
      margin="dense"
      variant="outlined"
      onChange={(value) => {
        onChange(value.target.value);
      }}
      placeholder={placeholder}
      value={searchText}
      style={barStyle}
      size="small"
    />
  );
};

export default SearchBar;
