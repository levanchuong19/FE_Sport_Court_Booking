import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

export function BookingChart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const data = [
    { name: "T2", bookings: 40 },
    { name: "T3", bookings: 30 },
    { name: "T4", bookings: 45 },
    { name: "T5", bookings: 50 },
    { name: "T6", bookings: 65 },
    { name: "T7", bookings: 75 },
    { name: "CN", bookings: 55 },
  ]

  if (!mounted) return null

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip />
          <Bar dataKey="bookings" fill="#22c55e" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
