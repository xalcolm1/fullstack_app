
import React from 'react';



const ReservationIndexItem = (props) => {
    //if the state is in open possition, displaycertain items else don't
    const {reservation, userName, action} = props;

    let date = new Date(props.reservation.date).toLocaleDateString()
    let time = new Date(props.reservation.date).toLocaleTimeString()

    const [open, setOpen] = React.useState(false);
    const [state, setState] = React.useState({
                                                id: props.reservation.id,
                                                user_id: props.reservation.user_id,
                                                restaurant_id: props.reservation.restaurant_id,
                                                people: props.reservation.people,
                                                date: props.reservation.date
                                            });

    const handleSelection = () => {
        return e => {

            setState(prevState => ({
                ...prevState,
                people: parseInt(event.target.value)
            }))
        };
    };
    
    const handleSubmit = () => {
        // let reservationDate = `${this.date} ${this.time}`
        // let people = this.state.people


        setState(prevState => ({
            ...prevState,
            date: `${date} ${time}`
        }))

        debugger
        action(state)
        .then(
            value => alert( `You have successfully reserved a table for ${state.people} on ${date}, at  ${time}`),
            rejection => alert( `You have failed to succesfully reserve a table`)
        )
        .then(() => {
            setState({ 
                people: 1,
                date: new Date()
            })
        }) 

        setOpen(!open)
        }

    const handleChange = (type) => {
        return  event => {
            let change = event.target.value

            if(type === 'date'){ 
                date = change;
            } else if (type === 'time'){
                time = change;
            }

        
        }
    }
    const options = [];
    const currentDate = new Date(state.date).toDateString()

    //create options
    for(let i = 1; i <= 20; i ++){
        options.push(<option 
                    key={i}
                    value={i}
                    onClick={() =>  
                        setState(prevState => ({
                        ...prevState,
                        people: i
                    }))}
                    className="option"
                    >{`For ${i}`}</option>)
    }
    return (
        <li  className="reservation-index-item">
            <aside>{userName}</aside>
            <main className="reservation-body">         
                <div>{reservation.name}</div>
                <div>{reservation.address}</div>

                { open ? (
                    <>
                         <label htmlFor="people"> Party Size</label>
                            <select className="people" onChange={handleSelection()} value={state.people}>
                            {options}
                            </select> 

                         <div className="column"> 
                        <label htmlFor="date"> Date</label>
                        <input type="date" onChange={handleChange('date') }  />
                        <label htmlFor="time">Time</label>
                        <input type="time" onChange={handleChange('time')} />
                    </div>
                    </>
                ):(
                <>
                    <div>{reservation.people}</div>
                    <div>{currentDate}</div>
                </>
                )}


            </main>
        
            <div className='editDeleteArea'>
                <button onClick={props.delete(reservation.id)}>Cancel Reservations</button>
                <div className="edit">
                     <button onClick={() => {
                         setOpen(!open);
                        setState({
                            id: props.reservation.id,
                            user_id: props.reservation.user_id,
                            restaurant_id: props.reservation.restaurant_id,
                            people: props.reservation.people,
                            date: props.reservation.date
                        })}}>{open ? 'Cancel' : 'Edit'}</button>

                {  open ? (<button onClick={() => handleSubmit()}> Done </button>) : null}
                </div>
               
            </div>

        </li>
    )
}

// index
export default ReservationIndexItem;