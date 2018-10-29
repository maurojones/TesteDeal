import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Deal_Cliente } from '../models/deal_cliente';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ClienteService {

    constructor(private http: HttpClient) { }

    getById(id: number): Observable<Deal_Cliente> {
        return this.http.get<Deal_Cliente>(environment.BASE_URL + 'Cliente/' + id);
    }

    getAll(): Observable<Deal_Cliente[]> {
        return this.http.get<Deal_Cliente[]>(environment.BASE_URL + 'Cliente');
    }

    excluir(id: number): Observable<Deal_Cliente> {
        return this.http.delete<Deal_Cliente>(environment.BASE_URL + 'Cliente/' + id);
    }

    salvar(cliente: Deal_Cliente) {
        return this.http.post<boolean>(environment.BASE_URL + 'Cliente', cliente);
    }
}
