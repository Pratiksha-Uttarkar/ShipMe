import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  MenuItem,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const steps = [
  "Personal Information",
  "Address Information",
  "Payment Information",
];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    country: "India",
    state: "Karnataka",
    paymentMode: "Cash on Delivery",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateStep = (step) => {
    let stepErrors = {};

    if (step === 0) {
      if (!formData.firstName) stepErrors.firstName = "First Name is required";
      if (!formData.lastName) stepErrors.lastName = "Last Name is required";
      if (!formData.email) {
        stepErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        stepErrors.email = "Email address is invalid";
      }
    }

    if (step === 1) {
      if (!formData.address) stepErrors.address = "Address is required";
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    console.log(`handleNext`, activeStep, validateStep(activeStep));
    if (validateStep(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(activeStep)) {
      console.log("Form data submitted:", formData);
      navigate("/preview", { state: { formData } });
    }
  };

  return (
    <div className="checkout-form-container">
      <h2>Checkout Form</h2>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        style={{ marginBottom: "20px" }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box
        // component="form"
        sx={{
          "& .MuiTextField-root": { marginBottom: 2 },
        }}
        noValidate
        autoComplete="off"
        // onSubmit={handleSubmit}
      >
        {activeStep === 0 && (
          <div>
            <TextField
              error={!!errors.firstName}
              id="firstName"
              name="firstName"
              label="First Name"
              value={formData.firstName}
              onChange={handleChange}
              helperText={errors.firstName}
              fullWidth
              required
            />
            <TextField
              error={!!errors.lastName}
              id="lastName"
              name="lastName"
              label="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              helperText={errors.lastName}
              fullWidth
              required
            />
            <TextField
              error={!!errors.email}
              id="email"
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              helperText={errors.email}
              fullWidth
              required
            />
          </div>
        )}
        {activeStep === 1 && (
          <div>
            <TextField
              error={!!errors.address}
              id="address"
              name="address"
              label="Address"
              value={formData.address}
              onChange={handleChange}
              helperText={errors.address}
              fullWidth
              required
            />
            <TextField
              id="country"
              name="country"
              label="Country"
              value={formData.country}
              onChange={handleChange}
              select
              fullWidth
              required
            >
              <MenuItem value="India">India</MenuItem>
            </TextField>
            <TextField
              id="state"
              name="state"
              label="State"
              value={formData.state}
              onChange={handleChange}
              select
              fullWidth
              required
            >
              <MenuItem value="Karnataka">Karnataka</MenuItem>
            </TextField>
          </div>
        )}
        {activeStep === 2 && (
          <div>
            <TextField
              id="paymentMode"
              name="paymentMode"
              label="Payment Mode"
              value={formData.paymentMode}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              required
            />
          </div>
        )}
        <div className="buttons">
          {activeStep !== 0 && (
            <Button onClick={handleBack} style={{ marginRight: "10px" }}>
              Back
            </Button>
          )}
          {activeStep === steps.length - 1 ? (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleNext}>
              Next
            </Button>
          )}
        </div>
      </Box>
    </div>
  );
};

export default Checkout;
