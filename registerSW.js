if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/wagmi-safe-bug/sw.js', { scope: '/wagmi-safe-bug/' })})}