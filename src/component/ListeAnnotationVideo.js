import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export default function ListeAnnotationVideo(props) {

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          {'Annotation ' + props.id}
        </Tooltip>
    );

    return (
        <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          fontSize: '24px',
          pointerEvents: 'none'
        }}
      >
        {props.annotations.map((annotation) => {
            if (annotation.videoInstance === parseInt(props.id) && props.tempsCourrantEnSecondes >= annotation.debut && props.tempsCourrantEnSecondes <= (annotation.endTime - 1)) {
                return (
                    <OverlayTrigger
                    key={annotation.id}
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip({ id: annotation.id })}
                    >
                    <p style={{ pointerEvents: 'auto' }}>{annotation.content} </p>
                    </OverlayTrigger>
                );
                }
            return null;
        })}
    
      </div>
    );
    
}