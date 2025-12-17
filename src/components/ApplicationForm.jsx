import {
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  InputLabel,
  Paper,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import React, { useState } from "react";

const ApplicationForm = () => {
  const [application, setApplication] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    isUSAuthorized: "",
    sponsorship: "",
    veteranStatus: "",
    disabledStatus: "",
  });

  const handleChange = (e) => {
    setApplication({
      ...application,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // onSubmit(application);
    setApplication({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      isUSAuthorized: "",
      sponsorship: "",
      veteranStatus: "",
      disabledStatus: "",
    });
  };

  const renderField = (label) => (
    <div>
      <label>{label}</label>
      <input
        onChange={handleChangeInput}
        type="text"
        name={label.toLowerCase()}
        value={application[label.toLowerCase()]}
      />
    </div>
  );

  return (
    <Paper elevation={3} sx={{ p: 4, m: "auto", maxWidth: "500px" }}>
      <Typography variant="h4" gutterBottom align="center">
        Job Application
      </Typography>

      <form onSubmit={handleSubmit}>
        {/* Use Stack with direction='column' for strict vertical stacking */}
        <Stack spacing={3} direction="column">
          {/* --- Contact Information Header --- */}
          <Typography variant="h6" color="primary">
            Contact Information
          </Typography>

          {/* First Name */}
          <TextField
            required
            fullWidth
            label="First Name"
            name="firstName"
            value={application.firstName}
            onChange={handleChange}
          />

          {/* Last Name */}
          <TextField
            required
            fullWidth
            label="Last Name"
            name="lastName"
            value={application.lastName}
            onChange={handleChange}
          />

          {/* Email */}
          <TextField
            required
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={application.email}
            onChange={handleChange}
          />

          {/* Phone */}
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            type="tel"
            value={application.phone}
            onChange={handleChange}
          />

          {/* --- Work Eligibility Section --- */}
          <Box mt={1}>
            <Typography variant="h6" color="primary">
              Work Eligibility
            </Typography>
          </Box>

          {/* US Authorization */}
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">
              Are you legally **authorized to work in the US**?
            </FormLabel>
            <RadioGroup
              // Radio buttons are stacked vertically (column is default without 'row')
              name="isUSAuthorized"
              value={application.isUSAuthorized}
              onChange={handleChange}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>

          {/* Sponsorship (Select Dropdown) */}
          <FormControl fullWidth>
            <InputLabel id="sponsorship-label">
              Do you now or will you require **sponsorship**?
            </InputLabel>
            <Select
              labelId="sponsorship-label"
              label="Do you now or will you require sponsorship?"
              name="sponsorship"
              value={application.sponsorship}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>Select One</em>
              </MenuItem>
              <MenuItem value="no">No</MenuItem>
              <MenuItem value="current">
                Yes, I currently require sponsorship
              </MenuItem>
              <MenuItem value="future">
                Yes, I will require sponsorship in the future
              </MenuItem>
            </Select>
          </FormControl>

          {/* --- Voluntary Disclosure Section --- */}
          <Box mt={1}>
            <Typography variant="h6" color="primary">
              Voluntary Disclosure (EEO)
            </Typography>
            <Typography variant="body2" color="textSecondary">
              The information below is voluntary and confidential.
            </Typography>
          </Box>

          {/* Veteran Status */}
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">**Veteran Status**</FormLabel>
            <RadioGroup
              name="veteranStatus"
              value={application.veteranStatus}
              onChange={handleChange}
            >
              <FormControlLabel
                value="yes"
                control={<Radio size="small" />}
                label="Yes, I am a protected veteran"
              />
              <FormControlLabel
                value="no"
                control={<Radio size="small" />}
                label="No, I am not a protected veteran"
              />
              <FormControlLabel
                value="preferNot"
                control={<Radio size="small" />}
                label="Prefer not to disclose"
              />
            </RadioGroup>
          </FormControl>

          {/* Disability Status */}
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">**Disability Status**</FormLabel>
            <RadioGroup
              name="disabledStatus"
              value={application.disabledStatus}
              onChange={handleChange}
            >
              <FormControlLabel
                value="yes"
                control={<Radio size="small" />}
                label="Yes, I have a disability"
              />
              <FormControlLabel
                value="no"
                control={<Radio size="small" />}
                label="No, I do not have a disability"
              />
              <FormControlLabel
                value="preferNot"
                control={<Radio size="small" />}
                label="Prefer not to disclose"
              />
            </RadioGroup>
          </FormControl>

          {/* --- Submit Button --- */}
          <Box sx={{ textAlign: "center", pt: 1 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Submit Application
            </Button>
          </Box>
        </Stack>
      </form>
    </Paper>
  );
};

export default ApplicationForm;
