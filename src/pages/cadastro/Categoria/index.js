import React, { useState } from 'react'
import PageDefault from '../../../components/PageDefault'
import { Link } from 'react-router-dom'
import FormField from '../../../components/FormField'
import './Categoria.css'

function CadastroCategoria() {

    const valoresIniciais = {
        nome: '',
        descricao: '',
        cor: '#000'
    }

    const [listaCategorias, setListaCategorias] = useState([])
    const [categoria, setCategoria] = useState(valoresIniciais)


    function setValue(key, value) {
        setCategoria({
            ...categoria,
            [key]: value
        })
    }

    function onChange(ev) {
        const target = ev.target;
        setValue(
            target.getAttribute('name'),
            target.value
        )
    }

    function cadastrarCategoria(e) {
        e.preventDefault();
        setListaCategorias([...listaCategorias, categoria]);
        setCategoria(valoresIniciais);
    }

    return (
        <>
            <PageDefault>
                <div>
                    <h1>Cadastro de Categoria: </h1>
                    <form onSubmit={cadastrarCategoria}>

                        <fieldset>

                            <FormField tag="input" type="text" label="Nome:" value={categoria.nome} name="nome" onChange={onChange} />

                            <FormField tag="textarea" label="Descrição:" value={categoria.descricao} name="descricao" onChange={onChange} />

                            <FormField tag="input" type="color" label="Cor:" value={categoria.cor} name="cor" onChange={onChange} />

                            <input disabled={!(categoria.nome && categoria.descricao)} type="submit" value="Enviar"/>
                        </fieldset>
                    </form>

                    <ul>
                        {listaCategorias.map((categoria, index) => {
                            return (
                                <li style={{ backgroundColor: categoria.cor }} key={index}>
                                    <h2>{categoria.nome}</h2>
                                    <p>{categoria.descricao}</p>

                                </li>
                            )
                        })}
                    </ul>
                    <Link to="/">Ir para o início</Link>
                </div>
            </PageDefault>
        </>
    )
}

export default CadastroCategoria
