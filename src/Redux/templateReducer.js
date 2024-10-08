// templateReducer.js
import { SELECT_TEMPLATE } from './actionType';
import templateone from '../Images/template1.png';
import templatetwo from '../Images/template2.png'; 
import templatethree from '../Images/template3.png';
import templatefour from '../Images/template4.png';
import Template1 from '../components/Templates/Template1';
import Template2 from '../components/Templates/Template2';
import Template3 from '../components/Templates/Template3';
import Template4 from '../components/Templates/Template4';

const initialState = {
  selectedTemplate: null,
  templates: [
    { Id: 1, name: 'Template-1', image: templateone, template: Template1 },
    { Id: 2, name: 'Template-2', image: templatetwo, template: Template2 },
    { Id: 3, name: 'Template-3', image: templatethree, template: Template3 },
    { Id: 4, name: 'Template-4', image: templatefour, template: Template4 },
  ],
};

const templateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_TEMPLATE:
      console.log('Selected Template ID:', action.payload);
      return { ...state, selectedTemplate: action.payload };
    default:
      return state;
  }
};

export default templateReducer;

