"use client"

import { useState, useEffect } from "react"
import { api, type Donation } from "@/lib/api"

export function useDonations(filters?: any) {
  const [donations, setDonations] = useState<Donation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        setLoading(true)
        const data = await api.getDonations(filters)
        setDonations(data)
        console.log("[v0] Fetched donations:", data.length)
      } catch (err) {
        setError("Failed to fetch donations")
        console.error("[v0] Error fetching donations:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchDonations()
  }, [filters])

  const createDonation = async (donationData: Partial<Donation>) => {
    try {
      const newDonation = await api.createDonation(donationData)
      setDonations((prev) => [newDonation, ...prev])
      console.log("[v0] Created donation:", newDonation.title)
      return newDonation
    } catch (err) {
      console.error("[v0] Error creating donation:", err)
      throw err
    }
  }

  return {
    donations,
    loading,
    error,
    createDonation,
    refetch: () => {
      setLoading(true)
      // Refetch logic would go here
    },
  }
}
