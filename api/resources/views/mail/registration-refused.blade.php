<x-mail::message>
# {{ __('mail.refused.title') }}

{{ __('mail.refused.body', ['name' => $registration->parent_name, 'reference' => $registration->reference]) }}

@if($registration->refusal_reason)
{{ __('mail.refused.reason') }} {{ $registration->refusal_reason }}
@endif

{{ __('mail.signature') }}
</x-mail::message>
