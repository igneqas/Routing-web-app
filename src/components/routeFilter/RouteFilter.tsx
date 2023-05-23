import {
  Box,
  Divider,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

interface RouteFilterProps {
  distance: number[];
  distanceLimits: number[];
  handleDistanceChange: (event: Event, newValue: number | number[]) => void;
  duration: number[];
  durationLimits: number[];
  handleDurationChange: (event: Event, newValue: number | number[]) => void;
  date: Dayjs[];
  dateLimits: Dayjs[];
  handleDateChange: (newValue: Dayjs[]) => void;
  tripType: string;
  handleTripTypeChange: (newValue: string) => void;
}

const RouteFilter = (props: RouteFilterProps) => {
  const {
    distance,
    distanceLimits,
    handleDistanceChange,
    duration,
    durationLimits,
    handleDurationChange,
    date,
    dateLimits,
    handleDateChange,
    tripType,
    handleTripTypeChange,
  } = props;

  return (
    <div>
      <Typography
        variant="subtitle1"
        style={{ margin: "5px", marginLeft: "5px" }}
      >
        Distance
      </Typography>
      <Box sx={{ width: "86%", marginLeft: "7%" }}>
        <Slider
          value={distance}
          onChange={handleDistanceChange}
          valueLabelDisplay="auto"
          step={0.1}
          min={distanceLimits[0]}
          max={distanceLimits[1]}
        />
      </Box>
      <Divider variant="middle" />
      <Typography
        variant="subtitle1"
        style={{ margin: "5px", marginLeft: "5px" }}
      >
        Travel time
      </Typography>
      <Box sx={{ width: "86%", marginLeft: "7%" }}>
        <Slider
          value={duration}
          onChange={handleDurationChange}
          valueLabelDisplay="auto"
          min={durationLimits[0]}
          max={durationLimits[1]}
        />
      </Box>
      <Divider variant="middle" style={{ marginBottom: "10px" }} />
      <Typography
        variant="subtitle1"
        style={{ margin: "5px", marginLeft: "5px", marginBottom: "0px" }}
      >
        Trip type
      </Typography>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <Select
          value={tripType}
          onChange={(event: SelectChangeEvent) =>
            handleTripTypeChange(event.target.value as string)
          }
        >
          <MenuItem value={"All"}>All</MenuItem>
          <MenuItem value={"Quickest"}>Quickest</MenuItem>
          <MenuItem value={"Leisure"}>Leisure</MenuItem>
          <MenuItem value={"Shortest"}>Shortest</MenuItem>
          <MenuItem value={"Pollution-free"}>Pollution-Free</MenuItem>
          <MenuItem value={"Mountain Bike"}>Mountain Bike</MenuItem>
        </Select>
      </FormControl>
      <Divider variant="middle" />
      <Typography
        variant="subtitle1"
        style={{ margin: "5px", marginLeft: "5px" }}
      >
        Date created
      </Typography>
      <Box sx={{ width: "86%", marginLeft: "7%" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="From"
            value={date[0]}
            onChange={(newValue) => handleDateChange([newValue!, date[1]])}
            maxDate={dateLimits[1]}
            minDate={dateLimits[0]}
          />
          <div style={{ height: "15px" }}></div>
          <DatePicker
            label="To"
            value={date[1]}
            onChange={(newValue) => handleDateChange([date[0], newValue!])}
            maxDate={dateLimits[1]}
            minDate={dateLimits[0]}
          />
        </LocalizationProvider>
      </Box>
      <Divider style={{ marginTop: "10px" }} />
      <Divider />
      <Divider />
    </div>
  );
};

export default RouteFilter;
