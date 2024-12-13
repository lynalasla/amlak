import React, {useState} from "react";
//import Profile from '../images/profile.png'
import user from '../images/profil-user.png'
import '../components/my-profile-page/profile.css'
import axios from "axios";
import PropTypes from 'prop-types';

const ProfilePage = ({userpk}) => {
  ProfilePage.propTypes = {
    userpk: PropTypes.object.isRequired
  }
  const [data, setData] = useState([]);
  axios.get("http://localhost:8000/api/profile/".concat(userpk, "/")) //format data ['image', 'nom', 'prenom','description','telnumber']
  .then((response) => 
  {
    setData(response.data)
  }).catch(err => console.error(err))

  let ownerType = 'Agency', image = user, numTel = null, hasPhoneNumber = false
  let nom = data['nom']
  if(data['isAgency'] === false){
    nom = data['nom'].concat(' ', data['prenom'])
    ownerType = 'Individual'
  }else{
    nom = data['nom']
  }
  const email = data['email']
  if(data['image'] !== null){
    image = data['image']
  }
  if(data['telnumber'] !== null){
    numTel = data['telnumber']
    hasPhoneNumber = true
  }
    
  /*useEffect(()=>{
    getInfos();
  },[])*/
  
  /*const nom = 'Amlak immobilier' //a remplir avec les données
  const email = 'example@email.com'
  const hasPhoneNumber = true; //s'il a un num ou pas
  const numTel = '0666274844'
  const ownerType = 'Agency'
  const image = Profile*/
  return (
  <>
      <div className="infos-profil prodetails">
        <div className="banniere"></div>
        <div className="photo-infoos">
          <img alt="" src={image} className="photo-profile"/>
          <div className="infoo">
            <div className="ownerr">
                <div className="namee">{nom}</div>
                <div className="ownerr-type">{ownerType}</div>
            </div>
            <div className="coordonnees">
              <div className="emaill">{email}</div>
              {hasPhoneNumber ? <div className="phone">{numTel}</div>: null }
            </div>
          </div>
        </div>
      </div>
      <div className="titree">ALL PROPERTIES PUBLISHED</div>

  </>
  );
};

export default ProfilePage;
