import { useEffect, useState } from "react"
import { API_URL } from "../../config"

function useGetUsers() {
    const [users, setUsers] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const getUsers = async () => {
        try {
            setLoading(true)
            setError(null)

            // 1. Recuperamos el Token que guardamos cuando iniciaste sesión
            const token = sessionStorage.getItem("token")

            // 2. Llamamos a la ruta real protegida: /api/usuarios
            const response = await fetch(`${API_URL}api/usuarios`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // 👈 Le mostramos el pase VIP al servidor
                }
            })

            if (!response.ok) {
                throw new Error(`Error al traer los usuarios, ${response.status}`)
            }

            const data = await response.json()

            // 3. El Adaptador: traducimos de MongoDB a lo que espera la pantalla
            const adaptados = data.map((u) => ({
                id: u._id,
                name: `${u.nombre} ${u.apellido || ""}`.trim(),
                email: u.email,
                role: u.rol,
            }))

            setUsers(adaptados)
        } catch (error) {
            console.error(error)
            setError(error)
            setUsers([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    return { users, error, loading, refetch: getUsers }
}

export default useGetUsers