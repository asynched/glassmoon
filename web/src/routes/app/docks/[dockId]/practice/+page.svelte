<script lang="ts">
  import { goto } from "$app/navigation";
  import { useFSM } from "src/hooks/useFSM.svelte";
  import type { PageData } from "./$types";

  type SvelteProps<T> = {
    data: T;
  };

  type Card = {
    cardId: string;
    question: string;
    answer: string;
  };

  const { data }: SvelteProps<PageData> = $props();

  const cards = $state<Card[]>([
    {
      cardId: "1",
      question: 'Como se diz "Olá" em espanhol?',
      answer: "Hola",
    },
    {
      cardId: "2",
      question: 'O que quer dizer a expressão "se me escapó de las manos"?',
      answer: "Perdi o controle",
    },
    {
      cardId: "3",
      question: 'Como se diz "Obrigado" em espanhol?',
      answer: "Gracias",
    },
  ]);

  function* range(start: number, end: number) {
    for (let i = start; i < end; i++) {
      yield i;
    }
  }

  const activeClass = `bg-gradient-to-br from-red-500 to-orange-500`;
  const inactiveClass = `bg-neutral-300`;

  const questionState = useFSM({
    states: ["question", "answer"] as const,
    initial: "question",
  });

  let activeIndex = $state(0);
  const deckState = new Map<string, boolean>();

  function handleAnswer(isCorrect: boolean) {
    const cardId = cards[activeIndex].cardId;

    deckState.set(cardId, isCorrect);

    if (activeIndex + 1 === cards.length) {
      const values = Object.fromEntries(deckState.entries());

      const state = JSON.stringify(values);

      localStorage.setItem("deckState", state);

      goto(`/app/docks/${data.dockId}/practice/results`);
      return;
    }

    questionState.next();
    activeIndex++;
  }
</script>

<div class="w-full h-screen p-4 flex flex-col">
  <ul class="flex gap-2 justify-center">
    {#each range(0, cards.length) as idx}
      {@const isActive = idx === activeIndex}
      <li>
        <div
          class={`size-3 rounded-full ${isActive ? activeClass : inactiveClass}`}
        ></div>
      </li>
    {/each}
  </ul>

  <div class="my-auto px-4 py-24 text-center bg-white rounded-lg shadow-xl">
    <p class="text-neutral-500 text-sm mb-2">
      Pergunta {activeIndex + 1} de {cards.length}
    </p>
    <h2 class="text-2xl font-medium tracking-tight">
      {#if questionState.state() === "question"}
        {cards[activeIndex].question}
      {:else}
        {cards[activeIndex].answer}
      {/if}
    </h2>
  </div>
  {#if questionState.state() === "question"}
    <div class="grid gap-4">
      <button
        onclick={questionState.next}
        class="py-4 bg-gradient-to-br from-red-500 to-orange-500 text-white rounded-lg"
        >Ver resposta</button
      >
    </div>
  {:else}
    <div class="grid grid-cols-2 gap-4">
      <button
        onclick={() => handleAnswer(false)}
        class="p-4 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-lg shadow-md shadow-red-500/25"
      >
        Errei
      </button>
      <button
        onclick={() => handleAnswer(true)}
        class="p-4 bg-gradient-to-br from-lime-500 to-green-600 text-white rounded-lg shadow-md shadow-green-500/25"
      >
        Acertei
      </button>
    </div>
  {/if}
</div>
