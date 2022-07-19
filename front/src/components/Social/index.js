import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './social.css'

import api from '../../services/api';

const avatar = require('../../assets/no-photo.png');
const loadingGIF = require('../../assets/loading.gif')

export default function Social() {
  const [following, setFollowing] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loaded, setLoaded] = useState(false);

  var token = JSON.parse(localStorage.getItem('token'));
  var id = JSON.parse(localStorage.getItem('id'));

  useEffect(() => {

    const config = {
      headers: {
          Authorization: `Bearer ${token}`
      }
    };

    function loadSocialInfo() {
      api.get(`perfil/${id}`, config)
        .then((res) => {
          setGroups(res.data.grupos);
          setFollowing(res.data.seguindo);
          setLoaded(true);
        })
        .catch(err => {
          console.log(err);
        });

    }
    loadSocialInfo();

  }, []);

  return(
    <div className='div-social'>
      <div className='div-column'>
        <h5>Pessoas que você segue</h5>
        <div className='people-followed'>
          <ul>
            {!loaded && <img src={loadingGIF} className="loading-gif" />}
            {loaded && following[0] === undefined && <h4>Você ainda não segue ninguém!</h4>}
            {loaded && following[0] !== undefined && following.map((u) => {
              return (
                <li key={u._id}>
                  <div className='person-followed'>
                    <Link to={`../perfil/${u._id}`}>
                      {u.foto != "" ?
                        <img src={u.foto} className="img-user" />
                        :
                        <img src={avatar} className="img-user" />
                      }
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
          <ul>
            {!loaded && <img src={loadingGIF} className="loading-gif" />}
            {loaded && groups[0] === undefined && <h4>Você ainda não está em nenhum grupo!</h4>}
            {loaded && groups[0] !== undefined && groups.map((g) => {
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
          </ul>
        </div>
      </div>
    </div>
  )
}