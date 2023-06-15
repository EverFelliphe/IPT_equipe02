// Obtém o contêiner do PDF
const container = document.getElementById('pdf-container');

// Caminho para o arquivo PDF
const url = '../Referências/Relatório.pdf';

// Carrega o arquivo PDF
PDFJS.getDocument(url).promise.then(pdf => {
  // Número de páginas do PDF
  const numPages = pdf.numPages;

  // Renderiza a primeira página
  pdf.getPage(1).then(page => {
    const scale = 1.5;
    const viewport = page.getViewport({ scale });

    // Cria um elemento de tela de renderização do PDF
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    container.appendChild(canvas);

    // Renderiza a página no elemento de tela de renderização
    page.render({
      canvasContext: context,
      viewport: viewport
    });
  });
});
