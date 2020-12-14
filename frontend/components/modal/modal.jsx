import React,{useState, useRef} from 'react';


function Modal(props) {
   
    const [open, setOpen] = useState();
   
    const {children, formType} = props;

    const handleClick = () => {
           if (event.path[0].className === "modal-backdrop")setOpen(!open) 
    }
    return (
        (!open) ? (
            <div 
            onClick={() => setOpen(!open)}
            className={`${formType.slice(0,3)}-button`}
            >{formType}</div>
        ) : (
            <div className='modal-backdrop' onClick={() => handleClick()}>
                <div className="modal" onSubmit={() => setOpen(!open)}>
                
                    <div onClick={() => setOpen(!open)} className="modal-close">&#x1F33F;</div>
    
                    {children}
    
                </div> 
            </div>
            )
           
    )
}

export default Modal;