const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    // store the event to be used later
    deferredPrompt = event;
    // show the install button
    butInstall.style.display = 'block';
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    // hide the install button
    butInstall.style.display = 'none';
    // show the install prompt
    deferredPrompt.prompt();
    // wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    // log the result of the prompt
    console.log(`User response to the install prompt: ${outcome}`);
    // reset the deferred prompt variable, as it can only be used once
    deferredPrompt = null;
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // log the result of the app installed event
    console.log('App was installed', event);
});
