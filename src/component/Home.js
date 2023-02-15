import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Redirect } from "react-router-dom";
import { Chip } from "@mui/material";
import { invite } from "../redux/action/auth";

function Home() {
    const [loading, setLoading] = useState(false);
    const { user, isLoggedIn } = useSelector((state) => state.auth);
    const { message } = useSelector((state) => state.message);
    const alert = useAlert();
    const dispatch = useDispatch();
    const theme = createTheme();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const values = {
            email: data.get("email"),
            referral: user.referral,
        };
        if (values.email) {
            setLoading(true);
            dispatch(invite(values))
                .then(() => {
                    setLoading(false);
                    alert.show("Invite Sent", {
                        type: "success",
                        timeout: 5000,
                    });
                })
                .catch(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    };

    if (!isLoggedIn) {
        return <Redirect to="/login" />;
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <PersonAddAlt1OutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Send Referral
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            type="email"
                            autoFocus
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2, mb: 2 }}
                        >
                            {loading && (
                                <span className="spinner-border spinner-border-sm" />
                            )}
                            Send
                        </Button>
                    </Box>
                    <Chip label={`Referral Code: ${user.referral}`} />
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Home;
