import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';
import { format } from 'date-fns';
import InputGroup from 'react-bootstrap/InputGroup';
import $ from 'jquery'; 
import ip from './variable_globale/webservice_ip';

export default function Commentaire(props) {

  const [show, setShow] = useState(false);
  const [comment, setComment] = useState('');
  const [commentsList, setCommentsList] = useState([]);
  const [showResponse, setShowResponse] = useState([]);
  const [responseList, setResponseList] = useState([]);

  const commentNumber = commentsList.length + responseList.length;

  const currentUser = "JhonDoe";
  const userTest = "DoeJhon";

  const handleClose = () => {
    setShow(false);
    setComment('');
  };

  const handleShow = () => setShow(true);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const currentDate = format(new Date(), 'dd/MM/yyyy');
    const currentHour = format(new Date(), 'HH:mm:ss'); 
    setCommentsList(commentsList.slice().concat({ comment, date: currentDate, hour : currentHour }));
    setComment('');
  };

  const indice = (commentsList.length+1);

  const comInstance = "commentaire"+indice;

  const data = {
    CommentInstance : comInstance, 
  //annotationInstance : props.annotation,
    multimediaResourceInstance : "image1",
    UserInstance: "JhonDoe"
  };

  const handleInsertCommentaire = () => {
    console.log(data);
    $.ajax({
      async: true,
      crossDomain: true,
      url: ip+"comment",
      type: "POST",
      dataType: 'json', 
      data: data
    }).done(function (res) {
      alert("true");
    });
  };

  const handleResponse = (index) => {
    const tabResponse = showResponse.slice();
    tabResponse[index] = !tabResponse[index];
    setShowResponse(tabResponse);
  };

  const handleSubmitResponse = (index) => {
    const responseInput = document.getElementById(`response-${index}`);
    const response = responseInput.value;
    const currentDate = format(new Date(), 'dd/MM/yyyy');
    const currentHour = format(new Date(), 'HH:mm:ss'); 
    setResponseList(responseList.concat({ comment: response, parentIndex: index,date: currentDate, hour : currentHour }));
  
    responseInput.value = '';
  
    handleResponse(index);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Commentaire <Badge bg="secondary">{commentNumber}</Badge>
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un commentaire pour {props.annotation} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="form.ControlTextarea1">
              <Form.Control
                as="textarea"
                placeholder="Ajoutez un commentaire ..."
                rows={3}
                value={comment}
                onChange={handleCommentChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleInsertCommentaire} disabled={comment.trim() === ''}>
              Ajouter un commentaire
            </Button>
          </Form>
          <div className="mt-3" style={{ wordWrap: "break-word" }}>
            {commentsList.slice().map((item, index) => (
              <div key={index}>
                <span style={{ color: "gray", fontWeight: "bold" }}> {currentUser} </span>
                <span> publié le : {item.date} à {item.hour} </span>
                <br />
                {item.comment}
                <br/>
                <Button id={index} variant="secondary" onClick={() => handleResponse(index)}>
                  Répondre
                </Button>
                <br/>
                <br/>
                {showResponse[index] && (
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="Répondre au commentaire ..."
                      aria-label="Réponse"
                      aria-describedby="basic-addon2"
                      id={`response-${index}`}
                    />
                    <Button variant="outline-secondary" id={index} onClick={() => handleSubmitResponse(index)}>
                      Envoyé
                    </Button>
                  </InputGroup>
                )}

                {responseList
                .filter((response) => response.parentIndex === index)
                .map((response, responseIndex) => (
                  <div key={{responseIndex}} style={{marginLeft : "25px"}}>
                    <span className='text-primary fw-bold'> {userTest} </span>
                    <span> a répondu </span>
                    <span> le : {response.date} à {response.hour} </span>
                    <br />
                    {response.comment}
                    <br/>
                  </div>
                ))}

                <hr/>
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}