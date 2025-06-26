import { Button, Stack, TextField } from "@mui/material";
import React from "react";

interface TrackingInputProps {
  value: string;
  onClick: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TrackingInput = ({ value, onClick, onChange }: TrackingInputProps) => {
  return (
    <Stack
      sx={{
        width: "100%",
        height: "290px",
        background: "rgba(45, 55, 72, 1)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack direction="row" gap={1} sx={{ width: "840px" }}>
        <TextField
          value={value}
          onChange={onChange}
          placeholder="Container Number"
          variant="outlined"
          fullWidth
          sx={{
            width: "550px",
            "& .MuiOutlinedInput-root": {
              height: "60px",
              backgroundColor: "#F4F5F7",
              borderRadius: "8px",
              padding: "10px 12px",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                border: "1px solid #ccc",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "2px solid #1976d2",
              },
            },
            "& .MuiInputBase-input": {
              typography: "h5",
              fontWeight: 500,
              color: "rgba(109, 110, 113, 1)",
            },
          }}
          inputProps={{
            style: { padding: "10px" },
          }}
          autoComplete="off"
        />
        <Button
          variant="contained"
          sx={{
            background: "rgba(26, 86, 219, 1)",
            width: "290px",
            height: "60px",
            "&:hover": { backgroundColor: "rgba(21, 71, 204, 1)" },
            "& .MuiButton-label": {
              typography: "h6",
              fontWeight: 500,
              textTransform: "none",
            },
          }}
          onClick={onClick}
        >
          Track
        </Button>
      </Stack>
    </Stack>
  );
};

export default TrackingInput;
