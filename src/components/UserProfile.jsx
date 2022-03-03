import wuyanzu from "../photos/wuyanzu.png";
import snap from "../photos/snapchat.png";
import facebook from "../photos/facebook2.png";
import instagram from "../photos/instagram.png";
import pet1 from "../photos/pet1.jpg";
import pet2 from "../photos/pet2.jpg";
import pet3 from "../photos/pet3.jpg";
import pet4 from "../photos/pet4.jpg";
import add from "../photos/add.png";

export default function EditableUserProfile({ stored, startEditCallback }) {
  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        <img className="profile-pic" alt={"headshot"} src={wuyanzu}></img>
        <div className="profile-row">
          <span className="profile-row-name">My pet:</span>
          <span className="profile-row-value"> {stored.petname}</span>
        </div>
        {/* <div className='profile-row'>
        <span className='profile-row-name'>Pet Name:</span>
        <span className='profile-row-value'> {stored.petname}</span>
      </div> */}
        <div className="profile-row">
          <span className="profile-row-name">Pet Breed:</span>
          <span className="profile-row-value"> {stored.petname}</span>
        </div>
        <div className="profile-row">
          <span className="profile-row-name">Pet Size:</span>
          <span className="profile-row-value"> {stored.petSize}</span>
        </div>
        <div className="profile-row">
          <span className="profile-row-name">Pet Gender:</span>
          <span className="profile-row-value"> {stored.petGender}</span>
        </div>
        <button className="profile-edit-button" onClick={startEditCallback}>
          Edit
        </button>
      </div>

      <div className="profile-con">
        <div className="profile-con-top">
          <img
            className="profile-con-top-pic"
            alt={"headshot"}
            src={wuyanzu}
          ></img>
          <div>
            <div className="profile-name">Nate Lyu</div>
            <div className="profile-addr">Seattle, WA</div>
          </div>
        </div>

        <div className="profile-name-c">Contact:</div>
        <div className="profile-icons">
          <img className="profile-icon" alt={"snap"} src={snap}></img>
          <img className="profile-icon" alt={"instagram"} src={instagram}></img>
          <img className="profile-icon" alt={"facebook"} src={facebook}></img>
        </div>
        <div className="profile-name-p">Pet photos:</div>
        <div className="pet-photos">
          <img className="pet-icon" alt={"pet photo1"} src={pet1}></img>
          <img className="pet-icon" alt={"pet photo2"} src={pet2}></img>
          <img className="pet-icon" alt={"pet photo3"} src={pet3}></img>
          <img className="pet-icon" alt={"pet photo4"} src={pet4}></img>
          <div className="add-icon">
            <img className="add-icon-img" alt={"add icon"} src={add}></img>
          </div>
        </div>
      </div>
      <div className="profile-wrapper-mobile">
        <div className="profile-row">
          <span className="profile-row-name">Pet info:</span>
        </div>
        <div className="profile-row">
          <span className="profile-row-name">My pet:</span>
          <span className="profile-row-value"> {stored.petname}</span>
        </div>
        {/* <div className='profile-row'>
        <span className='profile-row-name'>Pet Name:</span>
        <span className='profile-row-value'> {stored.petname}</span>
      </div> */}
        <div className="profile-row">
          <span className="profile-row-name">Pet Breed:</span>
          <span className="profile-row-value"> {stored.breed}</span>
        </div>
        <div className="profile-row">
          <span className="profile-row-name">Pet Size:</span>
          <span className="profile-row-value"> {stored.petSize}</span>
        </div>
        <div className="profile-row">
          <span className="profile-row-name">Pet Gender:</span>
          <span className="profile-row-value"> {stored.petGender}</span>
        </div>
        <button className="profile-edit-button" onClick={startEditCallback}>
          Edit
        </button>
      </div>
    </div>
  );
}
