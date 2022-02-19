import { useNavigate } from "react-router-dom";
import { useTable, usePagination } from "react-table";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const CustomTable = ({
  columns,
  data,
  pageNumber,
}: {
  columns: any;
  data: any;
  pageNumber: number;
}) => {
  const navigate = useNavigate();
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page } =
    useTable(
      {
        columns,
        data,
      },
      usePagination
    );

  return (
    <>
      <Table {...getTableProps()} size="md">
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td
                    {...cell.getCellProps()}
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      navigate(`/details?name=${cell?.row?.values?.name}`, {
                        state: { ...cell?.row?.values, pageNumber },
                        replace: true,
                      })
                    }
                  >
                    {cell.render("Cell")}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
};

export default CustomTable;
