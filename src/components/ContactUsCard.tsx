import { Container, Stack, Typography } from "@mui/material";
import React from "react";
import CustomArrowButton from "./CustomArrowButton";
import buildingVecrtor from "src/assets/icons/buildingVector.png";
import { useRouter } from "src/routes/hooks";

const ContactUsCard = () => {
  const router = useRouter();
  return (
    <Container maxWidth="xl" sx={{ mb: 2 }}>
      <Stack
        width={"100%"}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{
          height: "236px",
          bgcolor: "rgba(45, 55, 72, 1)",
          borderRadius: "8px",
          backgroundImage: `url(${buildingVecrtor})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom",
          padding: "20px",
        }}
        gap={3}
      >
        <Typography
          sx={{ color: "white", textAlign: "center !important" }}
          variant="h5"
          maxWidth={"800px"}
        >
          Contact us today to discuss your specific shipping requirements and
          discover how Blackstone Shipping can be your trusted logistics
          partner.
        </Typography>
        <CustomArrowButton
          onClick={() => router.push("/support")}
          name="Contact Us"
          sx={{
            background: "white !important",
            height: "60px",
            width: "186px",
          }}
        />
      </Stack>
    </Container>
  );
};

export default ContactUsCard;
