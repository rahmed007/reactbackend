<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Customer;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();
        for($i=0; $i<10; $i++)
        {
            Customer::create([
                'customer_type' => $faker->word,
                'name' => $faker->name,
                'contact' => $faker->phoneNumber,
                'address' => $faker->address,

            ]);
        }
    }
}
