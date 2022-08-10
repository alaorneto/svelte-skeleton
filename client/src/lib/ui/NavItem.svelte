<script>
    export let name = "Link";
    export let url = "#";
    export let active = false;
</script>

<a href="{url}" class:text-white={active} class:text-gray-300={!active} class:bg-gray-900={active} class:hover:bg-gray-700={!active} class:hover:text-white={!active} class="px-3 py-2 rounded-md text-sm font-medium" aria-current={active?"page":null}>{name}</a>
