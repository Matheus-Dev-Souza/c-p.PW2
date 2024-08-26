// Função para exibir respostas formatadas
function displayResponse(elementId, message, isError = false) {
  const element = document.getElementById(elementId);
  element.innerText = message;
  element.style.color = isError ? 'red' : 'black'; // Exibe erros em vermelho
}

// Evento de cadastro de placa
document.getElementById('cadastroPlacaForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const fotoInput = document.getElementById('foto');
  const cidadeInput = document.getElementById('cidade');

  if (!fotoInput.files[0] || !cidadeInput.value) {
    displayResponse('cadastroResponse', 'Preencha todos os campos.', true);
    return;
  }

  const formData = new FormData();
  formData.append('foto', fotoInput.files[0]);
  formData.append('cidade', cidadeInput.value);

  try {
    const response = await fetch('/cadastroPlaca', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    if (response.ok) {
      displayResponse('cadastroResponse', 'Placa cadastrada com sucesso!');
    } else {
      displayResponse('cadastroResponse', data.error, true);
    }
  } catch (error) {
    displayResponse('cadastroResponse', 'Erro ao cadastrar placa.', true);
  }
});

// Evento de consulta de placa
document.getElementById('consultaPlacaForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const placa = document.getElementById('placa').value;

  if (!placa) {
    displayResponse('consultaResponse', 'Informe a placa.', true);
    return;
  }

  try {
    const response = await fetch(`/consulta/${encodeURIComponent(placa)}`, {
      method: 'GET',
    });
    const data = await response.json();
    if (response.ok) {
      displayResponse('consultaResponse', `Placa: ${data.placa}, Cidade: ${data.cidade}, Data: ${new Date(data.data).toLocaleString()}`);
    } else {
      displayResponse('consultaResponse', data.error, true);
    }
  } catch (error) {
    displayResponse('consultaResponse', 'Erro ao consultar placa.', true);
  }
});

// Evento de gerar relatório por cidade
document.getElementById('relatorioCidadeForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const cidade = document.getElementById('cidadeRelatorio').value;

  if (!cidade) {
    displayResponse('relatorioResponse', 'Informe a cidade.', true);
    return;
  }

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
      displayResponse('relatorioResponse', data.error, true);
    }
  } catch (error) {
    displayResponse('relatorioResponse', 'Erro ao gerar relatório.', true);
  }
});
