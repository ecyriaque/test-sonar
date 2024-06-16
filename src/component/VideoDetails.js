import { useParams } from 'react-router-dom';
import { Container, Button, ProgressBar } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import { useState, useRef } from 'react';
import RedirectionVideo from './RedirectionVideo';
import ListeAnnotationVideo from './ListeAnnotationVideo';
import FormulaireAnnotationVideo from './FormulaireAnnotationVideo';

export default function VideoDetails({ videos }) {

  const [tempsCourrant, setTempsCourrant] = useState({ minutes: 0, secondes: 0 });
  const [tempsTotal, setTempsTotal] = useState({ minutes: 0, secondes: 0 });
  const [annotations, setAnnotations] = useState([]);
  const [tempsInitial, setTempsInitial] = useState({ minutes: 0, secondes: 0 });
  const [tempsFinal, setTempsFinal] = useState({ minutes: 0, secondes: 0 });
  const [annulationActive, setAnnulationActive] = useState(false);

  const { id } = useParams();
  const playerRef = useRef(null);

  const video = videos.find((video) => video.id === parseInt(id));

  if (!video) {
    return (
      <div>
        <h1>La vidéo n'existe pas.</h1>
      </div>
    );
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleProgress = (progress) => {
    const minutes = Math.floor(progress.playedSeconds / 60);
    const seconds = Math.floor(progress.playedSeconds % 60);
    setTempsCourrant({ minutes, secondes: seconds });
  };

  const handleDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    setTempsTotal({ minutes, secondes: seconds });
  };

  const handleBarClick = (event) => {
    if (tempsInitial.minutes === 0 && tempsInitial.secondes === 0) {
      const largeurBar = event.currentTarget.clientWidth;
      const posX = event.nativeEvent.offsetX;
      const nouveauTempsCourrant = (posX / largeurBar) * tempsTotalEnSecondes;
      playerRef.current.seekTo(nouveauTempsCourrant);
      setTempsInitial({ minutes: Math.floor(nouveauTempsCourrant / 60), secondes: Math.floor(nouveauTempsCourrant % 60) });
      setAnnulationActive(true);
    } else {
      const largeurBar = event.currentTarget.clientWidth;
      const posX = event.nativeEvent.offsetX;
      const nouveauTempsFinal = (posX / largeurBar) * tempsTotalEnSecondes;
      if (nouveauTempsFinal >= tempsInitialEnSecondes) {
        setTempsFinal({ minutes: Math.floor(nouveauTempsFinal / 60), secondes: Math.floor(nouveauTempsFinal % 60) });
      }
    }
  };

  const annulerTempsInitial = () => {
    setTempsInitial({ minutes: 0, secondes: 0 });
    setTempsFinal({minutes : 0, secondes : 0})
    setAnnulationActive(false);
  };

  const ajouterAnnotation = (event) => {
    event.preventDefault();
    const form = event.target;
    const videoInstance = parseInt(id);
    const content = form.content.value;

    const nouvelleAnnotation = {
      id: annotations.length + 1,
      videoInstance: videoInstance,
      debut: parseInt(tempsInitialEnSecondes),
      endTime: parseInt(tempsFinalEnSecondes),
      content: content,
    };

    setAnnotations([...annotations, nouvelleAnnotation]);
    form.reset();
  };

  const redirectTo = (debut) => {
    playerRef.current.seekTo(debut);
  };

  const tempsCourrantEnSecondes = tempsCourrant.minutes * 60 + tempsCourrant.secondes;
  const tempsTotalEnSecondes = tempsTotal.minutes * 60 + tempsTotal.secondes;
  const tempsInitialEnSecondes = tempsInitial.minutes * 60 + tempsInitial.secondes;
  const tempsFinalEnSecondes = tempsFinal.minutes * 60 + tempsFinal.secondes;

  return (
    <div>    
    <Container className="d-flex flex-column align-items-center justify-content-center" style={{ marginTop: '30px' }}>
      <h1>Titre : {video.title}</h1>

      <div style={{ width: '900px', height: '450px' }}>
     
            <ReactPlayer
              url={video.url}
              width="100%"
              height="100%"
              controls
              onProgress={handleProgress}
              onDuration={handleDuration}
              ref={playerRef}
            />

          <ListeAnnotationVideo 
            id={id} 
            annotations={annotations} 
            tempsCourrantEnSecondes={tempsCourrantEnSecondes}
          />
          <div style={{ position: 'absolute', top: 135, right: 0 }}>
            <RedirectionVideo
              annotations={annotations}
              redirectTo={redirectTo}
              formatTime={formatTime}
            />
          </div>
        </div>

      <br />

      <h2>Timeline :</h2>

      <ProgressBar
        now={(tempsCourrantEnSecondes / tempsTotalEnSecondes) * 100}
        onClick={handleBarClick}
        style={{ width: '100%', cursor: 'pointer', marginTop: '20px' }}
      />

      {tempsInitial.minutes !== 0 || tempsInitial.secondes !== 0 ? (
        <div>
          <p>Temps initial : {formatTime(tempsInitialEnSecondes)}</p>
        </div>
      ) : null}

      {tempsFinal.minutes !== 0 || tempsFinal.secondes !== 0 ? (
        <div>
          <p>Temps final : {formatTime(tempsFinalEnSecondes)}</p>
        </div>
      ) : null}

      {annulationActive &&  (
            <Button variant="primary" onClick={annulerTempsInitial}>
              Annuler
            </Button>
          ) 
      }

      
      <br />

      { (tempsInitial.minutes !== 0 || tempsInitial.secondes !== 0) && (tempsFinal.minutes !== 0 || tempsFinal.secondes !== 0) && (
        <div>
          <FormulaireAnnotationVideo ajouterAnnotation={ajouterAnnotation} />
        </div>
      )}


    </Container>
    </div>
  );
}