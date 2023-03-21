<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                'name' => 'admin',
                'email' => 'admin@example.com',
                'admin' => true,
                'guest' => false,
                'password' => Hash::make($_ENV['ADMIN_USER_PASSWORD']),
                'api_token' => Str::random(60),
            ],
            [
                'name' => 'test2',
                'email' => 'test2@example.com',
                'admin' => false,
                'guest' => false,
                'password' => Hash::make('password123'),
                'api_token' => Str::random(60),
            ],
            [
                'name' => 'test3',
                'email' => 'test3@example.com',
                'admin' => false,
                'guest' => false,
                'password' => Hash::make('password123'),
                'api_token' => Str::random(60),
            ],
            [
                'name' => 'test4',
                'email' => 'test4@example.com',
                'admin' => false,
                'guest' => false,
                'password' => Hash::make('password123'),
                'api_token' => Str::random(60),
            ],
            [
                'name' => 'test5',
                'email' => 'test5@example.com',
                'admin' => false,
                'guest' => false,
                'password' => Hash::make('password123'),
                'api_token' => Str::random(60),
            ],
            [
                'name' => 'guest',
                'email' => 'guest@example.com',
                'admin' => false,
                'guest' => true,
                'password' => Hash::make($_ENV['GUEST_USER_PASSWORD']),
                'api_token' => Str::random(60),
            ],
        ]);
    }
}
