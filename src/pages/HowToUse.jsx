import React from 'react';

const HowToUse = () => {
    return (
        <div>
             <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">How to Use</h1>
      <ol className="list-decimal space-y-4 pl-5">
        <li>Drag & drop a DOCX file or click "Browse Files".</li>
        <li>Click "Convert to PDF".</li>
        <li>Download your converted PDF.</li>
      </ol>
    </div>
        </div>
    );
};

export default HowToUse;