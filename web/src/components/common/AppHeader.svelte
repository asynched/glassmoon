<script lang="ts">
  import { MenuIcon } from "@lucide/svelte";
</script>

<header
  class="sticky top-0 z-10 h-14 bg-white/75 backdrop-blur-sm grid grid-cols-3 items-center px-4"
>
  <button>
    <MenuIcon class="size-5" />
  </button>
  <div class="place-self-center">
    <h1 class="text-2xl font-medium tracking-tighter">
      Glass<span
        class="bg-gradient-to-br from-red-500 to-orange-500 bg-clip-text text-transparent"
        >Moon</span
      >
    </h1>
  </div>
</header>
