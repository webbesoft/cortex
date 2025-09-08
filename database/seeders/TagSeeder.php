<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    public function run(): void
    {
        $tags = [
            [
                "title" => "Histology"
            ],
            [
                "title" => "Surgery"
            ],
            [
                "title" => "Immunology"
            ],
            [
                "title" => "OBGYN"
            ],
            [
                "title" => "Anatomy"
            ],
            [
                "title" => "Pathology"
            ],
            [
                "title" => "Pharmacology"
            ],
            [
                "title" => "Genetics"
            ],
            [
                "title" => "Microbiology"
            ],
            [
                "title" => "Biochemistry"
            ],
            [
                "title" => "Anatomy"
            ],
            [
                "title" => "Paediatrics"
            ],
        ];

        Tag::insert($tags);
    }
}