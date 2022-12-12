import React, { useState, useEffect } from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import MainLayout from "layouts/MainLayout";
import { AddMovieDialog, MovieList, SearchBar } from "components";
import axiosClient from "api";

const Movies = () => {
  const classes = useStyles();

  const [openDialog, setOpenDialog] = useState(false);
  const [listMovies, setListMovies] = useState([]);

  const page = 1;
  const limit = 10;

  useEffect(() => {
    axiosClient.get(`/movie/list?limit=${limit}&page=${page}`)
    .then((data) => {
      setListMovies(data.data)
    });
  }, []);

  return (
    <MainLayout>
      <Container className={classes.container}>
        <Box className={classes.wrapper}>
          <Box className={clsx("space-between-root", classes.header)}>
            <Typography variant="h3" className={classes.title}>
              Movie Lists
            </Typography>
            <Stack direction="row" alignItems="center" spacing={2}>
              <SearchBar />
              <Button variant="contained" className={classes.button} onClick={() => setOpenDialog(true)}>
                Add Movie
              </Button>
            </Stack>
          </Box>

          <MovieList data={listMovies} p={2.5} />
        </Box>
      </Container>

      <AddMovieDialog open={openDialog} onClose={() => setOpenDialog(false)} />
    </MainLayout>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    height: "100%",
    width: "100%",
    paddingTop: theme.spacing(3.75),
    paddingBottom: theme.spacing(3.75),
  },
  wrapper: {
    width: "100%",
    background: theme.palette.background.dark,
  },
  header: {
    padding: theme.spacing(2.5),
    borderBottom: `1px solid ${theme.palette.common.black}`,
  },
  title: {
    fontWeight: 600,
  },
  button: {
    minWidth: 40,
    height: 40,
  },
}));

export default Movies;
