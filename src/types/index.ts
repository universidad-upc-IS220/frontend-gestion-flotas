export const types = {
  login:  '[auth] Login',
  logout:  '[auth] Logout',
}
export interface UnidadProps {
  "nro_placa": string;
  "nro_serie": number,
  "nro_motor": string;
  "color": string;
  "marca": string;
  "modelo": string;
  "estado": Boolean;
  "sede": string;
  "id": string;
}

export interface ChoferProps {
  nombre:           string;
  apellido:         string;
  fecha_nacimiento: number;
  nro_documento:     string;
  telefono:         string;
  email:            string;
  direccion:        string;
  edad:             number;
  estado:           string;
  nro_licencia:     string;
  id:               string;
}


export interface SolicitudesProps {
  id: number;
  estado: string;
  responsable: string;
  fechaModificacion: string;
}

interface GrupoRiesgoProps {
  "id": number;
  "nombre": string;
  "tasa": number;
  "target": boolean;
}
export interface PlazoProps {
  id: number;
  nombre: string;
  gruposRiesgo: GrupoRiesgoProps[];
}

export interface SegmentoProps {
  segmentoId: number;
  segmentoNombre: string;
  plazos: PlazoProps[]
}
