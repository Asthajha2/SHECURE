let appData = {
    userPlan: 'free',
    selectedPrice: { plan: 'free', duration: 'free' },
    guardians: [
        { name: "Mom", phone: "+91 98765 43210", relation: "Parent" }
    ],
    safePlaces: [
        { name: "Central Police Station", type: "police", lat: 40.7128, lng: -74.0060, phone: "+1 234 567 8900", distance: "0.8 km" },
        { name: "City General Hospital", type: "hospital", lat: 40.7138, lng: -74.0070, phone: "+1 234 567 8901", distance: "1.2 km" },
        { name: "24/7 Pharmacy", type: "pharmacy", lat: 40.7118, lng: -74.0050, phone: "+1 234 567 8902", distance: "0.5 km" },
        { name: "Women Safety Center", type: "safety", lat: 40.7148, lng: -74.0080, phone: "+1 234 567 8903", distance: "1.5 km" },
        { name: "Mall Security", type: "security", lat: 40.7108, lng: -74.0040, phone: "+1 234 567 8904", distance: "0.9 km" }
    ],
    riskLevel: 0.3,
    userLocation: { lat: 40.7128, lng: -74.0060 },
    map: null,
    stats: {
        sosUsed: 0,
        safeDays: 45,
        riskScans: 128
    },
    settings: {
        notifications: {
            sosAlerts: true,
            riskAlerts: true,
            locationUpdates: true,
            safetyTips: true,
            vibration: true
        },
        privacy: {
            locationSharing: true,
            appLock: false,
            dataBackup: true,
            incognitoMode: false
        },
        appearance: {
            theme: 'light',
            fontSize: 16
        }
    },
    
    // User profile data
    userProfile: {
        fullName: "Ananya Sharma",
        email: "ananya@example.com",
        phone: "+91 98765 43210",
        password: "password123",
        dob: "1995-05-15",
        emergencyContact: "Mom",
        address: "123 Safety Street, Mumbai, India",
        joinDate: "Jan 2024",
        avatar: "fas fa-female"
    },
    
    fakeCallTimer: null,
    fakeCallSeconds: 0,
    sosTimer: null,
    sosCountdown: 3,
    isSOSActive: false,
    isAuthenticated: false
};

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    startSplashScreen();
});

// ========== SPLASH SCREEN ==========
function startSplashScreen() {
    let progress = 0;
    const loadingText = document.getElementById('loadingText');
    const loadingProgress = document.getElementById('loadingProgress');
    const messages = [
        "Initializing Safety Systems",
        "Loading AI Protection",
        "Setting Up Emergency Features",
        "Preparing Your Security Dashboard",
        "Almost Ready..."
    ];
    let messageIndex = 0;
    
    loadingText.textContent = messages[messageIndex];
    
    const loadingInterval = setInterval(() => {
        progress += 10;
        if (progress > 100) progress = 100;
        
        loadingProgress.style.width = `${progress}%`;
        
        if (progress >= 20 && messageIndex < 1) {
            messageIndex = 1;
            loadingText.textContent = messages[messageIndex];
        } else if (progress >= 40 && messageIndex < 2) {
            messageIndex = 2;
            loadingText.textContent = messages[messageIndex];
        } else if (progress >= 60 && messageIndex < 3) {
            messageIndex = 3;
            loadingText.textContent = messages[messageIndex];
        } else if (progress >= 80 && messageIndex < 4) {
            messageIndex = 4;
            loadingText.textContent = messages[messageIndex];
        }
        
        if (progress >= 100) {
            clearInterval(loadingInterval);
            
            setTimeout(() => {
                document.getElementById('splashScreen').classList.add('hidden');
                
                if (checkAuthStatus()) {
                    document.body.classList.add('app-authenticated');
                    initMainApp();
                } else {
                    showLoginScreen();
                }
            }, 500);
        }
    }, 200);
}
// ========== AUTH FUNCTIONS ==========
function showLoginScreen() {
    document.getElementById('loginScreen').classList.remove('hidden');
    
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        login();
    });
    
    document.getElementById('goToSignup').addEventListener('click', function(e) {
        e.preventDefault();
        showSignupScreen();
    });
    
    document.getElementById('googleLogin').addEventListener('click', function() {
        showToast("Google login would be implemented here", "info");
    });
    
    document.getElementById('phoneLogin').addEventListener('click', function() {
        showToast("Phone login would be implemented here", "info");
    });
}

function showSignupScreen() {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('signupScreen').classList.remove('hidden');
    
    document.getElementById('signupForm').addEventListener('submit', function(e) {
        e.preventDefault();
        signup();
    });
    
    document.getElementById('goToLogin').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('signupScreen').classList.add('hidden');
        document.getElementById('loginScreen').classList.remove('hidden');
    });
    
    document.getElementById('googleSignup').addEventListener('click', function() {
        showToast("Google signup would be implemented here", "info");
    });
    
    document.getElementById('phoneSignup').addEventListener('click', function() {
        showToast("Phone signup would be implemented here", "info");
    });
}

function login() {
    const emailOrPhone = document.querySelector('#loginForm input[type="text"]').value;
    const password = document.querySelector('#loginForm input[type="password"]').value;
    
    if (!emailOrPhone || !password) {
        showToast("Please enter both email/phone and password", "error");
        return;
    }
    
    const savedProfile = localStorage.getItem('shesecure_userProfile');
    if (savedProfile) {
        const userProfile = JSON.parse(savedProfile);
        
        if ((userProfile.email === emailOrPhone || userProfile.phone === emailOrPhone) && 
            userProfile.password === password) {
            
            appData.isAuthenticated = true;
            appData.userProfile = userProfile;
            localStorage.setItem('shesecure_authenticated', 'true');
            
            document.getElementById('loginScreen').classList.add('hidden');
            document.getElementById('signupScreen').classList.add('hidden');
            
            document.body.classList.add('app-authenticated');
            showToast(`Welcome back, ${userProfile.fullName}!`, "success");
            
            initMainApp();
        } else {
            showToast("Invalid email/phone or password", "error");
        }
    } else {
        if (emailOrPhone === "demo@demo.com" && password === "demo123") {
            appData.isAuthenticated = true;
            localStorage.setItem('shesecure_authenticated', 'true');
            
            document.getElementById('loginScreen').classList.add('hidden');
            document.getElementById('signupScreen').classList.add('hidden');
            
            document.body.classList.add('app-authenticated');
            showToast("Welcome to SHE-SECURE! Using demo account.", "success");
            
            initMainApp();
        } else {
            showToast("No account found. Please sign up first.", "error");
        }
    }
}

function signup() {
    const fullName = document.querySelectorAll('#signupForm input')[0].value;
    const email = document.querySelectorAll('#signupForm input')[1].value;
    const phone = document.querySelectorAll('#signupForm input')[2].value;
    const password = document.querySelectorAll('#signupForm input')[3].value;
    
    if (!fullName || !email || !phone || !password) {
        showToast("Please fill all required fields", "error");
        return;
    }
    
    if (password.length < 6) {
        showToast("Password must be at least 6 characters", "error");
        return;
    }
    
    appData.userProfile = {
        fullName: fullName,
        email: email,
        phone: phone,
        password: password,
        dob: "1995-05-15",
        emergencyContact: "Mom",
        address: "",
        joinDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        avatar: "fas fa-female"
    };
    
    localStorage.setItem('shesecure_userProfile', JSON.stringify(appData.userProfile));
    
    appData.isAuthenticated = true;
    localStorage.setItem('shesecure_authenticated', 'true');
    
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('signupScreen').classList.add('hidden');
    
    document.body.classList.add('app-authenticated');
    showToast(`Welcome to SHE-SECURE, ${fullName}!`, "success");
    
    initMainApp();
}

function logout() {
    if (confirm("Are you sure you want to logout?")) {
        appData.isAuthenticated = false;
        appData.userProfile = null;
        localStorage.removeItem('shesecure_authenticated');
        
        document.body.classList.remove('app-authenticated');
        
        showLoginScreen();
        
        closeModal('profileModal');
        
        showToast("Logged out successfully", "info");
    }
}

function checkAuthStatus() {
    const isAuthenticated = localStorage.getItem('shesecure_authenticated') === 'true';
    const savedProfile = localStorage.getItem('shesecure_userProfile');
    
    if (isAuthenticated && savedProfile) {
        appData.isAuthenticated = true;
        appData.userProfile = JSON.parse(savedProfile);
        return true;
    }
    return false;
}

// ========== PROFILE FUNCTIONS ==========
function showProfileModal() {
    closeAllModals();
    document.getElementById('profileModal').style.display = 'flex';
    updateProfileDisplay();
}

function updateProfileDisplay() {
    document.getElementById('profileUserName').textContent = appData.userProfile.fullName;
    document.getElementById('profileFullName').textContent = appData.userProfile.fullName;
    document.getElementById('profileEmail').textContent = appData.userProfile.email;
    document.getElementById('profilePhone').textContent = appData.userProfile.phone;
    document.getElementById('profileJoinDate').textContent = appData.userProfile.joinDate;
    document.getElementById('profileAvatar').className = appData.userProfile.avatar;
    
    document.getElementById('sosCount').textContent = appData.stats.sosUsed;
    document.getElementById('safeDays').textContent = appData.stats.safeDays;
    document.getElementById('riskScans').textContent = appData.stats.riskScans;
    document.getElementById('profileGuardianCount').textContent = `${appData.guardians.length}/${appData.userPlan === 'free' ? 1 : 5}`;
    document.getElementById('profilePlan').textContent = 
        appData.userPlan === 'free' ? 'Free' : 
        appData.userPlan === 'premiumAd' ? 'Premium with Ads' : 
        'Premium No Ads';
}

function editProfile() {
    closeModal('profileModal');
    document.getElementById('editProfileModal').style.display = 'flex';
    
    document.getElementById('editFullName').value = appData.userProfile.fullName;
    document.getElementById('editEmail').value = appData.userProfile.email;
    document.getElementById('editPhone').value = appData.userProfile.phone;
    document.getElementById('editDOB').value = appData.userProfile.dob;
    document.getElementById('editEmergencyContact').value = appData.userProfile.emergencyContact;
    document.getElementById('editAddress').value = appData.userProfile.address;
    
    document.getElementById('editProfileForm').onsubmit = function(e) {
        e.preventDefault();
        saveProfileChanges();
    };
}
function saveProfileChanges() {
    appData.userProfile.fullName = document.getElementById('editFullName').value;
    appData.userProfile.email = document.getElementById('editEmail').value;
    appData.userProfile.phone = document.getElementById('editPhone').value;
    appData.userProfile.dob = document.getElementById('editDOB').value;
    appData.userProfile.emergencyContact = document.getElementById('editEmergencyContact').value;
    appData.userProfile.address = document.getElementById('editAddress').value;

    localStorage.setItem('shesecure_userProfile', JSON.stringify(appData.userProfile));

    closeModal('editProfileModal');
    showProfileModal();

    showToast("Profile updated successfully!", "success");
}

// ========== SETTINGS FUNCTIONS ==========
function openSettingsModal() {
    closeAllModals();
    document.getElementById('settingsModal').style.display = 'flex';
    loadSettingsIntoForm();
}

function loadSettingsIntoForm() {
    document.getElementById('sosAlertToggle').value = appData.settings.notifications.sosAlerts ? "on" : "off";
    document.getElementById('riskAlertToggle').value = appData.settings.notifications.riskAlerts ? "on" : "off";
    document.getElementById('locationUpdatesToggle').value = appData.settings.notifications.locationUpdates ? "on" : "off";
    document.getElementById('safetyTipsToggle').value = appData.settings.notifications.safetyTips ? "on" : "off";
    document.getElementById('vibrationToggle').value = appData.settings.notifications.vibration ? "on" : "off";

    document.getElementById('locationSharingToggle').value = appData.settings.privacy.locationSharing ? "on" : "off";
    document.getElementById('appLockToggle').value = appData.settings.privacy.appLock ? "on" : "off";
    document.getElementById('dataBackupToggle').value = appData.settings.privacy.dataBackup ? "on" : "off";
    document.getElementById('incognitoModeToggle').value = appData.settings.privacy.incognitoMode ? "on" : "off";

    document.getElementById('themeSelect').value = appData.settings.appearance.theme;
    document.getElementById('fontSizeSelect').value = appData.settings.appearance.fontSize;
}

function saveSettings() {
    appData.settings.notifications.sosAlerts = document.getElementById('sosAlertToggle').value === "on";
    appData.settings.notifications.riskAlerts = document.getElementById('riskAlertToggle').value === "on";
    appData.settings.notifications.locationUpdates = document.getElementById('locationUpdatesToggle').value === "on";
    appData.settings.notifications.safetyTips = document.getElementById('safetyTipsToggle').value === "on";
    appData.settings.notifications.vibration = document.getElementById('vibrationToggle').value === "on";

    appData.settings.privacy.locationSharing = document.getElementById('locationSharingToggle').value === "on";
    appData.settings.privacy.appLock = document.getElementById('appLockToggle').value === "on";
    appData.settings.privacy.dataBackup = document.getElementById('dataBackupToggle').value === "on";
    appData.settings.privacy.incognitoMode = document.getElementById('incognitoModeToggle').value === "on";

    appData.settings.appearance.theme = document.getElementById('themeSelect').value;
    appData.settings.appearance.fontSize = parseInt(document.getElementById('fontSizeSelect').value);

    applyAppearanceSettings();

    closeModal('settingsModal');
    showToast("Settings updated successfully!", "success");
}

function applyAppearanceSettings() {
    document.body.classList.remove('theme-light', 'theme-dark', 'theme-system');
    document.body.classList.add(`theme-${appData.settings.appearance.theme}`);

    document.documentElement.style.fontSize = `${appData.settings.appearance.fontSize}px`;
}

function resetSettings() {
    if (confirm("Reset all settings to default?")) {
        appData.settings = {
            notifications: {
                sosAlerts: true,
                riskAlerts: true,
                locationUpdates: true,
                safetyTips: true,
                vibration: true
            },
            privacy: {
                locationSharing: true,
                appLock: false,
                dataBackup: true,
                incognitoMode: false
            },
            appearance: {
                theme: 'light',
                fontSize: 16
            }
        };

        applyAppearanceSettings();
        loadSettingsIntoForm();

        showToast("Settings restored to default", "info");
    }
}

// ========== NAVIGATION ==========
function openTab(tabName) {
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });

    document.querySelectorAll('.footer-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById(tabName).classList.add('active');
    document.querySelector(`[onclick="openTab('${tabName}')"]`).classList.add('active');
}

function initMainApp() {
    updateProfileDisplay();
    openTab('home');

    if (!document.getElementById('mapContainer').dataset.initialized) {
        initMaps();
        document.getElementById('mapContainer').dataset.initialized = "true";
    }

    applyAppearanceSettings();
}

// ========== MODAL FUNCTIONS ==========
function openModal(modalId) {
    closeAllModals();
    document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

// ========== SOS FUNCTIONS ==========
function handleSOSPress() {
    if (appData.isSOSActive) {
        showToast("SOS is already active!", "error");
        return;
    }

    appData.sosCountdown = 3;
    document.getElementById('sosCountdown').textContent = appData.sosCountdown;

    openModal('sosAlertModal');

    appData.sosTimer = setInterval(() => {
        appData.sosCountdown--;
        document.getElementById('sosCountdown').textContent = appData.sosCountdown;

        if (appData.settings.notifications.vibration && navigator.vibrate) {
            navigator.vibrate(200);
        }

        if (appData.sosCountdown <= 0) {
            clearInterval(appData.sosTimer);
            activateSOS();
        }
    }, 1000);
}

function cancelSOS() {
    clearInterval(appData.sosTimer);
    closeModal('sosAlertModal');
    showToast("SOS cancelled", "info");
}

function activateSOS() {
    closeModal('sosAlertModal');
    appData.isSOSActive = true;

    appData.stats.sosUsed++;
    document.getElementById('sosCount').textContent = appData.stats.sosUsed;

    document.getElementById('sosButton').classList.add('sos-active');

    showToast("SOS Activated! Alerts sent to guardians.", "success");

    setTimeout(() => {
        deactivateSOS();
    }, 15000);
}

function deactivateSOS() {
    if (!appData.isSOSActive) return;
    
    appData.isSOSActive = false;
    document.getElementById('sosButton').classList.remove('sos-active');
    
    showToast("SOS Deactivated", "info");
}
// ========== FAKE CALL FUNCTIONS ==========
function openFakeCallModal() {
    openModal('fakeCallModal');
}

function startFakeCall() {
    closeModal('fakeCallModal');
    openModal('fakeCallScreen');

    appData.fakeCallSeconds = 0;

    appData.fakeCallTimer = setInterval(() => {
        appData.fakeCallSeconds++;
        document.getElementById('fakeCallTime').textContent = 
            formatTime(appData.fakeCallSeconds);

        if (appData.settings.notifications.vibration && navigator.vibrate) {
            navigator.vibrate([200, 100, 200]);
        }
    }, 1000);
}

function endFakeCall() {
    clearInterval(appData.fakeCallTimer);
    closeModal('fakeCallScreen');
}

function formatTime(seconds) {
    let mins = Math.floor(seconds / 60);
    let secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// ========== MAPS ==========
function initMaps() {
    appData.map = L.map('mapContainer').setView([appData.userLocation.lat, appData.userLocation.lng], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
    }).addTo(appData.map);

    L.marker([appData.userLocation.lat, appData.userLocation.lng])
        .addTo(appData.map)
        .bindPopup("You are here")
        .openPopup();

    appData.safePlaces.forEach(place => {
        const markerIcon = getMarkerIcon(place.type);

        L.marker([place.lat, place.lng], { icon: markerIcon })
            .addTo(appData.map)
            .bindPopup(`
                <strong>${place.name}</strong><br>
                Type: ${place.type.toUpperCase()}<br>
                Distance: ${place.distance}<br>
                <button onclick="callNumber('${place.phone}')">Call</button>
            `);
    });
}

function getMarkerIcon(type) {
    let color = "blue";

    if (type === "police") color = "darkblue";
    if (type === "hospital") color = "red";
    if (type === "pharmacy") color = "green";
    if (type === "safety") color = "purple";

    return L.icon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
        shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41]
    });
}

function callNumber(phone) {
    showToast(`Calling ${phone}...`, "info");
}

// ========== GUARDIANS ==========
function openGuardianModal() {
    openModal('guardianModal');
    renderGuardianList();
}

function renderGuardianList() {
    const container = document.getElementById('guardianList');
    container.innerHTML = "";

    appData.guardians.forEach((g, index) => {
        const div = document.createElement("div");
        div.classList.add("guardian-item");

        div.innerHTML = `
            <div>
                <strong>${g.name}</strong>
                <p>${g.relation} — ${g.phone}</p>
            </div>
            <button onclick="removeGuardian(${index})">
                <i class="fas fa-trash"></i>
            </button>
        `;

        container.appendChild(div);
    });

    document.getElementById("guardianCountDisplay").textContent =
        `${appData.guardians.length}/${appData.userPlan === "free" ? 1 : 5}`;
}

function addGuardian() {
    if (appData.userPlan === "free" && appData.guardians.length >= 1) {
        openPremiumPopup();
        return;
    }

    const name = document.getElementById("guardianName").value;
    const phone = document.getElementById("guardianPhone").value;
    const relation = document.getElementById("guardianRelation").value;

    if (!name || !phone || !relation) {
        showToast("Please fill all fields", "error");
        return;
    }

    appData.guardians.push({ name, phone, relation });

    document.getElementById("guardianName").value = "";
    document.getElementById("guardianPhone").value = "";
    document.getElementById("guardianRelation").value = "";

    renderGuardianList();

    showToast("Guardian added!", "success");
}

function removeGuardian(index) {
    if (confirm("Remove this guardian?")) {
        appData.guardians.splice(index, 1);
        renderGuardianList();
        showToast("Guardian removed", "info");
    }
}

// ========== SAFE PLACES MODAL ==========
function openSafePlacesModal() {
    openModal("safePlacesModal");
    renderSafePlaces();
}

function renderSafePlaces() {
    const list = document.getElementById("safePlacesList");
    list.innerHTML = "";

    appData.safePlaces.forEach(place => {
        const item = document.createElement("div");
        item.classList.add("safe-place-item");

        const icon = ({
            police: "fa-shield-alt",
            hospital: "fa-hospital",
            pharmacy: "fa-pills",
            safety: "fa-female"
        })[place.type];

        item.innerHTML = `
            <i class="fas ${icon}"></i>
            <div>
                <h4>${place.name}</h4>
                <p>${place.distance} away</p>
            </div>
            <button onclick="callNumber('${place.phone}')">
                <i class="fas fa-phone"></i>
            </button>
        `;

        list.appendChild(item);
    });
}

// ========== LEARN SECTION ==========
function switchLearnCategory(category) {
    document.querySelectorAll('.learn-category').forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById(`learnTab-${category}`).classList.add('active');

    document.querySelectorAll('.learn-content').forEach(content => {
        content.classList.remove('active');
    });

    document.getElementById(`learnContent-${category}`).classList.add('active');
}
// ========== SUBSCRIPTION ==========
function openSubscriptionModal() {
    openModal('subscriptionModal');
}

function selectPrice(plan, duration) {
    appData.selectedPrice = { plan, duration };

    document.querySelectorAll('.price-box').forEach(box => {
        box.classList.remove('selected');
    });

    const selector = `[data-plan="${plan}"][data-duration="${duration}"]`;
    document.querySelector(selector).classList.add('selected');
}

function subscribe() {
    const { plan, duration } = appData.selectedPrice;

    if (plan === "free") {
        showToast("You are already using the Free plan.", "info");
        return;
    }

    appData.userPlan =
        plan === "premium-ad" ? "premiumAd" :
        plan === "premium-no-ad" ? "premiumNoAd" :
        "free";

    closeModal("subscriptionModal");

    showToast("Subscription updated successfully!", "success");

    renderGuardianList();
}

// ========== PREMIUM POPUP ==========
function openPremiumPopup() {
    openModal('premiumPopup');
}

function goToSubscription() {
    closeModal('premiumPopup');
    openSubscriptionModal();
}

// ========== SAFETY PLAN ==========
function openSafetyPlanModal() {
    openModal('safetyPlanModal');
}

function saveSafetyPlan() {
    const dangerSigns = document.getElementById("dangerSigns").value;
    const safePeople = document.getElementById("safePeople").value;
    const safePlaces = document.getElementById("safePlacesPlan").value;
    const actionSteps = document.getElementById("actionSteps").value;

    if (!dangerSigns || !safePeople || !safePlaces || !actionSteps) {
        showToast("Please complete all fields", "error");
        return;
    }

    localStorage.setItem("shesecure_safetyPlan", JSON.stringify({
        dangerSigns,
        safePeople,
        safePlaces,
        actionSteps
    }));

    closeModal("safetyPlanModal");
    showToast("Safety Plan saved!", "success");
}

// ========== INCIDENT REPORT ==========
function openIncidentModal() {
    openModal('incidentModal');
}

function submitIncidentReport() {
    const location = document.getElementById("incidentLocation").value;
    const type = document.getElementById("incidentType").value;
    const details = document.getElementById("incidentDetails").value;

    if (!location || !type || !details) {
        showToast("Please fill in all fields", "error");
        return;
    }

    closeModal("incidentModal");

    showToast("Incident Report submitted. Authorities will be notified.", "success");
}

// ========== AI RISK SCANNER ==========
function openRiskScanner() {
    openModal("riskScannerModal");
    startRiskScan();
}

function startRiskScan() {
    const bar = document.getElementById("riskScanBar");
    const result = document.getElementById("riskScanResult");

    bar.style.width = "0%";
    result.textContent = "";

    let progress = 0;

    const interval = setInterval(() => {
        progress += 5;
        bar.style.width = progress + "%";

        if (progress >= 100) {
            clearInterval(interval);
            analyzeRiskResult();
        }
    }, 120);
}

function analyzeRiskResult() {
    const risk = Math.random();

    appData.riskLevel = risk;
    appData.stats.riskScans++;

    document.getElementById("riskScans").textContent = appData.stats.riskScans;

    const resultText = document.getElementById("riskScanResult");

    if (risk < 0.33) {
        resultText.textContent = "Low Risk Area — Stay Aware.";
        resultText.style.color = "green";
    } else if (risk < 0.66) {
        resultText.textContent = "Moderate Risk Area — Be Cautious.";
        resultText.style.color = "orange";
    } else {
        resultText.textContent = "High Risk Area — Stay Alert!";
        resultText.style.color = "red";
    }
}

// ========== TOAST NOTIFICATION ==========
function showToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.classList.add("toast");

    if (type === "success") toast.classList.add("toast-success");
    if (type === "error") toast.classList.add("toast-error");
    if (type === "info") toast.classList.add("toast-info");

    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 100);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}
