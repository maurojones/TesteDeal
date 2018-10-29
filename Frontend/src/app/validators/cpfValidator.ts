import { AbstractControl } from '@angular/forms';

export function CPFValidator(control: AbstractControl) {
    const strCPF = (control.value || '').replace(/[^\d]+/g, '');
    if (strCPF === '') { return { valid: false }; }

    let soma = 0;
    let resto;

    if (strCPF === '00000000000' ||
        strCPF === '11111111111' ||
        strCPF === '22222222222' ||
        strCPF === '33333333333' ||
        strCPF === '44444444444' ||
        strCPF === '55555555555' ||
        strCPF === '66666666666' ||
        strCPF === '77777777777' ||
        strCPF === '88888888888' ||
        strCPF === '99999999999') {
        return { valid: false };
    }

    for (let i = 1; i <= 9; i++) { soma = soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i); }
    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) { resto = 0; }
    // tslint:disable-next-line:radix
    if (resto !== parseInt(strCPF.substring(9, 10))) { return { valid: false }; }

    soma = 0;
    // tslint:disable-next-line:radix
    for (let i = 1; i <= 10; i++) { soma = soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i); }
    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) { resto = 0; }
    // tslint:disable-next-line:radix
    if (resto !== parseInt(strCPF.substring(10, 11))) { return { valid: false }; }

    return null;
}
