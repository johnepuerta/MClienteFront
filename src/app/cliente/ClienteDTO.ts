import { EmailDTO } from './EmailDTO';
import { FoneDTO } from './FoneDTO';
export class ClientesDTO {
    constructor(
        public id?: number,
        public nome?: string,
        public cpf?: string,
        public cep?: string,
        public logradouro?: string,
        public bairro?: string,
        public cidade?: string,
        public uf?: string,
        public complemento?: string,
        public telefones?: FoneDTO[],
        public emails?: EmailDTO[],
        public version?: number,
    ){
    }
  }