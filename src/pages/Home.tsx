import React from "react";
import { Box, Text, Flex, Button, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import CustomTable from "../components/customTable";
import Spinner from "../components/spinner";

import Queries from "../utils/queries";

const PEOPLE_QUERY = `
  query {
    getAllPeople {
      name,
      height,
      mass,
      gender,
      homeworld,
      url,
      birth_year
    }
  }
`;
const NEXT_PAGE_QUERY = `
  query nextPage($pageNumber: Float!) {
    nextPage(pageNumber:$pageNumber) {
      name,
      height,
      mass,
      gender,
      homeworld,
      url,
      birth_year
    }
  }
`;

const SEARCH_PAGE_QUERY = `
  query searchPeople($username: String!) {
    searchPeople(username:$username) {
      name,
      height,
      mass,
      gender,
      homeworld,
      url,
      birth_year
    }
  }
`;

function Home() {
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);
  const [fetching, setFetching] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const [submit, setSubmit] = React.useState(false);

  const queryParams = new URLSearchParams(window.location.search);
  const pageNumber = queryParams.get("page");

  const getPeople = Queries({
    query: PEOPLE_QUERY,
  });
  const getNextPage = Queries({
    query: NEXT_PAGE_QUERY,
    variables: { name: "pageNumber", value: page },
  });
  const getSearch = Queries({
    query: SEARCH_PAGE_QUERY,
    variables: { name: "username", value: search },
  });

  React.useEffect(() => {
    pageNumber && setPage(Number(pageNumber));
  }, [pageNumber]);

  React.useEffect(() => {
    if (submit) {
      setData(getSearch?.data?.searchPeople);
      setFetching(getSearch?.fetching);
    } else if (page > 1) {
      setData(getNextPage?.data?.nextPage);
      setFetching(getNextPage?.fetching);
    } else {
      setData(getPeople?.data?.getAllPeople);
      setFetching(getPeople?.fetching);
    }
  }, [
    getNextPage?.data?.nextPage,
    getNextPage?.fetching,
    getPeople?.data?.getAllPeople,
    getPeople?.fetching,
    getSearch,
    getSearch?.data?.searchPeople,
    getSearch?.fetching,
    page,
    search,
    submit,
  ]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Height",
        accessor: "height",
      },
      {
        Header: "Mass",
        accessor: "mass",
      },
      {
        Header: "Gender",
        accessor: "gender",
      },
      {
        Header: "",
        accessor: "view",
      },
    ],
    []
  );
  return (
    <Box paddingTop="50px" px="2rem">
      {fetching ? (
        <Spinner />
      ) : data ? (
        <>
          <Flex flexDir="column">
            <Text my="2rem">
              Page <strong>{page}</strong>
            </Text>
            <Flex justify="space-between">
              <Input
                placeholder="Search name"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={() => setSubmit(true)}>Search</Button>
            </Flex>
            <CustomTable
              columns={columns}
              data={data.map((data: any) => {
                const time = parseInt(data.time) * 1000;
                return {
                  ...data,
                  time: new Date(time).toLocaleString(),
                  view: "view more...",
                };
              })}
              pageNumber={page}
            />
            <Flex justify="space-between" mt="1.5rem">
              <Button
                onClick={() => {
                  const newPage = page > 1 ? page - 1 : 1;
                  setPage(newPage);
                  navigate(`/?page=${newPage}`);
                }}
              >
                Previous
              </Button>
              <Button
                onClick={() => {
                  const newPage = page + 1;
                  setPage(newPage);
                  navigate(`/?page=${newPage}`);
                }}
              >
                Next
              </Button>
            </Flex>
          </Flex>
        </>
      ) : null}
    </Box>
  );
}

export default Home;
