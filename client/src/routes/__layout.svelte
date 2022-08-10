<script>
    import Nav from "$lib/ui/Nav.svelte";
    import NavItem from "$lib/ui/NavItem.svelte";
    import NavProfile from "$lib/ui/NavProfile.svelte";
    import NavProfileItem from "$lib/ui/NavProfileItem.svelte";
    import "../app.css";
</script>

<div class="min-h-full">
    
    <Nav>
      <span slot="menu_items">
        <NavItem name="Skeleton" url="/" active={true} />
        <NavItem name="About" url="/about" active={false} />
      </span>
      
      <span slot="profile">
        <NavProfile />
      </span>
    </Nav>
  
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
      </div>
    </header>
    
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Replace with your content -->
        <slot />
        <!-- /End replace -->
      </div>
    </main>
  </div>  


