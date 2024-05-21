import React, { useState } from 'react';

const ConfigUpload = ({ onClose }) => {
    const [files, setFiles] = useState([]);
    const [parameters, setParameters] = useState([]);
    const [deviceName, setDeviceName] = useState('');

    const handleDeviceNameChange = (event) => {
        setDeviceName(event.target.value);
    };

    const handleFileChange = (index) => (event) => {
        const newFiles = [...files];
        newFiles[index] = event.target.files[0];
        setFiles(newFiles);
    };

    const handleParameterChange = (index) => (event) => {
        const newParameters = [...parameters];
        newParameters[index] = event.target.value;
        setParameters(newParameters);
    };

    const addFileParameterPair = () => {
        setFiles([...files, null]); // Add new file slot
        setParameters([...parameters, '']); // Add new parameter slot
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('deviceName', deviceName);

        files.forEach((file, index) => {
            formData.append('files', file);
        });

        parameters.forEach((param, index) => {
            formData.append('configTypes', param);
        });

        try {
            const response = await fetch('https://localhost:7113/Config/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Files and parameters uploaded successfully!');
                onClose(); // Close the form upon successful upload
            } else {
                const error = await response.text();
                throw new Error(error);
            }
        } catch (error) {
            alert('Error uploading files: ' + error.message);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Upload Files and Parameters</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Device Name:</label>
                    <input
                        type="text"
                        value={deviceName}
                        onChange={handleDeviceNameChange}
                        style={styles.input}
                    />
                </div>
                {files.map((file, index) => (
                    <div key={index} style={styles.inputGroup}>
                        <input
                            type="file"
                            onChange={handleFileChange(index)}
                            style={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Type of file"
                            value={parameters[index]}
                            onChange={handleParameterChange(index)}
                            style={styles.input}
                        />
                    </div>
                ))}
                <div style={styles.buttonGroup}>
                    <button
                        type="button"
                        onClick={addFileParameterPair}
                        style={{ ...styles.button, marginRight: '10px' }}
                    >
                        Add File and Parameter
                    </button>
                    <button type="submit" style={styles.button}>
                        Upload
                    </button>
                    <button type="button" onClick={onClose} style={styles.button}>
                        Close
                    </button>
                </div>
            </form>
        </div>
    );
};

const styles = {
    container: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        backgroundColor: 'white',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        padding: '20px',
        boxSizing: 'border-box',
        overflowY: 'auto',
        borderRadius: '10px',  // Adjusted border-radius
        border: '1px solid #e0e0e0',
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
        fontFamily: 'Arial, sans-serif',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '15px',
    },
    label: {
        marginBottom: '5px',
        fontSize: '14px',
        color: '#555',
        fontFamily: 'Arial, sans-serif',
    },
    input: {
        padding: '8px',
        fontSize: '14px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontFamily: 'Arial, sans-serif',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
    },
    button: {
        padding: '10px 15px',
        fontSize: '14px',
        borderRadius: '20px',  // Adjusted border-radius to match the button in the image
        border: 'none',
        backgroundColor: '#0069b4',
        color: 'white',
        cursor: 'pointer',
        fontFamily: 'Arial, sans-serif',
    },
};

export default ConfigUpload;
