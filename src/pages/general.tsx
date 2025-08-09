import { useQuery } from "@apollo/client";
import { Box, Container, Stack, Typography } from "@mui/material";
import React from "react";
import Banner from "src/components/banner/Banner";
import termsIcon from "src/assets/icons/termsIcon.png"
import { useRouter } from "src/routes/hooks";


const Page = () => {

 const data = [
  {
    name: "General",
    url: "/general/terms-conditions/general",
  },
  {
    name:"Warehouse",
    url: "/general/terms-conditions/warehouse",
  },
  {
    name:"Belgium",
    url: "/general/terms-conditions/belgium",
  },
  {
    name:"Netherlands",
    url: "/general/terms-conditions/netherlands",
  },
  {
    name:"United Kingdom",
    url: "/general/terms-conditions/uk",
  },
  {
    name:"India",
    url: "/general/terms-conditions/india",
  },
  {
    name:"Germany",
    url: "/general/terms-conditions/germany",
  },
  {
   name:"Antwerp Warehouse",
   url: "/general/terms-conditions/antwerp",
  },
 ];

 const router = useRouter();


  return (
    <Stack>
        <>
          {/* <Banner
            mainTitle={
              "data?.pageBy.blackboxFreightPageBannerSection.bannerTitle"
            }
            bgUrl={
              "data?.pageBy.blackboxFreightPageBannerSection.bannerImage.node"
            }
          /> */}
          <Container maxWidth="xl">

            <Stack
              my={7}
              gap={4}
              >
              <Typography variant="h2">Terms & Conditions, Disclaimers and Privay Policy</Typography>
              <Stack direction={{xs:"column",md:"row"}} gap={3} flexWrap={"wrap"}>
                {data.map((item, index) => (
                  <Stack key={index} direction="row" spacing={2} alignItems="center" sx={{cursor:"pointer"}} onClick={() => router.push(item.url)}> 
                    <Box component="img" src={termsIcon} alt="termsIcon" width={"80px"} height={"auto"} sx={{padding:"10px",borderRadius:"50%",border:"1px solid #8e8e8e"}} />
                    <Typography variant="h4">{item.name}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </Container>
        </>
    </Stack>
  );
};

export default Page;
