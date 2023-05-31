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
            
            $('#lista_projetos').append(`
            <li   class=" w-100 list-unstyled btn d-flex align-items-center "  style="box-shadow:  26px 26px 51px #c2c2c2;
            8px 8px 21px #ffffff;;border-radius:12px;background-color:#fafafa;height:52px ; margin-bottom:-12px;" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="This top tooltip is themed via CSS variables."><a href="/relatorio?id_relatorio=${value.id}" style="font-size:16px;" class="navbar-brand ibm ms-3">PROJETO ${i}
    </li>   
    
            `)
            i++
        })
    })
})