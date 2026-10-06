package com.luxraw.concierge

import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.plugins.cors.routing.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put

fun main() {
    val bookingService = SalonBookingService()

    println("📱 [Kotlin VIP Concierge] Active on port 8086")
    embeddedServer(Netty, port = 8086) {
        install(ContentNegotiation) {
            json()
        }
        install(CORS) {
            anyHost()
            allowHeader(HttpHeaders.ContentType)
            allowMethod(HttpMethod.Options)
            allowMethod(HttpMethod.Post)
            allowMethod(HttpMethod.Get)
        }
        routing {
            get("/api/v1/concierge/health") {
                call.respond(buildJsonObject {
                    put("service", "luxury.Raw Kotlin VIP Concierge & Omnichannel Salon Engine")
                    put("language", "Kotlin 1.9 / Ktor Netty")
                    put("status", "HEALTHY")
                    put("concurrencyModel", "Kotlin Coroutines & Flow")
                    put("activeSuites", 5)
                })
            }

            post("/api/v1/concierge/book") {
                val req = call.receive<SalonAppointmentRequest>()
                val confirmation = bookingService.scheduleAppointment(req)
                call.respond(HttpStatusCode.Created, confirmation)
            }
        }
    }.start(wait = true)
}
