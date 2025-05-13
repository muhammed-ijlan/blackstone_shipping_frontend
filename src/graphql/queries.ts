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

export const GET_HEADER_MENU = gql`
  query GetHeaderMenu {
  menu(id: "Main Navigation", idType: NAME) {
    menuItems(where: { parentId: null }) {
      nodes {
        id
        label
        url
        childItems {
          nodes {
            id
            label
            url
            childItems {
              nodes {
                id
                label
                url
              }
            }
          }
        }
      }
    }
  }
}
`;


export const GET_WHAT_WE_OFFER = gql`
query {
  page(id: "home", idType: URI) {
    title
    homePageFieldsWhatWeOffer {
      whatWeOffersubHeading
      whatWeOfferMainHeading
    }
  }

  whatWeOffers {
    nodes {
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      content
      uri
    }
  }
}
`;