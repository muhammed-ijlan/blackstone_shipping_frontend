import { Button, Stack, TextField } from "@mui/material";
import React from "react";

const TrackingInput = () => {
  return (
    <Stack
      sx={{
        width: "100%",
        height: "290px",
        background: "rgba(45, 55, 72, 1) ",
      }}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Stack direction={"row"} gap={1}>
        <TextField
          placeholder="Container Number"
          variant="outlined"
          fullWidth
          sx={{
            width: "550px",
          }}
          InputProps={{
            sx: {
              typography: "h6",
              fontWeight: "500 !important",

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
          }}
          inputProps={{
            style: {
              color: "rgba(109, 110, 113, 1)",
            },
          }}
          autoComplete="off"
        />
        <Button
          variant="contained"
          sx={{
            background: "rgba(26, 86, 219, 1)",
            width: "290px",
            typography: "h6",
            fontWeight: "500 !important",
          }}
        >
          Track
        </Button>
      </Stack>
    </Stack>
  );
};

export default TrackingInput;
