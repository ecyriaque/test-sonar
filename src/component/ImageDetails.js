import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ImageAnnotation from './ImageAnnotation';

export default function ImageDetails({ images }) {

    const { id } = useParams();

    const image = images.find(image => image.id === parseInt(id));

    if (!image) {
        return <div>
                    <h1 className="text-center">
                        L'image n'existe pas.
                    </h1>
                </div>;
    }

    return (
        <Container className="text-center" style={{ height: '100vh', marginTop: '30px' }}>
            <h1> Titre : {image.title} </h1>
            <ImageAnnotation url={image.url} />
            <br/>
            <small> Créer par : {image.author} </small>
        </Container>
    );
}
