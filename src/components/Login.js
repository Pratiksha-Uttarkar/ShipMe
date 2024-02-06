import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import loginService from "./services/login";
import LocalStorage from "../helpers/Localstorage";

const LoginPage = ({ isUserLogin, setIsUserLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const handleLogin = async () => {
    console.log("Logging in with:", email, password);
    try {
      await loginService({ email, password });
      setIsUserLogin(true);
      navigate("/");
      // window.location.href = `http://localhost:3003?token=${localStorage.getItem(
      //   "token"
      // )}`;
    } catch (e) {
      console.error(e);
      setShowErrorDialog(true);
      setIsUserLogin(false);
    }
  };

  const handleCloseErrorDialog = () => {
    setShowErrorDialog(false);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Container component="main" maxWidth="xs" style={{ flex: 1 }}>
        <Paper
          elevation={3}
          style={{
            padding: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Typography variant="h5">Login</Typography>
          <form>
            <TextField
              margin="normal"
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              margin="normal"
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Container>
      <Dialog open={showErrorDialog} onClose={handleCloseErrorDialog}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Typography>
            Incorrect email and password. Please try again.
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoginPage;
