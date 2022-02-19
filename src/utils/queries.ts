import { useQuery } from "urql";

const Queries = ({
  query,
  variables,
}: {
  query: string;
  variables?: {
    name: string;
    value: number | string;
  };
}) => {
  const name = variables?.name || "";
  const [result] = useQuery({
    query,
    variables: {
      [name]: variables?.value,
    },
    requestPolicy: "cache-first",
  });

  return result;
};

export default Queries;
