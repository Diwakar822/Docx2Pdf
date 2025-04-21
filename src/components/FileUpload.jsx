import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import mammoth from 'mammoth';
import React, { useRef, useState } from 'react';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [isConverting, setIsConverting] = useState(false);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);
  
    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile && selectedFile.name.endsWith('.docx')) {
        setFile(selectedFile);
        setError(null);
      } else {
        setFile(null);
        setError('Please select a .docx file');
      }
    };
  
    const handleDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
  
    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile && droppedFile.name.endsWith('.docx')) {
        setFile(droppedFile);
        setError(null);
      } else {
        setError('Please drop a .docx file');
      }
    };
  
    const handleConvert = async () => {
      if (!file) return;
      
      setIsConverting(true);
      setError(null);
  
      try {
        // 1. Read and convert DOCX to HTML with original styles
        const arrayBuffer = await file.arrayBuffer();
        const { value: html } = await mammoth.convertToHtml({ 
          arrayBuffer,
          styleMap: [
            "p[style-name='Heading 1'] => h1:fresh",
            "p[style-name='Heading 2'] => h2:fresh",
            "p[style-name='Heading 3'] => h3:fresh",
            "p[style-name='Normal'] => p:fresh",
            "r[style-name='Strong'] => strong",
            "r[style-name='Emphasis'] => em",
            "p[style-name='List Paragraph'] => li:fresh > p:fresh"
          ],
          includeEmbeddedStyleMap: true,
          includeDefaultStyleMap: true,
          preserveEmptyParagraphs: true
        });
  
        // 2. Create a hidden container with original formatting
        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.left = '-9999px';
        container.style.width = '210mm'; // A4 width
        container.style.padding = '0';
        container.style.margin = '0';
        container.style.fontFamily = 'Arial, sans-serif';
        container.style.padding = '25mm'; // Standard Word margins
        container.style.fontSize = '11pt'; // Standard Word size
        container.innerHTML = html;
        document.body.appendChild(container);

        // 3. Wait for fonts and images to load
        await new Promise(resolve => setTimeout(resolve, 500));
  
        // 4. Convert to canvas with precise dimensions
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
  
        const canvas = await html2canvas(container, {
          scale: 2, // Higher quality
          logging: false,
          useCORS: true,
          allowTaint: true,
          width: container.scrollWidth,
          height: container.scrollHeight,
          windowWidth: container.scrollWidth,
          windowHeight: container.scrollHeight,
          scrollX: 0,
          scrollY: 0
        });
  
        // 5. Calculate exact dimensions for single-page PDF
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
        // 6. Add to PDF with proper scaling
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
        
        // 7. Save the PDF
        pdf.save(`${file.name.replace('.docx', '')}.pdf`);
  
        // Clean up
        document.body.removeChild(container);
      } catch (err) {
        console.error('Conversion error:', err);
        setError('Conversion failed. Please try another file.');
      } finally {
        setIsConverting(false);
      }
    };
    
    
  
    return (
        <div>
             <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            DOCX to PDF Converter
          </h1>

          {/* File Drop Zone */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              file ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-blue-500'
            }`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              accept=".docx"
              onChange={handleFileChange}
              className="hidden"
            />
            {file ? (
              <div className="text-green-600 font-medium">
                <p>Selected file:</p>
                <p className="truncate">{file.name}</p>
              </div>
            ) : (
              <>
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="mt-2 text-sm text-gray-600">
                  <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">DOCX files only</p>
              </>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          {/* Convert Button */}
          <button
            onClick={handleConvert}
            disabled={!file || isConverting}
            className={`mt-6 w-full py-2 px-4 rounded-md font-medium transition-colors ${
              !file || isConverting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isConverting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Converting...
              </span>
            ) : (
              'Convert to PDF'
            )}
          </button>

          {/* Help Text */}
          <p className="mt-4 text-xs text-gray-500 text-center">
            Preserves original DOCX formatting in single-page PDF
          </p>
        </div>
      </div>
    </div>
        </div>
    );
};

export default FileUpload;