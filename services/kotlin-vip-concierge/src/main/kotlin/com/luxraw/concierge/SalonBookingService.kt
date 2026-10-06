package com.luxraw.concierge

import kotlinx.serialization.Serializable
import java.time.Instant
import java.util.UUID

@Serializable
data class SalonAppointmentRequest(
    val clientName: String,
    val clientEmail: String,
    val boutiqueCity: String, // "Paris", "Milan", "New York", "Tokyo", "London"
    val preferredDate: String,
    val timeSlot: String,
    val champagnePreference: String = "Dom Pérignon Vintage",
    val requestedCategoryFocus: String = "Haute Couture & Made-to-Measure"
)

@Serializable
data class SalonAppointmentConfirmation(
    val appointmentId: String,
    val clientName: String,
    val boutiqueLocation: String,
    val date: String,
    val timeSlot: String,
    val privateSuite: String,
    val dedicatedStylist: String,
    val status: String,
    val hospitalityPackage: String,
    val confirmedAt: String
)

class SalonBookingService {
    private val stylistsByCity = mapOf(
        "Paris" to "Éléonore de Saint-Germain (Senior Haute Couture Director)",
        "Milan" to "Matteo Visconti (Maestro Sartoriale)",
        "New York" to "Julian Vance (Private Salon Director)",
        "Tokyo" to "Kenji Takahashi (Atelier Master)",
        "London" to "Alistair Montgomery (Bespoke Director)"
    )

    private val suitesByCity = mapOf(
        "Paris" to "The Vendôme Obsidian Suite",
        "Milan" to "The Via Montenapoleone Marble Salon",
        "New York" to "The Madison Penthouse Atelier",
        "Tokyo" to "The Ginza Zen Monolith Pavilion",
        "London" to "The New Bond Street Private Vault"
    )

    fun scheduleAppointment(req: SalonAppointmentRequest): SalonAppointmentConfirmation {
        val stylist = stylistsByCity[req.boutiqueCity] ?: "Maison Senior Concierge"
        val suite = suitesByCity[req.boutiqueCity] ?: "Private VIP Salon Suite"
        val appointmentId = "VIP-SALON-${UUID.randomUUID().toString().take(8).uppercase()}"

        return SalonAppointmentConfirmation(
            appointmentId = appointmentId,
            clientName = req.clientName,
            boutiqueLocation = "${req.boutiqueCity} Flagship Maison",
            date = req.preferredDate,
            timeSlot = req.timeSlot,
            privateSuite = suite,
            dedicatedStylist = stylist,
            status = "CONFIRMED_WHITE_GLOVE",
            hospitalityPackage = "Bespoke Fitting + ${req.champagnePreference} + Private Atelier Access",
            confirmedAt = Instant.now().toString()
        )
    }
}
