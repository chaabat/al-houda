<?php

namespace App\Services\Implementations;

use App\Enums\RegistrationStatus;
use App\Exceptions\RegistrationClosedException;
use App\Mail\RegistrationAccepted;
use App\Mail\RegistrationReceived;
use App\Mail\RegistrationRefused;
use App\Models\Course;
use App\Models\Registration;
use App\Models\RegistrationChild;
use App\Models\RegistrationPeriod;
use App\Models\User;
use App\Services\Interfaces\RegistrationServiceInterface;
use DomainException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class RegistrationService implements RegistrationServiceInterface
{
    public function currentPeriod(): ?RegistrationPeriod
    {
        return RegistrationPeriod::query()
            ->where('is_open', true)
            ->latest('id')
            ->get()
            ->first(fn (RegistrationPeriod $p) => $p->isCurrentlyOpen());
    }

    public function submit(array $data): Registration
    {
        $period = $this->currentPeriod();

        if (! $period) {
            throw new RegistrationClosedException('Registrations are closed.');
        }

        $registration = DB::transaction(function () use ($data, $period) {
            $this->assertPlacesAvailable($data['children']);

            $registration = Registration::create([
                'reference' => $this->newReference(),
                'period_id' => $period->id,
                'parent_name' => $data['parent_name'],
                'email' => $data['email'],
                'phone' => $data['phone'],
                'address' => $data['address'] ?? null,
                'locale' => $data['locale'],
                'status' => RegistrationStatus::Pending,
                'consent_at' => now(),
            ]);

            foreach ($data['children'] as $child) {
                $registration->children()->create([
                    'first_name' => $child['first_name'],
                    'last_name' => $child['last_name'],
                    'birth_date' => $child['birth_date'],
                    'gender' => $child['gender'] ?? null,
                    'level' => $child['level'] ?? null,
                    'course_id' => $child['course_id'] ?? null,
                ]);
            }

            return $registration;
        });

        Mail::to($registration->email)
            ->locale($registration->locale)
            ->send(new RegistrationReceived($registration));

        return $registration;
    }

    public function accept(Registration $registration, User $by): Registration
    {
        return $this->decide($registration, $by, RegistrationStatus::Accepted);
    }

    public function refuse(Registration $registration, User $by, ?string $reason = null): Registration
    {
        return $this->decide($registration, $by, RegistrationStatus::Refused, $reason);
    }

    private function decide(Registration $registration, User $by, RegistrationStatus $status, ?string $reason = null): Registration
    {
        if ($registration->status !== RegistrationStatus::Pending) {
            throw new DomainException('This registration has already been decided.');
        }

        $registration->update([
            'status' => $status,
            'refusal_reason' => $status === RegistrationStatus::Refused ? $reason : null,
            'decided_by' => $by->id,
            'decided_at' => now(),
        ]);

        $mail = $status === RegistrationStatus::Accepted
            ? new RegistrationAccepted($registration)
            : new RegistrationRefused($registration);

        Mail::to($registration->email)->locale($registration->locale)->send($mail);

        $registration->update(['notified_at' => now()]);

        return $registration;
    }

    private function assertPlacesAvailable(array $children): void
    {
        $byCourse = collect($children)
            ->filter(fn ($c) => ! empty($c['course_id']))
            ->groupBy('course_id');

        foreach ($byCourse as $courseId => $kids) {
            $course = Course::lockForUpdate()->find($courseId);

            if (! $course || ! $course->max_places) {
                continue;
            }

            $taken = RegistrationChild::where('course_id', $courseId)
                ->whereHas('registration', fn ($q) => $q->whereIn('status', ['pending', 'accepted']))
                ->count();

            if ($taken + $kids->count() > $course->max_places) {
                throw ValidationException::withMessages(['children' => 'course_full']);
            }
        }
    }

    private function newReference(): string
    {
        do {
            $reference = 'INS-'.now()->year.'-'.Str::upper(Str::random(6));
        } while (Registration::where('reference', $reference)->exists());

        return $reference;
    }
}
