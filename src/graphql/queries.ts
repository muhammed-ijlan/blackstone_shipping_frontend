import { gql } from "@apollo/client";

export const GET_SLIDERS = gql`
query {
  sliders {
    nodes {
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      sliderFields {
        sliderMainHeading
        subtitle
        shortDescription
        button1Text
        button1Link
        button2Text
        button2Link
      }
    }
  }
}
`;
