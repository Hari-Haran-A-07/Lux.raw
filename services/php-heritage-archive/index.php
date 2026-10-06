<?php
require_once __DIR__ . '/src/HeritageArchive.php';
require_once __DIR__ . '/src/LookbookGenerator.php';

use LuxRaw\Heritage\HeritageArchive;
use LuxRaw\Heritage\LookbookGenerator;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$archive = new HeritageArchive();
$lookbookGen = new LookbookGenerator();

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

if (str_contains($uri, '/health')) {
    echo json_encode([
        "service" => "luxury.Raw PHP 8.3 Heritage Archive & Lookbook Vault",
        "language" => "PHP 8.3",
        "status" => "HEALTHY",
        "engine" => "OPcache JIT Modern Engine",
        "archivalRecords" => count($archive->getAllMilestones())
    ]);
    exit;
}

if (str_contains($uri, '/milestones')) {
    echo json_encode($archive->getAllMilestones());
    exit;
}

if (str_contains($uri, '/lookbook/generate')) {
    $season = $_GET['season'] ?? 'Autumn / Winter 2026';
    $lang = $_GET['lang'] ?? 'en';
    echo json_encode($lookbookGen->generateLookbookManifesto($season, $lang));
    exit;
}

echo json_encode([
    "error" => "Endpoint not found",
    "available_endpoints" => [
        "/api/v1/php/health",
        "/api/v1/php/milestones",
        "/api/v1/php/lookbook/generate"
    ]
]);
