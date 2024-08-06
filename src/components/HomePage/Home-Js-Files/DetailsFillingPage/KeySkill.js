import React, { useEffect } from 'react';
import { useFieldArray, useWatch, useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { setKeySkills } from '../../../../Redux/action';

const KeySkillsForm = () => {
  const dispatch = useDispatch();

  // Initialize form with useFormContext
  const methods = useFormContext();
  const { control, register, formState: { errors } } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'keySkills'
  });

  // Watch for changes in form data
  const formData = useWatch({ control, name: 'keySkills' });

  useEffect(() => {
    // Dispatch updated key skills to Redux store whenever formData changes
    dispatch(setKeySkills(formData));
  }, [formData, dispatch]);

  useEffect(() => {
    // Ensure at least 4 default skill entries are present
    if (fields.length === 0) {
      for (let i = 0; i < 2; i++) {
        append({ skill: '' });
      }
    }
  }, [fields, append]);

  const handleAddSkill = () => {
    if (fields.length < 10) { // Example limit
      append({ skill: '' });
    }
  };

  const handleRemoveSkill = (index) => {
    if (fields.length > 2) {
      remove(index);
    }
  };

  return (
    <form>
      <Typography variant="h6" gutterBottom>
        Key Skills
      </Typography>
      {fields.map((field, index) => (
        <Grid container spacing={2} key={field.id}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Skill {index + 1}</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Skill"
              {...register(`keySkills.${index}.skill`, { required: 'Skill is required' })}
              fullWidth
              size="small" // Reduce field size
              error={!!errors.keySkills?.[index]?.skill}
              helperText={errors.keySkills?.[index]?.skill?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleRemoveSkill(index)}
              disabled={fields.length <= 2} // Ensure at least 4 skills
              fullWidth
            >
              Remove Skill
            </Button>
          </Grid>
        </Grid>
      ))}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddSkill}
            disabled={fields.length >= 10} // Example limit
            fullWidth
          >
            Add Skill
          </Button>
        </Grid>
        {fields.length >= 10 && (
          <Grid item xs={12}>
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              Maximum of 10 skills allowed.
            </Typography>
          </Grid>
        )}
      </Grid>
    </form>
  );
};

export default KeySkillsForm;
