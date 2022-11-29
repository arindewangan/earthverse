import Moralis from "moralis";
import DEFAULT_LAND_IMAGE from "/public/default-image.png";

export const sendOven = async ({ babaganoush }) => {
  const metadata = [
    {
      path: "metadata.json",
      content: {
        name: "EarthVerse Land",
        description: "EarthVerse Land Description",
        image: DEFAULT_LAND_IMAGE,
        attributes: [
          {
            trait_type: "Claimed Land Hash",
            value: babaganoush,
          },
        ],
      },
    },
  ];

  const response = await Moralis.EvmApi.ipfs.uploadFolder({ metadata });

  console.log(`metadata response: ${response.toJSON()}`);
};

export async function getServerSideProps(params) {
  const { babaganoush } = params;
  console.log(`moralis api key: ${process.env.MORALIS_API_KEY}`);
  console.log(`babaganoush: ${babaganoush}`);
  await Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
    // ...and any other configuration
  });

  return {
    props: { babaganoush }, // will be passed to the page component as props
  };
}
