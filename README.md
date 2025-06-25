# Acervo - Jardim Botânico de Santa Maria

Repositório do acervo de plantas do JBSM, bem como página inicial do website. Projeto desenvolvido durante a disciplina de Práticas Extensionistas na Educação em Computação (UFSM00759), com a orientação da professora Andrea Schwertner Charão.

## Recursos implementados
- Roteamento de páginas baseado no ID do espécime cadastrado no QR Code da placa de identificação (```https://jbsm.ifm.ufsm.br/acervo/item/XXXX```);
- Páginas de cada espécime com dados como nome popular, nome científico, família, origem, localização, detalhes e fotos
- Carregamento dinâmico de dados da planilha base ao carregar qualquer página do site
- Carregamento de imagens otimizadas para velocidade de exibição (fotos com maior definição são carregadas apenas quando abertas individualmente)
- Página inicial do website com links para outros projetos relacionados

## Configuração do site

O website foi criado utilizando Vite + Vue 3 no Visual Studio Code.

## Base de dados

A descrição e informações de cada planta estão armazenados [nesta planilha](https://docs.google.com/spreadsheets/d/1jxPq1Pj7szd6Cw3uQq1l9N6iFCEAeLUR1bh978gJF9g). As fotos das plantas e *assets* do website estão armazenadas neste repositório.
