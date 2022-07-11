import './style.css';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function Perfil() {

    const [user, setUser] = useState({});
    const { id } = useParams();

    useEffect(() => {
        // console.log(id);
        async function loadUser() {
            const response = await api.get(`user/${id}`);
            setUser(response.data);
        }
        loadUser();
    }, [])

    return (
        <div className='container'>
            <div className='left-area'>
                <img className="user-logo" src={require('../../assets/user-logo.png')} />
                <div className='user-info'>{user.nome} <br />{user.email} <br />{user.departamento}</div>
            </div>
            <div className='right-area'>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>

            </div>
        </div>
    )

}

export default Perfil;