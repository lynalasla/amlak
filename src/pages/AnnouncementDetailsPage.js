import React, {useState} from "react";
import DetailsAnnouncement from "../components/announcement-details-page/DetailsAnnouncement";
import SimilarAnnouncements from "../components/announcement-details-page/SimilarAnnouncements";
//import photo from "../images/annonce.png";
//import profile from "../images/profile.png";
import SecondNavbar from "../navbar2/navbar2";
import user from '../images/profil-user.png'
//import NavbarFirst from "../navbar1/navbar1";
import Footer from "../footer/footer";
import axios from "axios";
import PropTypes from 'prop-types';

const AnnouncementDetailsPage = ({annpk}) => {
  AnnouncementDetailsPage.propTypes = {
    annpk: PropTypes.object.isRequired
  }
  const [data, setData] = useState([]);
  axios.get("http://localhost:8000/api/announcement/".concat(annpk, "/"))
  .then((response) => 
  {
    setData(response.data)
  }).catch(err => console.error(err))
  //fields : 'user','title','description','image','type_bien','type_contrat','price','wilaya','last_updated_at','appartment_address'
  let photo = data['image']
  let profile = user
  if(data['image'] !== null){
    profile = data['image']
  }
  const [userdata, setUserdata] = useState([]);
  axios.get("http://localhost:8000/api/profile/".concat(user, "/"))
  .then((response) => 
  {
    setUserdata(response.data)
  }).catch(err => console.error(err))
  let ownerName = userdata['nom']
  /*if(){
    nom = data['nom'].concat(' ', data['prenom'])
    ownerType = 'Individual'
  }else{
    nom = data['nom']
  }*/
  let ownerType = 'Agency' //condition ownerType
  let email = data['email']
  let numTel = null
  if(userdata['telnumber'] !== null){
    numTel = userdata['telnumber']
  }
  let title = data['title']
  let wilaya = data['wilaya']
  let typeBien = data['type_bien']
  let typeContrat = 'Sale'
  if(data['type_contrat' === 'L']){ //a vérifier
    typeContrat = 'Rent'
  }
  let description = data['description']
  let surface = 100 //apparemment un bien n'a pas de surface
  let furniture = true //ca non plus
  let price = data['price']

  let latitude = 36.761722 //jsppppppppp
  let longitude = 3.011998
  
  //s'il a une photo ou pas
  //description={'Family house in Ben Aknoun with several schools and a hospital nearby. There are 3 rooms and a large leaving room. It is well furnished with a fully equipped kitchen. It is a five-minute to the shopping mall. There is a bus station not far away. There is a big garden with games for kids.The house is in a quiet street with kind neighbors.'}

  return (
    <div>
      <SecondNavbar/>
      <DetailsAnnouncement photo={photo} profile={profile} 
        ownerName={ownerName} ownerType={ownerType}
        email={email} phoneNumber={numTel}
        title={title} location={wilaya} propertyType={typeBien} transaction={typeContrat}
        surface={surface} price={price} nbRooms={4} furniture={furniture}
        description={description}
        latitude={latitude} longitude={longitude} />
      <SimilarAnnouncements />
      <Footer />
    </div>
  );
};

export default AnnouncementDetailsPage;
