
export interface FiltroSinafip {
    status?: string, // puede ser 'CREADA' || 'ENVIADA' || 'CALIFICADA' 
    result?: string, // puede ser 'ADMITIDA' || 'NO ADMITIDA' 
    institucionId?: string,
    author?: string,
}
