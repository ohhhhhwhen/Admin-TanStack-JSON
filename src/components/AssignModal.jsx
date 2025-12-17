import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAsset } from "../api/assets";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ASSET_FIELD_MAP = [
  { key: "name", label: "Name" },
  { key: "type", label: "Type" },
  { key: "serialNumber", label: "Serial #" },
  { key: "status", label: "Status" },
  { key: "ownerName", label: "Assigned To" },
  { key: "lastUpdate", label: "Last Update Date" },
];

const AssignModal = ({ open, handleClose, focusedItem }) => {
  const queryClient = useQueryClient();

  const updateAssetMutation = useMutation({
    mutationFn: updateAsset,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["data", "assets"] });
      handleClose();
    },
  });

  function formatDateToYYYYMMDD() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handleSubmit = () => {
    updateAssetMutation.mutate({
      ...focusedItem,
      status: "In Use",
      assignedToEmployeeId: null,
      ownerName: null,
      department: null,
      lastUpdate: formatDateToYYYYMMDD(),
    });
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Do You Want To Unassign This Item?
          </Typography>

          {focusedItem && <TwoColumnGrid assetDetails={focusedItem} />}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <Button variant="contained" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Confirm
            </Button>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

const TwoColumnGrid = ({ assetDetails }) => {
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px 20px",
        }}
      >
        {ASSET_FIELD_MAP.map((field) => (
          <>
            <div key={`${field.key}-label`} style={{ fontWeight: "bold" }}>
              {field.label}:
            </div>

            <div key={`${field.key}-value`}>{assetDetails[field.key]}</div>
          </>
        ))}
      </div>
    </>
  );
};

export default AssignModal;
