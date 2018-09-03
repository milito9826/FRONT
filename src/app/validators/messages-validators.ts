export const ERROR_DEFS = {
    usuario: {
        required: 'Este campo es requerido'
      },

    motel : {
        required: 'Este campo es requerido'
    }  
}


import { FormGroup } from '@angular/forms';
 
export class claveValidator {
    
    static validate(claveFormGroup: FormGroup) {
        let claveUsuario = claveFormGroup.get("claveUsuario").value==null?"":claveFormGroup.get("claveUsuario").value;
        let cclaveUsuario = claveFormGroup.get("cclaveUsuario").value==null?"":claveFormGroup.get("cclaveUsuario").value;
 
        if (cclaveUsuario.length <= 0) {
            return null;
        }
 
        if (cclaveUsuario !== claveUsuario) {
            return {
                claveNot: true
            };
        }
 
        return null;
     }
}

export class correoValidator {
    
    static validate(correoFormGroup: FormGroup) {
        let correoUsuario = correoFormGroup.get("correoUsuario").value==null?"":correoFormGroup.get("correoUsuario").value;
        let ccorreoUsuario = correoFormGroup.get("ccorreoUsuario").value==null?"":correoFormGroup.get("ccorreoUsuario").value;
 
        if (ccorreoUsuario.length <= 0) {
            return null;
        }
 
        if (ccorreoUsuario !== correoUsuario) {
            return {
                correoNot: true
            };
        }
 
        return null;
     }
}