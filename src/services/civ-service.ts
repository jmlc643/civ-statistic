import type { CivGameData } from "../types/civ"

const BASE_URL = '/data'

export const getGameData = async (filename: string): Promise<CivGameData> => {
    try {
        const response = await fetch(`${BASE_URL}/${filename}`)
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`)
        }
        return await response.json()
    } catch (error) {
        console.error(`Error al obtener los datos del juego: ${error}`)
        throw error
    }
}