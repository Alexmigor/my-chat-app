const Modal = ({ isOpen, onClose, handleClose, children }) => {


    return (
        <div className={`modal ${isOpen ? 'open' : ''}`} onClick={handleClose}>
            <div className="modal-content" >
                <span onClick={onClose} className="close" >&times;</span>
                {children}
            </div>
        </div>
    )
}

export default Modal 