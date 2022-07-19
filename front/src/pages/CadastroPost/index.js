import './create-post.css';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../components/contexts/AuthContext';
import Header from '../../components/Header';
import { CgSearch } from "react-icons/cg";
import api from '../../services/api';
import { BsCardImage } from 'react-icons/bs';
import Social from '../../components/Social';

const avatar = require('../../assets/no-photo.png');

export default function CadastroPost() {
    const [loaded, setLoaded] = useState(false);
    const [user, setUser] = useState({});
    const [descricao, setDescricao] = useState("");
    const [tema, setTema] = useState("");
    const [grupo, setGrupo] = useState("");
    const [fotoPublicacao, setFotoPublicacao] = useState("");
    const [imgPost, setImgPost] = useState("");
    const [themes, setThemes] = useState([]);
    const [groups, setGroups] = useState([]);

    var token = JSON.parse(localStorage.getItem('token'));
    var id = JSON.parse(localStorage.getItem('id'));
    
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    useEffect(() => {
        
        function loadForm() {
            api.get('postsThemes')
                .then(res => {
                    setThemes(res.data);
                })
                .catch(err => console.log(err));
                
            api.get('user/'+id)
                .then((res) => {
                    setUser(res.data);
                    setLoaded(true);
                })
                .catch(err => console.log(err));
            api.get('user', config)
                .then((res) => {
                  setGroups(res.data.grupos);
                })
                .catch(err => {
                  console.log(err);
                });
        }
        loadForm();

    }, []);

    function handleFile(e) {
        if(e.target.files[0]) {
            const image = e.target.files[0];
            
            if(image.type === "image/jpeg" || image.type === "image/png") {
                setFotoPublicacao(image);
                setImgPost(URL.createObjectURL(e.target.files[0]));
            } else {
                alert("Envie uma imagem do tipo PNG ou JPEG.");
                setFotoPublicacao("");
                return null;
            }
        }
    }

    async function createPost() {
        // var body = {
        //     lastModified: fotoPublicacao.lastModified,
        //     lastModifiedDate: fotoPublicacao.lastModifiedDate,
        //     name: fotoPublicacao.name,
        //     size: fotoPublicacao.size,
        //     type: fotoPublicacao.type,
        //     webkitRelativePath: fotoPublicacao.webkitRelativePath
        // }
        
        // await api.post(`images`, body)
        //     .then(async () => {
        //         console.log("Foto enviada com sucesso!");

        //         await api.get(`images/${body.name}`);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })

        var body = {
            descricao: descricao,
            tema: tema,
            fotoPublicacao: fotoPublicacao,
            grupo: grupo
        }

        await api.post(`post`, body, config)
            .then(() => {
                alert('Post criado com sucesso!');
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='container'>
            <div className='main'>
                {/* <h1>Feed Rede Social</h1> */}
                <div className='div-flex'>
                    <Social />
                    <div className='div-create-post'>
                        <form className='new-post'
                            enctype="multipart/form-data" >
                            <div className='div-desc-post'>
                                <div className='div-textarea-post'>
                                    {user.foto != "" ?
                                        <img src={user.foto} className="img-user-post" />
                                        :
                                        <img src={avatar} className="img-user-post" />
                                    }
                                    <textarea placeholder={`Crie uma publicação, ${user.nome}!`} value={descricao}
                                        onChange={(e) => setDescricao(e.target.value)} required rows={5} />
                                </div>
                                <div className='add-image-post'>
                                    <input id="id-foto-post" type="file" accept='image/*' 
                                        name="file" onChange={handleFile} />
                                    <label htmlFor='id-foto-post'>
                                        <BsCardImage color='#727272' size={20} />
                                        <p>Adicionar imagem</p>
                                    </label>
                                    {imgPost !== "" && 
                                        <img src={imgPost} width={150} />
                                    }
                                </div>
                            </div>
                            <div className='div-details-post'>
                                <div className='div-insert-theme'>
                                    <h4>Selecione um tema ou crie um novo</h4>
                                    <div className='select-or-insert'>
                                        <select id="id-select-theme" onChange={(e) => setTema(e.target.value)}>
                                            <option value={""}>-- Selecione --</option>
                                            {loaded && themes[0] != undefined && themes.map(t => {
                                                return(
                                                    <option key={themes.indexOf(t)} value={t}>{t}</option>
                                                )
                                            })}
                                        </select>
                                    
                                        <input id='id-tema' type="text" value={tema} onChange={(e) => { 
                                            document.getElementById('id-select-theme').value = ""; 
                                            setTema(e.target.value)
                                        }} 
                                            placeholder='Insira um novo tema'/>
                                    </div>
                                </div>
                                <div className='div-insert-group'>
                                    <div className='div-insert-group-texts'>
                                        <h4>Selecione um grupo</h4>
                                        <p>Se você não selecionar um grupo o post será público</p>
                                    </div>
                                    <select onChange={(e) => setGrupo(e.target.value)}>
                                        <option value={""}>-- Selecione --</option>
                                        {loaded && groups[0] != undefined && groups.map(g => {
                                            return (
                                                <option key={g._id} value={g._id}>{g.nome}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <button onClick={createPost} className='create-post-btn'>Publicar</button>
                        </form>
                    </div>
                </div>
            </div>
            <Header />
        </div>
    )
}


//     fileName = document.getElementById('file-name');

// input.addEventListener('change', function(){
//   fileName.textContent = this.value;
// });