import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const card = (handleNavigateApplication) => (
  <>
    <CardContent>
      <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
        Welcome to Admin Project
      </Typography>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Button variant="contained">Admin Guest</Button>
        {/* <Button variant="contained" onClick={handleNavigateApplication}>
          Application
        </Button> */}
      </div>
    </CardContent>
  </>
);

export default function LoginBox() {
  const navigate = useNavigate();

  const handleNavigateApplication = () => navigate("/application");

  return (
    <Box
      sx={{
        minWidth: 275,
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card variant="outlined">{card(handleNavigateApplication)}</Card>
    </Box>
  );
}
