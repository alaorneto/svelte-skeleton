<script>
	import { session } from '$app/stores';
	import { onMount } from 'svelte';

  	let show = false; // menu state
  	/**
	* @type {{ contains: (arg0: any) => any; } | null}
	*/
  	let menu = null; // menu wrapper DOM reference
	
  	onMount(() => {
    	const handleOutsideClick = (/** @type {{ target: any; }} */ event) => {
      	
			if (show && !menu?.contains(event.target)) {
				show = false;
			}
		};

		const handleEscape = (/** @type {{ key: string; }} */ event) => {
			if (show && event.key === 'Escape') {
				show = false;
			}
		};

		// add events when element is added to the DOM
		document.addEventListener('click', handleOutsideClick, false);
		document.addEventListener('keyup', handleEscape, false);

		// remove events when element is removed from the DOM
		return () => {
			document.removeEventListener('click', handleOutsideClick, false);
			document.removeEventListener('keyup', handleEscape, false);
		};
	});

</script>
	

{#if !$session.user}
<a href="/login" class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">Entre</a>
{:else}
<!-- Profile dropdown -->
<div class="ml-3 relative"  bind:this={menu}>
	<div>
		<button
			type="button"
			on:click={() => (show = !show)}
			class="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
			id="user-menu-button"
			aria-expanded="false"
			aria-haspopup="true"
		>
			<span class="sr-only">Open user menu</span>
			<img
				class="h-8 w-8 rounded-full"
				src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
				alt=""
			/>
		</button>
	</div>

	<!--
	Dropdown menu, show/hide based on menu state.

	Entering: "transition ease-out duration-100"
		From: "transform opacity-0 scale-95"
		To: "transform opacity-100 scale-100"
	Leaving: "transition ease-in duration-75"
		From: "transform opacity-100 scale-100"
		To: "transform opacity-0 scale-95"
	-->
	{#if show}
	<div
		class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
		role="menu"
		aria-orientation="vertical"
		aria-labelledby="user-menu-button"
		tabindex="-1"
	>
		<!-- Active: "bg-gray-100", Not Active: "" -->
		<a
			href="/profile"
			class="block px-4 py-2 text-sm text-gray-700"
			role="menuitem"
			tabindex="-1"
			id="user-menu-item-0">Your Profile</a
		>

		<a
			href="/settings"
			class="block px-4 py-2 text-sm text-gray-700"
			role="menuitem"
			tabindex="-1"
			id="user-menu-item-1">Settings</a
		>

		<a
			href="/logout"
			class="block px-4 py-2 text-sm text-gray-700"
			role="menuitem"
			tabindex="-1"
			id="user-menu-item-2">Sign out</a
		>
	</div>
	{/if}
</div>
{/if}