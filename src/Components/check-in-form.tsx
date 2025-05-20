import type React from "react"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Search } from "lucide-react"

export function CheckInForm() {
  const [bookingCode, setBookingCode] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle check-in logic here
    console.log("Checking in booking:", bookingCode)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="booking-code">Mã đặt sân</Label>
        <div className="flex gap-2">
          <Input
            id="booking-code"
            placeholder="Nhập mã đặt sân"
            value={bookingCode}
            onChange={(e) => setBookingCode(e.target.value)}
          />
          <Button type="submit" disabled={!bookingCode}>
            <Search className="mr-2 h-4 w-4" />
            Tìm
          </Button>
        </div>
      </div>
    </form>
  )
}
