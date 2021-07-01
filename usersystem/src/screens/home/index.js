import React, {useEffect, useState} from 'react';
import {PageContainer} from '../../components/MainComponents';
import { Form,
        LineDiv,
        FormInput,
        InputPhoto,
        ColumnDiv,
        PhotoUpload,
        InputAreaPhoto,
        Photo,
        } from './styled';

import api from '../../api';

import * as moment from 'moment';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import LinearProgress from '@material-ui/core/LinearProgress';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    title: {
      flexGrow: 1,
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    list: {
      padding: theme.spacing(40),
    }
   
  }));


const Page= () => {
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [photo, setPhoto] = useState('');
    const [id, setId] = useState('');


    const classes = useStyles();

    const [users, setUsers] = useState([]);
    const [ loading, setLoading ] = useState(true);
  
    useEffect(() =>{
      async function loadUsers(){
        const response = await api.get(`/users`);
        setUsers(response.data)
        setLoading(false);
      }
      loadUsers();
    },[]);

    async function handleDelete(id){
        if(window.confirm("Deseja realmente excluir este usuário?")){
          var result = await api.delete(`/users/`+id);
          if(result.status ===200){
            window.location.href = '/users';
          }else{
            alert('Ocorreu um erro. Por favor, tente novamente!');
          }
        }
      }

      async function handleSubmit(){

        const data = {
          name,
          birthday,
          photo: btoa(photo) 
        }
    
          if(name!==''&&birthday!==''){
            const response = await api.post(`/users`, data);
    
            if(response.status===200){
              alert('Cadastro realizado com sucesso!')
              window.location.href='/'
            }else{
              alert('Erro ao cadastrar o usuário!');
            }
          }else{
            alert('Por favor, preencha todos os dados!');
          }
      }

    const onImageChange = (event) => {
      if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          setPhoto(reader.result);
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    }

    const handleUpdate= async (userId) =>{
      let response= await api.get(`/users/${userId}`) 
      setInputs(response.data);
    }
  
    const setInputs= (user)=> {
      setId(user.id);
      setName(user.name);
      setBirthday(user.birthday);
      if(!!user.photo)  setPhoto(atob(user.photo)); 
    }

    const handleConfirmUpdate = async () => {
      let data= {
        name,
        birthday,
        photo: btoa(photo)
      }
      let response = await api.put(`/users/${id}`, data)
      if(response.status===200){
        alert('Cadastro atualizado!')
        window.location.href='/'
      }else{
        alert('Erro ao atualizar!');
      }
    }
    
    return(
            <PageContainer>
                <Form>
                    <PhotoUpload>
                      <InputAreaPhoto>
                        <InputPhoto type="file" id="photo" onChange={onImageChange}/>
                        {!!photo ? <Photo src={photo} /> : <h1>+</h1>}
                      </InputAreaPhoto>
                      {!photo ? <h3>Adicionar Foto</h3> : <Button variant="contained" color="default" onClick={() => setPhoto('')}>Remover Foto</Button>}
                    </PhotoUpload>
                    <ColumnDiv>
                        <div align="center">
                                <FormInput type="text" id="name" placeholder="Nome Completo" defaultValue={name} onBlur={event => setName(event.target.value)}/>
                                <FormInput type="date" id="birthday" placeholder="dd/mm/aaaa" defaultValue={birthday} onBlur={event => setBirthday(event.target.value)}/>
                            <LineDiv>
                                {!id ? 
                                <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>+ Adicionar</Button> : 
                                <Button type="submit" variant="contained" color="primary" onClick={handleConfirmUpdate}>Confirmar Atualização</Button>}
                            </LineDiv>
                        </div>
                    </ColumnDiv>
                </Form>
                <Grid item sm={12}>
                  <Paper className={classes.paper}>
                    <h2>Listagem de Usuários</h2>
                    <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                      <TableContainer component={Paper}>
                        {loading?(<LinearProgress style={{width:'50%', margin:'20px auto'}}  />):(
                          <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                             <TableRow>
                              <TableCell align="left">Avatar</TableCell>
                              <TableCell align="center">ID</TableCell>
                              <TableCell align="center">Nome</TableCell>
                              <TableCell align="center">Data de Nascimento</TableCell>
                              <TableCell align="right"></TableCell>
                             </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((row) => (
                                <TableRow className={classes.list} key={row.id}>
                                    <TableCell align="center"><Avatar alt={row.name} src={row.photo} /></TableCell>
                                    <TableCell align="center">{row.id}</TableCell>
                                    <TableCell align="center" component="th" scope="row">
                                    {row.name}
                                    </TableCell>
                                    <TableCell align="center">{moment(row.birthday).format('DD/MM/YYYY')}</TableCell>
                                    <TableCell align="right">
                                        <ButtonGroup aria-label="outlined primary button group">
                                            <Button variant="contained" color="primary" onClick={() => handleUpdate(row.id)}><AutorenewIcon /> Atualizar</Button>
                                            <Button variant="contained" color="secondary" onClick={() => handleDelete(row.id)}><ClearIcon /></Button>
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                          </Table>)}
                        </TableContainer>
                        </Grid>
                        </Grid>
                    </Paper>
                </Grid>
        </PageContainer>
    );
}

export default Page;