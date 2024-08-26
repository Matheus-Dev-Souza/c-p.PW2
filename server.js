require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const Tesseract = require('tesseract.js');
const PDFDocument = require('pdfkit');

const app = express();

// Conectando ao MongoDB
const mongoUri = process.env.MONGODB_URI;
mongoose.connect(mongoUri)
    .then(() => console.log('Conectado ao MongoDB'))
    .catch((error) => console.error('Erro ao conectar ao MongoDB:', error));

// Middleware para upload de arquivos
app.use(fileUpload());

// Configurar para servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Modelo do MongoDB
const Placa = mongoose.model('Placa', new mongoose.Schema({
    placa: String,
    cidade: String,
    data: { type: Date, default: Date.now }
}));

// Função para reconhecer placa usando Tesseract
async function reconhecerPlaca(filePath) {
    try {
        const { data: { text } } = await Tesseract.recognize(filePath, 'eng');
        console.log('Texto reconhecido:', text.trim());
        return text.trim();
    } catch (error) {
        console.error('Erro ao usar Tesseract OCR:', error);
        return null;
    }
}

// Rota POST para cadastro de placa
app.post('/cadastroPlaca', async (req, res) => {
    console.log('Requisição recebida em /cadastroPlaca');
    console.log('Arquivos recebidos:', req.files);
    console.log('Dados do corpo:', req.body);

    const foto = req.files?.foto;
    const { cidade } = req.body;

    if (!foto) {
        console.error('Erro: Nenhum arquivo de foto encontrado');
        return res.status(400).json({ error: 'Arquivo de foto é necessário' });
    }

    console.log('Cidade:', cidade);
    console.log('Nome do arquivo da foto:', foto.name);

    const uploadDir = path.join(__dirname, 'public', 'uploads');
    const fotoPath = path.join(uploadDir, foto.name);

    // Verifica se o diretório existe, se não, cria
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    await foto.mv(fotoPath);

    try {
        const placa = await reconhecerPlaca(fotoPath);
        if (!placa) {
            console.error('Erro: Placa não reconhecida');
            return res.status(400).json({ error: 'Placa não reconhecida' });
        }

        const novoRegistro = new Placa({ placa, cidade });
        await novoRegistro.save();

        console.log('Registro salvo no banco de dados:', novoRegistro);
        res.json(novoRegistro);
    } catch (error) {
        console.error('Erro ao processar a imagem:', error);
        res.status(500).json({ error: 'Erro ao processar a imagem' });
    } finally {
        fs.unlinkSync(fotoPath);
    }
});

// Rota GET para gerar relatório em PDF por cidade
app.get('/relatorio/cidade/:cidade', async (req, res) => {
    const { cidade } = req.params;
    const registros = await Placa.find({ cidade });

    if (registros.length === 0) {
        return res.status(404).json({ error: 'Nenhum registro encontrado para essa cidade' });
    }

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=relatorio-${cidade}.pdf`);

    doc.pipe(res);
    doc.fontSize(18).text(`Relatório de Placas - Cidade: ${cidade}`, { align: 'center' });
    doc.moveDown();

    registros.forEach(registro => {
        doc.fontSize(12).text(`Placa: ${registro.placa}`);
        doc.text(`Cidade: ${registro.cidade}`);
        doc.text(`Data e Hora: ${registro.data}`);
        doc.moveDown();
    });

    doc.end();
});

// Rota GET para consultar uma placa específica
app.get('/consulta/:placa', async (req, res) => {
    const { placa } = req.params;
    const registro = await Placa.findOne({ placa });

    if (!registro) {
        return res.status(404).json({ error: 'Placa não encontrada' });
    }

    res.json(registro);
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
