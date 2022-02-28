import { useState } from 'react';
import Group from './Group';
import ColorBox from './ColorBox';
import { months, calcButtonTextColor } from '../tools';

export default function EditableUserProfile({
    stored,
    startEditCallback
}) {

    console.log()

    const buttonStyle = {
        backgroundColor: stored.color,
        color: calcButtonTextColor(stored.color)
    };

    return <div>
        <Group>
            <h2>Name:</h2> {stored.name}
        </Group>
        <Group>
            <h2>Pet Name:</h2> {stored.petname}
        </Group>
        <Group>
            <h2>Pet Breed:</h2> {stored.breed}
        </Group>
        <Group>
            <h2>Pet Size:</h2> {stored.petSize}
        </Group>
        <Group>
            <h2>Pet Gender:</h2> {stored.petGender}
        </Group>
        <Group>
            <button
                style={buttonStyle}
                onClick={startEditCallback}
            >Edit</button>
        </Group>
    </div>
}