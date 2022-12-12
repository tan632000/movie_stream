import React, { useState } from "react";
import { Box, Button, Checkbox, FormControlLabel, Stack, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import { ImageConstant, PathConstant } from "const";
import { AppTextField } from "components";
import { NoSsr } from "@mui/core";
import axiosClient from "api";
import cookie from 'js-cookie'
import router from "next/router";

const Login = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const submit = (e) => {
    e.preventDefault()
    axiosClient.post('/auth/signin', {
      email,
      password
    }).then((data) => {
      if (data.status === 200) {
        const user = data.data.payload.user;
        cookie.set('token_rgs_pt', data.data.payload.token, { expires: 1 })
        localStorage.setItem('user_id', JSON.stringify(user._id))
        router.push('/');
      }
    })
  }

  const onChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }

  return (
    <NoSsr>
      <Box className={clsx("center-root", classes.root)}>
        <Box className={classes.inputWrapper}>
          <Typography variant="h5">Sign In</Typography>
          <Stack mt={3} mb={2} spacing={2}>
            {/* <AppTextField placeholder="Enter email" required />
            <AppTextField placeholder="Password" type="password" required /> */}
            <TextField placeholder="Enter email" onChange={onChangeEmail} />
            <TextField placeholder="Password" onChange={onChangePassword} />
          </Stack>
          <Box className={classes.actions}>
            <Button variant="containedPrimary" onClick={(e) => submit(e)}>
              Sign in
            </Button>
            <FormControlLabel control={<Checkbox className={classes.checkbox} />} label="Remember Me" />
          </Box>
        </Box>
      </Box>
    </NoSsr>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100vw",
    height: "100vh",
    background: `url(${ImageConstant.LoginBackgroundImage}) center/cover no-repeat`,
  },
  inputWrapper: {
    minWidth: 445,
    padding: theme.spacing(3),
    background: theme.palette.grey[500],
    backdropFilter: "blur(10px)",
    boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)",
  },
  title: {
    fontSize: 32,
    textAlign: "center",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  checkbox: {
    "&.Mui-checked": {
      color: theme.palette.error.dark,
    },
  },
}));

export default Login;
