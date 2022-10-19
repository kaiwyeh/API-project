import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SpotUpdate from ".";
import './SpotUpdate.css'
function SpotUpdateModal({ spot }) {
 const [showModal, setShowModal] = useState(false);

 return (
  <>
   <button className="updatespotbuttonmodal " onClick={() => setShowModal(true)}>
    Edit Spot
   </button>
   {showModal && (
    <Modal onClose={() => setShowModal(false)}>
     <SpotsUpdatePage
      spot={spot}
      closeModal={setShowModal}
     />
    </Modal>
   )}
  </>
 );
}

export default SpotsUpdateModal;
