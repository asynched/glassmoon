<script lang="ts">
  import {
    Brain,
    Check,
    ChevronLeft,
    ChevronRight,
    EllipsisVertical,
    X,
    XCircle,
  } from "@lucide/svelte";
  import type { Dock } from "src/domain/types";
  import { gradientMap } from "src/globals/gradients";
  import { useToggle } from "src/hooks/useToggle.svelte";
  import { fade, fly } from "svelte/transition";

  type CardSummary = {
    total: number;
    correct: number;
    incorrect: number;
  };

  type Note = {
    noteId: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  };

  const cardSummary = $state<CardSummary>({
    total: 10,
    correct: 122,
    incorrect: 9,
  });

  const dock = $state<Dock>({
    dockId: "1",
    emoji: "🇪🇸",
    name: "Espanhol",
    tags: ["Idiomas"],
    theme: "red-on-yellow",
    description: "Flashcards e anotações sobre o espanhol",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
  });

  const notes = $state<Note[]>([
    {
      noteId: "1",
      title: "Objetos indiretos",
      content: `Objetos indiretos em espanhol são:
- lo:
  - Ya enviaste el archivo?
  - Si, ya lo envié.
- los:
  - Ya enviaste los archivos?
  - Si, ya los envié.
- las:
  - Ya enviaste las fotos?
  - Si, ya las envié.
`,
      createdAt: "2025-01-01",
      updatedAt: "2025-01-01",
    },
    {
      noteId: "2",
      title: "Expressões úteis",
      content: "Expressões úteis para o espanhol",
      createdAt: "2025-01-01",
      updatedAt: "2025-01-01",
    },
    {
      noteId: "3",
      title: "Italianismos argentinos",
      content: "Italianismos argentinos",
      createdAt: "2025-01-01",
      updatedAt: "2025-01-01",
    },
  ]);
</script>

<svelte:head>
  <title>GlassMoon | {dock.name}</title>
</svelte:head>

<header
  class="sticky top-0 z-10 bg-white/50 backdrop-blur-sm h-14 flex items-center justify-between px-4"
>
  <button aria-label="Voltar" onclick={() => history.back()}>
    <ChevronLeft class="size-5 text-neutral-500" />
  </button>
  <div class="place-self-center">Dock - {dock.name} {dock.emoji}</div>
  <button aria-label="Opções">
    <EllipsisVertical class="size-5 text-neutral-500" />
  </button>
</header>

<div class="p-4 bg-neutral-100 rounded-t-2xl">
  <h1 class="text-4xl font-medium tracking-tighter">
    {dock.name}
    {dock.emoji}
  </h1>
  <p class="text-neutral-600 text-sm pb-2">{dock.description}</p>
  <ul class="flex gap-2 mb-4">
    {#each dock.tags as tag}
      <li
        class="text-neutral-500 text-xs py-1 px-2 bg-neutral-200 rounded-full"
      >
        {tag}
      </li>
    {/each}
  </ul>

  <h2 class="text-2xl font-medium tracking-tighter">Cards</h2>
  <a
    href={`/app/docks/${dock.dockId}/practice`}
    class="mb-4 flex items-center text-neutral-600"
  >
    <span>Praticar</span>
    <ChevronRight class="size-4" />
  </a>

  <div class="mb-4 grid grid-cols-2 gap-4">
    <div class="col-span-2 bg-white rounded-md p-4 shadow-md/5">
      <p class="flex items-center gap-1">
        <Brain class="size-4" />
        Total
      </p>
      <h3 class="text-lg font-medium tracking-tighter">
        {cardSummary.total} cartas
      </h3>
    </div>
    <div class="bg-white rounded-md p-4 shadow-md/5">
      <p class="text-sm flex items-center gap-1">
        <Check class="size-4 text-green-500" />
        Corretas
      </p>
      <h3 class="text-lg font-medium tracking-tighter">
        {cardSummary.correct} cartas
      </h3>
    </div>
    <div class="bg-white rounded-md p-4 shadow-md/5">
      <p class="text-sm flex items-center gap-1">
        <XCircle class="size-4 text-red-500" />
        Incorretas
      </p>
      <h3 class="text-lg font-medium tracking-tighter">
        {cardSummary.incorrect} cartas
      </h3>
    </div>
  </div>

  <h2 class="text-2xl font-medium tracking-tighter mb-2">Anotações</h2>
  <ul class="grid gap-4">
    {#each notes as note}
      <li>
        <button
          class="w-full items-start flex flex-col p-4 rounded-md bg-white"
        >
          <h3 class="text-lg font-medium tracking-tighter">{note.title}</h3>
          <p class="text-neutral-600 text-xs">
            Criado em: {new Date(note.createdAt).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </button>
      </li>
    {/each}
  </ul>
</div>
