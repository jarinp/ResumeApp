import React from 'react';
import { Box, Typography, Grid, Paper, Divider } from '@mui/material';

const Template1 = ({ userDetails }) => {
  const { personalInfo, workExperience, education, keySkills } = userDetails || {};

  return (
    <Paper
      elevation={4}
      sx={{
        maxWidth: 800,
        mx: 'auto',
        p: 4,
        backgroundColor: '#f5f5f5',
        borderRadius: 2,
      }}
    >
      <Box mb={4}>
        <Grid container spacing={2} alignItems="center">
          {personalInfo?.image && (
            <Grid item>
              <Box
                component="img"
                src={personalInfo.image}
                alt="Profile"
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  boxShadow: 3,
                }}
              />
            </Grid>
          )}
          <Grid item>
            <Typography variant="h4" fontWeight="bold">
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

      <Divider sx={{ mb: 4 }} />

      <Box mb={4}>
        <Typography variant="h5" color="primary" gutterBottom>
          Objective
        </Typography>
        <Typography>{personalInfo?.objective || 'Not Provided'}</Typography>
      </Box>

      <Divider sx={{ mb: 4 }} />

      <Box mb={4}>
        <Typography variant="h5" color="primary" gutterBottom>
          Work Experience
        </Typography>
        {workExperience?.length ? (
          workExperience.map((experience, index) => (
            <Box key={index} mb={2} p={2} sx={{ backgroundColor: '#fff', borderRadius: 1, boxShadow: 2 }}>
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

      <Divider sx={{ mb: 4 }} />

      <Box mb={4}>
        <Typography variant="h5" color="primary" gutterBottom>
          Education
        </Typography>
        {education?.length ? (
          education.map((edu, index) => (
            <Box key={index} mb={2} p={2} sx={{ backgroundColor: '#fff', borderRadius: 1, boxShadow: 2 }}>
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

      <Divider sx={{ mb: 4 }} />

      <Box>
        <Typography variant="h5" color="primary" gutterBottom>
          Key Skills
        </Typography>
        {keySkills?.length ? (
          keySkills.map((skill, index) => (
            <Typography key={index} sx={{ mb: 1, p: 1, backgroundColor: '#fff', borderRadius: 1, boxShadow: 1 }}>
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

export default Template1;
