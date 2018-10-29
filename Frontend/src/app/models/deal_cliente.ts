import { Deal_ClienteEmail } from './deal_clienteemail';
import { Deal_ClienteEndereco } from './deal_clienteendereco';
import { Deal_ClienteSocio } from './deal_clientesocio';
import { Deal_ClienteTelefone } from './deal_clientetelefone';

// tslint:disable-next-line:class-name
export class Deal_Cliente {
    Id: number;
    Nome: string;
    CNPJ: string;

    Deal_ClienteEmail: Deal_ClienteEmail[];
    Deal_ClienteEndereco: Deal_ClienteEndereco[];
    Deal_ClienteSocio: Deal_ClienteSocio[];
    Deal_ClienteTelefone: Deal_ClienteTelefone[];
}
