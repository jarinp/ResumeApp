import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText, Modal, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const fetchFromIndexedDB = (callback) => {
  const request = window.indexedDB.open("ResumeDB", 1);

  request.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction("resumes", "readonly");
    const store = transaction.objectStore("resumes");
    const request = store.getAll();

    request.onsuccess = () => {
      callback(request.result);
    };
    
    request.onerror = (event) => {
      console.error("Error fetching from IndexedDB:", event.target.errorCode);
    };
  };

  request.onerror = (event) => {
    console.error("IndexedDB error:", event.target.errorCode);
  };
};

const deleteFromIndexedDB = (resumeName, callback) => {
  const request = window.indexedDB.open("ResumeDB", 1);

  request.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction("resumes", "readwrite");
    const store = transaction.objectStore("resumes");
    const deleteRequest = store.delete(resumeName);

    deleteRequest.onsuccess = () => {
      callback();
    };

    deleteRequest.onerror = (event) => {
      console.error("Error deleting from IndexedDB:", event.target.errorCode);
    };
  };

  request.onerror = (event) => {
    console.error("IndexedDB error:", event.target.errorCode);
  };
};

const MyResumesPage = () => {
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [openDeleteConfirmModal, setOpenDeleteConfirmModal] = useState(false);
  const [resumeToDelete, setResumeToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFromIndexedDB((data) => setResumes(data));
  }, []);

  const handleViewResume = (resume) => {
    setSelectedResume(resume);
    setOpenPreviewModal(true);
  };

  const handleClosePreviewModal = () => {
    setOpenPreviewModal(false);
    setSelectedResume(null);
  };

  const handleDownload = (resume) => {
    const blobURL = URL.createObjectURL(new Blob([resume.data], { type: 'application/pdf' }));
    const link = document.createElement('a');
    link.href = blobURL;
    link.download = `${resume.name}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobURL);
  };

  const handleDelete = (resume) => {
    setResumeToDelete(resume);
    setOpenDeleteConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    if (resumeToDelete) {
      deleteFromIndexedDB(resumeToDelete.name, () => {
        setResumes((prevResumes) => prevResumes.filter((resume) => resume.name !== resumeToDelete.name));
        setOpenDeleteConfirmModal(false);
        setResumeToDelete(null);
      });
    }
  };

  const handleCloseDeleteConfirmModal = () => {
    setOpenDeleteConfirmModal(false);
    setResumeToDelete(null);
  };

  return (
    <Box>
      <Navbar />
      <Box display="flex" flexDirection="column" padding={{ xs: 2, sm: 3, md: 4, lg: 5 }} marginTop={8}>
        <Typography variant="h4" gutterBottom fontWeight={700}>
          My Resumes
        </Typography>
        <Box mt={2}>
          <List>
            {resumes.map((resume) => (
              <ListItem key={resume.name} sx={{ mb: 1, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
                <ListItemText primary={resume.name} />
                <Box ml={2} display="flex" alignItems="center">
                  <Button variant="outlined" onClick={() => handleViewResume(resume)} sx={{ mr: 1 }}>
                    View
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleDownload(resume)} sx={{ mr: 1 }}>
                    Download
                  </Button>
                  <IconButton color="error" onClick={() => handleDelete(resume)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Resume Preview Modal */}
        <Modal
          open={openPreviewModal}
          onClose={handleClosePreviewModal}
          aria-labelledby="resume-preview-modal-title"
          aria-describedby="resume-preview-modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: '90%', sm: '80%', md: '70%', lg: '60%' },
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="resume-preview-modal-title" variant="h6" component="h2">
              Resume Preview
            </Typography>
            <Box mt={2}>
              {selectedResume ? (
                <object
                  data={URL.createObjectURL(new Blob([selectedResume.data], { type: 'application/pdf' }))}
                  width="100%"
                  height="600px"
                  type="application/pdf"
                >
                  <p>It appears you don't have a PDF plugin for this browser. No worries, you can <a href={URL.createObjectURL(new Blob([selectedResume.data], { type: 'application/pdf' }))}>click here to download the PDF file.</a></p>
                </object>
              ) : (
                <Typography>No resume selected</Typography>
              )}
            </Box>
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button onClick={handleClosePreviewModal} variant="contained" color="primary">
                Close
              </Button>
            </Box>
          </Box>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          open={openDeleteConfirmModal}
          onClose={handleCloseDeleteConfirmModal}
          aria-labelledby="delete-confirmation-modal-title"
          aria-describedby="delete-confirmation-modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: '90%', sm: '80%', md: '60%', lg: '40%' },
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="delete-confirmation-modal-title" variant="h6" component="h2">
              Confirm Deletion
            </Typography>
            <Typography id="delete-confirmation-modal-description" sx={{ mt: 2 }}>
              Are you sure you want to delete this resume?
            </Typography>
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button onClick={handleCloseDeleteConfirmModal} variant="outlined" color="primary" sx={{ mr: 1 }}>
                Cancel
              </Button>
              <Button onClick={handleConfirmDelete} variant="contained" color="error">
                Delete
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default MyResumesPage;


