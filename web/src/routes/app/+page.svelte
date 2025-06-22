<script lang="ts">
  import {
    BookOpen,
    Flame,
    FolderOpen,
    Home,
    Plus,
    UserIcon,
  } from "@lucide/svelte";
  import AppHeader from "src/components/common/AppHeader.svelte";
  import { gradientMap } from "src/globals/gradients";
  import type { Dock, Stats, User } from "src/domain/types";

  let user = $state<User>({
    firstName: "Eder",
    imageUrl: "https://github.com/asynched.png",
  });

  const stats = $state<Stats>({
    streak: 10,
    cardsStudied: 28,
    docksReviewed: 3,
  });

  let docks = $state<Dock[]>([
    {
      dockId: crypto.randomUUID(),
      emoji: "🇪🇸",
      name: "Espanhol",
      tags: ["Idiomas"],
      description: "Aprendendo espanhol",
      theme: "red-on-yellow",
      createdAt: "2025-01-01",
      updatedAt: "2025-01-01",
    },
    {
      dockId: crypto.randomUUID(),
      emoji: "🧪",
      name: "Haskell",
      tags: ["Programação", "Funcional"],
      description: "Lista de haskell",
      theme: "purple-on-blue",
      createdAt: "2025-01-01",
      updatedAt: "2025-01-01",
    },
    {
      dockId: crypto.randomUUID(),
      emoji: "📐",
      name: "Matemática",
      tags: ["Matemática", "Exatas"],
      description: "Lista de temas e exercícios de matemática",
      theme: "sky-on-blue",
      createdAt: "2025-01-01",
      updatedAt: "2025-01-01",
    },
    {
      dockId: crypto.randomUUID(),
      emoji: "💼",
      name: "Trabalho",
      tags: ["Trabalho", "Negócios"],
      description: "Anotações e cards de termos do trabalho",
      theme: "neutral",
      createdAt: "2025-01-01",
      updatedAt: "2025-01-01",
    },
    {
      dockId: crypto.randomUUID(),
      emoji: "📚",
      name: "Livros",
      tags: ["Livros"],
      description: "Anotações sobre os últimos livros que li",
      theme: "indigo-on-purple",
      createdAt: "2025-01-01",
      updatedAt: "2025-01-01",
    },
  ]);
</script>

<AppHeader />

<div class="p-4">
  <h1 class="text-4xl font-medium tracking-tighter">
    Bom dia, <span
      class="pr-1 bg-gradient-to-br from-red-500 to-orange-500 bg-clip-text text-transparent"
      >{user.firstName}.</span
    >
  </h1>
  <p class="text-sm text-neutral-600 mb-4">O que você vai aprender hoje?</p>

  <div class="mb-6 grid grid-cols-2 gap-4">
    <div class="bg-white rounded-md p-4 shadow-md/5 col-span-2">
      <div class="text-sm flex items-center gap-1 text-neutral-600">
        <Flame class="size-4 text-orange-600" />
        <span class="tracking-tight">Sequência</span>
      </div>
      <h3 class="text-lg font-medium tracking-tighter">
        {stats.streak || 0} dias
      </h3>
    </div>
    <div class="bg-white rounded-md p-4 shadow-md/5">
      <div class="text-sm flex items-center gap-1 text-neutral-600">
        <BookOpen class="size-4" />
        <span class="tracking-tight">Cartões</span>
      </div>
      <h3 class="text-lg font-medium tracking-tighter">
        {stats.cardsStudied || 0} estudados
      </h3>
    </div>
    <div class="bg-white rounded-md p-4 shadow-md/5">
      <div class="text-sm flex items-center gap-1 text-neutral-600">
        <FolderOpen class="size-4" />
        <span class="tracking-tight">Docks</span>
      </div>
      <h3 class="text-lg font-medium tracking-tighter">
        {stats.docksReviewed || 0} revisadas
      </h3>
    </div>
  </div>

  <h2 class="text-2xl font-medium tracking-tighter mb-2">Suas docks</h2>
  <ul class="grid gap-4 pb-14">
    {#each docks as dock}
      <a
        href={`/app/docks/${dock.dockId}`}
        class="rounded-lg overflow-hidden bg-white shadow-md/5"
      >
        <div
          class={`h-12 ${gradientMap[dock.theme]} flex items-center px-4`}
        ></div>
        <div class="p-4 flex flex-col items-start">
          <h2 class="text-2xl font-medium tracking-tighter">
            {dock.name}
            {dock.emoji}
          </h2>

          <p class="text-neutral-600 mb-2 text-sm">{dock.description}</p>
          <ul class="flex flex-wrap gap-1">
            {#each dock.tags as tag}
              <li
                class="text-neutral-500 text-xs py-1 px-2 bg-neutral-100 rounded-full"
              >
                {tag}
              </li>
            {/each}
          </ul>
        </div>
      </a>
    {/each}
  </ul>
</div>

<div
  class="fixed bottom-0 left-0 w-full h-14 bg-white/75 backdrop-blur-sm flex items-center justify-around px-8"
>
  <button aria-label="Início" class="text-neutral-600">
    <Home class="size-6" />
  </button>
  <button
    aria-label="Adicionar"
    class="bg-orange-500 p-2 rounded-full text-white"
  >
    <Plus class="size-6" />
  </button>
  <button aria-label="Perfil" class="text-neutral-600">
    <UserIcon class="size-6" />
  </button>
</div>
