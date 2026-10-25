<?php
declare(strict_types=1);

namespace LuxRaw\HeritageArchive\Tests;

final class HeritageArchiveTest
{
    public function testArchiveMilestoneSerialization(): void
    {
        $milestone = [
            'year' => 1924,
            'title' => 'Centennial Atelier Founded in Milan',
            'vault_seal' => 'SHA256:ARCHIVE-VAULT-001'
        ];

        $json = json_encode($milestone, JSON_THROW_ON_ERROR);
        $decoded = json_decode($json, true, 512, JSON_THROW_ON_ERROR);

        if ($decoded['year'] !== 1924) {
            throw new \RuntimeException('Archive serialization failure');
        }
        echo "[PASS] Heritage lookbook serialization verified.\n";
    }
}
