<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Medicine;

class MedicineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();
        for($i=0; $i<50; $i++)
        {
            Medicine::create([
                'name' => $faker->word,
                'formula' => $faker->sentence,
                'manufacturer' => $faker->company,
                'expiry_date' => $faker->dateTimeBetween('now', '+2 years')->format('Y-m-d'),

            ]);
        }
    }
}
