import pactum from 'pactum';
import { SimpleReporter } from '../simple-reporter';
import { faker } from '@faker-js/faker';
import { StatusCodes } from 'http-status-codes';

describe('Company API', () => {
  const companyName = faker.company.name();
  const cnpj = faker.string.numeric(14);
  const state = faker.location.state();
  const city = faker.location.city();
  const address = faker.location.streetAddress();
  const sector = faker.commerce.department();
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://api-desafio-qa.onrender.com/company';

  p.request.setDefaultTimeout(90000);

  beforeAll(async () => {
    p.reporter.add(rep);
  });

  describe('Criação de Empresa', () => {
    it('deve criar uma nova empresa com nome, CNPJ, estado, cidade, endereço e setor', async () => {
      await p
        .spec()
        .post(baseUrl)
        .withJson({
          name: companyName,
          cnpj: cnpj,
          state: state,
          city: city,
          address: address,
          sector: sector
        })
        .expectStatus(StatusCodes.CREATED)
        .expectJsonLike({
          name: companyName,
          cnpj: cnpj,
          state: state,
          city: city,
          address: address,
          sector: sector
        });
    });
  });

  afterAll(() => p.reporter.end());
});
