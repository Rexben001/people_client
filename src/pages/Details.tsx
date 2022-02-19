import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Flex, Box, Text, IconButton, Image } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";

type LocationState = {
  name?: string;
  height?: string;
  mass?: string;
  gender?: string;
  homeworld?: string;
  url?: string;
  birth_year?: string;
  pageNumber?: number;
};

const Details = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { name, height, mass, gender, homeworld, url, birth_year, pageNumber } =
    location.state as LocationState;

  return (
    <Box pt="60px" px="2rem">
      <Flex
        onClick={() =>
          navigate(`/?page=${pageNumber}`, {
            replace: true,
          })
        }
        cursor="pointer"
      >
        <IconButton
          icon={<ChevronLeftIcon h={6} w={6} />}
          aria-label="back"
          backgroundColor="rgb(242, 246, 255)"
          border="none"
        />
        <Text alignSelf="center" pl=".2rem">
          Back to Homepage
        </Text>
      </Flex>

      <Image
        src={
          gender === "male"
            ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_FQVJRxnryxX2HOLxuzfD79Y4426HNU-Zwtd4D8Hxoo6Ct6QZ4JRsmeKcGnD9roPbCTk&usqp=CAU"
            : "http://assets.stickpng.com/images/585e4bc4cb11b227491c3395.png"
        }
        height={"300px"}
        width={"300px"}
      />
      <Box mt="1rem">
        <Text>Name: {name}</Text>
        {height && <Text>Height: {height}</Text>}
        <Text>Mass: {mass}</Text>
        <Text>Gender: {gender}</Text>
        {homeworld && <Text>Homeworld{homeworld}</Text>}
        {url && <Text>{url}</Text>}
        {birth_year && <Text>{birth_year}</Text>}
      </Box>
    </Box>
  );
};

export default Details;
