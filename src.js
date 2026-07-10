function updateWifiStatus() {
    const nameDisplay = document.getElementById('network-name');
    
    const arc1 = document.getElementById('wifi-arc-1');
    const arc2 = document.getElementById('wifi-arc-2');
    const arc3 = document.getElementById('wifi-arc-3');
    const dot = document.getElementById('wifi-dot');

    // 1. Set the Network Name 
    // (Using a placeholder since browsers block reading real SSIDs)
    if (navigator.onLine) {
        nameDisplay.textContent = "Connected"; // <-- Replace with your network name
    } else {
        nameDisplay.textContent = "Disconnected";
    }

    // 2. Adjust Icon Bars based on Speed
    if ('connection' in navigator && navigator.onLine) {
        const speed = navigator.connection.effectiveType; // returns '4g', '3g', '2g', or 'slow-2g'

        // Reset all bars to blue first
        arc1.classList.remove('low-signal');
        arc2.classList.remove('low-signal');
        arc3.classList.remove('low-signal');
        dot.classList.remove('low-signal');

        if (speed === '3g') {
            // 3G: Fade out the top arc
            arc3.classList.add('low-signal');
        } else if (speed === '2g') {
            // 2G: Fade out the top two arcs
            arc3.classList.add('low-signal');
            arc2.classList.add('low-signal');
        } else if (speed === 'slow-2g') {
            // Very slow: Only the dot stays blue
            arc3.classList.add('low-signal');
            arc2.classList.add('low-signal');
            arc1.classList.add('low-signal');
        }
        // If speed is '4g' (Excellent), all bars remain blue!
        
    } else if (!navigator.onLine) {
        // Totally offline: Make the whole icon gray
        arc1.classList.add('low-signal');
        arc2.classList.add('low-signal');
        arc3.classList.add('low-signal');
        dot.classList.add('low-signal');
    }
}

// Initialize on load
window.addEventListener('load', updateWifiStatus);

// Update live if network or speed changes
if ('connection' in navigator) {
    navigator.connection.addEventListener('change', updateWifiStatus);
}
window.addEventListener('online', updateWifiStatus);
window.addEventListener('offline', updateWifiStatus);