import { Container } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import $ from 'jquery';
import Commentaire from './Commentaire';
import ip from './variable_globale/webservice_ip';
//import { useState } from 'react';
  
  export default function ListeAnnotations() {

    // Donnée temporaire quand y'a pas le web-service
    const listeAnnotations = 
    [
      { 
        "annonation" : "http://linc.iut.univ-paris8.fr/learningCafe/MMRO.owl#annotation6801" ,
        "multimediaRessourceInstance" : 'img6801',
        "multimediaResourceURL" : "https://www.referenseo.com/wp-content/uploads/2019/03/image-attractive-960x540.jpg" ,
        "autoUploadedBy" : "http://linc.iut.univ-paris8.fr/learningCafe/MMRO.owl#JhonDoe" ,
        "ZoneAnnotationHeight" : "10" ,
        "multimedia" : "http://linc.iut.univ-paris8.fr/learningCafe/MMRO.owl#annotation6801" ,
        "annotationContent" : "arbre" ,
        "annotationDateCreation" : "26/05/2023" ,
        "ZoneAnnotationWidth" : "8"
      }
    ];

    //const [listeAnnotations, setListeAnnotation] = useState(null);
    
    const userData = {
      UserInstance: "JhonDoe"
    };
      
    $.ajax({
      async: true,
      crossDomain: true,
      url: ip+"getlistannotation",
      type: "GET",
      data: userData
    }).done(function (res) {
        console.log(res);
        //setListeAnnotations(res);
    });
  
    return (
      <div style={{ padding: '100px' }}>
        <Container
          className="text-center"
          style={{
            backgroundColor: 'grey',
            height: '500px',
            width: '1000px',
            padding: '10px',
            border: '4mm ridge rgba(53, 77, 84, .6)',
            overflowY: 'auto',
          }}
        >
          <h1 style={{ backgroundColor: '#444b4d', color: 'white' }}>Liste des annotations :</h1>
          {listeAnnotations !== null &&(
            listeAnnotations.map((item, index) => (
              <div key={index}>
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey={index}>
                    <Accordion.Header> { item.annonation.split("#")[1] } </Accordion.Header>
                    <Accordion.Body>
                      <p> Auto upload par : {item.autoUploadedBy.split("#")[1]} </p>
                      <p> Date de création : {item.annotationDateCreation} </p>
                      <p> Contenu de l'annotation : {item.annotationContent} </p>
                      <p> Multimedia : {item.multimedia.split("#")[1]} </p>
                      <p> Hauteur de la zone d'annotation : {item.ZoneAnnotationHeight} </p>
                      <p> Largeur de la zone d'annotation : {item.ZoneAnnotationWidth} </p>
                      <p> Lien de l'image : <a href={item.multimediaResourceURL}> {item.multimediaResourceURL} </a> </p>
                      <br/>
                      < Commentaire annotation={item.annonation.split("#")[1]} />
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <br/>
              </div>
              ))       
            )}
        </Container>
      </div>
    );
  }