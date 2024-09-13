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
