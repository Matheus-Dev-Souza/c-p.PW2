## Preparação do Ambiente na AWS

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
6. Clique em **Enviar** e aguarde até que o perfil esteja pronto para uso.

