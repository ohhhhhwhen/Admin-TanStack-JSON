import { Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEmployee } from "../api/employees";

const departmentList = ["Engineering", "R&D", "Product", "Design", "Marketing"];
const positionList = [
  "Software Engineer",
  "Data Scientist",
  "Product Manager",
  "UX Designer",
  "Marketing Specialist",
];

const NewEmployee = () => {
  const defaultInfo = {
    firstName: "",
    lastName: "",
    position: "Select Position",
    department: "Select Department",
    isIntern: false,
    startDate: "",
  };
  const [employeeInfo, setEmployeeInfo] = useState(defaultInfo);
  const [employeeStartDate, setEmployeeStartDate] = useState(dayjs(new Date()));
  const queryClient = useQueryClient();

  const createEmployeePostMutation = useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["data", "employees"] });
    },
  });

  const handleAddEmployee = () => {
    createEmployeePostMutation.mutate({ id: uuidv4(), ...employeeInfo });
  };

  console.log(employeeInfo);

  const handleChangeInput = (e) => {
    setEmployeeInfo({
      ...employeeInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleDepartment = (e) => {
    setEmployeeInfo({
      ...employeeInfo,
      department: e.target.value,
    });
  };

  const handlePosition = (e) => {
    setEmployeeInfo({
      ...employeeInfo,
      position: e.target.value,
    });
  };

  const handleDateChange = (newValue) => {
    setEmployeeStartDate(newValue);
    setEmployeeInfo({
      ...employeeInfo,
      startDate: newValue.format("YYYY-MM-DD"),
    });
  };

  const handleCancel = () => {
    setEmployeeInfo(defaultInfo);
    setEmployeeStartDate(null);
  };

  const handleSubmit = () => {
    handleAddEmployee();
    handleCancel();
  };

  const isFormValid = Object.entries(employeeInfo).every(([key, value]) => {
    if (key === "position" && value === "Select Position") return false;
    if (key === "department" && value === "Select Department") return false;
    if (key === "startDate") {
      return value !== null;
    }
    if (typeof value === "string") return value.trim() !== "";
    return true;
  });

  return (
    <>
      <Typography variant="p" component="p" style={{ marginTop: "10px" }}>
        First Name:
      </Typography>
      <TextField
        id="outlined-basic"
        placeholder="First Name"
        variant="outlined"
        name="firstName"
        value={employeeInfo.firstName}
        onChange={handleChangeInput}
      />
      <Typography variant="p" component="p" style={{ marginTop: "10px" }}>
        Last Name:
      </Typography>
      <TextField
        id="outlined-basic"
        placeholder="Last Name"
        variant="outlined"
        name="lastName"
        value={employeeInfo.lastName}
        onChange={handleChangeInput}
      />
      <Typography variant="p" component="p" style={{ marginTop: "10px" }}>
        Position:
      </Typography>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={employeeInfo.position}
        onChange={handlePosition}
      >
        <MenuItem disabled value="Select Position">
          Select Position
        </MenuItem>
        {positionList.map((position) => (
          <MenuItem key={position} value={position}>
            {position}
          </MenuItem>
        ))}
      </Select>
      <Typography variant="p" component="p" style={{ marginTop: "10px" }}>
        Department:
      </Typography>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={employeeInfo.department}
        onChange={handleDepartment}
      >
        <MenuItem disabled value="Select Department">
          Select Department
        </MenuItem>
        {departmentList.map((department) => (
          <MenuItem key={department} value={department}>
            {department}
          </MenuItem>
        ))}
      </Select>
      <Typography variant="p" component="p" style={{ marginTop: "10px" }}>
        Start Date:
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker value={employeeStartDate} onChange={handleDateChange} />
        </DemoContainer>
      </LocalizationProvider>
      <div style={{ display: "flex" }}>
        <Button variant="contained" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          disabled={!isFormValid}
          variant="contained"
          onClick={handleSubmit}
        >
          Confirm
        </Button>
      </div>
    </>
  );
};

export default NewEmployee;
