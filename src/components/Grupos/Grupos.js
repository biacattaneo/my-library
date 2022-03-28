function Grupos({title, descricao, qtdeMembros}){
    return(
        <>
        <div className="groupCard">
            <h4>Titulo do grupo {title}</h4>
            <p>Descrição: {descricao}</p>
            <p>Membros: {qtdeMembros}</p>
        </div>
        </>
    )
}

export default Grupos;