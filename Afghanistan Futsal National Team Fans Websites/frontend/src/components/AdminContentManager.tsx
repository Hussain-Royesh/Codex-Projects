"use client";

import { FormEvent, useEffect, useState, type ReactNode } from "react";
import {
  CalendarClock,
  Pencil,
  Plus,
  RefreshCw,
  Save,
  Trash2,
  UsersRound,
  X
} from "lucide-react";
import {
  createMatch,
  createPlayer,
  deleteMatch,
  deletePlayer,
  fetchMatches,
  fetchPlayers,
  updateMatch,
  updatePlayer,
  type ContentMatch,
  type ContentPlayer
} from "@/lib/api";
import { cn } from "@/lib/utils";

type Tab = "players" | "matches";
type PlayerForm = Omit<ContentPlayer, "id">;
type MatchForm = Omit<ContentMatch, "id">;

const emptyPlayer: PlayerForm = {
  name: "",
  position: "Player",
  jerseyNumber: 0,
  age: 0,
  height: "TBA",
  photo: "/images/player-placeholder.svg",
  profile: "Player profile will be updated soon."
};

const emptyMatch: MatchForm = {
  date: "",
  time: "",
  homeTeam: "Afghanistan",
  awayTeam: "",
  competition: "",
  venue: "",
  status: "Upcoming",
  note: ""
};

export function AdminContentManager({ token }: { token: string }) {
  const [activeTab, setActiveTab] = useState<Tab>("matches");
  const [players, setPlayers] = useState<ContentPlayer[]>([]);
  const [matches, setMatches] = useState<ContentMatch[]>([]);
  const [playerForm, setPlayerForm] = useState<PlayerForm>(emptyPlayer);
  const [matchForm, setMatchForm] = useState<MatchForm>(emptyMatch);
  const [editingPlayerId, setEditingPlayerId] = useState<string | null>(null);
  const [editingMatchId, setEditingMatchId] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    void loadContent();
  }, []);

  async function loadContent() {
    setIsLoading(true);

    try {
      const [playersResult, matchesResult] = await Promise.all([
        fetchPlayers(),
        fetchMatches()
      ]);

      setPlayers(playersResult.players);
      setMatches(matchesResult.matches);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Unable to load content.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handlePlayerSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setNotice("");

    try {
      if (editingPlayerId) {
        await updatePlayer(token, editingPlayerId, playerForm);
        setNotice("Player updated successfully.");
      } else {
        await createPlayer(token, playerForm);
        setNotice("Player added successfully.");
      }

      resetPlayerForm();
      await loadContent();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Unable to save player.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleMatchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setNotice("");

    try {
      if (editingMatchId) {
        await updateMatch(token, editingMatchId, matchForm);
        setNotice("Match updated successfully.");
      } else {
        await createMatch(token, matchForm);
        setNotice("Match added successfully.");
      }

      resetMatchForm();
      await loadContent();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Unable to save match.");
    } finally {
      setIsSaving(false);
    }
  }

  function editPlayer(player: ContentPlayer) {
    setActiveTab("players");
    setEditingPlayerId(player.id);
    setPlayerForm({
      name: player.name,
      position: player.position,
      jerseyNumber: player.jerseyNumber,
      age: player.age,
      height: player.height,
      photo: player.photo,
      profile: player.profile
    });
  }

  function editMatch(match: ContentMatch) {
    setActiveTab("matches");
    setEditingMatchId(match.id);
    setMatchForm({
      date: match.date,
      time: match.time,
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      competition: match.competition,
      venue: match.venue,
      status: match.status,
      note: match.note
    });
  }

  async function removePlayer(player: ContentPlayer) {
    if (!window.confirm(`Delete ${player.name}?`)) {
      return;
    }

    await deletePlayer(token, player.id);
    setNotice("Player deleted.");
    await loadContent();
  }

  async function removeMatch(match: ContentMatch) {
    if (!window.confirm(`Delete ${match.homeTeam} vs ${match.awayTeam}?`)) {
      return;
    }

    await deleteMatch(token, match.id);
    setNotice("Match deleted.");
    await loadContent();
  }

  function resetPlayerForm() {
    setPlayerForm(emptyPlayer);
    setEditingPlayerId(null);
  }

  function resetMatchForm() {
    setMatchForm(emptyMatch);
    setEditingMatchId(null);
  }

  const activeCount = activeTab === "players" ? players.length : matches.length;

  return (
    <section className="space-y-5">
      <div className="admin-panel rounded-3xl p-5 md:p-7">
        <div className="grid gap-5 xl:grid-cols-[1fr_auto] xl:items-end">
          <div>
            <p className="eyebrow mb-3">Content manager</p>
            <h2 className="font-display text-3xl font-black leading-tight light-text md:text-4xl">
              Edit live website content
            </h2>
            <p className="mt-3 max-w-2xl text-sm muted-text md:text-base">
              Use the tabs below to add, update, or delete players and match fixtures. Changes are saved in the backend and appear on the public pages.
            </p>
          </div>

          <button type="button" onClick={() => void loadContent()} className="action-secondary w-fit">
            <RefreshCw size={17} />
            Refresh
          </button>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <TabButton
            active={activeTab === "matches"}
            count={matches.length}
            icon={<CalendarClock size={20} />}
            label="Matches"
            onClick={() => setActiveTab("matches")}
          />
          <TabButton
            active={activeTab === "players"}
            count={players.length}
            icon={<UsersRound size={20} />}
            label="Players"
            onClick={() => setActiveTab("players")}
          />
        </div>

        {notice ? (
          <p className="mt-5 rounded-2xl border border-[var(--line)] bg-[var(--field-bg)] p-4 text-sm font-semibold light-text">
            {notice}
          </p>
        ) : null}
      </div>

      <div className="grid gap-5 xl:grid-cols-[430px_minmax(0,1fr)]">
        {activeTab === "matches" ? (
          <>
            <MatchFormPanel
              form={matchForm}
              isEditing={Boolean(editingMatchId)}
              isSaving={isSaving}
              onCancel={resetMatchForm}
              onSubmit={handleMatchSubmit}
              setForm={setMatchForm}
            />
            <MatchList
              isLoading={isLoading}
              matches={matches}
              onDelete={removeMatch}
              onEdit={editMatch}
              total={activeCount}
            />
          </>
        ) : (
          <>
            <PlayerFormPanel
              form={playerForm}
              isEditing={Boolean(editingPlayerId)}
              isSaving={isSaving}
              onCancel={resetPlayerForm}
              onSubmit={handlePlayerSubmit}
              setForm={setPlayerForm}
            />
            <PlayerList
              isLoading={isLoading}
              players={players}
              onDelete={removePlayer}
              onEdit={editPlayer}
              total={activeCount}
            />
          </>
        )}
      </div>
    </section>
  );
}

function TabButton({
  active,
  count,
  icon,
  label,
  onClick
}: {
  active: boolean;
  count: number;
  icon: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "tab-control flex min-h-16 items-center justify-between rounded-2xl border border-[var(--line)] px-5 text-left transition hover:border-[var(--line-strong)]",
        active && "tab-control-active"
      )}
    >
      <span className="flex items-center gap-3 font-display text-xl font-black">
        {icon}
        {label}
      </span>
      <span className="rounded-full border border-current/20 px-3 py-1 text-sm font-black">
        {count}
      </span>
    </button>
  );
}

function PlayerFormPanel({
  form,
  isEditing,
  isSaving,
  onCancel,
  onSubmit,
  setForm
}: {
  form: PlayerForm;
  isEditing: boolean;
  isSaving: boolean;
  onCancel: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  setForm: (form: PlayerForm) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="admin-panel rounded-3xl p-5 md:p-6">
      <FormTitle title={isEditing ? "Edit player" : "Add player"} />
      <Input label="Name" value={form.name} onChange={(name) => setForm({ ...form, name })} required />
      <Input label="Position" value={form.position} onChange={(position) => setForm({ ...form, position })} />
      <div className="grid gap-3 md:grid-cols-2">
        <Input
          label="Jersey number"
          type="number"
          value={String(form.jerseyNumber)}
          onChange={(jerseyNumber) => setForm({ ...form, jerseyNumber: Number(jerseyNumber) })}
        />
        <Input
          label="Age"
          type="number"
          value={String(form.age)}
          onChange={(age) => setForm({ ...form, age: Number(age) })}
        />
      </div>
      <Input label="Height" value={form.height} onChange={(height) => setForm({ ...form, height })} />
      <Input label="Photo path" value={form.photo} onChange={(photo) => setForm({ ...form, photo })} />
      <Textarea label="Profile" value={form.profile} onChange={(profile) => setForm({ ...form, profile })} />
      <FormActions isEditing={isEditing} isSaving={isSaving} onCancel={onCancel} />
    </form>
  );
}

function MatchFormPanel({
  form,
  isEditing,
  isSaving,
  onCancel,
  onSubmit,
  setForm
}: {
  form: MatchForm;
  isEditing: boolean;
  isSaving: boolean;
  onCancel: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  setForm: (form: MatchForm) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="admin-panel rounded-3xl p-5 md:p-6">
      <FormTitle title={isEditing ? "Edit match" : "Add match"} />
      <div className="grid gap-3 md:grid-cols-2">
        <Input label="Date" type="date" value={form.date} onChange={(date) => setForm({ ...form, date })} required />
        <Input label="Time" type="time" value={form.time} onChange={(time) => setForm({ ...form, time })} required />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <Input label="Home team" value={form.homeTeam} onChange={(homeTeam) => setForm({ ...form, homeTeam })} />
        <Input label="Away team" value={form.awayTeam} onChange={(awayTeam) => setForm({ ...form, awayTeam })} required />
      </div>
      <Input label="Competition" value={form.competition} onChange={(competition) => setForm({ ...form, competition })} />
      <Input label="Venue" value={form.venue} onChange={(venue) => setForm({ ...form, venue })} />
      <Select
        label="Status"
        value={form.status}
        options={["Upcoming", "TBA", "Finished", "Cancelled", "Fan Event"]}
        onChange={(status) => setForm({ ...form, status })}
      />
      <Textarea label="Note" value={form.note} onChange={(note) => setForm({ ...form, note })} />
      <FormActions isEditing={isEditing} isSaving={isSaving} onCancel={onCancel} />
    </form>
  );
}

function PlayerList({
  isLoading,
  players,
  onDelete,
  onEdit,
  total
}: {
  isLoading: boolean;
  players: ContentPlayer[];
  onDelete: (player: ContentPlayer) => Promise<void>;
  onEdit: (player: ContentPlayer) => void;
  total: number;
}) {
  return (
    <div className="admin-panel rounded-3xl p-5 md:p-6">
      <ListHeader count={total} title="Players" />
      <div className="grid gap-3">
        {isLoading ? <EmptyState text="Loading players..." /> : null}
        {!isLoading && players.length === 0 ? <EmptyState text="No players yet." /> : null}
        {players.map((player) => (
          <div key={player.id} className="admin-row rounded-2xl p-4">
            <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="font-display text-xl font-black light-text">
                  #{player.jerseyNumber} {player.name}
                </p>
                <p className="mt-1 text-sm muted-text">
                  {player.position} / Age {player.age} / {player.height}
                </p>
              </div>
              <RowActions onDelete={() => onDelete(player)} onEdit={() => onEdit(player)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MatchList({
  isLoading,
  matches,
  onDelete,
  onEdit,
  total
}: {
  isLoading: boolean;
  matches: ContentMatch[];
  onDelete: (match: ContentMatch) => Promise<void>;
  onEdit: (match: ContentMatch) => void;
  total: number;
}) {
  return (
    <div className="admin-panel rounded-3xl p-5 md:p-6">
      <ListHeader count={total} title="Matches" />
      <div className="grid gap-3">
        {isLoading ? <EmptyState text="Loading matches..." /> : null}
        {!isLoading && matches.length === 0 ? <EmptyState text="No matches yet." /> : null}
        {matches.map((match) => (
          <div key={match.id} className="admin-row rounded-2xl p-4">
            <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="mb-2 flex flex-wrap gap-2">
                  <span className="rounded-full bg-afghan-red px-3 py-1 text-xs font-black text-white">
                    {match.status}
                  </span>
                  <span className="rounded-full border border-[var(--line)] px-3 py-1 text-xs font-black muted-text">
                    {match.date} / {match.time}
                  </span>
                </div>
                <p className="font-display text-xl font-black light-text">
                  {match.homeTeam} vs {match.awayTeam}
                </p>
                <p className="mt-1 text-sm muted-text">
                  {match.competition || "Competition TBA"} / {match.venue || "Venue TBA"}
                </p>
              </div>
              <RowActions onDelete={() => onDelete(match)} onEdit={() => onEdit(match)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FormTitle({ title }: { title: string }) {
  return <h3 className="mb-5 font-display text-2xl font-black light-text">{title}</h3>;
}

function ListHeader({ count, title }: { count: number; title: string }) {
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      <h3 className="font-display text-2xl font-black light-text">{title}</h3>
      <span className="rounded-full border border-[var(--line)] px-3 py-1 text-sm font-black muted-text">
        {count} records
      </span>
    </div>
  );
}

function Input({
  label,
  onChange,
  required = false,
  type = "text",
  value
}: {
  label: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  value: string;
}) {
  return (
    <label className="field-label mb-3">
      {label}
      <input
        required={required}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="field-control"
      />
    </label>
  );
}

function Select({
  label,
  onChange,
  options,
  value
}: {
  label: string;
  onChange: (value: string) => void;
  options: string[];
  value: string;
}) {
  return (
    <label className="field-label mb-3">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)} className="field-control">
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function Textarea({
  label,
  onChange,
  value
}: {
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <label className="field-label mb-3">
      {label}
      <textarea value={value} onChange={(event) => onChange(event.target.value)} className="field-control" />
    </label>
  );
}

function FormActions({
  isEditing,
  isSaving,
  onCancel
}: {
  isEditing: boolean;
  isSaving: boolean;
  onCancel: () => void;
}) {
  return (
    <div className="mt-5 flex flex-wrap gap-3">
      <button type="submit" disabled={isSaving} className="action-primary disabled:opacity-60">
        {isEditing ? <Save size={17} /> : <Plus size={17} />}
        {isSaving ? "Saving..." : isEditing ? "Save changes" : "Add record"}
      </button>
      {isEditing ? (
        <button type="button" onClick={onCancel} className="action-secondary">
          <X size={17} />
          Cancel edit
        </button>
      ) : null}
    </div>
  );
}

function RowActions({ onDelete, onEdit }: { onDelete: () => Promise<void>; onEdit: () => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button type="button" onClick={onEdit} className="action-secondary">
        <Pencil size={16} />
        Edit
      </button>
      <button type="button" onClick={() => void onDelete()} className="action-danger">
        <Trash2 size={16} />
        Delete
      </button>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="admin-row rounded-2xl p-5 text-sm font-semibold muted-text">
      {text}
    </div>
  );
}
