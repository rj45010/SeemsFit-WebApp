import React from 'react';
import html2pdf from 'html2pdf.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DownloadPDFButton = ({ targetId, fileName }) => {
  const downloadPDF = () => {
    const element = document.getElementById(targetId);
    if (!element) {
      console.error('Target element not found:', targetId);
      toast.error("The content to download as a PDF is not available.", {
        position: "top-center",
        autoClose: 2000, 
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      return;
    }

    const options = {
      margin: 10,
      filename: fileName || 'SeemsFitWorkoutPlan.pdf',
      html2canvas: {
        scale: 2, 
        useCORS: true,
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait', 
      },
    };

    console.log('Starting PDF download...');
    html2pdf()
      .set(options)
      .from(element)
      .save()
      .then(() => {
        console.log('PDF downloaded successfully!');
      })
      .catch((error) => {
        console.error('Error generating PDF:', error);
        toast.error('Failed to download PDF. Check the console for more details.', {
          position: "top", 
          autoClose: 3000, 
          hideProgressBar: true, 
          closeOnClick: true, 
          pauseOnHover: true, 
          draggable: true, 
        });        
      });
  };

  return (
    <button className="pdf-button btn-primary" onClick={downloadPDF}>
      Download Workout PDF
    </button>
  );
};

export default DownloadPDFButton;
