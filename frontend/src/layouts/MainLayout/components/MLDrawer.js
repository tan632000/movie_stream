import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { List, ListItemText, Paper, Box, IconButton, Typography, ListItemButton, ListItemIcon } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";

import { AppConstant, ImageConstant, PathConstant } from "const";
import { HomeIcon, MenuIcon, UserIcon, VideoIcon } from "icons";
import { useRouter } from "next/router";

const Drawer = ({ open }) => {
  const classes = useStyles({ open });
  const router = useRouter();

  const onMatchingRoute = route => {
    if (!route) return false;

    if (Array.isArray(route)) {
      return route.includes(router.pathname);
    } else {
      const routerNoParams = route.split("?")?.[0];
      return router.pathname === routerNoParams;
    }
  };

  const handleNavigate = path => {
    router.push(path);
  };

  return (
    <Paper className={clsx(classes.root)}>
      <Box className={clsx("space-between-root", classes.top)}>
        <Box className="center-root">
          <Box component="img" src={ImageConstant.Favicon} className={classes.logo} />
          <Typography variant="h5" color="error.dark" className={classes.appName}>
            {AppConstant.APP_NAME}
          </Typography>
        </Box>
        <IconButton>
          <MenuIcon />
        </IconButton>
      </Box>

      <List component="nav" sx={{ mt: 2 }}>
        {LIST.map(({ label, path, icon }, index) => (
          <Fragment key={index}>
            <ListItemButton
              className={clsx(classes.listItemButtonRoot, { [classes.listItemButtonSelected]: onMatchingRoute(path) })}
              onClick={() => handleNavigate(path)}
            >
              <ListItemIcon className={classes.icon}>{icon}</ListItemIcon>
              <ListItemText primary={label} classes={{ primary: classes.listItemTextPrimary }} />
            </ListItemButton>
          </Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default Drawer;

const LIST = [
  {
    label: "Dashboard",
    path: PathConstant.ROOT,
    icon: <HomeIcon sx={{ fontSize: 20 }} />,
  },
  {
    label: "Movies",
    path: PathConstant.MOVIES,
    icon: <VideoIcon sx={{ fontSize: 20 }} />,
  },
  {
    label: "Users",
    path: PathConstant.USERS,
    icon: <UserIcon sx={{ fontSize: 20 }} />,
  },
];

Drawer.propTypes = {
  open: PropTypes.bool,
  onToggle: PropTypes.func,
};

Drawer.defaultProps = {
  open: true,
};

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2, 0),
    height: "100%",
    minWidth: 300,
    background: theme.palette.background.dark,
    boxShadow: "none",
  },
  top: {
    padding: theme.spacing(0, 2.5),
  },
  logo: {
    height: 45,
    width: "100%",
    marginRight: theme.spacing(1.5),
  },
  appName: {
    textTransform: "uppercase",
    fontSize: 19,
  },
  listItemButtonRoot: {
    transition: "color 0.3s",
    color: theme.palette.grey[100],

    "&:hover": {
      background: "transparent",
      color: theme.palette.error.dark,
    },
  },
  listItemButtonSelected: {
    color: theme.palette.error.dark,
    borderRight: `3px solid ${theme.palette.error.dark}`,
    "& $icon": {
      color: theme.palette.error.dark,
    },
  },
  listItemTextPrimary: {
    ...theme.typography.body1,
  },
  icon: {
    paddingLeft: theme.spacing(0.75),
  },
}));
