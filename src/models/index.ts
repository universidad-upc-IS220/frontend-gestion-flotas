export const types = {
  login:  '[auth] Login',
  logout:  '[auth] Logout',
}

export interface SolicitudProps {
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
  "tasaDetalleId": number;
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
  solicitudDetalleId: number | null;
}

export interface SolicitudToSendProps {
  estado: string;
  segmentos: SegmentoProps[]
}

// STATES
export interface UserStateProps {
  userId?: string | null;
  userName?: string | null;
  userRoles?: string | null;
  logged: boolean;
}



export interface ChoferProps {
  nombres:            string;
  apellidos:          string;
  fecha_nacimiento:   string;
  nro_documento:      string;
  telefono:           string;
  email:              string;
  direccion:          string;
  nro_licencia:       string;
  estado:             boolean;
  id:                 string;
}

export interface UnidadProps {
  id: string
  marca: string
  modelo: string
  color: string
  kilometraje: string
  estado: boolean
  createdAt: string
  updatedAt: string
  publishedAt: string
  nro_serie: string
}


export interface PapeletaProps {
  entidad: string;
  estadoDeuda: string;
  falta: string;
  fecha: string;
  fechaFirme: string;
  papeleta: string;
  resolucion: string;
  retencionLicencia: string;
  telefonoEntidad: string;
}
