export interface Usuario {
    documentoUsuario: String;
    nombreUsuario: String;
    apellidoUsuario: String;
    correoUsuario: String;
    claveUsuario: String ;
    perfilUsuario: String; 
    estadoUsuario: Boolean;
}

export interface LoginUsuario {
    correoUsuario: String;
    claveUsuario: String;
}