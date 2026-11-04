<?php

namespace App\Filament\Resources\Registrations;

use App\Enums\RegistrationStatus;
use App\Filament\Resources\Registrations\Pages\ListRegistrations;
use App\Filament\Resources\Registrations\Pages\ViewRegistration;
use App\Models\Registration;
use App\Services\Interfaces\RegistrationServiceInterface;
use DomainException;
use Filament\Actions\Action;
use Filament\Actions\ViewAction;
use Filament\Forms\Components\Textarea;
use Filament\Infolists\Components\RepeatableEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Notifications\Notification;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class RegistrationResource extends Resource
{
    protected static ?string $model = Registration::class;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-inbox-arrow-down';

    protected static string|\UnitEnum|null $navigationGroup = 'École';

    protected static ?string $modelLabel = 'inscription';

    protected static ?string $pluralModelLabel = 'inscriptions';

    protected static ?string $recordTitleAttribute = 'reference';

    protected static ?int $navigationSort = 1;

    public static function canCreate(): bool
    {
        return false;
    }

    public static function getNavigationBadge(): ?string
    {
        $count = Registration::where('status', RegistrationStatus::Pending)->count();

        return $count > 0 ? (string) $count : null;
    }

    public static function getNavigationBadgeColor(): ?string
    {
        return 'warning';
    }

    public static function infolist(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Parent')
                ->columns(2)
                ->schema([
                    TextEntry::make('reference')->label('Référence'),
                    TextEntry::make('status')->label('Statut')->badge(),
                    TextEntry::make('parent_name')->label('Nom'),
                    TextEntry::make('email')->label('Email'),
                    TextEntry::make('phone')->label('Téléphone'),
                    TextEntry::make('address')->label('Adresse')->placeholder('—'),
                    TextEntry::make('locale')->label('Langue')->badge(),
                    TextEntry::make('period.school_year')->label('Année scolaire'),
                    TextEntry::make('created_at')->label('Reçue le')->dateTime('d/m/Y H:i'),
                    TextEntry::make('consent_at')->label('Consentement le')->dateTime('d/m/Y H:i'),
                ]),
            Section::make('Enfants')
                ->schema([
                    RepeatableEntry::make('children')
                        ->hiddenLabel()
                        ->columns(4)
                        ->schema([
                            TextEntry::make('first_name')->label('Prénom'),
                            TextEntry::make('last_name')->label('Nom'),
                            TextEntry::make('birth_date')->label('Naissance')->date('d/m/Y'),
                            TextEntry::make('course.title')->label('Cours')->placeholder('—'),
                        ]),
                ]),
            Section::make('Décision')
                ->columns(2)
                ->visible(fn (Registration $record): bool => $record->status !== RegistrationStatus::Pending)
                ->schema([
                    TextEntry::make('decider.name')->label('Décidée par'),
                    TextEntry::make('decided_at')->label('Le')->dateTime('d/m/Y H:i'),
                    TextEntry::make('refusal_reason')->label('Motif')->placeholder('—')->columnSpanFull(),
                ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([
                TextColumn::make('reference')->label('Référence')->searchable()->copyable(),
                TextColumn::make('parent_name')->label('Parent')->searchable(),
                TextColumn::make('email')->searchable(),
                TextColumn::make('children_count')->counts('children')->label('Enfants'),
                TextColumn::make('status')->label('Statut')->badge(),
                TextColumn::make('created_at')->label('Reçue le')->dateTime('d/m/Y H:i')->sortable(),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->label('Statut')
                    ->options(RegistrationStatus::class)
                    ->default(RegistrationStatus::Pending->value),
                SelectFilter::make('period_id')
                    ->label('Année')
                    ->relationship('period', 'school_year'),
            ])
            ->recordActions([
                ViewAction::make(),
                static::acceptAction(),
                static::refuseAction(),
            ]);
    }

    public static function acceptAction(): Action
    {
        return Action::make('accept')
            ->label('Accepter')
            ->icon('heroicon-o-check-circle')
            ->color('success')
            ->requiresConfirmation()
            ->modalHeading('Accepter cette inscription ?')
            ->modalDescription('Un email sera envoyé au parent.')
            ->visible(fn (Registration $record): bool => $record->status === RegistrationStatus::Pending)
            ->action(function (Registration $record): void {
                try {
                    app(RegistrationServiceInterface::class)->accept($record, auth()->user());
                } catch (DomainException $e) {
                    Notification::make()->title($e->getMessage())->danger()->send();

                    return;
                }

                Notification::make()->title('Inscription acceptée, email envoyé')->success()->send();
            });
    }

    public static function refuseAction(): Action
    {
        return Action::make('refuse')
            ->label('Refuser')
            ->icon('heroicon-o-x-circle')
            ->color('danger')
            ->modalHeading('Refuser cette inscription')
            ->modalDescription('Le motif sera envoyé au parent par email.')
            ->schema([
                Textarea::make('reason')->label('Motif (optionnel)')->rows(3)->maxLength(500),
            ])
            ->visible(fn (Registration $record): bool => $record->status === RegistrationStatus::Pending)
            ->action(function (Registration $record, array $data): void {
                try {
                    app(RegistrationServiceInterface::class)->refuse($record, auth()->user(), $data['reason'] ?? null);
                } catch (DomainException $e) {
                    Notification::make()->title($e->getMessage())->danger()->send();

                    return;
                }

                Notification::make()->title('Inscription refusée, email envoyé')->success()->send();
            });
    }

    public static function getPages(): array
    {
        return [
            'index' => ListRegistrations::route('/'),
            'view' => ViewRegistration::route('/{record}'),
        ];
    }
}
