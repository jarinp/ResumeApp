import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, IconButton, Modal } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import Navbar from '../Navbar/Navbar';

const ViewResumePage = () => {
  const { resumeName } = useParams();
  const navigate = useNavigate();

  // Construct the URL to the resume PDF
  const resumeUrl = localStorage.getItem(resumeName);

  const handleClose = () => {
    navigate('/myresumes'); // Navigate back to the MyResumesPage
  };

  return (
    <Box>
      <Navbar />
      <Box padding={2} marginTop={8}>
        <Typography variant="h4" gutterBottom>
          View Resume
        </Typography>
        <Box position="relative" display="flex" flexDirection="column" alignItems="center">
          <IconButton
            onClick={handleClose}
            color="primary"
            sx={{ position: 'absolute', top: 16, right: 16 }}
          >
            <CloseIcon />
          </IconButton>
          {resumeUrl ? (
            <iframe
              src={`data:application/pdf;base64,${resumeUrl}`}
              width="100%"
              height="800px"
              style={{ border: 'none' }}
              title="Resume"
            ></iframe>
          ) : (
            <Typography>No resume found</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ViewResumePage;
