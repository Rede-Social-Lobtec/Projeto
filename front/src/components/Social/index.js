import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './social.css'

import api from '../../services/api';

const avatar = require('../../assets/no-photo.png');

export default function Social() {
  const [following, setFollowing] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loaded, setLoaded] = useState(false);

  var token = JSON.parse(localStorage.getItem('token'));  

  useEffect(() => {

    const config = {
      headers: {
          Authorization: `Bearer ${token}`
      }
    };

    function loadSocialInfo() {
      api.get('user', config)
        .then((res) => {
          setGroups(res.data.grupos);
          setFollowing(res.data.seguindo);
        })
        .catch(err => {
          console.log(err);
        });

    }
    loadSocialInfo();

    setLoaded(true);

  }, []);

  return(
    <div className='div-social'>
      <div className='div-column'>
        <h5>Pessoas que você segue</h5>
        <div className='people-followed'>
          <ul>
            {loaded && following.length > 0 && following.map((u) => {
              return (
                <li key={u._id}>
                  <div className='person-followed'>
                    <Link to={`../perfil/${u._id}`}>
                      <img src={avatar} alt="Avatar" className='img-user' />
                      <p>{u.nome}</p>
                    </Link>

                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <div className='div-column'>
        <h5>Grupos que você faz parte</h5>
        <div className='groups-user'>
          {loaded && groups.length > 0 && groups.map((g) => {
            return (
              <li key={g._id}>
                <div className='group-user'>
                  <Link to={`../grupo/${g._id}`}>
                    <p>{g.nome}</p>
                  </Link>

                </div>
              </li>
            )
          })}
        </div>
      </div>
    </div>
  )
}