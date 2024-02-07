window.addEventListener('storage', function(event) {
    console.log(event.key);
    if (event.key === 'theme') {
        console.log('ok');
    }
});

// document.addEventListener('DOMContentLoaded', () => {
//     document.body.addEventListener('dropdown-expanded', (event: CustomEvent) => {
//         const toggleThemeSwitch = document.getElementById('toggle-theme-switch') as HTMLElement;
//         toggleThemeSwitch.addEventListener('toggle-changed', (event: Event): void => {
//             console.log('switched!');
//         });
//     });
// });


// window.addEventListener('load', () => {
//     const toggleThemeSwitch = document.getElementById('toggle-theme-switch') as HTMLElement;
//     console.log("Ok");
//     toggleThemeSwitch.addEventListener('toggle-changed', (event: Event): void => {
//         console.log('switched!');
//     });
// });
