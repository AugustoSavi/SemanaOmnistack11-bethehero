import React, { useEffect, useState } from 'react'
import { Link,useHistory } from 'react-router-dom';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import './styles.css';

export default function Profile() {

    const [incidents, setIncidents] = useState([]);
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId
            }
        }).then(Response => {
            setIncidents(Response.data);
        })
    }, [ongId]);

    async function handleDeleteIncidents(id){
        try {
            await api.delete(`incidents/${id}`,{
                headers: {
                    Authorization: ongId
                }
            });
            setIncidents(incidents.filter(incidents=>incidents.id!==id))
        } catch (error) {
            alert('Erro ao deletar o caso')
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }
    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the hero" />
                <span>Bem vinda, {ongName}</span>
                <Link className="button" to="/incidents/new">Cadastrar novo Caso</Link>
                
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color='#e02041' />
                
                </button>
            </header>

            <h1>Cassos cadastrados</h1>

            <ul>
                {incidents.map(incidents => (
                    <li key={incidents.id}>
                        <strong>CASO:</strong>
                        <p>{incidents.title}</p>

                        <strong>DESCRIÇÃO</strong>
                        <p>{incidents.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incidents.value)}</p>

                        <button onClick={()=>handleDeleteIncidents(incidents.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}