import {ValidationError} from 'yup';
import { string } from 'yup/lib/locale';

// import { Container } from './styles';

interface Errors{
    [key:string]:string;
}
export default function GetvalidationErrors(err:ValidationError):Errors{
    const validationerros:Errors = {};

    err.inner.forEach(error =>{
        validationerros[error.path!]=error.message;
    });
     return validationerros;

}