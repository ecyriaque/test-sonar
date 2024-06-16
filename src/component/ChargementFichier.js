import { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import FileViewer from 'react-file-viewer';
import AnnotationModal from './AnnotationModal';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

export default function ChargementFichier() {

    const [type,setType] = useState(null);
        
    const [content,setContent] = useState(null);

    const [selectedFile, setSelectedFile] = useState(null);

    const [showPdf, setShowPdf] = useState(false);

    const [showDoc, setShowDoc] = useState(false);

    const [showAlert, setShowAlert] = useState(false);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFileBrowse = () => {
        setShowPdf(false);
        setShowDoc(false);
        setShowAlert(false);
    };

    const handleMouseUp = (event) => {
        event.preventDefault();
        const selection = window.getSelection().toString();
        console.log("Mot séléctionner : " + selection);
        setContent(selection);
    };

    const handleSubmit = () => {
      
        if (selectedFile) {
            const extension = selectedFile.name.split('.').pop();
            setType(extension);
            switch (extension) {
                case "pdf":
                    setShowPdf(true);
                    setShowDoc(false);
                    setShowAlert(false);
                    break;
                case "docx":
                    setShowDoc(true);
                    setShowPdf(false);
                    setShowAlert(false);
                    break;
                default:
                    setShowDoc(false);
                    setShowPdf(false);
                    setShowAlert(true);
                }
        }
    };

    return (
        <>
        <Container className="text-center" style={{ padding: '100px' }}>
            <h3>Charger un fichier PDF/DOCX :</h3>
            <br />
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Control type="file" onChange={handleFileChange} onClick={handleFileBrowse} />
            </Form.Group>
            <Button variant="primary" onClick={handleSubmit} disabled={!selectedFile}>
                Charger
            </Button>
            <br/>

            {showAlert && (
            <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                <Alert.Heading>Erreur au niveau du format</Alert.Heading>
                <p>Le fichier à charger doit être en PDF ou DOCX.</p>
            </Alert>
            )}

            <br/>

            {showPdf &&(
                <div>
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                            <div onMouseUp={handleMouseUp}style={{border: '1px solid rgba(0, 0, 0, 0.3)',height: '750px',}}>
                                <Viewer fileUrl={URL.createObjectURL(selectedFile)} />
                            </div>
                    </Worker>;
                    < AnnotationModal cible={content} />
                </div>
            )}
            
            {showDoc && (
                <div style = {{backgroundColor : 'lightgray'}}>
                    <h3> Visualisation du document : </h3>
                    <div  onMouseUp={handleMouseUp} style={{border: '1px solid rgba(0, 0, 0, 0.3)',height: '750px'}}>
                        <FileViewer fileType={type} filePath={URL.createObjectURL(selectedFile)} />
                    </div>
                    < AnnotationModal cible={content} />
                </div>
            )}
  
        </Container>
        </>
    );
}
