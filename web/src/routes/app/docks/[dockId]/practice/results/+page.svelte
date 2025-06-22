<script lang="ts">
  const data = JSON.parse(localStorage.getItem("deckState") || "{}");
</script>

<pre>{JSON.stringify(data, null, 2)}</pre>
