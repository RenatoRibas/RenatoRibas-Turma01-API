import pactum from 'pactum';
import { faker } from '@faker-js/faker';
import { StatusCodes } from 'http-status-codes';

describe('Company API', () => {
  const baseUrl = 'https://api-desafio-qa.onrender.com/company';
  const existingCompanyId = '25';

  const updatedData = {
    name: faker.company.name(),
    cnpj: faker.string.numeric(14),
    state: faker.location.state(),
    city: faker.location.city(),
    address: faker.location.streetAddress(),
    sector: faker.commerce.department()
  };

  describe('Atualização de Empresa', () => {
    it('deve atualizar os detalhes de uma empresa específica', async () => {
      await pactum
        .spec()
        .put(`${baseUrl}/${existingCompanyId}`)
        .withJson(updatedData)
        .expectStatus(StatusCodes.OK)
        .expectJsonLike({
          name: updatedData.name,
          cnpj: updatedData.cnpj,
          state: updatedData.state,
          city: updatedData.city,
          address: updatedData.address,
          sector: updatedData.sector
        });
    });

    it('deve retornar 404 se a empresa não for encontrada', async () => {
      const nonExistentId = 'non-existent-id';
      await pactum
        .spec()
        .put(`${baseUrl}/${nonExistentId}`)
        .withJson(updatedData)
        .expectStatus(StatusCodes.NOT_FOUND)
        .expectJson({ message: 'Empresa não encontrada' });
    });

    it('deve retornar 400 se dados inválidos forem fornecidos', async () => {
      const invalidData = { ...updatedData, cnpj: 'invalid-cnpj' };
      await pactum
        .spec()
        .put(`${baseUrl}/${existingCompanyId}`) 
        .withJson(invalidData)
        .expectStatus(StatusCodes.BAD_REQUEST)
        .expectJson({ message: 'Dados inválidos fornecidos' });
    });
  });
});
