// Função para exibir respostas
function displayResponse(elementId, message) {
    document.getElementById(elementId).innerText = message;
  }
  
  // Evento de cadastro de placa
  document.getElementById('cadastroPlacaForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('foto', document.getElementById('foto').files[0]);
    formData.append('cidade', document.getElementById('cidade').value);
  
    try {
      const response = await fetch('/cadastroPlaca', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      displayResponse('cadastroResponse', JSON.stringify(data));
    } catch (error) {
      displayResponse('cadastroResponse', 'Erro ao cadastrar placa.');
    }
  });
  
  // Evento de consulta de placa
  document.getElementById('consultaPlacaForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const placa = document.getElementById('placa').value;
  
    try {
      const response = await fetch(`/consulta/${placa}`, {
        method: 'GET',
      });
      const data = await response.json();
      if (data.error) {
        displayResponse('consultaResponse', data.error);
      } else {
        displayResponse('consultaResponse', JSON.stringify(data));
      }
    } catch (error) {
      displayResponse('consultaResponse', 'Erro ao consultar placa.');
    }
  });
  
  // Evento de gerar relatório por cidade
  document.getElementById('relatorioCidadeForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const cidade = document.getElementById('cidadeRelatorio').value;
  
    try {
      const response = await fetch(`/relatorio/cidade/${cidade}`, {
        method: 'GET',
      });
  
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `relatorio-${cidade}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        const data = await response.json();
        displayResponse('relatorioResponse', data.error);
      }
    } catch (error) {
      displayResponse('relatorioResponse', 'Erro ao gerar relatório.');
    }
  });
  