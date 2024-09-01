import { useState } from 'react';

import classes from './Modal.module.css';

const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      {isModalOpen && (
        <div className={classes.modal} onClick={closeModal}>
          <div className={classes.modalContent}>
            <h2 className={classes.modalTitle}>Sorting Algorithm Visualizer</h2>
            <p>
              This is an interactive application for visualizing popular sorting
              algorithms such as Bubble Sort, Insertion Sort, Quick Sort and
              Selection Sort.
            </p>
            <p>
              <span style={{ color: 'yellow' }}>Control the Execution:</span>{' '}
              Use the controls to start, pause, and navigate through the sorting
              process.
            </p>
            <p>
              <span style={{ color: 'green' }}>Understand the Process:</span>{' '}
              Watch as the array is sorted step by step, with visual cues for
              active, compared, and sorted elements.
            </p>
            <h3>Pick an Algorithm.</h3>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
