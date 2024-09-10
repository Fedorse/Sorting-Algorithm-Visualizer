import classes from './Modal.module.css';
type ModalProps = {
  onClose: () => void;
};
const Modal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <>
      <div className={classes.modal} onClick={onClose}>
        <div className={classes.modalContent}>
          <h1 className={classes.modalTitle}>Sorting Algorithm Visualizer</h1>
          <h2 className={classes.subTitle}>
            <span className={classes.textColor}>Pick an Algorithm .</span>
          </h2>
          <p>
            Select an <span className={classes.textColor}> Algorithm</span> ,
            adjust the array size using the slider and select speed.
          </p>
          <p>Use the play/pause button to control the visualization.</p>
          <p>
            Use the Player to control the execution of the a
            <span className={classes.textColor}> Algorithm</span> and navigate
            through the history.
          </p>
          <div className={classes.colorGuide}>
            <h2 className={classes.colorTitle}>Color Guide</h2>
            <div className={classes.colorContainer}>
              <div className={classes.colorItem}>
                <div
                  className={`${classes.colorBox} ${classes.colorActive}`}
                ></div>
                <span>Active Element</span>
              </div>
              <div className={classes.colorItem}>
                <div
                  className={`${classes.colorBox} ${classes.colorCompared}`}
                ></div>
                <span>Compared Element</span>
              </div>
              <div className={classes.colorItem}>
                <div
                  className={`${classes.colorBox} ${classes.colorPivot}`}
                ></div>
                <span>Pivot Element</span>
              </div>
              <div className={classes.colorItem}>
                <div
                  className={`${classes.colorBox} ${classes.colorSorted}`}
                ></div>
                <span>Sorted Elements</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
