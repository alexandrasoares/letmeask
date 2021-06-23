/* CRIAÇÃO DE COMPONENTE GENÉRICO, CRIAMOS O BUTTON UTILIZANDO O TIPO BUTTON HTML 
ATRIBUTES QUE FORNECE TODOS OS ATRIBUTOS DE TAG HTML. */

import { ButtonHTMLAttributes } from 'react';

import '../styles/componentes-style/button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
    return (
        <button className="button-primary" {...props} />
    )
}