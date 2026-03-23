import { useEffect, useState } from "react"
import type { CivGameData } from "../types/civ"
import { getGameData } from "../services/civ-service"

export const useCivData = (filename: string) => {
    const [data, setData] = useState<CivGameData | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const result = await getGameData(filename)
                setData(result)
                setError(null)
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message)
                } else {
                    setError(String(err) || "Error al cargar los datos")
                }
            } finally {
                setLoading(false)
            }
        }

        if (filename) {
            fetchData()
        }
    }, [filename])

    return { data, loading, error }
}