import { Button } from 'react-bootstrap';

export default function RedirectionVideo(props) {

  const { annotations, redirectTo, formatTime } = props;

  return (
    <div style={{maxWidth : '200px',maxHeight: '450px', overflow: 'auto', boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: '5px', padding: '10px', marginBottom: '10px' }}>
      <h4>Redirection vers l'annotation :</h4>
      {annotations.length === 0 ? (
        <p>Aucune redirection disponible.</p>
      ) : (
        annotations.map((annotation) => (
          <div key={annotation.id}>
            <Button onClick={() => redirectTo(annotation.debut)}>
              Annotation #{annotation.id} (Début : {formatTime(annotation.debut)} et fin : {formatTime(annotation.endTime)})
            </Button>
            <br />
            <br />
          </div>
        ))
      )}
    </div>
  );
}