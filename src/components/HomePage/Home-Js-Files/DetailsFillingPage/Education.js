import React, { useEffect, useMemo } from 'react';
import { useFieldArray, useWatch, useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button, Grid, TextField, Typography} from '@mui/material';
import { setEducation } from '../../../../Redux/action';

const EducationForm = () => {
  const dispatch = useDispatch();
  

  // Initialize form with useFormContext
  const methods = useFormContext();
  const { control, register, formState: { errors }} = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'educations'
  });
  

  // Watch for changes in form data
  const formData = useWatch({ control, name: 'educations' });

  useEffect(() => {
    // Dispatch updated education to Redux store whenever formData changes
    dispatch(setEducation(formData));
  }, [formData, dispatch]);

  useEffect(() => {
    // Append a default education entry if no fields exist
    if (fields.length === 0) {
      append({ type: '', university: '', degree: '', startYear: '', endYear: '' });
    }
  }, [fields, append]);

  const handleAddEducation = () => {
    append({ type: '', university: '', degree: '', startYear: '', endYear: '' });
  };

  const handleRemoveEducation = (index) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const getYears = useMemo(() => {
    const startYear = 2000;
    const endYear = new Date().getFullYear();
    return Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
  }, []);

  const validateEndYear = (startYear, endYear) => {
    if (startYear && endYear && endYear <= startYear) {
      return 'End Year must be after Start Year';
    }
    return true;
  };

  return (
    <form>
      <Typography variant="h6" gutterBottom>
        Education
      </Typography>
      {fields.map((field, index) => (
        <Grid container spacing={2} key={field.id}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Education {index + 1}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Type"
              {...register(`educations.${index}.type`, { required: 'Type is required' })}
              fullWidth
              error={!!errors.educations?.[index]?.type}
              helperText={errors.educations?.[index]?.type?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="University"
              {...register(`educations.${index}.university`, { required: 'University is required' })}
              fullWidth
              error={!!errors.educations?.[index]?.university}
              helperText={errors.educations?.[index]?.university?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Degree"
              {...register(`educations.${index}.degree`, { required: 'Degree is required' })}
              fullWidth
              error={!!errors.educations?.[index]?.degree}
              helperText={errors.educations?.[index]?.degree?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Start Year"
              select
              {...register(`educations.${index}.startYear`, { required: 'Start Year is required' })}
              fullWidth
              SelectProps={{ native: true }}
              error={!!errors.educations?.[index]?.startYear}
              helperText={errors.educations?.[index]?.startYear?.message}
            >
              {getYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="End Year"
              select
              {...register(`educations.${index}.endYear`, {
                required: 'End Year is required',
                validate: (value) => validateEndYear(formData[index]?.startYear, value)
              })}
              fullWidth
              SelectProps={{ native: true }}
              error={!!errors.educations?.[index]?.endYear}
              helperText={errors.educations?.[index]?.endYear?.message}
            >
              {getYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleRemoveEducation(index)}
              disabled={fields.length === 1}
              fullWidth
            >
              Remove Education
            </Button>
          </Grid>
        </Grid>
      ))}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddEducation}
            fullWidth
          >
            Add Education
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EducationForm;
