import React from 'react';
import { Box, Typography, Grid, Paper, Divider } from '@mui/material';

const Template3 = ({ userDetails }) => {
  const { personalInfo, workExperience, education, keySkills } = userDetails || {};

  return (
    <Paper
      elevation={4}
      sx={{
        maxWidth: 800,
        mx: 'auto',
        p: 4,
        backgroundColor: '#f5f5f5',
        borderRadius: 4,
        boxShadow: '0px 8px 16px rgba(0,0,0,0.2)',
      }}
    >
      <Box mb={4}>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            {personalInfo?.image && (
              <Box
                component="img"
                src={personalInfo.image}
                alt="Profile"
                sx={{
                  width: 140,
                  height: 140,
                  borderRadius: '50%',
                  boxShadow: 3,
                }}
              />
            )}
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h3" fontWeight="bold" color="#303f9f">
              {personalInfo?.firstName} {personalInfo?.lastName}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {personalInfo?.email} | {personalInfo?.mobileNumber}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {personalInfo?.address}, {personalInfo?.city}, {personalInfo?.state}, {personalInfo?.postalCode}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ mb: 4, borderColor: '#303f9f' }} />

      <Box mb={4}>
        <Typography variant="h5" color="#303f9f" gutterBottom>
          Objective
        </Typography>
        <Typography>{personalInfo?.objective || 'Not Provided'}</Typography>
      </Box>

      <Divider sx={{ mb: 4, borderColor: '#303f9f' }} />

      <Box mb={4}>
        <Typography variant="h5" color="#303f9f" gutterBottom>
          Work Experience
        </Typography>
        {workExperience?.length ? (
          workExperience.map((experience, index) => (
            <Box
              key={index}
              mb={2}
              p={2}
              sx={{
                backgroundColor: '#ffffff',
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                {experience.jobTitle}
              </Typography>
              <Typography>{experience.organizationName}</Typography>
              <Typography color="textSecondary">
                {experience.startYear} - {experience.endYear}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography>No Work Experience Added</Typography>
        )}
      </Box>

      <Divider sx={{ mb: 4, borderColor: '#303f9f' }} />

      <Box mb={4}>
        <Typography variant="h5" color="#303f9f" gutterBottom>
          Education
        </Typography>
        {education?.length ? (
          education.map((edu, index) => (
            <Box
              key={index}
              mb={2}
              p={2}
              sx={{
                backgroundColor: '#ffffff',
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                {edu.degree}
              </Typography>
              <Typography>{edu.university}</Typography>
              <Typography color="textSecondary">
                {edu.type} | {edu.startYear} - {edu.endYear}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography>No Education Added</Typography>
        )}
      </Box>

      <Divider sx={{ mb: 4, borderColor: '#303f9f' }} />

      <Box>
        <Typography variant="h5" color="#303f9f" gutterBottom>
          Key Skills
        </Typography>
        {keySkills?.length ? (
          keySkills.map((skill, index) => (
            <Typography
              key={index}
              sx={{
                mb: 1,
                p: 1,
                backgroundColor: '#ffffff',
                borderRadius: 2,
                boxShadow: 2,
                color: '#303f9f',
              }}
            >
              {index + 1}. {skill.skill}
            </Typography>
          ))
        ) : (
          <Typography>No Key Skills Added</Typography>
        )}
      </Box>
    </Paper>
  );
};

export default Template3;
