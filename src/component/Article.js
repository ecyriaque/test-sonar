import React, { useState, useEffect } from "react";
import { Card, Container, Button } from 'react-bootstrap';
import AnnotationModal from "./AnnotationModal";

export default function Article(props) {

  const [mot, setMot] = useState({ mot: null, paragraphIndex: null, tag: null });
  const [paragraphs, setParagraphs] = useState([]);

  useEffect(() => {
    const creerTag = () => {
      if (props.article) {
        const paragraphes = props.article.split('\n');
        let index = 1;
        const paragraphs = paragraphes.map((line, lineIndex) => {
          const mots = line.split(' ');
          const listeMotTag = [];
          mots.forEach((mot) => {
            const tagId = `tag${lineIndex + 1}.${index}`;
            index++;
            listeMotTag.push({ mot, tagId });
          });
          return { listeMotTag };
        });
        setParagraphs(paragraphs);
      } else {
        setParagraphs([]);
      }
    };

    creerTag();
  }, [props.article]);

  const handleMouseUp = (selectionString, lineIndex, wordIndex) => {
    const tag = `tag${lineIndex + 1}.${wordIndex}`;
    console.log(tag);
    setMot({ mot: selectionString, paragraphIndex: lineIndex + 1, tag: tag });
  };

  return (
    <div>
      <Container>  
        <br />
        <h3 className="fw-bold text-center">{props.title.toUpperCase()}</h3>
        <blockquote className="blockquote mb-0">
        <Card style={{ width: '100%', minHeight: "400px", backgroundColor: "#FFF1CC" }}>
          <Card.Body>
            {paragraphs.map((paragraph, indexParagraphe) => (
              <p key={indexParagraphe + 1}>
                {' '}
                {paragraph.listeMotTag.map((motTag, indexMot) => (
                  <span key={indexMot + 1} onMouseUp={() =>handleMouseUp(motTag.mot, indexParagraphe, indexMot)}>
                    {motTag.mot + " "}
                  </span>
                ))}
                {' '}
              </p>
            ))}
          </Card.Body>
        </Card>
        </blockquote>

        <div className="text-center">
          <h5>Mot(s) sélectionné(s):</h5>
          {mot.mot && (
            <p>
              Mot : <span className="fw-bold">{mot.mot}</span> (Paragraphe : {mot.paragraphIndex} et Tag : {mot.tag})
            </p>
          )}
          <Button variant="secondary" onClick={() => setMot({ mot: null, paragraphIndex: null, tag: null })}>Reset</Button>
            
          <br />
          <br />
        
          <AnnotationModal cible={mot.mot} tag={mot.tag}/>
        </div>
      </Container>
    </div>
  );
}
