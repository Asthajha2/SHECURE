        // App Data - Same as before, no changes needed to JavaScript
        let appData = {
            userPlan: 'free',
            selectedPrice: { plan: 'free', duration: 'free' },
            guardians: [
                { name: "Mom", phone: "+91 98765 43210", relation: "Parent" }
            ],
            safePlaces: [
                { name: "Central Police Station", type: "police", lat: 40.7128, lng: -74.0060, phone: "+1 234 567 8900", distance: "0.7 km" },
                { name: "City General Hospital", type: "hospital", lat: 40.7138, lng: -74.0070, phone: "+1 234 567 8901", distance: "1.2 km" },
                { name: "24/7 Pharmacy", type: "pharmacy", lat: 40.7118, lng: -74.0050, phone: "+1 234 567 8902", distance: "0.5 km" },
                { name: "Downtown Metro Station", type: "metro", lat: 40.7135, lng: -74.0045, phone: "+1 234 567 8905", distance: "0.6 km" },
                { name: "QuickFuel Petrol Pump", type: "petrol", lat: 40.7100, lng: -74.0075, phone: "+1 234 567 8906", distance: "1.0 km" },
                { name: "Spice Garden Restaurant", type: "restaurant", lat: 40.7145, lng: -74.0035, phone: "+1 234 567 8907", distance: "0.9 km" },
                { name: "Women Safety Center", type: "women_help", lat: 40.7148, lng: -74.0080, phone: "+1 234 567 8903", distance: "1.5 km" },
                { name: "City Bus Terminal", type: "transit", lat: 40.7112, lng: -74.0028, phone: "+1 234 567 8908", distance: "1.1 km" },
                { name: "Mall Security", type: "security", lat: 40.7108, lng: -74.0040, phone: "+1 234 567 8904", distance: "0.9 km" }
            ],
            riskLevel: 0.3,
            userLocation: { lat: 40.7128, lng: -74.0060 },
            map: null,
            stats: {
                sosUsed: 0,
                safeDays: 45,
                riskScans: 128,
                journeysCount: 48,
                safeRoutesUsed: 32,
                communityReportsSubmitted: 5,
                safetyScoreSum: 0,
                safetyScoreSamples: 0
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
                avatar: "fas fa-female",
                bloodGroup: "O+",
                allergies: "None known",
                medicalConditions: "None"
            },

            emergencyPreferences: {
                shareMedicalInfo: true,
                silentSOS: false,
                autoNotifyOnJourney: true,
                preferredHelpline: "police",
                voiceSOSEnabled: false,
                voiceCodeWord: "",
                shakeDetectionEnabled: true,
                autoVideoRecording: true
            },
            
            fakeCallTimer: null,
            fakeCallSeconds: 0,
            sosTimer: null,
            sosCountdown: 3,
            isSOSActive: false,
            isAuthenticated: false,

            // ===== New feature state =====
            safetyScore: 82,
            weather: "Clear",
            communityMap: null,
            communityReports: [
                { type: "Poor Lighting", desc: "Street lights not working near the park entrance.", lat: 40.7132, lng: -74.0055, time: "2 hours ago" },
                { type: "Police Patrol", desc: "Regular patrol spotted, area feels secure.", lat: 40.7120, lng: -74.0065, time: "5 hours ago" }
            ],
            journey: {
                active: false,
                destination: "",
                transport: "walking",
                distanceKm: 0,
                etaMinutes: 0,
                progressPercent: 0,
                timer: null,
                checkinTimer: null
            },
            checkin: {
                active: false,
                destination: "",
                reachBy: "",
                timer: null
            },
            chatMessages: [],
            emergencyHistory: [],

            // ===== Live Guardian Tracking =====
            liveTracking: {
                active: false,
                timer: null,
                map: null,
                marker: null,
                battery: 100,
                network: "4G",
                lastMovementTime: Date.now()
            },

            // ===== Voice SOS =====
            voice: {
                recognition: null,
                listening: false,
                supported: ('webkitSpeechRecognition' in window) || ('SpeechRecognition' in window)
            },

            // ===== Shake Detection =====
            shake: {
                enabled: false,
                lastX: null,
                lastY: null,
                lastZ: null,
                shakeCount: 0,
                lastShakeAt: 0,
                needsPermission: (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function')
            },

            // ===== Automatic Video Recording =====
            recording: {
                mediaRecorder: null,
                stream: null,
                chunks: [],
                active: false
            }
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
            document.getElementById('profilePlan').textContent = appData.userPlan === 'free' ? 'Free' : 
                                                                 appData.userPlan === 'premiumAd' ? 'Premium with Ads' : 'Premium No Ads';

            const trustedEl = document.getElementById('profileTrustedGuardians');
            if (trustedEl) trustedEl.innerHTML = `${appData.guardians.length} <i class="fas fa-chevron-right" style="font-size:11px; color:#ccc;"></i>`;

            const bloodEl = document.getElementById('profileBloodGroup');
            const contactEl = document.getElementById('profileEmergencyContactName');
            const allergiesEl = document.getElementById('profileAllergies');
            const conditionsEl = document.getElementById('profileMedicalConditions');
            if (bloodEl) bloodEl.textContent = appData.userProfile.bloodGroup || 'Unknown';
            if (contactEl) contactEl.textContent = appData.userProfile.emergencyContact || '—';
            if (allergiesEl) allergiesEl.textContent = appData.userProfile.allergies || 'None known';
            if (conditionsEl) conditionsEl.textContent = appData.userProfile.medicalConditions || 'None';
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
            document.getElementById('editBloodGroup').value = appData.userProfile.bloodGroup || 'Unknown';
            document.getElementById('editAllergies').value = appData.userProfile.allergies || '';
            document.getElementById('editMedicalConditions').value = appData.userProfile.medicalConditions || '';
            
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
            appData.userProfile.bloodGroup = document.getElementById('editBloodGroup').value;
            appData.userProfile.allergies = document.getElementById('editAllergies').value;
            appData.userProfile.medicalConditions = document.getElementById('editMedicalConditions').value;
            
            localStorage.setItem('shesecure_userProfile', JSON.stringify(appData.userProfile));
            
            updateProfileDisplay();
            
            closeModal('editProfileModal');
            showProfileModal();
            showToast("Profile updated successfully!", "success");
        }

        function changePassword() {
            closeModal('profileModal');
            document.getElementById('changePasswordModal').style.display = 'flex';
            
            document.getElementById('changePasswordForm').onsubmit = function(e) {
                e.preventDefault();
                updatePassword();
            };
        }

        function updatePassword() {
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (currentPassword !== appData.userProfile.password) {
                showToast("Current password is incorrect", "error");
                return;
            }
            
            if (newPassword.length < 6) {
                showToast("New password must be at least 6 characters", "error");
                return;
            }
            
            if (newPassword !== confirmPassword) {
                showToast("New passwords do not match", "error");
                return;
            }
            
            appData.userProfile.password = newPassword;
            
            localStorage.setItem('shesecure_userProfile', JSON.stringify(appData.userProfile));
            
            document.getElementById('currentPassword').value = '';
            document.getElementById('newPassword').value = '';
            document.getElementById('confirmPassword').value = '';
            
            closeModal('changePasswordModal');
            showProfileModal();
            showToast("Password updated successfully!", "success");
        }

        function togglePasswordVisibility() {
            const showPassword = document.getElementById('showPassword').checked;
            const currentPassword = document.getElementById('currentPassword');
            const newPassword = document.getElementById('newPassword');
            const confirmPassword = document.getElementById('confirmPassword');
            
            if (showPassword) {
                currentPassword.type = 'text';
                newPassword.type = 'text';
                confirmPassword.type = 'text';
            } else {
                currentPassword.type = 'password';
                newPassword.type = 'password';
                confirmPassword.type = 'password';
            }
        }

        function changeProfilePicture() {
            showToast("Profile picture change would open here", "info");
            
            const avatars = ['fas fa-female', 'fas fa-user', 'fas fa-user-circle', 'fas fa-user-tie', 'fas fa-user-nurse'];
            const currentIndex = avatars.indexOf(appData.userProfile.avatar);
            const nextIndex = (currentIndex + 1) % avatars.length;
            
            appData.userProfile.avatar = avatars[nextIndex];
            document.getElementById('profileAvatar').className = appData.userProfile.avatar;
            
            localStorage.setItem('shesecure_userProfile', JSON.stringify(appData.userProfile));
            
            showToast("Avatar changed!", "info");
        }

        // ========== MAIN APP INITIALIZATION ==========
        function initMainApp() {
            updateProfileDisplay();
            updateLocationDisplay();
            updateRiskLevel();
            updateGuardiansDisplay();
            updateUIForPlan();
            updateProfileStats();
            loadSafePlaces();
            loadSettings();
            
            // Initialize SOS buttons
            document.getElementById('sosBtn').addEventListener('click', startSOSTimer);
            initNavigationSOS();
            
            setInterval(updateRiskLevel, 10000);
            
            updateMapLockStatus();
            
            switchLearnCategory('self_defense');

            // New feature initialization
            updateHeaderGreeting();
            updateDashboardTiles();
            renderCommunityReportsList();
            updateContextualSafetyTip();
            initSafetyAutomationFeatures();
        }

        // ========== SAFETY AUTOMATION (Voice SOS / Shake Detection) STARTUP ==========
        function initSafetyAutomationFeatures() {
            // Shake Detection: auto-enable on load if the device doesn't need an explicit
            // permission prompt (Android/desktop). iOS requires a user tap, handled via the
            // "Enable Motion Access" button shown in Emergency Preferences.
            if (appData.emergencyPreferences.shakeDetectionEnabled && !appData.shake.needsPermission) {
                startShakeDetection();
            }

            // Voice SOS requires an explicit user gesture to grant mic access in most browsers,
            // so we surface its status but don't auto-start listening without a toggle tap.
            updateVoiceSosUI();
        }

        // ========== HOME DASHBOARD ==========
        function updateHeaderGreeting() {
            const el = document.getElementById('headerGreeting');
            if (!el) return;
            const firstName = (appData.userProfile.fullName || 'there').split(' ')[0];
            el.textContent = `Hello ${firstName} 👋`;
        }

        function updateDashboardTiles() {
            const weatherEl = document.getElementById('dashWeather');
            const placesEl = document.getElementById('dashSafePlaces');
            const journeyEl = document.getElementById('dashJourneyStatus');
            const alertsEl = document.getElementById('dashCommunityAlerts');
            if (weatherEl) weatherEl.textContent = appData.weather;
            if (placesEl) placesEl.textContent = appData.safePlaces.length;
            if (journeyEl) journeyEl.textContent = appData.journey.active ? 'Active' : 'Inactive';
            if (alertsEl) alertsEl.textContent = appData.communityReports.length;
        }

        // ========== AI SAFETY TIPS (CONTEXT-AWARE) ==========
        const SAFETY_TIPS = {
            morning: {
                icon: 'sun',
                tips: [
                    "Carry emergency contacts and keep your phone charged before heading out.",
                    "Mornings are usually safer, but share your commute plan with a guardian."
                ]
            },
            afternoon: {
                icon: 'cloud-sun',
                tips: [
                    "Stay hydrated and keep your location sharing on during busy commutes.",
                    "Prefer main roads over shortcuts, even in daylight."
                ]
            },
            evening: {
                icon: 'cloud-moon',
                tips: [
                    "As it gets darker, plan your route through well-lit, populated areas.",
                    "Let a guardian know your evening plans and expected return time."
                ]
            },
            night: {
                icon: 'moon',
                tips: [
                    "Avoid isolated streets — stick to main roads with more people around.",
                    "Keep your SOS button easily accessible while traveling at night.",
                    "Share your live location with a guardian until you reach home."
                ]
            },
            rain: {
                icon: 'cloud-rain',
                tips: [
                    "Choose well-lit roads and avoid slippery isolated shortcuts in the rain.",
                    "Visibility is lower in rain — wear bright clothing and stay alert to traffic."
                ]
            }
        };

        function getTimeContext() {
            const hour = new Date().getHours();
            if (hour >= 5 && hour < 12) return 'morning';
            if (hour >= 12 && hour < 17) return 'afternoon';
            if (hour >= 17 && hour < 20) return 'evening';
            return 'night';
        }

        function updateContextualSafetyTip() {
            const badgeEl = document.getElementById('safetyTipBadge');
            const iconEl = document.getElementById('safetyTipIcon');
            const textEl = document.getElementById('safetyTipText');
            if (!badgeEl || !textEl) return;

            // Weather takes priority when it's raining, otherwise use time-of-day
            const context = appData.weather === 'Rain' ? 'rain' : getTimeContext();
            const set = SAFETY_TIPS[context];
            const tip = set.tips[Math.floor(Math.random() * set.tips.length)];

            badgeEl.textContent = context.toUpperCase();
            iconEl.className = `fas fa-${set.icon}`;
            textEl.textContent = tip;
        }

        function maybeDriftWeather() {
            // Small chance of weather change each tick, to demo weather-based tips
            if (Math.random() < 0.15) {
                const options = ['Clear', 'Cloudy', 'Rain'];
                appData.weather = options[Math.floor(Math.random() * options.length)];
                updateDashboardTiles();
                updateContextualSafetyTip();
            }
        }

        function initNavigationSOS() {
            const navSosBtn = document.getElementById('navSosBtn');
            
            // Ensure it's always visible
            if (navSosBtn) {
                navSosBtn.style.display = 'flex';
            }
            
            // Add event listener
            navSosBtn.addEventListener('click', startSOSTimer);
            
            // Setup pulsing animation
            let isPulsing = true;
            setInterval(() => {
                if (isPulsing && !appData.isSOSActive) {
                    navSosBtn.style.boxShadow = '0 5px 35px rgba(255, 82, 82, 0.8)';
                    setTimeout(() => {
                        if (!appData.isSOSActive) {
                            navSosBtn.style.boxShadow = '0 5px 25px rgba(255, 82, 82, 0.5)';
                        }
                    }, 500);
                }
            }, 2000);
        }

        // ========== SOS TIMER FUNCTIONS ==========
        function startSOSTimer() {
            if (appData.isSOSActive) return;
            
            appData.isSOSActive = true;
            appData.sosCountdown = 3;
            
            const sosBtn = document.getElementById('sosBtn');
            const sosTimer = document.getElementById('sosTimer');
            const sosCancelBtn = document.getElementById('sosCancelBtn');
            const navSosBtn = document.getElementById('navSosBtn');
            
            // Hide main SOS button, show timer
            sosBtn.style.display = 'none';
            sosTimer.style.display = 'block';
            sosCancelBtn.style.display = 'block';
            sosTimer.textContent = appData.sosCountdown;
            
            // Update navigation SOS button
            navSosBtn.classList.add('active');
            navSosBtn.style.animation = 'none';
            navSosBtn.style.background = 'linear-gradient(45deg, #ff1744, #d50000)';
            navSosBtn.innerHTML = `<i class="fas fa-bell"></i><small style="font-size: 12px; margin-top: -5px;">${appData.sosCountdown}</small>`;
            
            showToast("SOS will activate in 3 seconds...", "warning");
            
            appData.sosTimer = setInterval(function() {
                appData.sosCountdown--;
                sosTimer.textContent = appData.sosCountdown;
                
                // Update navigation SOS button with countdown
                navSosBtn.innerHTML = `<i class="fas fa-bell"></i><small style="font-size: 12px; margin-top: -5px;">${appData.sosCountdown}</small>`;
                
                if (appData.sosCountdown <= 0) {
                    clearInterval(appData.sosTimer);
                    triggerEmergencySOS();
                    resetSOSButton();
                    // Reset navigation SOS button content
                    navSosBtn.innerHTML = `<i class="fas fa-bell"></i>`;
                }
            }, 1000);
        }

        function cancelSOS() {
            clearInterval(appData.sosTimer);
            appData.isSOSActive = false;
            resetSOSButton();
            
            // Reset navigation SOS button content
            const navSosBtn = document.getElementById('navSosBtn');
            navSosBtn.innerHTML = `<i class="fas fa-bell"></i>`;
            
            showToast("SOS cancelled", "info");
        }

        function resetSOSButton() {
            const sosBtn = document.getElementById('sosBtn');
            const sosTimer = document.getElementById('sosTimer');
            const sosCancelBtn = document.getElementById('sosCancelBtn');
            const navSosBtn = document.getElementById('navSosBtn');
            
            sosBtn.style.display = 'flex';
            sosTimer.style.display = 'none';
            sosCancelBtn.style.display = 'none';
            sosTimer.textContent = '3';
            
            // Reset navigation SOS button
            navSosBtn.classList.remove('active');
            navSosBtn.style.animation = 'pulse 2s infinite';
            navSosBtn.style.background = 'linear-gradient(45deg, #ff5252, #ff1744)';
        }

        function triggerEmergencySOS() {
            if (!appData.isSOSActive) return;
            
            showToast("🚨 EMERGENCY SOS ACTIVATED!", "error");
            
            appData.stats.sosUsed++;
            updateProfileStats();
            
            if (navigator.vibrate && appData.settings.notifications.vibration) {
                navigator.vibrate(appData.emergencyPreferences.silentSOS ? 300 : [500, 200, 500, 200, 500]);
            }
            
            document.body.style.backgroundColor = '#ff4444';
            setTimeout(() => {
                document.body.style.backgroundColor = '';
            }, 1000);
            
            appData.guardians.forEach(guardian => {
                sendEmergencyAlert(guardian);
            });
            
            const medicalNote = appData.emergencyPreferences.shareMedicalInfo
                ? ` Medical info shared: ${appData.userProfile.bloodGroup}, allergies: ${appData.userProfile.allergies}.`
                : '';
            showToast(`Alerts sent to ${appData.guardians.length} guardian(s).${medicalNote}`, "success");

            // ===== Emergency Timeline + Evidence Vault logging =====
            const startTime = new Date();
            const fmt = (d) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const timelineSteps = [
                { label: "SOS Activated", offset: 0 },
                { label: "Location Shared", offset: 0 },
                { label: "Guardian Notified", offset: 1000 },
                { label: "Recording Started", offset: 2000 },
                { label: "Police Nearby", offset: 3000 }
            ];
            const record = {
                date: startTime.toLocaleDateString() + ' ' + fmt(startTime),
                duration: "—",
                location: `${appData.userLocation.lat.toFixed(4)}, ${appData.userLocation.lng.toFixed(4)}`,
                status: "Resolved",
                timeline: timelineSteps.map(s => ({ time: fmt(new Date(startTime.getTime() + s.offset)), label: s.label })),
                videoUrl: null
            };
            appData.emergencyHistory.push(record);
            updateDashboardTiles();

            // Kick off automatic video recording (front camera + audio + GPS logging)
            startEvidenceRecording();
            // Stop and "upload" the clip after a short evidence window (demo timing)
            setTimeout(() => stopEvidenceRecording(record), 15000);

            // Start live guardian tracking so guardians see the map, ETA, battery & network
            startLiveGuardianTracking();

            appData.isSOSActive = false;
        }

        function sendEmergencyAlert(guardian) {
            console.log(`Alert sent to ${guardian.name} at ${guardian.phone}`);
            console.log(`Location: ${appData.userLocation.lat}, ${appData.userLocation.lng}`);
            console.log(`Message: EMERGENCY! I need immediate help at my current location.`);
        }

        // ========== VOICE SOS (HANDS-FREE) ==========
        const VOICE_TRIGGER_PHRASES = ["help me", "sos", "emergency"];

        function toggleVoiceSOS(enabled) {
            appData.emergencyPreferences.voiceSOSEnabled = enabled;
            appData.emergencyPreferences.voiceCodeWord = (document.getElementById('prefVoiceCodeWord')?.value || '').trim().toLowerCase();
            localStorage.setItem('shesecure_emergencyPreferences', JSON.stringify(appData.emergencyPreferences));

            if (enabled) {
                startVoiceSOSListening();
            } else {
                stopVoiceSOSListening();
            }
            updateVoiceSosUI();
        }

        function startVoiceSOSListening() {
            if (!appData.voice.supported) {
                showToast("Voice SOS isn't supported on this browser/device", "warning");
                appData.emergencyPreferences.voiceSOSEnabled = false;
                updateVoiceSosUI();
                return;
            }
            if (appData.voice.listening) return;

            try {
                const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                const recognition = new SpeechRecognition();
                recognition.continuous = true;
                recognition.interimResults = true;
                recognition.lang = 'en-US';

                recognition.onresult = function(event) {
                    for (let i = event.resultIndex; i < event.results.length; i++) {
                        const transcript = event.results[i][0].transcript.trim().toLowerCase();
                        const codeWord = appData.emergencyPreferences.voiceCodeWord;
                        const phrases = codeWord ? [...VOICE_TRIGGER_PHRASES, codeWord] : VOICE_TRIGGER_PHRASES;
                        if (phrases.some(p => p && transcript.includes(p))) {
                            showToast(`🎙️ Voice trigger detected: "${transcript}"`, "warning");
                            startSOSTimer();
                            break;
                        }
                    }
                };

                recognition.onerror = function(e) {
                    console.log("Voice SOS recognition error:", e.error);
                    if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
                        showToast("Microphone permission denied for Voice SOS", "error");
                        appData.emergencyPreferences.voiceSOSEnabled = false;
                        appData.voice.listening = false;
                        updateVoiceSosUI();
                    }
                };

                recognition.onend = function() {
                    // Auto-restart so listening stays "hands-free" and continuous
                    if (appData.emergencyPreferences.voiceSOSEnabled) {
                        try { recognition.start(); } catch (err) { /* already starting */ }
                    } else {
                        appData.voice.listening = false;
                        updateVoiceSosUI();
                    }
                };

                recognition.start();
                appData.voice.recognition = recognition;
                appData.voice.listening = true;
                showToast("Voice SOS is now listening in the background", "success");
            } catch (err) {
                console.error("Voice SOS init failed:", err);
                showToast("Couldn't start Voice SOS on this device", "error");
                appData.emergencyPreferences.voiceSOSEnabled = false;
            }
            updateVoiceSosUI();
        }

        function stopVoiceSOSListening() {
            if (appData.voice.recognition) {
                try { appData.voice.recognition.stop(); } catch (err) { /* no-op */ }
            }
            appData.voice.listening = false;
            updateVoiceSosUI();
        }

        function updateVoiceSosUI() {
            const micIcon = document.getElementById('voiceSosMicIcon');
            const pill = document.getElementById('voiceSosStatusPill');
            const pillText = document.getElementById('voiceSosStatusText');
            if (micIcon) micIcon.classList.toggle('listening', appData.voice.listening);
            if (pill) pill.style.display = appData.voice.listening ? 'inline-flex' : 'none';
            if (pillText) pillText.textContent = appData.voice.listening ? 'Listening in background' : 'Off';
        }

        // ========== SHAKE DETECTION ==========
        function toggleShakeDetection(enabled) {
            appData.emergencyPreferences.shakeDetectionEnabled = enabled;
            localStorage.setItem('shesecure_emergencyPreferences', JSON.stringify(appData.emergencyPreferences));
            const permBtn = document.getElementById('shakePermissionBtn');

            if (!enabled) {
                stopShakeDetection();
                if (permBtn) permBtn.style.display = 'none';
                return;
            }

            if (appData.shake.needsPermission) {
                if (permBtn) permBtn.style.display = 'block';
                showToast("Tap 'Enable Motion Access' to activate Shake Detection", "info");
            } else {
                startShakeDetection();
            }
        }

        function requestShakePermission() {
            if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
                DeviceMotionEvent.requestPermission().then(response => {
                    if (response === 'granted') {
                        document.getElementById('shakePermissionBtn').style.display = 'none';
                        startShakeDetection();
                    } else {
                        showToast("Motion access denied — Shake Detection unavailable", "warning");
                    }
                }).catch(() => showToast("Couldn't request motion permission", "error"));
            } else {
                startShakeDetection();
            }
        }

        const SHAKE_THRESHOLD = 15; // acceleration delta (m/s^2) to count as a shake
        const SHAKE_COUNT_NEEDED = 4; // rapid shakes 3-5 times
        const SHAKE_WINDOW_MS = 1500;

        function handleDeviceMotion(event) {
            const acc = event.accelerationIncludingGravity || event.acceleration;
            if (!acc) return;
            const { x, y, z } = acc;
            if (appData.shake.lastX === null) {
                appData.shake.lastX = x; appData.shake.lastY = y; appData.shake.lastZ = z;
                return;
            }
            const delta = Math.abs(x - appData.shake.lastX) + Math.abs(y - appData.shake.lastY) + Math.abs(z - appData.shake.lastZ);
            appData.shake.lastX = x; appData.shake.lastY = y; appData.shake.lastZ = z;

            const now = Date.now();
            if (delta > SHAKE_THRESHOLD) {
                if (now - appData.shake.lastShakeAt > SHAKE_WINDOW_MS) {
                    appData.shake.shakeCount = 0; // window expired, restart count
                }
                appData.shake.lastShakeAt = now;
                appData.shake.shakeCount++;

                if (appData.shake.shakeCount >= SHAKE_COUNT_NEEDED) {
                    appData.shake.shakeCount = 0;
                    if (!appData.isSOSActive) {
                        showToast("📳 Shake detected! Starting SOS countdown...", "warning");
                        startSOSTimer();
                    }
                }
            }
        }

        function startShakeDetection() {
            if (appData.shake.enabled) return;
            window.addEventListener('devicemotion', handleDeviceMotion);
            appData.shake.enabled = true;
            showToast("Shake Detection enabled — shake your phone 3-5 times for SOS", "success");
        }

        function stopShakeDetection() {
            window.removeEventListener('devicemotion', handleDeviceMotion);
            appData.shake.enabled = false;
        }

        // ========== AUTOMATIC VIDEO RECORDING ==========
        async function startEvidenceRecording() {
            if (!appData.emergencyPreferences.autoVideoRecording) return null;
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                console.log("getUserMedia not supported — skipping auto video recording");
                return null;
            }
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: "user" },
                    audio: true
                });
                appData.recording.stream = stream;
                appData.recording.chunks = [];

                const mimeType = (window.MediaRecorder && MediaRecorder.isTypeSupported('video/webm')) ? 'video/webm' : '';
                const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);

                recorder.ondataavailable = (e) => {
                    if (e.data && e.data.size > 0) appData.recording.chunks.push(e.data);
                };
                recorder.start();

                appData.recording.mediaRecorder = recorder;
                appData.recording.active = true;

                document.getElementById('recIndicatorBadge').classList.add('show');
                showToast("🎥 Front camera & audio recording started — evidence will upload automatically", "warning");
                return true;
            } catch (err) {
                console.log("Auto video recording unavailable:", err.name);
                showToast("Camera/mic access unavailable — audio-only evidence log kept instead", "info");
                return null;
            }
        }

        function stopEvidenceRecording(historyRecord) {
            document.getElementById('recIndicatorBadge').classList.remove('show');
            appData.recording.active = false;

            if (!appData.recording.mediaRecorder) return;

            appData.recording.mediaRecorder.onstop = () => {
                if (appData.recording.chunks.length > 0 && historyRecord) {
                    const blob = new Blob(appData.recording.chunks, { type: 'video/webm' });
                    historyRecord.videoUrl = URL.createObjectURL(blob);
                    showToast("🔒 Encrypted evidence uploaded to your Evidence Vault", "success");
                }
                if (appData.recording.stream) {
                    appData.recording.stream.getTracks().forEach(track => track.stop());
                    appData.recording.stream = null;
                }
                appData.recording.mediaRecorder = null;
                appData.recording.chunks = [];
            };

            try {
                appData.recording.mediaRecorder.stop();
            } catch (err) {
                console.log("Recorder already stopped");
            }
        }

        // ========== LIVE GUARDIAN TRACKING ==========
        function getBatteryLevel() {
            if (navigator.getBattery) {
                navigator.getBattery().then(battery => {
                    appData.liveTracking.battery = Math.round(battery.level * 100);
                });
            } else {
                // Simulate a slow natural drain for the demo
                appData.liveTracking.battery = Math.max(5, appData.liveTracking.battery - Math.round(Math.random() * 2));
            }
        }

        function getNetworkStrength() {
            const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            if (conn && conn.effectiveType) {
                appData.liveTracking.network = conn.effectiveType.toUpperCase().replace('4G', '4G/LTE');
            } else {
                const options = ["5G", "4G/LTE", "4G/LTE", "3G"];
                appData.liveTracking.network = options[Math.floor(Math.random() * options.length)];
            }
        }

        function startLiveGuardianTracking() {
            if (appData.liveTracking.active) return;
            appData.liveTracking.active = true;
            appData.liveTracking.lastMovementTime = Date.now();
            getBatteryLevel();
            getNetworkStrength();

            appData.liveTracking.timer = setInterval(() => {
                getBatteryLevel();
                getNetworkStrength();
                // Simulate small movement so "last movement" ticks realistically
                if (Math.random() > 0.3) appData.liveTracking.lastMovementTime = Date.now();
                renderLiveTrackingStats();
                updateLiveTrackingMapPosition();
            }, 5000);
        }

        function stopLiveGuardianTracking() {
            clearInterval(appData.liveTracking.timer);
            appData.liveTracking.active = false;
            appData.liveTracking.map = null;
        }

        function timeAgoLabel(timestamp) {
            const secs = Math.round((Date.now() - timestamp) / 1000);
            if (secs < 10) return "Just now";
            if (secs < 60) return `${secs}s ago`;
            return `${Math.round(secs / 60)}m ago`;
        }

        function renderLiveTrackingStats() {
            const j = appData.journey;
            const remainingMin = Math.max(0, Math.round(j.etaMinutes * (1 - j.progressPercent / 100)));
            const lt = appData.liveTracking;

            const battEl = document.getElementById('liveTrackBattery');
            const netEl = document.getElementById('liveTrackNetwork');
            const etaEl = document.getElementById('liveTrackETA');
            const moveEl = document.getElementById('liveTrackLastMove');
            const battCard = document.getElementById('liveTrackBatteryCard');

            if (etaEl) etaEl.textContent = `${remainingMin} min`;
            if (battEl) battEl.textContent = `${lt.battery}%`;
            if (netEl) netEl.textContent = lt.network;
            if (moveEl) moveEl.textContent = timeAgoLabel(lt.lastMovementTime);
            if (battCard) {
                battCard.classList.toggle('danger', lt.battery <= 15);
                battCard.classList.toggle('warn', lt.battery > 15 && lt.battery <= 30);
            }
        }

        function initLiveTrackingMap() {
            const mapEl = document.getElementById('liveTrackingMap');
            if (!mapEl || appData.liveTracking.map) return;
            const loc = appData.userLocation;
            const map = L.map('liveTrackingMap', { zoomControl: false, attributionControl: false }).setView([loc.lat, loc.lng], 15);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
            const marker = L.marker([loc.lat, loc.lng]).addTo(map);
            appData.liveTracking.map = map;
            appData.liveTracking.marker = marker;
            setTimeout(() => map.invalidateSize(), 200);
        }

        function updateLiveTrackingMapPosition() {
            if (!appData.liveTracking.map || !appData.liveTracking.marker) return;
            const loc = appData.userLocation;
            // Small simulated drift to show movement along the route
            const jitter = () => (Math.random() - 0.5) * 0.0007;
            const newLat = loc.lat + jitter();
            const newLng = loc.lng + jitter();
            appData.liveTracking.marker.setLatLng([newLat, newLng]);
            appData.liveTracking.map.panTo([newLat, newLng]);
        }

        // ========== MAP FUNCTIONS ==========
        function showMapModal() {
            closeAllModals();
            document.getElementById('mapModal').style.display = 'flex';
            
            const mapContainer = document.getElementById('mapContainer');
            
            if (appData.userPlan === 'free') {
                mapContainer.innerHTML = `
                    <div class="map-upgrade-prompt">
                        <i class="fas fa-lock"></i>
                        <h3>Map Locked</h3>
                        <p>Safe Route Navigation is only available in Premium plans</p>
                        <p>Upgrade now to access:</p>
                        <ul style="text-align: left; margin: 15px 0;">
                            <li>✓ Real-time map navigation</li>
                            <li>✓ Safe route planning</li>
                            <li>✓ Find nearby safe spots</li>
                            <li>✓ Live location sharing</li>
                        </ul>
                        <button class="upgrade-now-btn" onclick="showSubscriptionModal()">
                            <i class="fas fa-crown"></i> Upgrade Now
                        </button>
                    </div>
                `;
            } else {
                mapContainer.innerHTML = `
                    <div id="map" style="height: 320px; border-radius: 20px; margin-bottom: 20px;"></div>
                    <div id="routeCompare" class="route-compare" style="display:none;"></div>
                    <div class="map-controls">
                        <button class="map-btn" onclick="findSafeRoute()">
                            <i class="fas fa-directions"></i> Get Safe Route
                        </button>
                        <button class="map-btn secondary" onclick="showNearbySafeSpots()">
                            <i class="fas fa-hospital-alt"></i> Find Safe Spots
                        </button>
                        <button class="map-btn tertiary" onclick="shareLiveLocation()">
                            <i class="fas fa-share"></i> Share Live Location
                        </button>
                    </div>
                    <div id="routeInfo" class="route-info">
                        <h4><i class="fas fa-route"></i> Safe Route Found</h4>
                        <div class="route-details">
                            <div class="route-detail-item">
                                <i class="fas fa-road"></i>
                                <div>
                                    <strong id="routeDistance">2.4 km</strong>
                                    <div>Distance</div>
                                </div>
                            </div>
                            <div class="route-detail-item">
                                <i class="fas fa-clock"></i>
                                <div>
                                    <strong id="routeTime">8 min</strong>
                                    <div>Time</div>
                                </div>
                            </div>
                            <div class="route-detail-item">
                                <i class="fas fa-shield-alt"></i>
                                <div>
                                    <strong id="routeSafety">95%</strong>
                                    <div>Safety Score</div>
                                </div>
                            </div>
                            <div class="route-detail-item">
                                <i class="fas fa-lightbulb"></i>
                                <div>
                                    <strong>Well-lit</strong>
                                    <div>Route Type</div>
                                </div>
                            </div>
                        </div>
                        <p id="routeDetails" style="margin-top: 15px; color: #666; font-size: 16px;">Route optimized for safety - Avoiding high-risk areas</p>
                    </div>
                `;
                
                setTimeout(() => {
                    initMap();
                    showToast("Map unlocked! Premium features active.", "success");
                }, 100);
            }
        }

        function initMap() {
            if (appData.map) {
                appData.map.remove();
                appData.map = null;
            }
            
            const mapElement = document.getElementById('map');
            if (!mapElement) return;
            
            mapElement.innerHTML = '';
            
            appData.map = L.map('map', {
                center: [appData.userLocation.lat, appData.userLocation.lng],
                zoom: 15,
                zoomControl: true,
                attributionControl: false,
                scrollWheelZoom: false,
                dragging: true,
                tap: false
            });
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 19,
                minZoom: 3
            }).addTo(appData.map);
            
            const userIcon = L.divIcon({
                html: '<div style="background: #ff4081; width: 45px; height: 45px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; border: 3px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.3);"><i class="fas fa-female"></i></div>',
                className: 'user-location-icon',
                iconSize: [45, 45],
                iconAnchor: [22.5, 45]
            });
            
            L.marker([appData.userLocation.lat, appData.userLocation.lng], {
                icon: userIcon
            }).addTo(appData.map)
            .bindPopup('<b>You are here</b><br>Current location - SHE-SECURE Active')
            .openPopup();
            
            appData.safePlaces.forEach(place => {
                const iconColor = place.type === 'police' ? '#2196f3' : 
                                place.type === 'hospital' ? '#4caf50' : 
                                place.type === 'pharmacy' ? '#ff9800' : '#ff4081';
                
                const icon = L.divIcon({
                    html: `<div style="background: ${iconColor}; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
                            <i class="fas fa-${place.type === 'police' ? 'shield-alt' : 
                                            place.type === 'hospital' ? 'hospital' : 
                                            place.type === 'pharmacy' ? 'pills' : 
                                            place.type === 'safety' ? 'female' : 'user-shield'}"></i>
                           </div>`,
                    className: 'safe-place-icon',
                    iconSize: [40, 40],
                    iconAnchor: [20, 40]
                });
                
                L.marker([place.lat, place.lng], { icon: icon })
                    .addTo(appData.map)
                    .bindPopup(`<b>${place.name}</b><br>${place.distance} away<br>${place.phone}<br><button onclick="callNumber('${place.phone}')" style="background: var(--primary); color: white; border: none; padding: 8px 15px; border-radius: 8px; margin-top: 8px; cursor: pointer; width: 100%; font-size: 14px;">
                                <i class="fas fa-phone"></i> Call
                               </button>`);
            });
            
            setTimeout(() => {
                appData.map.invalidateSize();
            }, 300);
        }

        function findSafeRoute() {
            if (appData.userPlan === 'free') {
                showSubscriptionModal();
                return;
            }
            
            if (!appData.map) {
                showToast("Map not initialized", "error");
                return;
            }
            
            showToast("Finding safest route...", "info");
            appData.stats.safeRoutesUsed++;
            updateSafetyAnalytics();
            
            appData.map.eachLayer((layer) => {
                if (layer instanceof L.Polyline) {
                    appData.map.removeLayer(layer);
                }
            });
            
            const nearestPlace = appData.safePlaces[0];
            const routeCoordinates = [
                [appData.userLocation.lat, appData.userLocation.lng],
                [nearestPlace.lat, nearestPlace.lng]
            ];
            
            const routeLine = L.polyline(routeCoordinates, {
                color: '#4caf50',
                weight: 6,
                opacity: 0.7,
                dashArray: '10, 10'
            }).addTo(appData.map);
            
            const latDiff = nearestPlace.lat - appData.userLocation.lat;
            const lngDiff = nearestPlace.lng - appData.userLocation.lng;
            const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff) * 111;
            
            const safeTime = Math.round(distance * 15);
            const fastTime = Math.max(1, Math.round(safeTime * 0.8));

            document.getElementById('routeInfo').classList.add('show');
            document.getElementById('routeDistance').textContent = distance.toFixed(1) + ' km';
            document.getElementById('routeTime').textContent = safeTime + ' min';
            document.getElementById('routeSafety').textContent = '95%';
            document.getElementById('routeDetails').textContent = `Route to ${nearestPlace.name} - Avoiding high-risk areas`;

            const compareEl = document.getElementById('routeCompare');
            if (compareEl) {
                compareEl.style.display = 'flex';
                compareEl.innerHTML = `
                    <div class="route-compare-card high">
                        <h4>Fastest</h4>
                        <div class="rc-time">${fastTime} min</div>
                        <div class="rc-risk">Risk: High</div>
                    </div>
                    <div class="route-compare-card recommended low">
                        <span class="rc-badge">Recommended</span>
                        <h4>Safest</h4>
                        <div class="rc-time">${safeTime} min</div>
                        <div class="rc-risk">Risk: Low</div>
                    </div>
                `;
            }
            
            appData.map.fitBounds(routeLine.getBounds());
            
            showToast("Safe route found!", "success");
        }

        function showNearbySafeSpots() {
            if (appData.userPlan === 'free') {
                showSubscriptionModal();
                return;
            }
            
            if (!appData.map) {
                showToast("Map not initialized", "error");
                return;
            }
            
            showToast("Showing nearby safe spots", "info");
            
            const bounds = L.latLngBounds([
                [appData.userLocation.lat, appData.userLocation.lng]
            ]);
            
            appData.safePlaces.forEach(place => {
                bounds.extend([place.lat, place.lng]);
            });
            
            appData.map.fitBounds(bounds, { padding: [60, 60] });
        }

        function shareLiveLocation() {
            if (appData.userPlan === 'free') {
                showSubscriptionModal();
                return;
            }
            
            const locationUrl = `https://www.google.com/maps?q=${appData.userLocation.lat},${appData.userLocation.lng}`;
            
            if (navigator.share) {
                navigator.share({
                    title: 'My Current Location - SHE-SECURE',
                    text: 'I\'m sharing my live location for safety.',
                    url: locationUrl
                }).then(() => {
                    showToast("Location shared successfully!", "success");
                }).catch(err => {
                    console.error('Share failed:', err);
                    navigator.clipboard.writeText(locationUrl);
                    showToast("Location link copied to clipboard!", "info");
                });
            } else {
                navigator.clipboard.writeText(locationUrl);
                showToast("Location link copied to clipboard!", "success");
            }
        }

        // ========== SETTINGS FUNCTIONS ==========
        function showNotificationSettings() {
            closeAllModals();
            document.getElementById('notificationSettingsModal').style.display = 'flex';
            loadNotificationSettings();
        }

        function showPrivacySettings() {
            closeAllModals();
            document.getElementById('privacySettingsModal').style.display = 'flex';
            loadPrivacySettings();
        }

        function showAppearanceSettings() {
            closeAllModals();
            document.getElementById('appearanceSettingsModal').style.display = 'flex';
            loadAppearanceSettings();
        }

        function showHelpSupport() {
            closeAllModals();
            document.getElementById('helpSupportModal').style.display = 'flex';
        }

        function showEmergencyPreferences() {
            closeAllModals();
            document.getElementById('emergencyPreferencesModal').style.display = 'flex';
            document.getElementById('prefShareMedicalInfo').checked = appData.emergencyPreferences.shareMedicalInfo;
            document.getElementById('prefSilentSOS').checked = appData.emergencyPreferences.silentSOS;
            document.getElementById('prefAutoNotifyJourney').checked = appData.emergencyPreferences.autoNotifyOnJourney;
            document.getElementById('prefPreferredHelpline').value = appData.emergencyPreferences.preferredHelpline;
            document.getElementById('prefVoiceSOS').checked = appData.emergencyPreferences.voiceSOSEnabled;
            document.getElementById('prefVoiceCodeWord').value = appData.emergencyPreferences.voiceCodeWord;
            document.getElementById('prefShakeDetection').checked = appData.emergencyPreferences.shakeDetectionEnabled;
            document.getElementById('prefAutoVideoRecording').checked = appData.emergencyPreferences.autoVideoRecording;
            document.getElementById('shakePermissionBtn').style.display = (appData.shake.needsPermission && appData.emergencyPreferences.shakeDetectionEnabled && !appData.shake.enabled) ? 'block' : 'none';
            updateVoiceSosUI();
        }

        function saveEmergencyPreferences() {
            appData.emergencyPreferences.shareMedicalInfo = document.getElementById('prefShareMedicalInfo').checked;
            appData.emergencyPreferences.silentSOS = document.getElementById('prefSilentSOS').checked;
            appData.emergencyPreferences.autoNotifyOnJourney = document.getElementById('prefAutoNotifyJourney').checked;
            appData.emergencyPreferences.preferredHelpline = document.getElementById('prefPreferredHelpline').value;
            appData.emergencyPreferences.voiceCodeWord = document.getElementById('prefVoiceCodeWord').value.trim().toLowerCase();
            appData.emergencyPreferences.autoVideoRecording = document.getElementById('prefAutoVideoRecording').checked;
            localStorage.setItem('shesecure_emergencyPreferences', JSON.stringify(appData.emergencyPreferences));
            showToast("Emergency preferences saved!", "success");
            closeModal('emergencyPreferencesModal');
        }

        function loadNotificationSettings() {
            document.getElementById('sosAlerts').checked = appData.settings.notifications.sosAlerts;
            document.getElementById('riskAlerts').checked = appData.settings.notifications.riskAlerts;
            document.getElementById('locationUpdates').checked = appData.settings.notifications.locationUpdates;
            document.getElementById('safetyTips').checked = appData.settings.notifications.safetyTips;
            document.getElementById('vibration').checked = appData.settings.notifications.vibration;
        }

        function loadPrivacySettings() {
            document.getElementById('locationSharing').checked = appData.settings.privacy.locationSharing;
            document.getElementById('appLock').checked = appData.settings.privacy.appLock;
            document.getElementById('dataBackup').checked = appData.settings.privacy.dataBackup;
            document.getElementById('incognitoMode').checked = appData.settings.privacy.incognitoMode;
        }

        function loadAppearanceSettings() {
            document.querySelectorAll('.theme-option').forEach(option => {
                option.classList.remove('selected');
            });
            document.querySelector(`.theme-option.${appData.settings.appearance.theme}`).classList.add('selected');
            document.getElementById('fontSize').value = appData.settings.appearance.fontSize;
        }

        function saveNotificationSettings() {
            appData.settings.notifications.sosAlerts = document.getElementById('sosAlerts').checked;
            appData.settings.notifications.riskAlerts = document.getElementById('riskAlerts').checked;
            appData.settings.notifications.locationUpdates = document.getElementById('locationUpdates').checked;
            appData.settings.notifications.safetyTips = document.getElementById('safetyTips').checked;
            appData.settings.notifications.vibration = document.getElementById('vibration').checked;
            saveSettings();
            showToast("Notification settings saved!", "success");
            closeModal('notificationSettingsModal');
        }

        function savePrivacySettings() {
            appData.settings.privacy.locationSharing = document.getElementById('locationSharing').checked;
            appData.settings.privacy.appLock = document.getElementById('appLock').checked;
            appData.settings.privacy.dataBackup = document.getElementById('dataBackup').checked;
            appData.settings.privacy.incognitoMode = document.getElementById('incognitoMode').checked;
            saveSettings();
            showToast("Privacy settings saved!", "success");
            closeModal('privacySettingsModal');
        }

        function saveAppearanceSettings() {
            appData.settings.appearance.fontSize = document.getElementById('fontSize').value;
            applyTheme(appData.settings.appearance.theme);
            saveSettings();
            showToast("Appearance settings applied!", "success");
            closeModal('appearanceSettingsModal');
        }

        function selectTheme(theme) {
            appData.settings.appearance.theme = theme;
            document.querySelectorAll('.theme-option').forEach(option => {
                option.classList.remove('selected');
            });
            event.target.closest('.theme-option').classList.add('selected');
        }

        function applyTheme(theme) {
            document.documentElement.style.setProperty('--primary', theme === 'pink' ? '#ff4081' : theme === 'dark' ? '#9c27b0' : '#ff4081');
            document.documentElement.style.setProperty('--light', theme === 'dark' ? '#1a1a1a' : '#f5f5f5');
            document.documentElement.style.setProperty('--card-bg', theme === 'dark' ? '#2d2d2d' : '#ffffff');
            document.documentElement.style.setProperty('--dark', theme === 'dark' ? '#ffffff' : '#333');
        }

        function loadSettings() {
            const saved = localStorage.getItem('shesecure_settings');
            if (saved) {
                appData.settings = JSON.parse(saved);
                applyTheme(appData.settings.appearance.theme);
            }
            const savedPrefs = localStorage.getItem('shesecure_emergencyPreferences');
            if (savedPrefs) {
                appData.emergencyPreferences = JSON.parse(savedPrefs);
            }
        }

        function saveSettings() {
            localStorage.setItem('shesecure_settings', JSON.stringify(appData.settings));
        }

        // ========== LEARN FUNCTIONS ==========
        function showLearnModal() {
            closeAllModals();
            document.getElementById('learnModal').style.display = 'flex';
            updateVideoLocks();
        }

        function switchLearnCategory(category) {
            document.querySelectorAll('.learn-category').forEach(item => {
                item.classList.remove('active');
            });
            
            event.target.classList.add('active');
            
            document.querySelectorAll('.learn-content').forEach(content => {
                content.classList.remove('active');
            });
            
            const contentId = category + 'Content';
            if (document.getElementById(contentId)) {
                document.getElementById(contentId).classList.add('active');
            } else {
                createLearnContent(category);
            }
        }

        // ========== WOMEN'S LEGAL HELP ==========
        const LEGAL_CONTENT = {
            emergency_laws: {
                title: "Emergency Laws & Immediate Protections",
                articles: [
                    { h: "Right to Immediate Police Assistance", p: "Every woman has the right to approach the nearest police station or dial 100/112 for immediate help. Police are required to register a complaint (FIR) without delay in cognizable offences such as assault or harassment." },
                    { h: "Zero FIR", p: "A 'Zero FIR' lets you file a complaint at any police station, regardless of where the incident occurred. The station must register it and later transfer it to the station with jurisdiction." },
                    { h: "Right to Free Legal Aid", p: "Under the Legal Services Authorities Act, women are entitled to free legal aid and representation through District Legal Services Authorities (DLSA), regardless of income." }
                ]
            },
            womens_rights: {
                title: "Know Your Rights",
                articles: [
                    { h: "Right to Safety at the Workplace", p: "The Sexual Harassment of Women at Workplace Act requires every organization with 10+ employees to have an Internal Complaints Committee (ICC) to address harassment complaints confidentially." },
                    { h: "Right to Dignity in Police Interactions", p: "A woman cannot be arrested after sunset and before sunrise except in exceptional circumstances with prior permission, and only a woman police officer may arrest or search a woman." },
                    { h: "Right to Anonymity", p: "The identity of a sexual assault survivor is legally protected and cannot be published or disclosed by media without consent." }
                ]
            },
            cyber_crime: {
                title: "Cyber Crime Protection",
                articles: [
                    { h: "Reporting Online Harassment", p: "Cyberstalking, morphed images, and online blackmail can be reported at cybercrime.gov.in or your local cyber cell. Screenshots, links, and timestamps strengthen your complaint." },
                    { h: "IT Act Protections", p: "The Information Technology Act criminalizes publishing or transmitting obscene material and violation of privacy, including circulating private images without consent." },
                    { h: "National Cyber Crime Helpline", p: "Call 1930 to report financial cyber fraud, or use the online portal for other cyber crimes including harassment and stalking." }
                ]
            },
            fir_process: {
                title: "How to File an FIR",
                articles: [
                    { h: "Step 1: Visit or Call", p: "Go to the nearest police station or call 100/112. For sexual offences, you may also request the statement be recorded by a woman officer." },
                    { h: "Step 2: Give Your Statement", p: "Clearly describe what happened, including date, time, location, and any witnesses. You do not need a lawyer present to file an FIR." },
                    { h: "Step 3: Get a Copy", p: "You are legally entitled to a free copy of the FIR with the FIR number — always ask for it before leaving the station." },
                    { h: "If Police Refuse", p: "If a police station refuses to register your FIR, you can approach the Superintendent of Police, file a complaint with the Magistrate under Section 156(3) CrPC, or use the online FIR portal available in most states." }
                ]
            },
            domestic_violence: {
                title: "Domestic Violence Support",
                articles: [
                    { h: "Protection of Women from Domestic Violence Act", p: "This law covers physical, emotional, sexual, and economic abuse, and allows survivors to seek protection orders, residence orders, and monetary relief — even without filing a criminal case." },
                    { h: "Protection Officers", p: "Every district has a Protection Officer who can help you file a Domestic Incident Report and connect you with shelters, medical aid, and legal counsel." },
                    { h: "Where to Get Help", p: "Contact the Women Helpline (181/1091), a local NGO, or a District Legal Services Authority for confidential support and safe shelter options." }
                ]
            },
            helplines: {
                title: "Emergency Helplines",
                helplines: [
                    { name: "Police Emergency", number: "100 / 112" },
                    { name: "Women Helpline (All India)", number: "1091" },
                    { name: "Women Helpline (Domestic Abuse)", number: "181" },
                    { name: "National Cyber Crime Helpline", number: "1930" },
                    { name: "Ambulance", number: "102" },
                    { name: "Child Helpline", number: "1098" }
                ]
            }
        };

        function showLegalHelpModal() {
            closeAllModals();
            document.getElementById('legalHelpModal').style.display = 'flex';
            switchLegalCategory('emergency_laws');
        }

        function switchLegalCategory(cat) {
            document.querySelectorAll('.legal-link-card').forEach(c => c.classList.remove('active'));
            const activeCard = document.querySelector(`.legal-link-card[data-cat="${cat}"]`);
            if (activeCard) activeCard.classList.add('active');

            const data = LEGAL_CONTENT[cat];
            const area = document.getElementById('legalContentArea');
            if (!data) { area.innerHTML = ''; return; }

            if (cat === 'helplines') {
                area.innerHTML = `
                    <div class="article-card free">
                        <h4><i class="fas fa-phone-volume"></i> ${data.title}</h4>
                        ${data.helplines.map(h => `
                            <div class="legal-helpline-row">
                                <div>
                                    <strong>${h.name}</strong><br>
                                    <span style="color:#666; font-size: 14px;">${h.number}</span>
                                </div>
                                <button class="lh-call" onclick="callNumber('${h.number}')"><i class="fas fa-phone"></i></button>
                            </div>
                        `).join('')}
                    </div>
                    <p style="font-size: 12px; color: #999; text-align: center; margin-top: 10px;">This is general safety information, not legal advice. For a specific situation, please consult a lawyer or the DLSA.</p>
                `;
            } else {
                area.innerHTML = data.articles.map(a => `
                    <div class="article-card free">
                        <h4><i class="fas fa-book"></i> ${a.h}</h4>
                        <p>${a.p}</p>
                    </div>
                `).join('') + `<p style="font-size: 12px; color: #999; text-align: center; margin-top: 10px;">This is general safety information, not legal advice. For a specific situation, please consult a lawyer or the DLSA.</p>`;
            }
        }

        // ========== ACHIEVEMENTS (GAMIFICATION) ==========
        function getAchievementsData() {
            const s = appData.stats;
            const journeyProgress = Math.min(s.journeysCount, 100);
            const reportProgress = Math.min(s.communityReportsSubmitted, 5);
            const championJourneys = Math.min(s.journeysCount, 20);
            const championRoutes = Math.min(s.safeRoutesUsed, 20);
            const verifiedProgress = Math.min(s.communityReportsSubmitted, 10);

            return [
                {
                    icon: 'route',
                    title: 'Completed 100 Safe Journeys',
                    desc: `${journeyProgress}/100 journeys`,
                    unlocked: s.journeysCount >= 100,
                    percent: (journeyProgress / 100) * 100
                },
                {
                    icon: 'hands-helping',
                    title: 'Community Helper',
                    desc: `${reportProgress}/5 reports submitted`,
                    unlocked: s.communityReportsSubmitted >= 5,
                    percent: (reportProgress / 5) * 100
                },
                {
                    icon: 'shield-halved',
                    title: 'Safety Champion',
                    desc: `${championJourneys}/20 journeys · ${championRoutes}/20 safe routes`,
                    unlocked: s.journeysCount >= 20 && s.safeRoutesUsed >= 20,
                    percent: ((championJourneys + championRoutes) / 40) * 100
                },
                {
                    icon: 'certificate',
                    title: 'Verified Reporter',
                    desc: `${verifiedProgress}/10 reports submitted`,
                    unlocked: s.communityReportsSubmitted >= 10,
                    percent: (verifiedProgress / 10) * 100
                }
            ];
        }

        function showAchievementsModal() {
            closeAllModals();
            document.getElementById('achievementsModal').style.display = 'flex';
            renderAchievements();
        }

        function renderAchievements() {
            const grid = document.getElementById('achievementsGrid');
            if (!grid) return;
            const achievements = getAchievementsData();

            grid.innerHTML = achievements.map(a => `
                <div class="achievement-badge ${a.unlocked ? 'unlocked' : ''}">
                    <div class="achievement-icon">
                        <i class="fas fa-${a.icon}"></i>
                        ${!a.unlocked ? '<div class="lock-overlay"><i class="fas fa-lock"></i></div>' : ''}
                    </div>
                    <h4>${a.title}</h4>
                    <p>${a.desc}</p>
                    <div class="achievement-progress-bar">
                        <div class="achievement-progress-fill" style="width:${Math.min(a.percent, 100)}%"></div>
                    </div>
                </div>
            `).join('');
        }


        function createLearnContent(category) {
            const container = document.querySelector('.modal-body');
            const contentDiv = document.createElement('div');
            contentDiv.id = category + 'Content';
            contentDiv.className = 'learn-content active';
            
            let html = '';
            switch(category) {
                case 'self_defense':
                    html = `
                        <div class="article-card free">
                            <h4><i class="fas fa-hand-rock"></i> Basic Self Defense Moves</h4>
                            <p><strong>Palm Strike:</strong> Use the heel of your palm to strike the attacker's nose or chin.</p>
                            <p><strong>Eye Jab:</strong> Use your fingers to jab the attacker's eyes.</p>
                            <p><strong>Knee Strike:</strong> Target the groin area with your knee.</p>
                        </div>`;
                    break;
                case 'safety_tricks':
                    html = `
                        <div class="article-card free">
                            <h4><i class="fas fa-walking"></i> Walking Safety Tricks</h4>
                            <p><strong>Always walk against traffic</strong> so you can see approaching vehicles.</p>
                            <p><strong>Carry a whistle or personal alarm</strong> that can be easily activated.</p>
                        </div>`;
                    break;
                case 'learn_tricks':
                    html = `
                        <div class="article-card free">
                            <h4><i class="fas fa-lightbulb"></i> Quick Thinking Tricks</h4>
                            <p><strong>Act confidently:</strong> Walk with purpose even if you're lost.</p>
                            <p><strong>Use code words:</strong> Establish code words with friends/family.</p>
                        </div>`;
                    break;
                default:
                    html = `<div class="article-card free"><h4>Content coming soon!</h4></div>`;
            }
            
            contentDiv.innerHTML = html;
            container.appendChild(contentDiv);
        }

        function updateVideoLocks() {
            const videoLock1 = document.getElementById('videoLock1');
            const videoLock2 = document.getElementById('videoLock2');
            
            if (appData.userPlan === 'free') {
                if (videoLock1) videoLock1.style.display = 'flex';
                if (videoLock2) videoLock2.style.display = 'flex';
            } else {
                if (videoLock1) videoLock1.style.display = 'none';
                if (videoLock2) videoLock2.style.display = 'none';
            }
        }

        // ========== FAKE CALL FUNCTIONS ==========
        function showFakeCallModal() {
            closeAllModals();
            document.getElementById('fakeCallModal').style.display = 'flex';
            resetFakeCall();
        }

        function startFakeCall() {
            const contact = document.getElementById('fakeCallContact').value;
            const fakeCallScreen = document.getElementById('fakeCallScreen');
            const guardian = appData.guardians.find(g => g.name === contact) || 
                           { name: contact, phone: "+91 XXXXX XXXXX" };
            
            document.getElementById('fakeCallerName').textContent = guardian.name;
            document.getElementById('fakeCallerNumber').textContent = guardian.phone;
            
            fakeCallScreen.style.background = "linear-gradient(135deg, #333, #555)";
            showToast(`Fake call started with ${guardian.name}`, "info");
            
            clearInterval(appData.fakeCallTimer);
            appData.fakeCallSeconds = 0;
            appData.fakeCallTimer = setInterval(updateFakeCallTimer, 1000);
        }

        function acceptFakeCall() {
            const fakeCallScreen = document.getElementById('fakeCallScreen');
            fakeCallScreen.style.background = "linear-gradient(135deg, #4caf50, #2e7d32)";
            showToast("Call connected - speak normally", "success");
        }

        function updateFakeCallTimer() {
            appData.fakeCallSeconds++;
            const minutes = Math.floor(appData.fakeCallSeconds / 60);
            const seconds = appData.fakeCallSeconds % 60;
            document.getElementById('fakeCallTime').textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }

        function endFakeCall() {
            clearInterval(appData.fakeCallTimer);
            closeModal('fakeCallModal');
            showToast("Fake call ended", "info");
        }

        function resetFakeCall() {
            clearInterval(appData.fakeCallTimer);
            document.getElementById('fakeCallTime').textContent = "00:00";
        }

        // ========== SAFE PLACES FUNCTIONS ==========
        function showSafePlacesModal() {
            closeAllModals();
            document.getElementById('safePlacesModal').style.display = 'flex';
            filterSafePlaces('all');
        }

        function showNearbyPolice() {
            closeAllModals();
            document.getElementById('safePlacesModal').style.display = 'flex';
            filterSafePlaces('police');
        }

        const PLACE_TYPE_ICON = {
            police: 'shield-alt',
            hospital: 'hospital',
            pharmacy: 'pills',
            metro: 'train-subway',
            petrol: 'gas-pump',
            restaurant: 'utensils',
            women_help: 'venus',
            transit: 'bus',
            safety: 'female',
            security: 'user-shield'
        };

        function loadSafePlaces(filterType) {
            const container = document.getElementById('safePlacesList');
            if (!container) return;

            container.innerHTML = '';

            const places = (!filterType || filterType === 'all')
                ? appData.safePlaces
                : appData.safePlaces.filter(p => p.type === filterType);

            if (places.length === 0) {
                container.innerHTML = '<p style="color:#999; text-align:center; padding: 20px 0;">No places found in this category</p>';
                return;
            }

            places.forEach(place => {
                const div = document.createElement('div');
                div.className = `safe-spot ${place.type}`;
                div.innerHTML = `
                    <i class="fas fa-${PLACE_TYPE_ICON[place.type] || 'map-marker-alt'}"></i>
                    <div style="flex: 1;">
                        <strong>${place.name}</strong>
                        <div style="color: #666; font-size: 16px; margin-top: 8px;">
                            <i class="fas fa-map-marker-alt"></i> ${place.distance} away
                            <br>
                            <i class="fas fa-phone"></i> ${place.phone}
                        </div>
                    </div>
                    <button onclick="callNumber('${place.phone}')" style="background: #4caf50; color: white; border: none; padding: 12px 20px; border-radius: 12px; cursor: pointer; font-size: 16px;">
                        <i class="fas fa-phone"></i> Call
                    </button>
                `;
                container.appendChild(div);
            });
        }

        function filterSafePlaces(type) {
            document.querySelectorAll('.places-filter-chip').forEach(c => c.classList.remove('active'));
            const chip = document.querySelector(`.places-filter-chip[data-type="${type}"]`);
            if (chip) chip.classList.add('active');
            loadSafePlaces(type);
        }

        function getDirectionsToNearestSafePlace() {
            const nearest = appData.safePlaces[0];
            if (nearest) {
                const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${nearest.lat},${nearest.lng}&travelmode=walking`;
                window.open(mapsUrl, '_blank');
                showToast(`Opening directions to ${nearest.name}`, "info");
            }
        }

        // ========== SUBSCRIPTION FUNCTIONS ==========
        function showSubscriptionModal() {
            closeAllModals();
            document.getElementById('subscriptionModal').style.display = 'flex';
            highlightCurrentPlan();
        }

        function selectPrice(plan, duration = 'free') {
            document.querySelectorAll('.price-box').forEach(box => {
                box.classList.remove('selected');
            });
            
            const boxId = plan === 'free' ? 'free' : `${plan}${duration.charAt(0).toUpperCase() + duration.slice(1)}`;
            const box = document.getElementById(boxId);
            if (box) {
                box.classList.add('selected');
            }
            
            appData.selectedPrice = { plan, duration };
        }

        function selectPlan(plan) {
            appData.userPlan = plan;
            
            if (plan === 'free') {
                showToast("You're on Free Plan", "info");
            } else if (plan === 'premiumAd') {
                showToast("🎉 Upgraded to Premium with Ads!", "success");
            } else if (plan === 'premiumNoAd') {
                showToast("🌟 Upgraded to Premium No Ads!", "success");
            }
            
            updateUIForPlan();
            closeModal('subscriptionModal');
            updateGuardiansDisplay();
            updateMapLockStatus();
            updateVideoLocks();
            
            if (document.getElementById('mapModal').style.display === 'flex') {
                showMapModal();
            }
        }

        function updateUIForPlan() {
            const planBadge = document.getElementById('planBadge');
            if (appData.userPlan === 'free') {
                planBadge.textContent = 'FREE';
                planBadge.className = 'plan-badge';
            } else if (appData.userPlan === 'premiumAd') {
                planBadge.textContent = 'PREMIUM';
                planBadge.className = 'plan-badge premium';
            } else if (appData.userPlan === 'premiumNoAd') {
                planBadge.textContent = 'PREMIUM+';
                planBadge.className = 'plan-badge premium';
            }
        }

        function updateMapLockStatus() {
            const mapLock = document.getElementById('mapLock');
            if (mapLock) {
                mapLock.style.display = appData.userPlan === 'free' ? 'block' : 'none';
            }
        }

        function highlightCurrentPlan() {
            document.querySelectorAll('.plan-card').forEach(card => {
                card.style.opacity = '1';
            });
            
            if (appData.userPlan === 'free') {
                document.querySelector('.plan-card.free').style.opacity = '0.7';
            } else if (appData.userPlan === 'premiumAd') {
                document.querySelector('.plan-card.premium-ad').style.opacity = '0.7';
            } else if (appData.userPlan === 'premiumNoAd') {
                document.querySelector('.plan-card.premium-no-ad').style.opacity = '0.7';
            }
            
            selectPrice(appData.userPlan, appData.userPlan === 'free' ? 'free' : 'monthly');
        }

        // ========== GUARDIAN FUNCTIONS ==========
        function updateGuardiansDisplay() {
            const guardiansList = document.getElementById('guardiansList');
            const limitWarning = document.getElementById('guardianLimitWarning');
            const addGuardianBtn = document.getElementById('addGuardianBtn');
            
            if (!guardiansList) return;
            
            guardiansList.innerHTML = '';
            
            const maxGuardians = appData.userPlan === 'free' ? 1 : 5;
            const currentCount = appData.guardians.length;
            
            if (appData.userPlan === 'free' && currentCount >= 1) {
                if (limitWarning) limitWarning.style.display = 'block';
                if (addGuardianBtn) {
                    addGuardianBtn.disabled = true;
                    addGuardianBtn.innerHTML = '<i class="fas fa-lock"></i> Limit Reached (Upgrade for more)';
                    addGuardianBtn.style.opacity = '0.6';
                }
            } else {
                if (limitWarning) limitWarning.style.display = 'none';
                if (addGuardianBtn) {
                    addGuardianBtn.disabled = false;
                    addGuardianBtn.innerHTML = '<i class="fas fa-plus"></i> Add Guardian';
                    addGuardianBtn.style.opacity = '1';
                }
            }
            
            const RELATION_ICON = {
                'Parent': 'person-dress', 'Mother': 'person-dress', 'Father': 'person',
                'Sibling': 'people-arrows', 'Friend': 'user-group', 'Partner': 'heart',
                'Emergency Contact': 'user-shield'
            };

            appData.guardians.forEach((guardian, index) => {
                const div = document.createElement('div');
                div.className = 'contact-card';
                const icon = RELATION_ICON[guardian.relation] || 'user-shield';
                const isFriend = guardian.relation === 'Friend';

                div.innerHTML = `
                    <div class="contact-card-header">
                        <div class="contact-card-avatar"><i class="fas fa-${icon}"></i></div>
                        <div>
                            <strong>${guardian.name}</strong>
                            <span>${guardian.relation} · ${guardian.phone}</span>
                        </div>
                        <button class="contact-card-remove" onclick="removeGuardian(${index})"><i class="fas fa-trash"></i></button>
                    </div>
                    <div class="contact-card-actions">
                        <button class="contact-action-btn call" onclick="callGuardian(${index})"><i class="fas fa-phone"></i>Call</button>
                        ${isFriend ? `
                            <button class="contact-action-btn navigate" onclick="navigateToGuardian(${index})"><i class="fas fa-diamond-turn-right"></i>Navigate</button>
                        ` : `
                            <button class="contact-action-btn location" onclick="shareLocationWithGuardian(${index})"><i class="fas fa-location-dot"></i>Location</button>
                            <button class="contact-action-btn message" onclick="messageGuardian(${index})"><i class="fas fa-comment-dots"></i>Message</button>
                        `}
                    </div>
                `;
                guardiansList.appendChild(div);
            });
        }

        function shareLocationWithGuardian(index) {
            const guardian = appData.guardians[index];
            showToast(`Live location shared with ${guardian.name}`, "success");
        }

        function messageGuardian(index) {
            const guardian = appData.guardians[index];
            const text = encodeURIComponent(`Hi ${guardian.name}, just checking in - I'm safe. Sent from SHE-SECURE.`);
            window.location.href = `sms:${guardian.phone}?body=${text}`;
        }

        function navigateToGuardian(index) {
            const guardian = appData.guardians[index];
            showToast(`Opening directions to meet ${guardian.name}`, "info");
        }

        function addGuardian() {
            const maxGuardians = appData.userPlan === 'free' ? 1 : 5;
            
            if (appData.guardians.length >= maxGuardians) {
                showToast(`Free plan allows only 1 guardian. Upgrade for up to 5 guardians.`, "warning");
                showSubscriptionModal();
                return;
            }
            
            const name = document.getElementById('guardianName').value.trim();
            const phone = document.getElementById('guardianPhone').value.trim();
            const relationEl = document.getElementById('guardianRelation');
            const relation = relationEl ? relationEl.value : "Emergency Contact";
            
            if (name && phone) {
                appData.guardians.push({
                    name: name,
                    phone: phone,
                    relation: relation
                });
                
                updateGuardiansDisplay();
                document.getElementById('guardianName').value = '';
                document.getElementById('guardianPhone').value = '';
                showToast("Emergency contact added!", "success");
            } else {
                showToast("Please enter both name and phone number", "error");
            }
        }

        function removeGuardian(index) {
            if (confirm(`Remove ${appData.guardians[index].name} from emergency contacts?`)) {
                appData.guardians.splice(index, 1);
                updateGuardiansDisplay();
                showToast("Contact removed", "info");
            }
        }

        function showGuardiansModal() {
            closeAllModals();
            document.getElementById('guardiansModal').style.display = 'flex';
            updateGuardiansDisplay();
        }

        // ========== JOURNEY MODE ==========
        function showJourneyModal() {
            closeAllModals();
            document.getElementById('journeyModal').style.display = 'flex';
            renderJourneyModal();
        }

        function renderJourneyModal() {
            const body = document.getElementById('journeyModalBody');
            const j = appData.journey;

            if (j.active) {
                const remainingKm = (j.distanceKm * (1 - j.progressPercent / 100)).toFixed(1);
                const remainingMin = Math.max(0, Math.round(j.etaMinutes * (1 - j.progressPercent / 100)));
                body.innerHTML = `
                    <div class="journey-live-card">
                        <h3><i class="fas fa-location-crosshairs"></i> Traveling to ${j.destination}</h3>
                        <div class="journey-progress-bar"><div class="journey-progress-fill" id="journeyProgressFill" style="width:${j.progressPercent}%"></div></div>
                        <div class="journey-stats-row">
                            <div><strong>${remainingKm} km</strong><span>Remaining</span></div>
                            <div><strong>${remainingMin} min</strong><span>ETA</span></div>
                            <div><strong>${appData.safetyScore}/100</strong><span>Safety Score</span></div>
                        </div>
                    </div>

                    <div class="guardian-watching-banner">
                        <span class="live-dot"></span>
                        <span>${appData.guardians.length > 0 ? appData.guardians[0].name : 'Your guardian'} is watching your live location right now</span>
                    </div>
                    <div class="live-tracking-map" id="liveTrackingMap"></div>
                    <div class="live-tracking-grid">
                        <div class="live-tracking-stat"><i class="fas fa-clock"></i><strong id="liveTrackETA">${remainingMin} min</strong><span>ETA Update</span></div>
                        <div class="live-tracking-stat" id="liveTrackBatteryCard"><i class="fas fa-battery-three-quarters"></i><strong id="liveTrackBattery">${appData.liveTracking.battery}%</strong><span>Battery</span></div>
                        <div class="live-tracking-stat"><i class="fas fa-signal"></i><strong id="liveTrackNetwork">${appData.liveTracking.network}</strong><span>Network Strength</span></div>
                        <div class="live-tracking-stat"><i class="fas fa-person-walking"></i><strong id="liveTrackLastMove">Just now</strong><span>Last Movement</span></div>
                    </div>

                    <button class="map-btn" onclick="startSOSTimer()" style="background: linear-gradient(45deg,#ff5252,#ff1744); margin-bottom: 10px;">
                        <i class="fas fa-bell"></i> Emergency SOS
                    </button>
                    <button class="map-btn secondary" onclick="endJourney()">
                        <i class="fas fa-stop"></i> End Journey
                    </button>
                `;
                appData.liveTracking.map = null; // old map container was just replaced, force re-init
                setTimeout(() => {
                    initLiveTrackingMap();
                    renderLiveTrackingStats();
                }, 100);
            } else {
                body.innerHTML = `
                    <div class="journey-form-group">
                        <label>Destination</label>
                        <input type="text" id="journeyDestination" placeholder="e.g. College, Home, Office">
                    </div>
                    <div class="journey-form-group">
                        <label>Transport Mode</label>
                        <div class="transport-options" id="journeyTransportOptions">
                            <div class="transport-opt selected" data-mode="walking" onclick="selectTransport(this)"><i class="fas fa-person-walking"></i>Walk</div>
                            <div class="transport-opt" data-mode="auto" onclick="selectTransport(this)"><i class="fas fa-taxi"></i>Auto/Cab</div>
                            <div class="transport-opt" data-mode="bike" onclick="selectTransport(this)"><i class="fas fa-motorcycle"></i>Bike</div>
                            <div class="transport-opt" data-mode="transit" onclick="selectTransport(this)"><i class="fas fa-bus"></i>Transit</div>
                        </div>
                    </div>
                    <div class="journey-form-group">
                        <label>Estimated ETA</label>
                        <p id="journeyEtaPreview" style="color:#666; font-size: 14px;">Enter a destination to calculate ETA</p>
                    </div>
                    <button class="subscribe-btn" onclick="startJourney()">
                        <i class="fas fa-play"></i> Start Journey
                    </button>
                `;
                const destInput = document.getElementById('journeyDestination');
                if (destInput) {
                    destInput.addEventListener('input', () => {
                        const preview = document.getElementById('journeyEtaPreview');
                        if (destInput.value.trim()) {
                            const km = (Math.random() * 4 + 1).toFixed(1);
                            const mode = document.querySelector('.transport-opt.selected').dataset.mode;
                            const speedFactor = { walking: 5, bike: 25, auto: 20, transit: 18 }[mode];
                            const mins = Math.max(2, Math.round((km / speedFactor) * 60));
                            preview.textContent = `≈ ${km} km · ${mins} min by ${mode}`;
                        } else {
                            preview.textContent = 'Enter a destination to calculate ETA';
                        }
                    });
                }
            }
        }

        function selectTransport(el) {
            document.querySelectorAll('.transport-opt').forEach(o => o.classList.remove('selected'));
            el.classList.add('selected');
            document.getElementById('journeyDestination').dispatchEvent(new Event('input'));
        }

        function startJourney() {
            const dest = document.getElementById('journeyDestination').value.trim();
            if (!dest) {
                showToast("Please enter a destination", "error");
                return;
            }
            const mode = document.querySelector('.transport-opt.selected').dataset.mode;
            const km = +(Math.random() * 4 + 1).toFixed(1);
            const speedFactor = { walking: 5, bike: 25, auto: 20, transit: 18 }[mode];
            const mins = Math.max(2, Math.round((km / speedFactor) * 60));

            appData.journey.active = true;
            appData.journey.destination = dest;
            appData.journey.transport = mode;
            appData.journey.distanceKm = km;
            appData.journey.etaMinutes = mins;
            appData.journey.progressPercent = 0;
            appData.stats.journeysCount++;
            updateSafetyAnalytics();

            updateDashboardTiles();
            renderJourneyModal();
            showToast(`Journey started to ${dest}. Stay safe!`, "success");
            startLiveGuardianTracking();

            appData.journey.timer = setInterval(() => {
                appData.journey.progressPercent = Math.min(100, appData.journey.progressPercent + (100 / (appData.journey.etaMinutes * 2)));
                const fill = document.getElementById('journeyProgressFill');
                if (fill) fill.style.width = appData.journey.progressPercent + '%';

                if (appData.journey.progressPercent >= 100) {
                    clearInterval(appData.journey.timer);
                    showToast(`You've arrived at ${appData.journey.destination}!`, "success");
                    endJourney(true);
                } else if (Math.floor(appData.journey.progressPercent) % 34 === 0) {
                    renderJourneyModal();
                }
            }, 3000);

            // Simulate a "not reached destination in time" safety check-in popup
            appData.journey.checkinTimer = setTimeout(() => {
                if (appData.journey.active) {
                    showCheckinPopup(`You haven't reached ${appData.journey.destination} yet. Please confirm you're okay.`);
                }
            }, 20000);
        }

        function endJourney(arrived) {
            clearInterval(appData.journey.timer);
            clearTimeout(appData.journey.checkinTimer);
            appData.journey.active = false;
            appData.journey.progressPercent = 0;
            if (!appData.isSOSActive) stopLiveGuardianTracking();
            updateDashboardTiles();
            renderJourneyModal();
            if (!arrived) showToast("Journey ended", "info");
        }

        function showCheckinPopup(text) {
            document.getElementById('checkinPopupText').textContent = text;
            document.getElementById('checkinPopupOverlay').style.display = 'flex';
        }

        function confirmCheckinSafe() {
            document.getElementById('checkinPopupOverlay').style.display = 'none';
            showToast("Glad you're safe! 💗", "success");
        }

        function triggerCheckinHelp() {
            document.getElementById('checkinPopupOverlay').style.display = 'none';
            showToast("Need Help selected — starting emergency SOS", "warning");
            startSOSTimer();
        }

        // ========== SMART CHECK-IN ==========
        function showCheckinModal() {
            closeAllModals();
            document.getElementById('checkinModal').style.display = 'flex';
            renderCheckinModal();
        }

        function renderCheckinModal() {
            const body = document.getElementById('checkinModalBody');
            const c = appData.checkin;
            if (c.active) {
                body.innerHTML = `
                    <div class="journey-live-card">
                        <h3><i class="fas fa-hourglass-half"></i> Checking in to ${c.destination}</h3>
                        <p style="color:#666; margin-top: 10px;">Reach by <strong>${c.reachBy}</strong>. Your guardians will be notified automatically if you don't confirm arrival.</p>
                    </div>
                    <button class="map-btn" onclick="manualCheckinConfirm()" style="margin-bottom: 10px;">
                        <i class="fas fa-check"></i> I've Arrived Safely
                    </button>
                    <button class="map-btn secondary" onclick="cancelCheckin()">
                        <i class="fas fa-times"></i> Cancel Check-in
                    </button>
                `;
            } else {
                body.innerHTML = `
                    <div class="journey-form-group">
                        <label>Destination</label>
                        <input type="text" id="checkinDestination" placeholder="e.g. College">
                    </div>
                    <div class="journey-form-group">
                        <label>Reach By</label>
                        <input type="time" id="checkinReachBy">
                    </div>
                    <button class="subscribe-btn" onclick="startCheckin()">
                        <i class="fas fa-play"></i> Start Check-in
                    </button>
                `;
            }
        }

        function startCheckin() {
            const dest = document.getElementById('checkinDestination').value.trim();
            const time = document.getElementById('checkinReachBy').value;
            if (!dest || !time) {
                showToast("Please fill destination and reach-by time", "error");
                return;
            }
            appData.checkin.active = true;
            appData.checkin.destination = dest;
            appData.checkin.reachBy = time;
            renderCheckinModal();
            showToast(`Check-in set for ${dest} by ${time}`, "success");

            // Demo: simulate the deadline passing after 20s if not confirmed
            appData.checkin.timer = setTimeout(() => {
                if (appData.checkin.active) {
                    const firstName = (appData.userProfile.fullName || 'User').split(' ')[0];
                    showToast(`⚠️ ${firstName} has not checked in! Notifying guardians with last known location.`, "error");
                    appData.guardians.forEach(g => sendEmergencyAlert(g));
                }
            }, 20000);
        }

        function manualCheckinConfirm() {
            clearTimeout(appData.checkin.timer);
            appData.checkin.active = false;
            renderCheckinModal();
            showToast("Check-in confirmed. Glad you made it safely!", "success");
        }

        function cancelCheckin() {
            clearTimeout(appData.checkin.timer);
            appData.checkin.active = false;
            renderCheckinModal();
            showToast("Check-in cancelled", "info");
        }

        // ========== COMMUNITY SAFETY MAP ==========
        function showCommunityMapModal() {
            closeAllModals();
            document.getElementById('communityMapModal').style.display = 'flex';
            renderCommunityReportsList();
            setTimeout(initCommunityMap, 100);
        }

        function initCommunityMap() {
            if (appData.communityMap) {
                appData.communityMap.remove();
                appData.communityMap = null;
            }
            const el = document.getElementById('communityMap');
            if (!el) return;
            el.innerHTML = '';

            appData.communityMap = L.map('communityMap', {
                center: [appData.userLocation.lat, appData.userLocation.lng],
                zoom: 14,
                zoomControl: true,
                attributionControl: false,
                scrollWheelZoom: false,
                dragging: true,
                tap: false
            });

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                maxZoom: 19, minZoom: 3
            }).addTo(appData.communityMap);

            const colorFor = (type) => ({
                'Harassment': '#ff5252', 'Stalking': '#ff9800', 'Poor Lighting': '#ffd600',
                'Police Patrol': '#2196f3', 'Safe Area': '#4caf50'
            }[type] || '#9c27b0');

            appData.communityReports.forEach(r => {
                L.circleMarker([r.lat, r.lng], {
                    radius: 9, color: 'white', weight: 2, fillColor: colorFor(r.type), fillOpacity: 0.9
                }).addTo(appData.communityMap).bindPopup(`<b>${r.type}</b><br>${r.desc}<br><small>${r.time}</small>`);
            });

            setTimeout(() => appData.communityMap.invalidateSize(), 300);
        }

        function renderCommunityReportsList() {
            const list = document.getElementById('communityReportsList');
            if (!list) return;
            const colorFor = (type) => ({
                'Harassment': '#ff5252', 'Stalking': '#ff9800', 'Poor Lighting': '#ffd600',
                'Police Patrol': '#2196f3', 'Safe Area': '#4caf50'
            }[type] || '#9c27b0');

            list.innerHTML = appData.communityReports.slice().reverse().map(r => `
                <div class="community-report-item">
                    <span class="report-dot" style="background:${colorFor(r.type)}"></span>
                    <div>
                        <strong>${r.type}</strong>
                        <p>${r.desc}</p>
                        <p>${r.time}</p>
                    </div>
                </div>
            `).join('') || '<p style="color:#999; text-align:center;">No community reports yet</p>';
        }

        // ========== AI CHAT ASSISTANT ==========
        function showChatModal() {
            closeAllModals();
            document.getElementById('chatModal').style.display = 'flex';
            if (appData.chatMessages.length === 0) {
                addChatMessage("bot", "Hi, I'm your SHE-SECURE AI Assistant 🤖💗\nI can help with safety questions, nearby help, or emergency guidance. How can I help you right now?");
            } else {
                renderChatMessages();
            }
        }

        function addChatMessage(sender, text) {
            appData.chatMessages.push({ sender, text });
            renderChatMessages();
        }

        function renderChatMessages() {
            const wrap = document.getElementById('chatMessages');
            if (!wrap) return;
            wrap.innerHTML = appData.chatMessages.map(m =>
                `<div class="chat-bubble ${m.sender}">${m.text}</div>`
            ).join('');
            wrap.scrollTop = wrap.scrollHeight;
        }

        function sendChatSuggestion(text) {
            document.getElementById('chatInput').value = text;
            sendChatMessage();
        }

        function sendChatMessage() {
            const input = document.getElementById('chatInput');
            const text = input.value.trim();
            if (!text) return;
            addChatMessage("user", text);
            input.value = '';

            setTimeout(() => {
                addChatMessage("bot", getAssistantReply(text));
            }, 500);
        }

        function getAssistantReply(text) {
            const t = text.toLowerCase();
            if (t.includes('unsafe') || t.includes('scared') || t.includes('afraid')) {
                return "I'm here with you. Move toward a well-lit, crowded place if you can. Would you like me to trigger SOS or find the nearest police station?";
            }
            if (t.includes('follow')) {
                return "Stay calm. Head to the nearest shop, police station, or crowded spot, and consider calling a guardian now. Tap the SOS button if you feel in danger.";
            }
            if (t.includes('police station') || t.includes('nearest police')) {
                const p = appData.safePlaces.find(s => s.type === 'police');
                return p ? `The nearest police station is ${p.name}, about ${p.distance} away. Tap Safe Places on Home to call or navigate there.` : "I couldn't find a nearby police station in your saved list — check the Safe Places screen.";
            }
            if (t.includes('fir')) {
                return "To file an FIR:\n1) Visit the nearest police station or use your state's online FIR portal.\n2) Explain what happened clearly with date, time & location.\n3) Get a signed copy with the FIR number.\nYou can also call the Women Helpline (1091) for guidance.";
            }
            if (t.includes('emergency number') || t.includes('helpline')) {
                return "Emergency numbers:\n📞 Police: 100\n📞 Women Helpline: 1091 / 181\n📞 Ambulance: 102\nTap any guardian's call icon for quick dialing too.";
            }
            if (t.includes('thank')) {
                return "You're always welcome — stay safe! 💗";
            }
            return "I've noted that. For anything urgent, please use the SOS button — it instantly alerts your guardians with your location. Would you like safety tips for your current area?";
        }

        // ========== INCIDENT REPORTING ==========
        function showIncidentModal() {
            closeAllModals();
            document.getElementById('incidentModal').style.display = 'flex';
            document.getElementById('incidentLocation').textContent =
                `Lat ${appData.userLocation.lat.toFixed(4)}, Lng ${appData.userLocation.lng.toFixed(4)} (current location)`;
        }

        function selectIncidentType(el) {
            document.querySelectorAll('.incident-type-opt').forEach(o => o.classList.remove('selected'));
            el.classList.add('selected');
        }

        function submitIncidentReport() {
            const selected = document.querySelector('.incident-type-opt.selected');
            const desc = document.getElementById('incidentDescription').value.trim();

            if (!selected) {
                showToast("Please select an incident type", "error");
                return;
            }
            if (!desc) {
                showToast("Please add a short description", "error");
                return;
            }

            appData.communityReports.push({
                type: selected.dataset.type,
                desc: desc,
                lat: appData.userLocation.lat + (Math.random() - 0.5) * 0.004,
                lng: appData.userLocation.lng + (Math.random() - 0.5) * 0.004,
                time: "Just now"
            });

            document.getElementById('incidentDescription').value = '';
            document.querySelectorAll('.incident-type-opt').forEach(o => o.classList.remove('selected'));

            appData.stats.communityReportsSubmitted++;
            updateSafetyAnalytics();
            updateDashboardTiles();
            showToast("Report submitted anonymously. Thank you for helping the community!", "success");
            showCommunityMapModal();
        }

        // ========== EMERGENCY EVIDENCE VAULT ==========
        function showVaultModal() {
            closeAllModals();
            document.getElementById('vaultModal').style.display = 'flex';
            renderVaultModal();
        }

        function renderVaultModal() {
            const body = document.getElementById('vaultModalBody');
            let html = '';

            if (appData.isSOSActive || appData.recording.active) {
                html += `
                    <div class="vault-active-box">
                        <span class="rec-dot"></span>
                        <div>
                            <strong>Recording in progress</strong>
                            <p style="font-size:12px; color:#888;">${appData.recording.active ? 'Front camera · Audio · GPS timeline are being saved' : 'Audio · GPS timeline · Emergency notes are being saved'}</p>
                        </div>
                    </div>
                `;
            }

            html += `<h4 style="margin-bottom: 10px; color: var(--dark);"><i class="fas fa-history"></i> Emergency History</h4>`;

            if (appData.emergencyHistory.length === 0) {
                html += `<p style="color:#999; text-align:center; padding: 20px 0;">No past emergencies recorded</p>`;
            } else {
                html += appData.emergencyHistory.slice().reverse().map((e, i) => `
                    <div class="vault-history-item" onclick="showEmergencyTimeline(${appData.emergencyHistory.length - 1 - i})">
                        <div class="vh-top">
                            <strong>${e.date}</strong>
                            <span class="vault-status-pill">${e.status}</span>
                        </div>
                        <span>Duration: ${e.duration} · Location: ${e.location}</span><br>
                        <span style="color: var(--primary); font-size: 12px;">View Details <i class="fas fa-chevron-right"></i></span>
                    </div>
                `).join('');
            }

            body.innerHTML = html;
        }

        function showEmergencyTimeline(index) {
            const e = appData.emergencyHistory[index];
            if (!e) return;
            const body = document.getElementById('vaultModalBody');
            body.innerHTML = `
                <button class="map-btn secondary" onclick="renderVaultModal()" style="margin-bottom: 15px;"><i class="fas fa-arrow-left"></i> Back to History</button>
                <h4 style="margin-bottom: 5px;">${e.date} · ${e.location}</h4>
                <p style="color:#888; font-size: 13px; margin-bottom: 10px;">Duration: ${e.duration} · Status: ${e.status}</p>
                ${e.videoUrl
                    ? `<video class="vault-evidence-video" src="${e.videoUrl}" controls playsinline></video>
                       <p style="color:#4caf50; font-size:12px; margin-bottom:10px;"><i class="fas fa-lock"></i> Encrypted video + audio evidence, uploaded automatically at SOS</p>`
                    : `<p style="color:#999; font-size:12px; margin-bottom:10px;"><i class="fas fa-video-slash"></i> No camera/mic evidence was captured for this alert</p>`
                }
                <div class="emergency-timeline">
                    ${e.timeline.map(t => `
                        <div class="timeline-entry">
                            <div class="t-time">${t.time}</div>
                            <div class="t-label">${t.label}</div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        // ========== UTILITY FUNCTIONS ==========
        function getLocation() {
            if (navigator.geolocation) {
                showToast("Fetching your location...", "info");
                navigator.geolocation.getCurrentPosition(
                    function(position) {
                        appData.userLocation = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        updateLocationDisplay();
                        showToast("Location updated successfully!", "success");
                        appData.stats.riskScans++;
                        updateProfileStats();
                    },
                    function(error) {
                        console.error("Geolocation error:", error);
                        showToast("Using simulated location for demo", "warning");
                        updateLocationDisplay();
                    }
                );
            } else {
                showToast("Geolocation not supported", "error");
                updateLocationDisplay();
            }
        }

        function updateLocationDisplay() {
            const loc = appData.userLocation;
            const locationText = document.getElementById('locationText');
            locationText.innerHTML = `
                <h3 style="color: var(--primary); margin-bottom: 8px; font-size: 18px;">📍 Current Position</h3>
                <p style="font-size: 16px;"><strong>Latitude:</strong> ${loc.lat.toFixed(6)}</p>
                <p style="font-size: 16px;"><strong>Longitude:</strong> ${loc.lng.toFixed(6)}</p>
                <small style="color: #4caf50; font-size: 14px;"><i class="fas fa-shield-alt"></i> Location sharing active</small>
            `;
        }

        // ========== AI SAFETY SCORE ENGINE ==========
        const SAFE_REASONS = [
            "Area is crowded",
            "Police station within 700 m",
            "Low community reports",
            "Good lighting",
            "Regular patrol activity nearby"
        ];
        const RISK_REASONS = [
            "Dark / poorly lit road",
            "Recent harassment reports nearby",
            "No police station nearby",
            "Isolated / low foot-traffic area",
            "Late-night time window"
        ];

        function updateRiskLevel() {
            const change = (Math.random() - 0.5) * 0.15;
            appData.riskLevel = Math.max(0.1, Math.min(0.9, appData.riskLevel + change));

            // Safety score is the inverse of risk, expressed out of 100
            appData.safetyScore = Math.round((1 - appData.riskLevel) * 100);
            appData.stats.safetyScoreSum += appData.safetyScore;
            appData.stats.safetyScoreSamples++;
            updateSafetyScoreUI();
            updateSafetyAnalytics();
            maybeDriftWeather();
        }

        function updateSafetyScoreUI() {
            const score = appData.safetyScore;
            const riskFill = document.getElementById('riskFill');
            const riskMessage = document.getElementById('riskMessage');
            const ring = document.getElementById('safetyScoreRing');
            const scoreValueEl = document.getElementById('safetyScoreValue');
            const statusEl = document.getElementById('safetyScoreStatus');
            const reasonsEl = document.getElementById('safetyScoreReasons');
            const recEl = document.getElementById('safetyScoreRecommendation');
            const dashScoreEl = document.getElementById('dashSafetyScore');

            if (riskFill) riskFill.style.width = (100 - score) + '%';
            if (scoreValueEl) scoreValueEl.textContent = score;
            if (dashScoreEl) dashScoreEl.textContent = score;

            // Ring: circumference for r=52 is ~326.7
            const circumference = 326.7;
            if (ring) {
                const offset = circumference - (score / 100) * circumference;
                ring.style.strokeDashoffset = offset;
            }

            let color, statusClass, statusText, msg, reasons, recommendation;
            if (score >= 65) {
                color = '#4caf50';
                statusClass = '';
                statusText = 'Safe';
                msg = '✅ Area appears safe';
                reasons = SAFE_REASONS.slice(0, 4);
                recommendation = 'Continue on current route.';
            } else if (score >= 40) {
                color = '#ff9800';
                statusClass = 'moderate';
                statusText = 'Moderate Risk';
                msg = '⚠️ Moderate Risk - Stay alert';
                reasons = [SAFE_REASONS[0], RISK_REASONS[3], SAFE_REASONS[1], RISK_REASONS[4]];
                recommendation = 'Stay in well-lit, populated areas and share your live location with a guardian.';
            } else {
                color = '#ff5252';
                statusClass = 'risky';
                statusText = 'High Risk';
                msg = '🔴 High Risk Detected! - Seek safe location';
                reasons = RISK_REASONS.slice(0, 3);
                recommendation = 'Take an alternate route or move to the nearest safe place immediately.';
            }

            if (ring) ring.style.stroke = color;
            if (riskFill) riskFill.style.background = color;
            if (riskMessage) { riskMessage.textContent = msg; riskMessage.style.color = color; }
            if (statusEl) {
                statusEl.className = 'safety-score-status ' + statusClass;
                statusEl.innerHTML = `<span class="dot"></span> ${statusText}`;
            }
            if (reasonsEl) {
                reasonsEl.innerHTML = reasons.map(r => {
                    const isBad = RISK_REASONS.includes(r);
                    return `<li class="${isBad ? 'bad' : ''}"><i class="fas fa-${isBad ? 'xmark' : 'check'}"></i> ${r}</li>`;
                }).join('');
            }
            if (recEl) {
                recEl.innerHTML = `<i class="fas fa-route"></i> <span><strong>Recommendation:</strong> ${recommendation}</span>`;
            }

            maybeShowSmartNotification(score, statusClass);
        }

        // ========== SMART NOTIFICATIONS ==========
        let lastSmartNotificationTime = 0;
        function maybeShowSmartNotification(score, statusClass) {
            if (statusClass !== 'risky' && statusClass !== 'moderate') return;

            const now = Date.now();
            if (now - lastSmartNotificationTime < 45000) return; // cooldown so it doesn't spam
            lastSmartNotificationTime = now;

            const nearest = appData.safePlaces.find(p => p.type === 'police') || appData.safePlaces[0];
            const meters = Math.round(parseFloat(nearest.distance) * 1000);

            showSmartNotification({
                level: statusClass === 'risky' ? 'high' : 'moderate',
                title: statusClass === 'risky' ? 'High Risk Area Ahead' : 'Moderate Risk Nearby',
                subtitle: `${nearest.name} · ${meters} m away`
            });
        }

        function showSmartNotification({ level, title, subtitle }) {
            const el = document.getElementById('smartNotification');
            if (!el) return;
            el.classList.toggle('high', level === 'high');
            document.getElementById('smartNotificationTitle').textContent = title;
            document.getElementById('smartNotificationSubtitle').textContent = subtitle;
            el.classList.add('show');

            if (navigator.vibrate && appData.settings.notifications.riskAlerts) {
                navigator.vibrate(200);
            }

            clearTimeout(el._autoHideTimer);
            el._autoHideTimer = setTimeout(() => dismissSmartNotification(), 8000);
        }

        function dismissSmartNotification() {
            const el = document.getElementById('smartNotification');
            if (el) el.classList.remove('show');
        }

        function acceptSmartNotificationRoute() {
            dismissSmartNotification();
            showMapModal();
            setTimeout(findSafeRoute, 400);
        }

        function callNumber(number) {
            showToast(`Calling ${number}...`, "info");
        }

        function callGuardian(index) {
            const guardian = appData.guardians[index];
            callNumber(guardian.phone);
        }

        function sendSupportEmail() {
            window.location.href = "mailto:support@shesecure.com";
        }

        function openTutorials() {
            showToast("Opening tutorials...", "info");
        }

        function showToast(message, type = "info") {
            const toast = document.getElementById('toast');
            toast.textContent = message;
            toast.className = 'toast ' + type;
            toast.style.display = 'block';
            
            setTimeout(() => {
                toast.style.display = 'none';
            }, 3000);
        }

        function closeModal(modalId) {
            document.getElementById(modalId).style.display = 'none';
        }

        function closeAllModals() {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
        }

        function showHome() {
            closeAllModals();
        }

        function updateProfileStats() {
            document.getElementById('sosCount').textContent = appData.stats.sosUsed;
            document.getElementById('safeDays').textContent = appData.stats.safeDays;
            document.getElementById('riskScans').textContent = appData.stats.riskScans;
            updateSafetyAnalytics();
        }

        function updateSafetyAnalytics() {
            const s = appData.stats;
            const journeysEl = document.getElementById('analyticsJourneys');
            const alertsEl = document.getElementById('analyticsAlerts');
            const routesEl = document.getElementById('analyticsSafeRoutes');
            const reportsEl = document.getElementById('analyticsReports');
            const avgEl = document.getElementById('analyticsAvgScore');

            if (journeysEl) journeysEl.textContent = s.journeysCount;
            if (alertsEl) alertsEl.textContent = s.sosUsed;
            if (routesEl) routesEl.textContent = s.safeRoutesUsed;
            if (reportsEl) reportsEl.textContent = s.communityReportsSubmitted;
            if (avgEl) {
                const avg = s.safetyScoreSamples > 0
                    ? Math.round(s.safetyScoreSum / s.safetyScoreSamples)
                    : appData.safetyScore;
                avgEl.textContent = avg;
            }
        }

        window.onclick = function(event) {
            if (event.target.classList.contains('modal')) {
                event.target.style.display = 'none';
            }
        };
