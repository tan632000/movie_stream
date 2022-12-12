import {React, useState} from "react";
import PropTypes from "prop-types";
import { Box, Alert, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AppSelect, AppTextField, CommonDialogWithCloseIcon } from "components";
import { AppConstant } from "const";
import axiosClient from "api";

const AddMovieDialog = ({ ...otherProps }) => {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState('');
  const [file, setFile] = useState('');
  const [fileImg, setFileImg] = useState('');

  const onChange = (e) => {
    setTitle(e.target.value);
  }
  
  const onChangeDropdown = (type) => {
    setType(AppConstant.FILM_CATEGORIES[parseInt(type) - 1].label);
  }

  const onChangeImage = (e) => {
    setFileImg(e.target.files[0])
  }

  const onChangeVideo = (e) => {
    setFile(e.target.files[0])
  }

  const uploadImage = (file) => {
    let formData = new FormData();
    formData.append("file", file)
    axiosClient.post('movie/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((res) => {
      if (res.status === 200) {
        setImage(res.data.url)
      }
    })
  }

  const submit = (e) => {
    e.preventDefault();
    uploadImage();
    let formData = new FormData();
    formData.append("file", file)
    axiosClient.post('movie/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      if (res.status === 200) {
        axiosClient.post('movie/add', {
          img: image,
          name: title,
          type: type,
          video: res.data.url
          }).then(() => {
            otherProps.onClose()
        }).catch((err) => console.log(err))
      }
    })
  }

  return (
    <CommonDialogWithCloseIcon
      title="Add New Movie"
      buttonText="Submit"
      classes={{ paper: classes.root }}
      {...otherProps}
      onClick={submit}
    >
      <Box className={classes.content}>
        {/* TODO: update condition to display alert */}
        {Boolean(false) && <Alert severity="error">Please enter all required fields</Alert>}

        <Stack mt={3} mb={2} spacing={2}>
          <AppTextField name="title" placeholder="Title" type="text" required onChange={onChange} />
          <AppSelect
            label=""
            data={AppConstant.FILM_CATEGORIES}
            onChange={onChangeDropdown}
            placeholder="Movie Category"
          />
          <AppTextField name="imageSrc" placeholder="Upload Image" type="file" required onChange={onChangeImage} />
          <AppTextField name="videoSrc" placeholder="Upload Video" type="file" accept="video/mp4,video/x-m4v,video/*" required onChange={onChangeVideo} />
        </Stack>
      </Box>
    </CommonDialogWithCloseIcon>
  );
};

export default AddMovieDialog;

AddMovieDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onClick: PropTypes.func,
};

const useStyles = makeStyles(() => ({
  root: {
    width: 600,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  gap: {
    gap: 16,
  },
}));
