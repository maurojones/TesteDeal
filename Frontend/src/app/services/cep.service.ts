import { Deal_ClienteEndereco } from './../models/deal_clienteendereco';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CEPService {

    constructor(private http: HttpClient) { }

    get(cep: string): Observable<Deal_ClienteEndereco> {
        return this.http.get<Deal_ClienteEndereco>(environment.BASE_URL + 'CEP?cep=' + cep);
    }
}
