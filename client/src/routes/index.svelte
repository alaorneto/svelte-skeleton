<script>
    import { get } from '$lib/utils/http'
    import { session } from '$app/stores';
    async function foo() {
      const data = await get('/api/');
    }
    foo();
    console.log($session.user);
</script>

<h1 class="text-1xl font-bold underline">Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
