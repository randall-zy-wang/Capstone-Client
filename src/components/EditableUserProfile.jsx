import { useState, useEffect } from 'react';
import Group from './Group';
import { months, calcButtonTextColor } from '../tools';

function renderMonthOptions() {
    return months.getMonths().map( (m, i) => {
        return <option
            key={i}
            value={i}
        >
            {m.shortName}
        </option>
    });
}

function bound(value, floor, ceil) {
    return Math.min(ceil, Math.max(value, floor));
}

export default function EditableUserProfile({
    stored,
    editCompleteCallback
}) {

    console.log("Edit User Profile");

    const [name, setName] = useState(stored.name);
    const [petname, setpetName] = useState(stored.petname);

    const [month, setMonth] = useState(stored.month);
    const [day, setDay] = useState(stored.day);
    const [breed, setBreed] = useState(stored.breed);
    const [petSize, setPetSize] = useState(stored.petSize);
    const [petGender, setPetGender] = useState(stored.petGender);
    const [location, setLocation] = useState(stored.location);

    const [color, setColor] = useState(stored.color);

    const maxDay = months.getMaxDays(month);

    function handleCancelClicked() {
        editCompleteCallback(null);
    }

    function handleSaveClicked() {
        console.log("Saved");
        editCompleteCallback({name, month, day, color, petname, breed, petGender, petSize, location});
    }

    useEffect(() => {
        setDay(bound(day, 1, maxDay));
    }, [month]);

    const buttonStyle = {
        backgroundColor: color,
        color: calcButtonTextColor(color)
    };

    calcButtonTextColor(color);

    return <>
        <div className='profile-edit-row'>            
            <div className='profile-edit-row-name'>Name:</div>
            <input
                type='text'
                value={name}
                onChange={e => setName(e.target.value)}
            />            
        </div>
        <div className='profile-edit-row'>            
            <div className='profile-edit-row-name'>Pet Name:</div>
            <input
                type='text'
                value={petname}
                onChange={e => setpetName(e.target.value)}
            />            
        </div>
        <div className='profile-edit-row'>            
            <div className='profile-edit-row-name'>Pet Breed:</div>            
            <input
                type='text'
                value={breed}
                onChange={e => setBreed(e.target.value)}
        
            />
        </div>
        <div className='profile-edit-row'>            
            <div className='profile-edit-row-name'>Pet Size:</div>            
            <input
                type='int'
                value={petSize}
                onChange={e => setPetSize(e.target.value)}
        
            />
        </div>
        <div className='profile-edit-row'>            
            <div className='profile-edit-row-name'>Pet Gender:</div>            
            <input
                type='text'
                value={petGender}
                onChange={e => setPetGender(e.target.value)}
        
            />
        </div>
        <div className='profile-edit-row'>            
            <div className='profile-edit-row-name'>Location:</div>            
            <input
                type='text'
                value={location}
                onChange={e => setLocation(e.target.value)}
        
            />
        </div>
        <div>
            <button className='profile-edit-button' onClick={handleSaveClicked}>Save</button>
            <button className='profile-edit-button'  onClick={handleCancelClicked}>Cancel</button>
        </div>
    </>
}