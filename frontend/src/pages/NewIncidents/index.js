import React,{ useState} from 'react'
import{ Link,useHistory } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';
import {FiArrowLeft} from 'react-icons/fi';
import './styles.css';
import api from '../../services/api'
export default function NewIncidents(){

    const[title,setTitle]=useState('');
    const[description,setDescription]=useState('');
    const[value,setValue]=useState('');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleNewIncidents(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value
        };
        try {
            await api.post('incidents',data,{
                headers: {
                    Authorization: ongId
                }
            });

            history.push('/profile');

        } catch (error) {
            alert('erro ao cadastrar caso')
        }
    }

    return (
        <div className='register-container'>
            <div className='content'>
                <section>
                    <img src={logoImg} alt="be the hero"/>

                    <h1>Cadastrar novo caso</h1>

                    <p>Descreva o caso detalhadamente para encontrar um herói para resoler isso</p>

                    <Link className='back-link' to="/profile">
                        <FiArrowLeft size = {16} color ="#e02041"/>
                        Voltar para Home
                    </Link>

                </section>

                <form onSubmit={handleNewIncidents}>
                    <input 
                    placeholder='Titulo do caso'
                    value={title}
                    onChange={e=>setTitle(e.target.value)}
                    />

                    <textarea 
                    placeholder = "Descrição"
                    value={description}
                    onChange={e=>setDescription(e.target.value)}
                    />
  
                    <input 
                    placeholder="Valor em Reais"
                    value={value}
                    onChange={e=>setValue(e.target.value)}
                    />
                    
                    <button className = "button" type="submit"> Cadastrar </button>
                </form> 
            </div>
        </div>
    )
}