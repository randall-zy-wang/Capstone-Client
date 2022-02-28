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

    const [color, setColor] = useState(stored.color);

    const maxDay = months.getMaxDays(month);

    function handleCancelClicked() {
        editCompleteCallback(null);
    }

    function handleSaveClicked() {
        console.log("Saved");
        editCompleteCallback({name, month, day, color, petname, breed, petGender, petSize});
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
        <Group>            
            <h2>Name:</h2>
            <input
                type='text'
                value={name}
                onChange={e => setName(e.target.value)}
            />            
        </Group>
        <Group>            
            <h2>Pet Name:</h2>
            <input
                type='text'
                value={petname}
                onChange={e => setpetName(e.target.value)}
            />            
        </Group>
        <Group>            
            <h2>Pet Breed:</h2>            
            <input
                type='text'
                value={breed}
                onChange={e => setBreed(e.target.value)}
        
            />
        </Group>
        <Group>            
            <h2>Pet Size:</h2>            
            <input
                type='int'
                value={petSize}
                onChange={e => setPetSize(e.target.value)}
        
            />
        </Group>
        <Group>            
            <h2>Pet Gender:</h2>            
            <input
                type='text'
                value={petGender}
                onChange={e => setPetGender(e.target.value)}
        
            />
        </Group>
        <Group>
            <button style={buttonStyle} onClick={handleSaveClicked}>Save</button>
            <button style={buttonStyle} onClick={handleCancelClicked}>Cancel</button>
        </Group>
    </>
}