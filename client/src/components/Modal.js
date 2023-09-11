function Modal(props) {
    return (
        <>
            <div id="modal" onClick={() => props.setShowModal(false)}>
                Waldo is not here! Try again!
            </div>
        <div id="modal-backdrop" onClick={() => props.setShowModal(false)}></div>
        </>
    )
}

export default Modal;