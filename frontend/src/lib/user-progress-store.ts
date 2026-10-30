"use client";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export interface FullExerciseState {
  currentNum: number;
  userAnswers: Record<number, number>;
  submittedMap: Record<number, boolean>;
  selectedOptionMap?: Record<number, number | null>;
  selectedChapterSlug: string;
  updatedAt?: number;
}

export interface ChapterExerciseState {
  currentIdx: number;
  userSelections: Record<number, number | null>;
  submittedMap: Record<number, boolean>;
  showAnswerMap: Record<number, boolean>;
  isCompleted: boolean;
  updatedAt?: number;
}

export interface ChapterChallengeState {
  userInput: string;
  submitted: boolean;
  showHint: boolean;
  showSolution: boolean;
  updatedAt?: number;
}

export interface HomeQuizState {
  selectedAnswer: string | null;
  submitted?: boolean;
  exerciseSubmitted?: boolean;
}

export interface LastVisitedChapter {
  chapterSlug: string;
  subSlug: string;
}

export interface StoredBookmark {
  id: string;
  tech: string;
  chapter_slug: string;
  title: string;
  url: string;
  created_at: string;
}

export interface StoredSnippet {
  id: string;
  title: string;
  lang: string;
  code: string;
  created_at: string;
  updated_at: string;
}

export interface UserPersistedState {
  completedChapters: Record<string, string[]>;
  fullExercises: Record<string, FullExerciseState>;
  chapterExercises: Record<string, ChapterExerciseState>;
  chapterChallenges: Record<string, ChapterChallengeState>;
  homeQuizzes: Record<string, HomeQuizState>;
  lastVisited: Record<string, LastVisitedChapter>;
  bookmarks: StoredBookmark[];
  snippets: StoredSnippet[];
  searchHistory: string[];
  updatedAt?: string;
}

export type UserMeta =
  | {
      id?: string;
      email?: string | null;
      name?: string | null;
      avatarUrl?: string | null;
    }
  | null
  | undefined;

function createEmptyState(): UserPersistedState {
  return {
    completedChapters: {},
    fullExercises: {},
    chapterExercises: {},
    chapterChallenges: {},
    homeQuizzes: {},
    lastVisited: {},
    bookmarks: [],
    snippets: [],
    searchHistory: [],
  };
}

function getStorageKey(email?: string | null): string {
  const clean = email ? email.toLowerCase().trim() : "guest";
  return `devacademy_persisted_state_${clean}`;
}

export function loadUserState(email?: string | null): UserPersistedState {
  if (typeof window === "undefined") return createEmptyState();
  try {
    const key = getStorageKey(email);
    const raw = localStorage.getItem(key);
    const base = createEmptyState();

    // If user is logged in, also merge any guest progress so nothing done before login is lost
    let guestState: Partial<UserPersistedState> = {};
    if (email) {
      const guestRaw = localStorage.getItem(getStorageKey(null));
      if (guestRaw) {
        try {
          guestState = JSON.parse(guestRaw);
        } catch {}
      }
    }

    const userState: Partial<UserPersistedState> = raw ? JSON.parse(raw) : {};
    return mergeUserStates(
      mergeUserStates(base, guestState as UserPersistedState),
      userState as UserPersistedState
    );
  } catch {
    return createEmptyState();
  }
}

export function mergeUserStates(
  older: Partial<UserPersistedState>,
  newer: Partial<UserPersistedState>
): UserPersistedState {
  const result = createEmptyState();

  // 1. Merge completedChapters (union per tech)
  const allTechs = new Set([
    ...Object.keys(older.completedChapters || {}),
    ...Object.keys(newer.completedChapters || {}),
  ]);
  for (const tech of allTechs) {
    const a = older.completedChapters?.[tech] || [];
    const b = newer.completedChapters?.[tech] || [];
    result.completedChapters[tech] = Array.from(new Set([...a, ...b]));
  }

  // 2. Merge fullExercises per techSlug
  const allFullSlugs = new Set([
    ...Object.keys(older.fullExercises || {}),
    ...Object.keys(newer.fullExercises || {}),
  ]);
  for (const slug of allFullSlugs) {
    const a = older.fullExercises?.[slug];
    const b = newer.fullExercises?.[slug];
    if (a && b) {
      result.fullExercises[slug] = {
        currentNum: b.currentNum || a.currentNum || 1,
        userAnswers: { ...(a.userAnswers || {}), ...(b.userAnswers || {}) },
        submittedMap: { ...(a.submittedMap || {}), ...(b.submittedMap || {}) },
        selectedOptionMap: { ...(a.selectedOptionMap || {}), ...(b.selectedOptionMap || {}) },
        selectedChapterSlug: b.selectedChapterSlug || a.selectedChapterSlug || "all",
      };
    } else {
      result.fullExercises[slug] = (b || a)!;
    }
  }

  // 3. Merge chapterExercises
  result.chapterExercises = {
    ...(older.chapterExercises || {}),
    ...(newer.chapterExercises || {}),
  };

  // 4. Merge chapterChallenges
  result.chapterChallenges = {
    ...(older.chapterChallenges || {}),
    ...(newer.chapterChallenges || {}),
  };

  // 5. Merge homeQuizzes
  result.homeQuizzes = {
    ...(older.homeQuizzes || {}),
    ...(newer.homeQuizzes || {}),
  };

  // 6. Merge lastVisited
  result.lastVisited = {
    ...(older.lastVisited || {}),
    ...(newer.lastVisited || {}),
  };

  // 7. Merge bookmarks (deduplicate by tech + chapter_slug)
  const bookmarkMap = new Map<string, StoredBookmark>();
  for (const item of [...(older.bookmarks || []), ...(newer.bookmarks || [])]) {
    if (item && item.tech && item.chapter_slug) {
      bookmarkMap.set(`${item.tech.toUpperCase()}:${item.chapter_slug}`, item);
    }
  }
  result.bookmarks = Array.from(bookmarkMap.values());

  // 8. Merge snippets (deduplicate by id)
  const snippetMap = new Map<string, StoredSnippet>();
  for (const s of [...(older.snippets || []), ...(newer.snippets || [])]) {
    if (s && s.id) {
      snippetMap.set(s.id, s);
    }
  }
  result.snippets = Array.from(snippetMap.values());

  // 9. Merge searchHistory
  result.searchHistory = Array.from(
    new Set([...(newer.searchHistory || []), ...(older.searchHistory || [])])
  ).slice(0, 20);

  result.updatedAt = new Date().toISOString();
  return result;
}

let syncTimeout: ReturnType<typeof setTimeout> | null = null;

export function saveUserState(
  email: string | null | undefined,
  state: UserPersistedState,
  userMeta?: UserMeta,
  overwriteCloud = false
): void {
  if (typeof window === "undefined") return;
  try {
    state.updatedAt = new Date().toISOString();
    const key = getStorageKey(email);
    localStorage.setItem(key, JSON.stringify(state));

    // Also keep guest storage updated so even if session is refreshed, local fallback is current
    if (email) {
      localStorage.setItem(getStorageKey(null), JSON.stringify(state));
      scheduleCloudPush(email, state, userMeta, overwriteCloud);
    }
  } catch (err) {
    console.warn("[saveUserState] Failed to persist state:", err);
  }
}

function scheduleCloudPush(
  email: string,
  state: UserPersistedState,
  userMeta?: UserMeta,
  overwrite = false
) {
  if (syncTimeout) clearTimeout(syncTimeout);
  syncTimeout = setTimeout(() => {
    pushStateToTiDBCloud(email, state, userMeta, overwrite).catch(() => {});
  }, 350);
}

export async function pushStateToTiDBCloud(
  email: string,
  state: UserPersistedState,
  userMeta?: UserMeta,
  overwrite = false
): Promise<void> {
  if (!email) return;
  try {
    await fetch(`${API_BASE_URL}/api/sync`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.toLowerCase().trim(),
        userId: userMeta?.id,
        name: userMeta?.name,
        avatarUrl: userMeta?.avatarUrl,
        state,
        overwrite,
      }),
    });
  } catch {}
}

export async function syncWithTiDBCloud(user: UserMeta): Promise<UserPersistedState> {
  const email = user?.email?.toLowerCase().trim();
  const localState = loadUserState(email);
  if (!email) return localState;

  try {
    const res = await fetch(`${API_BASE_URL}/api/sync?email=${encodeURIComponent(email)}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.success && data?.state) {
        const merged = mergeUserStates(data.state, localState);
        localStorage.setItem(getStorageKey(email), JSON.stringify(merged));
        localStorage.setItem(getStorageKey(null), JSON.stringify(merged));

        // Push merged state back to TiDB Cloud
        await pushStateToTiDBCloud(email, merged, user, false);
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("devacademy-cloud-synced"));
          window.dispatchEvent(new Event("devacademy-bookmarks-updated"));
        }
        return merged;
      }
    }
    // No remote state yet -> push local state to TiDB Cloud
    await pushStateToTiDBCloud(email, localState, user, false);
  } catch {}

  return localState;
}

// ============================================================================
// Feature Helpers
// ============================================================================

export function getFullExerciseProgress(
  email: string | null | undefined,
  techSlug: string
): FullExerciseState | null {
  const state = loadUserState(email);
  return state.fullExercises[techSlug.toLowerCase()] || null;
}

export function saveFullExerciseProgress(
  email: string | null | undefined,
  techSlug: string,
  progress: FullExerciseState,
  userMeta?: UserMeta,
  overwrite = false
): void {
  const state = loadUserState(email);
  state.fullExercises[techSlug.toLowerCase()] = progress;
  saveUserState(email, state, userMeta, overwrite);
}

export function getChapterExerciseProgress(
  email: string | null | undefined,
  tech: string,
  chapterKey: string
): ChapterExerciseState | null {
  const state = loadUserState(email);
  const k = `${tech.toUpperCase()}:${chapterKey}`;
  return state.chapterExercises[k] || null;
}

export function saveChapterExerciseProgress(
  email: string | null | undefined,
  tech: string,
  chapterKey: string,
  progress: ChapterExerciseState,
  userMeta?: UserMeta
): void {
  const state = loadUserState(email);
  const k = `${tech.toUpperCase()}:${chapterKey}`;
  state.chapterExercises[k] = progress;
  saveUserState(email, state, userMeta);
}

export function getChapterChallengeProgress(
  email: string | null | undefined,
  tech: string,
  chapterKey: string
): ChapterChallengeState | null {
  const state = loadUserState(email);
  const k = `${tech.toUpperCase()}:${chapterKey}`;
  return state.chapterChallenges[k] || null;
}

export function saveChapterChallengeProgress(
  email: string | null | undefined,
  tech: string,
  chapterKey: string,
  progress: ChapterChallengeState,
  userMeta?: UserMeta
): void {
  const state = loadUserState(email);
  const k = `${tech.toUpperCase()}:${chapterKey}`;
  state.chapterChallenges[k] = progress;
  saveUserState(email, state, userMeta);
}

export function getCompletedChaptersList(
  email: string | null | undefined,
  tech: string
): string[] {
  const state = loadUserState(email);
  return state.completedChapters[tech.toUpperCase()] || [];
}

export function markChapterAsCompleted(
  email: string | null | undefined,
  tech: string,
  chapterSlug: string,
  userMeta?: UserMeta
): string[] {
  const state = loadUserState(email);
  const norm = tech.toUpperCase();
  const existing = state.completedChapters[norm] || [];
  if (!existing.includes(chapterSlug)) {
    state.completedChapters[norm] = [...existing, chapterSlug];
    saveUserState(email, state, userMeta);
  }
  return state.completedChapters[norm];
}

export function mergeCompletedChaptersList(
  email: string | null | undefined,
  tech: string,
  slugs: string[],
  userMeta?: UserMeta
): string[] {
  const state = loadUserState(email);
  const norm = tech.toUpperCase();
  const existing = state.completedChapters[norm] || [];
  const merged = Array.from(new Set([...existing, ...slugs]));
  if (merged.length !== existing.length) {
    state.completedChapters[norm] = merged;
    saveUserState(email, state, userMeta);
  }
  return merged;
}

export function getLastVisitedChapter(
  email: string | null | undefined,
  tech: string
): LastVisitedChapter | null {
  const state = loadUserState(email);
  return state.lastVisited[tech.toUpperCase()] || null;
}

export function saveLastVisitedChapter(
  email: string | null | undefined,
  tech: string,
  chapterSlug: string,
  subSlug: string,
  userMeta?: UserMeta
): void {
  const state = loadUserState(email);
  state.lastVisited[tech.toUpperCase()] = { chapterSlug, subSlug };
  saveUserState(email, state, userMeta);
}

export function getHomeQuizProgress(
  email: string | null | undefined,
  tech: string
): HomeQuizState | null {
  const state = loadUserState(email);
  const item = state.homeQuizzes[tech.toUpperCase()];
  if (!item) return null;
  return {
    selectedAnswer: item.selectedAnswer ?? null,
    submitted: item.submitted ?? item.exerciseSubmitted ?? false,
    exerciseSubmitted: item.exerciseSubmitted ?? item.submitted ?? false,
  };
}

export function saveHomeQuizProgress(
  email: string | null | undefined,
  tech: string,
  answerOrObj: string | null | HomeQuizState,
  submittedOrMeta?: boolean | UserMeta,
  userMeta?: UserMeta
): void {
  const state = loadUserState(email);
  if (typeof answerOrObj === "object" && answerOrObj !== null) {
    state.homeQuizzes[tech.toUpperCase()] = {
      selectedAnswer: answerOrObj.selectedAnswer,
      submitted: !!(answerOrObj.submitted ?? answerOrObj.exerciseSubmitted),
      exerciseSubmitted: !!(answerOrObj.exerciseSubmitted ?? answerOrObj.submitted),
    };
    saveUserState(email, state, submittedOrMeta as UserMeta | undefined);
  } else {
    const isSub = typeof submittedOrMeta === "boolean" ? submittedOrMeta : false;
    state.homeQuizzes[tech.toUpperCase()] = {
      selectedAnswer: answerOrObj,
      submitted: isSub,
      exerciseSubmitted: isSub,
    };
    saveUserState(email, state, userMeta);
  }
}

export function getLocalBookmarks(
  email: string | null | undefined
): StoredBookmark[] {
  const state = loadUserState(email);
  return state.bookmarks || [];
}

export function saveLocalBookmarks(
  email: string | null | undefined,
  bookmarks: StoredBookmark[],
  userMeta?: UserMeta,
  overwrite = false
): void {
  const state = loadUserState(email);
  state.bookmarks = bookmarks;
  saveUserState(email, state, userMeta, overwrite);
}

export function isLocalChapterBookmarked(
  email: string | null | undefined,
  tech: string,
  chapterSlug: string
): boolean {
  const bookmarks = getLocalBookmarks(email);
  return bookmarks.some(
    (b) => b.tech.toUpperCase() === tech.toUpperCase() && b.chapter_slug === chapterSlug
  );
}

export function toggleLocalBookmark(
  email: string | null | undefined,
  params: {
    tech: string;
    chapterSlug?: string;
    chapter_slug?: string;
    title: string;
    url: string;
  },
  userMeta?: UserMeta
): { bookmarked: boolean; bookmarks: StoredBookmark[] } {
  const state = loadUserState(email);
  const normTech = params.tech.toUpperCase();
  const slug = params.chapterSlug || params.chapter_slug || "home";
  const exists = state.bookmarks.some(
    (b) => b.tech.toUpperCase() === normTech && b.chapter_slug === slug
  );

  let bookmarked = false;
  if (exists) {
    state.bookmarks = state.bookmarks.filter(
      (b) => !(b.tech.toUpperCase() === normTech && b.chapter_slug === slug)
    );
    bookmarked = false;
  } else {
    state.bookmarks = [
      {
        id: `${normTech}-${slug}-${Date.now()}`,
        tech: normTech,
        chapter_slug: slug,
        title: params.title,
        url: params.url,
        created_at: new Date().toISOString(),
      },
      ...state.bookmarks,
    ];
    bookmarked = true;
  }

  saveUserState(email, state, userMeta, true);
  return { bookmarked, bookmarks: state.bookmarks };
}

export function getLocalSnippets(
  email: string | null | undefined
): StoredSnippet[] {
  const state = loadUserState(email);
  return state.snippets || [];
}

export function saveLocalSnippets(
  email: string | null | undefined,
  snippets: StoredSnippet[],
  userMeta?: UserMeta
): void {
  const state = loadUserState(email);
  state.snippets = snippets;
  saveUserState(email, state, userMeta, true);
}

export function getLocalSearchHistory(
  email: string | null | undefined
): string[] {
  const state = loadUserState(email);
  return state.searchHistory || [];
}

export function saveLocalSearchHistory(
  email: string | null | undefined,
  history: string[],
  userMeta?: UserMeta
): void {
  const state = loadUserState(email);
  state.searchHistory = history.slice(0, 20);
  saveUserState(email, state, userMeta, true);
}
