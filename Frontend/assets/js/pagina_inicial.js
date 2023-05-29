$(document).ready(function(){
    //quando carrega o documento ele pega o parametro user_id da url que identifica o user
    const url = new URL(window.location.href);
    const parametro = url.searchParams.get('user_id');
    //faz uma requisição à api que responde os relatórios pertencentes ao usuario logado
    $.get(`/projeto/relatorio?id_empresa=${parametro}`,function(data,status){
        let i = 1
        /* para cada relatório encontrado ele cria uma celula contendo um link com o href redirecionando
        para a pagina de relatórios enviando o id do relatório selecionado
        */
        data.forEach(value =>{
            
            $('#lista_projetos').append(` <tr>
            <td  class="border   border-black" style="border-radius:24px;"><a href="/relatorio?id_relatorio=${value.id}" class="navbar-brand ms-3">Projeto ${i}
    </td>
    
            </tr>`)
            i++
        })
    })
})