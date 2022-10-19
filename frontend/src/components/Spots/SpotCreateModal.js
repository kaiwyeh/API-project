import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './SpotCreateComp.css';
import { useHistory } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import SpotCreateComp from './SpotCreateComp';

function SpotCreateModal() {
 const [showModal, setShowModal] = useState('')

 return (
  <>
   <button className='hostButton' onClick={() => setShowModal(true)}>Become a Host</button>
   {showModal && (
    <Modal onClose={() => setShowModal(false)}>

    </Modal>
   )}

  </>
 )
}
