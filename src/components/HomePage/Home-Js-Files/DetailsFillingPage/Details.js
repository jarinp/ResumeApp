import React, {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { Tabs, Tab, Box, Button, Grid } from '@mui/material';
import PersonalInfo from './PersonalInfo';
import WorkExperienceForm from './WorkExperience';
import Education from './Education';
import KeySkills from './KeySkill';
import Navbar from '../../../Navbar/Navbar';
import '../../Home-Css-Files/Details.css';

const tabLabels = ['Personal Information', 'Work Experience', 'Education', 'Key Skills'];

const Details = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const methods = useForm();




  const handleTabChange = async (event, newValue) => {
    const isValid = await methods.trigger();
    if (isValid) {
      setActiveTab(newValue);
    } else {
      console.log('Validation failed, tab change prevented');
    }
  };

  const handleNext = async () => {
    const isValid = await methods.trigger();
    if (isValid) {
      if (activeTab < tabLabels.length - 1) {
        setActiveTab((prev) => prev + 1);
      } else {
        handlePreview();
      }
    } else {
      console.log('Form validation failed');
    }
  };

  const handleBack = () => {
    if (activeTab === 0) {
      navigate('/');
    } else {
      setActiveTab((prev) => Math.max(prev - 1, 0));
    }
  };

  const handlePreview = async () => {
    const isValid = await methods.trigger();
    if (isValid) {
      console.log('Form Data:', methods.getValues());
      navigate('/preview');
    } else {
      console.log('Form validation failed');
    }
  };

  return (
    <Box>
      <Navbar />
      <Box marginTop={20} marginX={10}>
        <Grid container spacing={10}>
          <Grid item xs={12} sm={4} md={3}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              orientation="vertical"
              className="details-tabs"
            >
              {tabLabels.map((label, index) => (
                <Tab
                  key={label}
                  label={label}
                  sx={{
                    border: '1px solid #ddd',
                    justifyContent: 'center',
                    textTransform: 'none',
                    color: 'black',
                    textAlign: 'left',
                    padding: '16px',
                    margin: '0 auto',
                    alignItems: 'flex-start',
                    width: '100%',
                    boxSizing: 'border-box',
                    backgroundColor: activeTab === index ? '#f0f0f0' : 'white',
                  }}
                />
              ))}
            </Tabs>
          </Grid>
          <Grid item xs={12} sm={8} md={9} container direction="column">
            <FormProvider {...methods}>
              <Box
                component="form"
                onSubmit={methods.handleSubmit(handlePreview)}
                className="details-form"
              >
                <Box className="form-content" sx={{ flexGrow: 1 }}>
                  {activeTab === 0 && <PersonalInfo />}
                  {activeTab === 1 && <WorkExperienceForm />}
                  {activeTab === 2 && <Education />}
                  {activeTab === 3 && <KeySkills />}
                </Box>
                <Box className="form-buttons" sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Button variant="contained" onClick={handleBack} sx={{ mr: 2 }}>
                    {activeTab === 0 ? 'Home' : 'Back'}
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    {activeTab === tabLabels.length - 1 ? 'Preview' : 'Next'}
                  </Button>
                </Box>
              </Box>
            </FormProvider>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Details;

