import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormLabel } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ReCaptcha from "react-google-recaptcha";
import { FormattedMessage } from "react-intl";

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
  // Add your password validation logic here (e.g., minimum length)
  return password.length >= 6;
}

function validateContactNumber(contactNumber) {
  // const contactNumber = /^\d{10}$/;
  return contactNumber.length >= 10;
}

const theme = createTheme();

export default function Register() {
  const [city, setCity] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate form fields
    const newErrors = {};
    if (!formData.firstName) {
      newErrors.firstName = "First Name is required";
    }
    if (!formData.lastName) {
      newErrors.lastName = "Last Name is required";
    }
    if (!validateContactNumber(formData.contactNumber)) {
      newErrors.contactNumber = "Invalid Contact Number";
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid Email Address";
    }
    if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (Object.keys(newErrors).length === 0) {
      // Form is valid, you can submit it
      console.log(formData);
    } else {
      // Form has errors, update the state to display error messages
      setErrors(newErrors);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: 3,
            borderRadius: 2,
            px: 4,
            py: 6,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            <FormattedMessage id="Register.text" />
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label={<FormattedMessage id="firstname.label" />}
                  autoFocus
                  onChange={handleChange}
                  error={Boolean(errors.firstName)}
                  helperText={errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label={<FormattedMessage id="lastname.label" />}
                  name="lastName"
                  autoComplete="family-name"
                  onChange={handleChange}
                  error={Boolean(errors.lastName)}
                  helperText={errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="contactNumber"
                  label={<FormattedMessage id="contactnumber.label" />}
                  name="contactNumber"
                  autoComplete="contactNumber"
                  onChange={handleChange}
                  error={Boolean(errors.contactNumber)}
                  helperText={errors.contactNumber}
                />
              </Grid>
              <Grid item xs={2}>
                <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group">
                    <FormattedMessage id="gender.label" />
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label={<FormattedMessage id="female.label" />}
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label={<FormattedMessage id="male.label" />}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label={<FormattedMessage id="emailaddress.label" />}
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label={<FormattedMessage id="password.label" />}
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    {<FormattedMessage id="city.label" />}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={city}
                    label="city"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Hubli</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid item xs={12} style={{ paddingTop: "20px" }}>
              <ReCaptcha sitekey="6LeLsiQoAAAAAJ_rZDGGkaSrobQ22Dqk42C-08kn" />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              <FormattedMessage id="Register.text" />
            </Button>
            <Grid container justifyContent="flex-end"></Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
