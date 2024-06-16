import React,{useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const PopupModel = () => {
    const [show, setShow] = useState(false);

    useEffect(()=>{
        setTimeout(()=>{
            setShow(true)
        },5000)
    },[])
    
  return (
    <>
    
      <Modal show={show} >
        <Modal.Header closeButton onClick={()=>setShow(false)}>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" >
            Close
          </Button>
          <Button variant="primary" >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      
    </>
  )
}

export default PopupModel
