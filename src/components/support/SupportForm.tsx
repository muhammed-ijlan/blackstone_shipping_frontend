import { Button, Stack } from "@mui/material";
import React, { useState } from "react";
import Form from "./Form";

const SupportForm = () => {
  const [buttonState, setButtonState] = useState("general");

  const handleButtonState = (state: string) => {
    setButtonState(state);
  };
  return (
    <Stack gap={5}>
      <Stack direction={"row"} gap={3}>
        <Button
        onClick={()=>handleButtonState("general")}
          sx={{
            width: "159px",
            height: "50px",
            borderRadius: "4px",
            fontSize: "1rem !important",
            fontWeight: 600,
              color: buttonState === "general" ? "white":"rgba(45, 55, 72, 1)",
            bgcolor: buttonState === "general" ?"rgba(45, 55, 72, 1)": "white",
            border: "1px solid rgba(45, 55, 72, 0.2)",
          }}
        >
          General Inquiries
        </Button>
        <Button
           onClick={()=>handleButtonState("quote")}
          sx={{
            width: "159px",
            height: "50px",
            borderRadius: "4px",
            fontSize: "1rem !important",
            fontWeight: 600,
            color: buttonState === "quote" ? "white":"rgba(45, 55, 72, 1)",
            bgcolor: buttonState === "quote" ?"rgba(45, 55, 72, 1)": "white",
            border: "1px solid rgba(45, 55, 72, 0.2)",
          }}
        >
          Quote Requests
        </Button>
      </Stack>
      
        <Form state={buttonState}/>
    </Stack>
  );
};

export default SupportForm;
