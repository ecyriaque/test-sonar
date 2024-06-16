import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function FormulaireAnnotationVideo(props) {

    const [contenu, setContenu] = useState('');

    const handleContenuChange = (event) => {
        setContenu(event.target.value);
    };

    const isContenuVide = contenu.trim() === '';

    return (
        <>
            <h2>Ajouter une annotation :</h2>
            <Form onSubmit={props.ajouterAnnotation}>
                <Form.Group controlId="content">
                <Form.Label>Contenu :</Form.Label>
                <Form.Control as="textarea" rows={3} required onChange={handleContenuChange} />
                </Form.Group>
                <Button variant="primary" type="submit"  disabled={isContenuVide}>
                Ajouter
                </Button>
            </Form>
        </>
    );
}