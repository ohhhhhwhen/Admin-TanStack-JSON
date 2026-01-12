import { Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAsset } from "../api/assets";

const departmentList = ["Engineering", "R&D", "Product", "Design", "Marketing"];
const typerList = [
  "Accessory",
  "Desktop",
  "Laptop",
  "Mobile",
  "Server",
  "Tablet",
  "Other",
];

const NewAsset = () => {
  const defaultInfo = {
    name: "",
    type: "Select Type",
    department: "Select Department",
    serialNum: "",
    status: "Available",
    lastUpdate: dayjs(new Date()).format("YYYY-MM-DD"),
  };
  const [assetInfo, setAssetInfo] = useState(defaultInfo);
  const queryClient = useQueryClient();

  const createAssetPostMutation = useMutation({
    mutationFn: createAsset,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["data", "assets"] });
    },
  });

  const handleAddAsset = () => {
    let newAssetObject = { ...assetInfo, ownerName: "" };
    createAssetPostMutation.mutate({ id: uuidv4(), ...newAssetObject });
  };

  const handleChangeInput = (e) => {
    setAssetInfo({
      ...assetInfo,
      [e.target.name]: e.target.value,
    });
  };

  console.log(assetInfo);

  const handleType = (e) => {
    setAssetInfo({
      ...assetInfo,
      type: e.target.value,
    });
  };

  const handleDepartment = (e) => {
    setAssetInfo({
      ...assetInfo,
      department: e.target.value,
    });
  };

  const handleCancel = () => {
    setAssetInfo(defaultInfo);
  };

  const handleSubmit = () => {
    handleAddAsset();
    handleCancel();
  };

  const isFormValid = Object.entries(assetInfo).every(([key, value]) => {
    if (key === "type" && value === "Select Type") return false;
    if (key === "department" && value === "Select Department") return false;
    if (typeof value === "string") return value.trim() !== "";
    return true;
  });

  return (
    <>
      <Typography variant="p" component="p" style={{ marginTop: "10px" }}>
        Name:
      </Typography>
      <TextField
        id="outlined-basic"
        placeholder="Name"
        variant="outlined"
        name="name"
        value={assetInfo.name}
        onChange={handleChangeInput}
      />
      <Typography variant="p" component="p" style={{ marginTop: "10px" }}>
        Type:
      </Typography>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={assetInfo.type}
        onChange={handleType}
      >
        <MenuItem disabled value="Select Type">
          Select Type
        </MenuItem>
        {typerList.map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </Select>
      <Typography variant="p" component="p" style={{ marginTop: "10px" }}>
        Department:
      </Typography>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={assetInfo.department}
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
        Serial #:
      </Typography>
      <TextField
        id="outlined-basic"
        placeholder="Serial #"
        variant="outlined"
        name="serialNum"
        value={assetInfo.serialNum}
        onChange={handleChangeInput}
      />
      <div style={{ display: "flex", marginTop: "10px", gap: 10 }}>
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

export default NewAsset;
