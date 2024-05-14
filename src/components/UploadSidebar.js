import React, { useState } from 'react';

const UploadSidebar = ({ onClose }) => {
    const [files, setFiles] = useState([]);
    const [params, setParams] = useState({});

    const handleFilesChange = (event) => {
        setFiles([...event.target.files]);
    };

    const handleParamChange = (key) => (event) => {
        setParams(prevParams => ({
            ...prevParams,
            [key]: event.target.value
        }));
    };

    const addParamField = () => {
        const newKey = `param${Object.keys(params).length + 1}`;
        setParams(prevParams => ({
            ...prevParams,
            [newKey]: ''
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (files.length === 0) {
            alert('Please select at least one file!');
            return;
        }

        const formData = new FormData();
        files.forEach(file => {
            formData.append('files', file);
        });

        Object.keys(params).forEach(key => {
            formData.append(key, params[key]);
        });

        try {
            const response = await fetch('https://your-api-endpoint.com/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                alert('Files and parameters uploaded successfully!');
                onClose(); // Close the sidebar upon successful upload
            } else {
                const error = await response.text();
                throw new Error(error);
            }
        } catch (error) {
            alert('Error uploading files: ' + error.message);
        }
    };

    return (
        <div style={{
            width: '300px',
            position: 'absolute',
            top: 0,
            right: 0,
            height: '100%',
            backgroundColor: 'white',
            boxShadow: '-2px 0 5px rgba(0,0,0,0.1)',
            padding: '20px',
            boxSizing: 'border-box',
            overflowY: 'auto'
        }}>
            <h2>Upload Files and Parameters</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="file" multiple onChange={handleFilesChange} />
                </div>
                <h4>Parameters</h4>
                {Object.keys(params).map((key, index) => (
                    <div key={key}>
                        <label>{`Parameter ${index + 1}: `}</label>
                        <input type="text" value={params[key]} onChange={handleParamChange(key)} />
                    </div>
                ))}
                <button type="button" onClick={addParamField}>Add Parameter</button>
                <div>
                    <button type="submit">Upload</button>
                    <button type="button" onClick={onClose} style={{marginLeft: '10px'}}>Close</button>
                </div>
            </form>
        </div>
    );
};

export default UploadSidebar;
