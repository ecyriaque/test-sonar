import React, { useState } from "react";
import Annotation from 'react-image-annotator';
import $ from 'jquery'; 
import { format } from 'date-fns';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ip from './variable_globale/webservice_ip';

function renderEditor (props) {
  const { geometry } = props.annotation;
  if (!geometry) return null;

  const isFormEmpty = !props.annotation.data || !props.annotation.data.text;

  return (
    <div
      style={{
        background: 'white',
        borderRadius: 3,
        position: 'absolute',
        left: `${geometry.x}%`,
        top: `${geometry.y + geometry.height}%`,
      }}
    >
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Nouvelle annotation</Card.Title>

          <InputGroup 
            className="mb-3"
            hasValidation 
            onChange={e => props.onChange({
              ...props.annotation,
              data: {
                ...props.annotation.data,
                text: e.target.value,
                validated: false
              }
            })}
          >
            <InputGroup.Text id="inputGroup-sizing-default">
              Contenu 
            </InputGroup.Text>
            <Form.Control
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>
          
          <Button variant="primary" onClick={props.onSubmit} disabled={isFormEmpty}>
            Créer
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default function ImageAnnotation(props) {

    var url = props.url;

    const [type, setType] = useState('');
    const [annotations, setAnnotations] = useState([]);
    const [annotation, setAnnotation] = useState({});
    const [afficheBarreAnnotation, setAfficheBarreAnnotation] = useState(false);

    var currentDate = format(new Date(), 'dd/MM/yyyy');

    const onChange = (newAnnotation) => {
      setAnnotation(newAnnotation);
    }

    const changeForm = (name) => {
      setType(name);
    };
  
    const onSubmit = (newAnnotation) => {
      const { geometry, data } = newAnnotation;

      var rand =  Math.floor(Math.random()*10000);
      var annotationInstance = "annotation"+rand;
      var imgInstanceAnnotation = "image"+rand;
      var width = Math.floor(geometry.width);
      var height = Math.floor(geometry.height);
      var x = Math.floor(geometry.x);
      var y = Math.floor(geometry.y);

      const img = new Image();
      img.src = url;
      var bytes = (img.height*img.width)/8;

      const dataImage = {
        annotationIntance : annotationInstance, 
        annotationContent: data.text,
        annotationDateCreation: currentDate,
        UserInstance: "JhonDoe", 
        imageIntance: imgInstanceAnnotation, 
        imageUrl: url, 
        annotationCreatedBy: "JhonDoe", 
        multimediaRessourceSize: bytes, 
        ZoneAnnotationHeight: height, 
        ZoneAnnotationWidth: width, 
        ZoneAnnotationTopMargin: x, 
        ZoneAnnotationLeftMargin: y 
      };

      $.ajax({
        async: true,
        crossDomain: true,
        url: ip+"insertannotationforimage",
        type: "POST",
        dataType: 'json', 
        data: dataImage
      }).done(function (res) {
        alert("true");
      });
    
      const newAnnotations = annotations.concat({
        geometry,
        data: {
          ...data,
          id: Math.random()
        }
      });
  
      setAnnotation({});
      setAnnotations(newAnnotations);
    }

    return (
        <div>   
            <Button
              variant="primary"
              onClick={() => setAfficheBarreAnnotation(!afficheBarreAnnotation)}
              style={{ position: 'absolute', top: '100px', right: '0px' }}
            >
              {afficheBarreAnnotation ? 'Fermer' : 'Barre d\'annotation '}
            </Button>

            {afficheBarreAnnotation && (
              <div
                style={{
                  position: 'absolute',
                  right: '0px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  border: '3px solid black',
                  backgroundColor: 'black',
                  padding: '15px',
                }}
              >
                <Button
                  variant="light"
                  style={{ marginBottom: '10px' }}
                  onClick={() => changeForm('RECTANGLE')}
                >
                  <img src="/assets/square.svg" alt="rectangle"/>
                </Button>

                <Button
                  variant="light"
                  style={{ marginBottom: '10px' }}
                  onClick={() => changeForm('OVAL')}
                >
                  <img src="/assets/circle.svg" alt="circle"/>
                </Button>

                <Button 
                  variant="light" 
                  onClick={() => changeForm('POINT')}
                >
                  <img src="/assets/dot.svg" alt="dot"/>
                </Button>

                </div>
              )}

           <br/>

           <div style={{width : '1000px',marginRight : 'auto', marginLeft : 'auto'}}>
            <Annotation
                src={url}
                alt='img'
                annotations={annotations}
                type={type}
                renderEditor={renderEditor}
                value={annotation}
                onChange={onChange}
                onSubmit={onSubmit}
             /> 
            </div>
        </div>
    );
}