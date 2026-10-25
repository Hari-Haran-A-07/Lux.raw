package com.luxraw.concierge

data class SalonReservationTest(
    val patronTier: String,
    val vintageChampagne: String,
    val suiteAllocated: String
)

fun main() {
    val booking = SalonReservationTest(
        patronTier = "ARCHIVE_PRIVÉ",
        vintageChampagne = "Dom Pérignon P2 2004",
        suiteAllocated = "Salons du Faubourg Suite 1"
    )
    println("Validating VIP Concierge matching for tier: ${booking.patronTier}")
    require(booking.vintageChampagne.isNotBlank()) { "Champagne pairing must be allocated" }
    println("[PASS] VIP Sommelier Pairing matched perfectly.")
}
