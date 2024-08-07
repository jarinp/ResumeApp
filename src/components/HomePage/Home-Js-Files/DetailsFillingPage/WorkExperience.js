import React, { useEffect, useMemo } from 'react';
import { useFieldArray, useWatch, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, TextField, Typography, MenuItem } from '@mui/material';
import { setWorkExperience } from '../../../../Redux/action';

const WorkExperienceForm = () => {
  const dispatch = useDispatch();
  const workExperience = useSelector((state) => state.userDetails?.workExperience || []);
  const { control, register, formState: { errors }, reset } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experiences',
  });

  // Watch form data
  const formData = useWatch({ control, name: 'experiences' });

  // Initialize form with values from Redux store
  useEffect(() => {
    console.log('WorkExperience from Redux:', workExperience); // Debugging
    if (workExperience && workExperience.length > 0) {
      reset({ experiences: workExperience });
    }
  }, [workExperience, reset]);
  

  // Dispatch form data to Redux store on change
  useEffect(() => {
    console.log('FormData:', formData); // Debugging
    dispatch(setWorkExperience(formData));
  }, [formData, dispatch]);

  // Append initial empty fields if none exist
  useEffect(() => {
    if (fields.length === 0) {
      append({ jobTitle: '', organizationName: '', startYear: '', endYear: '' });
    }
  }, [fields, append]);

  // Add new experience handler
  const handleAddExperience = () => {
    append({ jobTitle: '', organizationName: '', startYear: '', endYear: '' });
  };

  // Remove experience handler
  const handleRemoveExperience = (index) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  // Generate years for selection
  const getYears = useMemo(() => {
    const startYear = 2000;
    const endYear = new Date().getFullYear();
    return Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
  }, []);

  // Validate end year
  const validateEndYear = (startYear, endYear) => {
    if (startYear && endYear && endYear <= startYear) {
      return 'End Year must be after Start Year';
    }
    return true;
  };

  return (
    <form>
      <Typography variant="h6" gutterBottom>
        Work Experience
      </Typography>
      {fields.map((field, index) => (
        <Grid container spacing={2} key={field.id}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Experience {index + 1}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Job Title"
              {...register(`experiences.${index}.jobTitle`, { required: 'Job Title is required' })}
              fullWidth
              error={!!errors.experiences?.[index]?.jobTitle}
              helperText={errors.experiences?.[index]?.jobTitle?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Organization Name"
              {...register(`experiences.${index}.organizationName`, { required: 'Organization Name is required' })}
              fullWidth
              error={!!errors.experiences?.[index]?.organizationName}
              helperText={errors.experiences?.[index]?.organizationName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Start Year"
              select
              {...register(`experiences.${index}.startYear`, { required: 'Start Year is required' })}
              fullWidth
              defaultValue={field.startYear} // Default value set
              error={!!errors.experiences?.[index]?.startYear}
              helperText={errors.experiences?.[index]?.startYear?.message}
            >
              {getYears.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="End Year"
              select
              {...register(`experiences.${index}.endYear`, {
                required: 'End Year is required',
                validate: (value) => validateEndYear(formData[index]?.startYear, value)
              })}
              fullWidth
              defaultValue={field.endYear} // Default value set
              error={!!errors.experiences?.[index]?.endYear}
              helperText={errors.experiences?.[index]?.endYear?.message}
            >
              {getYears.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleRemoveExperience(index)}
              disabled={fields.length === 1}
              fullWidth
            >
              Remove Experience
            </Button>
          </Grid>
        </Grid>
      ))}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddExperience}
            fullWidth
          >
            Add Experience
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default WorkExperienceForm;
