<script>
    import {goto} from '$app/navigation';
    import {session} from '$app/stores';
    import {browser} from '$app/env';

    async function logout() {
        fetch(`/auth/logout`, {method: "POST"});
        $session.user = undefined;
        goto('/')
    }
    if (browser)
        logout();
</script>