//import logo from './logo.svg';
//import './App.css';

import React, { useState} from 'react';
import axios from 'axios';
import * as S from './styled';
import {useHistory} from 'react-router-dom'

function App(props) { 
  //permite navegar / alternar entre rotas em tempo real
  const history = useHistory();

  const [ usuario, setUsuario] = useState('');
  const [ erro, setErro] = useState(false);

  function handlePesquisa(){
    //resgatando dados da api (get) e verificando dados(then)
    axios.get(`https://api.github.com/users/${usuario}/repos`).then(response =>{
      const repositories = response.data;
      const repositoriesName = [];
      //varrendo vetor cheio
      repositories.map((repository) =>{
      //preenchendo vetor até então vazio
      repositoriesName.push(repository.name);
      });
      //armazenando dados no browser (f12->Application->localStorage)
      localStorage.setItem('repositoriesName', JSON.stringify(repositoriesName));
      setErro(false);
      //inserindo rota
      history.push('/repositories');
    })
    .catch((err) => {
      setErro(true);
    })
  }

  return (
    <S.HomeContainer>
    <S.Content>
    <S.Input className='usuarioInput' placeholder='Usuário' value={usuario} onChange={e => setUsuario(e.target.value)}/>
    <S.Button type="button" onClick={handlePesquisa}>Pesquisar</S.Button>
    </S.Content>    
    { 
    //houve erro? sim, ocorreu senão(:) ''
    erro ? <S.ErrorMsg>Ocorreu um erro, tente novamente.</S.ErrorMsg>: '' 
    }    
    </S.HomeContainer>
  );
}

export default App;

/*
imprimindo dados pesquisados em uma textarea:

criando estado antes do return
const [ dados, setDados] = useState('');

criando tag dentro do return
<textarea className='texto' value={dados}></textarea>

axios.get(`https://api.github.com/users/usuarioqualquer/repos`).then(response => setDados(setDados(`Nome do projeto: ${response.data[0].name}`))
*/