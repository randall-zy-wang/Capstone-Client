import { useState } from 'react';
import Group from './Group';
import ColorBox from './ColorBox';
import { months, calcButtonTextColor } from '../tools';
import wuyanzu from '../photos/wuyanzu.png';
import stars from '../photos/fivestars.png';
import snap from '../photos/snap.png';
import facebook from '../photos/facebook.png';
import instagram from '../photos/insta.png';



export default function EditableUserProfile({
    stored,
    startEditCallback
}) {

    console.log()

    const buttonStyle = {
        backgroundColor: stored.color,
        color: calcButtonTextColor(stored.color)
    };

    return <div className='flex-container'>
        <div className='flex-child'>

            <div>
                        <img className="profile-pic" src={wuyanzu}></img>
            </div>
            <div>
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
        </div>
        <div className="flex-child">
            <div className='Profile-Name'>
                Yanzu Wu
            </div>
            <div className='Profile-location'>
                {stored.location}
            </div>
            <img className='rating-stars'src={stars}></img>
            <h2>Contact:</h2>
            <div className='icons'>
                <img className='icons'src={snap}></img>
                <img className='icons'src={instagram}></img>
                <img className='icons'src={facebook}></img>
            </div>

            
        </div>
    </div>
   
    
}