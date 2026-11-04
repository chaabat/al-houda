<x-mail::message>
# {{ __('mail.accepted.title') }}

{{ __('mail.accepted.body', ['name' => $registration->parent_name, 'reference' => $registration->reference]) }}

{{ __('mail.signature') }}
</x-mail::message>
