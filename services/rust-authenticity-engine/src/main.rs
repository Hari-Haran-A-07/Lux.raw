mod authenticity;
mod fitting_solver;

use actix_cors::Cors;
use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};
use authenticity::{AuthenticityVerifier, DigitalPassportRequest};
use fitting_solver::{BodyMeasurements, FittingSolver};
use serde_json::json;

#[get("/api/v1/rust/health")]
async fn health() -> impl Responder {
    HttpResponse::Ok().json(json!({
        "service": "luxury.Raw Rust Cryptographic Authenticity & 3D Fit Engine",
        "language": "Rust 2021 / Actix-Web",
        "status": "HEALTHY",
        "memorySafety": "Zero-Cost Abstraction / Pure Memory Safety",
        "cryptoEngine": "SHA-256 Merkle Provenance Tree"
    }))
}

#[post("/api/v1/rust/passport/verify")]
async fn verify_passport(req: web::Json<DigitalPassportRequest>) -> impl Responder {
    let result = AuthenticityVerifier::verify_and_generate_passport(&req);
    HttpResponse::Ok().json(result)
}

#[post("/api/v1/rust/fitting/solve")]
async fn solve_fitting(req: web::Json<BodyMeasurements>) -> impl Responder {
    let result = FittingSolver::compute_ideal_fit(&req);
    HttpResponse::Ok().json(result)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("🦀 [Rust Authenticity Engine] Active on port 8085");
    HttpServer::new(|| {
        App::new()
            .wrap(Cors::permissive())
            .service(health)
            .service(verify_passport)
            .service(solve_fitting)
    })
    .bind(("0.0.0.0", 8085))?
    .run()
    .await
}
