<x-mail::message>
# {{ __('mail.received.title') }}

{{ __('mail.received.body', ['name' => $registration->parent_name, 'reference' => $registration->reference]) }}

{{ __('mail.signature') }}
</x-mail::message>
