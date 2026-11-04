<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Course;
use App\Models\DonationCampaign;
use App\Models\Event;
use App\Models\Page;
use App\Models\Post;
use App\Models\Setting;
use App\Models\TeamMember;
use Illuminate\Database\Seeder;

/** Fictional demo data: must be validated or replaced by the mosque before launch. */
class DemoContentSeeder extends Seeder
{
    public function run(): void
    {
        $fake = 'Texte fictif, à valider par les responsables.';

        $announcements = Category::updateOrCreate(['slug' => 'annonces'], ['name' => ['fr' => 'Annonces', 'en' => 'Announcements']]);
        $teaching = Category::updateOrCreate(['slug' => 'enseignement'], ['name' => ['fr' => 'Enseignement', 'en' => 'Teaching']]);

        $posts = [
            ['cours-de-coran', $teaching, 'Cours de Coran pour tous', 'Quran classes for everyone', 3],
            ['inscriptions-ouvertes', $announcements, "Inscriptions de l'année scolaire", 'School year registrations', 2],
            ['collecte-renovation', $announcements, 'Projet de rénovation', 'Renovation project', 1],
        ];
        foreach ($posts as [$slug, $category, $titleFr, $titleEn, $daysAgo]) {
            Post::updateOrCreate(['slug' => $slug], [
                'category_id' => $category->id,
                'title' => ['fr' => $titleFr, 'en' => $titleEn],
                'excerpt' => ['fr' => $fake],
                'body' => ['fr' => $fake.' Contenu de démonstration.'],
                'status' => 'published',
                'published_at' => now()->subDays($daysAgo),
            ]);
        }

        Event::updateOrCreate(['slug' => 'conference-exemple'], [
            'title' => ['fr' => 'Conférence (exemple)', 'en' => 'Lecture (example)'],
            'description' => ['fr' => $fake],
            'location' => 'À définir',
            'starts_at' => now()->addDays(10)->setTime(19, 0),
            'is_published' => true,
        ]);
        Event::updateOrCreate(['slug' => 'portes-ouvertes-exemple'], [
            'title' => ['fr' => 'Portes ouvertes (exemple)'],
            'description' => ['fr' => $fake],
            'location' => 'À définir',
            'starts_at' => now()->addDays(25)->setTime(14, 0),
            'is_published' => true,
        ]);

        foreach ([
            'history' => ['Histoire', 'History'],
            'mission' => ['Mission', 'Mission'],
            'values' => ['Valeurs', 'Values'],
            'privacy' => ['Politique de confidentialité', 'Privacy policy'],
            'legal-notice' => ['Mentions légales', 'Legal notice'],
        ] as $slug => [$fr, $en]) {
            Page::updateOrCreate(['slug' => $slug], [
                'title' => ['fr' => $fr, 'en' => $en],
                'body' => ['fr' => $fake],
                'is_published' => true,
            ]);
        }

        TeamMember::updateOrCreate(['name' => 'Responsable (exemple)'], ['role' => ['fr' => 'Président (exemple)', 'en' => 'President (example)'], 'sort' => 1]);
        TeamMember::updateOrCreate(['name' => 'Enseignant (exemple)'], ['role' => ['fr' => 'Enseignant (exemple)'], 'sort' => 2]);

        foreach ([
            ['coran-debutant', 'Coran débutant', 'Quran beginners', 'Samedi 10h-12h', 1],
            ['arabe-enfants', 'Arabe pour enfants', 'Arabic for children', 'Mercredi 14h-16h', 2],
            ['fiqh-adultes', 'Fiqh pour adultes', 'Fiqh for adults', 'Vendredi 19h-20h30', 3],
        ] as [$slug, $fr, $en, $schedule, $sort]) {
            Course::updateOrCreate(['slug' => $slug], [
                'title' => ['fr' => $fr, 'en' => $en],
                'description' => ['fr' => $fake],
                'schedule' => ['fr' => $schedule],
                'max_places' => 20,
                'sort' => $sort,
                'is_active' => true,
            ]);
        }

        DonationCampaign::updateOrCreate(['slug' => 'renovation'], [
            'title' => ['fr' => 'Rénovation (exemple)', 'en' => 'Renovation (example)'],
            'description' => ['fr' => $fake],
            'goal_cents' => 5000000,
            'is_active' => true,
        ]);

        Setting::updateOrCreate(['name' => 'site'], ['value' => ['name' => 'Institution Al-Houda · Illzach']]);
        Setting::updateOrCreate(['name' => 'contact'], ['value' => ['address' => 'Adresse à valider', 'phone' => '00 00 00 00 00', 'email' => 'contact@exemple.fr']]);
        Setting::updateOrCreate(['name' => 'social'], ['value' => ['facebook' => null, 'youtube' => null]]);
        Setting::updateOrCreate(['name' => 'rib'], ['value' => [
            'holder' => 'Association Al-Houda (exemple)',
            'iban' => 'FR76 0000 0000 0000 0000 0000 000',
            'bic' => 'XXXXXXXX',
        ]]);
    }
}
