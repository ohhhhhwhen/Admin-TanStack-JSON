import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { useQuery } from "@tanstack/react-query";
import { fetchEmployees } from "../api/employees";
import { useEffect } from "react";
import { fetchAssets } from "../api/assets";
import UnassignModal from "./UnassignModal";
import AssignModal from "./AssignModal";
import DeleteAssetModal from "./DeleteAssetModal";
import DeleteEmployeeModal from "./DeleteEmployeeModal";

const employeeColumns = [
  { id: "firstName", label: "First Name", minWidth: 170 },
  { id: "lastName", label: "Last Name", minWidth: 170 },
  { id: "department", label: "Department", minWidth: 170 },
  { id: "position", label: "Position", minWidth: 170 },
  {
    id: "action",
    label: "Action",
    minWidth: 50,
    maxWidth: 50,
    align: "center",
  },
];

const inventoryColumns = [
  { id: "name", label: "Name", minWidth: 100 },
  { id: "type", label: "Type", minWidth: 100 },
  { id: "serialNumber", label: "Serial #", minWidth: 100 },
  { id: "status", label: "Status", minWidth: 100 },
  { id: "ownerName", label: "Owner", minWidth: 100 },
  { id: "lastUpdate", label: "Last Update", minWidth: 100 },
  {
    id: "action",
    label: "Action",
    minWidth: 50,
    maxWidth: 50,
    align: "center",
  },
];

const CustomTable = ({ activeTab }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [columnNames, setColumnNames] = useState(employeeColumns);
  const [openUnassign, setOpenUnassign] = useState(false);
  const [openAssign, setOpenAssign] = useState(false);
  const [openDeleteAsset, setOpenDeleteAsset] = useState(false);
  const [openDeleteEmployee, setOpenDeleteEmployee] = useState(false);
  const [focusedItem, setFocusedItem] = useState({});
  const handleOpen = (rowData, isAssigned) => {
    if (isAssigned) setOpenUnassign(true);
    else setOpenAssign(true);
    setFocusedItem(rowData);
  };
  const handleOpenDeleteAsset = (rowData) => {
    setOpenDeleteAsset(true);
    setFocusedItem(rowData);
  };
  const handleOpenDeleteEmployee = (rowData) => {
    setOpenDeleteEmployee(true);
    setFocusedItem(rowData);
  };
  const handleDelete = (rowData) => {
    if (activeTab === "Employees") handleOpenDeleteEmployee(rowData);
    else handleOpenDeleteAsset(rowData);
  };
  const handleClose = () => {
    setOpenUnassign(false);
    setOpenAssign(false);
    setOpenDeleteAsset(false);
    setOpenDeleteEmployee(false);
    setTimeout(() => {
      setFocusedItem({});
    }, 500);
  };

  useEffect(() => {
    if (activeTab === "Employees") {
      setColumnNames(employeeColumns);
    } else {
      setColumnNames(inventoryColumns);
    }
  }, [activeTab]);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["data", activeTab.toLowerCase()],
    queryFn: activeTab === "Employees" ? fetchEmployees : fetchAssets,
    enabled: activeTab === "Employees" || activeTab === "Assets",
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (isLoading) return "loading...";
  if (isError) return `Error ${error.message}`;
  if (
    activeTab === "Requests" ||
    activeTab === "New Employee" ||
    activeTab === "New Asset"
  )
    return null;

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 700 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columnNames.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.id === "action" ? "center" : "left"}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columnNames.map((column) => {
                        if (column.id === "action") {
                          let isAssigned = false;
                          let isAvailable = false;
                          let isActiveAsset = false;
                          let isCurrentEmployee = false;
                          let ActionIcon = null;
                          let ActionColor = "default";
                          let tooltipText = "";

                          if (activeTab === "Assets") {
                            isAssigned = row.status === "In Use";
                            isAvailable = row.status === "Available";
                            isActiveAsset = row.status !== "Retired";

                            if (isAssigned) {
                              ActionIcon = RemoveCircleOutlineIcon;
                              ActionColor = "error";
                              tooltipText = "Unassign Asset";
                            } else if (isAvailable) {
                              ActionIcon = AddIcon;
                              ActionColor = "success";
                              tooltipText = "Assign Asset";
                            }
                          }

                          if (activeTab === "Employees") {
                            isCurrentEmployee = row.currentEmployee === true;
                          }

                          return (
                            <TableCell key={column.id} align="center">
                              <IconButton
                                color={ActionColor}
                                onClick={() => handleOpen(row, isAssigned)}
                                aria-label={tooltipText}
                                size="small"
                              >
                                {ActionIcon && <ActionIcon fontSize="small" />}
                              </IconButton>
                              {(isCurrentEmployee || isActiveAsset) && (
                                <IconButton
                                  onClick={() => handleDelete(row)}
                                  aria-label="Delete Asset"
                                  size="small"
                                >
                                  <DeleteIcon />
                                </IconButton>
                              )}
                            </TableCell>
                          );
                        }
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <UnassignModal
        open={openUnassign}
        handleClose={handleClose}
        focusedItem={focusedItem}
      />
      <AssignModal
        open={openAssign}
        handleClose={handleClose}
        focusedItem={focusedItem}
      />
      <DeleteAssetModal
        open={openDeleteAsset}
        handleClose={handleClose}
        focusedItem={focusedItem}
      />
      <DeleteEmployeeModal
        open={openDeleteEmployee}
        handleClose={handleClose}
        focusedItem={focusedItem}
      />
    </>
  );
};

export default CustomTable;
