import React, { useState, useEffect } from 'react';
import {  Controller, useWatch, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setPersonalInfo } from '../../../../Redux/action';
import { Box, Grid, TextField, IconButton, Avatar, Link } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const PersonalInfo = () => {
  const { control, setValue,  } = useFormContext();
  const dispatch = useDispatch();
  const personalInfo = useSelector((state) => state.userInfo.userDetails.personalInfo);
  const [image, setImage] = useState(null);



  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
        setValue('image', e.target.result); // Connect image to form
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const formData = useWatch({ control });

  useEffect(() => {
    dispatch(setPersonalInfo(formData)); // Dispatch form data to Redux store
  }, [dispatch, formData]);

  return (
    <form>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} md={3}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <IconButton component="label" sx={{ mb: 1 }}>
              <Avatar src={image} sx={{ width: 56, height: 56 }}>
                <PhotoCamera />
              </Avatar>
              <input type="file" hidden onChange={handleImageChange} />
            </IconButton>
            <Link component="label" underline="hover" sx={{ cursor: 'pointer', mb: 2 }}>
              Upload Photo
              <input type="file" hidden onChange={handleImageChange} />
            </Link>
          </Box>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              rules={{ required: 'First name is required' }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="First Name"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error ? fieldState.error.message : null}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              rules={{ required: 'Last name is required' }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Last Name"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error ? fieldState.error.message : null}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Email"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error ? fieldState.error.message : null}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="mobileNumber"
              control={control}
              defaultValue=""
              rules={{
                required: 'Phone number is required',
                pattern: { value: /^([0-9]{10})+$/i, message: 'Invalid phone number' }
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Phone"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error ? fieldState.error.message : null}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="address"
              control={control}
              defaultValue=""
              rules={{ required: 'Address is required' }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Address"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error ? fieldState.error.message : null}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="city"
              control={control}
              defaultValue=""
              rules={{ required: 'City is required' }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="City"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error ? fieldState.error.message : null}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="state"
              control={control}
              defaultValue=""
              rules={{ required: 'State is required' }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="State"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error ? fieldState.error.message : null}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="postalCode"
              control={control}
              defaultValue=""
              rules={{
                required: 'Postal code is required',
                pattern: { value: /^([0-9]{6})+$/i, message: 'Invalid postal code' }
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Postal Code"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error ? fieldState.error.message : null}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="objective"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Objective"
                  fullWidth
                  multiline
                  rows={4}
                />
              )}
            />
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default PersonalInfo;