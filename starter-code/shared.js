/**
 * ============================================================
 * CelikSense AI — Shared JavaScript Library
 * File: js/shared.js
 *
 * PURPOSE:
 * This file contains ALL shared functions used across every
 * page in the CelikSense AI project. Instead of copying the
 * same code into every HTML file, each page just links to
 * this one file with:
 *   <script src="js/shared.js"></script>
 *
 * WHAT IS INSIDE:
 *   1. Language System  — bilingual English / Bahasa Melayu
 *   2. Accessibility    — font, contrast, overlay, zoom
 *   3. TTS Engine       — Text-to-Speech with correct voice
 *   4. Voice Engine     — Speech Recognition (voice commands)
 *   5. OpenRouter AI Client — connect to Google OpenRouter API (openrouter)
 *   6. User Profile     — save / load learner settings
 *   7. Analytics        — track sessions and focus score
 *   8. Toast Messages   — small pop-up notifications
 *   9. Navigation       — mark active nav link
 *
 * HOW TO USE IN ANY HTML PAGE:
 *   1. Add before </body>:
 *        <script src="js/shared.js"></script>
 *   2. Then your page script can call:
 *        CS.tts.speak("Hello")
 *        CS.gemini.summarise(text)
 *        CS.user.getProfile()
 *        CS.lang.t('welcome')
 * ============================================================
 */

/* ============================================================
   SECTION 1 — LANGUAGE SYSTEM
   Stores all text in English and Bahasa Melayu.
   Call CS.lang.t('key') to get the right text automatically.
   Call CS.lang.set('ms') or CS.lang.set('en') to switch.
============================================================ */
const CS_LANG = {
  en: {
    /* Navigation */
    nav_home:        'Home',
    nav_dashboard:   'Dashboard',
    nav_profile:     'My Profile',
    nav_ai_librarian: 'AI Librarian',
    nav_reading_companion: 'Reading Companion',
    nav_adhd_agent:  'ADHD Agent',
    nav_adhd:        'ADHD',
    nav_dyslexia_agent: 'Dyslexia Agent',
    nav_dyslexia:    'Dyslexia',
    nav_ds_agent:    'Down Syndrome Agent',
    nav_down_syndrome: 'Down Syndrome',
    nav_blind_agent: 'Blind Audio Agent',
    nav_blind_audio: 'Blind Audio',
    nav_sign_agent:  'Visual Communication Agent',
    nav_sign_language: 'Sign Language',
    nav_ew_agent:    'Early Warning Agent',
    nav_early_warning: 'Early Warning',
    nav_iv_agent:    'Intervention Agent',
    nav_intervention: 'Intervention',
    footer_agents:   'Agents',
    footer_more_agents: 'More Agents',
    footer_platform: 'Platform',
    footer_tagline:  'Knowledge Without Barrier, Intelligence Without Limits.',
    footer_built_with: 'Built with Agentic AI',
    nav_settings:    '⚙ Settings',
    nav_book_discovery: 'Book Discovery',
    nav_ocr_agent:   'OCR Reading Agent',
    nav_react_btn:   'ReAct AI Analysis',
    nav_lang_switch: 'BM',
    nav_lang_aria:   'Switch to Bahasa Melayu',
    nav_sign_in:     'Sign In',
    nav_view_profile: 'View Profile',
    nav_demo:        'Demo',
    nav_close:       'Close',
    nav_my_profile:  'My Profile',
    nav_reading_shelf: 'Virtual Bookshelf',

    /* Index page */
    idx_try_demo:        'Try Demo — No API Key Needed',
    idx_stat_agents:     'AI Agents',
    idx_stat_learners:   'Learner Types',
    idx_stat_languages:  'Languages',
    idx_stat_accessible: 'Accessible',
    idx_cta_discover:    'Discover',
    idx_cta_read:        'Read',
    idx_cta_focus:       'Focus',
    idx_cta_read_easier: 'Read Easier',
    idx_cta_support:     'Support',
    idx_cta_listen:      'Listen',
    idx_cta_deaf:        'Deaf Support',
    idx_cta_monitor:     'Monitor',
    idx_cta_plan:        'Plan',
    idx_cta_shelf:       'Shelf',
    idx_copyright:       '© 2026 CelikSense AI. All rights reserved.',
    idx_privacy:         'Privacy',
    idx_accessibility:   'Accessibility',
    idx_contact:         'Contact',
    idx_username_placeholder: 'Enter your username',

    /* Dashboard ARIA */
    dash_agent_librarian_aria: 'AI Librarian Agent – Find and recommend books tailored to your learning profile',
    dash_agent_reading_aria:   'Reading Companion Agent – Read with AI assistance',
    dash_agent_adhd_aria:      'ADHD Agent – Micro-reading sessions with focus timers',
    dash_agent_blind_aria:     'Blind Audio Agent – Full audio navigation with text-to-speech',
    dash_agent_ew_aria:        'Early Warning Agent – Learner risk assessment and educator alerts',
    dash_agent_iv_aria:        'Intervention Agent – Personalised strategies and action plans',
    dash_agent_ocr_aria:       'OCR Agent – Upload book images to extract text',
    dash_agent_braille_aria:   'Braille Output Feature',
    dash_agent_sign_aria:      'Visual Communication Agent – Deaf-friendly reading support',

    /* Common actions */
    loading:      'Loading...',
    save:         'Save',
    cancel:       'Cancel',
    close:        'Close',
    back:         'Back',
    next:         'Next',
    done:         'Done',
    retry:        'Try again',
    start:        'Start',
    stop:         'Stop',
    pause:        'Pause',
    resume:       'Resume',
    clear:        'Clear',
    read_aloud:   'Read aloud',
    stop_audio:   'Stop audio',
    upload:       'Upload',
    capture:      'Capture',
    copy:         'Copy',
    copied:       'Copied!',
    generate:     'Generate',
    settings:     'Settings',

    /* Accessibility panel */
    a11y_title:         'Accessibility Settings',
    a11y_font_size:     'Text size',
    a11y_font_style:    'Font style',
    a11y_contrast:      'Contrast mode',
    a11y_overlay:       'Colour overlay',
    a11y_tts:           'Text-to-speech',
    a11y_tts_speed:     'Speech speed',
    a11y_captions:      'Show captions',
    a11y_ruler:         'Reading ruler',
    a11y_window:        'Reading window',
    a11y_voice_cmd:     'Voice commands',
    a11y_reset:         'Reset to defaults',
    a11y_font_system:   'System',
    a11y_font_dyslexic: 'OpenDyslexic',
    a11y_font_arial:    'Arial',
    a11y_contrast_normal:   'Normal',
    a11y_contrast_high:     'High contrast',
    a11y_contrast_inverted: 'Inverted',
    a11y_overlay_none:   'None',
    a11y_overlay_yellow: 'Yellow',
    a11y_overlay_blue:   'Blue',
    a11y_overlay_green:  'Green',
    a11y_overlay_grey:   'Grey',
    a11y_overlay_pink:   'Pink',

    /* OCR Agent */
    ocr_title:       'OCR Scanner',
    ocr_upload:      'Upload Image',
    ocr_camera:      'Take Photo',
    ocr_capture:     'Capture Image',
    ocr_retake:      'Retake Photo',
    ocr_extract:     'Extract Text',
    ocr_extracting:  'Extracting text...',
    ocr_read:        'Read Aloud',
    ocr_stop:        'Stop Audio',
    ocr_confidence:  'OCR Confidence',
    ocr_empty:       'Upload or photograph a page to begin.',
    ocr_success:     'Text extracted successfully.',
    ocr_error:       'OCR failed. Please try again.',
    ocr_low_conf:    'Low confidence. Try better lighting.',
    ocr_guide:       'Voice guide activated. Press 2 to upload, 3 to take photo.',

    /* Reading Companion */
    rc_title:        'Reading Companion',
    rc_paste_hint:   'Paste or type your text here...',
    rc_summarise:    'Summarise',
    rc_quiz:         'Generate Quiz',
    rc_simplify:     'Simplify',
    rc_summary_title:'AI Summary',
    rc_quiz_title:   'Comprehension Quiz',
    rc_score:        'Your score',
    rc_correct:      'Correct!',
    rc_wrong:        'Not quite.',
    rc_generating:   'Generating with AI...',
    rc_empty:        'Enter text to get started.',
    rc_level:        'Reading level',
    rc_easy:         'Simple',
    rc_normal:       'Standard',
    rc_deep:         'In depth',

    /* ADHD Agent */
    adhd_title:      'ADHD Focus Agent',
    adhd_timer:      'Focus timer',
    adhd_start:      'Start session',
    adhd_break:      'Take a break',
    adhd_break_msg:  'Great work! Time for a 5-minute break.',
    adhd_resume:     'Resume session',
    adhd_focus:      'Focus score',
    adhd_done:       'Session complete!',
    adhd_distracted: 'Focus seems low. Take a short break?',
    adhd_tip:        'Tip: Read one paragraph at a time.',

    /* Dyslexia Agent */
    dys_title:       'Dyslexia Support',
    dys_font:        'Reading font',
    dys_spacing:     'Letter spacing',
    dys_line_h:      'Line height',
    dys_overlay:     'Colour overlay',
    dys_ruler:       'Reading ruler',
    dys_syllables:   'Syllable split',
    dys_highlight:   'Word highlight',
    dys_sample:      'Sample text',
    dys_hint:        'Adjust settings until reading feels comfortable.',

    /* Blind Audio Agent */
    blind_title:     'Blind Audio Agent',
    blind_activate:  'Activate voice guide',
    blind_test_mic:  'Test microphone',
    blind_commands:  'Voice commands',
    blind_listening: 'Listening...',
    blind_not_heard: 'Not recognised. Please try again.',
    blind_mic_ok:    'Microphone is working.',
    blind_mic_fail:  'Microphone not found. Check browser permissions.',
    blind_intro:     'Welcome to Blind Audio Agent. Say "start guide" for help.',

    /* Early Warning */
    ew_title:        'Learning Health Monitor',
    ew_risk_score:   'Risk score',
    ew_risk_low:     'Low risk',
    ew_risk_moderate:'Moderate risk',
    ew_risk_high:    'High risk',
    ew_risk_critical:'Critical — seek support',
    ew_sessions:     'Sessions this week',
    ew_avg_quiz:     'Avg quiz score',
    ew_avg_focus:    'Avg focus score',
    ew_no_data:      'No data yet. Complete sessions to see your score.',
    ew_recalculate:  'Recalculate',

    /* Intervention */
    int_title:       'Intervention Planner',
    int_generate:    'Generate plan',
    int_generating:  'Creating your personalised plan...',
    int_no_data:     'No risk data found. Use the Early Warning Agent first.',
    int_step:        'Step',
    int_days:        'days',
    int_read_plan:   'Read plan aloud',

    /* AI Librarian */
    lib_title:       'AI Librarian',
    lib_interests:   'Your interests',
    lib_search:      'Find books',
    lib_searching:   'Searching...',
    lib_results:     'Recommended for you',
    lib_no_results:  'No results. Try different interests.',
    lib_read:        'Read recommendation',

    /* Voice */
    voice_start:        'Start listening',
    voice_stop:         'Stop listening',
    voice_denied:       'Microphone permission denied.',
    voice_network_err:  'Network error. Check your connection.',
    voice_not_supported:'Voice commands not supported in this browser.',

    /* Gemini */
    gemini_error:  'AI service unavailable. Using basic mode.',
    gemini_quota:  'Daily AI limit reached. Try again tomorrow.',
    gemini_no_key: 'No OpenRouter API key set. Add it in Settings.',

    /* Errors */
    err_generic:   'Something went wrong. Please try again.',
    err_offline:   'You are offline. Some features may be limited.',
    err_camera:    'Camera not available. Check browser permissions.',

    /* Homepage / Navigation extras */
    tagline:        'Agentic Multi-Sensory Learning',
    nav_agents:     'Agents ▾',
    nav_signup:       'Sign Up',
    signup_title:     'Create Your Account',
    signup_sub:       'Start your inclusive learning journey today.',
    signup_username:  'Username',
    signup_uph:       'Enter your username',
    signup_email:     'Email',
    signup_eph:       'example@email.com',
    signup_btn:       'Sign Up',
    signup_note:      'Data is saved on your device only. No external server.',
    signup_success:   'Account created! Redirecting to dashboard…',
    signup_err_user:  'Please enter your username.',
    signup_err_email: 'Please enter a valid email address.',

    /* Hero section */
    hero_badge:     '10 AI Agents · Inclusive Learning',
    hero_title:     'CelikSense AI',
    hero_subtitle:  'Multi-Sensory Learning Ecosystem',
    hero_tagline:   'Knowledge Without Barrier, Intelligence Without Limits',
    hero_cta1:      'Get Started',

    /* Profile page */
    prof_badge:          'My Profile',
    prof_title:          'Learner Profile',
    prof_subtitle:       'Manage your accessibility settings, reading preferences, and learning history.',
    prof_edit:           '✎ Edit Profile',
    prof_this_week:      '📊 This Week',
    prof_sessions:       'Sessions',
    prof_read_time:      'Read Time',
    prof_focus_score:    'Focus Score',
    prof_books:          'Books',
    prof_quick_access:   '⚡ Quick Access',
    prof_my_adhd:        '🧠 My ADHD Agent',
    prof_reading_companion: '📚 Reading Companion',
    prof_reading_list:   '📖 My Reading List',
    prof_risk_report:    '⚠ Risk Report',
    prof_intervention:   '💡 Intervention Plan',

    /* Agents section */
    agents_badge:   'Our 10 AI Agents',
    agents_title:   '10 Agents, One Ecosystem',
    agents_desc:    'Each agent is purpose-built for a specific learning need. Together they form a personalised, adaptive learning system.',

    /* Learner profiles */
    learners_title:   'Supporting Every Learner',
    learner_blind:    'Blind & Low Vision',
    learner_deaf:     'Deaf & Hard of Hearing',
    learner_adhd:     'ADHD',
    learner_dyslexia: 'Dyslexia / Down Syndrome',
    learner_general:  'All Learners',
    learners_section_desc: 'Inclusive AI tools designed from the ground up for diverse learning needs in Malaysian classrooms and homes.',
    learner_blind_desc:    'Full audio navigation, keyboard shortcuts, and TTS for independent learning.',
    learner_deaf_desc:     'Deaf-friendly reading support with large captions, visual keywords, mind map and fingerspelling guide.',
    learner_adhd_desc:     'Micro-sessions, focus timers, reading windows, and interest-driven engagement.',
    learner_dyslexia_desc: 'Friendly fonts, colour overlays, reading rulers, and mind map visualisation.',
    learner_general_desc:  'AI Librarian, Reading Companion, and Intervention Agent serve every student.',
    learner_blind_agent:   'Blind Audio Agent',
    learner_deaf_agent:    'Visual Communication Agent',
    learner_adhd_agent:    'ADHD Agent',
    learner_dyslexia_agent:'Dyslexia / Down Syndrome Agent',
    learner_general_agent: 'All 10 Agents',
    /* Stat labels */
    stat_agents:'AI Agents', stat_learner_types:'Learner Types', stat_languages:'Languages', stat_accessible:'Accessible',
    /* Orb tags */
    orb_discover:'DISCOVER', orb_read:'READ', orb_focus:'FOCUS', orb_read_easier:'READ EASIER',
    orb_listen:'LISTEN', orb_sign:'DEAF SUPPORT', orb_monitor:'MONITOR', orb_plan:'PLAN', orb_support:'SUPPORT', orb_shelf:'SHELF',
    hero_platform_desc:'— a bilingual AI platform that adapts to blind, deaf, ADHD, and dyslexia learners.',
    /* How It Works */
    how_title:'How It Works',
    how_desc:'Three steps from signup to a fully personalised, accessible learning experience.',
    how_step1_title:'Set Your Profile', how_step1_desc:'Tell CelikSense about your learning needs, language preference, and interests. Takes under two minutes.', how_step1_btn:'Go to Profile',
    how_step2_title:'AI Adapts for You', how_step2_desc:'The 10 agents automatically configure fonts, audio, overlays, session length, and language to match your profile.', how_step2_btn:'Open Dashboard',
    how_step3_title:'Learn Without Barriers', how_step3_desc:'Read, listen, sign, and explore. The Early Warning Agent monitors your progress and suggests interventions when needed.', how_step3_btn:'Start Reading',
    /* Why */
    why_title:'Why CelikSense AI?', why_desc:'Designed from the ground up for inclusive, accessible, bilingual learning.',
    why1_title:'Truly Agentic AI', why1_desc:'10 specialised agents that communicate and co-ordinate to personalise every session, not just a single chatbot.',
    why2_title:'Bilingual Throughout', why2_desc:'Complete English and Bahasa Melayu support across every agent, every label, and every audio instruction.',
    why3_title:'Built for Access', why3_desc:'Keyboard navigation, ARIA labels, TTS, high-contrast mode, and screen-reader support are first-class features, not add-ons.',
    why4_title:'Adaptive by Default', why4_desc:'Learns your preferences, adjusts fonts, colours, session lengths, and content difficulty automatically session by session.',
    why5_title:'Early Warning System', why5_desc:'Proactively identifies learners at risk and generates personalised, prioritised intervention plans for educators.',
    why6_title:'Multi-Sensory Learning', why6_desc:'Visual, audio, tactile, and sign-language modes mean every learner finds a path that works for their brain.',
    /* CTA */
    cta_badge:'Ready to start?', cta_headline:'Learning that adapts to you',
    cta_sub:'Join educators and learners across Malaysia using CelikSense AI to make reading, comprehension, and communication genuinely accessible.',
    cta_btn1:'Open Dashboard →', cta_btn2:'Create Profile',
    /* Footer */
    footer_tagline1:'Agentic Multi-Sensory Learning Ecosystem for inclusive education in Malaysia and beyond.',
    footer_tagline2:'Knowledge Without Barrier, Intelligence Without Limits.',
    footer_col_core:'Core Agents', footer_col_more:'More Agents', footer_col_platform:'Platform',
    btn_explore_agents:'✨ Explore Agents', btn_view_all_agents:'View All Agents in Dashboard →',

    /* Agent cards */
    a1_name: 'AI Librarian',
    a1_desc: 'Smart book recommendations based on learner profile and accessibility needs.',
    a2_name: 'Reading Companion',
    a2_desc: 'Personal reading guide with comprehension support, vocabulary, and audio navigation.',
    a3_name: 'ADHD Agent',
    a3_desc: 'Focus windows, micro-sessions, smart highlighting, and note builder for ADHD learners.',
    a4_name: 'Dyslexia Agent',
    a4_desc: 'Dyslexia-friendly fonts, colour overlays, reading ruler, and visual mind maps for dyslexia learners.',
    a5_name: 'Blind Audio Agent',
    a5_desc: 'Full audio navigation and text-to-speech for blind and low-vision learners.',
    a6_name: 'Visual Communication Agent',
    a6_desc: 'Deaf-friendly reading support with large captions, visual keywords, mind map and comic sequence.',
    a7_name: 'Early Warning Agent',
    a7_desc: 'Performance monitoring that flags at-risk learners and triggers timely educator alerts.',
    a8_name: 'Intervention Agent',
    a8_desc: 'AI-generated personalised strategies, action plans, and curated resource library.',
    a9_name: 'Down Syndrome Agent',
    a9_desc: 'Simplified language, visual storyboards, vocabulary drills, and inclusive learning support.',
    a10_name: 'Rak Buku Maya',
    a10_desc: 'Save, organise and re-read your favourite books — a personal collection in one digital shelf.',

    /* Settings page */
    set_title:               'Settings',
    set_subtitle:            'Customise CelikSense AI for your learning needs.',
    set_tab_ai:              'AI Settings',
    set_tab_a11y:            'Accessibility',
    set_tab_profile:         'Profile',
    set_tab_lang:            'Language',
    set_tab_data:            'Data & Privacy',
    set_gemini_title:        'OpenRouter AI',
    set_gemini_desc:         'Enter your OpenRouter API key to enable AI summaries, quizzes, and intervention plans.',
    set_api_none:            'No key set',
    set_api_saved:           'Key saved — click Test to verify',
    set_api_ok:              'Connected — OpenRouter AI is working',
    set_save_key:            'Save Key',
    set_test:                'Test',
    set_clear_key:           'Clear Key',
    set_get_key:             'Get free key ↗',
    set_key_privacy:         'Your API key is saved only in your browser (localStorage). It is never sent to any server.',
    set_key_warn_title:      'API Key Security',
    set_key_warn_body:       'This key is stored in localStorage and can be read by any script on this page. Use a key with quota limits and referrer restrictions. Do not use a project owner key.',
    set_key_saved:           'API key saved!',
    set_ai_prefs:            'AI Preferences',
    set_ai_prefs_desc:       'Control how AI features behave.',
    set_ai_summaries:        'AI Summaries',
    set_ai_summaries_sub:    'Auto-summarise long texts in Reading Companion',
    set_ai_quiz:             'AI Quizzes',
    set_ai_quiz_sub:         'Generate comprehension questions after reading',
    set_ai_intervention:     'AI Intervention Plans',
    set_ai_intervention_sub: 'Generate personalised learning strategies',
    set_font_title:          'Text & Font',
    set_font_desc:           'Adjust how text appears across all pages.',
    set_font_sub:            'OpenDyslexic helps some readers',
    set_contrast_desc:       'Choose a display mode that is easiest for your eyes.',
    set_overlay_sub:         'Helps with visual stress and dyslexia',
    set_tts_desc:            'Customise how text is read aloud.',
    set_voice_sub:           'Say commands to control the app hands-free',
    set_ruler_sub:           'A highlight band that follows your cursor',
    set_window_sub:          'Blur content outside a focus band (ADHD mode)',
    set_profile_title:       'Learner Profile',
    set_profile_desc:        'Your profile helps agents personalise their support.',
    set_name:                'Display name',
    set_disability:          'Accessibility need',
    set_grade:               'Year / Grade',
    set_lang_title:          'Display Language',
    set_lang_desc:           'Choose the language for all text in the app.',
    set_analytics_title:     'Learning Analytics',
    set_analytics_desc:      'Data is stored only in your browser — never uploaded to any server.',
    set_sessions:            'Sessions',
    set_avg_focus:           'Avg Focus',
    set_risk_score:          'Risk Score',
    set_clear_analytics:     'Clear all learning data',
    set_demo_title:          'Demo',
    set_demo_mode:           'Demo Mode',
    set_enable_demo:         'Enable Demo Mode',
    set_disable_demo:        'Disable',
    set_export_all:          'Export All Data',
    set_export_json:         'Export JSON',
    set_danger_title:        'Danger Zone',
    set_danger_desc:         'These actions cannot be undone.',
    set_clear_profile:       'Reset learner profile',
    set_clear_profile_sub:   'Removes name, grade, and disability type',
    set_clear_all:           'Reset everything',
    set_clear_all_sub:       'Clears all data including API key and accessibility settings',
    set_reset:               'Reset',
    set_avatar_engine:       'Avatar Engine',

    /* Dashboard */
    dash_welcome:       'Welcome back,',
    dash_name:          'Learner',
    dash_subtitle:      'Your personalised learning dashboard',
    dash_progress:      'Reading Progress',
    dash_focus:         'Focus Score',
    dash_mode:          'Accessibility Mode',
    dash_intervention:  'Recommended',
    dash_agents_title:  'AI Agents',
    dash_select_desc:   'Select an agent to start your personalised session',
    dash_start_reading: '▶ Start Reading',
    dash_view_report:   '📊 View Report',
    dash_view_plan:     'View Plan',
    dash_chapters_of:   'of',
    dash_chapters_done: 'chapters complete',
    dash_above_avg:     'Above average ↑',
    dash_average:       'Average',
    dash_below_avg:     'Below average ↓',
    dash_reading_window:'Reading window active',
    dash_no_mode:       'No active mode',
    dash_overlay_lbl:   'Overlay:',
    dash_focus_mode:    'Focus Mode On',
    dash_health_alert:  'Learning health alert:',
    dash_view_warning:  'View Early Warning Agent →',
    dash_recent_act:    'Recent Activity',
    dash_quick_stats:   'Quick Stats',
    dash_sessions_week: 'Sessions This Week',
    dash_total_read_time:'Total Reading Time',
    dash_books_explored:'Books Explored',
    dash_comp_avg:      'Comprehension Avg',
    dash_teacher_icon:  'Teacher',
    dash_teacher_desc:  'Class insights, student progress, early warnings',
    dash_demo_title:    'Demo',
    dash_demo_desc:     'Walkthrough demo, AI agents, pilot evidence',
    dash_pilot_title:   'Pilot Evidence',
    dash_pilot_desc:    'User validation results from real learners',
    dash_done_badge:    'Done',
    dash_break_due:     'Break Due',
    dash_just_now:      'Just now',
    dash_h_ago:         'h ago',
    dash_d_ago:         'd ago',
    dash_act_time1:     '2 hours ago · 15 min session',
    dash_act_time2:     'Yesterday · 10 min session',
    dash_act_time3:     '2 days ago · 20 min session',
    dash_knowledge_hub: 'MY KNOWLEDGE HUB',
    dash_open_hub:      'Open Knowledge Hub',
    dash_activity_chapter3: 'Reading Companion – Chapter 3',
    dash_activity_focus:    'ADHD Agent – Focus Session',
    dash_activity_overlay:  'Dyslexia Agent – Green Overlay',
    agent_active:       'Active',
    ew_form_title: 'Learner Assessment Form',
    ew_learner_name: 'Learner Name',
    ew_grade_level: 'Grade Level',
    ew_learning_need: 'Primary Learning Need',
    ew_perf_scores: 'Performance Scores (0–100)',
    ew_reading_score: 'Reading Score',
    ew_comprehension: 'Comprehension',
    ew_attention_focus: 'Attention / Focus',
    ew_participation: 'Participation',
    ew_warning_signs: 'Observed Warning Signs',
    ew_duration: 'Duration of Concern',
    ew_analyse_btn: '⚠ Analyse Risk Now',
    ew_overall_risk: 'Overall Risk Level',
    ew_run_btn: 'Run Assessment',
    ew_empty_msg: 'Complete and submit the assessment form to see risk analysis.',
    ew_perf_trend: 'Performance Trend (Last 6 Weeks)',
    ew_risk_factors: 'Risk Factors',
    ew_risk_empty: 'Submit assessment to see risk factors.',
    ew_active_alerts: 'Active Alerts',
    ew_no_alerts: 'No alerts generated yet.',
    ew_view_plan: 'View Intervention Plan',
    ew_gen_report: 'Generate Report',
    ew_reset: '↺ Reset',
    iv_learner_profile: 'Learner Profile',
    iv_learner_name: 'Learner Name',
    iv_primary_need: 'Primary Need',
    iv_risk_level: 'Risk Level',
    iv_grade_level: 'Grade Level',
    iv_weakest_area: 'Weakest Area',
    iv_available_support: 'Available Support',
    iv_lang_pref: 'Language Preference',
    iv_gen_plan: 'Generate Intervention Plan',
    iv_quick_actions: '⚡ Quick Actions',
    iv_open_adhd: 'Open ADHD Agent',
    iv_open_dyslexia: 'Open Dyslexia Agent',
    iv_reading_companion: 'Reading Companion',
    iv_back_ew: '⚠ Back to Early Warning',
    iv_empty_msg: 'Complete the learner profile and click Generate Intervention Plan to receive personalised AI recommendations.',
    /* early-warning page */
    ew_page_title:    'Early Warning Agent',
    ew_page_subtitle: 'Learner performance monitoring and risk assessment. Identify at-risk learners early and trigger timely interventions.',
    ew_dur_2w:        'Less than 2 weeks',
    ew_dur_4w:        '2–4 weeks',
    ew_dur_2m:        '1–2 months',
    ew_dur_over2m:    'More than 2 months',
    ew_sign1:         'Frequently loses focus during reading',
    ew_sign2:         'Reading speed significantly below average',
    ew_sign3:         'Difficulty recognising common words',
    ew_sign4:         'Low comprehension scores despite effort',
    ew_sign5:         'Avoids reading tasks consistently',
    ew_sign6:         'Incomplete assignments regularly',
    ew_sign7:         'Emotional distress related to reading',
    ew_sign8:         'Difficulty with text organisation',
    ew_risk_level_lbl: 'Risk Level',
    ew_avg_score:     'Avg Score',
    ew_warning_count: 'Warning Signs',
    ew_priority:      'Priority',
    ew_risk_meter:    'Risk Assessment Meter',
    ew_low_risk:      'Low Risk',
    ew_medium:        'Medium',
    ew_high_risk:     'High Risk',
    ew_risk_level:    'Risk Level',
    ew_urgent:        'Urgent',
    ew_high:          'High',
    ew_normal_priority: 'Normal',
    ew_critical:      '⚠ Critical',
    ew_concern:       'Concern',
    ew_factor_reading: 'Reading Score',
    ew_factor_comprehension: 'Comprehension',
    ew_factor_focus:  'Focus/Attention',
    ew_factor_participation: 'Participation',
    ew_factor_multiple: 'Multiple Warning Signs',
    ew_submit_to_see: 'Complete and submit the assessment form to see risk analysis.',
    ew_submit_factors: 'Submit assessment to see risk factors.',
    ew_name_placeholder: 'Enter name or ID…',
    ew_alert_immediate: 'Immediate Intervention Required',
    ew_alert_below_avg: 'Below-Average Academic Performance',
    ew_alert_multiple: 'Multiple Warning Signs Detected',
    ew_alert_proactive: 'Proactive Monitoring Advised',
    ew_alert_none: 'No Critical Alerts',
    ew_desc_high: 'High intervention urgency. Learner shows consistent low performance and multiple warning signs.',
    ew_desc_medium: 'Moderate concern. Monitor closely and consider targeted support.',
    ew_desc_low: 'Learner is performing adequately. Continue regular monitoring.',
    ew_no_risk_factors: 'No critical risk factors identified.',
    ew_toast_saved: 'Risk assessment saved to dashboard',
    ew_footer_name: '⚠ Early Warning Agent',
    ew_alert_desc_immediate: 'Risk score exceeds 65%. Please connect learner with support services immediately.',
    ew_alert_desc_below_avg: 'Average score of {avg}% is significantly below the expected level.',
    ew_alert_desc_multiple: '{n} concurrent warning signs increase intervention urgency.',
    ew_alert_desc_medium: 'Medium risk level. Schedule a learner review within the next two weeks.',
    ew_alert_desc_low: 'Learner appears to be managing at an acceptable level. Continue routine monitoring.',
    ew_signs: 'signs',
    iv_priority_1: 'P1 – Immediate',
    iv_priority_2: 'P2 – This Week',
    iv_priority_3: 'P3 – Ongoing',
    iv_for_name: 'for',
    ew_trend_declining: '↓ Declining performance trend over 6 weeks – intervention recommended',
    /* shared need / learning options */
    need_adhd:        'ADHD',
    need_dyslexia:    'Dyslexia',
    /* intervention page */
    iv_page_title:    'Intervention Recommendation Agent',
    iv_page_subtitle: 'AI-generated personalised intervention strategies, action plans, and curated learning resources for every learner profile.',
    iv_medium_risk:   'Medium Risk',
    iv_grade_p13:     'Primary 1–3',
    iv_grade_p46:     'Primary 4–6',
    iv_grade_s13:     'Secondary 1–3',
    iv_grade_s45:     'Secondary 4–5',
    iv_focus_att:     'Focus / Attention',
    iv_read_fluency:  'Reading Fluency',
    iv_comprehension: 'Comprehension',
    iv_writing:       'Writing',
    iv_maths:         'Maths',
    iv_sup1:          'Class Teacher Only',
    iv_sup2:          'Specialist + Teacher',
    iv_sup3:          'Family + School',
    iv_sup4:          'Full MDT Support',
    iv_bilingual:     'Bilingual',
    iv_plan_for:      'Intervention Plan for',
    iv_generated_by:  'Generated by AI ·',
    iv_recommended_strategies: 'Recommended Strategies',
    iv_strategies_for: 'personalised strategies for',
    iv_open_agent:    'Open Agent →',
    iv_action_timeline: 'Action Plan Timeline',
    iv_timeline_desc: 'Step-by-step intervention roadmap',
    iv_recommended_resources: 'Recommended Resources',
    iv_open:          'Open →',
    iv_export_plan:   'Export Plan',
    iv_back_risk:     '⚠ Back to Risk Assessment',
    iv_read_aloud:    'Read Aloud',
    iv_name_placeholder: 'Name or ID…',
    iv_weakness_label: 'Weakness:',
    iv_ai_rec_title: 'AI Personalised Recommendation',
    iv_api_key_note: 'Add an OpenRouter API key in Settings for personalised AI recommendations.',
    iv_generating: 'Generating personalised plan…',
    iv_specific_activities: 'Specific Activities',
    iv_footer_name: ' Intervention Recommendation Agent',
    dys_font_mode: 'Font Mode',
    dys_text_size: 'Text Size',
    dys_line_spacing: '↕ Line Spacing',
    dys_colour_overlay: 'Colour Overlay',
    dys_reading_ruler: 'Reading Ruler',
    dys_enable_ruler: 'Enable Reading Ruler',
    dys_tts: 'Text-to-Speech',
    dys_read_aloud: '▶ Read Text Aloud',
    dys_speed: 'Speed',
    dys_difficulty: 'Reading Difficulty',
    dys_low_diff: 'Low Difficulty',
    dys_med_diff: 'Medium Difficulty',
    dys_high_diff: 'High Difficulty',
    dys_reading_text: 'Reading Text',
    dys_load_text: 'Load Text',
    dys_react: 'ReAct Analysis',
    dys_reading_display: 'Reading Display',
    dys_click_load: 'Click Load Text to begin.',
    dys_mind_map: 'Visual Mind Map',
    dys_auto_map: 'Auto Mind Map (Pattern-based)',
    dys_map_empty: 'Load a text and click Generate Mind Map',
    dys_view_plan: 'View Full Intervention Plan',
    dys_page_subtitle:   'Dyslexia-friendly fonts, colour overlays, reading ruler, mind map, and intervention support.',
    dys_overlay_help:    'Colour overlays reduce visual stress and improve reading comfort.',
    dys_ruler_help:      'The ruler highlights one line as your mouse moves over the text.',
    dys_size_lbl:        'Size',
    dys_spacing_lbl:     'Spacing',
    dys_skim_guide:      '⚡ Pre-Reading Skim Guide',
    dys_placeholder:     'Paste or type your reading text here…',
    dys_moderate_support:'Moderate Support:',
    dys_api_tip:         'Add your OpenRouter API key in Settings for personalised AI tips.',
    dys_page_title_full: 'Dyslexia Adaptive Reading Agent',
    dys_font_normal:     'Normal',
    dys_font_lexend:     'Lexend',
    dys_font_od:         'OpenDyslexic',
    dys_load_prompt:     'Click <strong>Load Text</strong> to begin.',
    dys_mindmap_prompt:  'Load a text and click Generate Mind Map',
    dys_font_desc:       'Lexend reduces visual stress. OpenDyslexic uses weighted bottoms to anchor letters and reduce reversals.',
    dys_skim_guide_btn:  '⚡ Skim Guide',
    dys_input_placeholder: 'Paste or type your reading text here…',
    dys_footer_name:     'Dyslexia Adaptive Reading Agent',
    dys_load_first:      'Load a text first.',
    dys_support_light:   ' <strong>Light Support:</strong> Standard font with yellow overlay for mild difficulty.',
    dys_support_intensive: ' <strong>Intensive Support:</strong> Full OpenDyslexic + blue overlay for high difficulty.',
    dys_strategy_moderate_desc: 'OpenDyslexic font. Green overlay. Reading ruler. TTS recommended. 10–15 min sessions.',
    dys_overlay_none:    'None (White) overlay',
    dys_overlay_yellow:  'Yellow overlay',
    dys_overlay_blue:    'Blue overlay',
    dys_overlay_green:   'Green overlay',
    dys_overlay_pink:    'Pink overlay',
    dys_overlay_grey:    'Grey overlay',
    dys_letter_spacing:  'Letter Spacing',
    dys_reading_speed:   'Reading Speed',
    btn_stop_audio:      '⏹ Stop Audio',
    btn_stop:            '⏹ Stop',
    btn_close:           'Close',
    ocr_cam_starting:    'Starting camera…',
    ocr_cam_switch:      'Switch Camera',
    ocr_cam_retake:      'Retake Photo',
    ocr_cam_tip:         'Tip: Hold the camera steady for a clear shot.',
    ocr_upload_title: 'Upload Book Image',
    ocr_take_photo: 'Take Photo',
    ocr_settings: '⚙ OCR Settings',
    ocr_lang_label: 'Language',
    ocr_en_only: 'English only',
    ocr_auto_lang: 'Auto (English + BM)',
    ocr_rec_mode: 'Recognition Mode',
    ocr_accurate: 'Accurate (recommended)',
    ocr_fast: 'Fast (less accurate)',
    ocr_single_word: 'Single word',
    ocr_confidence: 'Confidence Threshold',
    ocr_highlight_uncertain: 'Highlight uncertain words below:',
    ocr_extract_btn: 'Extract Text',
    ocr_a11y: '♿ Accessibility',
    ocr_text_size: 'Text Size',
    ocr_colour_overlay: 'Colour Overlay',
    ocr_line_spacing: 'Line Spacing',
    ocr_extracted_text: 'Extracted Text',
    ocr_empty_msg: 'Upload an image and click Extract Text to begin',
    ocr_tts: 'Text-to-Speech',
    ocr_status_ready: 'Ready — upload an image to begin',
    ocr_page_title:   'OCR Reading Agent',
    ocr_page_subtitle:'Upload a book image or photo of printed text — the agent extracts it, reads it aloud, and makes it fully accessible.',
    ocr_words:        'Words',
    ocr_chars:        'Characters',
    ocr_lines:        'Lines',
    ocr_read_time:    'Read Time',
    ocr_copy_btn:     'Copy',
    ocr_download_btn: 'Download .txt',
    ocr_edit_btn:     'Edit text',
    ocr_clear_btn:    'Clear',
    ocr_confidence_lbl: 'Confidence:',
    ocr_conf_high:    'High (>70%)',
    ocr_conf_med:     'Medium (50–70%)',
    ocr_conf_low:     'Low (<50%)',
    ocr_blind_tip:    'Blind & Low-Vision tip:',
    ocr_page_counter: 'Page 1 of 1',
    ocr_append_btn:   'Append next page to existing text',
    ocr_append_mode:  'Append mode — next extraction will be added to existing text',
    ocr_hide_highlights: 'Hide Highlights',
    ocr_show_highlights: 'Show Highlights',
    ocr_img_preview:  'Image Preview',
    ocr_kbd_shortcuts:'⌨ Keyboard Shortcuts',
    ocr_camera_title: 'Camera Capture',
    ocr_camera_capture_btn: 'Capture Image',
    ocr_camera_use_btn: 'Use This Image',
    rc_a11y_header:     'Accessibility',
    rc_text_size:       'Text Size',
    rc_colour_overlay:  'Colour Overlay',
    rc_status_ready:    'Ready. Load a text to begin.',
    rc_stats_empty:     'Load a text to see stats.',
    rc_click_load:      'Click Load Text to begin reading.',
    rc_status_panel:    'Status',
    rc_footer_name:     ' Reading Companion Agent',
    rc_level_label:     'Level',
    rc_vocab_prompt:    'Click a word to see its definition:',
    rc_status_enter_text: 'Please enter some text first.',
    rc_status_loaded:   'Text loaded. Ready to read.',
    rc_status_cleared:  'Cleared.',
    rc_status_reading_aloud: 'Reading text aloud…',
    rc_status_load_first: 'Load a text first.',
    rc_status_reading:  'Reading aloud…',
    rc_status_audio_guide: 'Audio guide started.',
    rc_status_highlighted: 'Key words highlighted.',
    rc_status_generating: 'Generating questions…',
    rc_status_questions_ready: 'Questions generated. Choose your answers and press Submit.',
    rc_auto_quiz_prompt: ' You\'ve read most of the text! Test Understanding',
    color_yellow:       'Yellow',
    color_green:        'Green',
    color_purple:       'Purple',
    color_red:          'Red',
    color_clear:        'Clear',
    adhd_focus_window_btn: 'Focus Window',
    adhd_no_notes:      'No notes yet.',
    lib_book_search_title: 'Book Search & Discovery',
    ar_font:            'Font',
    ar_size:            'Size',
    ar_line:            'Line',
    ar_para:            'Para',
    ar_mode:            'Mode',
    ar_session:         'Session',
    ar_focus:           'Focus',
    ar_read:            'Read',
    ar_visual_ai:       'Visual AI',
    ar_paste_title:     'Paste Book Text',
    ar_start_reading:   '▶ Start Reading',
    ar_paste_ph:        'Or paste the book text here…',
    ar_cors_msg:        "We couldn't auto-fetch the text (CORS restriction). Paste your text below.",
    ar_visual_ai_title: 'VISUAL AI',
    ar_mind_map:        'Mind Map',
    ar_timeline:        'Timeline',
    ar_key_chars:       'Key Characters',
    ar_key_places:      'Key Places',
    ar_concept_diag:    'Concept Diagram',
    ar_focus_mode:      'FOCUS MODE',
    ar_exit_focus:      'Exit focus mode',
    ar_prev_para:       'Previous paragraph',
    ar_next_para:       'Next paragraph',
    ar_read_this:       'Read This',
    ar_break_title:     'Time for a Short Break',
    ar_break_msg:       "You've been reading for a while — rest your eyes and breathe.",
    ar_skip_break:      'Skip Break →',
    ar_checkpoint_title:'AI Checkpoint — Quick Check!',
    ar_loading_q:       'Loading question…',
    ar_answer_placeholder: 'Type your answer here…',
    ar_submit:          'Submit',
    ar_explain_again:   'Explain Again',
    ar_continue:        'Continue →',
    agent_new:          'New',
    agent_open:         'Open',
    teacher_title:          'AI Teacher Agent',
    teacher_subtitle:       'Your virtual teacher — explains, quizzes, answers questions, creates diagrams and mind maps, and motivates you.',
    teacher_badge1:         '🤖 OpenRouter AI',
    teacher_badge2:         '📚 Quiz Generator',
    teacher_badge3:         '🗺️ Mind Map',
    teacher_badge4:         '💪 Motivation',
    teacher_api_notice:     'OpenRouter API key required for AI features. Set key in Settings → Prototype mode is active if no key is set.',
    teacher_input_title:    '📄 Reading Text Input',
    teacher_input_placeholder: 'Paste or type reading text here for the AI teacher to work with…',
    teacher_btn_explain:    '💡 Explain This',
    teacher_btn_simple:     '🔤 Simple Words',
    teacher_btn_bm:         '🇲🇾 Explain in BM',
    teacher_btn_en:         '🇬🇧 Explain in EN',
    teacher_thinking:       'Thinking...',
    teacher_ask_title:      '💬 Ask the Teacher',
    teacher_ask_placeholder:'Type your question here…',
    teacher_btn_ask:        '🙋 Ask',
    teacher_motivation_title:'💪 Motivation Corner',
    teacher_btn_new_msg:    '✨ New Message',
    teacher_btn_read_aloud: '🔊 Read Aloud',
    teacher_explain_title:  '📖 Explanation',
    teacher_output_placeholder:'Explanation will appear here…',
    teacher_btn_speak:      '🔊 Read Aloud',
    teacher_btn_copy:       '📋 Copy',
    teacher_btn_save:       '💾 Save',
    teacher_quiz_title:     '📝 Quiz Generator',
    teacher_quiz_mcq:       '🎯 Multiple Choice',
    teacher_quiz_tf:        '✅ True / False',
    teacher_quiz_short:     '✍️ Short Answer',
    teacher_quiz_reflect:   '🤔 Reflection',
    teacher_diagram_title:  '🗺️ Diagram & Mind Map',
    teacher_diag_flow:      '📊 Flow Chart',
    teacher_diag_cause:     '🔍 Cause & Effect',
    teacher_diag_mindmap:   '🗺️ Mind Map',
    teacher_diag_steps:     '📋 Step-by-Step',
    teacher_inclusive_title:'♿ Inclusive Support',
    teacher_blind_mode:     'Enable Blind Learner Mode',
    teacher_deaf_mode:      'Enable Deaf Learner Mode',
    teacher_adhd_mode:      'Enable ADHD Mode',
    teacher_dyslexia_mode:  'Enable Dyslexia Mode',
    teacher_tts:            'Toggle Text to Speech',
    ait_enable_blind:       'Enable Blind Learner Mode',
    ait_enable_deaf:        'Enable Deaf Learner Mode',
    ait_enable_adhd:        'Enable ADHD Mode',
    ait_enable_dyslexia:    'Enable Dyslexia Mode',
    ait_toggle_tts:         'Toggle Text to Speech',
    teacher_footer_note:    'AI Teacher Agent · Prototype',
    footer_tagline1:        'Agentic Multi-Sensory Learning Ecosystem for inclusive education in Malaysia and beyond.',
    nav_teacher:            'Teacher Dashboard',
    nav_signup:             'Sign Up',

    /* Avatar Engine settings */
    ae_title:              'Avatar Engine',
    ae_desc:               'Configure the professional AI avatar system for BIM Sign Language presentation. The engine automatically switches to a backup provider if one fails.',
    ae_active_provider:    'Active Provider',
    ae_no_api_key:         'No API Key',
    ae_not_configured:     'Not Configured',
    ae_available:          'Available',
    ae_always_available:   'Always Available',
    ae_heygen_desc:        'HeyGen provides WebRTC streaming for near-real-time talking avatars. Get your API key from app.heygen.com → API.',
    ae_did_desc:           'D-ID generates talking-head videos from a photo and text. Get your API key from studio.d-id.com → API.',
    ae_nvidia_desc:        'NVIDIA ACE requires an enterprise deployment (cloud or on-premise). Contact NVIDIA or your IT department for endpoint and token.',
    ae_rpm_desc:           'No API key needed. Uses your RPM subdomain to embed a 3D avatar creator.',
    ae_test:               'Test',
    ae_avatar_id:          'Avatar ID',
    ae_voice_id:           'Voice ID',
    ae_presenter_url:      'Presenter Image URL',
    ae_endpoint_url:       'Endpoint URL',
    ae_subdomain:          'Subdomain',
    ae_saved_avatar_url:   'Saved Avatar URL:',
    ae_presentation:       'Presentation Settings',
    ae_anim_quality:       'Animation Quality',
    ae_quality_high:       'High',
    ae_quality_medium:     'Medium',
    ae_quality_low:        'Low (faster)',
    ae_language:           'Language',
    ae_configured:         'Configured',
    ae_testing:            'Testing…',
    skip_link:              'Skip to main content',
    skip_to_main:           'Skip to main content',
    /* Personalisation Agent */
    pa_title:               'Personalisation Agent',
    pa_subtitle:            'Your learning profile, insights, and personalised recommendations — all in one place.',
    pa_privacy_title:       '🔒 Your Data Stays on Your Device',
    pa_privacy_desc:        'All personalisation data is stored locally in your browser. Nothing is sent to any server.',
    pa_profile_title:       '👤 Your Learning Profile',
    pa_stat_sessions:       'Sessions',
    pa_stat_mins:           'Minutes',
    pa_stat_streak:         'Day Streak',
    pa_stat_completion:     'Completion',
    pa_stat_mode:           'Preferred Mode',
    pa_stat_time:           'Best Time',
    pa_today_default:       'Keep going — every session counts! 🌟',
    pa_insights_title:      '📊 AI Insights',
    pa_insights_loading:    'Generating insights…',
    pa_recs_title:          '💡 Personalised Recommendations',
    pa_recs_loading:        'Loading recommendations…',
    pa_behaviour_title:     '🧠 Learning Behaviour',
    pa_behaviour_desc:      'How you interact with CelikSense agents.',
    pa_mode_audio:          'Audio / TTS',
    pa_mode_ocr:            'OCR Scanning',
    pa_mode_typed:          'Typed Input',
    pa_mode_sign:           'Sign Language',
    pa_mode_braille:        'Braille Mode',
    pa_teacher_title:       '👩‍🏫 AI Teacher Feedback',
    pa_teacher_desc:        'Personalised feedback from the AI Teacher Agent based on your recent activity.',
    pa_teacher_loading:     'Loading teacher feedback…',
    pa_a11y_title:          '♿ Accessibility Settings',
    pa_a11y_current:        'Current settings:',
    pa_a11y_change:         'Change in Settings →',
    pa_reset_title:         '🔄 Reset Profile',
    pa_reset_desc:          'Clear all personalisation data and start fresh.',
    pa_reset_btn:           'Reset My Profile',
    pa_reset_confirm_msg:   'Are you sure? This will clear all your learning data.',
    pa_reset_confirm_yes:   'Yes, Reset',
    pa_reset_cancel:        'Cancel',
    /* Teacher Dashboard */
    td_hero_title:          'Teacher Dashboard',
    td_hero_sub:            'Monitor learner progress, track engagement, and trigger interventions.',
    td_last_sync:           'Last sync:',
    td_refresh:             '↺ Refresh',
    td_summary_heading:     '📊 Class Summary',
    td_total_students:      'Total Learners',
    td_total_students_sub:  'registered in CelikSense',
    td_active_week:         'Active This Week',
    td_active_week_sub:     'completed at least one session',
    td_avg_streak:          'Avg Streak',
    td_avg_streak_sub:      'consecutive active days',
    td_top_agent:           'Top Agent',
    td_top_agent_sub:       'most used this week',
    td_roster_heading:      '📋 Learner Roster',
    td_add_student:         '+ Add Learner',
    td_col_name:            'Name',
    td_col_disability:      'Learning Need',
    td_col_agent:           'Top Agent',
    td_col_sessions:        'Sessions',
    td_col_streak:          'Streak',
    td_col_last:            'Last Active',
    td_col_status:          'Status',
    profile_dyslexia:       'Dyslexia',
    profile_adhd:           'ADHD',
    profile_blind:          'Blind / Low Vision',
    profile_deaf:           'Deaf / Hard of Hearing',
    td_days:                'days',
    td_today:               'Today',
    td_yesterday:           'Yesterday',
    td_2days:               '2 days ago',
    td_3days:               '3 days ago',
    status_on_track:        '✅ On Track',
    status_at_risk:         '⚠️ At Risk',
    status_needs_attention:  '🚨 Needs Attention',
    td_chart_heading:       '📈 Weekly Engagement',
    td_alerts_heading:      '🔔 Active Alerts',
    td_alert_haziq:         'Haziq has not logged in for 4 days',
    td_alert_danial:        'Danial\'s reading score dropped below 60',
    td_view_student:        'View Learner',
    td_send_rec:            'Send Recommendation',
    td_alert_type_inactive: 'Inactive',
    td_alert_type_score:    'Score Drop',
    td_actions_heading:     '⚡ Quick Actions',
    td_export:              '📄 Export Report',
    td_announce:            '📢 Send Announcement',
    td_schedule_meeting:    '📅 Schedule Meeting',
    td_footer_note:         'Teacher Dashboard · CelikSense AI',
    /* Profile page */
    ps_profile_summary:     'Learning Profile Summary',
    ps_preferred_mode_label:'Preferred Mode:',
    ps_view_full:           'View Full Personalisation →',
    avatar_profile_section: '🤟 My Sign Language Avatar',
    avatar_profile_ready:   'Avatar ready',
    avatar_go_sign:         'Go to Sign Language Agent →',
    avatar_update:          'Update Avatar',
    avatar_delete:          'Delete Avatar',
    avatar_no_avatar:       'No avatar set yet.',
    avatar_create_now:      'Create one now →',
    avatar_sign_ocr:        'Sign OCR text with My Avatar',
    agent_lib:          'AI Librarian',
    agent_lib_desc:     'Find and recommend books tailored to your learning profile and accessibility needs.',
    agent_read:         'Reading Companion',
    agent_read_desc:    'Read with AI assistance – comprehension questions, vocabulary, and audio support.',
    agent_adhd:         'ADHD Agent',
    agent_adhd_desc:    'Micro-reading sessions with focus timers, reading window, and note builder.',
    agent_dys:          'Dyslexia / Down Syndrome',
    agent_dys_desc:     'Colour overlays, dyslexia-friendly fonts, reading ruler, and mind map — or simplified language &amp; story board for Down Syndrome.',
    ds_title:           'Down Syndrome Adaptive Agent',
    ds_subtitle:        'Simplified language, visual story boards, vocabulary drills, and positive feedback — built for every learner.',
    ds_tool1:           'Simplified Language',
    ds_tool1_desc:      'Paste any text. AI will rewrite it in short, simple sentences.',
    ds_simplify:        '✨ Simplify Text',
    ds_tool2:           'Visual Story Board',
    ds_tool2_desc:      'Turn text into numbered picture cards — one idea per card.',
    ds_makestory:       '🎴 Make Story Board',
    ds_tool3:           'Vocabulary Drill',
    ds_tool3_desc:      'Key words from the text turned into flashcards. Tap to reveal meaning.',
    ds_makedrill:       '🃏 Start Drill',
    ds_settings:        'Display Settings',
    ds_fontsize:        'Text Size',
    ds_bgcolor:         'Background',
    ds_result:          '📝 Simplified Text',
    ds_placeholder:     'Paste text on the left and press Simplify Text to begin.',
    ds_storyboard:      '🖼️ Visual Story Board',
    ds_storyboard_sub:  'Each card = one idea. Read them in order.',
    ds_drill:           '🃏 Vocabulary Drill',
    ds_drill_ready:     'Ready!',
    ds_tap:             'Tap to reveal meaning',
    ds_again:           '🔁 Again',
    ds_got_it:          '✅ Got it!',
    ds_warm:            'Warm',
    ds_mint:            'Mint',
    ds_lavender:        'Lavender',
    ds_white:           'White',
    ds_copy_text:       'Copy text',
    ds_read_aloud:      'Read aloud',
    ds_story_board:     'Story Board',
    ds_color_lavender:  'Lavender',
    rsh_last_mode:      'Last mode:',
    rsh_mode_normal:    'NORMAL',
    rsh_mode_dyslexia:  'DYSLEXIA',
    rsh_mode_blind:     'BLIND',
    rsh_ai_summary:     'AI Summary',
    rsh_close_panel:    'Close Panel',
    rsh_close_modal:    'Close',
    ba_voice_control:   'Voice Control',
    ds_simplified_output: 'Simplified text output',
    ds_tap_reveal:      'Tap to reveal word meaning',
    ds_correct:         'correct',
    sl_visual_summary:  '📄 Visual Summary',
    sl_visual_keywords: '🔑 Visual Keywords',
    sl_mind_map:        '🗺 Mind Map',
    sl_comic_sequence:  '📖 Comic Sequence',
    sl_page_title:           'Visual Communication Agent',
    sl_page_subtitle:        'Deaf-Friendly Reading Support',
    sl_large_captions:       'Large Captions',
    sl_visual_keywords_badge:'Visual Keywords',
    sl_mind_map_badge:       'Mind Map',
    sl_comic_badge:          'Comic Sequence',
    sl_glossary_badge:       'Glossary',
    sl_prototype:            'Prototype Stage:',
    sl_import_ocr:           'Import from OCR Agent',
    sl_import_rc:            'Import from Reading Companion',
    sl_input_text:           'Input Text',
    sl_open_signsense:       'Open SignSense Dictionary',
    sl_prev_caption:         'Previous',
    sl_next_caption:         'Next',
    sl_text_input_aria:      'Text Input',
    sl_download:             'Download',
    sl_future_bim:           'Future BIM Integration',
    sl_bim_signbank_btn:     'Open BIM Sign Bank',
    sl_bim_signbank_desc:    'Official BIM Malaysia sign reference — bimsignbank.org',
    sl_bsl_btn:              'Open BSL Dictionary',
    sl_caption:              'CAPTION',
    sl_simplified:           'Simplified Sentences',
    sl_visual_kw:            'Visual Keywords',
    sl_mind_map_out:         'Mind Map',
    sl_story_seq:            'Visual Story Sequence',
    sl_glossary_out:         'Glossary of Key Words',
    agent_blind:             'Blind Audio Agent',
    agent_blind_desc:   'Full audio navigation with TTS, keyboard shortcuts, and voice instructions.',
    agent_sign:              'Visual Communication Agent',
    agent_sign_desc:         'Deaf-friendly reading support with large captions, visual keywords, mind map and comic sequence.',
    agent_sign_badge:        'Deaf Support',
    agent_celikverse:        'CelikVerse Library',
    agent_celikverse_desc:   'Search books, audiobooks, journals and educational resources from trusted sources worldwide — Open Library, Gutenberg, Google Books, IAB & more.',
    agent_celikverse_badge:  '🌍 NEW',
    agent_iab:               'IAB Library',
    agent_iab_desc:          'Browse IAB Pusat Sumber collections — new books 2024/2025, e-books PSP, and Buletin IAB with direct OPAC links.',
    agent_iab_badge:         'Library',
    agent_signsense:         'SignSense Dictionary',
    agent_signsense_desc:    'Search words and learn basic sign language guidance through visual cues, captions and fingerspelling support.',
    agent_signsense_badge:   'SignSense',
    agent_warn:         'Early Warning Agent',
    agent_warn_desc:    'Learner risk assessment, performance monitoring, and educator alerts.',
    agent_inter:        'Intervention Agent',
    agent_inter_desc:   'Personalised strategies, action plans, and curated resources for every need.',
    agent_ocr:          'OCR Reading Agent',
    agent_ocr_desc:     'Upload book images to extract text with Tesseract.js, then read aloud with full TTS support.',
    sign_start: '▶ Start Sign', sign_pause: '⏸ Pause', sign_stop: '⏹ Stop',
    sign_next: '⏭ Next', sign_prev: '⏮ Previous', sign_repeat: '🔁 Repeat',
    sign_slow: '🐢 Slow', sign_normal: '⚡ Normal Speed',
    sign_deaf_mode: 'Deaf Learner Mode', sign_bim_support: 'BIM Reading Support',
    sign_original: 'Original', sign_simplified: 'Simplified',
    sign_keywords: 'Keywords', sign_visual_meaning: 'Visual Meaning',
    sign_status_ready: 'Ready', sign_status_signing: 'Signing',
    sign_status_paused: 'Paused', sign_status_stopped: 'Stopped',
    sign_load_ocr: 'Load OCR Text', sign_clear: 'Clear Text',
    sign_prototype_note: 'Prototype mode: The avatar simulates sign language movement. Future versions will integrate real BIM avatar datasets.',
    rc_btn_sign: '🤟 Convert to Sign Language',
    ocr_btn_sign: '🤟 Open in Sign Language Agent',
    braille_toggle: '⠃ Braille Mode',
    braille_output: 'Braille Output',
    braille_copy: 'Copy Braille',
    braille_original: 'Original text',
    braille_preview: 'Braille preview',
    braille_device_title: 'Using with a Braille Display',
    braille_device_en: 'To read this content using a refreshable Braille display, connect your Braille device to your computer or mobile phone and enable your screen reader Braille output. CelikSense AI provides screen-reader-friendly text that can be sent to your device.',
    braille_prototype: 'Prototype mode: This converter uses basic Grade 1 Braille. Future versions will integrate full Malay Braille and contracted Braille support.',
    braille_agent_title: '⠃ Braille Output Agent',
    braille_agent_desc: 'Provides Braille-ready text for refreshable Braille display users.',
    braille_open: '⠃ Open Braille Mode',
    braille_reading: 'Reading Companion',
    braille_ocr: 'OCR to Braille',
    rc_btn_braille: '⠃ Convert to Braille',
    ocr_btn_braille: '⠃ Convert OCR Text to Braille',
    ocr_upload_hint:  'Drag & drop an image here, or click to browse. Supports JPG, PNG, WEBP, BMP, GIF, TIFF',
    ocr_initialising: 'Initialising…',
    ocr_ready:        'Ready',
    ocr_key_upload:   'Upload / open file browser',
    ocr_key_camera:   'Open camera to take photo',
    ocr_key_run:      'Run OCR on current image',
    ocr_key_read:     'Read extracted text aloud',
    ocr_key_stop:     'Stop speech',
    ocr_key_copy:     'Copy text to clipboard',
    ocr_key_clear:    'Clear all',
    ocr_footer_name:  ' OCR Reading Agent',
    lbl_size:         'Size',
    lbl_spacing:      'Spacing',
    ps_agent_title: 'AI Personalisation Agent',
    ps_agent_desc: 'Learns your reading style and recommends the best experience.',
    ps_badge: 'Adaptive AI',
    ps_today: 'Recommended for you today',
    ps_profile_summary: '📊 Learning Profile Summary',
    ps_preferred_mode_label: 'Preferred Mode: ',
    ps_view_full: '🧠 View Full Learning Profile',
    ps_adaptive_title: '🧠 Personalised Suggestions',
    ps_ocr_suggest_title: '🧠 Based on your usage pattern',
    ps_privacy: 'Your learning preferences are stored locally in this browser for prototype purposes.',
    ps_page_title: 'AI Learning Personalisation Agent',
    ps_page_subtitle: 'Adaptive AI that learns your reading style',
    ps_section_profile: 'Learning Profile',
    ps_section_insights: 'AI Insights',
    ps_section_recs: 'Personalised Recommendations',
    ps_section_behaviour: 'Reading Behaviour',
    ps_section_teacher: 'Teacher & Parent Insights',
    ps_section_accessibility: 'Accessibility Profile',
    ps_reset_btn: 'Reset Learning Data',
    ps_reset_confirm: 'Are you sure? This will clear all your learning data.',
    ps_sessions: 'Sessions',
    ps_reading_time: 'Reading Time',
    ps_streak: 'Streak',
    ps_completion: 'Completion',
    ps_best_time: 'Best Time to Read',
    ps_most_used: 'Most Used Agent',
    teacher_agent_title: 'AI Teacher Agent',
    teacher_agent_desc: 'Explains books, generates quizzes, answers questions, creates mind maps, and motivates learners.',
    teacher_agent_badge: 'Virtual Teacher',
    teacher_title: 'AI Teacher Agent',
    teacher_subtitle: 'Your virtual teacher — explains, quizzes, answers questions, creates diagrams and mind maps, and motivates you.',
    teacher_badge1: '🤖 OpenRouter AI',
    teacher_badge2: '📚 Quiz Generator',
    teacher_badge3: '🗺️ Mind Map',
    teacher_badge4: '💪 Motivation',
    teacher_api_notice: 'OpenRouter API key required for AI features. Set key in Settings → Prototype mode is active if no key is set.',
    teacher_input_title: '📄 Reading Text Input',
    teacher_ask_title: '💬 Ask the Teacher',
    teacher_motivation_title: '💪 Motivation Corner',
    teacher_explain_title: '📖 Explanation',
    teacher_quiz_title: '📝 Quiz Generator',
    teacher_diagram_title: '🗺️ Diagram & Mind Map',
    teacher_inclusive_title: '♿ Inclusive Support',
    teacher_blind_mode: '🎙️ Blind Mode',
    teacher_deaf_mode: '🖐️ Deaf Mode',
    teacher_adhd_mode: '⚡ ADHD Mode',
    teacher_dyslexia_mode: '📖 Dyslexia Mode',
    teacher_tts: '🔊 Auto TTS',
    teacher_open_btn: '👩‍🏫 Ask AI Teacher',
    teacher_footer_note: 'AI Teacher Agent · Prototype',
    avatar_agent_title: 'AI Personal Sign Language Avatar',
    avatar_agent_desc: 'Your own AI avatar translates books and learning materials into Malaysian Sign Language (BIM).',
    avatar_badge: 'My Avatar',
    avatar_profile_section: '👤 My Sign Language Avatar',
    avatar_profile_ready: 'Avatar ready for signing',
    avatar_go_sign: '🤟 Start Signing',
    avatar_update: '📷 Update Avatar',
    avatar_delete: '🗑️ Delete',
    avatar_no_avatar: 'No avatar created yet.',
    avatar_create_now: '📷 Create My Avatar',
    avatar_create_title: '📷 Create My Avatar',
    avatar_step1: 'Step 1: Take Photo',
    avatar_step2: 'Step 2: Customise',
    avatar_step3: 'Step 3: Done!',
    avatar_use_webcam: '📷 Use Webcam',
    avatar_upload: '📁 Upload Photo',
    avatar_capture: '✅ Capture Photo',
    avatar_hairstyle: 'Choose Hairstyle',
    avatar_name_label: 'What should I call you?',
    avatar_speed_label: 'Signing Speed',
    avatar_start_signing: '🤟 Start Signing',
    avatar_ready: '🎉 Your avatar is ready!',
    avatar_prototype_note: 'Prototype: SVG avatar based on your photo colours. Future versions will use 3D avatar technology.',

    /* Book Discovery Agent */
    bd_title:           'AI Book Discovery Agent',
    bd_subtitle:        'Find legal reading materials and send them to any CelikSense accessibility tool.',
    bd_search_hint:     'Search by title, subject, level, author or interest…',
    bd_search_btn:      'Search',
    bd_sources_title:   'Choose a Book Source',
    bd_results_title:   'Search Results',
    bd_my_library:      'My Library',
    bd_send_to:         'Send to Tools',
    bd_send_teacher:    'Read with AI Teacher',
    bd_send_companion:  'Open in Reading Companion',
    bd_send_audio:      'Convert to Audio',
    bd_send_braille:    'Convert to Braille',
    bd_send_bim:        'Translate to BIM Sign Language',
    bd_send_adhd:       'Apply ADHD Mode',
    bd_send_dyslexia:   'Apply Dyslexia Mode',
    bd_save_lib:        'Save to My Library',
    bd_badge_owned:     'User Owned',
    bd_badge_public:    'Public Domain',
    bd_badge_preview:   'Preview Only',
    bd_badge_library:   'Library Access',
    bd_badge_ocr:       'OCR Required',
    bd_badge_learning:  'Learning Material',
    bd_src_upload_pdf:  'Upload PDF',
    bd_src_scan:        'Scan Physical Book',
    bd_src_gutenberg:   'Project Gutenberg',
    bd_src_openlibrary: 'Open Library',
    bd_src_gbooks:      'Google Books Preview',
    bd_src_school:      'School Library',
    bd_src_uni:         'University Library',
    bd_src_gdrive:      'Google Drive',
    bd_src_onedrive:    'OneDrive',
    bd_src_community:   'Community Materials',
    bd_opac_title:      'Library OPAC Connector',
    bd_opac_note:       'OPAC integration requires permission from the school or university library.',
    bd_opac_name:       'Library Name',
    bd_opac_url:        'OPAC URL',
    bd_opac_keyword:    'Search Keyword',
    bd_opac_id:         'Library User ID (optional)',
    bd_opac_search:     'Search Library',
    bd_community_title: 'Community Learning Materials',
    bd_community_note:  'Share summaries, notes, mind maps, and quizzes — not full copyrighted books.',
    bd_community_share: 'Share a Learning Material',
    bd_copyright_notice:'CelikSense AI helps users access and transform legally available reading materials into accessible formats. It does not host or redistribute copyrighted books without permission.',
    bd_read_btn:        'Open with CelikSense',
    bd_no_results:      'No results found. Try a different search term.',
    bd_loading:         'Searching…',
    bd_agent_desc:      'Find legal reading materials from public domain books, personal files, library systems and approved previews.',
    bd_agent_badge:     'Book Discovery',
    iab_nav_bd:         '← Book Discovery',
    iab_nav_lib:        ' AI Librarian',
    bd_avail_gutenberg: 'Available from Project Gutenberg',
    bd_avail_preview:   'Available as preview',
    bd_avail_upload:    'Upload your own copy',
    bd_avail_library:   'Ask your library for access',
    bd_saved_ok:        'Saved to My Library.',
    bd_sent_ok:         'Content sent. Opening agent…',
    bd_library_empty:   'Your library is empty. Save books from the search results above.',
    bd_upload_heading:  ' Upload Your Book or Document',
    bd_upload_text:     'Click or drag to upload a PDF or document',
    bd_upload_sub:      'Supports PDF, DOC, DOCX, TXT — your files stay in your browser only',
    bd_scan_desc:       'Use the OCR Agent to photograph a page and extract text automatically.',
    bd_scan_open:       ' Open OCR Scanner',
    bd_scan_notice:     'Important: Only scan books you own or that are in the public domain.',
    bd_drive_heading:   '☁ Import from Google Drive',
    bd_drive_desc:      'Import a document from your Google Drive.',
    bd_drive_btn:       '☁ Connect Google Drive (Coming Soon)',
    bd_upload_instead:  ' Upload File Instead',
    bd_onedrive_heading:'☁ Import from OneDrive',
    bd_onedrive_btn:    '☁ Connect OneDrive (Coming Soon)',
    bd_src_university:  'University Library',
    bd_scan_heading:    ' Scan a Physical Book',
    bd_proto_gdrive:    'Prototype mode: Google Drive OAuth integration is planned for Phase 2. For now, upload your file directly using the Upload PDF option.',
    bd_proto_onedrive:  'Prototype mode: OneDrive integration is planned for Phase 2. Upload your file directly for now.',
    bd_copyright_label: 'Copyright Policy:',
    bd_send_iab:        'IAB Library',
    bd_send_signsense:  'SignSense Dictionary',
    bd_send_shelf:      'Rak Buku Maya',
    bd_send_ocr:        'OCR Agent',
    bd_download_aria:   'Download this book for offline reading',
    bd_search_placeholder: 'Search books…',
    bd_ai_companion:       'AI Companion',
    bd_saved_subtitle:     'Saved books and materials',
    bd_gov_portal:         'GOV PORTAL',
    bd_opac_library_name:  'e.g. SMK Taman Melati Library',
    bd_opac_student_id:    'Student or staff ID',
    bd_opac_search_term:   'Science Form 2',
    bd_uni_library_name:   'e.g. UKM Main Library',
    bd_uni_subject:        'Educational Psychology',
    bd_uni_matric:         'Student matric number',
    bd_future_opac:        'Future integration: Koha, SLiMS, and standard OPAC APIs.',
    bd_community_placeholder: 'Paste your notes, summary, or quiz here…',
    bd_onedrive_desc:      'Import a document from your Microsoft OneDrive. Requires Microsoft account authentication.',
    bd_community_label:    'Community Learning Materials',
    hub_mode_braille_reader: 'Braille Reader',
    hub_ai_teacher:     'AI Teacher',
    hub_ai_reading:     'Reading Companion',
    hub_section_a11y_full: 'Mod Aksesibiliti (Accessibility Modes)',
    hub_section_ai_full: 'Pengalaman AI (AI Experiences)',
    lib_footer_name:    ' AI Librarian Agent',
    lib_search_placeholder: 'Search books by title, author, or topic…',
    bd_open_celiksense: 'Open with CelikSense',
    bd_type_note:       'Note',
    bd_type_summary:    'Summary',
    bd_type_mindmap:    'Mind Map',
    bd_type_quiz:       'Quiz',
    bd_type_vocab:      'Vocabulary',
    lbl_title:          'Title',
    lbl_type:           'Type',
    lbl_content:        'Content',
    lbl_by:             'by',
    lbl_loading:        '⏳ Loading…',
    btn_save:           'Save',
    btn_share:          'Share',

    /* CelikVerse Library */
    cv_subtitle:    'One Search. Many Collections. Unlimited Accessibility.',
    cv_iab_title:   'IAB Virtual Bookshelf',
    cv_demo_badge:  'Demo',
    cv_mode_blind:  'Blind Reader',
    cv_mode_dyslexia: 'Dyslexia Reader',
    cv_mode_adhd:   'ADHD Reader',
    cv_mode_deaf:   'Deaf Reader',
    cv_mode_reading: 'Reading Companion',
    cv_mode_teacher: 'AI Teacher',
    cv_cat_default:  'Default',

    /* My Knowledge Hub */
    hub_title:      'My Knowledge Hub',
    hub_open_access: 'Open Access',
    hub_ai_panel:   'AI Panel',
    hub_mode_blind: 'Blind',
    hub_mode_low_vision: 'Low Vision',
    hub_mode_dyslexia: 'Dyslexia',
    hub_mode_adhd:  'ADHD',
    hub_mode_deaf:  'Deaf',
    hub_mode_standard: 'Standard',
    hub_mode_audio: 'Audio',
    hub_mode_blind_reader:    'Blind Reader',
    hub_mode_low_vision_reader: 'Low Vision',
    hub_mode_dyslexia_reader: 'Dyslexia Reader',
    hub_mode_adhd_reader:     'ADHD Reader',
    hub_mode_deaf_reader:     'Deaf Reader',
    hub_mode_audio_reader:    'Audio Reader',
    hub_mode_standard_reader: 'Standard Reader',

    /* Common breadcrumb / footer */
    nav_back_dashboard: '← Dashboard',
    footer_copy:        '© 2026 CelikSense AI · ',

    /* Profile tabs */
    prof_tab_overview:      'Overview',
    prof_tab_settings:      'Profile Settings',
    prof_tab_a11y:          'Accessibility',
    prof_tab_activity:      'Activity',
    prof_tab_achievements:  'Achievements',

    /* Profile — learning progress section */
    prof_learning_progress: ' Learning Progress',
    prof_reading_progress:  'Reading Progress',
    prof_comprehension_lbl: 'Comprehension',
    prof_chapters_label:    '3 of 5 chapters',
    prof_above_average:     'Above average',
    prof_improving:         'Improving ←',
    prof_currently_reading: ' Currently Reading',
    prof_find_more_books:   'Find More Books',
    prof_ai_recommendation: ' AI Recommendation',
    prof_based_on_sessions: 'Based on your last 7 sessions',
    prof_continue:          'Continue',
    prof_read_btn:          'Read',
    prof_open_adhd:         'Open ADHD Agent',
    prof_full_plan:         'Full Plan',
    prof_done_badge:        'Done',
    prof_badge_active:      'ACTIVE',
    prof_badge_bilingual:   'BILINGUAL',
    prof_personal_info:     ' Personal Information',
    prof_full_name:         'Full Name',
    prof_display_id:        'Display ID / Username',
    prof_email:             'Email Address',
    prof_role:              'Role',
    prof_role_student:      'Student / Learner',
    prof_role_teacher:      'Teacher / Educator',
    prof_role_parent:       'Parent / Guardian',
    prof_role_admin:        'School Administrator',
    prof_learning_need_lbl: 'Primary Learning Need',
    prof_need_blind:        'Blind / Low Vision',
    prof_need_deaf:         'Deaf / Hard of Hearing',
    prof_need_general:      'General Learner',
    prof_grade_lbl:         'Grade Level',
    prof_lang_pref_lbl:     'Language Preference',
    prof_lang_en:           'English',
    prof_lang_bilingual:    'Bilingual (EN + BM)',
    prof_interests_lbl:     'Interests (for book matching)',
    prof_session_len_lbl:   'Default Session Length',
    prof_break_len_lbl:     'Break Length',
    prof_save_btn:          '✓ Save Profile',
    prof_reset_btn:         'Reset',
    prof_visual_a11y:       'Visual Accessibility',
    prof_audio_a11y:        'Audio Accessibility',
    prof_nav_prefs:         'Navigation Preferences',
    prof_dyslexia_font:     'OpenDyslexic Font',
    prof_dyslexia_font_desc:'Use dyslexia-friendly font across all reading areas',
    prof_colour_overlay_lbl:'Colour Overlay',
    prof_colour_desc:       'Default reading overlay colour',
    prof_large_text:        'Large Text Mode',
    prof_large_text_desc:   'Increase default font size across all pages',
    prof_high_contrast:     'High Contrast Mode',
    prof_high_contrast_desc:'Increase contrast for low-vision learners',
    prof_ruler_lbl:         'Reading Ruler',
    prof_ruler_desc:        'Show reading ruler by default on all pages',
    prof_auto_read:         'Auto-Read on Page Load',
    prof_auto_read_desc:    'Automatically start audio guide when any agent opens',
    prof_tts_speed:         'TTS Speed',
    prof_tts_speed_desc:    'Default speech rate for all Text-to-Speech',
    prof_tts_lang:          'TTS Language',
    prof_tts_lang_desc:     'Language for voice output (matches UI language by default)',
    prof_kbd_hints:         'Keyboard Navigation Hints',
    prof_kbd_hints_desc:    'Show keyboard shortcut hints on agent pages',
    prof_reduced_motion:    'Reduced Motion',
    prof_reduced_motion_desc:'Minimise animations across all pages',
    prof_save_a11y_btn:     '✓ Save Accessibility Settings',
    prof_recent_activity:   'Recent Activity',
    prof_clear_all:         'Clear All',
    prof_achievements_title:'Achievements',
    prof_col_none:          'None',
    prof_col_yellow:        'Yellow',
    prof_col_blue:          'Blue',
    prof_col_green:         'Green',
    prof_col_pink:          'Pink',
    prof_col_grey:          'Grey',
    prof_tts_slow:          'Slow (0.6×)',
    prof_tts_normal:        'Normal (0.9×)',
    prof_tts_fast:          'Fast (1.2×)',
    prof_tts_vfast:         'Very Fast (1.5×)',
    prof_tts_auto:          'Auto (matches UI)',
    prof_primary1:          'Primary 1',
    prof_primary2:          'Primary 2',
    prof_primary3:          'Primary 3',
    prof_primary4:          'Primary 4',
    prof_primary5:          'Primary 5',
    prof_primary6:          'Primary 6',
    prof_secondary1:        'Secondary 1',
    prof_secondary2:        'Secondary 2',
    prof_secondary3:        'Secondary 3',
    prof_secondary4:        'Secondary 4',
    prof_secondary5:        'Secondary 5',
    prof_need_adhd:         'ADHD',
    prof_need_dyslexia:     'Dyslexia',
    prof_grade_none:        'Not specified',
    prof_grade_uni:         'University',
    prof_stat_sessions:     'Sessions',
    prof_stat_reading_time: 'Reading Time',
    prof_stat_streak:       'Streak',
    prof_stat_completion:   'Completion',
    prof_badges_desc:       'Earn badges by completing reading sessions and reaching milestones.',
    prof_saved_msg:         'Saved!',
    prof_save_success:      'Profile saved successfully!',
    prof_clear_confirm:     'Clear all activity? This cannot be undone.',
    prof_no_activity:       'No activity recorded yet.',
    prof_delete_avatar:     'Delete your avatar?',
    badge_first_session:    'First Session',
    badge_book_worm:        'Book Worm',
    badge_time_keeper:      'Time Keeper',
    badge_sharp_focus:      'Sharp Focus',
    badge_colour_explorer:  'Colour Explorer',
    badge_sign_learner:     'Sign Learner',
    badge_audio_nav:        'Audio Navigator',
    badge_intervention_pro: 'Intervention Pro',
    badge_week_streak:      'Week Streak',
    badge_all_rounder:      'All-Rounder',
    badge_chapter_done:     'Chapter Done',
    badge_adhd_champ:       'ADHD Champion',
    badge_first_session_desc:   'Completed your first reading session',
    badge_book_worm_desc:       'Added 3 books to your reading list',
    badge_time_keeper_desc:     'Completed 5 timed ADHD sessions',
    badge_sharp_focus_desc:     'Achieved 80+ focus score',
    badge_colour_explorer_desc: 'Tried all 5 colour overlays',
    badge_sign_learner_desc:    'Learned 10 BIM signs',
    badge_audio_nav_desc:       'Used blind audio agent 3 times',
    badge_intervention_pro_desc:'Generated a full intervention plan',
    badge_week_streak_desc:     'Logged 7 days in a row',
    badge_all_rounder_desc:     'Used all 8 AI agents',
    badge_chapter_done_desc:    'Finished a full book chapter',
    badge_adhd_champ_desc:      'ADHD sessions completed',
    act_tag_focus:          'Focus',
    act_tag_reading:        'Reading',
    act_tag_library:        'Library',
    act_tag_a11y:           'Accessibility',
    act_tag_low_risk:       'Low Risk',
    act_tag_plan:           'Plan',
    act_tag_sign:           'Sign',
    act_tag_complete:       'Complete',

    /* Activity log — translatable titles */
    act_title_adhd_focus:         'ADHD Agent – 10 min Focus Session',
    act_title_reading_ch3:        'Reading Companion – The Magic of Reading Ch. 3',
    act_title_library_added:      'AI Librarian – Added "Dunia Sains Kita"',
    act_title_dyslexia_overlay:   'Dyslexia Agent – Green overlay enabled',
    act_title_early_warning:      'Early Warning – Risk assessment completed',
    act_title_intervention:       'Intervention Plan – ADHD strategy generated',
    act_title_sign_lang:          'Sign Language – Practised BIM alphabet A–M',
    act_title_reading_done:       'Reading Companion – My First Science Book completed',

    /* Profile — new i18n keys */
    prof_status_online:           'Online',
    prof_my_avatar:               'My Avatar',
    prof_open_ai_teacher:         'Open AI Teacher Agent',
    prof_chapter_of:              'Chapter {n} of {total}',
    prof_chapter:                 'Chapter',
    prof_of:                      'of',
    prof_complete:                'Complete ✓',
    prof_email_placeholder:       'Your email address',
    prof_interests_placeholder:   'e.g. science, football, music…',
    prof_display_name_placeholder:'Your name',
    prof_grade_year1:             'Year 1',
    prof_grade_year2:             'Year 2',
    prof_grade_year3:             'Year 3',
    prof_grade_year4:             'Year 4',
    prof_grade_year5:             'Year 5',
    prof_grade_year6:             'Year 6',
    prof_grade_form1:             'Form 1',
    prof_grade_form2:             'Form 2',
    prof_grade_form3:             'Form 3',
    prof_grade_form4:             'Form 4',
    prof_grade_form5:             'Form 5',

    /* Settings — overlay buttons and profile dropdowns */
    set_overlay_none:             'No overlay',
    set_overlay_yellow:           'Yellow overlay',
    set_overlay_blue:             'Blue overlay',
    set_overlay_green:            'Green overlay',
    set_overlay_grey:             'Grey overlay',
    set_overlay_pink:             'Pink overlay',
    set_need_general:             'General',
    set_need_adhd:                'ADHD',
    set_need_dyslexia:            'Dyslexia',
    set_need_blind:               'Blind / Low Vision',
    set_need_deaf:                'Deaf / Hard of Hearing',

    /* AI Librarian */
    lib_book_search:        'BOOK SEARCH & DISCOVERY',
    lib_learner_profile:    'LEARNER PROFILE',
    lib_learning_need:      'LEARNING NEED',
    lib_grade_level:        'GRADE LEVEL',
    lib_language_filter:    'LANGUAGE',
    lib_all_learners:       'All Learners',
    lib_blind_low:          'Blind / Low Vision',
    lib_deaf_hard:          'Deaf / Hard of Hearing',
    lib_primary_13:         'Primary 1–3',
    lib_primary_46:         'Primary 4–6',
    lib_secondary_13:       'Secondary 1–3',
    lib_secondary_45:       'Secondary 4–5',
    lib_higher_ed:          'Higher Education',
    lib_english:            'English',
    lib_bilingual:          'Bilingual',
    lib_get_ai_recs:        'Get AI Recommendations',
    lib_ai_recs_title:      'AI RECOMMENDATIONS',
    lib_ai_recs_empty:      'Set your learner profile and click Get AI Recommendations.',
    lib_find_more_title:    'FIND MORE BOOKS',
    lib_find_more_desc:     'Search public domain books, connect your school library, or upload your own files.',
    lib_open_discovery:     'Open Book Discovery Agent →',
    lib_my_list_title:      'MY READING LIST',
    lib_my_list_empty:      'Add books by clicking "Add to List" on a book card.',

    /* Reading Companion */
    rc_input_title:     'INPUT TEXT TO READ',
    rc_reading_area:    'READING AREA',
    rc_comp_questions:  'COMPREHENSION QUESTIONS',
    rc_comp_empty:      'Load a text and click Generate Questions.',
    rc_gen_questions:   'Generate Questions',
    rc_vocab_helper:    'VOCABULARY HELPER',
    rc_vocab_empty:     'No vocabulary entries found.',
    rc_reading_stats:   'READING STATS',
    rc_words_lbl:       'Words',
    rc_sentences_lbl:   'Sentences',
    rc_min_read:        'Min Read',
    rc_speed_lbl:       'Speed:',
    rc_slow:            'Slow',
    rc_normal_speed:    'Normal',
    rc_fast:            'Fast',
    rc_very_fast:       'Very Fast',
    rc_load_text:       'Load Text',
    rc_react:           'ReAct',
    rc_text_size:       'TEXT SIZE',
    rc_colour_overlay:  'COLOUR OVERLAY',
    rc_status_ready:    'Text loaded. Ready to read.',
    rc_blind_guide_lbl: 'Audio Guide for Blind Learner',
    rc_read_text_aloud: 'Read Text Aloud',
    rc_highlight_keys:  'Highlight Key Words',

    /* ADHD Agent */
    adhd_micro_title:   '⏱ MICRO-READING SESSION',
    adhd_session_len:   'Session Length:',
    adhd_session_timer: 'Session Timer',
    adhd_start_session: '▶ Start Session',
    adhd_interest_title:'INTEREST & STRATEGY',
    adhd_my_interests:  'MY INTERESTS',
    adhd_reading_mode:  'READING MODE',
    adhd_focus_window:  'Focus Window Mode',
    adhd_chunk_mode:    'Chunk Reading Mode',
    adhd_free_mode:     'Free Reading Mode',
    adhd_gen_strategy:  'Generate Strategy ReAct',
    adhd_reading_area:  'READING AREA',
    adhd_good_focus:    'Good Focus Level',
    adhd_simulate:      '↻ Simulate Score',
    adhd_multi_book:    'MULTI-BOOK STRATEGY',
    adhd_high_focus:    'High Focus: Science / Maths',
    adhd_med_focus:     'Medium Focus: Stories',
    adhd_low_focus:     'Low Focus: Comics / BIM',
    adhd_note_builder:  'AI NOTE BUILDER',
    adhd_no_notes:      'No notes yet.',
    adhd_export_notes:  'Export Notes',
    adhd_intervention:  'ADHD INTERVENTION',
    adhd_intervention_empty: 'Start a session to receive personalised ADHD reading interventions.',
    adhd_view_plan:     'View Full Intervention Plan',

    /* Offline Intelligent Mode */
    offline_banner:         'Offline Mode Activated — Learning Without Internet Barrier.',
    offline_banner_sub:     'Downloaded content, tools and settings remain available.',
    offline_sync_banner:    'Synchronising your learning progress…',
    offline_sync_done:      'Sync complete. All progress saved.',
    offline_download_btn:   'Download for Offline',
    offline_remove_btn:     'Remove Offline Copy',
    offline_saved:          'Saved for offline reading.',
    offline_removed:        'Offline copy removed.',
    offline_ai_fallback:    'Offline Mode: Showing cached AI learning resources.',
    offline_no_ai:          'AI features require an internet connection.',
    offline_lib_title:      'Offline Library',
    offline_lib_subtitle:   'Your downloaded books, OCR scans, notes and cached content.',
    offline_tab_downloads:  'Downloaded Books',
    offline_tab_ocr:        'OCR Cache',
    offline_tab_notes:      'Notes & Quizzes',
    offline_tab_ai:         'AI Cache',
    offline_tab_storage:    'Storage',
    offline_empty:          'Nothing here yet. Download content while online to read it offline.',
    offline_storage_title:  'Storage Usage',
    offline_storage_used:   'Used',
    offline_storage_free:   'Available',
    offline_storage_total:  'Total',
    offline_demo:           'Offline Demonstration — All core features active without internet.',
    offline_search_hint:    'Search downloaded content…',
    offline_open_btn:       'Open',
    offline_delete_btn:     'Delete',
    offline_size:           'Size',
    offline_source:         'Source',
    offline_status_online:  'Online',
    offline_status_offline: 'Offline',
    offline_pending_sync:   'Pending sync items',
    offline_last_sync:      'Last synced',
    offline_never_synced:   'Not yet synced',
    offline_sync_now:       'Sync Now',
    offline_last_sync_label:'Last sync:',
    /* Offline Library — additional keys */
    offline_books_saved:    'books saved',
    offline_find_more:      '+ Find More Books',
    offline_clear_all:      'Clear All',
    offline_go_discover:    'Browse Books',
    offline_new_scan:       'New Scan',
    offline_clear_ocr:      'Clear Cache',
    offline_go_ocr:         'Open OCR Agent',
    offline_clear_ai:       'Clear AI Cache',
    offline_ai_cache_info:  'AI answers are cached automatically when online. Offline, the Teacher Agent replays saved answers.',
    offline_go_ai:          'Open AI Teacher',
    offline_notes_label:    'Notes',
    offline_bookmarks_label:'Bookmarks',
    offline_highlights_label:'Highlights',
    offline_quiz_label:     'Quiz History',
    offline_notes_info:     'Notes, bookmarks, highlights and quiz results are saved locally and available offline.',
    offline_open_reading:   'Open Reading Companion',
    offline_open_adhd:      'Open ADHD Agent',
    offline_open_teacher:   'Open AI Teacher',
    offline_stat_books:     'books',
    offline_stat_scans:     'scans',
    offline_stat_responses: 'responses',
    offline_stat_items:     'items',
    offline_sync_title:     'Sync & Backup',
    offline_sw_title:       'Service Worker Status',
    offline_clear_all_data: 'Clear All Data',
    offline_read_btn:       'Read Now',
    offline_teach_btn:      'Ask AI Teacher',
    offline_already_saved:  '✅ Saved',
    offline_cleared:        'Cleared.',
    offline_empty_downloads:'No downloads yet',
    offline_empty_downloads_sub: 'Books you save offline will appear here. Tap "Download for Offline" on any book.',
    offline_empty_ocr:      'No OCR scans cached',
    offline_empty_ocr_sub:  'Text extracted from images is saved here for offline access.',
    offline_empty_ai:       'No AI responses cached',
    offline_empty_ai_sub:   'Use AI Teacher or AI Librarian while online and answers will be saved here.',
    offline_confirm_clear_downloads: 'Remove all downloaded books from offline storage?',
    offline_confirm_clear_ocr:       'Clear all cached OCR scans?',
    offline_confirm_clear_ai:        'Clear all cached AI responses?',
    offline_confirm_clear_all:       'Clear ALL offline data? This cannot be undone.',

    /* ReAct loop */
    react_loop_title:   'ReAct Reasoning Loop',
    react_think:        'THINK',
    react_waiting:      'Waiting…',
    react_act:          'ACT',
    react_observe:      'OBSERVE',
    react_retry:        'RETRY',
    react_improving:    'Improving…',
    react_btn:          'ReAct AI Analysis',

    /* Reading Companion — additional */
    rc_audio_guide_desc: 'Press the audio buttons below to navigate this page using your screen reader or Text-to-Speech. All content is audio-accessible.',
    rc_reading_empty:    'Click Load Text to begin reading.',

    /* ADHD Agent — additional */
    adhd_page_subtitle:  'Focus-optimised reading with micro-sessions, timers, highlighting, and smart note builder.',
    adhd_strategy_desc:  'ADHD learners often thrive reading 2–3 books simultaneously. Rotate based on energy level:',
    adhd_break_title:    'Time for a Focus Break!',
    adhd_take_break:     'Take Break',
    adhd_skip_break:     'Skip',
    adhd_page_title_full: 'ADHD Adaptive Reading Agent',
    adhd_timer_started:  'Focus session started. {n} minutes.',
    adhd_timer_complete: 'Session complete. Time for a break.',
    adhd_timer_paused:   'Session paused.',
    adhd_timer_stopped:  'Session stopped.',
    adhd_break_started:  'Break time started.',
    adhd_focus_excellent: 'Excellent Focus!',
    adhd_focus_good:     'Good Focus Level',
    adhd_focus_moderate: 'Moderate Focus',
    adhd_focus_break:    'Consider a break',
    btn_pause:           '⏸ Pause',
    adhd_note_placeholder: 'Add a note or quote…',
    adhd_interest_placeholder: 'e.g. science, football, music…',
    adhd_footer_name:    'ADHD Adaptive Reading Agent',
    adhd_no_notes_export: 'No notes to export!',
    adhd_generating_strategy: 'Generating personalised ADHD strategy…',
    adhd_ai_strategy_label: 'AI-Personalised Strategy:',
    adhdr_loading_title: '⏳ Loading book content…',
    adhdr_loading_desc:  'Please wait while we retrieve the text.',
    adhdr_prev:          '← Prev',
    adhdr_next:          'Next →',
    adhdr_ai_help:       ' AI Help',
    adhdr_section_label: 'Section {n}',
    adhdr_min_read:      '~{n} min read',
    adhdr_exit_focus:    'Exit focus mode',
    adhdr_prev_para:     'Previous paragraph',
    adhdr_next_para:     'Next paragraph',
    adhdr_stop_reading:  'Stop reading',
    adhdr_prev_sentence: 'Previous sentence',
    adhdr_next_sentence: 'Next sentence',
    adhdr_controls_aria:    'Reading controls',
    adhdr_font_dec:         'Decrease font size',
    adhdr_font_inc:         'Increase font size',
    adhdr_space_dec:        'Decrease line spacing',
    adhdr_space_inc:        'Increase line spacing',
    adhdr_focus_dialog_aria:'Focus reading mode',
    adhd_tip_aria:          'Personalised ADHD Tip',
    adhd_hl_toolbar_aria:   'Text highlight colours',
    adhd_hl_yellow:         'Highlight selection yellow',
    adhd_hl_green:          'Highlight selection green',
    adhd_hl_purple:         'Highlight selection purple',
    adhd_hl_red:            'Highlight selection red',
    adhd_hl_clear:          'Clear all highlights',
    ds_read_aloud:          'Read aloud',
    iab_btn_adhd:        '🧠 ADHD Agent',
    iab_btn_dyslexia:    '📖 Dyslexia Agent',
    iab_btn_reading:     '📚 Reading Companion',
    iab_btn_ocr:         '📷 OCR Agent',

    /* AI Librarian — additional */
    lib_search_btn:         'Search',
    lib_read_btn:           '▶ Read',
    lib_read_free_btn:      '▶ Read Free',
    lib_no_books:           'No books added yet.',
    lib_recommended_for:    'Recommended for {type}',
    lib_api_key_required:   'API key required for AI recommendations. Go to Settings →',
    lib_also_showing:       'Also showing {n} curated picks below',
    lib_find_book:          ' Find this book',
    lib_ai_rec_label:       'AI Recommendation · {level}',
    lib_add_btn:         '+ Add',
    lib_add_to_list:     'Add to reading list',
    lib_mode_adhd:       'ADHD Agent',
    lib_mode_audio:      'Audio Agent',
    lib_mode_ds:         'Down Syndrome',
    lib_dyslexia_opt:    'Dyslexia',
    lib_visual_keywords: 'Visual keywords',
    nav_skip_content:    'Skip to main content',

    /* Book Discovery — filter chips */
    bd_chip_adhd:        'ADHD Friendly',
    bd_chip_dyslexia:    'Dyslexia',
    bd_chip_children:    "Children's Books",
    bd_chip_adventure:   'Adventure',

    /* Settings page — additional i18n keys */
    set_openrouter_title: 'OpenRouter AI',
    set_openrouter_desc: 'Enter your OpenRouter API key to enable AI summaries, quizzes, and intervention plans. Get a free key at openrouter.ai/keys ↗',
    set_ai_model_label: 'AI Model',
    set_letter_spacing: 'Letter spacing',
    set_spacing_normal: 'Normal',
    set_lang_english: 'English',
    set_lang_english_sub: 'Interface in English',
    set_lang_bm_sub: 'Interface in Bahasa Melayu',
    set_avatar_offline: 'Offline — always available',
    set_avatar_quality: 'Highest Quality',
    set_avatar_enterprise: 'Enterprise',
    set_confirm_reset_a11y: 'Reset all accessibility settings to defaults?',
    set_confirm_clear_data: 'Clear all learning data? This cannot be undone.',
    set_confirm_reset_profile: 'Reset learner profile?',
    set_confirm_reset_all: 'Reset ALL data? This will clear your API key, profile, and all settings. Are you sure?',
    set_toast_contrast: 'Contrast updated',
    set_toast_profile_saved: 'Profile saved',
    set_toast_profile_reset: 'Profile reset',
    set_toast_lang_english: 'Language: English',
    set_toast_data_cleared: 'Learning data cleared',
    set_toast_all_cleared: 'All data cleared. Reloading...',
    set_toast_key_cleared: 'API key cleared',
    set_toast_testing: 'Testing connection...',
    set_toast_saved: 'Saved',

    /* Duration options */
    dur_2min: '2 minutes',
    dur_3min: '3 minutes',
    dur_5min: '5 minutes',
    dur_10min: '10 minutes',
    dur_15min: '15 minutes',
    dur_20min: '20 minutes',

    /* Profile page — additional i18n keys */
    prof_comprehension_tip: 'Your comprehension score is strong. Try increasing session length from 10 to 15 minutes this week.',
    prof_intervention_title: 'Try 15-Minute Focus Sessions This Week',
    prof_intervention_desc: 'Your focus scores have been consistently above 75 for 3 sessions. The ADHD Agent suggests stepping up from 10-minute to 15-minute sessions while keeping 3-minute breaks.',
    prof_learning_profile: 'Learning Profile',
    prof_session_prefs: '⏱ Session Preferences',
    prof_footer_name: 'Learner Profile',

    /* Blind Audio Agent (ba_*) */
    ba_subtitle:              'Voice-First Blind Navigation',
    ba_status_speaking:       'Speaking…',
    ba_status_ready:          'Ready',
    ba_status_listening:      'Listening…',
    ba_status_hint:           'Say "Start Guide" or "Help" to begin',
    ba_label_last_cmd:        'Last Recognised Command',
    ba_label_last_speech:     'Last Spoken Text',
    ba_quick_title:           'Quick Access',
    ba_btn_start_guide:       'Start Guide',
    ba_btn_start_guide_aria:  'Start Guide — hear full instructions',
    ba_btn_guest:             'Guest Mode',
    ba_btn_guest_aria:        'Guest Mode — begin without login',
    ba_btn_dashboard:         'Open Dashboard',
    ba_btn_help:              'Help',
    ba_btn_help_aria:         'Help — hear all available commands',
    ba_features_title:        'Features',
    ba_feat_ocr_aria:         'OCR — scan and read text from images',
    ba_feat_readpage_aria:    'Read Page — have any page read aloud',
    ba_feat_library_aria:     'Library — browse accessible reading materials',
    ba_feat_reading_aria:     'Reading — adaptive reading mode',
    ba_feat_adhd_aria:        'ADHD — focus-friendly reading support',
    ba_feat_signlang_aria:    'Sign Language — sign language support',
    ba_feat_ocr:              'OCR',
    ba_feat_readpage:         'Read Page',
    ba_feat_library:          'Library',
    ba_feat_reading:          'Reading',
    ba_feat_adhd:             'ADHD',
    ba_feat_signlang:         'Sign Language',
    ba_login_title:           'Voice Login',
    ba_login_desc:            'Speak your credentials or type them below. Your data is never stored.',
    ba_login_email_ph:        'Email address',
    ba_login_password_ph:     'Password',
    ba_login_submit:          'Sign In',
    ba_shortcuts_title:       'Keyboard Fallbacks',
    ba_shortcut_space:        'Start / stop listening',
    ba_shortcut_r:            'Repeat last speech',
    ba_shortcut_h:            'Help',
    ba_shortcut_g:            'Guest mode',
    ba_shortcut_d:            'Open Dashboard',
    ba_shortcut_esc:          'Stop all',
    ba_shortcut_b:            'Toggle Braille Mode',
    ba_lang_toggle_aria:      'Toggle language between Bahasa Melayu and English',
    ba_footer_tagline:        'Empowering every learner',
    ba_footer_dashboard:      'Dashboard',
    ba_footer_settings:       'Settings',

    /* Profile — accessibility toggle aria-labels (prof_*) */
    prof_toggle_opendyslexic: 'Toggle OpenDyslexic font',
    prof_toggle_large_text:   'Toggle large text mode',
    prof_toggle_high_contrast:'Toggle high contrast',
    prof_toggle_ruler:        'Toggle reading ruler',
    prof_toggle_auto_read:    'Toggle auto-read',

    /* Profile — role badge */
    prof_primary:             'Primary',
    prof_learner_suffix:      'Learner',

    /* Settings — API key placeholders and aria-labels (set_*) */
    set_api_key_placeholder:  'Paste your OpenRouter API key here (sk-or-...)',
    set_heygen_key:           'Paste HeyGen API key',
    set_did_key:              'Paste D-ID API key',
    set_photo_url:            'https://... (photo of your presenter)',
    set_nvidia_key:           'NVIDIA NGC API token',
    set_text_size_aria:       'Text size',
    set_letter_spacing_aria:  'Letter spacing',
    set_speech_speed_aria:    'Speech speed',
    set_display_name_aria:    'Display name',
    set_show_hide_key:        'Show/hide key',
    set_lang_en_bsl:          'English (BSL/ASL future)',
  },

  ms: {
    /* Navigation */
    nav_home:        'Laman Utama',
    nav_dashboard:   'Papan Pemuka',
    nav_profile:     'Profil Saya',
    nav_ai_librarian: 'Pustakawan AI',
    nav_reading_companion: 'Teman Membaca',
    nav_adhd_agent:  'Ejen ADHD',
    nav_adhd:        'Ejen ADHD',
    nav_dyslexia_agent: 'Ejen Disleksia',
    nav_dyslexia:    'Ejen Disleksia',
    nav_ds_agent:    'Ejen Sindrom Down',
    nav_down_syndrome: 'Ejen Sindrom Down',
    nav_blind_agent: 'Ejen Audio Buta',
    nav_blind_audio: 'Audio Buta',
    nav_sign_agent:  'Ejen Komunikasi Visual',
    nav_sign_language: 'Bahasa Isyarat',
    nav_ew_agent:    'Ejen Amaran Awal',
    nav_early_warning: 'Amaran Awal',
    nav_iv_agent:    'Ejen Intervensi',
    nav_intervention: 'Intervensi',
    footer_agents:   'Ejen-Ejen',
    footer_more_agents: 'Lebih Ejen',
    footer_platform: 'Platform',
    footer_tagline:  'Ilmu Tanpa Sempadan, Kecerdasan Tanpa Had.',
    footer_built_with: 'Dibina dengan AI Agentik',
    nav_settings:    '⚙ Tetapan',
    nav_book_discovery: 'Penemuan Buku',
    nav_ocr_agent:   'Ejen OCR',
    nav_react_btn:   'Analisis ReAct AI',
    nav_lang_switch: 'EN',
    nav_lang_aria:   'Tukar ke Bahasa Inggeris',
    nav_sign_in:     'Log Masuk',
    nav_view_profile: 'Lihat Profil',
    nav_demo:        'Demo',
    nav_close:       'Tutup',
    nav_my_profile:  'Profil Saya',
    nav_reading_shelf: 'Rak Buku Maya',

    /* Index page */
    idx_try_demo:        'Cuba Demo — Tanpa Kunci API',
    idx_stat_agents:     'Ejen AI',
    idx_stat_learners:   'Jenis Pelajar',
    idx_stat_languages:  'Bahasa',
    idx_stat_accessible: 'Mudah Capaian',
    idx_cta_discover:    'Temui',
    idx_cta_read:        'Baca',
    idx_cta_focus:       'Fokus',
    idx_cta_read_easier: 'Baca Lebih Mudah',
    idx_cta_support:     'Sokongan',
    idx_cta_listen:      'Dengar',
    idx_cta_deaf:        'Sokongan Pekak',
    idx_cta_monitor:     'Pantau',
    idx_cta_plan:        'Rancang',
    idx_cta_shelf:       'Rak Buku',
    idx_copyright:       '© 2026 CelikSense AI. Hak cipta terpelihara.',
    idx_privacy:         'Privasi',
    idx_accessibility:   'Aksesibiliti',
    idx_contact:         'Hubungi',
    idx_username_placeholder: 'Masukkan nama pengguna anda',

    /* Dashboard ARIA */
    dash_agent_librarian_aria: 'Ejen Pustakawan AI – Cari dan cadangkan buku untuk profil pembelajaran anda',
    dash_agent_reading_aria:   'Ejen Rakan Membaca – Baca dengan bantuan AI',
    dash_agent_adhd_aria:      'Ejen ADHD – Sesi mikro-membaca',
    dash_agent_blind_aria:     'Ejen Audio Buta – Navigasi audio penuh',
    dash_agent_ew_aria:        'Ejen Amaran Awal – Penilaian risiko pelajar',
    dash_agent_iv_aria:        'Ejen Intervensi – Strategi diperibadi',
    dash_agent_ocr_aria:       'Ejen OCR – Muat naik imej buku',
    dash_agent_braille_aria:   'Ciri Output Braille',
    dash_agent_sign_aria:      'Ejen Komunikasi Visual – Sokongan bacaan mesra Pekak',

    /* Common actions */
    loading:      'Memuatkan...',
    save:         'Simpan',
    cancel:       'Batal',
    close:        'Tutup',
    back:         'Kembali',
    next:         'Seterusnya',
    done:         'Selesai',
    retry:        'Cuba lagi',
    start:        'Mula',
    stop:         'Henti',
    pause:        'Jeda',
    resume:       'Teruskan',
    clear:        'Kosongkan',
    read_aloud:   'Baca kuat',
    stop_audio:   'Henti audio',
    upload:       'Muat naik',
    capture:      'Tangkap',
    copy:         'Salin',
    copied:       'Disalin!',
    generate:     'Jana',
    settings:     'Tetapan',

    /* Accessibility panel */
    a11y_title:         'Tetapan Aksesibiliti',
    a11y_font_size:     'Saiz teks',
    a11y_font_style:    'Gaya fon',
    a11y_contrast:      'Mod kontras',
    a11y_overlay:       'Lapisan warna',
    a11y_tts:           'Teks-ke-suara',
    a11y_tts_speed:     'Kelajuan bacaan',
    a11y_captions:      'Tunjuk kapsyen',
    a11y_ruler:         'Pembaris bacaan',
    a11y_window:        'Tetingkap bacaan',
    a11y_voice_cmd:     'Arahan suara',
    a11y_reset:         'Tetapkan semula',
    a11y_font_system:   'Sistem',
    a11y_font_dyslexic: 'OpenDyslexic',
    a11y_font_arial:    'Arial',
    a11y_contrast_normal:   'Normal',
    a11y_contrast_high:     'Kontras tinggi',
    a11y_contrast_inverted: 'Terbalik',
    a11y_overlay_none:   'Tiada',
    a11y_overlay_yellow: 'Kuning',
    a11y_overlay_blue:   'Biru',
    a11y_overlay_green:  'Hijau',
    a11y_overlay_grey:   'Kelabu',
    a11y_overlay_pink:   'Merah jambu',

    /* OCR Agent */
    ocr_title:       'Pengimbas OCR',
    ocr_upload:      'Muat Naik Imej',
    ocr_camera:      'Ambil Gambar',
    ocr_capture:     'Tangkap Imej',
    ocr_retake:      'Ambil Semula',
    ocr_extract:     'Ekstrak Teks',
    ocr_extracting:  'Mengekstrak teks...',
    ocr_read:        'Baca Kuat',
    ocr_stop:        'Henti Audio',
    ocr_confidence:  'Keyakinan OCR',
    ocr_empty:       'Muat naik atau gambar halaman untuk bermula.',
    ocr_success:     'Teks berjaya diekstrak.',
    ocr_error:       'OCR gagal. Sila cuba lagi.',
    ocr_low_conf:    'Keyakinan rendah. Cuba pencahayaan lebih baik.',
    ocr_guide:       'Panduan suara aktif. Tekan 2 untuk muat naik, 3 untuk ambil gambar.',

    /* Reading Companion */
    rc_title:        'Rakan Bacaan',
    rc_paste_hint:   'Tampal atau taip teks anda di sini...',
    rc_summarise:    'Ringkaskan',
    rc_quiz:         'Jana Kuiz',
    rc_simplify:     'Permudahkan',
    rc_summary_title:'Ringkasan AI',
    rc_quiz_title:   'Kuiz Pemahaman',
    rc_score:        'Markah anda',
    rc_correct:      'Betul!',
    rc_wrong:        'Tidak tepat.',
    rc_generating:   'Menjana dengan AI...',
    rc_empty:        'Masukkan teks untuk bermula.',
    rc_level:        'Tahap bacaan',
    rc_easy:         'Mudah',
    rc_normal:       'Standard',
    rc_deep:         'Mendalam',

    /* ADHD Agent */
    adhd_title:      'Ejen Fokus ADHD',
    adhd_timer:      'Pemasa fokus',
    adhd_start:      'Mulakan sesi',
    adhd_break:      'Rehat',
    adhd_break_msg:  'Bagus! Masa untuk rehat 5 minit.',
    adhd_resume:     'Teruskan sesi',
    adhd_focus:      'Skor fokus',
    adhd_done:       'Sesi selesai!',
    adhd_distracted: 'Fokus rendah. Ambil rehat pendek?',
    adhd_tip:        'Petua: Baca satu perenggan sahaja.',

    /* Dyslexia Agent */
    dys_title:       'Sokongan Disleksia',
    dys_font:        'Fon bacaan',
    dys_spacing:     'Jarak huruf',
    dys_line_h:      'Tinggi baris',
    dys_overlay:     'Lapisan warna',
    dys_ruler:       'Pembaris bacaan',
    dys_syllables:   'Pecah suku kata',
    dys_highlight:   'Sorot patah kata',
    dys_sample:      'Teks contoh',
    dys_hint:        'Laraskan tetapan sehingga bacaan terasa selesa.',

    /* Blind Audio Agent */
    blind_title:     'Ejen Audio Buta',
    blind_activate:  'Aktifkan panduan suara',
    blind_test_mic:  'Uji mikrofon',
    blind_commands:  'Arahan suara',
    blind_listening: 'Mendengar...',
    blind_not_heard: 'Tidak dikenali. Sila cuba lagi.',
    blind_mic_ok:    'Mikrofon berfungsi.',
    blind_mic_fail:  'Mikrofon tidak dijumpai. Semak kebenaran pelayar.',
    blind_intro:     'Selamat datang ke Ejen Audio Buta. Sebut "mulakan panduan" untuk bantuan.',

    /* Early Warning */
    ew_title:        'Monitor Kesihatan Pembelajaran',
    ew_risk_score:   'Skor risiko',
    ew_risk_low:     'Risiko rendah',
    ew_risk_moderate:'Risiko sederhana',
    ew_risk_high:    'Risiko tinggi',
    ew_risk_critical:'Kritikal — dapatkan sokongan',
    ew_sessions:     'Sesi minggu ini',
    ew_avg_quiz:     'Purata skor kuiz',
    ew_avg_focus:    'Purata skor fokus',
    ew_no_data:      'Tiada data lagi. Lengkapkan sesi untuk melihat skor anda.',
    ew_recalculate:  'Kira semula',

    /* Intervention */
    int_title:       'Perancang Intervensi',
    int_generate:    'Jana pelan',
    int_generating:  'Mencipta pelan peribadi anda...',
    int_no_data:     'Tiada data risiko. Gunakan Ejen Amaran Awal dahulu.',
    int_step:        'Langkah',
    int_days:        'hari',
    int_read_plan:   'Baca pelan kuat',

    /* AI Librarian */
    lib_title:       'Pustakawan AI',
    lib_interests:   'Minat anda',
    lib_search:      'Cari buku',
    lib_searching:   'Mencari...',
    lib_results:     'Disyorkan untuk anda',
    lib_no_results:  'Tiada hasil. Cuba minat yang berbeza.',
    lib_read:        'Baca cadangan',

    /* Voice */
    voice_start:        'Mula mendengar',
    voice_stop:         'Henti mendengar',
    voice_denied:       'Kebenaran mikrofon ditolak.',
    voice_network_err:  'Ralat rangkaian. Semak sambungan anda.',
    voice_not_supported:'Arahan suara tidak disokong dalam pelayar ini.',

    /* Gemini */
    gemini_error:  'Perkhidmatan AI tidak tersedia. Menggunakan mod asas.',
    gemini_quota:  'Had AI harian dicapai. Cuba lagi esok.',
    gemini_no_key: 'Tiada kunci OpenRouter API. Tambah dalam Tetapan.',

    /* Errors */
    err_generic:   'Sesuatu telah berlaku. Sila cuba lagi.',
    err_offline:   'Anda di luar talian. Sesetengah ciri mungkin terhad.',
    err_camera:    'Kamera tidak tersedia. Semak kebenaran pelayar.',

    /* Laman Utama / Navigasi tambahan */
    tagline:        'Pembelajaran Multi-Deria Beragensi',
    nav_agents:     'Ejen ▾',
    nav_signup:       'Daftar',
    signup_title:     'Daftar Akaun',
    signup_sub:       'Mulakan pembelajaran inklusif anda hari ini.',
    signup_username:  'Nama Pengguna',
    signup_uph:       'Masukkan nama pengguna anda',
    signup_email:     'Emel',
    signup_eph:       'contoh@emel.com',
    signup_btn:       'Daftar',
    signup_note:      'Data disimpan dalam peranti anda sahaja. Tiada pelayan luar.',
    signup_success:   'Akaun berjaya dibuat! Menghala ke papan pemuka…',
    signup_err_user:  'Sila masukkan nama pengguna anda.',
    signup_err_email: 'Sila masukkan alamat emel yang sah.',

    /* Bahagian Hero */
    hero_badge:     '10 Ejen AI · Pembelajaran Inklusif',
    hero_title:     'CelikSense AI',
    hero_subtitle:  'Ekosistem Pembelajaran Multi-Deria',
    hero_tagline:   'Ilmu Tanpa Sempadan, Kecerdasan Tanpa Had',
    hero_cta1:      'Mulakan',

    /* Halaman Profil */
    prof_badge:          'Profil Saya',
    prof_title:          'Profil Pelajar',
    prof_subtitle:       'Urus tetapan aksesibiliti, pilihan bacaan, dan sejarah pembelajaran anda.',
    prof_edit:           '✎ Edit Profil',
    prof_this_week:      '📊 Minggu Ini',
    prof_sessions:       'Sesi',
    prof_read_time:      'Masa Baca',
    prof_focus_score:    'Skor Fokus',
    prof_books:          'Buku',
    prof_quick_access:   '⚡ Akses Pantas',
    prof_my_adhd:        '🧠 Ejen ADHD Saya',
    prof_reading_companion: '📚 Rakan Bacaan',
    prof_reading_list:   '📖 Senarai Bacaan Saya',
    prof_risk_report:    '⚠ Laporan Risiko',
    prof_intervention:   '💡 Pelan Intervensi',

    /* Bahagian Ejen */
    agents_badge:   '10 Ejen AI Kami',
    agents_title:   '10 Ejen, Satu Ekosistem',
    agents_desc:    'Setiap ejen dibina khusus untuk keperluan pembelajaran tertentu. Bersama-sama mereka membentuk sistem pembelajaran peribadi yang adaptif.',

    /* Profil pelajar */
    learners_title:   'Menyokong Setiap Pelajar',
    learner_blind:    'Buta & Penglihatan Terhad',
    learner_deaf:     'Pekak & Pendengaran Terhad',
    learner_adhd:     'ADHD',
    learner_dyslexia: 'Disleksia / Sindrom Down',
    learner_general:  'Semua Pelajar',
    learners_section_desc: 'Alat AI inklusif yang direka khas untuk kepelbagaian keperluan pembelajaran di bilik darjah dan rumah di Malaysia.',
    learner_blind_desc:    'Navigasi audio penuh, pintasan papan kekunci, dan TTS untuk pembelajaran berdikari.',
    learner_deaf_desc:     'Sokongan bacaan mesra OKU pendengaran dengan kapsyen besar, kata kunci visual, peta minda dan panduan ejaan jari.',
    learner_adhd_desc:     'Sesi mikro, pemasa fokus, tetingkap bacaan, dan penglibatan berasaskan minat.',
    learner_dyslexia_desc: 'Fon mesra disleksia, lapisan warna, pembaris bacaan, dan peta minda visual.',
    learner_general_desc:  'Pustakawan AI, Rakan Membaca, dan Ejen Intervensi melayani setiap pelajar.',
    learner_blind_agent:   'Ejen Audio Buta',
    learner_deaf_agent:    'Agen Komunikasi Visual',
    learner_adhd_agent:    'Ejen ADHD',
    learner_dyslexia_agent:'Ejen Disleksia / Sindrom Down',
    learner_general_agent: 'Semua 10 Ejen',
    /* Label statistik */
    stat_agents:'Ejen AI', stat_learner_types:'Jenis Pelajar', stat_languages:'Bahasa', stat_accessible:'Aksesibel',
    /* Tag orb */
    orb_discover:'TEMUI', orb_read:'BACA', orb_focus:'FOKUS', orb_read_easier:'BACA MUDAH',
    orb_listen:'DENGAR', orb_sign:'SOKONG OKU', orb_monitor:'PANTAU', orb_plan:'RANCANG', orb_support:'SOKONG', orb_shelf:'RAK',
    hero_platform_desc:'— platform AI dwibahasa yang menyokong pelajar buta, pekak, ADHD, dan disleksia.',
    /* Cara Ia Berfungsi */
    how_title:'Cara Ia Berfungsi',
    how_desc:'Tiga langkah dari pendaftaran hingga pengalaman pembelajaran peribadi yang aksesibel sepenuhnya.',
    how_step1_title:'Tetapkan Profil Anda', how_step1_desc:'Beritahu CelikSense tentang keperluan pembelajaran, pilihan bahasa, dan minat anda. Mengambil masa kurang dua minit.', how_step1_btn:'Ke Profil',
    how_step2_title:'AI Sesuai Untuk Anda', how_step2_desc:'10 ejen secara automatik mengkonfigurasi fon, audio, lapisan, tempoh sesi, dan bahasa mengikut profil anda.', how_step2_btn:'Buka Papan Pemuka',
    how_step3_title:'Belajar Tanpa Sempadan', how_step3_desc:'Baca, dengar, isyarat, dan terokai. Ejen Amaran Awal memantau kemajuan anda dan mencadangkan intervensi bila perlu.', how_step3_btn:'Mula Membaca',
    /* Kenapa */
    why_title:'Kenapa CelikSense AI?', why_desc:'Direka dari asas untuk pembelajaran inklusif, aksesibel, dan dwibahasa.',
    why1_title:'AI Benar-Benar Agentik', why1_desc:'10 ejen khusus yang berkomunikasi dan berkoordinasi untuk memperibadikan setiap sesi, bukan sekadar chatbot biasa.',
    why2_title:'Dwibahasa Sepenuhnya', why2_desc:'Sokongan penuh Bahasa Inggeris dan Bahasa Melayu merentas setiap ejen, setiap label, dan setiap arahan audio.',
    why3_title:'Dibina untuk Aksesibiliti', why3_desc:'Navigasi papan kekunci, label ARIA, TTS, mod kontras tinggi, dan sokongan pembaca skrin adalah ciri utama, bukan tambahan.',
    why4_title:'Adaptif secara Lalai', why4_desc:'Mempelajari pilihan anda, menyesuaikan fon, warna, tempoh sesi, dan kesukaran kandungan secara automatik setiap sesi.',
    why5_title:'Sistem Amaran Awal', why5_desc:'Mengenal pasti pelajar yang berisiko secara proaktif dan menghasilkan pelan intervensi yang diperibadikan untuk pendidik.',
    why6_title:'Pembelajaran Multi-Deria', why6_desc:'Mod visual, audio, sentuhan, dan bahasa isyarat bermakna setiap pelajar menemui jalan yang sesuai untuk otak mereka.',
    /* CTA */
    cta_badge:'Bersedia untuk bermula?', cta_headline:'Pembelajaran yang menyesuaikan diri dengan anda',
    cta_sub:'Sertai pendidik dan pelajar di seluruh Malaysia yang menggunakan CelikSense AI untuk menjadikan bacaan, kefahaman, dan komunikasi benar-benar aksesibel.',
    cta_btn1:'Buka Papan Pemuka →', cta_btn2:'Cipta Profil',
    /* Footer */
    footer_tagline1:'Ekosistem Pembelajaran Multi-Deria Agentik untuk pendidikan inklusif di Malaysia dan seluruh dunia.',
    footer_tagline2:'Ilmu Tanpa Sempadan, Kecerdasan Tanpa Had.',
    footer_col_core:'Ejen Utama', footer_col_more:'Ejen Lain', footer_col_platform:'Platform',
    btn_explore_agents:'✨ Terokai Ejen', btn_view_all_agents:'Lihat Semua Ejen di Papan Pemuka →',

    /* Kad ejen */
    a1_name: 'Pustakawan AI',
    a1_desc: 'Cadangan buku pintar berdasarkan profil pelajar dan keperluan aksesibiliti.',
    a2_name: 'Rakan Bacaan',
    a2_desc: 'Panduan bacaan peribadi dengan sokongan pemahaman, kosa kata, dan navigasi audio.',
    a3_name: 'Ejen ADHD',
    a3_desc: 'Tetingkap fokus, sesi mikro, penyerlahan pintar, dan pembina nota untuk pelajar ADHD.',
    a4_name: 'Ejen Disleksia',
    a4_desc: 'Fon mesra disleksia, lapisan warna, pembaris bacaan, dan peta minda visual untuk pelajar disleksia.',
    a5_name: 'Ejen Audio Buta',
    a5_desc: 'Navigasi audio penuh dan teks-ke-suara untuk pelajar buta dan penglihatan terhad.',
    a6_name: 'Agen Komunikasi Visual',
    a6_desc: 'Sokongan bacaan mesra OKU pendengaran dengan kapsyen besar, kata kunci visual, peta minda dan jujukan komik.',
    a7_name: 'Ejen Amaran Awal',
    a7_desc: 'Pemantauan prestasi yang mengenal pasti pelajar berisiko dan mencetuskan amaran tepat waktu.',
    a8_name: 'Ejen Intervensi',
    a8_desc: 'Strategi peribadi jana AI, pelan tindakan, dan perpustakaan sumber yang dikurasi.',
    a9_name: 'Ejen Sindrom Down',
    a9_desc: 'Bahasa dipermudahkan, papan cerita visual, latih tubi kosa kata, dan sokongan pembelajaran inklusif.',
    a10_name: 'Rak Buku Maya',
    a10_desc: 'Simpan, susun dan baca semula buku kegemaran anda — koleksi peribadi dalam satu rak digital.',

    /* Halaman Tetapan */
    set_title:               'Tetapan',
    set_subtitle:            'Sesuaikan CelikSense AI untuk keperluan pembelajaran anda.',
    set_tab_ai:              'Tetapan AI',
    set_tab_a11y:            'Aksesibiliti',
    set_tab_profile:         'Profil',
    set_tab_lang:            'Bahasa',
    set_tab_data:            'Data & Privasi',
    set_gemini_title:        'OpenRouter AI',
    set_gemini_desc:         'Masukkan kunci OpenRouter API anda untuk mengaktifkan ringkasan AI, kuiz, dan pelan intervensi.',
    set_api_none:            'Tiada kunci ditetapkan',
    set_api_saved:           'Kunci disimpan — klik Uji untuk mengesahkan',
    set_api_ok:              'Bersambung — OpenRouter AI berfungsi',
    set_save_key:            'Simpan Kunci',
    set_test:                'Uji',
    set_clear_key:           'Padam Kunci',
    set_get_key:             'Dapatkan kunci percuma ↗',
    set_key_privacy:         'Kunci API anda disimpan hanya dalam pelayar anda (localStorage). Ia tidak pernah dihantar ke mana-mana pelayan.',
    set_key_warn_title:      'Keselamatan API Key',
    set_key_warn_body:       'API key disimpan dalam localStorage peranti ini dan boleh dibaca oleh mana-mana skrip di halaman yang sama. Gunakan key yang mempunyai had kuota dan sekatan rujukan. Jangan gunakan project owner key.',
    set_key_saved:           'Kunci API disimpan!',
    set_ai_prefs:            'Pilihan AI',
    set_ai_prefs_desc:       'Kawal cara ciri AI berfungsi.',
    set_ai_summaries:        'Ringkasan AI',
    set_ai_summaries_sub:    'Ringkaskan teks panjang secara automatik dalam Rakan Bacaan',
    set_ai_quiz:             'Kuiz AI',
    set_ai_quiz_sub:         'Jana soalan pemahaman selepas membaca',
    set_ai_intervention:     'Pelan Intervensi AI',
    set_ai_intervention_sub: 'Jana strategi pembelajaran peribadi',
    set_font_title:          'Teks & Fon',
    set_font_desc:           'Laraskan cara teks dipaparkan di semua halaman.',
    set_font_sub:            'OpenDyslexic membantu sesetengah pembaca',
    set_contrast_desc:       'Pilih mod paparan yang paling mudah untuk mata anda.',
    set_overlay_sub:         'Membantu dengan tekanan visual dan disleksia',
    set_tts_desc:            'Sesuaikan cara teks dibaca dengan kuat.',
    set_voice_sub:           'Sebut arahan untuk mengawal aplikasi tanpa tangan',
    set_ruler_sub:           'Jalur serlahan yang mengikut kursor anda',
    set_window_sub:          'Kaburkan kandungan di luar jalur fokus (mod ADHD)',
    set_profile_title:       'Profil Pelajar',
    set_profile_desc:        'Profil anda membantu ejen menyesuaikan sokongan mereka.',
    set_name:                'Nama paparan',
    set_disability:          'Keperluan aksesibiliti',
    set_grade:               'Tahun / Tingkatan',
    set_lang_title:          'Bahasa Paparan',
    set_lang_desc:           'Pilih bahasa untuk semua teks dalam aplikasi.',
    set_analytics_title:     'Analitik Pembelajaran',
    set_analytics_desc:      'Data disimpan hanya dalam pelayar anda — tidak pernah dimuat naik ke mana-mana pelayan.',
    set_sessions:            'Sesi',
    set_avg_focus:           'Purata Fokus',
    set_risk_score:          'Skor Risiko',
    set_clear_analytics:     'Padam semua data pembelajaran',
    set_demo_title:          'Demo',
    set_demo_mode:           'Mod Demo',
    set_enable_demo:         'Aktifkan Mod Demo',
    set_disable_demo:        'Nyahaktif',
    set_export_all:          'Eksport Semua Data',
    set_export_json:         'Eksport JSON',
    set_danger_title:        'Zon Bahaya',
    set_danger_desc:         'Tindakan ini tidak boleh dibatalkan.',
    set_clear_profile:       'Set semula profil pelajar',
    set_clear_profile_sub:   'Mengalih keluar nama, tahun, dan jenis kecacatan',
    set_clear_all:           'Set semula semua',
    set_clear_all_sub:       'Memadamkan semua data termasuk kunci API dan tetapan aksesibiliti',
    set_reset:               'Set Semula',
    set_avatar_engine:       'Enjin Avatar',

    /* Papan Pemuka */
    dash_welcome:       'Selamat kembali,',
    dash_name:          'Pelajar',
    dash_subtitle:      'Papan pemuka pembelajaran peribadi anda',
    dash_progress:      'Kemajuan Bacaan',
    dash_focus:         'Skor Fokus',
    dash_mode:          'Mod Aksesibiliti',
    dash_intervention:  'Disyorkan',
    dash_agents_title:  'Ejen AI',
    dash_select_desc:   'Pilih ejen untuk memulakan sesi peribadi anda',
    dash_start_reading: '▶ Mula Membaca',
    dash_view_report:   '📊 Lihat Laporan',
    dash_view_plan:     'Lihat Pelan',
    dash_chapters_of:   'daripada',
    dash_chapters_done: 'bab selesai',
    dash_above_avg:     'Lebih tinggi dari purata ↑',
    dash_average:       'Purata',
    dash_below_avg:     'Kurang dari purata ↓',
    dash_reading_window:'Tetingkap bacaan aktif',
    dash_no_mode:       'Tiada mod aktif',
    dash_overlay_lbl:   'Hamparan:',
    dash_focus_mode:    'Mod Fokus Aktif',
    dash_health_alert:  'Amaran kesihatan pembelajaran:',
    dash_view_warning:  'Lihat Ejen Amaran Awal →',
    dash_recent_act:    'Aktiviti Terkini',
    dash_quick_stats:   'Statistik Pantas',
    dash_sessions_week: 'Sesi Minggu Ini',
    dash_total_read_time:'Jumlah Masa Baca',
    dash_books_explored:'Buku Diterokai',
    dash_comp_avg:      'Purata Kefahaman',
    dash_teacher_icon:  'Guru',
    dash_teacher_desc:  'Pandangan kelas, kemajuan pelajar, amaran awal',
    dash_demo_title:    'Demo',
    dash_demo_desc:     'Walkthrough demo, ejen AI, bukti perintis',
    dash_pilot_title:   'Bukti Perintis',
    dash_pilot_desc:    'Keputusan pengesahan pengguna daripada pelajar sebenar',
    dash_done_badge:    'Selesai',
    dash_break_due:     'Masa Rehat',
    dash_just_now:      'Baru sahaja',
    dash_h_ago:         'j lepas',
    dash_d_ago:         'h lepas',
    dash_act_time1:     '2 jam lalu · sesi 15 min',
    dash_act_time2:     'Semalam · sesi 10 min',
    dash_act_time3:     '2 hari lalu · sesi 20 min',
    dash_knowledge_hub: 'HAB ILMU SAYA',
    dash_open_hub:      'Buka Hab Ilmu',
    dash_activity_chapter3: 'Teman Membaca – Bab 3',
    dash_activity_focus:    'Ejen ADHD – Sesi Fokus',
    dash_activity_overlay:  'Ejen Disleksia – Hamparan Hijau',
    agent_active:       'Aktif',
    ew_form_title: 'Borang Penilaian Pelajar',
    ew_learner_name: 'Nama Pelajar',
    ew_grade_level: 'Tahap Gred',
    ew_learning_need: 'Keperluan Pembelajaran Utama',
    ew_perf_scores: 'Skor Prestasi (0–100)',
    ew_reading_score: 'Skor Bacaan',
    ew_comprehension: 'Kefahaman',
    ew_attention_focus: 'Perhatian / Fokus',
    ew_participation: 'Penyertaan',
    ew_warning_signs: 'Tanda Amaran Diperhatikan',
    ew_duration: 'Tempoh Kebimbangan',
    ew_analyse_btn: '⚠ Analisis Risiko Sekarang',
    ew_overall_risk: 'Tahap Risiko Keseluruhan',
    ew_run_btn: 'Jalankan Penilaian',
    ew_empty_msg: 'Lengkapkan dan hantar borang penilaian untuk melihat analisis risiko.',
    ew_perf_trend: 'Trend Prestasi (6 Minggu Lepas)',
    ew_risk_factors: 'Faktor Risiko',
    ew_risk_empty: 'Hantar penilaian untuk melihat faktor risiko.',
    ew_active_alerts: 'Amaran Aktif',
    ew_no_alerts: 'Tiada amaran dijana lagi.',
    ew_view_plan: 'Lihat Pelan Intervensi',
    ew_gen_report: 'Jana Laporan',
    ew_reset: '↺ Set Semula',
    iv_learner_profile: 'Profil Pelajar',
    iv_learner_name: 'Nama Pelajar',
    iv_primary_need: 'Keperluan Utama',
    iv_risk_level: 'Tahap Risiko',
    iv_grade_level: 'Tahap Gred',
    iv_weakest_area: 'Kawasan Paling Lemah',
    iv_available_support: 'Sokongan Tersedia',
    iv_lang_pref: 'Pilihan Bahasa',
    iv_gen_plan: 'Jana Pelan Intervensi',
    iv_quick_actions: '⚡ Tindakan Pantas',
    iv_open_adhd: 'Buka Ejen ADHD',
    iv_open_dyslexia: 'Buka Ejen Disleksia',
    iv_reading_companion: 'Rakan Bacaan',
    iv_back_ew: '⚠ Kembali ke Amaran Awal',
    iv_empty_msg: 'Lengkapkan profil pelajar dan klik Jana Pelan Intervensi untuk menerima cadangan AI yang diperibadikan.',
    /* early-warning page */
    ew_page_title:    'Ejen Amaran Awal',
    ew_page_subtitle: 'Pemantauan prestasi pelajar dan penilaian risiko. Kenal pasti pelajar berisiko awal dan picu sokongan tepat masa.',
    ew_dur_2w:        'Kurang 2 minggu',
    ew_dur_4w:        '2–4 minggu',
    ew_dur_2m:        '1–2 bulan',
    ew_dur_over2m:    'Lebih 2 bulan',
    ew_sign1:         'Kerap kehilangan fokus semasa membaca',
    ew_sign2:         'Kelajuan bacaan jauh di bawah purata',
    ew_sign3:         'Sukar mengenal perkataan biasa',
    ew_sign4:         'Skor kefahaman rendah walaupun berusaha',
    ew_sign5:         'Sentiasa mengelak tugasan bacaan',
    ew_sign6:         'Tugasan kerap tidak siap',
    ew_sign7:         'Tekanan emosi berkaitan bacaan',
    ew_sign8:         'Sukar mengatur teks',
    ew_risk_level_lbl: 'Tahap Risiko',
    ew_avg_score:     'Skor Purata',
    ew_warning_count: 'Tanda Amaran',
    ew_priority:      'Keutamaan',
    ew_risk_meter:    'Meter Penilaian Risiko',
    ew_low_risk:      'Risiko Rendah',
    ew_medium:        'Sederhana',
    ew_high_risk:     'Risiko Tinggi',
    ew_risk_level:    'Tahap Risiko',
    ew_urgent:        'Mendesak',
    ew_high:          'Tinggi',
    ew_normal_priority: 'Normal',
    ew_critical:      '⚠ Kritikal',
    ew_concern:       'Kebimbangan',
    ew_factor_reading: 'Skor Membaca',
    ew_factor_comprehension: 'Kefahaman',
    ew_factor_focus:  'Fokus/Perhatian',
    ew_factor_participation: 'Penyertaan',
    ew_factor_multiple: 'Pelbagai Tanda Amaran',
    ew_submit_to_see: 'Lengkapkan dan hantar borang penilaian untuk melihat analisis risiko.',
    ew_submit_factors: 'Hantar penilaian untuk melihat faktor risiko.',
    ew_name_placeholder: 'Masukkan nama atau ID…',
    ew_alert_immediate: 'Intervensi Segera Diperlukan',
    ew_alert_below_avg: 'Prestasi Akademik Di Bawah Purata',
    ew_alert_multiple: 'Pelbagai Tanda Amaran Dikesan',
    ew_alert_proactive: 'Pemantauan Proaktif Disyorkan',
    ew_alert_none: 'Tiada Amaran Kritikal',
    ew_desc_high: 'Urgensi intervensi tinggi. Pelajar menunjukkan prestasi rendah berterusan dan pelbagai tanda amaran.',
    ew_desc_medium: 'Kebimbangan sederhana. Pantau dengan teliti dan pertimbangkan sokongan bertarget.',
    ew_desc_low: 'Pelajar mencapai prestasi yang mencukupi. Teruskan pemantauan berkala.',
    ew_no_risk_factors: 'Tiada faktor risiko kritikal dikenal pasti.',
    ew_toast_saved: 'Penilaian risiko disimpan ke papan pemuka',
    ew_footer_name: '⚠ Ejen Amaran Awal',
    ew_alert_desc_immediate: 'Skor risiko melebihi 65%. Sila hubungkan pelajar dengan perkhidmatan sokongan dengan segera.',
    ew_alert_desc_below_avg: 'Purata skor {avg}% adalah jauh di bawah tahap yang dijangkakan.',
    ew_alert_desc_multiple: '{n} tanda amaran serentak meningkatkan urgensi intervensi.',
    ew_alert_desc_medium: 'Tahap risiko sederhana. Jadualkan semakan pelajar dalam dua minggu akan datang.',
    ew_alert_desc_low: 'Pelajar nampaknya mengurus pada tahap yang boleh diterima. Teruskan pemantauan rutin.',
    ew_signs: 'tanda',
    iv_priority_1: 'P1 – Segera',
    iv_priority_2: 'P2 – Minggu Ini',
    iv_priority_3: 'P3 – Berterusan',
    iv_for_name: 'untuk',
    ew_trend_declining: '↓ Trend prestasi menurun selama 6 minggu – intervensi disyorkan',
    /* shared need / learning options */
    need_adhd:        'ADHD',
    need_dyslexia:    'Disleksia',
    /* intervention page */
    iv_page_title:    'Ejen Cadangan Intervensi',
    iv_page_subtitle: 'Strategi intervensi diperibadikan yang dijana AI, pelan tindakan dan sumber pembelajaran untuk setiap profil pelajar.',
    iv_medium_risk:   'Risiko Sederhana',
    iv_grade_p13:     'Tahun 1–3',
    iv_grade_p46:     'Tahun 4–6',
    iv_grade_s13:     'Tingkatan 1–3',
    iv_grade_s45:     'Tingkatan 4–5',
    iv_focus_att:     'Fokus / Perhatian',
    iv_read_fluency:  'Kelancaran Bacaan',
    iv_comprehension: 'Kefahaman',
    iv_writing:       'Penulisan',
    iv_maths:         'Matematik',
    iv_sup1:          'Guru Kelas Sahaja',
    iv_sup2:          'Pakar + Guru',
    iv_sup3:          'Keluarga + Sekolah',
    iv_sup4:          'Sokongan MDT Penuh',
    iv_bilingual:     'Dwibahasa',
    iv_plan_for:      'Pelan Intervensi untuk',
    iv_generated_by:  'Dijana oleh AI ·',
    iv_recommended_strategies: 'Strategi Disyorkan',
    iv_strategies_for: 'strategi diperibadikan untuk',
    iv_open_agent:    'Buka Ejen →',
    iv_action_timeline: 'Jadual Pelan Tindakan',
    iv_timeline_desc: 'Peta jalan intervensi langkah demi langkah',
    iv_recommended_resources: 'Sumber Disyorkan',
    iv_open:          'Buka →',
    iv_export_plan:   'Eksport Pelan',
    iv_back_risk:     '⚠ Kembali ke Penilaian Risiko',
    iv_read_aloud:    'Baca Kuat',
    iv_name_placeholder: 'Nama atau ID…',
    iv_weakness_label: 'Kelemahan:',
    iv_ai_rec_title: 'Cadangan AI Diperibadikan',
    iv_api_key_note: 'Tambah kunci API OpenRouter di Tetapan untuk cadangan AI diperibadikan.',
    iv_generating: 'Menjana pelan diperibadikan…',
    iv_specific_activities: 'Aktiviti Khusus',
    iv_footer_name: ' Ejen Cadangan Intervensi',
    dys_font_mode: 'Mod Fon',
    dys_text_size: 'Saiz Teks',
    dys_line_spacing: '↕ Jarak Baris',
    dys_colour_overlay: 'Lapisan Warna',
    dys_reading_ruler: 'Pembaris Bacaan',
    dys_enable_ruler: 'Aktifkan Pembaris Bacaan',
    dys_tts: 'Teks-ke-Suara',
    dys_read_aloud: '▶ Baca Teks Kuat-kuat',
    dys_speed: 'Kelajuan',
    dys_difficulty: 'Tahap Kesukaran Bacaan',
    dys_low_diff: 'Kesukaran Rendah',
    dys_med_diff: 'Kesukaran Sederhana',
    dys_high_diff: 'Kesukaran Tinggi',
    dys_reading_text: 'Teks Bacaan',
    dys_load_text: 'Muatkan Teks',
    dys_react: 'Analisis ReAct',
    dys_reading_display: 'Paparan Bacaan',
    dys_click_load: 'Klik Muatkan Teks untuk bermula.',
    dys_mind_map: 'Peta Minda Visual',
    dys_auto_map: 'Peta Minda Auto (Berasaskan Corak)',
    dys_map_empty: 'Muatkan teks dan klik Jana Peta Minda',
    dys_view_plan: 'Lihat Pelan Intervensi Penuh',
    dys_page_subtitle:   'Fon mesra disleksia, lapisan warna, pembaris bacaan, peta minda, dan sokongan intervensi.',
    dys_overlay_help:    'Lapisan warna mengurangkan tekanan visual dan meningkatkan keselesaan bacaan.',
    dys_ruler_help:      'Pembaris menerangi satu baris semasa tetikus bergerak di atas teks.',
    dys_size_lbl:        'Saiz',
    dys_spacing_lbl:     'Jarak',
    dys_skim_guide:      '⚡ Panduan Imbasan Pra-Bacaan',
    dys_placeholder:     'Tampal atau taip teks bacaan anda di sini…',
    dys_moderate_support:'Sokongan Sederhana:',
    dys_api_tip:         'Tambah kunci API OpenRouter anda dalam Tetapan untuk tips AI diperibadikan.',
    dys_page_title_full: 'Ejen Membaca Adaptif Disleksia',
    dys_font_normal:     'Normal',
    dys_font_lexend:     'Lexend',
    dys_font_od:         'OpenDyslexic',
    dys_load_prompt:     'Klik <strong>Muat Teks</strong> untuk mulakan.',
    dys_mindmap_prompt:  'Muat teks dan klik Jana Peta Minda',
    dys_font_desc:       'Lexend mengurangkan tekanan visual. OpenDyslexic menggunakan bahagian bawah berat untuk melekatkan huruf dan mengurangkan pembalikan.',
    dys_skim_guide_btn:  '⚡ Panduan Skim',
    dys_input_placeholder: 'Tampal atau taip teks bacaan anda di sini…',
    dys_footer_name:     'Ejen Membaca Adaptif Disleksia',
    dys_load_first:      'Muat teks dahulu.',
    dys_support_light:   ' <strong>Sokongan Ringan:</strong> Fon standard dengan lapisan kuning untuk kesukaran ringan.',
    dys_support_intensive: ' <strong>Sokongan Intensif:</strong> OpenDyslexic penuh + lapisan biru untuk kesukaran tinggi.',
    dys_strategy_moderate_desc: 'Fon OpenDyslexic. Hamparan hijau. Pembaris bacaan. TTS disyorkan. Sesi 10–15 min.',
    dys_overlay_none:    'Tiada (Putih) hamparan',
    dys_overlay_yellow:  'Hamparan Kuning',
    dys_overlay_blue:    'Hamparan Biru',
    dys_overlay_green:   'Hamparan Hijau',
    dys_overlay_pink:    'Hamparan Merah Jambu',
    dys_overlay_grey:    'Hamparan Kelabu',
    dys_letter_spacing:  'Jarak Huruf',
    dys_reading_speed:   'Kelajuan Membaca',
    btn_stop_audio:      '⏹ Henti Audio',
    btn_stop:            '⏹ Henti',
    btn_close:           'Tutup',
    ocr_cam_starting:    'Kamera dimulakan…',
    ocr_cam_switch:      'Tukar Kamera',
    ocr_cam_retake:      'Ambil Semula Foto',
    ocr_cam_tip:         'Tip: Pegang kamera dengan stabil untuk gambar yang jelas.',
    ocr_upload_title: 'Muat Naik Gambar Buku',
    ocr_take_photo: 'Ambil Foto',
    ocr_settings: '⚙ Tetapan OCR',
    ocr_lang_label: 'Bahasa',
    ocr_en_only: 'Bahasa Inggeris sahaja',
    ocr_auto_lang: 'Auto (Inggeris + BM)',
    ocr_rec_mode: 'Mod Pengecaman',
    ocr_accurate: 'Tepat (disyorkan)',
    ocr_fast: 'Pantas (kurang tepat)',
    ocr_single_word: 'Kata tunggal',
    ocr_confidence: 'Ambang Keyakinan',
    ocr_highlight_uncertain: 'Tandakan perkataan tidak pasti di bawah:',
    ocr_extract_btn: 'Ekstrak Teks',
    ocr_a11y: '♿ Aksesibiliti',
    ocr_text_size: 'Saiz Teks',
    ocr_colour_overlay: 'Lapisan Warna',
    ocr_line_spacing: 'Jarak Baris',
    ocr_extracted_text: 'Teks Diekstrak',
    ocr_empty_msg: 'Muat naik gambar dan klik Ekstrak Teks untuk bermula',
    ocr_tts: 'Teks-ke-Suara',
    ocr_status_ready: 'Sedia — muat naik gambar untuk bermula',
    ocr_page_title:   'Ejen Bacaan OCR',
    ocr_page_subtitle:'Muat naik imej buku atau foto teks bercetak — agen mengekstrak, membaca dengan kuat dan menjadikannya mudah diakses.',
    ocr_words:        'Perkataan',
    ocr_chars:        'Aksara',
    ocr_lines:        'Baris',
    ocr_read_time:    'Masa Baca',
    ocr_copy_btn:     'Salin',
    ocr_download_btn: 'Muat turun .txt',
    ocr_edit_btn:     'Edit teks',
    ocr_clear_btn:    'Padam',
    ocr_confidence_lbl: 'Keyakinan:',
    ocr_conf_high:    'Tinggi (>70%)',
    ocr_conf_med:     'Sederhana (50–70%)',
    ocr_conf_low:     'Rendah (<50%)',
    ocr_blind_tip:    'Tips Buta & Penglihatan Rendah:',
    ocr_page_counter: 'Halaman 1 daripada 1',
    ocr_append_btn:   'Tambah halaman seterusnya ke teks sedia ada',
    ocr_append_mode:  'Mod tambah — ekstraksi seterusnya akan ditambah ke teks sedia ada',
    ocr_hide_highlights: 'Sembunyi Sorotan',
    ocr_show_highlights: 'Tunjuk Sorotan',
    ocr_img_preview:  'Pratonton Gambar',
    ocr_kbd_shortcuts:'⌨ Pintasan Papan Kekunci',
    ocr_camera_title: 'Tangkap Kamera',
    ocr_camera_capture_btn: 'Ambil Gambar',
    ocr_camera_use_btn: 'Guna Gambar Ini',
    rc_a11y_header:     'Aksesibiliti',
    rc_text_size:       'Saiz Teks',
    rc_colour_overlay:  'Lapisan Warna',
    rc_status_ready:    'Sedia. Muatkan teks untuk bermula.',
    rc_stats_empty:     'Muatkan teks untuk lihat statistik.',
    rc_click_load:      'Klik Muat Teks untuk mulakan membaca.',
    rc_status_panel:    'Status',
    rc_footer_name:     ' Ejen Teman Membaca',
    rc_level_label:     'Tahap',
    rc_vocab_prompt:    'Klik perkataan untuk lihat definisinya:',
    rc_status_enter_text: 'Sila masukkan teks dahulu.',
    rc_status_loaded:   'Teks dimuat. Sedia untuk membaca.',
    rc_status_cleared:  'Dipadamkan.',
    rc_status_reading_aloud: 'Membaca teks dengan kuat…',
    rc_status_load_first: 'Muat teks dahulu.',
    rc_status_reading:  'Membaca dengan kuat…',
    rc_status_audio_guide: 'Panduan audio dimulakan.',
    rc_status_highlighted: 'Kata kunci diserlahkan.',
    rc_status_generating: 'Menjana soalan…',
    rc_status_questions_ready: 'Soalan dijana. Pilih jawapan anda dan tekan Hantar.',
    rc_auto_quiz_prompt: ' Anda telah membaca sebahagian besar teks! Uji Kefahaman',
    color_yellow:       'Kuning',
    color_green:        'Hijau',
    color_purple:       'Ungu',
    color_red:          'Merah',
    color_clear:        'Padam',
    adhd_focus_window_btn: 'Tetingkap Fokus',
    adhd_no_notes:      'Tiada nota lagi.',
    lib_book_search_title: 'Carian & Penemuan Buku',
    ar_font:            'Fon',
    ar_size:            'Saiz',
    ar_line:            'Baris',
    ar_para:            'Para',
    ar_mode:            'Mod',
    ar_session:         'Sesi',
    ar_focus:           'Fokus',
    ar_read:            'Baca',
    ar_visual_ai:       'AI Visual',
    ar_paste_title:     'Tampal Teks Buku',
    ar_start_reading:   '▶ Mula Membaca',
    ar_paste_ph:        'Atau tampal teks buku di sini…',
    ar_cors_msg:        'Kami tidak dapat mendapatkan teks secara automatik. Tampal teks di bawah.',
    ar_visual_ai_title: 'AI VISUAL',
    ar_mind_map:        'Peta Minda',
    ar_timeline:        'Garis Masa',
    ar_key_chars:       'Watak Utama',
    ar_key_places:      'Tempat Utama',
    ar_concept_diag:    'Diagram Konsep',
    ar_focus_mode:      'MOD FOKUS',
    ar_exit_focus:      'Keluar mod fokus',
    ar_prev_para:       'Perenggan sebelum',
    ar_next_para:       'Perenggan seterusnya',
    ar_read_this:       'Baca Ini',
    ar_break_title:     'Masa untuk Rehat Singkat',
    ar_break_msg:       'Anda telah membaca sebentar — rehatkan mata dan bernafas.',
    ar_skip_break:      'Langkau Rehat →',
    ar_checkpoint_title:'Semakan AI — Semak Pantas!',
    ar_loading_q:       'Memuatkan soalan…',
    ar_answer_placeholder: 'Taip jawapan anda di sini…',
    ar_submit:          'Hantar',
    ar_explain_again:   'Terangkan Semula',
    ar_continue:        'Teruskan →',
    agent_new:          'Baharu',
    agent_open:         'Buka',
    teacher_title:          'Agen Guru AI',
    teacher_subtitle:       'Guru maya anda — menerangkan, mengkuiz, menjawab soalan, membuat diagram dan peta minda, serta memotivasikan anda.',
    teacher_badge1:         '🤖 OpenRouter AI',
    teacher_badge2:         '📚 Penjana Kuiz',
    teacher_badge3:         '🗺️ Peta Minda',
    teacher_badge4:         '💪 Motivasi',
    teacher_api_notice:     'Kunci API OpenRouter diperlukan untuk ciri AI. Tetapkan kunci dalam Tetapan → Mod Prototaip aktif jika tiada kunci.',
    teacher_input_title:    '📄 Input Teks Bacaan',
    teacher_input_placeholder: 'Tampal atau taip teks bacaan di sini untuk Guru AI proses…',
    teacher_btn_explain:    '💡 Terangkan Ini',
    teacher_btn_simple:     '🔤 Perkataan Mudah',
    teacher_btn_bm:         '🇲🇾 Terang dalam BM',
    teacher_btn_en:         '🇬🇧 Terang dalam EN',
    teacher_thinking:       'Berfikir...',
    teacher_ask_title:      '💬 Tanya Guru',
    teacher_ask_placeholder:'Taip soalan anda di sini…',
    teacher_btn_ask:        '🙋 Tanya',
    teacher_motivation_title:'💪 Sudut Motivasi',
    teacher_btn_new_msg:    '✨ Mesej Baru',
    teacher_btn_read_aloud: '🔊 Baca Kuat',
    teacher_explain_title:  '📖 Penjelasan',
    teacher_output_placeholder:'Penjelasan akan muncul di sini…',
    teacher_btn_speak:      '🔊 Baca Kuat',
    teacher_btn_copy:       '📋 Salin',
    teacher_btn_save:       '💾 Simpan',
    teacher_quiz_title:     '📝 Penjana Kuiz',
    teacher_quiz_mcq:       '🎯 Pilihan Berganda',
    teacher_quiz_tf:        '✅ Betul / Salah',
    teacher_quiz_short:     '✍️ Jawapan Pendek',
    teacher_quiz_reflect:   '🤔 Refleksi',
    teacher_diagram_title:  '🗺️ Diagram & Peta Minda',
    teacher_diag_flow:      '📊 Carta Alir',
    teacher_diag_cause:     '🔍 Sebab & Akibat',
    teacher_diag_mindmap:   '🗺️ Peta Minda',
    teacher_diag_steps:     '📋 Langkah demi Langkah',
    teacher_inclusive_title:'♿ Sokongan Inklusif',
    teacher_blind_mode:     'Aktifkan Mod Pelajar Buta',
    teacher_deaf_mode:      'Aktifkan Mod Pelajar Pekak',
    teacher_adhd_mode:      'Aktifkan Mod ADHD',
    teacher_dyslexia_mode:  'Aktifkan Mod Disleksia',
    teacher_tts:            'Togol Teks ke Ucapan',
    ait_enable_blind:       'Aktifkan Mod Pelajar Buta',
    ait_enable_deaf:        'Aktifkan Mod Pelajar Pekak',
    ait_enable_adhd:        'Aktifkan Mod ADHD',
    ait_enable_dyslexia:    'Aktifkan Mod Disleksia',
    ait_toggle_tts:         'Togol Teks-ke-Suara',
    teacher_footer_note:    'Agen Guru AI · Prototaip',
    footer_tagline1:        'Ekosistem Pembelajaran Berbilang Deria Berasaskan AI untuk pendidikan inklusif di Malaysia dan seluruh dunia.',
    nav_teacher:            'Papan Pemuka Guru',
    nav_signup:             'Daftar',

    /* Enjin Avatar tetapan */
    ae_title:              'Enjin Avatar',
    ae_desc:               'Konfigurasikan sistem avatar AI profesional untuk persembahan Bahasa Isyarat Malaysia (BIM). Enjin secara automatik beralih ke pembekal sandaran jika satu gagal.',
    ae_active_provider:    'Pembekal Aktif',
    ae_no_api_key:         'Tiada Kunci API',
    ae_not_configured:     'Belum Dikonfigurasi',
    ae_available:          'Tersedia',
    ae_always_available:   'Sentiasa Tersedia',
    ae_heygen_desc:        'HeyGen menyediakan penstriman WebRTC untuk avatar bercakap hampir masa nyata. Dapatkan kunci API anda dari app.heygen.com → API.',
    ae_did_desc:           'D-ID menjana video kepala bercakap daripada foto dan teks. Dapatkan kunci API anda dari studio.d-id.com → API.',
    ae_nvidia_desc:        'NVIDIA ACE memerlukan penggunaan peringkat perusahaan (awan atau premis). Hubungi NVIDIA atau jabatan IT anda untuk titik akhir dan token.',
    ae_rpm_desc:           'Tiada kunci API diperlukan. Menggunakan subdomain RPM anda untuk membenamkan pencipta avatar 3D.',
    ae_test:               'Uji',
    ae_avatar_id:          'ID Avatar',
    ae_voice_id:           'ID Suara',
    ae_presenter_url:      'URL Imej Pembentang',
    ae_endpoint_url:       'URL Titik Akhir',
    ae_subdomain:          'Subdomain',
    ae_saved_avatar_url:   'URL Avatar Tersimpan:',
    ae_presentation:       'Tetapan Persembahan',
    ae_anim_quality:       'Kualiti Animasi',
    ae_quality_high:       'Tinggi',
    ae_quality_medium:     'Sederhana',
    ae_quality_low:        'Rendah (lebih pantas)',
    ae_language:           'Bahasa',
    ae_configured:         'Dikonfigurasi',
    ae_testing:            'Menguji…',
    skip_link:              'Langkau ke kandungan utama',
    skip_to_main:           'Langkau ke kandungan utama',
    pa_title:               'Agen Pemperibadian',
    pa_subtitle:            'Profil pembelajaran, pandangan, dan cadangan peribadi anda — semua di satu tempat.',
    pa_privacy_title:       '🔒 Data Anda Kekal di Peranti Anda',
    pa_privacy_desc:        'Semua data pemperibadian disimpan secara tempatan dalam pelayar anda. Tiada yang dihantar ke mana-mana pelayan.',
    pa_profile_title:       '👤 Profil Pembelajaran Anda',
    pa_stat_sessions:       'Sesi',
    pa_stat_mins:           'Minit',
    pa_stat_streak:         'Hari Berturut',
    pa_stat_completion:     'Penyelesaian',
    pa_stat_mode:           'Mod Pilihan',
    pa_stat_time:           'Masa Terbaik',
    pa_today_default:       'Teruskan — setiap sesi penting! 🌟',
    pa_insights_title:      '📊 Pandangan AI',
    pa_insights_loading:    'Menjana pandangan…',
    pa_recs_title:          '💡 Cadangan Peribadi',
    pa_recs_loading:        'Memuatkan cadangan…',
    pa_behaviour_title:     '🧠 Tingkah Laku Pembelajaran',
    pa_behaviour_desc:      'Cara anda berinteraksi dengan agen CelikSense.',
    pa_mode_audio:          'Audio / TTS',
    pa_mode_ocr:            'Pengimbasan OCR',
    pa_mode_typed:          'Input Menaip',
    pa_mode_sign:           'Bahasa Isyarat',
    pa_mode_braille:        'Mod Braille',
    pa_teacher_title:       '👩‍🏫 Maklum Balas Guru AI',
    pa_teacher_desc:        'Maklum balas peribadi daripada Agen Guru AI berdasarkan aktiviti terkini anda.',
    pa_teacher_loading:     'Memuatkan maklum balas guru…',
    pa_a11y_title:          '♿ Tetapan Kebolehcapaian',
    pa_a11y_current:        'Tetapan semasa:',
    pa_a11y_change:         'Tukar dalam Tetapan →',
    pa_reset_title:         '🔄 Tetapkan Semula Profil',
    pa_reset_desc:          'Padam semua data pemperibadian dan mulakan semula.',
    pa_reset_btn:           'Tetapkan Semula Profil Saya',
    pa_reset_confirm_msg:   'Anda pasti? Ini akan memadam semua data pembelajaran anda.',
    pa_reset_confirm_yes:   'Ya, Tetapkan Semula',
    pa_reset_cancel:        'Batal',
    td_hero_title:          'Papan Pemuka Guru',
    td_hero_sub:            'Pantau kemajuan pelajar, jejaki penglibatan, dan mulakan intervensi.',
    td_last_sync:           'Sinkronisasi terakhir:',
    td_refresh:             '↺ Muat Semula',
    td_summary_heading:     '📊 Ringkasan Kelas',
    td_total_students:      'Jumlah Pelajar',
    td_total_students_sub:  'berdaftar dalam CelikSense',
    td_active_week:         'Aktif Minggu Ini',
    td_active_week_sub:     'selesaikan sekurang-kurangnya satu sesi',
    td_avg_streak:          'Purata Hari Berturut',
    td_avg_streak_sub:      'hari aktif berturut-turut',
    td_top_agent:           'Agen Utama',
    td_top_agent_sub:       'paling banyak digunakan minggu ini',
    td_roster_heading:      '📋 Senarai Pelajar',
    td_add_student:         '+ Tambah Pelajar',
    td_col_name:            'Nama',
    td_col_disability:      'Keperluan Pembelajaran',
    td_col_agent:           'Agen Utama',
    td_col_sessions:        'Sesi',
    td_col_streak:          'Hari Berturut',
    td_col_last:            'Terakhir Aktif',
    td_col_status:          'Status',
    profile_dyslexia:       'Disleksia',
    profile_adhd:           'ADHD',
    profile_blind:          'Buta / Penglihatan Rendah',
    profile_deaf:           'Pekak / Masalah Pendengaran',
    td_days:                'hari',
    td_today:               'Hari Ini',
    td_yesterday:           'Semalam',
    td_2days:               '2 hari lalu',
    td_3days:               '3 hari lalu',
    status_on_track:        '✅ Mengikut Landasan',
    status_at_risk:         '⚠️ Berisiko',
    status_needs_attention:  '🚨 Perlu Perhatian',
    td_chart_heading:       '📈 Penglibatan Mingguan',
    td_alerts_heading:      '🔔 Amaran Aktif',
    td_alert_haziq:         'Haziq tidak log masuk selama 4 hari',
    td_alert_danial:        'Skor bacaan Danial jatuh di bawah 60',
    td_view_student:        'Lihat Pelajar',
    td_send_rec:            'Hantar Cadangan',
    td_alert_type_inactive: 'Tidak Aktif',
    td_alert_type_score:    'Skor Menurun',
    td_actions_heading:     '⚡ Tindakan Pantas',
    td_export:              '📄 Eksport Laporan',
    td_announce:            '📢 Hantar Pengumuman',
    td_schedule_meeting:    '📅 Jadualkan Mesyuarat',
    td_footer_note:         'Papan Pemuka Guru · CelikSense AI',
    ps_profile_summary:     'Ringkasan Profil Pembelajaran',
    ps_preferred_mode_label:'Mod Pilihan:',
    ps_view_full:           'Lihat Pemperibadian Penuh →',
    avatar_profile_section: '🤟 Avatar Bahasa Isyarat Saya',
    avatar_profile_ready:   'Avatar sedia',
    avatar_go_sign:         'Pergi ke Agen Bahasa Isyarat →',
    avatar_update:          'Kemas Kini Avatar',
    avatar_delete:          'Padam Avatar',
    avatar_no_avatar:       'Tiada avatar ditetapkan lagi.',
    avatar_create_now:      'Cipta sekarang →',
    avatar_sign_ocr:        'Tandatangan teks OCR dengan Avatar Saya',
    agent_lib:          'Pustakawan AI',
    agent_lib_desc:     'Cari dan cadangkan buku yang sesuai dengan profil pembelajaran dan keperluan aksesibiliti anda.',
    agent_read:         'Rakan Bacaan',
    agent_read_desc:    'Baca dengan bantuan AI – soalan kefahaman, perbendaharaan kata, dan sokongan audio.',
    agent_adhd:         'Ejen ADHD',
    agent_adhd_desc:    'Sesi bacaan mikro dengan pemasa fokus, tetingkap bacaan, dan pembina nota.',
    agent_dys:          'Disleksia / Sindrom Down',
    agent_dys_desc:     'Hamparan warna, fon mesra disleksia, pembaris bacaan, dan peta minda — atau bahasa dipermudahkan &amp; papan cerita untuk Sindrom Down.',
    ds_title:           'Agen Adaptif Sindrom Down',
    ds_subtitle:        'Bahasa dipermudahkan, papan cerita visual, latih tubi kosa kata, dan maklum balas positif — dibina untuk setiap pelajar.',
    ds_tool1:           'Bahasa Dipermudahkan',
    ds_tool1_desc:      'Tampal mana-mana teks. AI akan tulis semula dalam ayat pendek dan mudah.',
    ds_simplify:        '✨ Mudahkan Teks',
    ds_tool2:           'Papan Cerita Visual',
    ds_tool2_desc:      'Tukar teks kepada kad bergambar bernombor — satu idea setiap kad.',
    ds_makestory:       '🎴 Buat Papan Cerita',
    ds_tool3:           'Latih Tubi Kosa Kata',
    ds_tool3_desc:      'Perkataan utama dari teks dijadikan kad imbas. Ketik untuk lihat maksud.',
    ds_makedrill:       '🃏 Mula Latihan',
    ds_settings:        'Tetapan Paparan',
    ds_fontsize:        'Saiz Teks',
    ds_bgcolor:         'Warna Latar',
    ds_result:          '📝 Teks Dipermudahkan',
    ds_placeholder:     'Tampal teks di sebelah kiri dan tekan Mudahkan Teks untuk bermula.',
    ds_storyboard:      '🖼️ Papan Cerita Visual',
    ds_storyboard_sub:  'Setiap kad = satu idea. Baca mengikut urutan.',
    ds_drill:           '🃏 Latih Tubi Kosa Kata',
    ds_drill_ready:     'Sedia!',
    ds_tap:             'Ketik untuk lihat maksud',
    ds_again:           '🔁 Cuba Lagi',
    ds_got_it:          '✅ Faham!',
    ds_warm:            'Hangat',
    ds_mint:            'Mint',
    ds_lavender:        'Lavender',
    ds_white:           'Putih',
    ds_copy_text:       'Salin teks',
    ds_read_aloud:      'Baca Kuat',
    ds_story_board:     'Papan Cerita',
    ds_color_lavender:  'Lavender',
    rsh_last_mode:      'Mod terakhir:',
    rsh_mode_normal:    'BIASA',
    rsh_mode_dyslexia:  'DISLEKSIA',
    rsh_mode_blind:     'BUTA',
    rsh_ai_summary:     'Ringkasan AI',
    rsh_close_panel:    'Tutup Panel',
    rsh_close_modal:    'Tutup',
    ba_voice_control:   'Kawalan Suara',
    ds_simplified_output: 'Output teks dipermudahkan',
    ds_tap_reveal:      'Ketuk untuk lihat makna perkataan',
    ds_correct:         'betul',
    sl_visual_summary:  '📄 Ringkasan Visual',
    sl_visual_keywords: '🔑 Kata Kunci Visual',
    sl_mind_map:        '🗺 Peta Minda',
    sl_comic_sequence:  '📖 Urutan Komik',
    sl_page_title:           'Agen Komunikasi Visual',
    sl_page_subtitle:        'Sokongan Bacaan Mesra Deaf',
    sl_large_captions:       'Kapsyen Besar',
    sl_visual_keywords_badge:'Kata Kunci Visual',
    sl_mind_map_badge:       'Peta Minda',
    sl_comic_badge:          'Urutan Komik',
    sl_glossary_badge:       'Glosari',
    sl_prototype:            'Peringkat Prototaip:',
    sl_import_ocr:           'Import dari Ejen OCR',
    sl_import_rc:            'Import dari Rakan Bacaan',
    sl_input_text:           'Teks Input',
    sl_open_signsense:       'Buka Kamus SignSense',
    sl_prev_caption:         'Sebelum',
    sl_next_caption:         'Seterusnya',
    sl_text_input_aria:      'Teks Input',
    sl_download:             'Muat turun',
    sl_future_bim:           'Integrasi BIM Masa Hadapan',
    sl_bim_signbank_btn:     'Buka BIM Sign Bank',
    sl_bim_signbank_desc:    'Rujukan rasmi isyarat BIM Malaysia — bimsignbank.org',
    sl_bsl_btn:              'Buka Kamus BSL',
    sl_caption:              'KAPSYEN',
    sl_simplified:           'Ayat Dipermudahkan',
    sl_visual_kw:            'Kata Kunci Visual',
    sl_mind_map_out:         'Peta Minda',
    sl_story_seq:            'Jujukan Cerita Visual',
    sl_glossary_out:         'Glosari Kata-Kata Penting',
    agent_blind:             'Ejen Audio Buta',
    agent_blind_desc:   'Navigasi audio penuh dengan TTS, pintasan papan kekunci, dan arahan suara.',
    agent_sign:              'Ejen Komunikasi Visual',
    agent_sign_desc:         'Sokongan bacaan mesra Deaf dengan kapsyen besar, kata kunci visual, peta minda dan urutan komik.',
    agent_sign_badge:        'Sokongan Pekak',
    agent_celikverse:        'Perpustakaan CelikVerse',
    agent_celikverse_desc:   'Cari buku, buku audio, jurnal dan sumber pendidikan dari sumber terpercaya di seluruh dunia — Open Library, Gutenberg, Google Books, IAB & lain-lain.',
    agent_celikverse_badge:  '🌍 BARU',
    agent_iab:               'Perpustakaan IAB',
    agent_iab_desc:          'Layari koleksi Pusat Sumber IAB — buku baharu 2024/2025, e-buku PSP, dan Buletin IAB dengan pautan OPAC terus.',
    agent_iab_badge:         'Perpustakaan',
    agent_signsense:         'Kamus SignSense',
    agent_signsense_desc:    'Cari perkataan dan pelajari panduan bahasa isyarat asas melalui isyarat visual, kapsyen dan sokongan ejaan jari.',
    agent_signsense_badge:   'SignSense',
    agent_warn:         'Ejen Amaran Awal',
    agent_warn_desc:    'Penilaian risiko pelajar, pemantauan prestasi, dan amaran pendidik.',
    agent_inter:        'Ejen Intervensi',
    agent_inter_desc:   'Strategi peribadi, pelan tindakan, dan sumber terpilih untuk setiap keperluan.',
    agent_ocr:          'Ejen Bacaan OCR',
    agent_ocr_desc:     'Muat naik gambar buku untuk ekstrak teks dengan Tesseract.js, kemudian baca lantang dengan sokongan TTS penuh.',
    sign_start: '▶ Mula Isyarat', sign_pause: '⏸ Jeda', sign_stop: '⏹ Henti',
    sign_next: '⏭ Seterusnya', sign_prev: '⏮ Sebelumnya', sign_repeat: '🔁 Ulang',
    sign_slow: '🐢 Perlahan', sign_normal: '⚡ Laju Normal',
    sign_deaf_mode: 'Mod Pelajar Pekak', sign_bim_support: 'Sokongan Bacaan BIM',
    sign_original: 'Asal', sign_simplified: 'Dipermudahkan',
    sign_keywords: 'Kata Kunci', sign_visual_meaning: 'Makna Visual',
    sign_status_ready: 'Sedia', sign_status_signing: 'Berisyarat',
    sign_status_paused: 'Dijeda', sign_status_stopped: 'Dihenti',
    sign_load_ocr: 'Muatkan Teks OCR', sign_clear: 'Padam Teks',
    sign_prototype_note: 'Mod prototaip: Avatar mensimulasikan pergerakan bahasa isyarat. Versi akan datang akan mengintegrasikan dataset avatar BIM sebenar.',
    rc_btn_sign: '🤟 Tukar ke Bahasa Isyarat',
    ocr_btn_sign: '🤟 Buka dalam Ejen Bahasa Isyarat',
    braille_toggle: '⠃ Mod Braille',
    braille_output: 'Output Braille',
    braille_copy: 'Salin Braille',
    braille_original: 'Teks asal',
    braille_preview: 'Pratonton Braille',
    braille_device_title: 'Menggunakan dengan Peranti Braille',
    braille_device_en: 'Untuk membaca kandungan ini menggunakan peranti Braille boleh segar semula, sambungkan peranti Braille anda kepada komputer atau telefon dan aktifkan output Braille pada pembaca skrin. CelikSense AI menyediakan teks mesra pembaca skrin yang boleh dihantar kepada peranti tersebut.',
    braille_prototype: 'Mod prototaip: Penukar ini menggunakan Braille Gred 1 asas. Versi akan datang akan mengintegrasikan sokongan Braille Melayu penuh dan Braille singkatan.',
    braille_agent_title: '⠃ Ejen Output Braille',
    braille_agent_desc: 'Menyediakan teks sedia Braille untuk pengguna peranti Braille boleh segar semula.',
    braille_open: '⠃ Buka Mod Braille',
    braille_reading: 'Rakan Membaca',
    braille_ocr: 'OCR ke Braille',
    rc_btn_braille: '⠃ Tukar kepada Braille',
    ocr_btn_braille: '⠃ Tukar Teks OCR kepada Braille',
    ocr_upload_hint:  'Seret & lepas imej di sini, atau klik untuk cari. Menyokong JPG, PNG, WEBP, BMP, GIF, TIFF',
    ocr_initialising: 'Memulakan…',
    ocr_ready:        'Sedia',
    ocr_key_upload:   'Muat naik / buka pelayar fail',
    ocr_key_camera:   'Buka kamera untuk ambil foto',
    ocr_key_run:      'Jalankan OCR pada imej semasa',
    ocr_key_read:     'Baca teks yang diekstrak dengan kuat',
    ocr_key_stop:     'Henti pertuturan',
    ocr_key_copy:     'Salin teks ke papan klip',
    ocr_key_clear:    'Padam semua',
    ocr_footer_name:  ' Ejen Pembaca OCR',
    lbl_size:         'Saiz',
    lbl_spacing:      'Jarak',
    ps_agent_title: 'Ejen Pemperibadian AI',
    ps_agent_desc: 'Mempelajari gaya bacaan anda dan mencadangkan pengalaman terbaik.',
    ps_badge: 'AI Adaptif',
    ps_today: 'Cadangan untuk anda hari ini',
    ps_profile_summary: '📊 Ringkasan Profil Pembelajaran',
    ps_preferred_mode_label: 'Mod Pilihan: ',
    ps_view_full: '🧠 Lihat Profil Pembelajaran Penuh',
    ps_adaptive_title: '🧠 Cadangan Diperibadikan',
    ps_ocr_suggest_title: '🧠 Berdasarkan corak penggunaan anda',
    ps_privacy: 'Keutamaan pembelajaran anda disimpan secara setempat dalam pelayar ini untuk tujuan prototaip.',
    ps_page_title: 'Ejen Pemperibadian Pembelajaran AI',
    ps_page_subtitle: 'AI Adaptif yang mempelajari gaya bacaan anda',
    ps_section_profile: 'Profil Pembelajaran',
    ps_section_insights: 'Pandangan AI',
    ps_section_recs: 'Cadangan Diperibadikan',
    ps_section_behaviour: 'Tingkah Laku Bacaan',
    ps_section_teacher: 'Pandangan Guru & Ibu Bapa',
    ps_section_accessibility: 'Profil Kebolehcapaian',
    ps_reset_btn: 'Set Semula Data Pembelajaran',
    ps_reset_confirm: 'Adakah anda pasti? Ini akan memadam semua data pembelajaran anda.',
    ps_sessions: 'Sesi',
    ps_reading_time: 'Masa Membaca',
    ps_streak: 'Berturut-turut',
    ps_completion: 'Kadar Siap',
    ps_best_time: 'Masa Terbaik Membaca',
    ps_most_used: 'Ejen Paling Digunakan',
    teacher_agent_title: 'Ejen Guru AI',
    teacher_agent_desc: 'Menerangkan buku, menjana kuiz, menjawab soalan, mencipta peta minda, dan memotivasikan pelajar.',
    teacher_agent_badge: 'Guru Maya',
    teacher_title: 'Ejen Guru AI',
    teacher_subtitle: 'Guru maya anda — menerangkan, membuat kuiz, menjawab soalan, mencipta gambar rajah dan peta minda, dan memotivasikan anda.',
    teacher_badge1: '🤖 OpenRouter AI',
    teacher_badge2: '📚 Penjana Kuiz',
    teacher_badge3: '🗺️ Peta Minda',
    teacher_badge4: '💪 Motivasi',
    teacher_api_notice: 'Kunci API OpenRouter diperlukan untuk ciri AI. Tetapkan kunci dalam Tetapan → Mod prototaip aktif jika tiada kunci.',
    teacher_input_title: '📄 Input Teks Bacaan',
    teacher_ask_title: '💬 Tanya Guru',
    teacher_motivation_title: '💪 Sudut Motivasi',
    teacher_explain_title: '📖 Penjelasan',
    teacher_quiz_title: '📝 Penjana Kuiz',
    teacher_diagram_title: '🗺️ Gambar Rajah & Peta Minda',
    teacher_inclusive_title: '♿ Sokongan Inklusif',
    teacher_blind_mode: '🎙️ Mod Buta',
    teacher_deaf_mode: '🖐️ Mod Pekak',
    teacher_adhd_mode: '⚡ Mod ADHD',
    teacher_dyslexia_mode: '📖 Mod Disleksia',
    teacher_tts: '🔊 TTS Auto',
    teacher_open_btn: '👩‍🏫 Tanya Guru AI',
    teacher_footer_note: 'Ejen Guru AI · Prototaip',
    avatar_agent_title: 'Avatar Bahasa Isyarat Peribadi AI',
    avatar_agent_desc: 'Avatar AI anda sendiri menterjemahkan buku dan bahan pembelajaran ke dalam Bahasa Isyarat Malaysia (BIM).',
    avatar_badge: 'Avatar Saya',
    avatar_profile_section: '👤 Avatar Bahasa Isyarat Saya',
    avatar_profile_ready: 'Avatar bersedia untuk menandatangani',
    avatar_go_sign: '🤟 Mula Tanda Tangan',
    avatar_update: '📷 Kemas Kini Avatar',
    avatar_delete: '🗑️ Padam',
    avatar_no_avatar: 'Tiada avatar dicipta lagi.',
    avatar_create_now: '📷 Cipta Avatar Saya',
    avatar_create_title: '📷 Cipta Avatar Saya',
    avatar_step1: 'Langkah 1: Ambil Foto',
    avatar_step2: 'Langkah 2: Sesuaikan',
    avatar_step3: 'Langkah 3: Siap!',
    avatar_use_webcam: '📷 Guna Kamera Web',
    avatar_upload: '📁 Muat Naik Foto',
    avatar_capture: '✅ Ambil Foto',
    avatar_hairstyle: 'Pilih Gaya Rambut',
    avatar_name_label: 'Apa nama anda?',
    avatar_speed_label: 'Kelajuan Tanda Tangan',
    avatar_start_signing: '🤟 Mula Tanda Tangan',
    avatar_ready: '🎉 Avatar anda sudah siap!',
    avatar_prototype_note: 'Prototaip: Avatar SVG berdasarkan warna foto anda. Versi akan datang akan menggunakan teknologi avatar 3D.',

    /* Ejen Penemuan Buku */
    bd_title:           'Ejen Penemuan Buku AI',
    bd_subtitle:        'Cari bahan bacaan sah dan hantarkan ke mana-mana alat aksesibiliti CelikSense.',
    bd_search_hint:     'Cari mengikut tajuk, subjek, tahap, pengarang atau minat…',
    bd_search_btn:      'Cari',
    bd_sources_title:   'Pilih Sumber Buku',
    bd_results_title:   'Keputusan Carian',
    bd_my_library:      'Perpustakaan Saya',
    bd_send_to:         'Hantar ke Alatan',
    bd_send_teacher:    'Baca dengan Guru AI',
    bd_send_companion:  'Buka dalam Rakan Bacaan',
    bd_send_audio:      'Tukar ke Audio',
    bd_send_braille:    'Tukar ke Braille',
    bd_send_bim:        'Terjemah ke BIM',
    bd_send_adhd:       'Mod ADHD',
    bd_send_dyslexia:   'Mod Disleksia',
    bd_save_lib:        'Simpan ke Perpustakaan Saya',
    bd_badge_owned:     'Milik Pengguna',
    bd_badge_public:    'Domain Awam',
    bd_badge_preview:   'Pratonton Sahaja',
    bd_badge_library:   'Akses Perpustakaan',
    bd_badge_ocr:       'Perlu OCR',
    bd_badge_learning:  'Bahan Pembelajaran',
    bd_src_upload_pdf:  'Muat Naik PDF',
    bd_src_scan:        'Imbas Buku Fizikal',
    bd_src_gutenberg:   'Project Gutenberg',
    bd_src_openlibrary: 'Open Library',
    bd_src_gbooks:      'Pratonton Google Books',
    bd_src_school:      'Perpustakaan Sekolah',
    bd_src_uni:         'Perpustakaan Universiti',
    bd_src_gdrive:      'Google Drive',
    bd_src_onedrive:    'OneDrive',
    bd_src_community:   'Bahan Komuniti',
    bd_opac_title:      'Penyambung OPAC Perpustakaan',
    bd_opac_note:       'Integrasi OPAC memerlukan kebenaran daripada perpustakaan sekolah atau universiti.',
    bd_opac_name:       'Nama Perpustakaan',
    bd_opac_url:        'URL OPAC',
    bd_opac_keyword:    'Kata Kunci Carian',
    bd_opac_id:         'ID Pengguna Perpustakaan (pilihan)',
    bd_opac_search:     'Cari Perpustakaan',
    bd_community_title: 'Bahan Pembelajaran Komuniti',
    bd_community_note:  'Kongsi rumusan, nota, peta minda, dan kuiz — bukan buku berhak cipta penuh.',
    bd_community_share: 'Kongsi Bahan Pembelajaran',
    bd_copyright_notice:'CelikSense AI membantu pengguna mengakses dan mengubah bahan bacaan yang sah ke format boleh akses. Ia tidak menyimpan atau mengedarkan semula buku berhak cipta tanpa kebenaran.',
    bd_read_btn:        'Buka dengan CelikSense',
    bd_no_results:      'Tiada keputusan ditemui. Cuba kata kunci lain.',
    bd_loading:         'Mencari…',
    bd_agent_desc:      'Cari bahan bacaan sah daripada buku domain awam, fail peribadi, sistem perpustakaan dan pratonton yang diluluskan.',
    bd_agent_badge:     'Penemuan Buku',
    iab_nav_bd:         '← Penemuan Buku',
    iab_nav_lib:        ' Pustakawan AI',
    bd_avail_gutenberg: 'Tersedia di Project Gutenberg',
    bd_avail_preview:   'Tersedia sebagai pratonton',
    bd_avail_upload:    'Muat naik salinan anda sendiri',
    bd_avail_library:   'Minta akses daripada perpustakaan anda',
    bd_saved_ok:        'Disimpan ke Perpustakaan Saya.',
    bd_sent_ok:         'Kandungan dihantar. Membuka ejen…',
    bd_library_empty:   'Perpustakaan anda kosong. Simpan buku dari hasil carian di atas.',
    bd_upload_heading:  ' Muat Naik Buku atau Dokumen Anda',
    bd_upload_text:     'Klik atau seret untuk muat naik PDF atau dokumen',
    bd_upload_sub:      'Menyokong PDF, DOC, DOCX, TXT — fail anda kekal dalam pelayar anda sahaja',
    bd_scan_desc:       'Gunakan Ejen OCR untuk mengambil foto halaman dan ekstrak teks secara automatik.',
    bd_scan_open:       ' Buka Pengimbas OCR',
    bd_scan_notice:     'Penting: Hanya imbas buku yang anda miliki atau yang berada dalam domain awam.',
    bd_drive_heading:   '☁ Import dari Google Drive',
    bd_drive_desc:      'Import dokumen dari Google Drive anda.',
    bd_drive_btn:       '☁ Sambung Google Drive (Akan Datang)',
    bd_upload_instead:  ' Muat Naik Fail',
    bd_onedrive_heading:'☁ Import dari OneDrive',
    bd_onedrive_btn:    '☁ Sambung OneDrive (Akan Datang)',
    bd_src_university:  'Perpustakaan Universiti',
    bd_scan_heading:    ' Imbas Buku Fizikal',
    bd_proto_gdrive:    'Mod prototaip: Integrasi Google Drive OAuth dirancang untuk Fasa 2. Buat masa ini, muat naik fail anda terus menggunakan pilihan Muat Naik PDF.',
    bd_proto_onedrive:  'Mod prototaip: Integrasi OneDrive dirancang untuk Fasa 2. Muat naik fail anda terus buat masa ini.',
    bd_copyright_label: 'Polisi Hak Cipta:',
    bd_send_iab:        'Perpustakaan IAB',
    bd_send_signsense:  'Kamus SignSense',
    bd_send_shelf:      'Rak Buku Maya',
    bd_send_ocr:        'Ejen OCR',
    bd_download_aria:   'Muat turun buku ini untuk bacaan luar talian',
    bd_search_placeholder: 'Cari buku…',
    bd_ai_companion:       'Rakan AI',
    bd_saved_subtitle:     'Buku dan bahan yang disimpan',
    bd_gov_portal:         'PORTAL KERAJAAN',
    bd_opac_library_name:  'cth. SMK Taman Melati',
    bd_opac_student_id:    'ID pelajar atau kakitangan',
    bd_opac_search_term:   'Sains Tingkatan 2',
    bd_uni_library_name:   'cth. Perpustakaan Utama UKM',
    bd_uni_subject:        'Psikologi Pendidikan',
    bd_uni_matric:         'Nombor matrik pelajar',
    bd_future_opac:        'Integrasi masa hadapan: Koha, SLiMS, dan API OPAC standard.',
    bd_community_placeholder: 'Tampal nota, ringkasan, atau kuiz di sini…',
    bd_onedrive_desc:      'Import dokumen dari Microsoft OneDrive anda. Memerlukan pengesahan akaun Microsoft.',
    bd_community_label:    'Bahan Pembelajaran Komuniti',
    hub_mode_braille_reader: 'Pembaca Braille',
    hub_ai_teacher:     'Guru AI',
    hub_ai_reading:     'Teman Membaca',
    hub_section_a11y_full: 'Mod Aksesibiliti (Accessibility Modes)',
    hub_section_ai_full: 'Pengalaman AI (AI Experiences)',
    lib_footer_name:    ' Ejen Pustakawan AI',
    lib_search_placeholder: 'Cari buku mengikut tajuk, pengarang, atau topik…',
    bd_open_celiksense: 'Buka dengan CelikSense',
    bd_type_note:       'Nota',
    bd_type_summary:    'Ringkasan',
    bd_type_mindmap:    'Peta Minda',
    bd_type_quiz:       'Kuiz',
    bd_type_vocab:      'Kosa Kata',
    lbl_title:          'Tajuk',
    lbl_type:           'Jenis',
    lbl_content:        'Kandungan',
    lbl_by:             'oleh',
    lbl_loading:        '⏳ Memuatkan…',
    btn_save:           'Simpan',
    btn_share:          'Kongsi',

    /* CelikVerse Library */
    cv_subtitle:    'Satu Carian. Banyak Koleksi. Aksesibiliti Tanpa Had.',
    cv_iab_title:   'Rak Buku Maya IAB',
    cv_demo_badge:  'Demo',
    cv_mode_blind:  'Pembaca Buta',
    cv_mode_dyslexia: 'Pembaca Disleksia',
    cv_mode_adhd:   'Pembaca ADHD',
    cv_mode_deaf:   'Pembaca Pekak',
    cv_mode_reading: 'Teman Membaca',
    cv_mode_teacher: 'Guru AI',
    cv_cat_default:  'Umum',

    /* My Knowledge Hub */
    hub_title:      'Hab Ilmu Saya',
    hub_open_access: 'Akses Terbuka',
    hub_ai_panel:   'Panel AI',
    hub_mode_blind: 'Buta',
    hub_mode_low_vision: 'Penglihatan Rendah',
    hub_mode_dyslexia: 'Disleksia',
    hub_mode_adhd:  'ADHD',
    hub_mode_deaf:  'Pekak',
    hub_mode_standard: 'Standard',
    hub_mode_audio: 'Audio',
    hub_mode_blind_reader:    'Pembaca Buta',
    hub_mode_low_vision_reader: 'Penglihatan Rendah',
    hub_mode_dyslexia_reader: 'Pembaca Disleksia',
    hub_mode_adhd_reader:     'Pembaca ADHD',
    hub_mode_deaf_reader:     'Pembaca Pekak',
    hub_mode_audio_reader:    'Pembaca Audio',
    hub_mode_standard_reader: 'Pembaca Standard',

    /* Navigasi umum */
    nav_back_dashboard: '← Papan Pemuka',
    footer_copy:        '© 2026 CelikSense AI · ',

    /* Tab Profil */
    prof_tab_overview:      'Gambaran Keseluruhan',
    prof_tab_settings:      'Tetapan Profil',
    prof_tab_a11y:          'Aksesibiliti',
    prof_tab_activity:      'Aktiviti',
    prof_tab_achievements:  'Pencapaian',

    /* Profil — bahagian kemajuan pembelajaran */
    prof_learning_progress: ' Kemajuan Pembelajaran',
    prof_reading_progress:  'Kemajuan Bacaan',
    prof_comprehension_lbl: 'Kefahaman',
    prof_chapters_label:    '3 daripada 5 bab',
    prof_above_average:     'Lebih tinggi dari purata',
    prof_improving:         'Meningkat ←',
    prof_currently_reading: ' Sedang Dibaca',
    prof_find_more_books:   'Cari Lebih Buku',
    prof_ai_recommendation: ' Cadangan AI',
    prof_based_on_sessions: 'Berdasarkan 7 sesi terakhir anda',
    prof_continue:          'Teruskan',
    prof_read_btn:          'Baca',
    prof_open_adhd:         'Buka Ejen ADHD',
    prof_full_plan:         'Pelan Penuh',
    prof_done_badge:        'Selesai',
    prof_badge_active:      'AKTIF',
    prof_badge_bilingual:   'DWIBAHASA',
    prof_personal_info:     ' Maklumat Peribadi',
    prof_full_name:         'Nama Penuh',
    prof_display_id:        'ID Paparan / Nama Pengguna',
    prof_email:             'Alamat E-mel',
    prof_role:              'Peranan',
    prof_role_student:      'Pelajar',
    prof_role_teacher:      'Guru / Pendidik',
    prof_role_parent:       'Ibu Bapa / Penjaga',
    prof_role_admin:        'Pentadbir Sekolah',
    prof_learning_need_lbl: 'Keperluan Pembelajaran Utama',
    prof_need_blind:        'Buta / Penglihatan Rendah',
    prof_need_deaf:         'Pekak / Pendengaran Lemah',
    prof_need_general:      'Pelajar Umum',
    prof_grade_lbl:         'Tahap Gred',
    prof_lang_pref_lbl:     'Pilihan Bahasa',
    prof_lang_en:           'Bahasa Inggeris',
    prof_lang_bilingual:    'Dwibahasa (EN + BM)',
    prof_interests_lbl:     'Minat (untuk padanan buku)',
    prof_session_len_lbl:   'Tempoh Sesi Lalai',
    prof_break_len_lbl:     'Tempoh Rehat',
    prof_save_btn:          '✓ Simpan Profil',
    prof_reset_btn:         'Set Semula',
    prof_visual_a11y:       'Aksesibiliti Visual',
    prof_audio_a11y:        'Aksesibiliti Audio',
    prof_nav_prefs:         'Pilihan Navigasi',
    prof_dyslexia_font:     'Fon OpenDyslexic',
    prof_dyslexia_font_desc:'Gunakan fon mesra disleksia di semua kawasan bacaan',
    prof_colour_overlay_lbl:'Lapisan Warna',
    prof_colour_desc:       'Warna lapisan bacaan lalai',
    prof_large_text:        'Mod Teks Besar',
    prof_large_text_desc:   'Tingkatkan saiz fon lalai di semua halaman',
    prof_high_contrast:     'Mod Kontras Tinggi',
    prof_high_contrast_desc:'Tingkatkan kontras untuk pelajar penglihatan rendah',
    prof_ruler_lbl:         'Pembaris Bacaan',
    prof_ruler_desc:        'Paparkan pembaris bacaan lalai di semua halaman',
    prof_auto_read:         'Baca Auto Semasa Halaman Dibuka',
    prof_auto_read_desc:    'Mulakan panduan audio secara automatik apabila ejen dibuka',
    prof_tts_speed:         'Kelajuan TTS',
    prof_tts_speed_desc:    'Kadar ucapan lalai untuk semua Teks-ke-Suara',
    prof_tts_lang:          'Bahasa TTS',
    prof_tts_lang_desc:     'Bahasa output suara (mengikut bahasa UI secara lalai)',
    prof_kbd_hints:         'Petunjuk Navigasi Papan Kekunci',
    prof_kbd_hints_desc:    'Tunjukkan petunjuk pintasan papan kekunci di halaman ejen',
    prof_reduced_motion:    'Gerakan Dikurangkan',
    prof_reduced_motion_desc:'Kurangkan animasi di semua halaman',
    prof_save_a11y_btn:     '✓ Simpan Tetapan Aksesibiliti',
    prof_recent_activity:   'Aktiviti Terkini',
    prof_clear_all:         'Kosongkan Semua',
    prof_achievements_title:'Pencapaian',
    prof_col_none:          'Tiada',
    prof_col_yellow:        'Kuning',
    prof_col_blue:          'Biru',
    prof_col_green:         'Hijau',
    prof_col_pink:          'Merah Jambu',
    prof_col_grey:          'Kelabu',
    prof_tts_slow:          'Perlahan (0.6×)',
    prof_tts_normal:        'Normal (0.9×)',
    prof_tts_fast:          'Pantas (1.2×)',
    prof_tts_vfast:         'Sangat Pantas (1.5×)',
    prof_tts_auto:          'Auto (mengikut UI)',
    prof_primary1:          'Tahun 1',
    prof_primary2:          'Tahun 2',
    prof_primary3:          'Tahun 3',
    prof_primary4:          'Tahun 4',
    prof_primary5:          'Tahun 5',
    prof_primary6:          'Tahun 6',
    prof_secondary1:        'Tingkatan 1',
    prof_secondary2:        'Tingkatan 2',
    prof_secondary3:        'Tingkatan 3',
    prof_secondary4:        'Tingkatan 4',
    prof_secondary5:        'Tingkatan 5',
    prof_need_adhd:         'ADHD',
    prof_need_dyslexia:     'Disleksia',
    prof_grade_none:        'Tidak dinyatakan',
    prof_grade_uni:         'Universiti',
    prof_stat_sessions:     'Sesi',
    prof_stat_reading_time: 'Masa Membaca',
    prof_stat_streak:       'Jujukan',
    prof_stat_completion:   'Penyiapan',
    prof_badges_desc:       'Kumpul lencana dengan melengkapkan sesi membaca dan mencapai pencapaian.',
    prof_saved_msg:         'Disimpan!',
    prof_save_success:      'Profil berjaya disimpan!',
    prof_clear_confirm:     'Padam semua aktiviti? Tindakan ini tidak boleh dibatalkan.',
    prof_no_activity:       'Tiada aktiviti direkodkan lagi.',
    prof_delete_avatar:     'Padam avatar anda?',
    badge_first_session:    'Sesi Pertama',
    badge_book_worm:        'Ulat Buku',
    badge_time_keeper:      'Penjaga Masa',
    badge_sharp_focus:      'Fokus Tajam',
    badge_colour_explorer:  'Penjelajah Warna',
    badge_sign_learner:     'Pelajar Isyarat',
    badge_audio_nav:        'Navigasi Audio',
    badge_intervention_pro: 'Pro Intervensi',
    badge_week_streak:      'Berturut Seminggu',
    badge_all_rounder:      'Serba Boleh',
    badge_chapter_done:     'Bab Selesai',
    badge_adhd_champ:       'Juara ADHD',
    badge_first_session_desc:   'Selesaikan sesi bacaan pertama anda',
    badge_book_worm_desc:       'Tambah 3 buku ke senarai bacaan',
    badge_time_keeper_desc:     'Selesaikan 5 sesi ADHD bermasa',
    badge_sharp_focus_desc:     'Capai skor fokus 80+',
    badge_colour_explorer_desc: 'Cuba semua 5 lapisan warna',
    badge_sign_learner_desc:    'Pelajari 10 isyarat BIM',
    badge_audio_nav_desc:       'Guna ejen audio buta 3 kali',
    badge_intervention_pro_desc:'Jana pelan intervensi penuh',
    badge_week_streak_desc:     'Log masuk 7 hari berturut-turut',
    badge_all_rounder_desc:     'Guna semua 8 ejen AI',
    badge_chapter_done_desc:    'Habiskan satu bab buku penuh',
    badge_adhd_champ_desc:      'sesi ADHD diselesaikan',
    act_tag_focus:          'Fokus',
    act_tag_reading:        'Bacaan',
    act_tag_library:        'Perpustakaan',
    act_tag_a11y:           'Aksesibiliti',
    act_tag_low_risk:       'Risiko Rendah',
    act_tag_plan:           'Pelan',
    act_tag_sign:           'Isyarat',
    act_tag_complete:       'Selesai',

    /* Log aktiviti — tajuk boleh terjemah */
    act_title_adhd_focus:         'ADHD Agent – Sesi Fokus 10 min',
    act_title_reading_ch3:        'Rakan Bacaan – The Magic of Reading Bab 3',
    act_title_library_added:      'Pustakawan AI – Ditambah "Dunia Sains Kita"',
    act_title_dyslexia_overlay:   'Ejen Disleksia – Hamparan Hijau diaktifkan',
    act_title_early_warning:      'Amaran Awal – Penilaian risiko selesai',
    act_title_intervention:       'Pelan Intervensi – Strategi ADHD dijana',
    act_title_sign_lang:          'Bahasa Isyarat – Latih abjad BIM A–M',
    act_title_reading_done:       'Rakan Bacaan – My First Science Book selesai',

    /* Profile — kunci i18n baharu */
    prof_status_online:           'Dalam Talian',
    prof_my_avatar:               'Avatar Saya',
    prof_open_ai_teacher:         'Buka Ejen Guru AI',
    prof_chapter_of:              'Bab {n} daripada {total}',
    prof_chapter:                 'Bab',
    prof_of:                      'dari',
    prof_complete:                'Selesai ✓',
    prof_email_placeholder:       'Alamat e-mel anda',
    prof_interests_placeholder:   'cth. sains, bola sepak, muzik…',
    prof_display_name_placeholder:'Nama paparan',
    prof_grade_year1:             'Tahun 1',
    prof_grade_year2:             'Tahun 2',
    prof_grade_year3:             'Tahun 3',
    prof_grade_year4:             'Tahun 4',
    prof_grade_year5:             'Tahun 5',
    prof_grade_year6:             'Tahun 6',
    prof_grade_form1:             'Tingkatan 1',
    prof_grade_form2:             'Tingkatan 2',
    prof_grade_form3:             'Tingkatan 3',
    prof_grade_form4:             'Tingkatan 4',
    prof_grade_form5:             'Tingkatan 5',

    /* Tetapan — butang lapisan dan dropdown profil */
    set_overlay_none:             'Tiada',
    set_overlay_yellow:           'Kuning',
    set_overlay_blue:             'Biru',
    set_overlay_green:            'Hijau',
    set_overlay_grey:             'Kelabu',
    set_overlay_pink:             'Merah Jambu',
    set_need_general:             'Umum',
    set_need_adhd:                'ADHD',
    set_need_dyslexia:            'Disleksia',
    set_need_blind:               'Buta / Penglihatan Terhad',
    set_need_deaf:                'Pekak / Pendengaran Terhad',

    /* Pustakawan AI */
    lib_book_search:        'CARIAN & PENEMUAN BUKU',
    lib_learner_profile:    'PROFIL PELAJAR',
    lib_learning_need:      'KEPERLUAN PEMBELAJARAN',
    lib_grade_level:        'TAHAP GRED',
    lib_language_filter:    'BAHASA',
    lib_all_learners:       'Semua Pelajar',
    lib_blind_low:          'Buta / Penglihatan Rendah',
    lib_deaf_hard:          'Pekak / Pendengaran Lemah',
    lib_primary_13:         'Tahun 1–3',
    lib_primary_46:         'Tahun 4–6',
    lib_secondary_13:       'Menengah 1–3',
    lib_secondary_45:       'Menengah 4–5',
    lib_higher_ed:          'Pendidikan Tinggi',
    lib_english:            'Bahasa Inggeris',
    lib_bilingual:          'Dwibahasa',
    lib_get_ai_recs:        'Dapatkan Cadangan AI',
    lib_ai_recs_title:      'CADANGAN AI',
    lib_ai_recs_empty:      'Tetapkan profil pelajar anda dan klik Dapatkan Cadangan AI.',
    lib_find_more_title:    'CARI LEBIH BUKU',
    lib_find_more_desc:     'Cari buku domain awam, sambungkan perpustakaan sekolah anda, atau muat naik fail sendiri.',
    lib_open_discovery:     'Buka Ejen Penemuan Buku →',
    lib_my_list_title:      'SENARAI BACAAN SAYA',
    lib_my_list_empty:      'Tambah buku dengan mengklik "Tambah ke Senarai" pada kad buku.',

    /* Rakan Bacaan */
    rc_input_title:     'MASUKKAN TEKS UNTUK DIBACA',
    rc_reading_area:    'KAWASAN BACAAN',
    rc_comp_questions:  'SOALAN KEFAHAMAN',
    rc_comp_empty:      'Muatkan teks dan klik Jana Soalan.',
    rc_gen_questions:   'Jana Soalan',
    rc_vocab_helper:    'PEMBANTU KOSA KATA',
    rc_vocab_empty:     'Tiada entri kosa kata dijumpai.',
    rc_reading_stats:   'STATISTIK BACAAN',
    rc_words_lbl:       'Patah Perkataan',
    rc_sentences_lbl:   'Ayat',
    rc_min_read:        'Min Baca',
    rc_speed_lbl:       'Kelajuan:',
    rc_slow:            'Perlahan',
    rc_normal_speed:    'Normal',
    rc_fast:            'Laju',
    rc_very_fast:       'Sangat Laju',
    rc_load_text:       'Muatkan Teks',
    rc_react:           'ReAct',
    rc_text_size:       'SAIZ TEKS',
    rc_colour_overlay:  'HAMPARAN WARNA',
    rc_status_ready:    'Teks dimuatkan. Sedia untuk dibaca.',
    rc_blind_guide_lbl: 'Panduan Audio untuk Pelajar Buta',
    rc_read_text_aloud: 'Baca Teks Kuat-kuat',
    rc_highlight_keys:  'Tandakan Kata Kunci',

    /* Ejen ADHD */
    adhd_micro_title:   '⏱ SESI BACAAN MIKRO',
    adhd_session_len:   'Tempoh Sesi:',
    adhd_session_timer: 'Pemasa Sesi',
    adhd_start_session: '▶ Mula Sesi',
    adhd_interest_title:'MINAT & STRATEGI',
    adhd_my_interests:  'MINAT SAYA',
    adhd_reading_mode:  'MOD BACAAN',
    adhd_focus_window:  'Mod Tetingkap Fokus',
    adhd_chunk_mode:    'Mod Bacaan Bahagian',
    adhd_free_mode:     'Mod Bacaan Bebas',
    adhd_gen_strategy:  'Jana Strategi ReAct',
    adhd_reading_area:  'KAWASAN BACAAN',
    adhd_good_focus:    'Tahap Fokus Baik',
    adhd_simulate:      '↻ Simulasi Skor',
    adhd_multi_book:    'STRATEGI PELBAGAI BUKU',
    adhd_high_focus:    'Fokus Tinggi: Sains / Matematik',
    adhd_med_focus:     'Fokus Sederhana: Cerita',
    adhd_low_focus:     'Fokus Rendah: Komik / BIM',
    adhd_note_builder:  'PEMBINA NOTA AI',
    adhd_no_notes:      'Tiada nota lagi.',
    adhd_export_notes:  'Eksport Nota',
    adhd_intervention:  'INTERVENSI ADHD',
    adhd_intervention_empty: 'Mulakan sesi untuk menerima intervensi bacaan ADHD yang diperibadikan.',
    adhd_view_plan:     'Lihat Pelan Intervensi Penuh',

    /* Mod Luar Talian */
    offline_banner:         'Mod Luar Talian Diaktifkan — Pembelajaran Tanpa Halangan Internet.',
    offline_banner_sub:     'Kandungan yang dimuat turun, alatan dan tetapan masih tersedia.',
    offline_sync_banner:    'Menyegerakkan kemajuan pembelajaran anda…',
    offline_sync_done:      'Segerak selesai. Semua kemajuan disimpan.',
    offline_download_btn:   'Muat Turun untuk Luar Talian',
    offline_remove_btn:     'Buang Salinan Luar Talian',
    offline_saved:          'Disimpan untuk bacaan luar talian.',
    offline_removed:        'Salinan luar talian dibuang.',
    offline_ai_fallback:    'Mod Luar Talian: Menunjukkan sumber pembelajaran AI yang dicache.',
    offline_no_ai:          'Ciri AI memerlukan sambungan internet.',
    offline_lib_title:      'Perpustakaan Luar Talian',
    offline_lib_subtitle:   'Buku yang dimuat turun, imbasan OCR, nota dan kandungan cache anda.',
    offline_tab_downloads:  'Buku Dimuat Turun',
    offline_tab_ocr:        'Cache OCR',
    offline_tab_notes:      'Nota & Kuiz',
    offline_tab_ai:         'Cache AI',
    offline_tab_storage:    'Storan',
    offline_empty:          'Tiada apa-apa lagi. Muat turun kandungan semasa dalam talian untuk dibaca tanpa internet.',
    offline_storage_title:  'Penggunaan Storan',
    offline_storage_used:   'Digunakan',
    offline_storage_free:   'Tersedia',
    offline_storage_total:  'Jumlah',
    offline_demo:           'Demonstrasi Luar Talian — Semua ciri teras aktif tanpa internet.',
    offline_search_hint:    'Cari kandungan yang dimuat turun…',
    offline_open_btn:       'Buka',
    offline_delete_btn:     'Padam',
    offline_size:           'Saiz',
    offline_source:         'Sumber',
    offline_status_online:  'Dalam Talian',
    offline_status_offline: 'Luar Talian',
    offline_pending_sync:   'Item segerak tertangguh',
    offline_last_sync:      'Disegerakkan terakhir',
    offline_never_synced:   'Belum disegerakkan',
    offline_sync_now:       'Segerak Sekarang',
    offline_last_sync_label:'Segerak terakhir:',
    /* Offline Library — BM additional keys */
    offline_books_saved:    'buku tersimpan',
    offline_find_more:      '+ Cari Lebih Buku',
    offline_clear_all:      'Padam Semua',
    offline_go_discover:    'Semak Imbas Buku',
    offline_new_scan:       'Imbasan Baharu',
    offline_clear_ocr:      'Padam Cache',
    offline_go_ocr:         'Buka Agen OCR',
    offline_clear_ai:       'Padam Cache AI',
    offline_ai_cache_info:  'Jawapan AI disimpan secara automatik semasa dalam talian. Tanpa talian, Agen Guru menggunakan jawapan tersimpan.',
    offline_go_ai:          'Buka Guru AI',
    offline_notes_label:    'Nota',
    offline_bookmarks_label:'Penanda Buku',
    offline_highlights_label:'Penyerlahan',
    offline_quiz_label:     'Sejarah Kuiz',
    offline_notes_info:     'Nota, penanda buku, penyerlahan dan keputusan kuiz disimpan secara tempatan dan tersedia tanpa talian.',
    offline_open_reading:   'Buka Rakan Baca',
    offline_open_adhd:      'Buka Agen ADHD',
    offline_open_teacher:   'Buka Guru AI',
    offline_stat_books:     'buku',
    offline_stat_scans:     'imbasan',
    offline_stat_responses: 'respons',
    offline_stat_items:     'item',
    offline_sync_title:     'Segerak & Sandaran',
    offline_sw_title:       'Status Pekerja Perkhidmatan',
    offline_clear_all_data: 'Padam Semua Data',
    offline_read_btn:       'Baca Sekarang',
    offline_teach_btn:      'Tanya Guru AI',
    offline_already_saved:  '✅ Tersimpan',
    offline_cleared:        'Dibersihkan.',
    offline_empty_downloads:'Belum ada muat turun',
    offline_empty_downloads_sub: 'Buku yang anda simpan luar talian akan muncul di sini. Ketik "Muat Turun untuk Luar Talian" pada mana-mana buku.',
    offline_empty_ocr:      'Tiada imbasan OCR dalam cache',
    offline_empty_ocr_sub:  'Teks yang diekstrak daripada imej disimpan di sini untuk akses luar talian.',
    offline_empty_ai:       'Tiada respons AI dalam cache',
    offline_empty_ai_sub:   'Gunakan Guru AI atau Pustakawan AI semasa dalam talian dan jawapan akan disimpan di sini.',
    offline_confirm_clear_downloads: 'Buang semua buku yang dimuat turun daripada storan luar talian?',
    offline_confirm_clear_ocr:       'Padam semua imbasan OCR yang dicache?',
    offline_confirm_clear_ai:        'Padam semua respons AI yang dicache?',
    offline_confirm_clear_all:       'Padam SEMUA data luar talian? Ini tidak boleh dibuat asal.',

    /* Gelung ReAct */
    react_loop_title:   'Gelung ReAct',
    react_think:        'FIKIR',
    react_waiting:      'Menunggu…',
    react_act:          'TINDAK',
    react_observe:      'PERHATIKAN',
    react_retry:        'CUBA LAGI',
    react_improving:    'Menambah baik…',
    react_btn:          'Analisis ReAct AI',

    /* Rakan Bacaan — tambahan */
    rc_audio_guide_desc: 'Tekan butang audio di bawah untuk menavigasi halaman ini menggunakan pembaca skrin atau Teks-ke-Suara. Semua kandungan boleh diakses secara audio.',
    rc_reading_empty:    'Klik Muatkan Teks untuk mula membaca.',

    /* Ejen ADHD — tambahan */
    adhd_page_subtitle:  'Bacaan dioptimumkan fokus dengan sesi mikro, pemasa, sorotan, dan pembina nota pintar.',
    adhd_strategy_desc:  'Pelajar ADHD sering berjaya membaca 2–3 buku serentak. Putar berdasarkan tahap tenaga:',
    adhd_break_title:    'Masa untuk Rehat Fokus!',
    adhd_take_break:     'Ambil Rehat',
    adhd_skip_break:     'Langkau',
    adhd_page_title_full: 'Ejen Membaca Adaptif ADHD',
    adhd_timer_started:  'Sesi fokus dimulakan. {n} minit.',
    adhd_timer_complete: 'Sesi selesai. Masa untuk rehat.',
    adhd_timer_paused:   'Sesi dijeda.',
    adhd_timer_stopped:  'Sesi dihentikan.',
    adhd_break_started:  'Masa rehat dimulakan.',
    adhd_focus_excellent: 'Fokus Cemerlang!',
    adhd_focus_good:     'Tahap Fokus Baik',
    adhd_focus_moderate: 'Fokus Sederhana',
    adhd_focus_break:    'Pertimbangkan rehat',
    btn_pause:           '⏸ Jeda',
    adhd_note_placeholder: 'Tambah nota atau petikan…',
    adhd_interest_placeholder: 'cth. sains, bola sepak, muzik…',
    adhd_footer_name:    'Ejen Membaca Adaptif ADHD',
    adhd_no_notes_export: 'Tiada nota untuk dieksport!',
    adhd_generating_strategy: 'Menjana strategi ADHD diperibadikan…',
    adhd_ai_strategy_label: 'Strategi Diperibadikan AI:',
    adhdr_loading_title: '⏳ Memuatkan kandungan buku…',
    adhdr_loading_desc:  'Sila tunggu semasa kami mendapatkan teks.',
    adhdr_prev:          '← Sebelum',
    adhdr_next:          'Seterusnya →',
    adhdr_ai_help:       ' Bantuan AI',
    adhdr_section_label: 'Bahagian {n}',
    adhdr_min_read:      '~{n} min baca',
    adhdr_exit_focus:    'Keluar mod fokus',
    adhdr_prev_para:     'Perenggan sebelum',
    adhdr_next_para:     'Perenggan seterusnya',
    adhdr_stop_reading:  'Henti baca',
    adhdr_prev_sentence: 'Ayat sebelum',
    adhdr_next_sentence: 'Ayat seterusnya',
    adhdr_controls_aria:    'Kawalan membaca',
    adhdr_font_dec:         'Kecilkan saiz fount',
    adhdr_font_inc:         'Besarkan saiz fount',
    adhdr_space_dec:        'Kurangkan jarak baris',
    adhdr_space_inc:        'Tambah jarak baris',
    adhdr_focus_dialog_aria:'Mod baca fokus',
    adhd_tip_aria:          'Petua ADHD Diperibadi',
    adhd_hl_toolbar_aria:   'Warna sorotan teks',
    adhd_hl_yellow:         'Sorot pilihan kuning',
    adhd_hl_green:          'Sorot pilihan hijau',
    adhd_hl_purple:         'Sorot pilihan ungu',
    adhd_hl_red:            'Sorot pilihan merah',
    adhd_hl_clear:          'Padam semua sorotan',
    ds_read_aloud:          'Baca Kuat',
    iab_btn_adhd:        '🧠 Ejen ADHD',
    iab_btn_dyslexia:    '📖 Ejen Disleksia',
    iab_btn_reading:     '📚 Teman Membaca',
    iab_btn_ocr:         '📷 Ejen OCR',

    /* Pustakawan AI — tambahan */
    lib_search_btn:         'Cari',
    lib_read_btn:           '▶ Baca',
    lib_read_free_btn:      '▶ Baca Percuma',
    lib_no_books:           'Tiada buku ditambah lagi.',
    lib_recommended_for:    'Disyorkan untuk {type}',
    lib_api_key_required:   'Kunci API diperlukan untuk cadangan AI. Pergi ke Tetapan →',
    lib_also_showing:       'Menunjukkan {n} pilihan terpilih lagi',
    lib_find_book:          ' Cari buku ini',
    lib_ai_rec_label:       'Cadangan AI · {level}',
    lib_add_btn:         '+ Tambah',
    lib_add_to_list:     'Tambah ke Senarai Bacaan',
    lib_mode_adhd:       'Ejen ADHD',
    lib_mode_audio:      'Ejen Audio',
    lib_mode_ds:         'Sindrom Down',
    lib_dyslexia_opt:    'Disleksia',
    lib_visual_keywords: 'Kata Kunci Visual',
    nav_skip_content:    'Langkau ke kandungan utama',

    /* Penemuan Buku — cip penapis */
    bd_chip_adhd:        'Mesra ADHD',
    bd_chip_dyslexia:    'Disleksia',
    bd_chip_children:    'Buku Kanak-kanak',
    bd_chip_adventure:   'Pengembaraan',

    /* Halaman Tetapan — kunci i18n tambahan */
    set_openrouter_title: 'OpenRouter AI',
    set_openrouter_desc: 'Masukkan kunci API OpenRouter anda untuk aktifkan ringkasan AI, kuiz, dan pelan intervensi. Dapatkan kunci percuma di openrouter.ai/keys ↗',
    set_ai_model_label: 'Model AI',
    set_letter_spacing: 'Jarak huruf',
    set_spacing_normal: 'Normal',
    set_lang_english: 'English',
    set_lang_english_sub: 'Antara muka dalam Bahasa Inggeris',
    set_lang_bm_sub: 'Antara muka dalam Bahasa Melayu',
    set_avatar_offline: 'Luar Talian — sentiasa tersedia',
    set_avatar_quality: 'Kualiti Tertinggi',
    set_avatar_enterprise: 'Perusahaan',
    set_confirm_reset_a11y: 'Set semula semua tetapan aksesibiliti kepada lalai?',
    set_confirm_clear_data: 'Padam semua data pembelajaran? Tindakan ini tidak boleh dibatalkan.',
    set_confirm_reset_profile: 'Set semula profil pelajar?',
    set_confirm_reset_all: 'Set semula SEMUA data? Ini akan memadamkan kunci API, profil, dan semua tetapan. Anda pasti?',
    set_toast_contrast: 'Kontras dikemas kini',
    set_toast_profile_saved: 'Profil disimpan',
    set_toast_profile_reset: 'Profil diset semula',
    set_toast_lang_english: 'Bahasa: Inggeris',
    set_toast_data_cleared: 'Data pembelajaran dipadamkan',
    set_toast_all_cleared: 'Semua data dipadamkan. Memuatkan semula...',
    set_toast_key_cleared: 'Kunci API dipadamkan',
    set_toast_testing: 'Menguji sambungan...',
    set_toast_saved: 'Disimpan',

    /* Pilihan tempoh */
    dur_2min: '2 minit',
    dur_3min: '3 minit',
    dur_5min: '5 minit',
    dur_10min: '10 minit',
    dur_15min: '15 minit',
    dur_20min: '20 minit',

    /* Halaman Profil — kunci i18n tambahan */
    prof_comprehension_tip: 'Skor kefahaman anda baik. Cuba tingkatkan tempoh sesi dari 10 ke 15 minit minggu ini.',
    prof_intervention_title: 'Cuba Sesi Fokus 15 Minit Minggu Ini',
    prof_intervention_desc: 'Skor fokus anda telah konsisten melebihi 75 untuk 3 sesi. Ejen ADHD mencadangkan untuk meningkatkan dari sesi 10 minit ke 15 minit sambil mengekalkan rehat 3 minit.',
    prof_learning_profile: 'Profil Pembelajaran',
    prof_session_prefs: '⏱ Keutamaan Sesi',
    prof_footer_name: 'Profil Pelajar',

    /* Blind Audio Agent (ba_*) */
    ba_subtitle:              'Navigasi Buta Utamakan Suara',
    ba_status_speaking:       'Bercakap…',
    ba_status_ready:          'Sedia',
    ba_status_listening:      'Mendengar…',
    ba_status_hint:           'Sebut "Mula Panduan" atau "Bantuan" untuk bermula',
    ba_label_last_cmd:        'Arahan Terakhir Dikenali',
    ba_label_last_speech:     'Teks Terakhir Diucapkan',
    ba_quick_title:           'Akses Pantas',
    ba_btn_start_guide:       'Mula Panduan',
    ba_btn_start_guide_aria:  'Mula Panduan — dengar arahan penuh',
    ba_btn_guest:             'Mod Tetamu',
    ba_btn_guest_aria:        'Mod Tetamu — mula tanpa log masuk',
    ba_btn_dashboard:         'Buka Papan Pemuka',
    ba_btn_help:              'Bantuan',
    ba_btn_help_aria:         'Bantuan — dengar semua arahan tersedia',
    ba_features_title:        'Ciri-Ciri',
    ba_feat_ocr_aria:         'OCR — imbas dan baca teks dari imej',
    ba_feat_readpage_aria:    'Baca Halaman — baca mana-mana halaman dengan kuat',
    ba_feat_library_aria:     'Perpustakaan — layari bahan bacaan yang boleh diakses',
    ba_feat_reading_aria:     'Membaca — mod membaca adaptif',
    ba_feat_adhd_aria:        'ADHD — sokongan membaca mesra fokus',
    ba_feat_signlang_aria:    'Bahasa Isyarat — sokongan bahasa isyarat',
    ba_feat_ocr:              'OCR',
    ba_feat_readpage:         'Baca Halaman',
    ba_feat_library:          'Perpustakaan',
    ba_feat_reading:          'Membaca',
    ba_feat_adhd:             'ADHD',
    ba_feat_signlang:         'Bahasa Isyarat',
    ba_login_title:           'Log Masuk Suara',
    ba_login_desc:            'Sebut kelayakan anda atau taip di bawah. Data anda tidak pernah disimpan.',
    ba_login_email_ph:        'Alamat e-mel',
    ba_login_password_ph:     'Kata laluan',
    ba_login_submit:          'Log Masuk',
    ba_shortcuts_title:       'Pintasan Papan Kekunci',
    ba_shortcut_space:        'Mula / berhenti mendengar',
    ba_shortcut_r:            'Ulang ucapan terakhir',
    ba_shortcut_h:            'Bantuan',
    ba_shortcut_g:            'Mod tetamu',
    ba_shortcut_d:            'Buka Papan Pemuka',
    ba_shortcut_esc:          'Henti semua',
    ba_shortcut_b:            'Togol Mod Braille',
    ba_lang_toggle_aria:      'Togol bahasa antara Bahasa Melayu dan Inggeris',
    ba_footer_tagline:        'Memperkasakan setiap pelajar',
    ba_footer_dashboard:      'Papan Pemuka',
    ba_footer_settings:       'Tetapan',

    /* Profile — accessibility toggle aria-labels (prof_*) */
    prof_toggle_opendyslexic: 'Togol fount OpenDyslexic',
    prof_toggle_large_text:   'Togol mod teks besar',
    prof_toggle_high_contrast:'Togol kontras tinggi',
    prof_toggle_ruler:        'Togol pembaris bacaan',
    prof_toggle_auto_read:    'Togol baca automatik',

    /* Profile — role badge */
    prof_primary:             'Darjah',
    prof_learner_suffix:      'Pelajar',

    /* Settings — API key placeholders and aria-labels (set_*) */
    set_api_key_placeholder:  'Tampal kunci API OpenRouter anda di sini (sk-or-...)',
    set_heygen_key:           'Tampal kunci API HeyGen',
    set_did_key:              'Tampal kunci API D-ID',
    set_photo_url:            'https://... (foto pembentang anda)',
    set_nvidia_key:           'Token API NVIDIA NGC',
    set_text_size_aria:       'Saiz teks',
    set_letter_spacing_aria:  'Jarak huruf',
    set_speech_speed_aria:    'Kelajuan ucapan',
    set_display_name_aria:    'Nama paparan',
    set_show_hide_key:        'Tunjuk/sembunyikan kunci',
    set_lang_en_bsl:          'Bahasa Inggeris (BSL/ASL masa hadapan)',
  }
};

/* Voice command bilingual lookup table */
const CS_VOICE_COMMANDS = {
  /* English commands */
  'start guide':       'startGuide',
  'read text':         'readAloud',
  'read aloud':        'readAloud',
  'stop audio':        'stopTTS',
  'stop reading':      'stopTTS',
  'pause':             'pauseTTS',
  'resume':            'resumeTTS',
  'generate summary':  'summarise',
  'summarise':         'summarise',
  'generate quiz':     'generateQuiz',
  'upload image':      'uploadImage',
  'take photo':        'takePhoto',
  'capture image':     'captureImage',
  'extract text':      'extractText',
  'start focus':       'startFocus',
  'stop focus':        'stopFocus',
  'take a break':      'takeBreak',
  'open dashboard':    'openDashboard',
  'go home':           'goHome',
  'help':              'showHelp',
  /* Bahasa Melayu commands */
  'mulakan panduan':   'startGuide',
  'baca teks':         'readAloud',
  'baca kuat':         'readAloud',
  'henti audio':       'stopTTS',
  'hentikan audio':    'stopTTS',
  'jeda':              'pauseTTS',
  'teruskan':          'resumeTTS',
  'jana rumusan':      'summarise',
  'ringkaskan':        'summarise',
  'jana kuiz':         'generateQuiz',
  'muat naik imej':    'uploadImage',
  'ambil gambar':      'takePhoto',
  'tangkap imej':      'captureImage',
  'ekstrak teks':      'extractText',
  'mula fokus':        'startFocus',
  'henti fokus':       'stopFocus',
  'rehat':             'takeBreak',
  'buka dashboard':    'openDashboard',
  'bantuan':           'showHelp',
};

/**
 * CS.lang — Language system
 *
 * Usage:
 *   CS.lang.t('nav_home')   // returns 'Home' or 'Laman Utama'
 *   CS.lang.set('ms')       // switch to Bahasa Melayu
 *   CS.lang.get()           // returns 'en' or 'ms'
 */
const _lang = {
  _current: (localStorage.getItem('cs_lang') || 'en').replace('bm','ms'),

  get() { return this._current; },

  set(code) {
    this._current = code.replace('bm','ms');
    localStorage.setItem('cs_lang', this._current);
    document.documentElement.lang = (code === 'ms') ? 'ms-MY' : 'en';
    window.currentLang = code;
    /* Update all elements that have a data-i18n attribute */
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key  = el.getAttribute('data-i18n');
      const attr = el.getAttribute('data-i18n-attr');
      const val  = this.t(key);
      if (attr) el.setAttribute(attr, val);
      else      el.textContent = val;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.placeholder = this.t(el.getAttribute('data-i18n-placeholder'));
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      el.title = this.t(el.getAttribute('data-i18n-title'));
    });
    document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
      el.setAttribute('aria-label', this.t(el.getAttribute('data-i18n-aria-label')));
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(el => {
      el.alt = this.t(el.getAttribute('data-i18n-alt'));
    });
    /* Update the language switch button label */
    document.querySelectorAll('[data-lang-toggle]').forEach(btn => {
      btn.textContent = this.t('nav_lang_switch');
    });
    /* Also update langBtn by ID (pages that omit data-lang-toggle) */
    const _lb = document.getElementById('langBtn');
    if (_lb) _lb.textContent = this.t('nav_lang_switch');
    window.dispatchEvent(new CustomEvent('cs:lang:changed', { detail: { lang: code } }));
  },

  t(key) {
    const dict = CS_LANG[this._current] || CS_LANG.en;
    return dict[key] || CS_LANG.en[key] || key;
  },

  resolveCommand(transcript) {
    const clean = (transcript || '').toLowerCase().trim();
    for (const [phrase, action] of Object.entries(CS_VOICE_COMMANDS)) {
      var re = new RegExp('(^|\\s)' + phrase.replace(/[.*+?^${}()|[\]\\]/g,'\\$&') + '(\\s|$)','i');
      if (re.test(clean)) return action;
    }
    return null;
  },

  init() {
    this.set(this._current);
  }
};

/* ============================================================
   SECTION 2 — USER PROFILE
   Saves the learner's name, disability type, and accessibility
   settings to localStorage. No server or login needed.
============================================================ */
const _user = {
  _KEY: 'cs_user_v1',

  _defaults() {
    return {
      name:         '',
      displayName:  '',
      language:     'en',
      onboarded:    false,
      profile: {
        gradeLevel:        '',
        readingLevel:      5,
        disabilityTypes:   [],
        primaryDisability: 'none',
        schoolName:        '',
      },
      accessibility: {
        fontSizePx:      16,
        fontFamily:      'system',
        contrastMode:    'normal',
        colorOverlay:    'none',
        lineSpacing:     1.6,
        letterSpacingEm: 0,
        zoomLevel:       100,
        ttsEnabled:      true,
        ttsSpeed:        1.0,
        ttsPitch:        1.0,
        captionOverlay:  false,
        readingRuler:    false,
        readingWindow:   false,
        voiceCommands:   false,
        reducedMotion:   false,
      },
      stats: {
        streakDays:    0,
        sessionsTotal: 0,
        sessionsWeek:  0,
        lastSessionAt: null,
        lastSessionDate: null,
      }
    };
  },

  _merge(target, source) {
    const out = Object.assign({}, target);
    for (const key of Object.keys(source || {})) {
      if (source[key] !== null && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        out[key] = this._merge(target[key] || {}, source[key]);
      } else {
        out[key] = source[key];
      }
    }
    return out;
  },

  get() {
    try {
      const raw = localStorage.getItem(this._KEY);
      if (!raw) return this._defaults();
      return this._merge(this._defaults(), JSON.parse(raw));
    } catch { return this._defaults(); }
  },

  save(data) {
    localStorage.setItem(this._KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('cs:user:updated'));
  },

  update(patch)       { this.save(this._merge(this.get(), patch)); },
  updateA11y(patch)   { this.update({ accessibility: patch }); },
  updateProfile(patch){ this.update({ profile: patch }); },
  getA11y()           { return this.get().accessibility; },
  getProfile()        { return this.get().profile; },
  getStats()          { return this.get().stats; },
  isOnboarded()       { return this.get().onboarded; },

  /**
   * Call this when any agent session ends.
   * Automatically updates streak days, session count, and weekly total.
   */
  recordSession() {
    const user    = this.get();
    const stats   = user.stats;
    const today   = new Date().toISOString().substring(0, 10);
    const lastDate= stats.lastSessionDate;

    stats.sessionsTotal = (stats.sessionsTotal || 0) + 1;

    /* Update weekly count — reset if it is a new week */
    const now    = new Date();
    const weekNo = this._weekNumber(now);
    const lastWeekNo = lastDate ? this._weekNumber(new Date(lastDate)) : -1;
    if (weekNo !== lastWeekNo) stats.sessionsWeek = 1;
    else stats.sessionsWeek = (stats.sessionsWeek || 0) + 1;

    /* Update streak */
    if (lastDate === today) {
      /* already recorded today — no change to streak */
    } else {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yStr = yesterday.toISOString().substring(0, 10);
      if (lastDate === yStr) {
        stats.streakDays = (stats.streakDays || 0) + 1;
      } else if (lastDate !== today) {
        stats.streakDays = 1; /* streak broken — restart */
      }
    }

    stats.lastSessionAt   = new Date().toISOString();
    stats.lastSessionDate = today;
    this.save(Object.assign({}, user, { stats }));
  },

  _weekNumber(date) {
    const d   = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
    const week1 = new Date(d.getFullYear(), 0, 4);
    return 1 + Math.round(((d - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  }
};

/* ============================================================
   SECTION 3 — ANALYTICS
   Tracks quiz scores, focus scores, TTS usage, and sessions.
   Used by the Early Warning Agent to calculate risk score.
============================================================ */
const _analytics = {
  _KEY:      'cs_analytics_v1',
  _MAX:      300,
  _session:  null,

  _getLog() {
    try { return JSON.parse(localStorage.getItem(this._KEY) || '[]'); }
    catch { return []; }
  },

  _saveLog(log) {
    try { localStorage.setItem(this._KEY, JSON.stringify(log.slice(-this._MAX))); }
    catch { /* storage full — ignore */ }
  },

  log(type, data) {
    const entry = Object.assign({
      id:   Date.now().toString() + Math.random().toString(36).slice(2, 5),
      type: type,
      ts:   new Date().toISOString(),
    }, data);
    const log = this._getLog();
    log.push(entry);
    this._saveLog(log);
  },

  startSession(agent) {
    this._session = { agent, start: Date.now() };
    this.log('session_start', { agent });
  },

  endSession(extras) {
    if (!this._session) return;
    const duration = Math.round((Date.now() - this._session.start) / 1000);
    this.log('session_end', Object.assign({ agent: this._session.agent, durationSec: duration }, extras));
    _user.recordSession();
    this._session = null;
  },

  logQuiz(data)  { this.log('quiz_result',  data); },
  logFocus(data) { this.log('focus_score',  data); },
  logTTS(data)   { this.log('tts_used',     data); },
  logOCR(data)   { this.log('ocr_scan',     data); },
  getAll()       { return this._getLog(); },
  clear()        { localStorage.removeItem(this._KEY); },

  /**
   * Returns a summary of the last N days.
   * Used by Early Warning Agent to compute risk score.
   */
  getSummary(days) {
    days = days || 7;
    const cutoff = Date.now() - days * 86400000;
    const all    = this._getLog().filter(e => new Date(e.ts).getTime() > cutoff);

    const sessions = all.filter(e => e.type === 'session_end');
    const quizzes  = all.filter(e => e.type === 'quiz_result');
    const focus    = all.filter(e => e.type === 'focus_score');
    const tts      = all.filter(e => e.type === 'tts_used');

    function avg(arr, key) {
      if (!arr.length) return null;
      return Math.round(arr.reduce((s, x) => s + (x[key] || 0), 0) / arr.length);
    }

    return {
      sessionCount:   sessions.length,
      avgQuizScore:   avg(quizzes, 'scorePct'),
      avgFocusScore:  avg(focus,   'score'),
      avgDurationMin: sessions.length ? Math.round(sessions.reduce((s, e) => s + (e.durationSec || 0), 0) / sessions.length / 60) : null,
      ttsRatioPct:    sessions.length ? Math.round((tts.length / sessions.length) * 100) : 0,
      activeDays:     new Set(all.map(e => e.ts.substring(0, 10))).size,
    };
  },

  /**
   * Computes weighted risk score 0-100.
   * Lower score = healthier. Higher score = more at risk.
   */
  computeRisk() {
    const s = this.getSummary(7);
    const quizComp     = s.avgQuizScore  != null ? (100 - s.avgQuizScore)  : 50;
    const freqComp     = Math.min(100, Math.max(0, (1 - s.sessionCount / 5) * 100));
    const durComp      = s.avgDurationMin != null ? Math.max(0, (40 - s.avgDurationMin) * 2.5) : 50;
    const focusComp    = s.avgFocusScore != null ? (100 - s.avgFocusScore) : 50;
    const ttsComp      = Math.min(100, s.ttsRatioPct || 0);

    const score = Math.round(
      quizComp  * 0.30 +
      freqComp  * 0.20 +
      durComp   * 0.15 +
      focusComp * 0.20 +
      ttsComp   * 0.10 +
      30        * 0.05
    );

    const level =
      score < 30 ? 'low' :
      score < 60 ? 'moderate' :
      score < 80 ? 'high' : 'critical';

    return { score, level, summary: s };
  }
};

/* ============================================================
   SECTION 4 — TTS ENGINE
   Text-to-Speech wrapper.
   Fixes the Chrome voice-loading bug by waiting for the
   voiceschanged event before picking a voice.
============================================================ */
const _tts = (() => {
  const synth = window.speechSynthesis;
  let _voices   = [];
  let _ready    = false;
  let _queued   = null;

  var _loadVoices = function() {
    var v = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
    if (v && v.length > 0) { _voices = v; _ready = true; if (_queued) { _queued(); _queued = null; } }
  };
  _loadVoices();
  if (window.speechSynthesis && 'onvoiceschanged' in window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = _loadVoices;
  }

  function _pick(lang) {
    return _voices.find(v => v.lang.startsWith(lang)) ||
           _voices.find(v => v.lang.startsWith('en')) || null;
  }

  return {
    speak(text, opts) {
      if (!synth || !text) return;
      synth.cancel();
      opts = opts || {};
      if (!_ready) { _queued = () => this.speak(text, opts); return; }

      const pref  = _user.getA11y();
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate  = opts.rate  !== undefined ? opts.rate  : (pref.ttsSpeed  || 1.0);
      utter.pitch = opts.pitch !== undefined ? opts.pitch : (pref.ttsPitch  || 1.0);
      utter.lang  = opts.lang  ||
        (localStorage.getItem('cs_lang') === 'ms' ? 'ms-MY' : 'en-MY');

      const voice = _pick(utter.lang.substring(0, 2));
      if (voice) utter.voice = voice;

      utter.onend = function() {
        window.dispatchEvent(new CustomEvent('cs:tts:ended'));
        if (typeof opts.onEnd === 'function') opts.onEnd();
      };

      /* Show caption bar if enabled */
      if (pref.captionOverlay) {
        let cap = document.querySelector('.cs-caption-bar');
        if (!cap) {
          cap           = document.createElement('div');
          cap.className = 'cs-caption-bar';
          cap.setAttribute('aria-live', 'polite');
          cap.style.cssText = 'position:fixed;bottom:0;left:0;right:0;background:rgba(0,0,0,0.85);color:white;padding:14px 20px;font-size:18px;text-align:center;z-index:9999';
          document.body.appendChild(cap);
        }
        cap.textContent = text.length > 100 ? text.substring(0, 100) + '…' : text;
        const origEnd = utter.onend;
        utter.onend = function() { cap.textContent = ''; origEnd(); };
      }

      synth.speak(utter);
      _analytics.logTTS({ agent: opts.agent || 'unknown', chars: text.length });
    },

    stop()        { synth && synth.cancel(); window.dispatchEvent(new CustomEvent('cs:tts:ended')); },
    pause()       { synth && synth.pause(); },
    resume()      { synth && synth.resume(); },
    isSpeaking()  { return !!(synth && synth.speaking); },
    isSupported() { return !!synth; },
  };
})();

/* ============================================================
   SECTION 5 — VOICE ENGINE
   Speech Recognition wrapper.
   Supports continuous mode with automatic restart.
   Fixes the bug where continuous mode silently died on mobile.
============================================================ */
const _voice = (() => {
  const SR  = window.SpeechRecognition || window.webkitSpeechRecognition;
  let _rec      = null;
  let _active   = false;
  let _handlers = {};
  let _opts     = {};

  function _updateBar(msg, listening) {
    const bar = document.getElementById('cs-voice-bar');
    if (!bar) return;
    const txt = bar.querySelector('.cs-voice-text');
    if (txt) txt.textContent = msg;
    bar.style.opacity = _active ? '1' : '0';
    const dot = bar.querySelector('.cs-voice-dot');
    if (dot) dot.style.animation = listening ? 'cs-pulse 1s infinite' : 'none';
  }

  function _start() {
    if (!SR) {
      CS.toast(_lang.t('voice_not_supported'), 'error');
      return;
    }
    _rec                  = new SR();
    _rec.continuous       = false;
    _rec.interimResults   = false;
    _rec.lang             = localStorage.getItem('cs_lang') === 'ms' ? 'ms-MY' : 'en-MY';
    _rec.maxAlternatives  = 3;

    _rec.onstart = function() {
      _active = true;
      _updateBar(_lang.t('blind_listening'), true);
      window.dispatchEvent(new CustomEvent('cs:voice:start'));
    };

    _rec.onresult = function(e) {
      if (!e.results || !e.results.length || !e.results[0][0]) return;
      const transcript = e.results[0][0].transcript;
      _updateBar('Heard: "' + transcript + '"', false);
      const action = _lang.resolveCommand(transcript);
      window.dispatchEvent(new CustomEvent('cs:voice:result', { detail: { transcript, action } }));
      if (action && _handlers[action]) _handlers[action](transcript);
      else if (!action) _updateBar(_lang.t('blind_not_heard'), false);
    };

    _rec.onerror = function(e) {
      _active = false;
      const msgs = {
        'not-allowed': _lang.t('voice_denied'),
        'network':     _lang.t('voice_network_err'),
        'no-speech':   'No speech detected.',
      };
      _updateBar(msgs[e.error] || ('Error: ' + e.error), false);
      window.dispatchEvent(new CustomEvent('cs:voice:error', { detail: e.error }));
      /* Restart continuous mode after any error except permission denied */
      if (_opts.continuous && e.error !== 'not-allowed') {
        setTimeout(function() { if (_opts.continuous) _start(); }, 800);
      }
    };

    /* KEY FIX: restart continuous mode on every onend event */
    _rec.onend = function() {
      _active = false;
      if (_opts.continuous) {
        setTimeout(function() { if (_opts.continuous) _start(); }, 300);
      } else {
        _updateBar('Ready', false);
      }
    };

    try { _rec.start(); }
    catch(e) { console.error('[Voice]', e); }
  }

  return {
    isSupported() { return !!SR; },

    start(opts) {
      _opts = opts || {};
      if (_active) return;
      _start();
    },

    stop() {
      _opts   = {};
      _active = false;
      if (_rec) { try { _rec.stop(); } catch(e) {} _rec = null; }
      _updateBar('Stopped', false);
      window.dispatchEvent(new CustomEvent('cs:voice:stop'));
    },

    addCommand(action, fn) { _handlers[action] = fn; },
    addCommands(map)       { Object.assign(_handlers, map); },
    isActive()             { return _active; },
  };
})();

/* ============================================================
   SECTION 6 — OPENROUTER AI CLIENT
   Connects to OpenRouter API (OpenAI-compatible, multi-model).

   To use the AI features:
   1. Go to https://openrouter.ai/keys and get a free API key
   2. Open Settings (gear icon in dashboard) and paste your key
   3. All AI features will then work: summarise, quiz, recommend
============================================================ */
const _groq = (() => {
  const BASE_URL = '/api/proxy';

  let _key   = localStorage.getItem('openrouter_api_key') || '';
  let _quota = false;

  function _prompt(role, text, lang, level) {
    const langLabel = lang === 'ms' ? 'Bahasa Malaysia' : 'English';
    const levels = {
      easy:   'simple language for a 9-year-old',
      normal: 'standard secondary school level',
      deep:   'detailed university-level explanation',
    };
    return (
      'You are an educational AI for Malaysian inclusive learning. ' +
      'Respond in ' + langLabel + ' at ' + (levels[level] || levels.normal) + '. ' +
      'Return ONLY a valid JSON object — no markdown, no code fences, no preamble.\n\n' +
      role + '\n\nText:\n' + text.substring(0, 8000)
    );
  }

  /* Robust JSON extractor — handles fences, whitespace, wrapped text */
  function _extractJSON(text) {
    if (!text) return null;
    var codeBlock = text.match(/```(?:json)?[\s\S]*?```/);
    if (codeBlock) {
      var inner = codeBlock[0].replace(/```(?:json)?/,'').replace(/```/,'').trim();
      try { return JSON.parse(inner); } catch(e) {}
    }
    var start = -1;
    var openChar = '', closeChar = '';
    var bi = text.indexOf('{'), ai = text.indexOf('[');
    if (bi === -1 && ai === -1) return null;
    if (bi === -1) { start = ai; openChar='['; closeChar=']'; }
    else if (ai === -1) { start = bi; openChar='{'; closeChar='}'; }
    else if (ai < bi) { start = ai; openChar='['; closeChar=']'; }
    else { start = bi; openChar='{'; closeChar='}'; }
    var depth = 0, inStr = false, esc = false;
    for (var i = start; i < text.length; i++) {
      var c = text[i];
      if (esc) { esc=false; continue; }
      if (c==='\\' && inStr) { esc=true; continue; }
      if (c==='"') { inStr=!inStr; continue; }
      if (inStr) continue;
      if (c===openChar) depth++;
      else if (c===closeChar) { depth--; if(depth===0){ try{ return JSON.parse(text.slice(start,i+1)); }catch(e){ return null; } } }
    }
    return null;
  }

  /* Generate a short stable cache key from the prompt */
  function _cacheKey(prompt) {
    var s = prompt.replace(/\s+/g, ' ').trim().substring(0, 300);
    var h = 0;
    for (var i = 0; i < s.length; i++) {
      h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
    }
    return 'ai_' + (h >>> 0).toString(36);
  }

  /* Read one item from ai_cache in IndexedDB (direct, no SW postMessage needed) */
  function _readCache(key) {
    return new Promise(function(resolve) {
      try {
        var req = indexedDB.open('celiksense-idb', 2);
        req.onerror = function() { resolve(null); };
        req.onsuccess = function() {
          try {
            var tx = req.result.transaction('ai_cache', 'readonly');
            var get = tx.objectStore('ai_cache').get(key);
            get.onsuccess = function() { resolve(get.result || null); };
            get.onerror   = function() { resolve(null); };
          } catch(e) { resolve(null); }
        };
      } catch(e) { resolve(null); }
    });
  }

  /* Write one item to ai_cache */
  function _writeCache(key, promptText, responseText) {
    try {
      var req = indexedDB.open('celiksense-idb', 2);
      req.onsuccess = function() {
        try {
          var tx = req.result.transaction('ai_cache', 'readwrite');
          tx.objectStore('ai_cache').put({
            key:      key,
            prompt:   promptText.substring(0, 400),
            response: responseText,
            savedAt:  Date.now(),
          });
        } catch(e) {}
      };
    } catch(e) {}
  }

  async function _call(prompt) {
    _key = localStorage.getItem('openrouter_api_key') || '';
    if (_quota) return { error: 'quota', fallback: true };

    const cKey = _cacheKey(prompt);

    /* ── OFFLINE: serve from cache if available ── */
    if (!navigator.onLine) {
      const cached = await _readCache(cKey);
      if (cached && cached.response) {
        const parsed = _extractJSON(cached.response);
        if (parsed) return { data: parsed, fallback: false, _fromCache: true };
      }
      return { error: 'offline', fallback: true };
    }

    /* ── ONLINE: try network, save to cache on success ── */
    try {
      const model = localStorage.getItem('openrouter_model') || 'google/gemma-2-9b-it:free';
      const res = await fetch(BASE_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey:  _key,
          target:  'chat',
          payload: { model: model, messages: [{ role: 'user', content: prompt }] },
        }),
        signal: typeof AbortSignal !== 'undefined' && AbortSignal.timeout ? AbortSignal.timeout(30000) : undefined,
      });

      if (res.status === 429) { _quota = true; return { error: 'quota', fallback: true }; }
      if (res.status === 401) return { error: 'invalid_key_401', fallback: true };
      if (res.status === 400) return { error: 'invalid_key', fallback: true };
      if (res.status === 403) return { error: 'invalid_key', fallback: true };
      if (!res.ok) {
        let errBody = ''; try { errBody = await res.text(); } catch(e2) {}
        console.warn('[OpenRouter] HTTP ' + res.status, errBody);
        return { error: 'HTTP ' + res.status + ' ' + errBody.substring(0,200), fallback: true };
      }

      const data = await res.json();
      const text = data?.choices?.[0]?.message?.content || '';
      if (!text) return { error: 'empty_response', fallback: true };

      /* Save to cache for offline replay */
      _writeCache(cKey, prompt, text);

      return { data: _extractJSON(text), fallback: false };
    } catch(e) {
      /* Network failed — try cache as last resort */
      const cached = await _readCache(cKey);
      if (cached && cached.response) {
        const parsed = _extractJSON(cached.response);
        if (parsed) return { data: parsed, fallback: false, _fromCache: true };
      }
      console.warn('[OpenRouter AI]', e.message);
      return { error: e.message, fallback: true };
    }
  }

  return {
    setKey(k)  { _key = k; localStorage.setItem('openrouter_api_key', k); _quota = false; },
    clearKey() { _key = ''; localStorage.removeItem('openrouter_api_key'); },
    isReady()  { return !!_key; },
    getStatus() {
      if (_quota) return 'quota';
      if (!!_key) return 'ready';
      return 'no-key';
    },

    async summarise(text, lang, level) {
      lang  = lang  || _lang.get();
      level = level || 'normal';
      const res = await _call(_prompt(
        'Summarise this text. Return JSON: {"summary":"...","keyPoints":["..."],"difficulty":"easy|medium|hard","wordCount":0}',
        text, lang, level
      ));
      if (res.fallback) return this._fbSummary(text, res.error);
      return res.data;
    },

    async generateQuiz(text, lang, count) {
      lang  = lang  || _lang.get();
      count = count || 4;
      const res = await _call(_prompt(
        'Generate ' + count + ' multiple-choice questions with 4 options each. Return JSON: {"questions":[{"question":"...","options":["A...","B...","C...","D..."],"correct":0,"explanation":"..."}]}',
        text, lang, 'normal'
      ));
      if (res.fallback) return { questions: [], _fallback: true, _reason: res.error };
      return res.data;
    },

    async recommend(profile, interests, lang) {
      lang = lang || _lang.get();
      const info = JSON.stringify({ grade: profile.gradeLevel, level: profile.readingLevel, disabilities: profile.disabilityTypes });
      const res = await _call(_prompt(
        'Recommend 6 books for this Malaysian student: ' + info + '. Return JSON: {"books":[{"title":"...","author":"...","reason":"...","level":"easy|medium|hard","format":"audio|text|both","genre":"..."}]}',
        'Interests: ' + interests, lang, 'normal'
      ));
      if (res.fallback) return { books: [], _fallback: true, _reason: res.error };
      return res.data;
    },

    async generateIntervention(riskData, profile, lang) {
      lang = lang || _lang.get();
      const res = await _call(_prompt(
        'Generate a 3-step intervention plan. Risk: ' + riskData.score + ' (' + riskData.level + '). Return JSON: {"planTitle":"...","triggerReason":"...","steps":[{"stepNumber":1,"title":"...","description":"...","agent":"...","durationDays":7}]}',
        'Risk: ' + JSON.stringify(riskData), lang, 'normal'
      ));
      if (res.fallback) return this._fbIntervention(riskData, res.error);
      return res.data;
    },

    async testConnection() {
      const key = localStorage.getItem('openrouter_api_key') || '';
      // Server may have its own key — still try even without client key
      try {
        const r = await fetch('/api/proxy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ apiKey: key, target: 'models' }),
        });
        if (r.ok) return { ok: true, message: 'Connected' };
        const body = await r.text().catch(() => '');
        return { ok: false, error: 'HTTP ' + r.status + ' ' + body.substring(0, 100) };
      } catch(e) {
        return { ok: false, error: e.message };
      }
    },

    _fbSummary(text, reason) {
      var s = (text.match(/[^.!?]+[.!?]+/g) || []).slice(0, 3).join(' ');
      return { summary: s || text.substring(0, 200), keyPoints: [], difficulty: 'unknown', wordCount: text.split(/\s+/).length, _fallback: true, _reason: reason };
    },
    _fbIntervention(risk, reason) {
      return {
        planTitle:     'Standard Support Plan',
        triggerReason: 'Risk score: ' + risk.score,
        steps: [
          { stepNumber: 1, title: 'Daily Reading Companion', description: 'Use Reading Companion for 15 minutes daily.', agent: 'reading-companion', durationDays: 7 },
          { stepNumber: 2, title: 'Enable Text-to-Speech',   description: 'Turn on TTS in Accessibility Settings.',       agent: 'accessibility',       durationDays: 14 },
          { stepNumber: 3, title: 'ADHD Focus Sessions',     description: 'Use 10-minute Pomodoro sessions.',             agent: 'adhd-agent',          durationDays: 7 },
        ],
        _fallback: true, _reason: reason,
      };
    },
  };
})();

/* ============================================================
   SECTION 7 — ACCESSIBILITY ENGINE
   Reads the user's saved settings and applies them to the page.
   Call CS.a11y.apply() on every page load.
============================================================ */
const _a11y = {
  apply(prefs) {
    const p = prefs || _user.getA11y();
    const root = document.documentElement;
    const body = document.body;

    /* Font size */
    root.style.fontSize = (p.fontSizePx || 16) + 'px';

    /* Font family */
    const fonts = {
      system:    '',
      dyslexic:  'Lexend, "Comic Sans MS", sans-serif',
      arial:     'Arial, sans-serif',
      verdana:   'Verdana, sans-serif',
    };
    body.style.fontFamily = fonts[p.fontFamily] || '';

    /* Contrast */
    body.classList.toggle('cs-high-contrast',    p.contrastMode === 'high');
    body.classList.toggle('cs-inverted-contrast', p.contrastMode === 'inverted');

    /* Colour overlay */
    var overlays = {
      none:   'transparent',
      yellow: 'rgba(255,255,0,0.15)',
      blue:   'rgba(0,100,255,0.12)',
      green:  'rgba(0,200,100,0.12)',
      grey:   'rgba(128,128,128,0.18)',
      pink:   'rgba(255,100,150,0.12)',
    };
    var ov = document.getElementById('cs-overlay');
    if (!ov) {
      ov           = document.createElement('div');
      ov.id        = 'cs-overlay';
      ov.setAttribute('aria-hidden', 'true');
      ov.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9998';
      document.body.appendChild(ov);
    }
    ov.style.background = overlays[p.colorOverlay] || 'transparent';

    /* Line and letter spacing */
    root.style.setProperty('--cs-line-height',     String(p.lineSpacing      || 1.6));
    root.style.setProperty('--cs-letter-spacing',  (p.letterSpacingEm || 0)  + 'em');

    /* Zoom */
    root.style.zoom = (p.zoomLevel || 100) + '%';

    /* Reading ruler */
    body.classList.toggle('cs-ruler-on', !!p.readingRuler);
    if (p.readingRuler) this._initRuler();

    /* Reduced motion */
    if (p.reducedMotion) {
      var s = document.getElementById('cs-no-motion');
      if (!s) {
        s    = document.createElement('style');
        s.id = 'cs-no-motion';
        s.textContent = '*, *::before, *::after { animation: none !important; transition: none !important; }';
        document.head.appendChild(s);
      }
    } else {
      var el = document.getElementById('cs-no-motion');
      if (el) el.remove();
    }

    window.dispatchEvent(new CustomEvent('cs:a11y:applied', { detail: p }));
  },

  _initRuler() {
    var ruler = document.getElementById('cs-ruler');
    if (!ruler) {
      ruler           = document.createElement('div');
      ruler.id        = 'cs-ruler';
      ruler.setAttribute('aria-hidden', 'true');
      ruler.style.cssText =
        'position:fixed;left:0;right:0;height:2.5em;' +
        'background:rgba(255,215,0,0.25);' +
        'border-top:1px solid rgba(255,215,0,0.6);' +
        'border-bottom:1px solid rgba(255,215,0,0.6);' +
        'pointer-events:none;z-index:8000;display:none';
      document.body.appendChild(ruler);
      document.addEventListener('mousemove', function(e) {
        if (!document.body.classList.contains('cs-ruler-on')) return;
        ruler.style.display = 'block';
        ruler.style.top     = (e.clientY - 20) + 'px';
      });
    }
  }
};

/* ============================================================
   SECTION 8 — TOAST NOTIFICATIONS
   Small pop-up messages at the top-right of the page.
   CS.toast('Message', 'success')  — green tick
   CS.toast('Warning', 'warn')     — orange warning
   CS.toast('Failed', 'error')     — red cross
   CS.toast('Note', 'info')        — blue info
============================================================ */
function _toast(title, type, msg) {
  type = type || 'success';
  var container = document.querySelector('.cs-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'cs-toast-container';
    container.id        = 'cs-toasts';
    container.setAttribute('role', 'status');
    container.setAttribute('aria-live', 'polite');
    container.style.cssText =
      'position:fixed;top:70px;right:16px;z-index:10000;' +
      'display:flex;flex-direction:column;gap:8px;max-width:340px;';
    document.body.appendChild(container);
  }

  var colors = { success:'#15803D', warn:'#B45309', error:'#B91C1C', info:'#1D4ED8' };
  var icons  = { success:'✓', warn:'⚠', error:'✗', info:'ℹ' };
  var toast  = document.createElement('div');
  toast.setAttribute('role', 'alert');
  toast.style.cssText =
    'background:#fff;border:1px solid #e5e7eb;border-left:4px solid ' + (colors[type]||colors.info) + ';' +
    'border-radius:8px;padding:12px 14px;display:flex;gap:10px;align-items:flex-start;' +
    'box-shadow:0 4px 12px rgba(0,0,0,0.1);font-family:system-ui,sans-serif;';
  toast.innerHTML =
    '<div style="color:' + (colors[type]||colors.info) + ';font-size:16px;flex-shrink:0" aria-hidden="true">' + (icons[type]||icons.info) + '</div>' +
    '<div><div style="font-size:14px;font-weight:600;color:#111">' + title + '</div>' +
    (msg ? '<div style="font-size:12px;color:#6b7280;margin-top:2px">' + msg + '</div>' : '') + '</div>';

  container.appendChild(toast);
  setTimeout(function() { if (toast.parentNode) toast.remove(); }, 4000);
}

/* ============================================================
   SECTION 9 — NAVIGATION HELPERS
   Marks the current page link as active in the nav bar.
   Call CS.nav.init() once per page.
============================================================ */
const _nav = {
  init() {
    var path = location.pathname;
    var page = path.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a, [data-nav-link]').forEach(function(a) {
      var href = (a.getAttribute('href') || '').split('/').pop();
      a.classList.toggle('active', href === page);
      if (href === page) a.setAttribute('aria-current', 'page');
    });
  }
};

/* ============================================================
   GLOBAL CSS INJECTED BY shared.js
   These are the minimal styles needed for the shared
   components (toast, overlay, ruler, voice bar, caption).
   Each HTML page still has its own full stylesheet.
============================================================ */
(function() {
  var style = document.createElement('style');
  style.id  = 'cs-shared-styles';
  style.textContent = [
    /* High contrast mode */
    '.cs-high-contrast { filter: contrast(1.5); }',
    '.cs-inverted-contrast { filter: invert(1) hue-rotate(180deg); }',

    /* Voice command bar at bottom of screen */
    '#cs-voice-bar {',
    '  position:fixed;bottom:20px;left:50%;transform:translateX(-50%);',
    '  background:#0B4F6C;color:#fff;border-radius:9999px;',
    '  padding:10px 20px;display:flex;align-items:center;gap:10px;',
    '  font-size:14px;font-weight:500;z-index:9000;',
    '  opacity:0;pointer-events:none;transition:opacity 0.2s;',
    '  white-space:nowrap;',
    '}',
    '#cs-voice-bar.active { opacity:1; pointer-events:auto; }',
    '.cs-voice-dot {',
    '  width:10px;height:10px;border-radius:50%;',
    '  background:#F5A623;flex-shrink:0;',
    '}',
    '@keyframes cs-pulse {',
    '  0%,100%{transform:scale(1)} 50%{transform:scale(1.5)}',
    '}',

    /* Reading ruler */
    '#cs-ruler { display:none; }',
    '.cs-ruler-on #cs-ruler { display:block; }',

    /* Focus ring visible for keyboard users */
    ':focus-visible {',
    '  outline:3px solid #F5A623;outline-offset:3px;',
    '  border-radius:4px;',
    '}',

    /* Skip link for keyboard/screen reader users */
    '.cs-skip-link {',
    '  position:absolute;top:-100px;left:16px;',
    '  background:#0B4F6C;color:#fff;padding:8px 16px;',
    '  border-radius:6px;font-weight:700;z-index:10000;',
    '  transition:top 0.2s;text-decoration:none;',
    '}',
    '.cs-skip-link:focus { top:16px; }',
  ].join('\n');
  document.head.appendChild(style);
})();

/* ============================================================
   MY BOOKS NAV — injected into every page's .nav-links
   Reads cv_bookmarks + cv_active_book from localStorage.
   Lets user switch active book from any agent page.
============================================================ */
(function injectMyBooksNav() {
  function getBookmarks() {
    try { return JSON.parse(localStorage.getItem('cv_bookmarks') || '[]'); } catch(e) { return []; }
  }
  function getActive() {
    try { return JSON.parse(localStorage.getItem('cv_active_book') || 'null'); } catch(e) { return null; }
  }
  function setActive(b) {
    try { localStorage.setItem('cv_active_book', JSON.stringify(b)); } catch(e) {}
    // Refresh floating widget if present
    var old = document.getElementById('cv-book-widget');
    if (old) old.remove();
    if (typeof injectCelikVerseBook === 'function') {
      injectCelikVerseBook();
    } else {
      // Pass as URL params on current page
      var p = '?cv_title='+encodeURIComponent(b.title||'')
        +'&cv_author='+encodeURIComponent(b.author||'')
        +'&cv_url='+encodeURIComponent(b.url||'')
        +'&cv_cover='+encodeURIComponent(b.cover||'')
        +'&cv_source='+encodeURIComponent(b.source||'');
      location.href = location.pathname + p;
    }
    closeDropdown();
  }
  function closeDropdown() {
    var dd = document.getElementById('cs-mybooks-dd');
    if (dd) dd.style.display = 'none';
  }
  function buildItem(b, isActive) {
    var li = document.createElement('li');
    li.style.cssText = 'display:flex;align-items:center;gap:10px;padding:9px 14px;cursor:pointer;border-radius:8px;transition:background .15s;'+(isActive?'background:rgba(99,102,241,.12);':'');
    li.onmouseenter = function(){ li.style.background='rgba(99,102,241,.1)'; };
    li.onmouseleave = function(){ li.style.background=isActive?'rgba(99,102,241,.12)':''; };
    var coverEl = b.cover
      ? '<img src="'+b.cover+'" style="width:30px;height:42px;object-fit:cover;border-radius:4px;flex-shrink:0;" onerror="this.outerHTML=\'<div style=\\\"width:30px;height:42px;background:#e0e7ff;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:14px;\\\">📖</div>\'">'
      : '<div style="width:30px;height:42px;background:#e0e7ff;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;">📖</div>';
    li.innerHTML = coverEl +
      '<div style="flex:1;min-width:0;">' +
        '<div style="font-size:12px;font-weight:700;color:#1e1b4b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:180px;">'+b.title+'</div>' +
        '<div style="font-size:10px;color:#6b7280;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:180px;">'+(b.author||'')+'</div>' +
      '</div>' +
      (isActive ? '<span style="font-size:10px;background:#6366f1;color:#fff;padding:2px 6px;border-radius:10px;flex-shrink:0;">Aktif</span>' : '');
    li.onclick = function(){ setActive(b); };
    return li;
  }
  function buildDropdown() {
    var books = getBookmarks();
    var active = getActive();
    var dd = document.getElementById('cs-mybooks-dd');
    if (!dd) return;
    dd.innerHTML = '';
    dd.style.cssText = 'display:none;position:absolute;top:calc(100% + 8px);left:50%;transform:translateX(-50%);background:#fff;border-radius:14px;box-shadow:0 8px 32px rgba(30,27,75,.18);border:1px solid #e0e7ff;min-width:260px;max-width:300px;z-index:9999;overflow:hidden;padding:8px 6px;';

    // Header
    var hdr = document.createElement('div');
    hdr.style.cssText = 'display:flex;align-items:center;justify-content:space-between;padding:8px 10px 6px;border-bottom:1px solid #f0f0f8;margin-bottom:6px;';
    hdr.innerHTML = '<span style="font-size:11px;font-weight:800;letter-spacing:1.5px;color:#6366f1;">📚 BUKU SAYA</span>' +
      '<a href="celikverse-library.html" style="font-size:10px;color:#6366f1;text-decoration:none;font-weight:600;">+ Tambah Buku</a>';
    dd.appendChild(hdr);

    if (!books.length && !active) {
      var empty = document.createElement('div');
      empty.style.cssText = 'text-align:center;padding:18px 12px;color:#9ca3af;font-size:12px;';
      empty.innerHTML = '📖<br>Tiada buku disimpan.<br><a href="celikverse-library.html" style="color:#6366f1;font-weight:600;">Cari buku di CelikVerse →</a>';
      dd.appendChild(empty);
      return;
    }
    var ul = document.createElement('ul');
    ul.style.cssText = 'list-style:none;padding:0;margin:0;max-height:280px;overflow-y:auto;';

    // Show active book at top if not already in bookmarks
    if (active) {
      var inList = books.some(function(b){ return b.title === active.title; });
      if (!inList) ul.appendChild(buildItem(active, true));
    }
    books.forEach(function(b) {
      var isAct = active && b.title === active.title;
      ul.appendChild(buildItem(b, isAct));
    });
    dd.appendChild(ul);
  }

  function inject() {
    var navLinks = document.querySelector('.nav-links');
    if (!navLinks || document.getElementById('cs-mybooks-nav')) return;

    var books = getBookmarks();
    var active = getActive();
    var count = books.length + (active && !books.some(function(b){ return b.title===active.title; }) ? 1 : 0);

    var wrap = document.createElement('div');
    wrap.id = 'cs-mybooks-nav';
    wrap.style.cssText = 'position:relative;display:inline-block;';

    var btn = document.createElement('button');
    btn.style.cssText = 'background:none;border:none;cursor:pointer;font-size:14px;font-weight:600;color:inherit;padding:6px 4px;display:flex;align-items:center;gap:5px;white-space:nowrap;font-family:inherit;';
    btn.innerHTML = '📚 Buku Saya' + (count > 0 ? ' <span style="background:#6366f1;color:#fff;border-radius:99px;font-size:10px;font-weight:800;padding:1px 6px;min-width:18px;text-align:center;">'+count+'</span>' : '');
    btn.setAttribute('aria-haspopup', 'true');
    btn.setAttribute('aria-expanded', 'false');

    var dd = document.createElement('div');
    dd.id = 'cs-mybooks-dd';
    dd.style.display = 'none';
    buildDropdown();

    btn.onclick = function(e) {
      e.stopPropagation();
      var isOpen = dd.style.display !== 'none';
      dd.style.display = isOpen ? 'none' : 'block';
      btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      if (!isOpen) buildDropdown();
      // Re-append dd after rebuild
      if (dd.parentNode !== wrap) wrap.appendChild(dd);
    };

    document.addEventListener('click', function(){ closeDropdown(); });
    wrap.appendChild(btn);
    wrap.appendChild(dd);

    // Insert after Agents dropdown
    var agentsDropdown = navLinks.querySelector('.nav-dropdown');
    if (agentsDropdown && agentsDropdown.nextSibling) {
      navLinks.insertBefore(wrap, agentsDropdown.nextSibling);
    } else {
      navLinks.appendChild(wrap);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();

/* ============================================================
   CS_SHELF — My Reading Shelf utility library
   Manages the user's personal book shelf in localStorage.
   Shelf data: localStorage key "cs_shelf" (array of book objects).
   Book text:  localStorage key "cs_text_{id}" (full text string).
============================================================ */
(function(){
  var KEY = 'cs_shelf';
  function load(){ try{ return JSON.parse(localStorage.getItem(KEY)||'[]'); }catch(e){ return []; } }
  function save(arr){ try{ localStorage.setItem(KEY, JSON.stringify(arr)); }catch(e){} }
  function uid(){ return 'bk_'+Math.random().toString(36).slice(2,10)+'_'+Date.now(); }

  window.CS_SHELF = {
    getAll: function(){ return load(); },
    getById: function(id){ return load().find(function(b){ return b.id===id; })||null; },
    add: function(book){
      var arr = load();
      var existing = arr.find(function(b){ return b.url===book.url && b.title===book.title; });
      if(existing) return existing.id;
      var b = Object.assign({
        id: uid(), addedAt: Date.now(), lastOpened: null, lastMode: 'adhd',
        progress: 0, lastSentIdx: 0, bookmarks: [], notes: '', isFavourite: false,
        readingTime: 0, quizResults: [], cachedText: ''
      }, book);
      arr.unshift(b);
      save(arr);
      return b.id;
    },
    update: function(id, changes){
      var arr = load();
      var idx = arr.findIndex(function(b){ return b.id===id; });
      if(idx>-1){ arr[idx] = Object.assign(arr[idx], changes); save(arr); }
    },
    remove: function(id){
      save(load().filter(function(b){ return b.id!==id; }));
      try{ localStorage.removeItem('cs_text_'+id); }catch(e){}
    },
    setFavourite: function(id, val){
      this.update(id, {isFavourite: !!val});
    },
    updateProgress: function(id, sentIdx, pct, secs){
      this.update(id, {lastSentIdx: sentIdx||0, progress: Math.round(pct||0), readingTime: ((this.getById(id)||{}).readingTime||0)+Math.round(secs||0), lastOpened: Date.now()});
    },
    saveBookmark: function(id, bm){
      var b = this.getById(id); if(!b) return;
      var bms = b.bookmarks||[]; bms.push(bm); this.update(id, {bookmarks: bms});
    },
    saveNotes: function(id, text){ this.update(id, {notes: text}); },
    getCachedText: function(id){
      try{ return localStorage.getItem('cs_text_'+id)||''; }catch(e){ return ''; }
    },
    setCachedText: function(id, text){
      try{ localStorage.setItem('cs_text_'+id, text.slice(0, 4000000)); }catch(e){}
    },
    isOnShelf: function(title, url){
      return load().some(function(b){ return b.title===title||(url&&b.url===url); });
    },
    getByType: function(type){
      if(type==='all') return load();
      return load().filter(function(b){ return (b.type||'book')===type; });
    },
    getStats: function(){
      var all=load();
      try{ return JSON.parse(localStorage.getItem('cs_hub_stats')||'{}'); }catch(e){ return {}; }
    },
    recordSession: function(secs){
      try{
        var s=JSON.parse(localStorage.getItem('cs_hub_stats')||'{}');
        s.totalTime=(s.totalTime||0)+Math.round(secs||0);
        s.totalBooks=load().length;
        s.finished=load().filter(function(b){return b.progress>=95;}).length;
        // Streak logic
        var today=new Date().toDateString();
        if(s.lastDay!==today){ s.lastDay=today; s.streak=(s.streak||0)+1; }
        localStorage.setItem('cs_hub_stats',JSON.stringify(s));
      }catch(e){}
    }
  };
})();

/* ============================================================
   PUBLIC API — window.CS
   Every HTML page accesses everything through window.CS.

   Examples:
     CS.tts.speak("Hello learner")
     CS.voice.start()
     CS.gemini.summarise(text)
     CS.user.getA11y()
     CS.lang.t('nav_home')
     CS.analytics.computeRisk()
     CS.toast("Saved!", "success")
     CS.a11y.apply()
============================================================ */
window.CS = {
  lang:      _lang,
  user:      _user,
  analytics: _analytics,
  tts:       _tts,
  voice:     _voice,
  gemini:    _groq,
  // groq: legacy alias only — this calls Gemini, NOT the Groq API (api.groq.com)
  groq:      _groq,  /* legacy alias — use CS.gemini going forward */
  a11y:      _a11y,
  nav:       _nav,
  toast:     _toast,
  t:         function(key) { return _lang.t(key); },
};

/* ── Auto-initialise on every page load ─────────────────── */
document.addEventListener('DOMContentLoaded', function() {
  /* Apply saved language */
  _lang.init();

  /* Apply saved accessibility settings */
  _a11y.apply();

  /* Mark active nav link */
  _nav.init();

  /* BUG-024 — keyboard support for Agents nav dropdown */
  (function() {
    var dropBtn = document.querySelector('.nav-dropdown > button[aria-haspopup]');
    if (!dropBtn) return;

    dropBtn.addEventListener('keydown', function(e) {
      var menu = this.closest('.nav-dropdown').querySelector('.dropdown-menu');
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        var isOpen = menu.style.display === 'flex' || menu.classList.contains('open');
        if (isOpen) {
          menu.style.display = 'none'; menu.classList.remove('open');
          this.setAttribute('aria-expanded', 'false');
        } else {
          menu.style.display = 'flex'; menu.style.flexDirection = 'column';
          menu.classList.add('open');
          this.setAttribute('aria-expanded', 'true');
          var first = menu.querySelector('a, button');
          if (first) first.focus();
        }
      }
      if (e.key === 'Escape') {
        menu.style.display = 'none'; menu.classList.remove('open');
        this.setAttribute('aria-expanded', 'false'); this.focus();
      }
    });

    var menu = dropBtn.closest('.nav-dropdown').querySelector('.dropdown-menu');
    if (menu) {
      menu.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          this.style.display = 'none'; this.classList.remove('open');
          dropBtn.setAttribute('aria-expanded', 'false'); dropBtn.focus();
        }
      });
    }
  })();

  /* Language toggle buttons */
  document.addEventListener('click', function(e) {
    if (e.target.closest('[data-lang-toggle]')) {
      var next = _lang.get() === 'en' ? 'ms' : 'en';
      _lang.set(next);
    }
  });

  /* Escape key stops TTS */
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      _tts.stop();
      var panel = document.getElementById('cs-a11y-panel');
      if (panel) panel.removeAttribute('open');
    }
    /* Alt+S — stop audio */
    if (e.altKey && e.key === 's') { e.preventDefault(); _tts.stop(); }
    /* Alt+V — toggle voice */
    if (e.altKey && e.key === 'v') {
      e.preventDefault();
      _voice.isActive() ? _voice.stop() : _voice.start({ continuous: true });
    }
  });

  /* Offline / online banners */
  if (!navigator.onLine) _toast(_lang.t('err_offline'), 'warn');
  window.addEventListener('offline', function() { _toast(_lang.t('err_offline'), 'warn'); });
  window.addEventListener('online',  function() { _toast('Back online', 'success'); });
});

/* ── Global convenience bridges for HTML onclick handlers ───────────────
 *  All HTML pages call speak(), stopSpeech(), toggleLanguage(), toggleNav()
 *  and reference synth / currentLang directly. These bridges expose the
 *  internal CS modules as plain globals so those calls work without changes
 *  to any HTML file.
 * ──────────────────────────────────────────────────────────────────────── */

/** Speak text aloud. Mirrors CS.tts.speak(). */
window.speak = function(text, onEnd) {
  return _tts.speak(text, { onEnd: onEnd });
};

/** Stop any active TTS. Mirrors CS.tts.stop(). */
window.stopSpeech = function() {
  return _tts.stop();
};

/** Toggle language between EN and BM. Updates button label automatically. */
window.toggleLanguage = function() {
  var next = _lang.get() === 'en' ? 'ms' : 'en';
  _lang.set(next);
  /* Update every lang toggle button text */
  var btn = document.getElementById('langBtn');
  if (btn) btn.textContent = next === 'en' ? 'BM' : 'EN';
  window.currentLang = next;
};

/** Toggle mobile nav drawer. */
window.toggleNav = function() {
  var links = document.getElementById('navLinks');
  if (links) links.classList.toggle('active');
  var hamburger = document.querySelector('.nav-hamburger[aria-expanded]');
  if (hamburger) {
    var isOpen = links && links.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }
};

/** Expose the browser speech synthesis object as a global (used by blind-audio.html). */
window.synth = window.speechSynthesis;

/** Keep currentLang in sync — read by blind-audio.html and ocr-agent.html. */
window.currentLang = (function() {
  try { return localStorage.getItem('cs_lang') || 'en'; } catch(e) { return 'en'; }
})();

/* ============================================================
   CS.books — Book Discovery Agent data layer
   localStorage key: cs_my_library  (array of saved books)
   localStorage key: cs_book_content (text to pass between agents)
============================================================ */
window.CS.books = {

  /* ── Mock catalogue data ──────────────────────────────── */
  GUTENBERG: [
    { id:'g1', title:'Alice\'s Adventures in Wonderland', author:'Lewis Carroll', lang:'English', year:1865, subjects:['Fiction','Children'], accessibility:['adhd','dyslexia'], extract:'Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do…' },
    { id:'g2', title:'The Wonderful Wizard of Oz', author:'L. Frank Baum', lang:'English', year:1900, subjects:['Fiction','Children','Adventure'], accessibility:['adhd','dyslexia'], extract:'Dorothy lived in the midst of the great Kansas prairies, with Uncle Henry, who was a farmer, and Aunt Em, who was the farmer\'s wife…' },
    { id:'g3', title:'Pride and Prejudice', author:'Jane Austen', lang:'English', year:1813, subjects:['Fiction','Classic','Romance'], accessibility:['dyslexia'], extract:'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife…' },
    { id:'g4', title:'The Science of Getting Rich', author:'Wallace D. Wattles', lang:'English', year:1910, subjects:['Self-help','Career'], accessibility:['adhd','blind'], extract:'Whatever may be said in praise of poverty, the fact remains that it is not possible to live a really complete or successful life unless one is rich…' },
    { id:'g5', title:'Flatland: A Romance of Many Dimensions', author:'Edwin A. Abbott', lang:'English', year:1884, subjects:['Science','Mathematics','Fiction'], accessibility:['adhd','dyslexia'], extract:'I call our world Flatland, not because we call it so, but to make its nature clearer to you, my happy readers, who are privileged to live in Space…' },
    { id:'g6', title:'Twenty Thousand Leagues Under the Sea', author:'Jules Verne', lang:'English', year:1870, subjects:['Science','Adventure','Fiction'], accessibility:['adhd'], extract:'The year 1866 was signalised by a remarkable incident, a mysterious and puzzling phenomenon, which doubtless no one has yet forgotten…' },
    { id:'g7', title:'The Art of War', author:'Sun Tzu', lang:'English', year:500, subjects:['Strategy','History','Philosophy'], accessibility:['adhd','blind'], extract:'The art of war is of vital importance to the State. It is a matter of life and death, a road either to safety or to ruin…' },
    { id:'g8', title:'Siti Nurbaya', author:'Marah Rusli', lang:'Bahasa Melayu', year:1922, subjects:['Fiction','Malaysian Literature','Classic'], accessibility:['dyslexia'], extract:'Pada suatu hari di waktu petang, kedengaranlah suara seruling yang merdu sekali di lereng bukit Padang Panjang…' },
  ],

  OPEN_LIBRARY: [
    { id:'ol1', title:'Harry Potter and the Sorcerer\'s Stone', author:'J.K. Rowling', availability:'Preview', borrow:'Borrow available at library', url:'#', accessibility:['adhd','dyslexia'] },
    { id:'ol2', title:'The Very Hungry Caterpillar', author:'Eric Carle', availability:'Preview', borrow:'Physical copy at school library', url:'#', accessibility:['adhd','deaf','dyslexia'] },
    { id:'ol3', title:'Charlotte\'s Web', author:'E.B. White', availability:'Full text available', borrow:'Borrow available at library', url:'#', accessibility:['dyslexia','blind'] },
    { id:'ol4', title:'A Brief History of Time', author:'Stephen Hawking', availability:'Preview', borrow:'Ask library for access', url:'#', accessibility:['adhd','blind'] },
    { id:'ol5', title:'Totto-Chan: The Little Girl at the Window', author:'Tetsuko Kuroyanagi', availability:'Preview', borrow:'Borrow available at library', url:'#', accessibility:['adhd','dyslexia'] },
  ],

  GOOGLE_BOOKS: [
    { id:'gb1', title:'Thinking, Fast and Slow', author:'Daniel Kahneman', preview:'Snippet preview', pages:499, accessibility:['adhd','blind'] },
    { id:'gb2', title:'The Diary of a Young Girl', author:'Anne Frank', preview:'Limited preview', pages:283, accessibility:['dyslexia','deaf'] },
    { id:'gb3', title:'Atomic Habits', author:'James Clear', preview:'Snippet preview', pages:320, accessibility:['adhd'] },
    { id:'gb4', title:'Wonder', author:'R.J. Palacio', preview:'Limited preview', pages:315, accessibility:['adhd','dyslexia','deaf'] },
    { id:'gb5', title:'The Curious Incident of the Dog in the Night-Time', author:'Mark Haddon', preview:'Snippet preview', pages:226, accessibility:['adhd','dyslexia'] },
  ],

  COMMUNITY: [
    { id:'cm1', title:'Nota Sains Tingkatan 2 — Sistem Pernafasan', author:'Cikgu Amirah', type:'Note', lang:'Bahasa Melayu', accessibility:['adhd','dyslexia'] },
    { id:'cm2', title:'Mind Map: English Literature Form 4', author:'Student Volunteer', type:'Mind Map', lang:'English', accessibility:['adhd','deaf'] },
    { id:'cm3', title:'Vocabulary List — UPSR Bahasa Melayu', author:'Parent Community', type:'Vocabulary', lang:'Bahasa Melayu', accessibility:['dyslexia','blind'] },
    { id:'cm4', title:'Quiz: Matematik Tahun 5 — Pecahan', author:'Teacher Resource Pool', type:'Quiz', lang:'Bahasa Melayu', accessibility:['adhd','dyslexia'] },
  ],

  /* ── Recommendation engine ──────────────────────────────── */
  recommend: function(query) {
    var profile = null;
    try { profile = JSON.parse(localStorage.getItem('cs_user') || '{}'); } catch(e) { profile = {}; }
    var disability = ((profile.profile || {}).disability || '').toLowerCase();
    var lang = (profile.language || localStorage.getItem('cs_lang') || 'en');

    var q = (query || '').toLowerCase();
    var results = [];

    /* Gutenberg search */
    this.GUTENBERG.forEach(function(b) {
      var match = !q
        || b.title.toLowerCase().includes(q)
        || b.author.toLowerCase().includes(q)
        || b.subjects.some(function(s){ return s.toLowerCase().includes(q); });
      var accessMatch = !disability || b.accessibility.includes(disability);
      if (match || accessMatch) results.push(Object.assign({}, b, { source:'gutenberg', legalStatus:'public' }));
    });

    /* Open Library search */
    this.OPEN_LIBRARY.forEach(function(b) {
      var match = !q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q);
      if (match) results.push(Object.assign({}, b, { source:'openlibrary', legalStatus:'preview' }));
    });

    /* Google Books */
    this.GOOGLE_BOOKS.forEach(function(b) {
      var match = !q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q);
      if (match) results.push(Object.assign({}, b, { source:'googlebooks', legalStatus:'preview' }));
    });

    return results.slice(0, 20);
  },

  /* ── My Library ─────────────────────────────────────────── */
  getLibrary: function() {
    try { return JSON.parse(localStorage.getItem('cs_my_library') || '[]'); } catch(e) { return []; }
  },

  saveToLibrary: function(book) {
    var lib = this.getLibrary();
    var exists = lib.some(function(b){ return b.id === book.id; });
    if (!exists) {
      lib.unshift(Object.assign({}, book, { savedAt: Date.now(), progress: 0 }));
      localStorage.setItem('cs_my_library', JSON.stringify(lib));
    }
    return !exists;
  },

  removeFromLibrary: function(bookId) {
    var lib = this.getLibrary().filter(function(b){ return b.id !== bookId; });
    localStorage.setItem('cs_my_library', JSON.stringify(lib));
  },

  /* ── Send text to another agent via localStorage ─────────── */
  sendToAgent: function(text, title, agentPage) {
    localStorage.setItem('cs_book_content',       text  || '');
    localStorage.setItem('cs_book_content_title', title || '');
    if (agentPage) window.location.href = agentPage;
  },

  /* ── Community materials ────────────────────────────────── */
  getCommunityMaterials: function() {
    var saved = [];
    try { saved = JSON.parse(localStorage.getItem('cs_community_materials') || '[]'); } catch(e) {}
    return this.COMMUNITY.concat(saved);
  },

  saveCommunityMaterial: function(material) {
    var saved = [];
    try { saved = JSON.parse(localStorage.getItem('cs_community_materials') || '[]'); } catch(e) {}
    saved.unshift(Object.assign({}, material, { id: 'u' + Date.now(), savedAt: Date.now() }));
    localStorage.setItem('cs_community_materials', JSON.stringify(saved));
  },
};

/* ============================================================
   CS.db — Backend-ready data layer
   Wraps all localStorage reads/writes with a structured API
   that is 1:1 compatible with a future REST backend.
   All keys: cs_sessions, cs_agent_counts, cs_feedback,
             cs_class_roster (plus existing cs_user, etc.)
============================================================ */
window.CS.db = {

  // Schema version for future migrations
  SCHEMA_VERSION: 1,

  // ── Student profile ────────────────────────────────────
  getProfile: function() {
    try {
      var raw = localStorage.getItem('cs_user');
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      return {
        name:          parsed.name          || parsed.displayName || '',
        displayName:   parsed.displayName   || parsed.name        || '',
        language:      parsed.language      || 'en',
        onboarded:     parsed.onboarded     || false,
        profile:       parsed.profile       || {},
        accessibility: parsed.accessibility || {},
        stats:         parsed.stats         || {},
      };
    } catch(e) { return null; }
  },

  saveProfile: function(data) {
    try { localStorage.setItem('cs_user', JSON.stringify(data)); } catch(e) {}
  },

  // ── Learning sessions ──────────────────────────────────
  logSession: function(agentName, durationMs, outcome) {
    // outcome: { quizScore, wordsRead, focusMinutes, signsLearned }
    var sessions;
    try { sessions = JSON.parse(localStorage.getItem('cs_sessions') || '[]'); } catch(e) { sessions = []; }
    sessions.push({
      id:        Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      agentName: agentName || 'unknown',
      durationMs: durationMs || 0,
      outcome:   outcome   || {},
      ts:        new Date().toISOString(),
    });
    // cap at 500 entries
    if (sessions.length > 500) sessions = sessions.slice(-500);
    try { localStorage.setItem('cs_sessions', JSON.stringify(sessions)); } catch(e) {}
  },

  getSessions: function(days) {
    try {
      var all = JSON.parse(localStorage.getItem('cs_sessions') || '[]');
      if (!days) return all;
      var cutoff = Date.now() - days * 86400000;
      return all.filter(function(s) { return new Date(s.ts).getTime() > cutoff; });
    } catch(e) { return []; }
  },

  // ── Agent usage ────────────────────────────────────────
  trackAgent: function(agentName) {
    var counts;
    try { counts = JSON.parse(localStorage.getItem('cs_agent_counts') || '{}'); } catch(e) { counts = {}; }
    counts[agentName] = (counts[agentName] || 0) + 1;
    try { localStorage.setItem('cs_agent_counts', JSON.stringify(counts)); } catch(e) {}
  },

  getAgentCounts: function() {
    try { return JSON.parse(localStorage.getItem('cs_agent_counts') || '{}'); } catch(e) { return {}; }
  },

  // ── Feedback ───────────────────────────────────────────
  saveFeedback: function(formData) {
    var feedback;
    try { feedback = JSON.parse(localStorage.getItem('cs_feedback') || '[]'); } catch(e) { feedback = []; }
    feedback.push(Object.assign({ ts: new Date().toISOString() }, formData || {}));
    try { localStorage.setItem('cs_feedback', JSON.stringify(feedback)); } catch(e) {}
  },

  getFeedback: function() {
    try { return JSON.parse(localStorage.getItem('cs_feedback') || '[]'); } catch(e) { return []; }
  },

  // ── Class roster (teacher use) ─────────────────────────
  getClassRoster: function() {
    try { return JSON.parse(localStorage.getItem('cs_class_roster') || '[]'); } catch(e) { return []; }
  },

  saveClassRoster: function(students) {
    try { localStorage.setItem('cs_class_roster', JSON.stringify(students || [])); } catch(e) {}
  },

  addStudent: function(student) {
    // student = { id, name, profile, agents }
    var roster = this.getClassRoster();
    roster.push(student);
    this.saveClassRoster(roster);
  },

  // ── Export / Import ────────────────────────────────────
  exportToJSON: function() {
    return {
      schemaVersion: this.SCHEMA_VERSION,
      exportedAt:    new Date().toISOString(),
      profile:       this.getProfile(),
      sessions:      this.getSessions(),
      agentCounts:   this.getAgentCounts(),
      feedback:      this.getFeedback(),
      roster:        this.getClassRoster(),
    };
  },

  importFromJSON: function(json) {
    var data;
    try { data = typeof json === 'string' ? JSON.parse(json) : json; } catch(e) { console.error('[CS.db] importFromJSON: invalid JSON', e); return false; }
    if (!data || data.schemaVersion !== this.SCHEMA_VERSION) {
      console.warn('[CS.db] importFromJSON: schema version mismatch. Expected', this.SCHEMA_VERSION, 'got', data && data.schemaVersion);
      return false;
    }
    try {
      if (data.profile)     this.saveProfile(data.profile);
      if (data.sessions)    localStorage.setItem('cs_sessions',     JSON.stringify(data.sessions));
      if (data.agentCounts) localStorage.setItem('cs_agent_counts', JSON.stringify(data.agentCounts));
      if (data.feedback)    localStorage.setItem('cs_feedback',     JSON.stringify(data.feedback));
      if (data.roster)      localStorage.setItem('cs_class_roster', JSON.stringify(data.roster));
      return true;
    } catch(e) { console.error('[CS.db] importFromJSON error', e); return false; }
  },

  // ── Backend sync stub ──────────────────────────────────
  // Currently logs to console. Replace this stub with a real fetch() call
  // once a backend is configured.
  syncToBackend: function() {
    var payload = this.exportToJSON();
    console.log('[CS.db] Backend sync ready. Payload size:', JSON.stringify(payload).length, 'bytes');
    console.log('[CS.db] To enable: replace this stub with fetch(\'/api/sync\', {method:\'POST\',body:JSON.stringify(payload)})');
    return Promise.resolve({ status: 'local_only', message: 'Backend not configured' });
  },
};

/* ============================================================
   CS.offline — Intelligent Offline Mode
   IndexedDB-backed offline storage with online/offline detection,
   banner management, AI fallback cache, and sync queue.

   Stores (IndexedDB: 'celiksense-idb', version 2):
     downloads   — book text content saved for offline reading
     ocr_cache   — OCR-extracted text from scanned images
     ai_cache    — OpenRouter AI responses cached for offline replay
     sync_queue  — items queued to sync when connectivity returns

   Usage:
     CS.offline.init()                      // call once on DOMContentLoaded
     CS.offline.saveDownload(book)          // save book text offline
     CS.offline.getDownloads()              // Promise<items[]>
     CS.offline.saveOCR(text, title)        // cache OCR result
     CS.offline.saveAIResponse(key, resp)   // cache AI answer
     CS.offline.getCachedAIResponse(key)    // Promise<response|null>
     CS.offline.getStorageInfo()            // Promise<{used,quota,pct}>
     CS.offline.isOnline()                  // bool
============================================================ */
window.CS.offline = (function() {

  var IDB_NAME    = 'celiksense-idb';
  var IDB_VERSION = 2;
  var _db         = null;
  var _bannerEl   = null;
  var _syncEl     = null;
  var _wasOnline  = null;
  var _lang       = { t: function(k) { return (window.CS && window.CS.lang) ? window.CS.lang.t(k) : k; } };

  /* ── IndexedDB open ──────────────────────────────────── */
  function _openDB() {
    if (_db) return Promise.resolve(_db);
    return new Promise(function(resolve, reject) {
      var req = indexedDB.open(IDB_NAME, IDB_VERSION);
      req.onerror   = function() { reject(req.error); };
      req.onsuccess = function() { _db = req.result; resolve(_db); };
      req.onupgradeneeded = function(e) {
        var db = e.target.result;
        if (!db.objectStoreNames.contains('downloads')) {
          var s = db.createObjectStore('downloads', { keyPath: 'id' });
          s.createIndex('savedAt', 'savedAt');
        }
        if (!db.objectStoreNames.contains('ocr_cache')) {
          db.createObjectStore('ocr_cache', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('ai_cache')) {
          db.createObjectStore('ai_cache', { keyPath: 'key' });
        }
        if (!db.objectStoreNames.contains('sync_queue')) {
          var sq = db.createObjectStore('sync_queue', { keyPath: 'id', autoIncrement: true });
          sq.createIndex('ts', 'ts');
        }
      };
    });
  }

  function _put(store, item) {
    return _openDB().then(function(db) {
      return new Promise(function(resolve, reject) {
        var tx  = db.transaction(store, 'readwrite');
        var req = tx.objectStore(store).put(item);
        req.onsuccess = function() { resolve(req.result); };
        req.onerror   = function() { reject(req.error); };
      });
    });
  }

  function _getAll(store) {
    return _openDB().then(function(db) {
      return new Promise(function(resolve, reject) {
        var tx  = db.transaction(store, 'readonly');
        var req = tx.objectStore(store).getAll();
        req.onsuccess = function() { resolve(req.result || []); };
        req.onerror   = function() { reject(req.error); };
      });
    });
  }

  function _delete(store, key) {
    return _openDB().then(function(db) {
      return new Promise(function(resolve, reject) {
        var tx  = db.transaction(store, 'readwrite');
        var req = tx.objectStore(store).delete(key);
        req.onsuccess = function() { resolve(); };
        req.onerror   = function() { reject(req.error); };
      });
    });
  }

  function _get(store, key) {
    return _openDB().then(function(db) {
      return new Promise(function(resolve, reject) {
        var tx  = db.transaction(store, 'readonly');
        var req = tx.objectStore(store).get(key);
        req.onsuccess = function() { resolve(req.result || null); };
        req.onerror   = function() { reject(req.error); };
      });
    });
  }

  /* ── Banner helpers ──────────────────────────────────── */
  function _ensureBanners() {
    if (_bannerEl) return;

    /* Offline banner */
    _bannerEl              = document.createElement('div');
    _bannerEl.id           = 'cs-offline-banner';
    _bannerEl.setAttribute('role', 'alert');
    _bannerEl.setAttribute('aria-live', 'assertive');
    _bannerEl.setAttribute('aria-atomic', 'true');
    _bannerEl.style.cssText = [
      'position:fixed;top:0;left:0;right:0;z-index:10001;',
      'background:linear-gradient(90deg,#1e1b4b,#312e81);',
      'color:#e0e7ff;font-family:inherit;font-size:13px;font-weight:600;',
      'padding:10px 20px;display:none;',
      'flex-direction:column;gap:2px;',
      'border-bottom:2px solid #6366f1;',
    ].join('');
    document.body.appendChild(_bannerEl);

    /* Sync banner */
    _syncEl              = document.createElement('div');
    _syncEl.id           = 'cs-sync-banner';
    _syncEl.setAttribute('role', 'status');
    _syncEl.setAttribute('aria-live', 'polite');
    _syncEl.style.cssText = [
      'position:fixed;top:0;left:0;right:0;z-index:10002;',
      'background:linear-gradient(90deg,#064e3b,#065f46);',
      'color:#d1fae5;font-family:inherit;font-size:13px;font-weight:600;',
      'padding:10px 20px;display:none;align-items:center;gap:10px;',
      'border-bottom:2px solid #34d399;',
    ].join('');
    document.body.appendChild(_syncEl);
  }

  function _showOfflineBanner() {
    _ensureBanners();
    var t = _lang.t.bind(_lang);
    _bannerEl.style.display = 'flex';
    _bannerEl.innerHTML =
      '<span style="font-size:16px;margin-right:6px;" aria-hidden="true">📡</span>' +
      '<span>' + t('offline_banner') + '</span>' +
      '<span style="font-size:11px;opacity:0.8;margin-top:1px;">' + t('offline_banner_sub') + '</span>';
    /* Push page content down so banner doesn't overlap nav */
    document.body.style.marginTop = '52px';
  }

  function _hideOfflineBanner() {
    if (!_bannerEl) return;
    _bannerEl.style.display = 'none';
    document.body.style.marginTop = '';
  }

  function _showSyncBanner() {
    _ensureBanners();
    _syncEl.style.display = 'flex';
    _syncEl.innerHTML =
      '<span aria-hidden="true" style="animation:spin 1s linear infinite;display:inline-block;">🔄</span>' +
      '<span>' + _lang.t('offline_sync_banner') + '</span>';
    /* Add spin keyframes once */
    if (!document.getElementById('cs-spin-style')) {
      var s = document.createElement('style');
      s.id = 'cs-spin-style';
      s.textContent = '@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}';
      document.head.appendChild(s);
    }
  }

  function _hideSyncBanner(success) {
    if (!_syncEl) return;
    if (success) {
      _syncEl.innerHTML = '<span>✅ ' + _lang.t('offline_sync_done') + '</span>';
      setTimeout(function() { _syncEl.style.display = 'none'; }, 3000);
    } else {
      _syncEl.style.display = 'none';
    }
  }

  /* ── SW messaging helper ─────────────────────────────── */
  function _swMessage(msg) {
    return new Promise(function(resolve) {
      if (!navigator.serviceWorker || !navigator.serviceWorker.controller) {
        resolve({ ok: false, error: 'SW not active' });
        return;
      }
      var channel = new MessageChannel();
      channel.port1.onmessage = function(e) { resolve(e.data); };
      navigator.serviceWorker.controller.postMessage(msg, [channel.port2]);
    });
  }

  /* ── Public API ──────────────────────────────────────── */
  return {

    isOnline: function() { return navigator.onLine; },

    /* Save book/article text for offline reading */
    saveDownload: function(book) {
      if (!book || !book.id) return Promise.reject(new Error('Missing id'));
      var item = {
        id:          book.id,
        title:       book.title       || 'Untitled',
        text:        book.text        || book.extract || '',
        author:      book.author      || '',
        source:      book.source      || 'unknown',
        legalStatus: book.legalStatus || 'unknown',
        savedAt:     Date.now(),
        size:        ((book.text || book.extract || '').length),
      };
      return _put('downloads', item);
    },

    getDownloads: function() {
      return _getAll('downloads').catch(function() { return []; });
    },

    removeDownload: function(id) {
      return _delete('downloads', id);
    },

    isDownloaded: function(id) {
      return _get('downloads', id).then(function(item) { return !!item; }).catch(function() { return false; });
    },

    /* OCR cache */
    saveOCR: function(text, title) {
      var item = {
        id:      'ocr-' + Date.now(),
        title:   title || 'OCR Scan',
        text:    text  || '',
        savedAt: Date.now(),
        size:    (text || '').length,
      };
      return _put('ocr_cache', item);
    },

    getOCRCache: function() {
      return _getAll('ocr_cache').catch(function() { return []; });
    },

    removeOCR: function(id) {
      return _delete('ocr_cache', id);
    },

    /* AI response cache — used for offline AI Teacher fallback */
    saveAIResponse: function(promptKey, response) {
      return _put('ai_cache', {
        key:      promptKey || ('ai-' + Date.now()),
        prompt:   promptKey || '',
        response: response  || '',
        savedAt:  Date.now(),
      });
    },

    getCachedAIResponse: function(promptKey) {
      return _get('ai_cache', promptKey).then(function(item) {
        return item ? item.response : null;
      }).catch(function() { return null; });
    },

    getAICache: function() {
      return _getAll('ai_cache').catch(function() { return []; });
    },

    removeAICache: function(key) {
      return _delete('ai_cache', key);
    },

    /* Sync queue */
    addToSyncQueue: function(type, data) {
      return _put('sync_queue', { type: type, data: data, ts: Date.now() });
    },

    getSyncQueue: function() {
      return _getAll('sync_queue').catch(function() { return []; });
    },

    clearSyncQueue: function() {
      return _openDB().then(function(db) {
        return new Promise(function(resolve, reject) {
          var tx  = db.transaction('sync_queue', 'readwrite');
          var req = tx.objectStore('sync_queue').clear();
          req.onsuccess = resolve;
          req.onerror   = function() { reject(req.error); };
        });
      });
    },

    /* Trigger sync of queued items when back online */
    processSyncQueue: function() {
      var self = this;
      _showSyncBanner();
      return self.getSyncQueue().then(function(items) {
        if (!items.length) {
          _hideSyncBanner(true);
          localStorage.setItem('cs_last_sync', Date.now().toString());
          return;
        }
        /* Prototype: log to console; real implementation would POST to backend */
        console.log('[CS.offline] Sync queue processed:', items.length, 'items');
        localStorage.setItem('cs_last_sync',        Date.now().toString());
        localStorage.setItem('cs_pending_sync_count', '0');
        _toast(_lang.t('offline_sync_done'), 'success');
        _hideSyncBanner(true);
        /* Background Sync API fallback registration */
        if (navigator.serviceWorker && navigator.serviceWorker.ready) {
          navigator.serviceWorker.ready.then(function(reg) {
            if (reg.sync) return reg.sync.register('cs-progress-sync').catch(function(){});
          }).catch(function(){});
        }
        return self.clearSyncQueue();
      }).catch(function() {
        _hideSyncBanner(false);
      });
    },

    /* Storage estimate */
    getStorageInfo: function() {
      if (navigator.storage && navigator.storage.estimate) {
        return navigator.storage.estimate().then(function(est) {
          var used  = est.usage  || 0;
          var quota = est.quota  || 0;
          return {
            used:  used,
            quota: quota,
            free:  quota - used,
            pct:   quota > 0 ? Math.round((used / quota) * 100) : 0,
            usedMB:  (used  / 1048576).toFixed(1),
            quotaMB: (quota / 1048576).toFixed(1),
            freeMB:  ((quota - used) / 1048576).toFixed(1),
          };
        });
      }
      /* Fallback: estimate from localStorage size */
      var lsSize = 0;
      for (var k in localStorage) {
        if (localStorage.hasOwnProperty(k)) lsSize += localStorage[k].length * 2;
      }
      return Promise.resolve({
        used: lsSize, quota: 5242880, free: 5242880 - lsSize,
        pct: Math.round((lsSize / 5242880) * 100),
        usedMB: (lsSize / 1048576).toFixed(2),
        quotaMB: '5.0',
        freeMB: ((5242880 - lsSize) / 1048576).toFixed(2),
      });
    },

    /* Notes, bookmarks, quizzes from localStorage */
    getNotes: function() {
      try { return JSON.parse(localStorage.getItem('cs_notes') || '[]'); } catch(e) { return []; }
    },

    getBookmarks: function() {
      try { return JSON.parse(localStorage.getItem('cs_bookmarks') || '[]'); } catch(e) { return []; }
    },

    getQuizHistory: function() {
      try { return JSON.parse(localStorage.getItem('cs_quiz_history') || '[]'); } catch(e) { return []; }
    },

    getHighlights: function() {
      try { return JSON.parse(localStorage.getItem('cs_highlights') || '[]'); } catch(e) { return []; }
    },

    /* Init: detect online/offline and wire up banners + sync */
    init: function() {
      var self = this;
      _ensureBanners();

      /* SW message listener for SYNC_STARTED */
      if (navigator.serviceWorker) {
        navigator.serviceWorker.addEventListener('message', function(e) {
          if (e.data && e.data.type === 'SYNC_STARTED') {
            _showSyncBanner();
          }
          if (e.data && e.data.type === 'SW_UPDATED') {
            window.location.reload();
          }
        });
      }

      /* Initial state */
      _wasOnline = navigator.onLine;
      if (!navigator.onLine) _showOfflineBanner();

      /* Listen for changes */
      window.addEventListener('online', function() {
        _hideOfflineBanner();
        if (_wasOnline === false) {
          /* Just came back online — process sync queue */
          setTimeout(function() { self.processSyncQueue(); }, 800);
        }
        _wasOnline = true;
        window.dispatchEvent(new CustomEvent('cs:online'));
      });

      window.addEventListener('offline', function() {
        _showOfflineBanner();
        _wasOnline = false;
        window.dispatchEvent(new CustomEvent('cs:offline'));
      });

      /* Patch CS.gemini to fall back to cache when offline */
      var origGenerate = window.CS && window.CS.gemini && window.CS.gemini._generate;
      if (origGenerate) {
        window.CS.gemini._generateOfflineAware = function(prompt, opts) {
          if (!navigator.onLine) {
            var cacheKey = prompt.substring(0, 120);
            return self.getCachedAIResponse(cacheKey).then(function(cached) {
              if (cached) {
                return '\n\n' + _lang.t('offline_ai_fallback') + '\n\n' + cached;
              }
              return _lang.t('offline_no_ai');
            });
          }
          return origGenerate.call(window.CS.gemini, prompt, opts).then(function(response) {
            /* Cache successful AI responses for offline replay */
            var cacheKey = prompt.substring(0, 120);
            self.saveAIResponse(cacheKey, response).catch(function(){});
            return response;
          });
        };
      }

      /* Register Background Sync for periodic progress saves */
      if (navigator.serviceWorker && navigator.serviceWorker.ready && 'SyncManager' in window) {
        navigator.serviceWorker.ready.then(function(reg) {
          reg.sync.register('cs-progress-sync').catch(function(){});
        }).catch(function(){});
      }

      /* Auto-add reading progress to sync queue every 5 minutes */
      setInterval(function() {
        try {
          var sessions = JSON.parse(localStorage.getItem('cs_sessions') || '[]');
          if (sessions.length > 0) {
            self.addToSyncQueue('reading_progress', {
              sessions: sessions.slice(-10),
              ts: Date.now(),
            }).catch(function(){});
            var pending = parseInt(localStorage.getItem('cs_pending_sync_count') || '0');
            localStorage.setItem('cs_pending_sync_count', String(pending + 1));
          }
        } catch(e) {}
      }, 300000);
    },
  };

})();
