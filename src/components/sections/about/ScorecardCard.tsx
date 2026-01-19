import type { BoardGamesInterest, Game } from '../../../types'

interface ScorecardCardProps {
  interest: BoardGamesInterest
  onHover?: () => void
  onClick?: () => void
}

function RatingDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="font-mono text-sm font-bold" style={{ color: 'var(--theme-primary)' }}>{rating}</span>
      <span className="font-mono text-xs text-zinc-600">/10</span>
    </div>
  )
}

function GameRow({ game, isTopRated }: { game: Game; isTopRated: boolean }) {
  return (
    <tr className="group/row border-b border-zinc-800/50 transition-colors hover:bg-zinc-900/50">
      <td className="py-4 pl-4 pr-4">
        <div className="flex items-center gap-2">
          {isTopRated && (
            <svg className="h-3.5 w-3.5 shrink-0 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          )}
          <span className="font-mono text-sm text-zinc-200 transition-colors group-hover/row:[color:var(--theme-primary)]">
            {game.name}
          </span>
        </div>
      </td>
      <td className="hidden py-4 pr-4 sm:table-cell">
        <span className="font-mono text-xs text-zinc-500">
          {game.designer}
        </span>
      </td>
      <td className="py-4 pr-4">
        <span
          title={game.category}
          className="inline-block w-32 truncate rounded px-2 py-0.5 text-center font-mono text-xs"
          style={{
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'rgba(var(--theme-secondary-dark-rgb), 0.3)',
            backgroundColor: 'rgba(var(--theme-secondary-dark-rgb), 0.1)',
            color: 'var(--theme-secondary)',
          }}
        >
          {game.category}
        </span>
      </td>
      <td className="hidden py-4 pr-4 text-center sm:table-cell">
        <span className="font-mono text-xs text-zinc-500">
          {game.playCount}
        </span>
      </td>
      <td className="py-4 pr-4 text-right">
        <RatingDisplay rating={game.rating} />
      </td>
    </tr>
  )
}

export function ScorecardCard({
  interest,
  onHover,
  onClick,
}: ScorecardCardProps) {
  const sortedGames = [...interest.games].sort((a, b) => {
    if (b.rating !== a.rating) return b.rating - a.rating
    return b.playCount - a.playCount
  })

  return (
    <div
      onClick={onClick}
      onMouseEnter={onHover}
      className="group relative flex w-full flex-col rounded-lg bg-zinc-950 p-5 text-left transition-all duration-300 sm:p-6"
      style={{
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'rgba(var(--theme-primary-dark-rgb), 0.3)',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.borderColor = 'rgba(var(--theme-primary-rgb), 0.6)'
        e.currentTarget.style.boxShadow = '0 0 30px rgba(var(--theme-primary-dark-rgb), 0.15)'
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = 'rgba(var(--theme-primary-dark-rgb), 0.3)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-lg bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)] opacity-50" />
      <div
        className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'linear-gradient(to bottom, rgba(var(--theme-primary-dark-rgb), 0.05), transparent)' }}
      />

      <div className="mb-4 flex items-center gap-2 pb-3" style={{ borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: 'rgba(var(--theme-primary-dark-rgb), 0.2)' }}>
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: 'rgba(var(--theme-primary-dark-rgb), 0.7)' }} />
        </div>
        <span className="truncate font-mono text-xs" style={{ color: 'rgba(var(--theme-primary-dark-rgb), 0.5)' }}>
          ~/about/boardgames.db
        </span>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className="flex h-14 w-14 items-center justify-center rounded bg-zinc-900 sm:h-16 sm:w-16"
            style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(var(--theme-primary-dark-rgb), 0.2)' }}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-8 w-8 sm:h-10 sm:w-10"
              style={{ color: 'var(--theme-primary)' }}
              fill="currentColor"
            >
              <path d="M12 2C10.5 2 9 3.5 9 5C9 6.5 10 7.5 10 7.5L7 11L4 10L3 12L6 14L5 22H19L18 14L21 12L20 10L17 11L14 7.5C14 7.5 15 6.5 15 5C15 3.5 13.5 2 12 2Z" />
            </svg>
          </div>
          <div>
            <h3 className="font-mono text-base font-bold tracking-tight sm:text-lg" style={{ color: 'var(--theme-primary)' }}>
              <span style={{ color: 'var(--theme-primary-darker)' }} aria-hidden="true">&gt; </span>
              {interest.title}
            </h3>
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
              Collection Stats
            </span>
          </div>
        </div>

        <div className="hidden items-center gap-4 sm:flex">
          <div className="text-right">
            <div className="font-mono text-xl font-bold" style={{ color: 'var(--theme-primary)' }}>{interest.totalPlays}</div>
            <div className="font-mono text-xs text-zinc-500">total plays</div>
          </div>
          <div className="h-8 w-px bg-zinc-800" />
          <div className="text-right">
            <div className="font-mono text-xl font-bold" style={{ color: 'var(--theme-secondary)' }}>{interest.games.length}</div>
            <div className="font-mono text-xs text-zinc-500">games</div>
          </div>
        </div>
      </div>

      <div className="mb-5 flex flex-wrap items-center gap-x-6 gap-y-2 rounded border border-zinc-800 bg-zinc-900/50 px-4 py-3">
        <div className="flex items-center gap-2">
          <svg className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="font-mono text-xs text-zinc-400">
            Favorite Designer: <span style={{ color: 'var(--theme-primary)' }}>{interest.favoriteDesigner}</span>
          </span>
        </div>
        <div className="hidden h-4 w-px bg-zinc-700 sm:block" />
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-zinc-400">
            Top Rated: <span style={{ color: 'var(--theme-primary)' }}>{sortedGames.filter(g => g.rating === 10).length}</span>
          </span>
        </div>
      </div>

      <div className="mb-4 overflow-hidden rounded border border-zinc-800">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900/70">
              <th className="py-3 pl-4 pr-4 text-left font-mono text-xs uppercase tracking-wider text-zinc-500">
                Game
              </th>
              <th className="hidden py-3 pr-4 text-left font-mono text-xs uppercase tracking-wider text-zinc-500 sm:table-cell">
                Designer
              </th>
              <th className="py-3 pr-4 text-left font-mono text-xs uppercase tracking-wider text-zinc-500">
                Type
              </th>
              <th className="hidden py-3 pr-4 text-center font-mono text-xs uppercase tracking-wider text-zinc-500 sm:table-cell">
                Plays
              </th>
              <th className="py-3 pr-4 text-right font-mono text-xs uppercase tracking-wider text-zinc-500">
                Rating
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {sortedGames.map((game) => (
              <GameRow
                key={game.name}
                game={game}
                isTopRated={game.rating === 10}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-zinc-800 pt-4 sm:hidden">
        <span className="font-mono text-xs text-zinc-500">
          <span style={{ color: 'var(--theme-primary-darker)' }}>[</span>
          {interest.games.length} games
          <span style={{ color: 'var(--theme-primary-darker)' }}>]</span>
        </span>
        <span className="font-mono text-xs text-zinc-500">
          <span className="font-bold" style={{ color: 'var(--theme-primary)' }}>{interest.totalPlays}</span> plays
        </span>
      </div>
    </div>
  )
}
