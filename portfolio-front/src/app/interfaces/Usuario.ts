export interface Usuario {
    id?: number;
    nombre: string;
    apellido: string;
    descripcion: string;
    edad: number;
    localidad: string;
    picUrl: string;
    provincia: string;
    profilePicUrl: string;
    email: string;
    facebook?: string | null;
    github: string;
    instagram?: string | null;
    linkedin: string;
    telefono: string;
    twitter?: string | null;
}

export interface Provincia {
    id?: number;
    nombre: string;
}
