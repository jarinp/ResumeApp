import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useSelector } from 'react-redux';
import { Box, Typography, TextField, Button, Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../Navbar/Navbar';

// Import your template components
import Template1 from '../../../Templates/Template1';
import Template2 from '../../../Templates/Template2';
import Template3 from '../../../Templates/Template3';
import Template4 from '../../../Templates/Template4';

const saveToIndexedDB = (pdfData, resumeName) => {
  const request = window.indexedDB.open("ResumeDB", 1);

  request.onupgradeneeded = (event) => {
    const db = event.target.result;
    db.createObjectStore("resumes", { keyPath: "name" });
  };

  request.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction("resumes", "readwrite");
    const store = transaction.objectStore("resumes");
    store.put({ name: resumeName, data: pdfData });
  };

  request.onerror = (event) => {
    console.error("IndexedDB error:", event.target.errorCode);
  };
};

const PreviewPage = () => {
  const userDetails = useSelector((state) => state.userInfo.userDetails || {});
  const { selectedTemplate } = useSelector((state) => state.template);
  const [resumeName, setResumeName] = useState('');
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const navigate = useNavigate();

  const templateComponents = {
    '1': Template1,
    '2': Template2,
    '3': Template3,
    '4': Template4,
  };

  const SelectedTemplateComponent = templateComponents[selectedTemplate];

  const handleSave = () => {
    if (!SelectedTemplateComponent) {
      alert('No template selected.');
      return;
    }

    if (!resumeName.trim()) {
      alert('Please enter a name for your resume.');
      return;
    }

    const templateContainer = document.querySelector('#template-container');
    if (!templateContainer) {
      alert('Template container not found.');
      return;
    }

    html2canvas(templateContainer, { scale: 2, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      const doc = new jsPDF('p', 'mm', 'a4');
      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const pdfData = doc.output('arraybuffer');
      saveToIndexedDB(pdfData, resumeName);

      const blobURL = URL.createObjectURL(new Blob([pdfData], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = blobURL;
      link.download = `${resumeName}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobURL);

      setOpenSuccessModal(true);
    }).catch((error) => {
      console.error("Error generating PDF", error);
    });
  };

  const handleBack = () => {
    navigate('/details');
  };

  const handleCloseSuccessModal = () => {
    setOpenSuccessModal(false);
    navigate('/myresumes');
  };

  return (
    <Box>
      <Navbar />
      <Box display="flex" padding={2} marginTop={8}>
        {/* Main Content */}
        <Box flex={1} paddingRight={2}>
          <Typography variant="h4">Preview</Typography>
          <Box mt={2}>
            <Typography variant="h6">Selected Template:</Typography>
            <Box mt={1}>
              {SelectedTemplateComponent ? (
                <div id="template-container">
                  {/* Render template */}
                  <SelectedTemplateComponent userDetails={userDetails} />
                </div>
              ) : (
                <Typography>No Template Selected</Typography>
              )}
            </Box>
          </Box>
        </Box>

        {/* Side Content for Input */}
        <Box flex={1} paddingLeft={2}>
          <Typography variant="h6">Resume Name</Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={resumeName}
            onChange={(e) => setResumeName(e.target.value)}
            helperText="Enter a name for your resume."
          />
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="contained" color="primary" onClick={handleBack}>
              Back
            </Button>
            <Button variant="contained" color="secondary" onClick={handleSave}>
              Save as PDF
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Success Modal */}
      <Modal
        open={openSuccessModal}
        onClose={handleCloseSuccessModal}
        aria-labelledby="success-modal-title"
        aria-describedby="success-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="success-modal-title" variant="h6" component="h2">
            Success
          </Typography>
          <Typography id="success-modal-description" sx={{ mt: 2 }}>
            Your resume has been successfully downloaded as a PDF.
          </Typography>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={handleCloseSuccessModal} variant="contained" color="primary">
              OK
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default PreviewPage;

