import React, {useEffect, useState} from 'react';
import * as S from './styled';
import { useHistory } from 'react-router-dom';

export default function Repositories() {
    const history = useHistory();

// está página é um exemplo de programação declarativa:
// se houver repositórios, a função useEffect os armazena em vetor (como não sei)
// e automaticamente varrendo este vetor(map)
// exibe uma quantidade listItems com os nomes dos repositórios 
// enquanto qual condição é true?,o índice vale quanto e incrementa de quanto em quanto?
// não sei apenas exiba os nomes dos repositórios

    const [repositories, setRepositories] = useState([])

    //useEffect monitora a mudança de valores em  geral ou [variáveis específicas]
    useEffect(() => {

        let repositoriesName = localStorage.getItem('repositoriesName');

        //existem repositórios?
        if(repositoriesName != null ){
            //convertendo string para vetor(parse)
            repositoriesName = JSON.parse(repositoriesName);
            setRepositories(repositoriesName);
            //console.log(repositoriesName);
            localStorage.clear();
        }else{
            history.push('/');
        }
        
    },[]);

    return(
        <S.Container>
          <S.Title>Repositórios</S.Title>  
          <S.List>
              {
                  //varrendo vetor de repositórios
                  repositories.map((repository) =>{
                      return(
                          //para cada repositório, crie um listItem com o nome do repositorio
                          <S.ListItem>Repositório: {repository} </S.ListItem>
                      )
                  })
              }               
          </S.List>
          <S.LinkHome to='/'>Voltar</S.LinkHome>           
        </S.Container>
    )
}
