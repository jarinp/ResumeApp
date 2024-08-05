import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../../Navbar/Navbar';
import { TemplateSelection } from '../../../Redux/action';
import { useNavigate } from 'react-router-dom';
import '../Home-Css-Files/Home.css';

const Home = () => {
  const templates = useSelector((state) => state.template.templates);
  const selectedTemplateId = useSelector((state) => state.template.selectedTemplate);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelect = (Id) => {
    console.log('Dispatching TemplateSelection with ID:', Id);
    dispatch(TemplateSelection(Id));
    console.log('Navigating to /details');
    localStorage.setItem('isStartingNewResume', true);
    navigate('/details');
  };
  
  const selectedTemplate = templates.find(template => template.Id === selectedTemplateId);

  return (
    <div>
      <Navbar />
      <div className="home-container">
        <h1 className="home-heading">Templates</h1>
        <p className="home-info">Select a Template to get started</p>
        <div className="templates">
          {templates.map((template) => (
            <div
              key={template.Id}
              className={`template ${selectedTemplateId === template.Id ? 'selected' : ''}`}
              aria-selected={selectedTemplateId === template.Id}
              onClick={() => handleSelect(template.Id)}
            >
              <img
                src={template.image}
                alt={`Template ${template.name}`}
                className="template-image"
                width= '100%'
                maxWidth= '150px' // Adjust the max-width as needed
                height= 'auto'
                objectFit='cover'
              />
              <button
                className="use-template-button"
                aria-label={`Use ${template.name}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(template.Id);
                }}
              >
                Use Template
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
