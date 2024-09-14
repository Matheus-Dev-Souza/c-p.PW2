
<h1 align="center">Hotel Reservation Price Classification API</h1>

<p align="center">Este projeto faz parte das sprints 4 e 5 do Programa de Bolsas Compass UOL, onde desenvolvemos um modelo de machine learning para classificar faixas de preços de reservas de hotel e implementamos uma API para realizar inferências utilizando o modelo treinado.</p>

<hr>

![Python]
![FastAPI]
![Docker]
![AWS]
![PostgreSQL]

<p align="center">
  <a href="#about">Sobre</a> • • 
  <a href="#functionalities">Funcionalidades</a> • • 
  <a href="#start">Começando</a> • • 
  <a href="#usage">Como Usar</a> • • 
  <a href="#difficulties">Dificuldades Conhecidas</a> • • 
  <a href="#contributors">Colaboradores</a>
</p>

<h2 id="about">📝Sobre</h2>
Este projeto tem como objetivo treinar um modelo de machine learning para classificar reservas de hotel em três faixas de preços, utilizando o dataset "Hotel Reservations". O modelo foi treinado com o AWS SageMaker e a API desenvolvida com FastAPI permite que os usuários enviem dados de reservas e recebam a faixa de preço correspondente.

A API expõe um endpoint `/api/v1/inference` para realizar inferências com o modelo salvo no S3.

<h2 id="functionalities">📌 Funcionalidades</h2>
<ul>
  <li>Treinamento do modelo de machine learning no AWS SageMaker com dados armazenados no AWS RDS.</li>
  <li>Armazenamento do modelo treinado no S3.</li>
  <li>API FastAPI para realizar inferências com o modelo.</li>
  <li>Deploy completo na AWS utilizando Docker.</li>
</ul>

<h2 id="technologies">⚙️Tecnologias Utilizadas</h2>
<h3>Back-end</h3>
<ul>
  <li>Python</li>
  <li>FastAPI</li>
  <li>Docker</li>
  <li>AWS (SageMaker, S3, RDS)</li>
  <li>PostgreSQL para armazenamento do dataset</li>
</ul>

<h2 id="inicio">🚀 Começando</h2>

<h3>Pré-requisitos</h3>
Antes de usar a aplicação, é necessário preparar o ambiente na AWS. Siga os passos abaixo:

### Passo 1: Criar 2 VPCs
1. Acesse o console de gerenciamento da AWS.
2. Navegue até a seção **VPC**.
3. Crie duas VPCs com as seguintes configurações:
   - **VPC 1**:
     - Nome: `vpc-sprint-5`
     - CIDR IPv4: `10.0.0.0/16`
   - **VPC 2**:
     - Nome: `vpc-banco01`
     - CIDR IPv4: `172.31.0.0/16`
4. Certifique-se de que ambas as VPCs estejam no estado "Available".

### Passo 2: Criar 2 Subnets
1. Ainda na seção **VPC**, selecione a VPC desejada.
2. Navegue até a opção **Subnets** e clique em **Create Subnet**.
3. Crie duas subnets com as seguintes configurações:
   - **Subnet 1**:
     - Nome: `subnet-public`
     - VPC: `vpc-sprint-5`
     - CIDR IPv4: `10.0.1.0/24`
   - **Subnet 2**:
     - Nome: `subnet-private`
     - VPC: `vpc-banco01`
     - CIDR IPv4: `172.31.1.0/24`
4. Certifique-se de que ambas as subnets estejam no estado "Available".

### Passo 3: Criar um Domínio no SageMaker
1. Acesse o console de gerenciamento da AWS.
2. Navegue até a seção **SageMaker**.
3. No menu à esquerda, selecione **Studio** e depois **Domínios**.
4. Clique em **Criar domínio**.
5. Preencha as informações necessárias, como nome do domínio e configurações de rede.
6. Clique em **Criar** e aguarde até que o status do domínio esteja "Pronto".

### Passo 4: Criar um Perfil de Usuário para o Studio
1. No console do SageMaker, vá até a seção **Studio**.
2. Selecione o domínio que você criou anteriormente.
3. Clique em **Perfis de usuário**.
4. Clique em **Adicionar usuário**.
5. Preencha as informações necessárias, como nome do usuário e permissões.
6. Clique em **Criar** e aguarde até que o perfil esteja pronto para uso.

### Passo 5: Criar um Espaço no Jupyter
1. No console do SageMaker, vá até a seção **Studio**.
2. Selecione o perfil de usuário que você criou anteriormente.
3. Clique em **Iniciar Studio**.
4. No ambiente do Studio, clique em **File** > **New** > **Notebook**.
5. Escolha a instância de computação e o kernel desejado para o seu notebook.
6. Clique em **Enviar** para criar o espaço no Jupyter.

### 📌 Passo a Passo: Criação de um RDS com PostgreSQL

1. **Acesse o Console da AWS**:
   - Navegue até o console de gerenciamento da AWS e faça login com suas credenciais.

2. **Navegue até o RDS**:
   - No painel principal, procure e clique na opção **RDS** (Relational Database Service).

3. **Criar uma Instância de Banco de Dados**:
   - No painel do RDS, clique em **Create database**.
   
4. **Escolher o Modo de Criação**:
   - Selecione **Standard Create** para obter mais opções de configuração.

5. **Selecione o Mecanismo do Banco de Dados**:
   - Em **Engine options**, selecione **PostgreSQL** como o mecanismo do banco de dados.

6. **Defina a Versão do PostgreSQL**:
   - Escolha a versão desejada do PostgreSQL (recomenda-se utilizar a versão mais recente compatível com seu sistema).

7. **Configurações da Instância**:
   - Escolha o tipo de instância que atenda às suas necessidades (por exemplo, `db.t3.micro` para uma opção de uso gratuito).
   - Defina o nome da instância do banco de dados no campo **DB instance identifier** (Ex: `my-postgresql-db`).

8. **Configurar Autenticação de Usuário**:
   - Defina um **master username** (nome de usuário principal do banco de dados).
   - Defina e confirme a senha do usuário principal.

9. **Configurações de Rede**:
   - Em **Connectivity**, selecione a VPC desejada para hospedar seu banco de dados.
   - Caso queira que o banco seja acessível pela internet, habilite a opção **Public access**.

10. **Configurações de Armazenamento**:
    - Defina o tamanho do armazenamento de acordo com as necessidades do projeto (o mínimo recomendado pode ser 20 GB para testes).

11. **Criptografia e Backups**:
    - Habilite backups automáticos e selecione o período de retenção desejado.

12. **Finalizar Criação**:
    - Revise as configurações e clique em **Create database**.
    - Aguarde até que o status do RDS esteja como **Available**.

13. **Conectar-se ao Banco de Dados**:
    - Após a criação, você verá os detalhes da conexão, incluindo o endpoint do banco de dados, que será usado para se conectar a ele. Use o cliente PostgreSQL (como pgAdmin ou o terminal) para se conectar usando o endpoint, nome de usuário e senha definidos.

---

### 📌 Passo a Passo: Criação de um Bucket no S3

1. **Acesse o Console da AWS**:
   - Acesse o console de gerenciamento da AWS e faça login com suas credenciais.

2. **Navegue até o Amazon S3**:
   - No painel principal, pesquise por **S3** e clique para abrir o serviço de armazenamento S3.

3. **Criar um Novo Bucket**:
   - No painel do S3, clique em **Create bucket**.

4. **Configurar o Nome e a Região do Bucket**:
   - Em **Bucket name**, insira um nome exclusivo para o bucket (por exemplo, `my-s3-bucket-projeto`).
   - Selecione a **região da AWS** onde o bucket será criado. Certifique-se de escolher a região mais próxima para reduzir latência e custos.

5. **Configurações de Permissões**:
   - Por padrão, os buckets são privados. Se quiser alterar as permissões, você pode modificar as políticas para acesso público ou configurar permissões específicas mais tarde.
   - Caso o bucket deva ser público (exemplo, para armazenar arquivos acessíveis pela web), desmarque a opção de bloquear todo o acesso público e configure permissões adequadas.

6. **Configurar Criptografia (Opcional)**:
   - Você pode habilitar a **Server-side encryption** para garantir que os arquivos sejam criptografados automaticamente quando armazenados no bucket.

7. **Configurações Avançadas (Opcional)**:
   - Caso necessário, você pode habilitar o **Versioning** (controle de versões) para que o bucket armazene múltiplas versões dos mesmos arquivos, ou **Logging** para registrar acessos ao bucket.

8. **Criar o Bucket**:
   - Após definir as configurações, clique em **Create bucket**.
   - Seu bucket será criado e estará pronto para uso.

9. **Upload de Arquivos**:
   - Para fazer upload de arquivos, navegue até o bucket recém-criado e clique em **Upload**.
   - Selecione os arquivos do seu computador e clique em **Upload**.

10. **Configurar Políticas de Acesso (Opcional)**:
   - Para definir permissões e acessos ao bucket, navegue até a aba **Permissions** do bucket.
   - Lá você pode configurar políticas de bucket, definir controle de acesso granular, e gerenciar permissões públicas ou privadas.

<h3>Deploy da API</h3>
<p>Como clonar o projeto:</p>

<ol type="1">
  <li>Abra o terminal.</li>
  <li>Digite o seguinte comando:</li>
</ol>

```bash
git clone --branch grupo-4 --single-branch https://github.com/Compass-pb-aws-2024-JULHO-A/sprints-4-5-pb-aws-julho-a.git
```

<ol start="3" type="1">
  <li>Acesse o diretório do projeto:</li>
</ol>

```bash
cd nome-do-projeto
```

<ol start="4" type="1">
  <li>Usar o docker:</li>
</ol>

```bash
docker compose up
```

<p>Agora sua API estará rodando localmente em http://localhost:8000</p>

<h2 id="usage">💻 Como Usar</h2>
<p>Para realizar uma inferência, envie uma requisição POST para <code>/api/v1/inference</code> com um JSON contendo os dados de entrada:</p>

```json
{
    "no_of_adults": 2,
    "no_of_children": 1,
    "type_of_meal_plan": "Meal Plan 1",
    "required_car_parking_space": 0,
    "room_type_reserved": "Room_Type 1",
    "lead_time": 50
}
```

<h2 id="difficulties">❗ Dificuldades Conhecidas</h2>
<ul>
  <li>Configuração inicial do ambiente AWS para integrar todos os serviços.</li>
  <li>Garantir a escalabilidade do serviço para um volume maior de inferências.</li>
  <li>Treinamento do modelo de machine learning</li>
  <li>Comunicação e planejamento</li>
</ul>

<h2 id="liçoes aprendidas">❗ liçoes aprendidas</h2>
<ul>
  <li>Importância do planejamento colaborativo</li>
  <li>Gestão eficiente de tempo</li>
  <li>Comunicação constante e transparente</li>
  <li>Integração de múltiplos serviços na AWS</li>
  <li>Versão e controle do código com Git</li>
  
</ul>


<h2 id="contributors">🤝 Colaboradores</h2>

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/carlosrodrigues07">
        <img src="https://avatars.githubusercontent.com/u/127802040?v=4" width="120" alt="Carlos Henrique Rodrigues" style="border-radius: 50%;">
      </a>
      <p><strong>Carlos Henrique</strong></p>
      <a href="https://github.com/carlosrodrigues07">Perfil no GitHub</a>
    </td>
    <td align="center">
      <a href="https://github.com/Matheus-Dev-Souza">
        <img src="https://avatars.githubusercontent.com/u/96189442?v=4" width="120" alt="Matheus Souza" style="border-radius: 50%;">
      </a>
      <p><strong>Matheus Souza</strong></p>
      <a href="https://github.com/Matheus-Dev-Souza">Perfil no GitHub</a>
    </td>
    <td align="center">
      <a href="https://github.com/RenanLM">
        <img src="https://avatars.githubusercontent.com/u/99264208?v=4" width="120" alt="Renan Lucas" style="border-radius: 50%;">
      </a>
      <p><strong>Renan Lucas</strong></p>
      <a href="https://github.com/RenanLM">Perfil no GitHub</a>
    </td>
    <td align="center">
      <a href="https://github.com/FrancinildoAlves">
        <img src="https://avatars.githubusercontent.com/u/150152699?v=4 "width="120" alt="Francinildo Alves" style="border-radius: 50%;">
      </a>
      <p><strong>Francinildo Alves</strong></p>
      <a href="https://github.com/FrancinildoAlves">Perfil no GitHub</a>
    </td>
  </tr>
</table>

