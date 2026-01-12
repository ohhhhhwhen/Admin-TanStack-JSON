import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEmployee } from "../api/employees";

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
  { id: "firstName", label: "First Name" },
  { id: "lastName", label: "Last Name" },
  { id: "department", label: "Department" },
  { id: "position", label: "Position" },
];

const DeleteEmployeeModal = ({ open, handleClose, focusedItem }) => {
  console.log(focusedItem)
  const queryClient = useQueryClient();

  const deleteEmployeeMutation = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["data", "employees"] });
      handleClose();
    },
  });

  const handleSubmit = () => {
    deleteEmployeeMutation.mutate(focusedItem.id);
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
            Do You Want To Delete This Employee?
          </Typography>

          {focusedItem && <TwoColumnGrid itemDetails={focusedItem} />}

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

const TwoColumnGrid = ({ itemDetails }) => {
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
            <div key={`${field.id}-label`} style={{ fontWeight: "bold" }}>
              {field.label}:
            </div>

            <div key={`${field.id}-value`}>{itemDetails[field.id]}</div>
          </>
        ))}
      </div>
    </>
  );
};

export default DeleteEmployeeModal;
