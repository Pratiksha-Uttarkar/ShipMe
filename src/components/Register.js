import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ReCaptcha from "react-google-recaptcha";
import { FormattedMessage } from "react-intl";
import { FormLabel } from "@mui/material";
import axios from "axios";

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
  return password.length >= 6;
}

function validateContactNumber(contactNumber) {
  return /^\d{10}$/.test(contactNumber);
}

const theme = createTheme();

const initState = {
  firstName: "",
  lastName: "",
  contactNumber: "",
  city: "",
  gender: "",
  email: "",
  password: "",
};

export default function Register() {
  const [errors, setErrors] = React.useState({});
  const [formData, setFormData] = React.useState(initState);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,

      [name]: value,
    });
  };

  const handleContactNumberChange = (event) => {
    const { name, value } = event.target;
    const numericValue = value.replace(/\D/g, "");
    setFormData({
      ...formData,
      [name]: numericValue,
    });
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const setCity = (value) => {
    setFormData({ ...formData, city: value });
  };

  const handleSubmit = async (event) => {
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
      console.log("submitting");
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/register",
          formData
        );
        console.log("response=====");
        console.log(response.data);
        setErrors("");
        // setFormData("")
         setFormData(initState);
      } catch (error) {
        // console.error(error.response.data.error);
        if (error.response.data.error.emailInvalidError || error.response.data.error.includes("Email")) {
          newErrors.email = error.response.data.error.emailInvalidError ?? error.response.data.error;
        } 
        if(error.response.data.error.mobileNumberError || error.response.data.error.includes("Contact")){
          newErrors.contactNumber = error.response.data.error.mobileNumberError ?? error.response.data.error;;
        }
        setErrors(newErrors); 
      }
    } else {
    }
  };

  const city = formData.city;

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
                  value={formData.firstName}
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
                  value={formData.lastName}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  required
                  fullWidth
                  id="contactNumber"
                  label={<FormattedMessage id="contactnumber.label" />}
                  name="contactNumber"
                  autoComplete="contactNumber"
                  onChange={handleContactNumberChange} // Add a new event handler
                  value={formData.contactNumber} // Bind the value to formData.contactNumber
                  error={Boolean(errors.contactNumber)}
                  helperText={errors.contactNumber}
                />
              </Grid>

              <Grid item xs={2}>
                <FormControl
                  onChange={({ target: { value } }) => {
                    setFormData({ ...formData, gender: value });
                  }}
                >
                  <FormLabel id="demo-controlled-radio-buttons-group">
                    <FormattedMessage id="gender.label" />
                  </FormLabel>

                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={formData.gender}
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
                  value={formData.email}
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
                  value={formData.password}
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
                    value={formData.city}
                    label="city"
                    onChange={handleCityChange}
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
