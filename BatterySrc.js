if ('getBattery' in navigator) {
    navigator.getBattery().then(function(battery) {
        
        function updateWebviewBattery() {
            const level = Math.round(battery.level * 100);
            const isCharging = battery.charging;

            if (isCharging) {
                // Update the text view
                document.getElementById('percentage-label').textContent = level + '%' + ' charging';
                
                // Update the vertical fluid height
                const fluid = document.getElementById('vertical-fluid');
                fluid.style.height = level + '%';
            } else {
                // Update the text view
                document.getElementById('percentage-label').textContent = level + '%';
                
                // Update the vertical fluid height
                const fluid = document.getElementById('vertical-fluid');
                fluid.style.height = level + '%';
            }
        }

        // Run immediately and bind update listeners
        updateWebviewBattery();
        battery.addEventListener('levelchange', updateWebviewBattery);
        battery.addEventListener('chargingchange', updateWebviewBattery);



    });
} else {
    // Elegant fallback if running on unsupported webview engines
    document.getElementById('percentage-label').textContent = "N/A";
}