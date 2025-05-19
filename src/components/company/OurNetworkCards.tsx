import { Stack, Typography } from '@mui/material'
import React from 'react'
import { GetCompanyGlobalNetworkResponse } from 'src/types/graphql/types/company.types'

const OurNetworkCards = ({data}:{data:GetCompanyGlobalNetworkResponse}) => {
  return (
    <Stack direction={"row"} justifyContent={"space-between"}>
            <Stack
              sx={{
                background: "rgba(45, 55, 72, 1)",
                borderRadius: "8px",
                p: 2,
              }}
              alignItems={"center"}
              justifyContent={"center"}
              height={"218px"}
              width={"400px"}
            >
              <Typography variant="h1" color={"white"}>
                {
                  data.page.companyPageOurGlobalNetworkSection
                    .ourGlobalNetworkBox1Text1
                }
              </Typography>
              <Typography variant="h4" color={"white"}>
                {
                  data.page.companyPageOurGlobalNetworkSection
                    .ourGlobalNetworkBox1Text2
                }
              </Typography>
            </Stack>
            <Stack
              sx={{
                background: "rgba(45, 55, 72, 1)",
                borderRadius: "8px",
                p: 2,
              }}
              alignItems={"center"}
              justifyContent={"center"}
              height={"218px"}
              width={"400px"}
            >
              <Typography variant="h1" color={"white"}>
                {
                  data.page.companyPageOurGlobalNetworkSection
                    .ourGlobalNetworkBox2Text1
                }
              </Typography>
              <Typography variant="h4" color={"white"}>
                {
                  data.page.companyPageOurGlobalNetworkSection
                    .ourGlobalNetworkBox2Text2
                }
              </Typography>
            </Stack>
            <Stack
              sx={{
                background: "rgba(45, 55, 72, 1)",
                borderRadius: "8px",
                p: 2,
              }}
              alignItems={"center"}
              justifyContent={"center"}
              height={"218px"}
              width={"400px"}
            >
              <Typography variant="h1" color={"white"}>
                {
                  data.page.companyPageOurGlobalNetworkSection
                    .ourGlobalNetworkBox3Text1
                }
              </Typography>
              <Typography variant="h3" color={"white"} textAlign={"center"}>
                {
                  data.page.companyPageOurGlobalNetworkSection
                    .ourGlobalNetworkBox3Text2
                }
              </Typography>
            </Stack>
          </Stack>
  )
}

export default OurNetworkCards