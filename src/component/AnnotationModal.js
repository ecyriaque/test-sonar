import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { format } from 'date-fns';
import $ from 'jquery'; 
import ip from './variable_globale/webservice_ip';

export default function AnnotationModal(props) {

    const [show, setShow] = useState(false);
    var [description, setDescription] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    var content = props.cible ?? "";
  
    var currentDate = format(new Date(), 'dd/MM/yyyy');

    /*
    const data = {
      "@context": "http://www.w3.org/ns/anno.jsonld",
      "type": "Annotation",
      "body":{
        "type" : "TextualBody",
        "value" : description,
        "creator" : "user",
        "createdBy" : "user",
        "created" : currentDate
      },
      "target": {
        "source" : "http://127.0.0.1:3000/article",
        "selector" : {
          "type": "FragmentSelector",
          "value" : content
        }
      }
    };
    */

    var rand =  Math.floor(Math.random()*10000);

    var annotationIntanceValue = "annotation"+rand;

    var userInstance = "user_"+annotationIntanceValue;

    const data =
    { 
      annotationIntance : annotationIntanceValue, 
      annotationContent: content,
      annotationDateCreation: currentDate,
      annotationDescription: description,
      annotationCreatedBy:userInstance
    };
    
    const handleSubmit = (event) => {
      event.preventDefault();
      
      var formValid = true;

      if (content.trim() === '' || description.trim() === '') {
        formValid = false;
      }

      if (!formValid) {
        alert("Des champs ne sont pas remplis.");
        return;
      }

      console.log(JSON.stringify(data));
      
      $.ajax({
        async: true,
        crossDomain: true,
        url: ip+"insertannotation",
        type: "POST",
        dataType: 'json', 
        data: data
      }).done(function (res) {
        alert("true");
      });
    
      handleClose();
    };

    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Créer Annotation
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Nouvelle Annotation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
            <Form.Group className="mb-3" controlId="form.ControlInput">
                <Form.Label>Content</Form.Label>
                <Form.Control type="text" placeholder="Sélectionnez une cible" value={content} readOnly/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="form.ControlInput">
                <Form.Label>Date</Form.Label>
                <Form.Control type="text" value={currentDate} readOnly/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} value={description} onChange={(event) => setDescription(event.target.value)} />
            </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleSubmit}>
              Ajouter
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}