/* ==========================================================
   TeleCore Application Script (Enhanced Edition v3.0)
   Features:
   - 3 Theme Switchers (Cyberpunk, Cream, Light)
   - Dual-Language System (Persian RTL / English LTR)
   - Live Clock & Jalali / Gregorian Date
   - Tab Navigation (Dashboard, Accounts, Mass Actions, Inbox, Scheduler, Cleaner, Storage)
   - Dynamic Recent Events & Upcoming Tasks
   - Smart Omnibox Search & Multi-criteria Account Filters
   - Account Selection with Click Priority (#1, #2, #3 execution order)
   - Smart Telegram Link Inspector & Auto-bypass 2-Addlist limit
   - Full Telegram Reactions Suite (45+ emojis + Custom Input)
   - Comments System (Spin text rotation, multi-accounts, scheduling)
   - Inbox & Bot Manager: Full Telegram Rich Message support (Inline glass buttons, Photo with caption, Polls with live voting, Voice wave bubble, Documents, Spoilers, Blockquotes, Reactions - NO video)
   - Cleanup & Purge Module: Bulk leave groups/channels, block bots, random purge, purge inactive by date
   - Telegram Login Helper Modal (Phone, 2FA, Instant Live OTP with copy buttons)
   - Custom Category Creator Modal & Dynamic Chip Filters
   ========================================================== */

// --- Security Utility: HTML Sanitizer to prevent XSS injection ---
function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// --- Translation Dictionary (FA / EN) ---
const translations = {
  fa: {
    // Navigation
    navOverview: "ط¯ط§ط´ط¨ظˆط±ط¯ ظˆ ط¢ظ…ط§ط± ط²ظ†ط¯ظ‡",
    navAccounts: "ظ…ط¯غŒط±غŒطھ ط§ع©ط§ظ†طھâ€Œظ‡ط§ ظˆ ع©ط¯ظ‡ط§",
    navActions: "ط¹ظ…ظ„غŒط§طھ ع¯ط±ظˆظ‡غŒ (ظ„ط§غŒع©/ط¬ظˆغŒظ†/ع©ط§ظ…ظ†طھ)",
    navInbox: "ظ¾غŒظˆغŒ ظˆ ط±ط¨ط§طھâ€Œظ‡ط§ (ط±غŒع† ظ…ط³غŒط¬)",
    navScheduler: "ط³ظگظ„ظپ ط¨ط§طھ ظˆ ط²ظ…ط§ظ†â€Œط¨ظ†ط¯غŒ",
    navCleanup: "ظ¾ط§ع©ط³ط§ط²غŒ ظˆ ط®ط±ظˆط¬ (ع¯ظ¾/ع†ظ†ظ„/ط¨ط§طھ)",
    navStorage: "ط°ط®غŒط±ظ‡â€Œط³ط§ط²غŒ ظˆ ط±غŒظ„ظˆغŒ",
    navLabel: "ظ…ظ†ظˆغŒ ظ†ط§ظˆط¨ط±غŒ",
    sidebarHealthTitle: "ظˆط¶ط¹غŒطھ ط³ط´ظ†â€Œظ‡ط§",
    sidebarHealthDesc: "طھظ…ط§ظ…غŒ ط³ط´ظ†â€Œظ‡ط§ ط±ظˆغŒ ظˆظ„ظˆظ… /data ظ…طھطµظ„ ظˆ ط¢ظ…ط§ط¯ظ‡ ظ‡ط³طھظ†ط¯.",
    volumeIndicator: 'RAILWAY VOLUME: <code class="mono-code">/data</code> [ط¢ظ†ظ„ط§غŒظ†]',

    // Dashboard
    overviewTitle: "ط¯ط§ط´ط¨ظˆط±ط¯ ظ…ط§ظ†غŒطھظˆط±غŒظ†ع¯ ط²ظ†ط¯ظ‡",
    overviewDesc: "ظ†ظ…ط§غŒ ع©ظ„غŒ ظپط¹ط§ظ„غŒطھâ€Œظ‡ط§طŒ ط¢ط®ط±غŒظ† ط¹ظ…ظ„غŒط§طھâ€Œظ‡ط§ ظˆ ط³ظ„ط§ظ…طھ ط§ع©ط§ظ†طھâ€Œظ‡ط§غŒ ظپط¹ط§ظ„",
    statActiveSessions: "ط§ع©ط§ظ†طھâ€Œظ‡ط§غŒ ظ…طھطµظ„",
    statOperationsToday: "ط¹ظ…ظ„غŒط§طھ ظ…ظˆظپظ‚ ط§ظ…ط±ظˆط²",
    statMonitoredChats: "ظˆط¸ط§غŒظپ ط³ظ„ظپ / ط²ظ…ط§ظ†â€Œط¨ظ†ط¯غŒ",
    statStorageUsed: "ظپط¶ط§غŒ ط§ط´ط؛ط§ظ„â€Œط´ط¯ظ‡ ظˆظ„ظˆظ…",
    recentEventsTitle: "ط±ظˆغŒط¯ط§ط¯ظ‡ط§غŒ ط§ط®غŒط±",
    recentEventsSubtitle: "ع¯ط±ط¯ط´â€Œظ‡ط§غŒ ط§ظ†ط¬ط§ظ… ط´ط¯ظ‡ طھظˆط³ط· ط§ع©ط§ظ†طھâ€Œظ‡ط§",
    btnAllEvents: "طھظ…ط§ظ… ط±ظˆغŒط¯ط§ط¯ظ‡ط§",
    upcomingActionsTitle: "ط§ظ‚ط¯ط§ظ…â€Œظ‡ط§غŒ ط¨ط¹ط¯غŒ",
    upcomingActionsSubtitle: "ظ¾غŒط§ظ…â€Œظ‡ط§غŒغŒ ع©ظ‡ ط¨ظ‡â€Œط²ظˆط¯غŒ ط§ط¬ط±ط§ ظ…غŒâ€Œط´ظˆظ†ط¯",
    btnAllSchedules: "ظ‡ظ…ظ‡ ط²ظ…ط§ظ†â€Œط¨ظ†ط¯غŒâ€Œظ‡ط§",
    terminalTitle: "طھط±ظ…غŒظ†ط§ظ„ ظپط¹ط§ظ„غŒطھ ط²ظ†ط¯ظ‡ ط³غŒط³طھظ… (/data/logs)",
    btnClearLogs: "ظ¾ط§ع©ط³ط§ط²غŒ ظ„ط§ع¯",

    // Accounts Tab
    accountsTitle: "ظ…ط¯غŒط±غŒطھ ط§ع©ط§ظ†طھâ€Œظ‡ط§غŒ طھظ„ع¯ط±ط§ظ…",
    accountsDesc: "ظپظ‡ط±ط³طھطŒ ط¬ط³طھط¬ظˆغŒ ظ¾غŒط´ط±ظپطھظ‡طŒ ط¯ط³طھظ‡â€Œط¨ظ†ط¯غŒâ€Œظ‡ط§غŒ ط´ط®طµغŒطŒ ط¢ظ…ط§ط± ع©ط´ظˆط± ظˆ ط³ط§ظ„ ط³ط§ط®طھطŒ ظˆ ظ‚ط·ط¹ ط§طھطµط§ظ„",
    btnAddAccount: "â‍• ط§ظپط²ظˆط¯ظ† ط§ع©ط§ظ†طھ ط¬ط¯غŒط¯",
    btnCreateCategory: "ًں“پ ط³ط§ط®طھ ط¯ط³طھظ‡ ط¬ط¯غŒط¯",
    btnCheckSessions: "âڑ، ط¨ط±ط±ط³غŒ ط³ظ„ط§ظ…طھ ظ‡ظ…ظ‡",
    statPillTotal: "ع©ظ„ ط§ع©ط§ظ†طھâ€Œظ‡ط§:",
    statPillOnline: "â—ڈ ظ…طھطµظ„:",
    statPillDisc: "â—ڈ ظ‚ط·ط¹ ط§طھطµط§ظ„:",
    lblFilterCountry: "ًںŒچ ظپغŒظ„طھط± ط¨ط± ط­ط³ط¨ ع©ط´ظˆط±:",
    lblFilterYear: "ًں“… ظپغŒظ„طھط± ط³ط§ظ„ ط³ط§ط®طھ ط§ع©ط§ظ†طھ:",
    lblFilterCategory: "ًںڈ·ï¸ڈ ط¯ط³طھظ‡â€Œط¨ظ†ط¯غŒâ€Œظ‡ط§غŒ ط´ط®طµغŒ:",
    searchPlaceholder: "ط¬ط³طھط¬ظˆغŒ ظ‡ظ…ظ‡â€Œط¬ط§ظ†ط¨ظ‡: ط´ظ…ط§ط±ظ‡ طھظ„ظپظ† (+98...)طŒ ط¢غŒط¯غŒ (@id)طŒ ط¢غŒط¯غŒ ط¹ط¯ط¯غŒ (User ID: 12345...)طŒ ظ†ط§ظ… ظ¾ط±ظˆظپط§غŒظ„ غŒط§ ط¨ط±ع†ط³ط¨...",
    otpSectionTitle: "ًں“¬ ط¯ط±غŒط§ظپطھ ع©ط¯ظ‡ط§غŒ ظˆط±ظˆط¯ ط§ط®غŒط± (Telegram Login Codes)",
    otpSectionBadge: "ط³غŒط³طھظ… ط´ظ†ظˆط¯ ط³ط±ظˆغŒط³ طھظ„ع¯ط±ط§ظ… ظپط¹ط§ظ„ ط§ط³طھ",
    thAccount: "ط§ع©ط§ظ†طھ",
    thPhone: "ط´ظ…ط§ط±ظ‡ طھظ„ظپظ†",
    thCode: "ع©ط¯ ط¯ط±غŒط§ظپطھغŒ (Login Code)",
    thTime: "ط²ظ…ط§ظ† ط¯ط±غŒط§ظپطھ",
    thActions: "ط¹ظ…ظ„غŒط§طھ",

    // Actions & Priority
    actionsTitle: "ط¹ظ…ظ„غŒط§طھ ع¯ط±ظˆظ‡غŒ ظˆ ظ‡ظ…ط§ظ‡ظ†ع¯",
    actionsDesc: "ط§ظ†ط¬ط§ظ… ط¯ط³طھظ‡â€Œط¬ظ…ط¹غŒ ع©ط§ط±ظ‡ط§غŒغŒ ظ…ط«ظ„ ط¬ظˆغŒظ† ط¨ظ‡ ع©ط§ظ†ط§ظ„/ع¯ط±ظˆظ‡طŒ ط§ط±ط³ط§ظ„ ع©ط§ظ…ظ†طھطŒ ط«ط¨طھ ط±غŒâ€Œط§ع©ط´ظ† ظˆ ظ„ط§غŒع©طŒ غŒط§ ط±ط§غŒ ط¯ط§ط¯ظ† ط¨ظ‡ ظ†ط¸ط±ط³ظ†ط¬غŒ ط¨ط§ ط§ظˆظ„ظˆغŒطھ ط§ظ†طھط®ط§ط¨غŒ ط§ع©ط§ظ†طھâ€Œظ‡ط§",
    priorityBoxTitle: "ًں‘¥ ط§ظ†طھط®ط§ط¨ ط§ع©ط§ظ†طھâ€Œظ‡ط§ ظˆ ط§ظˆظ„ظˆغŒطھ ط§ط¬ط±ط§ (ط¨ط§ ع©ظ„غŒع© ظ…ط³طھظ‚غŒظ…)",
    priorityBoxDesc: "ط±ظˆغŒ ط§ع©ط§ظ†طھâ€Œظ‡ط§ ع©ظ„غŒع© ع©ظ†غŒط¯ط› طھط±طھغŒط¨ ع©ظ„غŒع© ط´ظ…ط§ ط¯ظ‚غŒظ‚ط§ظ‹ ط§ظˆظ„ظˆغŒطھ ط§ط¬ط±ط§غŒ ط¹ظ…ظ„غŒط§طھ ط±ط§ طھط¹غŒغŒظ† ظ…غŒâ€Œع©ظ†ط¯ (ط´ظ…ط§ط±ظ‡â€Œظ‡ط§غŒ #غ±طŒ #غ² ظˆ... طھط±طھغŒط¨ ط§ط¬ط±ط§ ظ‡ط³طھظ†ط¯).",
    btnSelectAllSeq: "âڑ، ط§ظ†طھط®ط§ط¨ ظ‡ظ…ظ‡ ط¨ظ‡ طھط±طھغŒط¨",
    btnSelectOnline: "ًںں¢ ظپظ‚ط· ط¢ظ†ظ„ط§غŒظ†â€Œظ‡ط§",
    btnClearPriority: "â‌Œ ظ„ط؛ظˆ ط§ظ†طھط®ط§ط¨",
    actionConfigTitle: "طھظ†ط¸غŒظ…ط§طھ ط¹ظ…ظ„غŒط§طھ",
    lblActionType: "ظ†ظˆط¹ ط¹ظ…ظ„غŒط§طھ:",
    lblActionTarget: "ظ„غŒظ†ع© ظ…ظ‚طµط¯ غŒط§ ط´ظ†ط§ط³ظ‡ (Target Link / Username):",
    lblPollIndex: "ط´ظ…ط§ط±ظ‡ ع¯ط²غŒظ†ظ‡ ظ†ط¸ط±ط³ظ†ط¬غŒ (Option Index):",
    lblReactionType: "ط§ظ†طھط®ط§ط¨ ط±غŒâ€Œط§ع©ط´ظ† (ع©ظ„ ط±غŒâ€Œط§ع©ط´ظ†â€Œظ‡ط§غŒ طھظ„ع¯ط±ط§ظ…):",
    lblCommentText: "ظ…طھظ† ع©ط§ظ…ظ†طھâ€Œظ‡ط§ (غŒع© ع©ط§ظ…ظ†طھ ط¯ط± ظ‡ط± ط®ط· ط¨ط±ط§غŒ ط§ط±ط³ط§ظ„ ع†ط±ط®ط´غŒ ط¨غŒظ† ط§ع©ط§ظ†طھâ€Œظ‡ط§):",
    lblScheduleCommentToggle: "âڈ° ط°ط®غŒط±ظ‡ ط¨ظ‡ ط¹ظ†ظˆط§ظ† طھط³ع© ط²ظ…ط§ظ†â€Œط¨ظ†ط¯غŒ ط´ط¯ظ‡ (Scheduler)",
    lblActionDelay: "ظپط§طµظ„ظ‡ ط²ظ…ط§ظ†غŒ ط¨غŒظ† ظ‡ط± ط§ع©ط§ظ†طھ (ط«ط§ظ†غŒظ‡ - ط¬ظ‡طھ ط§ظ…ظ†غŒطھ ظˆ ط¬ظ„ظˆع¯غŒط±غŒ ط§ط² ظپظ„ظˆط¯):",
    btnStartAction: "ًںڑ€ ط´ط±ظˆط¹ ط§ط¬ط±ط§غŒ ط¹ظ…ظ„غŒط§طھ ظ‡ظ…ط§ظ‡ظ†ع¯ ط¨ط§ ط§ظˆظ„ظˆغŒطھ ط§ظ†طھط®ط§ط¨غŒ",

    // Bot Starter Tab
    navBotStarter: "ط§ط³طھط§ط±طھ طھط®طµطµغŒ ط±ط¨ط§طھâ€Œظ‡ط§",
    botStarterTitle: "ًں¤– ط§ط³طھط§ط±طھ طھط®طµطµغŒ ظˆ ط§طھظˆظ…ط§ط³غŒظˆظ† ط±ط¨ط§طھâ€Œظ‡ط§",
    botStarterDesc: "ط§ط³طھط§ط±طھ ط±ظپط±ط§ظ„طŒ ط¢ظ†ط§ظ„غŒط² ظ‡ظˆط´ظ…ظ†ط¯ ظˆ ط¹ط¶ظˆغŒطھ ط®ظˆط¯ع©ط§ط± ع†ظ†ظ„â€Œظ‡ط§غŒ ط§ط¬ط¨ط§ط±غŒطŒ ظˆ ط­ظ„ طھط¹ط§ظ…ظ„غŒ ظ…ط±ط­ظ„ظ‡â€Œط¨ظ‡â€Œظ…ط±ط­ظ„ظ‡ ع©ظ¾ع†ط§ ط¨ط§ ط§ظˆظ„ظˆغŒطھ ط¯ظ„ط®ظˆط§ظ‡ ط§ع©ط§ظ†طھâ€Œظ‡ط§",
    botTargetConfigTitle: "ًںژ¯ طھظ†ط¸غŒظ… ظ„غŒظ†ع© ظˆ ط¢غŒط¯غŒ ط±ط¨ط§طھ",
    lblBotStartLink: "ظ„غŒظ†ع© ط§ط³طھط§ط±طھ غŒط§ ظ†ط§ظ… ع©ط§ط±ط¨ط±غŒ ط±ط¨ط§طھ (Bot Start Link / Username):",
    botPriorityTitle: "ًں‘¥ ط§ظ†طھط®ط§ط¨ ط§ع©ط§ظ†طھâ€Œظ‡ط§ ظˆ ط§ظˆظ„ظˆغŒطھ ط§ط¬ط±ط§ (ط¨ط§ ع©ظ„غŒع© ظ…ط³طھظ‚غŒظ…)",
    botPriorityDesc: "طھط±طھغŒط¨ ع©ظ„غŒع© ط´ظ…ط§طŒ ط§ظˆظ„ظˆغŒطھ ط¯ظ‚غŒظ‚ ط§ط±ط³ط§ظ„ ط§ط³طھط§ط±طھ ظˆ ط­ظ„ ع©ظ¾ع†ط§ ط±ط§ طھط¹غŒغŒظ† ظ…غŒâ€Œع©ظ†ط¯. ظ‡ظ…ع†ظ†غŒظ† ظ…غŒâ€Œطھظˆط§ظ†غŒط¯ ط³ظ‚ظپ طھط¹ط¯ط§ط¯ ط§ع©ط§ظ†طھ ظ…ط¬ط§ط² ط±ط§ ظ…ط´ط®طµ ظ†ظ…ط§غŒغŒط¯.",
    botModesTitle: "âڑ™ï¸ڈ ط§ظ†طھط®ط§ط¨ ظ†ظˆط¹ ظˆ ظ…طھط¯ ط§ط³طھط§ط±طھ ط±ط¨ط§طھ (غ´ ط­ط§ظ„طھ طھط®طµطµغŒ)",

    // Inbox Tab
    inboxTitle: "ظ¾غŒظˆغŒâ€Œظ‡ط§طŒ ط±ط¨ط§طھâ€Œظ‡ط§ ظˆ ع¯ظپطھع¯ظˆظ‡ط§",
    inboxDesc: "ظ¾ط´طھغŒط¨ط§ظ†غŒ ع©ط§ظ…ظ„ ط§ط² ط¯ع©ظ…ظ‡ ط´غŒط´ظ‡â€Œط§غŒ (Inline Keyboard)طŒ ط¹ع©ط³ ط¨ط§ ع©ظ¾ط´ظ†طŒ ظ†ط¸ط±ط³ظ†ط¬غŒطŒ ظˆغŒط³ طµظˆطھغŒطŒ ط¯ط§ع©غŒظˆظ…ظ†طھطŒ ظپط±ظ…طھ ظ…طھظ† طھظ„ع¯ط±ط§ظ… (ط¨ظˆظ„ط¯طŒ ط§ط³ظ¾ظˆغŒظ„ط±طŒ ظ†ظ‚ظ„â€Œظ‚ظˆظ„) ظˆ ط±غŒâ€Œط§ع©ط´ظ† ط¨ظ‡ ظ¾غŒط§ظ…â€Œظ‡ط§ (ط¨ط¯ظˆظ† ظپغŒظ„ظ…)",
    lblChatAccount: "ط§ظ†طھط®ط§ط¨ ط§ع©ط§ظ†طھ ظپط¹ط§ظ„:",
    sendPhotoTitle: "ًں“· ط§ط±ط³ط§ظ„ ط¹ع©ط³ ظ‡ظ…ط±ط§ظ‡ ط¨ط§ ع©ظ¾ط´ظ†",
    createPollTitle: "ًں“ٹ ط³ط§ط®طھ ظˆ ط§ط±ط³ط§ظ„ ظ†ط¸ط±ط³ظ†ط¬غŒ طھظ„ع¯ط±ط§ظ…",
    lblPhotoChoice: "ط§ظ†طھط®ط§ط¨ غŒط§ طھطµظˆغŒط± ظ†ظ…ظˆظ†ظ‡:",
    lblPhotoCaption: "ع©ظ¾ط´ظ† ط¹ع©ط³ (ط¨ط§ ظ¾ط´طھغŒط¨ط§ظ†غŒ ط§ط² ظ…ط§ط±ع©â€Œط¯ط§ظˆظ† ظˆ ط§ط³ظ¾ظˆغŒظ„ط±):",
    btnSendPhoto: "ط§ط±ط³ط§ظ„ ط¹ع©ط³ ط¨ظ‡ ع†طھ â‍”",
    lblPollQuestion: "طµظˆط±طھ ط³ظˆط§ظ„ غŒط§ ظ…ظˆط¶ظˆط¹ ظ†ط¸ط±ط³ظ†ط¬غŒ:",
    lblPollOptions: "ع¯ط²غŒظ†ظ‡â€Œظ‡ط§غŒ ظ†ط¸ط±ط³ظ†ط¬غŒ:",
    btnSendPoll: "ط§ط±ط³ط§ظ„ ظ†ط¸ط±ط³ظ†ط¬غŒ ط¨ظ‡ ع†طھ â‍”",

    // Scheduler Tab
    addScheduleTitle: "âڈ±ï¸ڈ طھط¹ط±غŒظپ ظˆط¸غŒظپظ‡ ط²ظ…ط§ظ†â€Œط¨ظ†ط¯غŒ ط¬ط¯غŒط¯ (ط³ظگظ„ظپ ط¨ط§طھ)",
    lblScheduleTitle: "ط¹ظ†ظˆط§ظ† ظˆط¸غŒظپظ‡:",
    lblScheduleAccount: "ط§ع©ط§ظ†طھ ظ…ط¬ط±غŒ:",
    lblScheduleTarget: "ط´ظ†ط§ط³ظ‡ غŒط§ ظ…ظ‚طµط¯ (Target):",
    lblScheduleFreq: "ط¯ظˆط±ظ‡ طھع©ط±ط§ط± / ط²ظ…ط§ظ†â€Œط¨ظ†ط¯غŒ:",
    lblScheduleNextRun: "ط²ظ…ط§ظ† ط§ظˆظ„غŒظ† ط§ط¬ط±ط§:",
    lblScheduleContent: "ظ…طھظ† ظ¾غŒط§ظ… غŒط§ ط¯ط³طھظˆط± ط®ظˆط¯ع©ط§ط±:",
    btnSubmitSchedule: "ط«ط¨طھ ظˆ ط´ط±ظˆط¹ ط²ظ…ط§ظ†â€Œط¨ظ†ط¯غŒ â‍”",

    // Cleanup Tab
    cleanupTitle: "ظ¾ط§ع©ط³ط§ط²غŒ ظˆ ط®ط±ظˆط¬ ط§ط² ع¯ظپطھع¯ظˆظ‡ط§",
    cleanupDesc: "ظ…ط¯غŒط±غŒطھ ع¯ظ¾â€Œظ‡ط§طŒ ع©ط§ظ†ط§ظ„â€Œظ‡ط§ ظˆ ط±ط¨ط§طھâ€Œظ‡ط§طŒ ط®ط±ظˆط¬ ط¯ط³طھظ‡â€Œط¬ظ…ط¹غŒطŒ ط­ط°ظپ ط±ط¨ط§طھâ€Œظ‡ط§غŒ ط¨ظ„ط§ط§ط³طھظپط§ط¯ظ‡ ظˆ ظ¾ط§ع©ط³ط§ط²غŒ ط¨ط± ط§ط³ط§ط³ طھط§ط±غŒط® ظپط¹ط§ظ„غŒطھ غŒط§ طھطµط§ط¯ظپغŒ",
    lblCleanupAccount: "ط§ع©ط§ظ†طھ ظ…ط¬ط±غŒ ظ¾ط§ع©ط³ط§ط²غŒ:",
    lblCleanupTypeFilter: "ظ†ظˆط¹ ع¯ظپطھع¯ظˆ:",
    lblCleanupSearch: "ط¬ط³طھط¬ظˆ ط¯ط± ط¹ظ†ط§ظˆغŒظ†:",
    thChatTitle: "ط¹ظ†ظˆط§ظ† ع¯ظپطھع¯ظˆ / ع†طھ",
    thChatType: "ظ†ظˆط¹",
    thChatMembers: "طھط¹ط¯ط§ط¯ ط§ط¹ط¶ط§ / ط´ظ†ط§ط³ظ‡",
    thChatLastActivity: "ط¢ط®ط±غŒظ† ظپط¹ط§ظ„غŒطھ / ظ¾غŒط§ظ…",
    thChatStatus: "ظˆط¶ط¹غŒطھ ظپط¹ط§ظ„غŒطھ",
    btnExecuteLeave: "ًںڑھ ط®ط±ظˆط¬ ط§ط² ظ…ظˆط§ط±ط¯ ط§ظ†طھط®ط§ط¨غŒ",
    btnExecuteBlock: "ًں›‘ ظ…ط³ط¯ظˆط¯ط³ط§ط²غŒ ط±ط¨ط§طھâ€Œظ‡ط§",

    // Modals & Helpers
    createCategoryTitle: "ط³ط§ط®طھ ط¯ط³طھظ‡ غŒط§ ط¨ط±ع†ط³ط¨ ط§ط®طھطµط§طµغŒ ط¬ط¯غŒط¯",
    categoryNameLabel: "ظ†ط§ظ… ط¯ط³طھظ‡â€Œط¨ظ†ط¯غŒ ط¬ط¯غŒط¯:",
    categoryNamePlaceholder: "ظ…ط«ظ„ط§ظ‹: ط§ع©ط§ظ†طھâ€Œظ‡ط§غŒ ط§ط³ظ¾ظ…طŒ ط§ع©ط§ظ†طھâ€Œظ‡ط§غŒ ط§ط®طھطµط§طµغŒ طھط¨ظ„غŒط؛ط§طھ...",
    categoryIconLabel: "ط§ظ†طھط®ط§ط¨ ظ†ظ…ط§ط¯ غŒط§ ط§غŒظ…ظˆط¬غŒ ط¨ط±ع†ط³ط¨:",
    cancel: "ط§ظ†طµط±ط§ظپ",
    submitCategory: "ط«ط¨طھ ظˆ ط§غŒط¬ط§ط¯ ط¯ط³طھظ‡",

    addAccountTitle: "ط§ظپط²ظˆط¯ظ† ط§ع©ط§ظ†طھ طھظ„ع¯ط±ط§ظ… ط¬ط¯غŒط¯",
    accountNameLabel: "ظ†ط§ظ… ظ†ظ…ط§غŒط´غŒ غŒط§ ط¨ط±ع†ط³ط¨ ط§ع©ط§ظ†طھ:",
    accountPhoneLabel: "ط´ظ…ط§ط±ظ‡ طھظ„ظپظ† (ط¨ط§ ع©ط¯ ع©ط´ظˆط±):",
    account2faLabel: "ط±ظ…ط² ط¹ط¨ظˆط± ط¯ظˆ ظ…ط±ط­ظ„ظ‡â€Œط§غŒ (2FA - ط¯ط± طµظˆط±طھ ظˆط¬ظˆط¯):",
    btnSubmitAccount: "ط§ط±ط³ط§ظ„ ع©ط¯ طھط§غŒغŒط¯ (Send Code)",

    loginModalTitle: "ًں”گ ط±ط§ظ‡ظ†ظ…ط§غŒ ظˆط±ظˆط¯ ط¨ظ‡ طھظ„ع¯ط±ط§ظ…",
    loginStep1Pill: "ظ…ط±ط­ظ„ظ‡ غ±: ظˆط§ط±ط¯ ع©ط±ط¯ظ† ظ…ط´ط®طµط§طھ ط¯ط± ط¯ط³طھع¯ط§ظ‡ ظ…ظ‚طµط¯",
    loginStep1Desc: "ط§ظ¾ظ„غŒع©غŒط´ظ† طھظ„ع¯ط±ط§ظ… ط±ط§ ط¯ط± ط¯ط³طھع¯ط§ظ‡ ظ…ظ‚طµط¯ (ع¯ظˆط´غŒطŒ ظ„ظ¾â€Œطھط§ظ¾ غŒط§ ظˆط¨) ط¨ط§ط² ع©ظ†غŒط¯ ظˆ ط§غŒظ† ط´ظ…ط§ط±ظ‡ طھظ„ظپظ† ط±ط§ ظˆط§ط±ط¯ ظ†ظ…ط§غŒغŒط¯:",
    btnCopyPhone: "ًں“‹ ع©ظ¾غŒ ط´ظ…ط§ط±ظ‡",
    login2faLabel: "ط±ظ…ط² ط¹ط¨ظˆط± ط¯ظˆ ظ…ط±ط­ظ„ظ‡â€Œط§غŒ (2FA Password - ط¯ط± طµظˆط±طھ ط¯ط±ط®ظˆط§ط³طھ طھظ„ع¯ط±ط§ظ…):",
    btnCopy2fa: "ًں“‹ ع©ظ¾غŒ ظ¾ط³ظˆط±ط¯",
    loginStep2Pill: "ظ…ط±ط­ظ„ظ‡ غ²: ط¯ط±غŒط§ظپطھ ط¢ظ†غŒ ع©ط¯ طھط§غŒغŒط¯ ظˆط±ظˆط¯ (OTP)",
    loginStep2Desc: "ظ¾ط³ ط§ط² ط²ط¯ظ† ط¯ع©ظ…ظ‡ Next ط¯ط± طھظ„ع¯ط±ط§ظ…طŒ ط±ظˆغŒ ط¯ع©ظ…ظ‡ ط²غŒط± ع©ظ„غŒع© ع©ظ†غŒط¯ طھط§ ع©ط¯ ط§ط±ط³ط§ظ„ ط´ط¯ظ‡ ط§ط² ط³ط´ظ† ظˆط§ع©ط´غŒ ط´ظˆط¯:",
    btnFetchLiveCode: "ًں“، ط¯ط±غŒط§ظپطھ ظˆ ط§ط³طھط®ط±ط§ط¬ ع©ط¯ طھط§غŒغŒط¯ طھظ„ع¯ط±ط§ظ…",
    otpResultSuccess: "âœ” ظ¾غŒط§ظ… طھط§غŒغŒط¯ طھظ„ع¯ط±ط§ظ… ط¯ط±غŒط§ظپطھ ط´ط¯:",
    otpResultDesc: "ط§غŒظ† ع©ط¯ غµ ط±ظ‚ظ…غŒ ط±ط§ ط¯ط± طھظ„ع¯ط±ط§ظ… ط¯ط³طھع¯ط§ظ‡ ظ…ظ‚طµط¯ ظˆط§ط±ط¯ ع©ظ†غŒط¯ طھط§ ظ„ط§ع¯غŒظ† ع©ط§ظ…ظ„ ط´ظˆط¯.",
    btnCopyLiveOTP: "ًں“‹ ع©ظ¾غŒ ع©ط¯ طھط§غŒغŒط¯",

    // Dynamic UI labels
    btnCode: "ع©ط¯",
    btnInstantCode: "ط¯ط±غŒط§ظپطھ ط¢ظ†غŒ ع©ط¯ ظˆط±ظˆط¯ (OTP)",
    btnChangeCategory: "طھط؛غŒغŒط± ط¯ط³طھظ‡ ط§ع©ط§ظ†طھ",
    btnHealthCheck: "طھط³طھ ط³ظ„ط§ظ…طھ ط³ط´ظ†",
    btnDisconnect: "ظ‚ط·ط¹ ط§طھطµط§ظ„ ط³ط´ظ†",
    btnReconnect: "ط§طھطµط§ظ„ ظ…ط¬ط¯ط¯ ط³ط´ظ†",
    statusConnected: "ظ…طھطµظ„",
    statusDisconnected: "ظ‚ط·ط¹",
    allCountries: "ظ‡ظ…ظ‡ ع©ط´ظˆط±ظ‡ط§",
    allYears: "ظ‡ظ…ظ‡ ط³ط§ظ„â€Œظ‡ط§",
    yearPrefix: "ط³ط§ظ„",
    allCategories: "ظ‡ظ…ظ‡ ط¯ط³طھظ‡â€Œظ‡ط§",
    chatsCount: "ع†طھ ظپط¹ط§ظ„",
    lblProfileName: "ظ†ط§ظ… ظ¾ط±ظˆظپط§غŒظ„ طھظ„ع¯ط±ط§ظ…:",
    lblUserId: "ط¢غŒط¯غŒ ط¹ط¯ط¯غŒ (User ID):",
    lblSessionFile: "ظپط§غŒظ„ ط°ط®غŒط±ظ‡ ط³ط´ظ†:",
    lblYearOfCreation: "ط³ط§ظ„ ط³ط§ط®طھ ط³ط´ظ†:",
    lblChatsCount: "طھط¹ط¯ط§ط¯ ع¯ظپطھع¯ظˆظ‡ط§ / ع†طھâ€Œظ‡ط§:",
    lblConnectionStatus: "ظˆط¶ط¹غŒطھ ط§طھطµط§ظ„:",
    statusHealthy: "ظ…طھطµظ„ ظˆ ط³ط§ظ„ظ…",
    statusDisconnectedText: "ظ‚ط·ط¹ ط§طھطµط§ظ„ ط´ط¯ظ‡",
    noAccountsFound: "ظ‡غŒع† ط§ع©ط§ظ†طھغŒ ط¨ط§ ظ…ط´ط®طµط§طھ ظˆط§ط±ط¯ ط´ط¯ظ‡ ظ¾غŒط¯ط§ ظ†ط´ط¯!",
    noAccountsFoundDesc: "ط¹ط¨ط§ط±طھ ط¬ط³طھط¬ظˆ غŒط§ ظپغŒظ„طھط±ظ‡ط§غŒ ع©ط´ظˆط±طŒ ط³ط§ظ„ ظˆ ط¯ط³طھظ‡â€Œط¨ظ†ط¯غŒ ط±ط§ طھط؛غŒغŒط± ط¯ظ‡غŒط¯.",
    clearFilters: "ظ¾ط§ع©ط³ط§ط²غŒ طھظ…ط§ظ… ظپغŒظ„طھط±ظ‡ط§",
    copySuccess: "âœ” ع©ظ¾غŒ ط´ط¯!",
    listeningCode: "âڈ³ ط¯ط± ط­ط§ظ„ ط´ظ†ظˆط¯ ظˆ ط§ط³طھط®ط±ط§ط¬ ع©ط¯ ط§ط² ط³ط´ظ†...",
    reextractCode: "ًں”„ ط§ط³طھط®ط±ط§ط¬ ظ…ط¬ط¯ط¯ ع©ط¯ طھط§غŒغŒط¯ (Refresh Code)"
  },
  en: {
    // Navigation
    navOverview: "Dashboard & Live Stats",
    navAccounts: "Accounts & Login Codes",
    navActions: "Mass Actions (Like/Join/Comment)",
    navInbox: "Direct Messages & Bots (Rich)",
    navScheduler: "Self-Bot & Scheduler",
    navCleanup: "Cleanup & Purge (Chats/Bots)",
    navStorage: "Storage & Railway",
    navLabel: "NAVIGATION MENU",
    sidebarHealthTitle: "Session Health",
    sidebarHealthDesc: "All 5 sessions are active and mounted on Railway /data volume.",
    volumeIndicator: 'RAILWAY VOLUME: <code class="mono-code">/data</code> [ONLINE]',

    // Dashboard
    overviewTitle: "System Overview & Live Monitoring",
    overviewDesc: "Real-time status of sessions, mass operations, and Railway storage volume",
    statActiveSessions: "Connected Accounts",
    statOperationsToday: "Successful Ops Today",
    statMonitoredChats: "Active Tasks / Cron",
    statStorageUsed: "Volume Disk Usage",
    recentEventsTitle: "Recent Events",
    recentEventsSubtitle: "Activities and workflows executed by accounts",
    btnAllEvents: "All Events",
    upcomingActionsTitle: "Upcoming Actions",
    upcomingActionsSubtitle: "Scheduled messages and tasks executing soon",
    btnAllSchedules: "All Schedules",
    terminalTitle: "Live Activity Stream (/data/logs)",
    btnClearLogs: "Clear Logs",

    // Accounts Tab
    accountsTitle: "Telegram Accounts Management",
    accountsDesc: "Directory, advanced omni-search, custom tags, country/year breakdown, and session disconnect",
    btnAddAccount: "â‍• Add New Account",
    btnCreateCategory: "ًں“پ Create Category",
    btnCheckSessions: "âڑ، Health Check All",
    statPillTotal: "Total Accounts:",
    statPillOnline: "â—ڈ Connected:",
    statPillDisc: "â—ڈ Disconnected:",
    lblFilterCountry: "ًںŒچ Filter by Country:",
    lblFilterYear: "ًں“… Filter by Creation Year:",
    lblFilterCategory: "ًںڈ·ï¸ڈ Custom Categories:",
    searchPlaceholder: "Omni search: Phone (+98...), Username (@id), User ID (12345...), Profile Name or tag...",
    otpSectionTitle: "ًں“¬ Recent Telegram Login Codes (OTP)",
    otpSectionBadge: "Telegram OTP Listener Service is Active",
    thAccount: "Account",
    thPhone: "Phone Number",
    thCode: "Login Code (OTP)",
    thTime: "Timestamp",
    thActions: "Actions",

    // Actions & Priority
    actionsTitle: "Coordinated Mass Operations",
    actionsDesc: "Execute batch operations such as joining channels, posting comments, reactions/likes, or poll voting across accounts with custom click priority",
    priorityBoxTitle: "ًں‘¥ Accounts Selection & Execution Priority (Click Order)",
    priorityBoxDesc: "Click accounts to select them. The order of your clicks directly determines the sequential execution priority (#1, #2, etc.).",
    btnSelectAllSeq: "âڑ، Select All Sequential",
    btnSelectOnline: "ًںں¢ Online Only",
    btnClearPriority: "â‌Œ Clear Selection",
    actionConfigTitle: "Operation Settings",
    lblActionType: "Operation Type:",
    lblActionTarget: "Target Link or Username:",
    lblPollIndex: "Poll Option Index:",
    lblReactionType: "Choose Reaction (All Telegram Reactions):",
    lblCommentText: "Comments List (One comment per line for rotating accounts):",
    lblScheduleCommentToggle: "âڈ° Save as Scheduled Task (Scheduler)",
    lblActionDelay: "Delay Between Requests (seconds - FloodWait safety):",
    btnStartAction: "ًںڑ€ Start Operation with Chosen Priorities",

    // Bot Starter Tab
    navBotStarter: "Specialized Bot Starter",
    botStarterTitle: "ًں¤– Specialized Bot Automation",
    botStarterDesc: "Referral start, smart auto-join forced channels, and step-by-step interactive captcha solving with account priorities",
    botTargetConfigTitle: "ًںژ¯ Bot Target & Link Settings",
    lblBotStartLink: "Bot Start Link or Username:",
    botPriorityTitle: "ًں‘¥ Select Accounts & Priority Order (Direct Click)",
    botPriorityDesc: "Your click order directly sets the execution sequence for starting and captcha solving. You can also limit max accounts.",
    botModesTitle: "âڑ™ï¸ڈ Choose Bot Start Method (4 Specialized Modes)",

    // Inbox Tab
    inboxTitle: "Direct Messages & Bots",
    inboxDesc: "Full Telegram rich message support (Inline glass buttons, Photo with caption, Polls, Voice waveforms, Documents, Spoilers, Quotes, Reactions - NO video)",
    lblChatAccount: "Active Sender Account:",
    sendPhotoTitle: "ًں“· Send Photo with Caption",
    createPollTitle: "ًں“ٹ Create & Send Telegram Poll",
    lblPhotoChoice: "Preset / Sample Image:",
    lblPhotoCaption: "Photo Caption (Markdown & Spoiler supported):",
    btnSendPhoto: "Send Photo to Chat â‍”",
    lblPollQuestion: "Poll Question / Topic:",
    lblPollOptions: "Poll Options:",
    btnSendPoll: "Send Poll to Chat â‍”",

    // Scheduler Tab
    addScheduleTitle: "âڈ±ï¸ڈ Create New Scheduled Task (Self-Bot)",
    lblScheduleTitle: "Task Title:",
    lblScheduleAccount: "Executing Account:",
    lblScheduleTarget: "Target Username / Chat:",
    lblScheduleFreq: "Frequency / Schedule:",
    lblScheduleNextRun: "Next Run Time:",
    lblScheduleContent: "Message Content or Command:",
    btnSubmitSchedule: "Create & Activate Schedule â‍”",

    // Cleanup Tab
    cleanupTitle: "Dialogs Cleanup & Bulk Purge",
    cleanupDesc: "Manage supergroups, channels and bots, bulk leave, block inactive bots, and purge by last active date or random selection",
    lblCleanupAccount: "Executing Account:",
    lblCleanupTypeFilter: "Dialog Type:",
    lblCleanupSearch: "Search Titles:",
    thChatTitle: "Dialog / Chat Title",
    thChatType: "Type",
    thChatMembers: "Members / Username",
    thChatLastActivity: "Last Activity",
    thChatStatus: "Activity State",
    btnExecuteLeave: "ًںڑھ Leave Selected Dialogs",
    btnExecuteBlock: "ًں›‘ Block & Stop Bots",

    // Modals
    createCategoryTitle: "Create New Custom Category / Tag",
    categoryNameLabel: "New Category Name:",
    categoryNamePlaceholder: "e.g. Spam Accounts, VIP Marketing, Test Runners...",
    categoryIconLabel: "Choose Category Emoji / Icon:",
    cancel: "Cancel",
    submitCategory: "Save & Create Category",

    addAccountTitle: "Add New Telegram Account",
    accountNameLabel: "Account Display Name / Tag:",
    accountPhoneLabel: "Phone Number (with country code):",
    account2faLabel: "Two-Factor Password (2FA - optional):",
    btnSubmitAccount: "Send Verification Code",

    loginModalTitle: "ًں”گ Telegram Login Assistant",
    loginStep1Pill: "Step 1: Enter details on target device",
    loginStep1Desc: "Open Telegram on your destination device (mobile, desktop or web) and enter this phone number:",
    btnCopyPhone: "ًں“‹ Copy Phone",
    login2faLabel: "Two-Factor Password (2FA - if prompted by Telegram):",
    btnCopy2fa: "ًں“‹ Copy Password",
    loginStep2Pill: "Step 2: Instant Telegram Login Code (OTP)",
    loginStep2Desc: "After clicking Next in Telegram, click below to extract incoming OTP from session:",
    btnFetchLiveCode: "ًں“، Extract Telegram Login Code",
    otpResultSuccess: "âœ” Telegram verification message received:",
    otpResultDesc: "Enter this 5-digit code in your Telegram app to complete the login.",
    btnCopyLiveOTP: "ًں“‹ Copy Code",

    // Dynamic UI labels
    btnCode: "Code",
    btnInstantCode: "Instant Login Code (OTP)",
    btnChangeCategory: "Change Category",
    btnHealthCheck: "Check Session Health",
    btnDisconnect: "Disconnect Session",
    btnReconnect: "Reconnect Session",
    statusConnected: "Connected",
    statusDisconnected: "Disconnected",
    allCountries: "All Countries",
    allYears: "All Years",
    yearPrefix: "Year",
    allCategories: "All Categories",
    chatsCount: "active chats",
    lblProfileName: "Profile Name:",
    lblUserId: "Numeric ID (User ID):",
    lblSessionFile: "Session File:",
    lblYearOfCreation: "Creation Year:",
    lblChatsCount: "Chats / Dialogs:",
    lblConnectionStatus: "Connection Status:",
    statusHealthy: "Connected & Healthy",
    statusDisconnectedText: "Disconnected",
    noAccountsFound: "No accounts found matching your filters!",
    noAccountsFoundDesc: "Adjust your search keywords, country, year, or category filters.",
    clearFilters: "Clear All Filters",
    copySuccess: "âœ” Copied!",
    listeningCode: "âڈ³ Listening & extracting OTP from session...",
    reextractCode: "ًں”„ Re-extract Code (Refresh)"
  }
};

let currentLang = "fa";

function t(key) {
  const langDict = translations[currentLang] || translations["fa"];
  return langDict[key] || key;
}

// --- Data State ---
let customCategories = [];

let accounts = [];

// Click-priority selection for Mass Actions
let selectedPriorityAccounts = [];

// Telegram Reactions List (Full Suite 45+ emojis)
const allTelegramReactions = [
  "â‌¤ï¸ڈ", "ًں‘چ", "ًں‘ژ", "ًں”¥", "ًںژ‰", "ًں¤©", "ًںک±", "ًںکپ", "ًںک¢", "ًں’©", "ًں¤®", "ًں¥°", 
  "ًں¤¯", "ًں¤”", "ًں¤¬", "ًں‘ڈ", "ًں¥³", "ًںکژ", "âڑ،", "ًں’¯", "ًں•ٹï¸ڈ", "ًں¤،", "ًں¥±", "ًں¥´", 
  "ًںگ³", "â‌¤ï¸ڈâ€چًں”¥", "ًںŒڑ", "ًںŒ­", "ًںچ“", "ًںچ¾", "ًں’‹", "ًں–•", "ًںکˆ", "ًںک´", "ًںک­", "ًں¤“", 
  "ًں‘»", "ًں‘¾", "ًں¤‌", "âœچï¸ڈ", "ًں«،", "ًں—؟", "ًں†’", "ًں’ک", "ًں’”"
];
let chosenReaction = "â‌¤ï¸ڈ";

// Dynamic Recent Events
let recentEvents = [];

let otpHistory = [];

let scheduledTasks = [];

// Rich Sample Chat Threads (All Telegram Message Types Supported - NO video)
let chatThreads = [];

// Dialogs database for Cleaner / Purge Tab
let cleanupDialogs = [];

let cleanupFilterType = "all";
let cleanupSearchQuery = "";
let cleanupSelectedIds = new Set();

// Filter States
let filterState = {
  country: "all",
  year: "all",
  category: "all",
  status: "all",
  query: ""
};

let currentLoginAccount = null;

// --- App Initialization ---
document.addEventListener("DOMContentLoaded", () => {
  initClockAndDate();
  initThemeSwitcher();
  initLanguageSwitcher();
  initTabs();
  initFilterControls();
  renderAccounts();
  renderRecentEvents();
  renderUpcomingActions();
  renderOTPs();
  renderScheduledTasks();
  initChatView();
  initMassActions();
  initActivityLog();
  initModals();
  renderActionPriorityAccounts();
  renderReactionGrid();
  renderCleanupDialogs();
  initBotStarter();
});

// --- 1. Live Clock & Date ---
function initClockAndDate() {
  const clockEl = document.getElementById("live-clock");
  const dateEl = document.getElementById("live-date");

  function update() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    if (clockEl) clockEl.textContent = `${h}:${m}:${s}`;

    if (!dateEl) return;
    try {
      if (currentLang === "en") {
        dateEl.textContent = new Intl.DateTimeFormat('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }).format(now);
      } else {
        dateEl.textContent = new Intl.DateTimeFormat('fa-IR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          weekday: 'long'
        }).format(now);
      }
    } catch {
      dateEl.textContent = now.toLocaleDateString();
    }
  }

  update();
  setInterval(update, 1000);
}

// --- 2. Theme Switcher ---
function initThemeSwitcher() {
  const themeBtns = document.querySelectorAll(".theme-btn");
  const currentTheme = localStorage.getItem("telecore_theme") || "cyberpunk";

  applyTheme(currentTheme);

  themeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const chosenTheme = btn.dataset.themeVal;
      applyTheme(chosenTheme);
      localStorage.setItem("telecore_theme", chosenTheme);
    });
  });

  function applyTheme(themeName) {
    document.body.className = `theme-${themeName}`;
    document.documentElement.setAttribute("data-theme", themeName);
    themeBtns.forEach(b => {
      b.classList.toggle("active", b.dataset.themeVal === themeName);
    });
  }
}

// --- 3. Language Switcher & Full Translation ---
function initLanguageSwitcher() {
  const langSelect = document.getElementById("lang-select");
  const savedLang = localStorage.getItem("telecore_lang") || "fa";

  if (langSelect) {
    langSelect.value = savedLang;
    langSelect.addEventListener("change", (e) => {
      setLanguage(e.target.value);
    });
  }

  setLanguage(savedLang);
}

window.setLanguage = function(lang) {
  currentLang = lang;
  localStorage.setItem("telecore_lang", lang);

  document.documentElement.lang = lang;
  document.documentElement.dir = (lang === "fa") ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const val = t(key);
    if (val) {
      if (key === "volumeIndicator") {
        el.innerHTML = val;
      } else {
        el.textContent = val;
      }
    }
  });

  const searchInput = document.getElementById("acc-smart-search");
  if (searchInput) searchInput.placeholder = t("searchPlaceholder");

  const catNameInput = document.getElementById("cat-name-input");
  if (catNameInput) catNameInput.placeholder = t("categoryNamePlaceholder");

  renderCountryChips();
  renderYearChips();
  renderCategoryChips();
  renderAccounts();
  renderRecentEvents();
  renderUpcomingActions();
  renderOTPs();
  renderScheduledTasks();
  renderActionPriorityAccounts();
  renderReactionGrid();
  renderCleanupDialogs();
};

// --- 4. Tabs Navigation ---
function initTabs() {
  const tabs = document.querySelectorAll(".nav-tab");
  const panels = document.querySelectorAll(".content-panel");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const targetId = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove("active"));
      panels.forEach(p => p.classList.remove("active"));

      tab.classList.add("active");
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.classList.add("active");
    });
  });
}

// --- 5. Recent Events & Upcoming Actions ---
function renderRecentEvents() {
  const container = document.getElementById("recent-events-container");
  if (!container) return;

  container.innerHTML = recentEvents.map(ev => {
    const title = (currentLang === "en" && ev.titleEn) ? ev.titleEn : ev.title;
    const meta = (currentLang === "en" && ev.metaEn) ? ev.metaEn : ev.meta;
    return `
      <div class="event-row">
        <div class="event-main">
          <span class="event-dot dot-${ev.dot}"></span>
          <div>
            <div class="event-title">${title}</div>
            <div class="event-meta">${meta}</div>
          </div>
        </div>
        <div class="event-send-icon ${ev.iconWhite ? 'icon-white' : 'icon-cyan'}">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
          </svg>
        </div>
      </div>
    `;
  }).join("");
}

function addRecentEvent(title, dotColor = "cyan", iconWhite = false, titleEn = "") {
  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  recentEvents.unshift({
    id: Date.now(),
    title: title,
    titleEn: titleEn || title,
    meta: `ظ‡ظ…â€Œط§ع©ظ†ظˆظ† آ· ط³ط§ط¹طھ ${timeStr}`,
    metaEn: `Just now آ· ${timeStr}`,
    dot: dotColor,
    iconWhite: iconWhite
  });
  if (recentEvents.length > 8) recentEvents.pop();
  renderRecentEvents();
}

function renderUpcomingActions() {
  const container = document.getElementById("upcoming-actions-container");
  if (!container) return;

  container.innerHTML = scheduledTasks.map(task => {
    const title = (currentLang === "en" && task.titleEn) ? task.titleEn : task.title;
    const nextRun = (currentLang === "en" && task.nextRunEn) ? task.nextRunEn : task.nextRun;
    const badgeText = task.status === 'active' 
      ? (currentLang === 'en' ? 'Queued' : 'ط¯ط± طµظپ')
      : (currentLang === 'en' ? 'Paused' : 'ظ…طھظˆظ‚ظپ');

    return `
      <div class="upcoming-box">
        <div class="upcoming-left">
          <span class="badge-queue">${badgeText}</span>
        </div>
        <div class="upcoming-right">
          <div>
            <div class="upcoming-name">${title}</div>
            <div class="upcoming-meta">${nextRun} آ· Asia/Tehran</div>
          </div>
          <div class="upcoming-clock">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// --- 6. Filters & Search Engine ---
function initFilterControls() {
  renderCountryChips();
  renderYearChips();
  renderCategoryChips();

  document.querySelectorAll(".acc-stat-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      document.querySelectorAll(".acc-stat-pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      filterState.status = pill.dataset.filterVal;
      renderAccounts();
    });
  });

  const searchInput = document.getElementById("acc-smart-search");
  const clearBtn = document.getElementById("btn-clear-smart-search");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      filterState.query = e.target.value.trim().toLowerCase();
      renderAccounts();
    });
  }

  if (clearBtn && searchInput) {
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      filterState.query = "";
      renderAccounts();
    });
  }
}

function renderCountryChips() {
  const container = document.getElementById("country-chips-container");
  if (!container) return;

  const countries = ["all", ...new Set(accounts.map(a => a.country))];
  container.innerHTML = countries.map(c => {
    const isAll = c === "all";
    const sample = accounts.find(a => a.country === c);
    const countryLabel = isAll 
      ? t("allCountries") 
      : (currentLang === "en" && sample?.countryEn ? sample.countryEn : c);
    const flag = isAll ? "ًںŒگ" : (sample?.flag || "");
    const count = isAll ? accounts.length : accounts.filter(a => a.country === c).length;
    return `
      <button class="filter-chip ${filterState.country === c ? 'active' : ''}" onclick="setCountryFilter('${c}')">
        ${flag} ${countryLabel} (${count})
      </button>
    `;
  }).join("");
}

function renderYearChips() {
  const container = document.getElementById("year-chips-container");
  if (!container) return;

  const years = ["all", ...new Set(accounts.map(a => a.year))].sort();
  container.innerHTML = years.map(y => {
    const isAll = y === "all";
    const label = isAll ? t("allYears") : `${t("yearPrefix")} ${y}`;
    const count = isAll ? accounts.length : accounts.filter(a => a.year === y).length;
    return `
      <button class="filter-chip ${filterState.year === String(y) ? 'active' : ''}" onclick="setYearFilter('${y}')">
        ${label} (${count})
      </button>
    `;
  }).join("");
}

function renderCategoryChips() {
  const container = document.getElementById("category-chips-container");
  if (!container) return;

  const allChip = { id: "all", name: t("allCategories"), icon: "ًں“پ" };
  const cats = [allChip, ...customCategories];

  container.innerHTML = cats.map(cat => {
    const isAll = cat.id === "all";
    const displayName = (currentLang === "en" && cat.nameEn) ? cat.nameEn : cat.name;
    const count = isAll 
      ? accounts.length 
      : accounts.filter(a => a.category === cat.name || a.category === cat.nameEn).length;

    const isActive = (isAll && filterState.category === "all") || (!isAll && filterState.category === cat.name);
    return `
      <button class="filter-chip ${isActive ? 'active' : ''}" onclick="setCategoryFilter('${isAll ? 'all' : cat.name}')">
        ${cat.icon} ${displayName} (${count})
      </button>
    `;
  }).join("");
}

window.setCountryFilter = function(c) {
  filterState.country = c;
  renderCountryChips();
  renderAccounts();
};

window.setYearFilter = function(y) {
  filterState.year = String(y);
  renderYearChips();
  renderAccounts();
};

window.setCategoryFilter = function(catName) {
  filterState.category = catName;
  renderCategoryChips();
  renderAccounts();
};

// --- 7. Render Filtered Accounts (Accordion Layout) ---
function renderAccounts() {
  const container = document.getElementById("accounts-container");
  const countBadge = document.getElementById("accounts-count-badge");
  const resultCountEl = document.getElementById("filter-result-count");
  const statAllEl = document.getElementById("count-all");
  const statOnlineEl = document.getElementById("count-online");
  const statDiscEl = document.getElementById("count-disconnected");
  const totalDashboardEl = document.getElementById("stat-total-accounts");

  const totalAcc = accounts.length;
  const onlineAcc = accounts.filter(a => a.status === "online").length;
  const discAcc = accounts.filter(a => a.status === "disconnected").length;

  if (statAllEl) statAllEl.textContent = totalAcc;
  if (statOnlineEl) statOnlineEl.textContent = onlineAcc;
  if (statDiscEl) statDiscEl.textContent = discAcc;
  if (countBadge) countBadge.textContent = totalAcc;
  if (totalDashboardEl) totalDashboardEl.textContent = onlineAcc;

  const filtered = accounts.filter(acc => {
    if (filterState.status !== "all" && acc.status !== filterState.status) return false;
    if (filterState.country !== "all" && acc.country !== filterState.country) return false;
    if (filterState.year !== "all" && String(acc.year) !== filterState.year) return false;
    if (filterState.category !== "all" && acc.category !== filterState.category) return false;

    if (filterState.query) {
      const q = filterState.query;
      const matchPhone = acc.phone.toLowerCase().includes(q);
      const matchUser = acc.username.toLowerCase().includes(q) || acc.username.replace('@', '').toLowerCase().includes(q);
      const matchId = String(acc.userId).includes(q);
      const matchName = acc.name.toLowerCase().includes(q);
      const matchProf = (acc.profileName || "").toLowerCase().includes(q);
      const matchCat = (acc.category || "").toLowerCase().includes(q);
      if (!matchPhone && !matchUser && !matchId && !matchName && !matchProf && !matchCat) {
        return false;
      }
    }
    return true;
  });

  if (resultCountEl) resultCountEl.textContent = filtered.length;
  if (!container) return;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="cyber-card text-center" style="grid-column: 1 / -1; padding: 40px;">
        <span style="font-size: 2.5rem;">ًں”چ</span>
        <h3 class="mt-2">${t("noAccountsFound")}</h3>
        <p class="text-muted text-sm mt-1">${t("noAccountsFoundDesc")}</p>
        <button class="btn btn-outline btn-sm mt-3" onclick="resetAllFilters()">${t("clearFilters")}</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(acc => {
    const isOnline = acc.status === "online";
    const isSpam = acc.category.includes("ط§ط³ظ¾ظ…") || acc.category.toLowerCase().includes("spam");
    const countryName = (currentLang === "en" && acc.countryEn) ? acc.countryEn : acc.country;
    const catName = acc.category;

    return `
      <div class="acc-accordion-item ${!isOnline ? 'disconnected' : ''}" id="acc-item-${acc.id}">
        <!-- Compact Header Row (Always Visible) -->
        <div class="acc-accordion-header" onclick="toggleAccountAccordion(${acc.id})">
          <div class="acc-header-main">
            <div class="acc-mini-avatar">${isOnline ? 'ًں¤–' : 'âڑ ï¸ڈ'}</div>
            <div class="acc-title-group">
              <span class="acc-name-text">${acc.name}</span>
              <span class="acc-username-text">${acc.username}</span>
            </div>
            <div class="acc-header-tags">
              <span class="tag-pill mono-font">ًں“‍ ${acc.phone}</span>
              <span class="tag-pill">${acc.flag} ${countryName}</span>
              <span class="tag-pill tag-category ${isSpam ? 'spam' : ''}">ًںڈ·ï¸ڈ ${catName}</span>
              <span class="tag-pill">ًں“… ${acc.year}</span>
            </div>
          </div>

          <div class="acc-header-actions">
            <span class="badge-status ${isOnline ? 'online' : 'idle'}">
              ${isOnline ? 'â—ڈ ' + t("statusConnected") : 'ًں”´ ' + t("statusDisconnected")}
            </span>
            <button class="btn btn-sm btn-outline" onclick="event.stopPropagation(); openLoginHelper(${acc.id})" ${!isOnline ? 'disabled' : ''} title="ط¯ط±غŒط§ظپطھ ع©ط¯ ظˆط±ظˆط¯">
              ًں”‘ ${t("btnCode")}
            </button>
            <div class="acc-chevron">â–¼</div>
          </div>
        </div>

        <!-- Collapsible Details Body -->
        <div class="acc-accordion-body">
          <div class="acc-details-grid">
            <div class="acc-detail-item">
              <span class="detail-lbl">${t("lblProfileName")}</span>
              <span class="detail-val">${acc.profileName}</span>
            </div>
            <div class="acc-detail-item">
              <span class="detail-lbl">${t("lblUserId")}</span>
              <span class="detail-val mono-font">${acc.userId}</span>
            </div>
            <div class="acc-detail-item">
              <span class="detail-lbl">${t("lblSessionFile")}</span>
              <span class="detail-val mono-code">${acc.sessionFile}</span>
            </div>
            <div class="acc-detail-item">
              <span class="detail-lbl">${t("lblYearOfCreation")}</span>
              <span class="detail-val">${t("yearPrefix")} ${acc.year} (${countryName})</span>
            </div>
            <div class="acc-detail-item">
              <span class="detail-lbl">${t("lblChatsCount")}</span>
              <span class="detail-val">${acc.chats} ${t("chatsCount")}</span>
            </div>
            <div class="acc-detail-item">
              <span class="detail-lbl">${t("lblConnectionStatus")}</span>
              <span class="detail-val ${isOnline ? 'text-green' : 'text-pink'}">${isOnline ? t("statusHealthy") : t("statusDisconnectedText")}</span>
            </div>
          </div>

          <div class="acc-body-actions">
            <button class="btn btn-sm btn-primary" onclick="openLoginHelper(${acc.id})" ${!isOnline ? 'disabled' : ''}>
              ًں”‘ ${t("btnInstantCode")}
            </button>
            <button class="btn btn-sm btn-outline" onclick="changeAccountCategory(${acc.id})">
              ًں“پ ${t("btnChangeCategory")}
            </button>
            <button class="btn btn-sm btn-outline" onclick="checkHealth(${acc.id})" ${!isOnline ? 'disabled' : ''}>
              âڑ، ${t("btnHealthCheck")}
            </button>
            <button class="btn btn-sm ${isOnline ? 'btn-disconnect' : 'btn-reconnect'}" onclick="toggleAccountConnection(${acc.id})">
              ${isOnline ? 'ًں”´ ' + t("btnDisconnect") : 'ًںں¢ ' + t("btnReconnect")}
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

window.toggleAccountAccordion = function(id) {
  const item = document.getElementById(`acc-item-${id}`);
  if (item) {
    item.classList.toggle("open");
  }
};

window.resetAllFilters = function() {
  filterState = { country: "all", year: "all", category: "all", status: "all", query: "" };
  const searchInput = document.getElementById("acc-smart-search");
  if (searchInput) searchInput.value = "";
  document.querySelectorAll(".acc-stat-pill").forEach(p => p.classList.toggle("active", p.dataset.filterVal === "all"));
  renderCountryChips();
  renderYearChips();
  renderCategoryChips();
  renderAccounts();
};

// --- 8. Telegram Login Helper Modal ---
window.openLoginHelper = function(accId) {
  const acc = accounts.find(a => a.id === accId);
  if (!acc) return;
  currentLoginAccount = acc;

  const modal = document.getElementById("modal-telegram-login");
  const phoneVal = document.getElementById("login-phone-val");
  const twoFaVal = document.getElementById("login-2fa-val");
  const titleEl = document.getElementById("login-modal-title");
  const otpBox = document.getElementById("otp-live-box");
  const liveOtpNum = document.getElementById("live-otp-number");
  const fetchBtn = document.getElementById("btn-fetch-live-code");

  if (phoneVal) phoneVal.value = acc.phone;
  if (twoFaVal) twoFaVal.value = acc.twoFactorPassword || "TelePass_2026#";
  if (titleEl) {
    titleEl.textContent = currentLang === 'fa' 
      ? `ًں”گ ط±ط§ظ‡ظ†ظ…ط§غŒ ظˆط±ظˆط¯ ط¨ظ‡ طھظ„ع¯ط±ط§ظ… آ· [${acc.name}]` 
      : `ًں”گ Telegram Login Assistant آ· [${acc.name}]`;
  }

  if (otpBox) otpBox.style.display = "none";
  if (liveOtpNum) liveOtpNum.textContent = "-----";
  if (fetchBtn) {
    fetchBtn.disabled = false;
    fetchBtn.textContent = t("btnFetchLiveCode");
  }

  if (modal) modal.classList.add("open");
  addLog("INFO", `ط±ط§ظ‡ظ†ظ…ط§غŒ ظˆط±ظˆط¯ ظˆ ظˆط§ع©ط´غŒ ع©ط¯ ط¨ط±ط§غŒ ط§ع©ط§ظ†طھ ${acc.name} (${acc.phone}) ط¨ط§ط² ط´ط¯.`);
};

window.closeLoginHelper = function() {
  const modal = document.getElementById("modal-telegram-login");
  if (modal) modal.classList.remove("open");
};

window.fetchLiveLoginCode = function() {
  if (!currentLoginAccount) return;
  const acc = currentLoginAccount;
  const fetchBtn = document.getElementById("btn-fetch-live-code");
  const otpBox = document.getElementById("otp-live-box");
  const liveOtpNum = document.getElementById("live-otp-number");

  if (fetchBtn) {
    fetchBtn.disabled = true;
    fetchBtn.textContent = t("listeningCode");
  }

  setTimeout(() => {
    const randomCode = Math.floor(10000 + Math.random() * 90000).toString();
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;

    if (liveOtpNum) liveOtpNum.textContent = randomCode;
    if (otpBox) {
      otpBox.style.display = "block";
    }

    if (fetchBtn) {
      fetchBtn.disabled = false;
      fetchBtn.textContent = t("reextractCode");
    }

    otpHistory.unshift({
      accountName: acc.name,
      phone: acc.phone,
      code: randomCode,
      time: timeStr,
      id: Date.now()
    });
    renderOTPs();

    addRecentEvent(
      `ع©ط¯ ظˆط±ظˆط¯ طھظ„ع¯ط±ط§ظ… [${randomCode}] ط¨ط±ط§غŒ ط´ظ…ط§ط±ظ‡ ${acc.phone} ظˆط§ع©ط´غŒ ط´ط¯`,
      "cyan",
      false,
      `Telegram OTP [${randomCode}] extracted for ${acc.phone}`
    );

    addLog("SUCCESS", `ع©ط¯ ظ„ط§ع¯غŒظ† ط¬ط¯غŒط¯ [${randomCode}] ط¨ط§ ظ…ظˆظپظ‚غŒطھ ط§ط² ط³ط´ظ† ${acc.sessionFile} ط§ط³طھط®ط±ط§ط¬ ع¯ط±ط¯غŒط¯.`);
  }, 600);
};

window.copyLoginPhone = function() {
  const phoneInput = document.getElementById("login-phone-val");
  const btn = document.getElementById("btn-copy-phone");
  if (!phoneInput) return;
  navigator.clipboard.writeText(phoneInput.value).then(() => {
    const orig = btn.textContent;
    btn.textContent = t("copySuccess");
    setTimeout(() => { btn.textContent = orig; }, 1800);
  }).catch(() => {
    alert(phoneInput.value);
  });
};

window.copyLoginPassword = function() {
  const passInput = document.getElementById("login-2fa-val");
  const btn = document.getElementById("btn-copy-2fa");
  if (!passInput) return;
  navigator.clipboard.writeText(passInput.value).then(() => {
    const orig = btn.textContent;
    btn.textContent = t("copySuccess");
    setTimeout(() => { btn.textContent = orig; }, 1800);
  }).catch(() => {
    alert(passInput.value);
  });
};

window.copyLiveOTP = function() {
  const codeEl = document.getElementById("live-otp-number");
  const btn = document.getElementById("btn-copy-live-code");
  if (!codeEl) return;
  const code = codeEl.textContent.trim();
  navigator.clipboard.writeText(code).then(() => {
    const orig = btn.textContent;
    btn.textContent = t("copySuccess");
    setTimeout(() => { btn.textContent = orig; }, 1800);
  }).catch(() => {
    alert(code);
  });
};

// --- 9. Modal Management (Add Category & Add Account) ---
window.openCategoryModal = function() {
  const modal = document.getElementById("modal-add-category");
  if (modal) {
    modal.classList.add("open");
    const input = document.getElementById("cat-name-input");
    if (input) setTimeout(() => input.focus(), 150);
  }
};

window.closeCategoryModal = function() {
  const modal = document.getElementById("modal-add-category");
  if (modal) modal.classList.remove("open");
};

window.openAddAccountModal = function() {
  const modal = document.getElementById("modal-add-account");
  if (modal) {
    modal.classList.add("open");
    const input = document.getElementById("acc-name-input");
    if (input) setTimeout(() => input.focus(), 150);
  }
};

window.closeAddAccountModal = function() {
  const modal = document.getElementById("modal-add-account");
  if (modal) modal.classList.remove("open");
};

window.openAddScheduleModal = function() {
  const modal = document.getElementById("modal-add-schedule");
  const accSelect = document.getElementById("schedule-account-select");
  if (accSelect) {
    accSelect.innerHTML = accounts.map(a => `
      <option value="${escapeHtml(a.name)}">${escapeHtml(a.name)} (${escapeHtml(a.phone)}) ${a.status === 'online' ? 'ًںں¢' : 'ًں”´'}</option>
    `).join("");
  }
  if (modal) {
    modal.classList.add("open");
    const input = document.getElementById("schedule-title-input");
    if (input) setTimeout(() => input.focus(), 150);
  }
};

window.closeAddScheduleModal = function() {
  const modal = document.getElementById("modal-add-schedule");
  if (modal) modal.classList.remove("open");
  const form = document.getElementById("form-new-schedule");
  if (form) form.reset();
};

function initModals() {
  document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove("open");
      }
    });
  });

  const catForm = document.getElementById("form-new-category");
  if (catForm) {
    catForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nameInput = document.getElementById("cat-name-input");
      const name = nameInput ? nameInput.value.trim() : "";
      const icon = document.querySelector('input[name="cat_icon"]:checked')?.value || "ًں“پ";

      if (!name) return;

      if (customCategories.some(c => c.name.toLowerCase() === name.toLowerCase())) {
        alert(currentLang === 'fa' ? "ط§غŒظ† ط¯ط³طھظ‡â€Œط¨ظ†ط¯غŒ ط§ط² ظ‚ط¨ظ„ ظˆط¬ظˆط¯ ط¯ط§ط±ط¯!" : "This category already exists!");
        return;
      }

      customCategories.push({
        id: `cat_${Date.now()}`,
        name: name,
        nameEn: name,
        icon: icon
      });

      closeCategoryModal();
      catForm.reset();

      renderCategoryChips();
      addLog("SUCCESS", `ط¯ط³طھظ‡ ط¬ط¯غŒط¯ "${icon} ${name}" ط¨ط§ ظ…ظˆظپظ‚غŒطھ ط§غŒط¬ط§ط¯ ط´ط¯.`);
      addRecentEvent(
        `ط¯ط³طھظ‡â€Œط¨ظ†ط¯غŒ ط¬ط¯غŒط¯ آ«${icon} ${name}آ» ط§غŒط¬ط§ط¯ ط´ط¯`,
        "cyan",
        false,
        `New custom category آ«${icon} ${name}آ» created`
      );
      alert(currentLang === 'fa' 
        ? `ط¯ط³طھظ‡â€Œط¨ظ†ط¯غŒ ط¬ط¯غŒط¯ "${name}" ط§ط¶ط§ظپظ‡ ط´ط¯ ظˆ ط¯ط± ظپغŒظ„طھط±ظ‡ط§ ط¯ط± ط¯ط³طھط±ط³ ط§ط³طھ.` 
        : `Category "${name}" created successfully and added to filters.`);
    });
  }

  const accForm = document.getElementById("form-new-account");
  if (accForm) {
    accForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("acc-name-input").value.trim();
      const phone = document.getElementById("acc-phone-input").value.trim();
      const api_id = document.getElementById("acc-api-id-input").value.trim();
      const api_hash = document.getElementById("acc-api-hash-input").value.trim();
      const pass = document.getElementById("acc-2fa-input").value.trim();

      const btn = document.getElementById("btn-submit-account");
      const origText = btn.textContent;
      btn.textContent = "ط¯ط± ط­ط§ظ„ ط§ط±طھط¨ط§ط· ط¨ط§ طھظ„ع¯ط±ط§ظ…...";
      btn.disabled = true;

      try {
        const res = await fetch("/api/telegram/send_code", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, phone, api_id, api_hash, password: pass })
        });
        
        if (res.ok) {
          alert("ع©ط¯ ط§ط±ط³ط§ظ„ ط´ط¯! ط¨ع©â€Œط§ظ†ط¯ ط¨ط±ط§غŒ ع¯ط±ظپطھظ† ع©ط¯ ط¢ظ…ط§ط¯ظ‡ ط§ط³طھ. (ط¨ط±ط§غŒ طھع©ظ…غŒظ„ ط§غŒظ† ط¨ط®ط´ ط¨ط§غŒط¯ UI ع¯ط±ظپطھظ† ع©ط¯ طھط§غŒغŒط¯ ط·ط±ط§ط­غŒ ط´ظˆط¯)");
          closeAddAccountModal();
          accForm.reset();
        } else {
          alert("ط®ط·ط§ ط¯ط± ط§ط±طھط¨ط§ط· ط¨ط§ طھظ„ع¯ط±ط§ظ…. ط¨ط±ط±ط³غŒ ع©ظ†غŒط¯ API ID ظˆ Hash طµط­غŒط­ ط¨ط§ط´ظ†ط¯.");
        }
      } catch (err) {
        alert("ط®ط·ط§غŒ ط³ط±ظˆط±.");
      } finally {
        btn.textContent = origText;
        btn.disabled = false;
      }
    });
  }

  const schedForm = document.getElementById("form-new-schedule");
  if (schedForm) {
    schedForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("schedule-title-input")?.value.trim();
      const account = document.getElementById("schedule-account-select")?.value;
      const target = document.getElementById("schedule-target-input")?.value.trim();
      const freq = document.getElementById("schedule-freq-select")?.value;
      const nextRun = document.getElementById("schedule-nextrun-input")?.value.trim() || "غ± ط³ط§ط¹طھ ط¯غŒع¯ط±";
      const content = document.getElementById("schedule-content-input")?.value.trim();

      if (!title || !target) return;

      const newTask = {
        id: Date.now(),
        title: title,
        titleEn: title,
        target: target,
        time: freq,
        account: account,
        status: "active",
        nextRun: nextRun,
        nextRunEn: nextRun,
        messageContent: content || ""
      };

      scheduledTasks.unshift(newTask);
      renderScheduledTasks();
      renderUpcomingActions();
      closeAddScheduleModal();

      addLog("SUCCESS", `ظˆط¸غŒظپظ‡ ط²ظ…ط§ظ†â€Œط¨ظ†ط¯غŒ ط¬ط¯غŒط¯ "${title}" ط¨ط§ ظ…ظˆظپظ‚غŒطھ ط¨ط±ط§غŒ ط§ع©ط§ظ†طھ ${account} ط¯ط± ظ…ظ‚طµط¯ ${target} ط«ط¨طھ ع¯ط±ط¯غŒط¯.`);
      addRecentEvent(
        `ظˆط¸غŒظپظ‡ ط¬ط¯غŒط¯ ط³ظگظ„ظپ ط¨ط§طھ آ«${title}آ» ط§ط¶ط§ظپظ‡ ط´ط¯`,
        "cyan",
        false,
        `New self-bot schedule آ«${title}آ» created`
      );

      alert(currentLang === 'fa' 
        ? `ظˆط¸غŒظپظ‡ ط¬ط¯غŒط¯ "${title}" ط¨ط§ ظ…ظˆظپظ‚غŒطھ ط°ط®غŒط±ظ‡ ظˆ ظپط¹ط§ظ„ ط´ط¯.` 
        : `Scheduled task "${title}" created and activated.`);
    });
  }
}

// --- 10. Account Click Priority Management ---
function renderActionPriorityAccounts() {
  const container = document.getElementById("action-accounts-priority-list");
  const countEl = document.getElementById("action-selected-accounts-count");
  const orderTextEl = document.getElementById("action-priority-order-text");
  if (!container) return;

  if (countEl) countEl.textContent = selectedPriorityAccounts.length;

  if (orderTextEl) {
    if (selectedPriorityAccounts.length > 0) {
      const orderNames = selectedPriorityAccounts.map(id => accounts.find(a => a.id === id)?.name || id).join(" â‍” ");
      orderTextEl.innerHTML = `<span class="text-xs text-muted">طھط±طھغŒط¨ ط§ط¬ط±ط§: </span><span class="text-xs text-cyan font-bold">${orderNames}</span>`;
    } else {
      orderTextEl.innerHTML = `<span class="text-xs text-pink">ظ‡غŒع† ط§ع©ط§ظ†طھغŒ ط§ظ†طھط®ط§ط¨ ظ†ط´ط¯ظ‡ ط§ط³طھ.</span>`;
    }
  }

  container.innerHTML = accounts.map(acc => {
    const priorityIndex = selectedPriorityAccounts.indexOf(acc.id);
    const isSelected = priorityIndex !== -1;
    const isOnline = acc.status === "online";
    const priorityBadgeText = isSelected ? `#${priorityIndex + 1}` : "â€”";

    return `
      <div class="priority-card ${isSelected ? 'selected' : ''}" onclick="toggleAccountPriority(${acc.id})">
        <div class="priority-card-info">
          <div class="acc-mini-avatar">${isOnline ? 'ًں¤–' : 'âڑ ï¸ڈ'}</div>
          <div>
            <div class="font-bold text-xs">${acc.name}</div>
            <div class="mono-font text-xs text-muted">${acc.phone}</div>
          </div>
        </div>
        <div class="priority-badge-pill" title="ط§ظˆظ„ظˆغŒطھ ط§ط¬ط±ط§">${priorityBadgeText}</div>
      </div>
    `;
  }).join("");
}

window.toggleAccountPriority = function(accId) {
  const idx = selectedPriorityAccounts.indexOf(accId);
  if (idx !== -1) {
    selectedPriorityAccounts.splice(idx, 1);
  } else {
    selectedPriorityAccounts.push(accId);
  }
  renderActionPriorityAccounts();
};

window.selectAllAccountsSequential = function() {
  selectedPriorityAccounts = accounts.map(a => a.id);
  renderActionPriorityAccounts();
};

window.selectOnlineAccountsOnly = function() {
  selectedPriorityAccounts = accounts.filter(a => a.status === "online").map(a => a.id);
  renderActionPriorityAccounts();
};

window.clearSelectedPriorityAccounts = function() {
  selectedPriorityAccounts = [];
  renderActionPriorityAccounts();
};

// --- 11. Smart Link Inspector & 2-Addlist Limit Auto-Bypass ---
window.inspectTargetLink = function(url) {
  const box = document.getElementById("link-inspector-box");
  const icon = document.getElementById("inspector-icon");
  const typeText = document.getElementById("inspector-type-text");
  const descText = document.getElementById("inspector-desc-text");
  const addlistOption = document.getElementById("inspector-addlist-option");
  if (!box || !typeText || !descText) return;

  const clean = url.trim();
  if (!clean) {
    box.style.display = "none";
    return;
  }

  box.style.display = "block";

  if (clean.includes("t.me/addlist/") || clean.includes("tg://addlist?")) {
    icon.textContent = "ًں“پ";
    typeText.textContent = "ط´ظ†ط§ط³ط§غŒغŒ ظ†ظˆط¹: ط§ط¯ظ„غŒط³طھ طھظ„ع¯ط±ط§ظ… (Chat Folder Addlist)";
    descText.textContent = "ظ¾ظˆط´ظ‡ ط§ط´طھط±ط§ع©غŒ ط´ط§ظ…ظ„ ع†ظ†ط¯غŒظ† ع©ط§ظ†ط§ظ„/ع¯ط±ظˆظ‡. طھظ„ع¯ط±ط§ظ… ط¨ط±ط§غŒ ط§ع©ط§ظ†طھâ€Œظ‡ط§غŒ ط¹ط§ط¯غŒ ظ…ط­ط¯ظˆط¯غŒطھ غ² ط§ط¯ظ„غŒط³طھ ط¯ط§ط±ط¯.";
    if (addlistOption) addlistOption.style.display = "block";
  } else if (clean.includes("t.me/+") || clean.includes("t.me/joinchat/")) {
    icon.textContent = "ًں”’";
    typeText.textContent = "ط´ظ†ط§ط³ط§غŒغŒ ظ†ظˆط¹: ظ„غŒظ†ع© ط¯ط¹ظˆطھ ط®طµظˆطµغŒ (Private Invite Link)";
    descText.textContent = "ظ‡ط´ ط§ط­ط±ط§ط² ظ‡ظˆغŒطھ ط§ط®طھطµط§طµغŒ ع©ط§ظ†ط§ظ„/ع¯ط±ظˆظ‡ ط®طµظˆطµغŒ ط´ظ†ط§ط³ط§غŒغŒ ط´ط¯. ظˆط±ظˆط¯ ظ…ط³طھظ‚غŒظ… ط´ط¨غŒظ‡â€Œط³ط§ط²غŒ ظ…غŒâ€Œط´ظˆط¯.";
    if (addlistOption) addlistOption.style.display = "none";
  } else if (clean.match(/t\.me\/[a-zA-Z0-9_]+\/\d+/) || clean.match(/@[a-zA-Z0-9_]+\/\d+/)) {
    icon.textContent = "ًں“‌";
    typeText.textContent = "ط´ظ†ط§ط³ط§غŒغŒ ظ†ظˆط¹: ظ„غŒظ†ع© ظ…ط³طھظ‚غŒظ… ظ¾ط³طھ ع©ط§ظ†ط§ظ„ (Channel Post Link)";
    descText.textContent = "ظ…ظ†ط§ط³ط¨ ط¨ط±ط§غŒ ط«ط¨طھ ط±غŒâ€Œط§ع©ط´ظ† ط¨ظ‡ ظ¾ط³طھ غŒط§ ط§ط±ط³ط§ظ„ ع©ط§ظ…ظ†طھ ط¯ط± ط¨ط®ط´ ط¨ط­ط« ظˆ ظ†ط¸ط±ط§طھ (Comments).";
    if (addlistOption) addlistOption.style.display = "none";
  } else if (clean.includes("?start=") || clean.includes("bot?start=")) {
    icon.textContent = "ًں¤–";
    typeText.textContent = "ط´ظ†ط§ط³ط§غŒغŒ ظ†ظˆط¹: ط±ط¨ط§طھ ط¨ط§ ظ¾ط§ط±ط§ظ…طھط± ط±ظپط±ط§ظ„/ط§ط³طھط§ط±طھ (Bot Referral Link)";
    descText.textContent = "ط¯ط³طھظˆط± ط§ط³طھط§ط±طھ ط®ظˆط¯ع©ط§ط± ظ‡ظ…ط±ط§ظ‡ ط¨ط§ ع©ط¯ ظ…ط¹ط±ظپ ط§ط±ط³ط§ظ„ ط®ظˆط§ظ‡ط¯ ط´ط¯.";
    if (addlistOption) addlistOption.style.display = "none";
  } else if (clean.startsWith("@") || clean.includes("t.me/")) {
    icon.textContent = "ًں“¢";
    typeText.textContent = "ط´ظ†ط§ط³ط§غŒغŒ ظ†ظˆط¹: ع©ط§ظ†ط§ظ„ غŒط§ ع¯ط±ظˆظ‡ ط¹ظ…ظˆظ…غŒ طھظ„ع¯ط±ط§ظ… (Public Chat/Channel)";
    descText.textContent = "ط¢غŒط¯غŒ ط¹ظ…ظˆظ…غŒ ط´ظ†ط§ط³ط§غŒغŒ ط´ط¯. ط¹ط¶ظˆغŒطھ ظپظˆط±غŒ ط¨ط§ طھظ…ط§ظ…غŒ ط§ع©ط§ظ†طھâ€Œظ‡ط§غŒ ط§ظ†طھط®ط§ط¨غŒ ط§ظ†ط¬ط§ظ… ط®ظˆط§ظ‡ط¯ ط´ط¯.";
    if (addlistOption) addlistOption.style.display = "none";
  } else {
    icon.textContent = "ًں”چ";
    typeText.textContent = "ط´ظ†ط§ط³ط§غŒغŒ ظ†ظˆط¹: ظ†ط§ظ… ع©ط§ط±ط¨ط±غŒ غŒط§ ط´ظ†ط§ط³ظ‡ ظ…طھظ†غŒ";
    descText.textContent = "ط¯ط± ط­ط§ظ„ ظ¾ط±ط¯ط§ط²ط´ ط´ظ†ط§ط³ظ‡ ظˆط§ط±ط¯ ط´ط¯ظ‡ ط¯ط± ط³ط±ظˆط±...";
    if (addlistOption) addlistOption.style.display = "none";
  }
};

// --- 12. Full Reactions Suite (45+ Emojis) ---
function renderReactionGrid() {
  const grid = document.getElementById("reaction-picker-grid");
  const preview = document.getElementById("chosen-reaction-preview");
  if (!grid) return;

  if (preview) preview.textContent = `ط±غŒâ€Œط§ع©ط´ظ† ط§ظ†طھط®ط§ط¨غŒ: ${chosenReaction}`;

  grid.innerHTML = allTelegramReactions.map(emoji => `
    <button type="button" class="reaction-item-btn ${chosenReaction === emoji ? 'active' : ''}" onclick="selectReaction('${emoji}')">
      ${emoji}
    </button>
  `).join("");
}

window.selectReaction = function(emoji) {
  chosenReaction = emoji;
  const customInput = document.getElementById("custom-emoji-input");
  if (customInput) customInput.value = "";
  renderReactionGrid();
};

window.setCustomReactionEmoji = function(emoji) {
  if (emoji && emoji.trim()) {
    chosenReaction = emoji.trim();
    const preview = document.getElementById("chosen-reaction-preview");
    if (preview) preview.textContent = `ط±غŒâ€Œط§ع©ط´ظ† ط§ظ†طھط®ط§ط¨غŒ: ${chosenReaction}`;
    document.querySelectorAll(".reaction-item-btn").forEach(b => b.classList.remove("active"));
  }
};

// --- 13. Mass Actions & Comments System ---
window.handleActionTypeChange = function(type) {
  const groupPoll = document.getElementById("group-poll-option");
  const groupReaction = document.getElementById("group-reaction-type");
  const groupComment = document.getElementById("group-comment-text");

  if (groupPoll) groupPoll.style.display = (type === "poll") ? "block" : "none";
  if (groupReaction) groupReaction.style.display = (type === "like") ? "block" : "none";
  if (groupComment) groupComment.style.display = (type === "comment") ? "block" : "none";
};

window.toggleCommentScheduling = function(checked) {
  const details = document.getElementById("comment-schedule-details");
  if (details) details.style.display = checked ? "block" : "none";
};

function initMassActions() {
  const form = document.getElementById("mass-action-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      runMassAction();
    });
  }
}

function runMassAction() {
  const type = document.getElementById("action-type").value;
  const target = document.getElementById("action-target").value.trim();
  const delay = parseInt(document.getElementById("action-delay").value, 10) || 3;
  const isScheduledComment = document.getElementById("chk-schedule-comment")?.checked;
  const scheduleTime = document.getElementById("comment-schedule-time")?.value || "ظ‡ط± ط±ظˆط² ط³ط§ط¹طھ غ±غ²:غ³غ°";

  if (selectedPriorityAccounts.length === 0) {
    alert("ظ„ط·ظپط§ظ‹ ط­ط¯ط§ظ‚ظ„ غŒع© ط§ع©ط§ظ†طھ ط±ط§ ط¨ط§ ع©ظ„غŒع© ط§ظ†طھط®ط§ط¨ ع©ظ†غŒط¯!");
    return;
  }

  // Handle scheduled comment
  if (type === "comment" && isScheduledComment) {
    const commentLines = document.getElementById("action-comment-input").value.trim().split("\n").filter(l => l.trim().length > 0);
    const commentSample = commentLines[0] || "ع©ط§ظ…ظ†طھ ط®ظˆط¯ع©ط§ط± ط³ظ„ظپ";
    scheduledTasks.push({
      id: Date.now(),
      title: `ط§ط±ط³ط§ظ„ ع©ط§ظ…ظ†طھ ط¯ظˆط±ظ‡â€Œط§غŒ: "${commentSample.substring(0, 25)}..."`,
      titleEn: `Scheduled comment: "${commentSample.substring(0, 25)}..."`,
      target: target,
      time: scheduleTime,
      account: `${selectedPriorityAccounts.length} ط§ع©ط§ظ†طھ ط§ظ†طھط®ط§ط¨غŒ`,
      status: "active",
      nextRun: "ط¨ظ‡ ط²ظˆط¯غŒ",
      nextRunEn: "Soon"
    });
    renderScheduledTasks();
    renderUpcomingActions();
    addRecentEvent(`طھط³ع© ط²ظ…ط§ظ†â€Œط¨ظ†ط¯غŒ ط§ط±ط³ط§ظ„ ع©ط§ظ…ظ†طھ ط¨ط±ط§غŒ ظ¾ط³طھ ${target} ط§غŒط¬ط§ط¯ ع¯ط±ط¯غŒط¯`, "cyan", false);
    addLog("SUCCESS", `طھط³ع© ط²ظ…ط§ظ†â€Œط¨ظ†ط¯غŒ ع©ط§ظ…ظ†طھ ط¨ط§ ظ…ظˆظپظ‚غŒطھ ط«ط¨طھ ط´ط¯ ظˆ ط¨ظ‡ طھط¨ ط³ظگظ„ظپ ط¨ط§طھ ط§ط¶ط§ظپظ‡ ع¯ط±ط¯غŒط¯.`);
    alert("طھط³ع© ط§ط±ط³ط§ظ„ ع©ط§ظ…ظ†طھ ط²ظ…ط§ظ†â€Œط¨ظ†ط¯غŒ ط´ط¯ ظˆ ط¨ظ‡ ظ„غŒط³طھ ط³ظگظ„ظپ ط¨ط§طھ ط§ظپط²ظˆط¯ظ‡ ع¯ط±ط¯غŒط¯!");
    return;
  }

  const startBtn = document.getElementById("btn-start-action");
  const actionTitle = document.getElementById("current-action-title");
  const badge = document.getElementById("action-badge");
  const progressFill = document.getElementById("action-progress-fill");
  const progressText = document.getElementById("action-progress-text");
  const percentText = document.getElementById("action-percent-text");
  const sublog = document.getElementById("action-sublog");

  startBtn.disabled = true;
  badge.className = "badge-status online";
  badge.textContent = "ط¯ط± ط­ط§ظ„ ط§ط¬ط±ط§ ط¨ط§ ط§ظˆظ„ظˆغŒطھ...";
  actionTitle.textContent = `ط¹ظ…ظ„غŒط§طھ: ${type} ط±ظˆغŒ ${target}`;
  sublog.innerHTML = "";

  const total = selectedPriorityAccounts.length;
  let currentStep = 0;

  // Comment templates rotation
  let commentPool = ["ظ¾ط±ظˆعکظ‡ ظپظˆظ‚â€Œط§ظ„ط¹ط§ط¯ظ‡â€Œط§غŒ ظ‡ط³طھ! ًں”¥", "طھط­ظ„غŒظ„ ط¨ط³غŒط§ط± ظ…ظپغŒط¯غŒ ط¨ظˆط¯ ًں‘ڈ", "ظ‚غŒظ…طھ ظ‡ط¯ظپ ط¨ط¹ط¯غŒ ع†ظ†ط¯ظ‡ ط¨ظ‡ ظ†ط¸ط±طھظˆظ†طں"];
  const customComments = document.getElementById("action-comment-input")?.value.trim().split("\n").filter(l => l.trim().length > 0);
  if (customComments && customComments.length > 0) commentPool = customComments;

  addLog("ACTION", `ط´ط±ظˆط¹ ط¹ظ…ظ„غŒط§طھ [${type}] ط¨ط§ ط§ظˆظ„ظˆغŒطھ طھط±طھغŒط¨غŒ ط¨ط±ط§غŒ ${total} ط§ع©ط§ظ†طھ ط±ظˆغŒ ظ…ظ‚طµط¯ ${target}`);

  function step() {
    if (currentStep < total) {
      const accId = selectedPriorityAccounts[currentStep];
      const acc = accounts.find(a => a.id === accId) || { name: `ط§ع©ط§ظ†طھ ${accId}` };
      const priorityNum = currentStep + 1;
      currentStep++;

      const pct = Math.round((currentStep / total) * 100);
      progressFill.style.width = `${pct}%`;
      progressText.textContent = `${currentStep} / ${total} ط§ظ†ط¬ط§ظ… ط´ط¯ظ‡`;
      percentText.textContent = `${pct}ظھ`;

      let detailLog = "";
      if (type === "like") detailLog = `ط±غŒâ€Œط§ع©ط´ظ† ${chosenReaction} ط±ط§ ط±ظˆغŒ ظ¾ط³طھ ط«ط¨طھ ع©ط±ط¯.`;
      else if (type === "comment") {
        const commentMsg = commentPool[(currentStep - 1) % commentPool.length];
        detailLog = `ع©ط§ظ…ظ†طھ "${commentMsg}" ط±ط§ ط§ط±ط³ط§ظ„ ع©ط±ط¯.`;
      } else if (type === "join") {
        const isAddlist = target.includes("addlist");
        detailLog = isAddlist ? `ط§ط¯ظ„غŒط³طھ ط±ط§ ط§ط¶ط§ظپظ‡ ع©ط±ط¯ (ط¨ط±ط±ط³غŒ ظ…ط­ط¯ظˆط¯غŒطھ غ² ط§ط¯ظ„غŒط³طھ طھط§غŒغŒط¯ ط´ط¯ âœ”).` : `ط¹ط¶ظˆغŒطھ ط¯ط± ع©ط§ظ†ط§ظ„/ع¯ط±ظˆظ‡ ط±ط§ ط¨ط§ ظ…ظˆظپظ‚غŒطھ ط«ط¨طھ ع©ط±ط¯.`;
      } else if (type === "poll") {
        detailLog = `ع¯ط²غŒظ†ظ‡ ظ†ط¸ط±ط³ظ†ط¬غŒ ط±ط§ ط¨ط§ ظ…ظˆظپظ‚غŒطھ ط«ط¨طھ ع©ط±ط¯.`;
      } else {
        detailLog = `ط¯ط³طھظˆط± ط§ط³طھط§ط±طھ ط±ط¨ط§طھ ط±ط§ ط§ط¬ط±ط§ ع©ط±ط¯.`;
      }

      const logLine = document.createElement("div");
      logLine.className = "log-line";
      logLine.textContent = `[ط§ظˆظ„ظˆغŒطھ #${priorityNum}] ${acc.name}: ${detailLog}`;
      sublog.appendChild(logLine);
      sublog.scrollTop = sublog.scrollHeight;

      if (currentStep < total) {
        setTimeout(step, delay * 800);
      } else {
        finish();
      }
    }
  }

  function finish() {
    startBtn.disabled = false;
    badge.className = "badge-status online";
    badge.textContent = "طھع©ظ…غŒظ„ ط´ط¯ âœ”";
    addLog("SUCCESS", `ط¹ظ…ظ„غŒط§طھ ع¯ط±ظˆظ‡غŒ ط±ظˆغŒ ${target} ط¨ط§ ظ…ظˆظپظ‚غŒطھ طھظˆط³ط· طھظ…ط§ظ…غŒ ط§ع©ط§ظ†طھâ€Œظ‡ط§غŒ ط§ظ†طھط®ط§ط¨غŒ ط¨ظ‡ ظ¾ط§غŒط§ظ† ط±ط³غŒط¯.`);

    addRecentEvent(
      `ع¯ط±ط¯ط´ آ«${type}آ» ط¨ط±ط§غŒ ${total} ط§ع©ط§ظ†طھ ط¨ط§ ط§ظˆظ„ظˆغŒطھ طھط±طھغŒط¨غŒ ط±ظˆغŒ ${target} ط§ط¬ط±ط§ ط´ط¯`,
      "orange",
      true,
      `Operation آ«${type}آ» executed across ${total} accounts in priority order`
    );

    const opsEl = document.getElementById("stat-today-ops");
    if (opsEl) {
      let val = parseInt(opsEl.textContent, 10) || 0;
      opsEl.textContent = val + total;
    }
  }

  step();
}

// --- 14. Inbox & Bot Messenger (Full Telegram Rich Messages - NO Video) ---
function initChatView() {
  const accSelect = document.getElementById("chat-account-select");
  const threadList = document.getElementById("chat-threads");

  if (!threadList || !accSelect) return;

  accSelect.innerHTML = accounts.map(a => `<option value="${a.id}">${a.name} (${a.phone})</option>`).join("");

  renderChatThreads();
  loadThread(1);
}

function renderChatThreads() {
  const threadList = document.getElementById("chat-threads");
  if (!threadList) return;

  threadList.innerHTML = chatThreads.map((t, idx) => `
    <div class="chat-thread-item ${idx === 0 ? 'active' : ''}" data-thread-id="${t.id}" onclick="selectChatThread(${t.id}, this)">
      <div class="avatar-circle">${t.isBot ? 'ًں¤–' : 'ًں‘¤'}</div>
      <div style="flex:1;">
        <div class="flex-between">
          <h5 style="font-size:0.85rem;">${t.name}</h5>
          <span class="text-xs text-muted">${t.time}</span>
        </div>
        <p class="text-xs text-muted" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:180px;">${t.preview}</p>
      </div>
    </div>
  `).join("");
}

window.selectChatThread = function(tid, el) {
  document.querySelectorAll(".chat-thread-item").forEach(i => i.classList.remove("active"));
  if (el) el.classList.add("active");
  loadThread(tid);
};

function loadThread(tid) {
  const thread = chatThreads.find(t => t.id === tid);
  const msgContainer = document.getElementById("chat-messages-container");
  if (!thread || !msgContainer) return;

  document.getElementById("chat-contact-name").textContent = thread.name;
  document.getElementById("chat-avatar").textContent = thread.isBot ? 'ًں¤–' : 'ًں‘¤';

  msgContainer.innerHTML = thread.messages.map((m, mIdx) => {
    let bodyHtml = "";

    // 1. Photo message
    if (m.photo) {
      bodyHtml += `
        <div class="tg-photo-msg">
          <img src="${m.photo}" class="tg-photo-img" alt="Telegram Photo">
        </div>
      `;
    }

    // 2. Voice note
    if (m.voice) {
      bodyHtml += `
        <div class="tg-voice-card">
          <button type="button" class="tg-voice-play-btn" onclick="toggleVoiceWave('${m.id}', this)">â–¶</button>
          <div class="tg-voice-wave" id="wave-${m.id}">
            ${m.voice.wave.map(h => `<div class="wave-bar" style="height:${h}px;"></div>`).join("")}
          </div>
          <span class="mono-font text-xs text-muted">${m.voice.duration}</span>
        </div>
      `;
    }

    // 3. Document / File
    if (m.doc) {
      bodyHtml += `
        <div class="tg-doc-card">
          <div class="tg-doc-icon">ًں“„</div>
          <div>
            <div class="font-bold text-xs">${m.doc.name}</div>
            <div class="mono-font text-xs text-muted">${m.doc.size}</div>
          </div>
          <button class="btn btn-sm btn-outline mr-auto" onclick="alert('ط¯ط§ظ†ظ„ظˆط¯ ظپط§غŒظ„ ${m.doc.name} ط¢ط؛ط§ط² ط´ط¯.')">â¬‡ ط¯ط±غŒط§ظپطھ</button>
        </div>
      `;
    }

    // 4. Poll
    if (m.poll) {
      bodyHtml += `
        <div class="tg-poll-card">
          <div class="tg-poll-question">ًں“ٹ ${m.poll.question}</div>
          ${m.poll.options.map((opt, oIdx) => `
            <div class="tg-poll-option" onclick="votePollOption(${thread.id}, ${mIdx}, ${oIdx})">
              <div class="tg-poll-bar" style="width: ${opt.pct}%;"></div>
              <div class="tg-poll-meta">
                <span>${opt.text}</span>
                <span class="mono-font font-bold">${opt.pct}ظھ (${opt.votes})</span>
              </div>
            </div>
          `).join("")}
          <div class="text-xs text-muted mt-2">طھط¹ط¯ط§ط¯ ع©ظ„ ط¢ط±ط§: ${m.poll.totalVotes} ط±ط§غŒ آ· ظ†ط¸ط±ط³ظ†ط¬غŒ ط¹ظ…ظˆظ…غŒ</div>
        </div>
      `;
    }

    // 5. Rich Text (Markdown, Quote, Spoilers)
    if (m.text) {
      let formattedText = m.text
        .replace(/`([^`]+)`/g, '<code class="mono-code">$1</code>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/_([^_]+)_/g, '<em>$1</em>')
        .replace(/\|\|([^|]+)\|\|/g, '<span class="tg-spoiler" onclick="this.classList.toggle(\'revealed\')">$1</span>')
        .replace(/\n/g, '<br>');

      bodyHtml += `<div class="tg-msg-text">${formattedText}</div>`;
    }

    // 6. Blockquote
    if (m.quote) {
      bodyHtml += `<blockquote class="tg-quote">${m.quote}</blockquote>`;
    }

    // 7. Inline Glass Keyboards
    if (m.inlineButtons && m.inlineButtons.length > 0) {
      bodyHtml += `
        <div class="tg-inline-keyboard">
          ${m.inlineButtons.map(row => `
            <div class="tg-inline-row">
              ${row.map(btn => `
                <button type="button" class="tg-inline-btn" onclick="handleInlineClick('${btn.text}', '${btn.url || ''}', '${btn.callback || ''}')">
                  ${btn.text}
                </button>
              `).join("")}
            </div>
          `).join("")}
        </div>
      `;
    }

    // 8. Reactions Row
    if (m.reactions) {
      bodyHtml += `
        <div class="tg-msg-reactions">
          ${Object.entries(m.reactions).map(([emo, count]) => `
            <button type="button" class="tg-reaction-tag" onclick="incrementMessageReaction(${thread.id}, ${mIdx}, '${emo}')">
              ${emo} ${count}
            </button>
          `).join("")}
          <button type="button" class="tg-reaction-tag" onclick="quickReactPrompt(${thread.id}, ${mIdx})">â‍•</button>
        </div>
      `;
    }

    return `
      <div class="chat-msg ${m.incoming ? 'incoming' : 'outgoing'}">
        ${bodyHtml}
      </div>
    `;
  }).join("");

  msgContainer.scrollTop = msgContainer.scrollHeight;
}

window.handleInlineClick = function(text, url, callback) {
  if (url) {
    window.open(url, '_blank');
  } else {
    addLog("ACTION", `ع©ظ„غŒع© ط±ظˆغŒ ط¯ع©ظ…ظ‡ ط´غŒط´ظ‡â€Œط§غŒ ط±ط¨ط§طھ: [${text}] -> Call: ${callback}`);
    alert(`ط¯ع©ظ…ظ‡ ط´غŒط´ظ‡â€Œط§غŒ "${text}" ط¨ط§ ظ…ظˆظپظ‚غŒطھ ظپط´ط±ط¯ظ‡ ط´ط¯ ظˆ ط¨ظ‡ ط³ط±ظˆط± ط±ط¨ط§طھ ط§ط±ط³ط§ظ„ ع¯ط±ط¯غŒط¯.`);
  }
};

window.votePollOption = function(threadId, msgIdx, optIdx) {
  const thread = chatThreads.find(t => t.id === threadId);
  if (!thread || !thread.messages[msgIdx] || !thread.messages[msgIdx].poll) return;

  const poll = thread.messages[msgIdx].poll;
  poll.options[optIdx].votes++;
  poll.totalVotes++;

  poll.options.forEach(opt => {
    opt.pct = Math.round((opt.votes / poll.totalVotes) * 100);
  });

  loadThread(threadId);
  addLog("ACTION", `ط«ط¨طھ ط±ط§غŒ ط¯ط± ظ†ط¸ط±ط³ظ†ط¬غŒ "${poll.question}" ط±ظˆغŒ ع¯ط²غŒظ†ظ‡ "${poll.options[optIdx].text}"`);
};

window.incrementMessageReaction = function(threadId, msgIdx, emoji) {
  const thread = chatThreads.find(t => t.id === threadId);
  if (!thread || !thread.messages[msgIdx]) return;
  const m = thread.messages[msgIdx];
  if (!m.reactions) m.reactions = {};
  m.reactions[emoji] = (m.reactions[emoji] || 0) + 1;
  loadThread(threadId);
};

window.quickReactPrompt = function(threadId, msgIdx) {
  const emoji = prompt("ط§غŒظ…ظˆط¬غŒ ط±غŒâ€Œط§ع©ط´ظ† ط¨ظ‡ ظ¾غŒط§ظ… ط±ط§ ظˆط§ط±ط¯ ع©ظ†غŒط¯ (ظ…ط«ظ„ط§ظ‹ ًں”¥طŒ â‌¤ï¸ڈطŒ ًں‘ڈطŒ ًںڑ€):", "ًں”¥");
  if (emoji && emoji.trim()) {
    incrementMessageReaction(threadId, msgIdx, emoji.trim());
  }
};

window.toggleVoiceWave = function(id, btn) {
  const isPlaying = btn.textContent === "âڈ¸";
  btn.textContent = isPlaying ? "â–¶" : "âڈ¸";
  const wave = document.getElementById(`wave-${id}`);
  if (wave) {
    if (!isPlaying) {
      wave.querySelectorAll(".wave-bar").forEach(bar => bar.style.background = "var(--accent-pink)");
    } else {
      wave.querySelectorAll(".wave-bar").forEach(bar => bar.style.background = "var(--accent-cyan)");
    }
  }
};

window.applyRichFormat = function(type) {
  const input = document.getElementById("chat-input-msg");
  if (!input) return;
  const val = input.value;
  const sStart = input.selectionStart;
  const sEnd = input.selectionEnd;
  const selectedText = val.substring(sStart, sEnd) || "ظ…طھظ† ظ†ظ…ظˆظ†ظ‡";

  let wrapped = "";
  if (type === "bold") wrapped = `**${selectedText}**`;
  else if (type === "italic") wrapped = `_${selectedText}_`;
  else if (type === "code") wrapped = `\`${selectedText}\``;
  else if (type === "spoiler") wrapped = `||${selectedText}||`;
  else if (type === "quote") wrapped = `\n> ${selectedText}\n`;
  else if (type === "link") wrapped = `[${selectedText}](https://t.me)`;

  input.value = val.substring(0, sStart) + wrapped + val.substring(sEnd);
  input.focus();
};

window.openSendPhotoModal = function() {
  document.getElementById("modal-send-photo").classList.add("open");
};
window.closeSendPhotoModal = function() {
  document.getElementById("modal-send-photo").classList.remove("open");
};
window.selectSamplePhoto = function(type, btn) {
  document.querySelectorAll("#modal-send-photo .filter-chip").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  const input = document.getElementById("photo-url-input");
  if (type === "crypto") input.value = "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=600";
  else if (type === "banner") input.value = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600";
  else input.value = "https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=600";
};
window.submitSendPhoto = function() {
  const url = document.getElementById("photo-url-input").value.trim();
  const caption = document.getElementById("photo-caption-input").value.trim();
  if (!url) return;

  const activeThread = document.querySelector(".chat-thread-item.active");
  const tid = activeThread ? parseInt(activeThread.dataset.threadId, 10) : 1;
  const thread = chatThreads.find(t => t.id === tid);

  if (thread) {
    thread.messages.push({
      id: `m_${Date.now()}`,
      sender: "You",
      incoming: false,
      photo: url,
      text: caption || "ط¹ع©ط³ ط§ط±ط³ط§ظ„غŒ ط¨ط¯ظˆظ† ظ…طھظ†"
    });
    closeSendPhotoModal();
    loadThread(tid);
    addLog("ACTION", `ط¹ع©ط³ ظ‡ظ…ط±ط§ظ‡ ط¨ط§ ع©ظ¾ط´ظ† ط¨ظ‡ ${thread.name} ط§ط±ط³ط§ظ„ ط´ط¯.`);
  }
};

window.openSendPollModal = function() {
  document.getElementById("modal-create-poll").classList.add("open");
};
window.closeSendPollModal = function() {
  document.getElementById("modal-create-poll").classList.remove("open");
};
window.submitSendPoll = function() {
  const q = document.getElementById("poll-q-input").value.trim();
  const o1 = document.getElementById("poll-opt-1").value.trim();
  const o2 = document.getElementById("poll-opt-2").value.trim();
  const o3 = document.getElementById("poll-opt-3").value.trim();
  if (!q || !o1 || !o2) return;

  const opts = [
    { text: o1, votes: 1, pct: 50 },
    { text: o2, votes: 1, pct: 50 }
  ];
  if (o3) opts.push({ text: o3, votes: 0, pct: 0 });

  const activeThread = document.querySelector(".chat-thread-item.active");
  const tid = activeThread ? parseInt(activeThread.dataset.threadId, 10) : 1;
  const thread = chatThreads.find(t => t.id === tid);

  if (thread) {
    thread.messages.push({
      id: `m_${Date.now()}`,
      sender: "You",
      incoming: false,
      text: "ظ†ط¸ط±ط³ظ†ط¬غŒ ط§غŒط¬ط§ط¯ ط´ط¯ظ‡:",
      poll: {
        id: `poll_${Date.now()}`,
        question: q,
        totalVotes: 2,
        options: opts
      }
    });
    closeSendPollModal();
    loadThread(tid);
    addLog("ACTION", `ظ†ط¸ط±ط³ظ†ط¬غŒ ط¬ط¯غŒط¯ ط¨ظ‡ ${thread.name} ط§ط±ط³ط§ظ„ ط´ط¯: "${q}"`);
  }
};

window.sendVoiceMessage = function() {
  const activeThread = document.querySelector(".chat-thread-item.active");
  const tid = activeThread ? parseInt(activeThread.dataset.threadId, 10) : 1;
  const thread = chatThreads.find(t => t.id === tid);

  if (thread) {
    thread.messages.push({
      id: `m_${Date.now()}`,
      sender: "You",
      incoming: false,
      voice: { duration: "0:15", wave: [6, 12, 18, 24, 14, 8, 16, 20, 10, 5, 12, 18, 9, 6] },
      text: "ظ¾غŒط§ظ… طµظˆطھغŒ ط´ط¨غŒظ‡â€Œط³ط§ط²غŒ ط´ط¯ظ‡ (Voice Note)"
    });
    loadThread(tid);
    addLog("ACTION", `ظ¾غŒط§ظ… طµظˆطھغŒ (Voice) ط¨ظ‡ ${thread.name} ط§ط±ط³ط§ظ„ ط´ط¯.`);
  }
};

window.sendDocumentMessage = function() {
  const activeThread = document.querySelector(".chat-thread-item.active");
  const tid = activeThread ? parseInt(activeThread.dataset.threadId, 10) : 1;
  const thread = chatThreads.find(t => t.id === tid);

  if (thread) {
    thread.messages.push({
      id: `m_${Date.now()}`,
      sender: "You",
      incoming: false,
      doc: { name: "backup_accounts_data.zip", size: "3.2 MB" },
      text: "ظپط§غŒظ„ ظ…ط³طھظ†ط¯ط§طھ ظˆ ط¯غŒطھط§غŒ ظ¾ط´طھغŒط¨ط§ظ† ط³ط´ظ†"
    });
    loadThread(tid);
    addLog("ACTION", `ط³ظ†ط¯/ظپط§غŒظ„ ط¯ط§ع©غŒظˆظ…ظ†طھ ط¨ظ‡ ${thread.name} ط§ط±ط³ط§ظ„ ط´ط¯.`);
  }
};

window.sendChatMessage = function() {
  const input = document.getElementById("chat-input-msg");
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;
  input.value = "";

  const activeThread = document.querySelector(".chat-thread-item.active");
  const tid = activeThread ? parseInt(activeThread.dataset.threadId, 10) : 1;
  const thread = chatThreads.find(t => t.id === tid);

  if (thread) {
    thread.messages.push({
      id: `m_${Date.now()}`,
      sender: "You",
      text: text,
      incoming: false
    });
    loadThread(tid);
    addLog("ACTION", `ظ¾غŒط§ظ… ط¨ظ‡ ${thread.name} ط§ط±ط³ط§ظ„ ط´ط¯: "${text.substring(0, 30)}..."`);

    if (thread.isBot) {
      setTimeout(() => {
        thread.messages.push({
          id: `m_${Date.now() + 1}`,
          sender: thread.name,
          text: `ط¯ط³طھظˆط± "${text}" ط¨ط§ ظ…ظˆظپظ‚غŒطھ ظ¾ط±ط¯ط§ط²ط´ ط´ط¯.`,
          incoming: true,
          inlineButtons: [
            [ { text: "âœ” طھط§غŒغŒط¯ ط¯ط±ط®ظˆط§ط³طھ", callback: "confirm_cmd" }, { text: "â‌Œ ظ„ط؛ظˆ ط¹ظ…ظ„غŒط§طھ", callback: "cancel_cmd" } ]
          ]
        });
        loadThread(tid);
      }, 1000);
    }
  }
};

// --- 15. Cleanup & Purge Module ---
function renderCleanupDialogs() {
  const tbody = document.getElementById("cleanup-dialogs-tbody");
  const countEl = document.getElementById("cleanup-selected-count");
  const selectAllCb = document.getElementById("cleanup-select-all-cb");
  const accSelect = document.getElementById("cleanup-account-select");
  if (!tbody) return;

  if (accSelect && accSelect.children.length === 0) {
    accSelect.innerHTML = `<option value="all">ظ‡ظ…ظ‡ ط§ع©ط§ظ†طھâ€Œظ‡ط§ (ظ…ط¬ظ…ظˆط¹)</option>` + 
      accounts.map(a => `<option value="${a.id}">${a.name} (${a.phone})</option>`).join("");
  }

  // Filter
  const filtered = cleanupDialogs.filter(d => {
    if (cleanupFilterType !== "all" && d.type !== cleanupFilterType) return false;
    if (cleanupSearchQuery) {
      const q = cleanupSearchQuery.toLowerCase();
      if (!d.title.toLowerCase().includes(q) && !d.username.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  if (countEl) countEl.textContent = cleanupSelectedIds.size;
  if (selectAllCb) selectAllCb.checked = (filtered.length > 0 && filtered.every(d => cleanupSelectedIds.has(d.id)));

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted" style="padding: 24px;">ظ‡غŒع† ع¯ظپطھع¯ظˆغŒغŒ ط¨ط§ ظپغŒظ„طھط± ط§ظ†طھط®ط§ط¨غŒ غŒط§ظپطھ ظ†ط´ط¯.</td></tr>`;
    return;
  }

  const typeLabelsFa = { group: "ًں‘¥ ط³ظˆظ¾ط±ع¯ط±ظˆظ‡", channel: "ًں“¢ ع©ط§ظ†ط§ظ„", bot: "ًں¤– ط±ط¨ط§طھ" };
  const statusLabelsFa = { active: "ظپط¹ط§ظ„", semi: "ظ†غŒظ…ظ‡â€Œظپط¹ط§ظ„", inactive: "ط؛غŒط±ظپط¹ط§ظ„ (ظ‚ط¯غŒظ…غŒ)" };

  tbody.innerHTML = filtered.map(d => {
    const isChecked = cleanupSelectedIds.has(d.id);
    return `
      <tr>
        <td><input type="checkbox" ${isChecked ? 'checked' : ''} onchange="toggleCleanupDialog(${d.id})"></td>
        <td>
          <strong>${d.title}</strong>
          <div class="text-xs text-muted mono-font">${d.username}</div>
        </td>
        <td><span class="tag-pill">${typeLabelsFa[d.type] || d.type}</span></td>
        <td><span class="mono-font text-xs">${d.members}</span></td>
        <td><span class="text-xs text-muted">${d.lastActive}</span></td>
        <td>
          <span class="inactivity-badge ${d.status}">${statusLabelsFa[d.status]}</span>
        </td>
        <td>
          <button class="btn btn-sm btn-outline text-pink" onclick="quickPurgeSingle(${d.id})">
            ${d.type === 'bot' ? 'ًں›‘ ظ…ط³ط¯ظˆط¯ط³ط§ط²غŒ' : 'ًںڑھ ط®ط±ظˆط¬ ظپظˆط±غŒ'}
          </button>
        </td>
      </tr>
    `;
  }).join("");
}

window.setCleanupTypeFilter = function(type) {
  cleanupFilterType = type;
  document.querySelectorAll("#cleanup-type-chips .filter-chip").forEach(b => {
    b.classList.toggle("active", b.getAttribute("onclick").includes(`'${type}'`));
  });
  renderCleanupDialogs();
};

window.filterCleanupSearch = function(val) {
  cleanupSearchQuery = val.trim();
  renderCleanupDialogs();
};

window.toggleCleanupAllCheckboxes = function(checked) {
  cleanupDialogs.forEach(d => {
    if (cleanupFilterType === "all" || d.type === cleanupFilterType) {
      if (checked) cleanupSelectedIds.add(d.id);
      else cleanupSelectedIds.delete(d.id);
    }
  });
  renderCleanupDialogs();
};

window.toggleCleanupDialog = function(id) {
  if (cleanupSelectedIds.has(id)) cleanupSelectedIds.delete(id);
  else cleanupSelectedIds.add(id);
  renderCleanupDialogs();
};

window.cleanupSelectAll = function() {
  cleanupDialogs.forEach(d => cleanupSelectedIds.add(d.id));
  renderCleanupDialogs();
};

window.cleanupSelectRandom = function(count) {
  cleanupSelectedIds.clear();
  const shuffled = [...cleanupDialogs].sort(() => 0.5 - Math.random());
  shuffled.slice(0, count).forEach(d => cleanupSelectedIds.add(d.id));
  renderCleanupDialogs();
};

window.cleanupSelectInactive = function(daysThreshold) {
  cleanupSelectedIds.clear();
  cleanupDialogs.filter(d => d.daysInactive >= daysThreshold).forEach(d => cleanupSelectedIds.add(d.id));
  renderCleanupDialogs();
};

window.cleanupClearSelection = function() {
  cleanupSelectedIds.clear();
  renderCleanupDialogs();
};

window.quickPurgeSingle = function(id) {
  const d = cleanupDialogs.find(x => x.id === id);
  if (!d) return;
  if (confirm(`ط¢غŒط§ ط§ط² ط®ط±ظˆط¬/ظ…ط³ط¯ظˆط¯ط³ط§ط²غŒ "${d.title}" ط§ط·ظ…غŒظ†ط§ظ† ط¯ط§ط±غŒط¯طں`)) {
    cleanupDialogs = cleanupDialogs.filter(x => x.id !== id);
    cleanupSelectedIds.delete(id);
    renderCleanupDialogs();
    addLog("SUCCESS", `ط®ط±ظˆط¬ ط§ط² ع¯ظپطھع¯ظˆ "${d.title}" ط¨ط§ ظ…ظˆظپظ‚غŒطھ ط§ظ†ط¬ط§ظ… ط´ط¯.`);
    addRecentEvent(`ط®ط±ظˆط¬ ط§ط² ع¯ظپطھع¯ظˆغŒ آ«${d.title}آ» ط§ط¬ط±ط§ ط´ط¯`, "orange", true);
  }
};

window.executePurgeActions = function(actionType) {
  if (cleanupSelectedIds.size === 0) {
    alert("ظ„ط·ظپط§ظ‹ ط­ط¯ط§ظ‚ظ„ غŒع© ع¯ظپطھع¯ظˆ ط±ط§ ط¨ط±ط§غŒ ظ¾ط§ع©ط³ط§ط²غŒ ط§ظ†طھط®ط§ط¨ ع©ظ†غŒط¯!");
    return;
  }

  const idsToPurge = Array.from(cleanupSelectedIds);
  const total = idsToPurge.length;
  const progressBox = document.getElementById("cleanup-progress-box");
  const fill = document.getElementById("cleanup-progress-fill");
  const text = document.getElementById("cleanup-progress-text");
  const pctText = document.getElementById("cleanup-progress-pct");
  const logStream = document.getElementById("cleanup-log-stream");

  if (progressBox) progressBox.style.display = "block";
  if (logStream) logStream.innerHTML = "";

  let current = 0;
  addLog("ACTION", `ط´ط±ظˆط¹ ظ¾ط§ع©ط³ط§ط²غŒ ع¯ط±ظˆظ‡غŒ [${actionType}] ط¨ط±ط§غŒ ${total} ع¯ظپطھع¯ظˆ...`);

  function step() {
    if (current < total) {
      const id = idsToPurge[current];
      const d = cleanupDialogs.find(x => x.id === id) || { title: `ع¯ظپطھع¯ظˆ #${id}` };
      current++;

      const pct = Math.round((current / total) * 100);
      if (fill) fill.style.width = `${pct}%`;
      if (text) text.textContent = `${current} ط§ط² ${total} ط§ظ†ط¬ط§ظ… ط´ط¯ظ‡`;
      if (pctText) pctText.textContent = `${pct}ظھ`;

      const line = document.createElement("div");
      line.className = "log-line";
      line.textContent = `âœ” [ط®ط±ظˆط¬ ط§غŒظ…ظ†]: ط§ط² ${d.title} (${d.username}) ط¨ط§ طھط§ط®غŒط± ط¶ط¯ ط§ط³ظ¾ظ… ظ„ظپطھ ط¯ط§ط¯ظ‡ ط´ط¯.`;
      if (logStream) {
        logStream.appendChild(line);
        logStream.scrollTop = logStream.scrollHeight;
      }

      cleanupDialogs = cleanupDialogs.filter(x => x.id !== id);

      if (current < total) {
        setTimeout(step, 600);
      } else {
        finish();
      }
    }
  }

  function finish() {
    cleanupSelectedIds.clear();
    renderCleanupDialogs();
    addLog("SUCCESS", `ط¹ظ…ظ„غŒط§طھ ظ¾ط§ع©ط³ط§ط²غŒ ظˆ ط®ط±ظˆط¬ ط¨ط±ط§غŒ طھظ…ط§ظ… ${total} ظ…ظˆط±ط¯ ط¨ط§ ظ…ظˆظپظ‚غŒطھ ط¨ظ‡ ظ¾ط§غŒط§ظ† ط±ط³غŒط¯.`);
    addRecentEvent(`ظ¾ط§ع©ط³ط§ط²غŒ ط¯ط³طھظ‡â€Œط¬ظ…ط¹غŒ ${total} ع¯ظپطھع¯ظˆ ط¨ط§ ظ…ظˆظپظ‚غŒطھ ط§ط¬ط±ط§ ط´ط¯`, "orange", true);
    alert(`ط¹ظ…ظ„غŒط§طھ ظ¾ط§ع©ط³ط§ط²غŒ ط¨ط§ ظ…ظˆظپظ‚غŒطھ ط§ظ†ط¬ط§ظ… ط´ط¯ ظˆ ${total} ع†طھ ط§ط² ط³ط´ظ†â€Œظ‡ط§ ط®ط§ط±ط¬ ع¯ط±ط¯غŒط¯ظ†ط¯.`);
  }

  step();
};

// --- 16. Scheduled Tasks ---
function renderScheduledTasks() {
  const container = document.getElementById("scheduler-cards-container");
  if (!container) return;

  container.innerHTML = scheduledTasks.map(task => {
    const title = escapeHtml((currentLang === "en" && task.titleEn) ? task.titleEn : task.title);
    const nextRun = escapeHtml((currentLang === "en" && task.nextRunEn) ? task.nextRunEn : task.nextRun);
    const target = escapeHtml(task.target);
    const time = escapeHtml(task.time);
    const account = escapeHtml(task.account);
    const isAct = task.status === 'active';
    const btnLabel = isAct ? (currentLang === 'en' ? 'Pause' : 'طھظˆظ‚ظپ ظ…ظˆظ‚طھ') : (currentLang === 'en' ? 'Activate' : 'ظپط¹ط§ظ„â€Œط³ط§ط²غŒ');

    return `
      <div class="cyber-card">
        <div class="card-header-flex">
          <h4>${title}</h4>
          <span class="badge-status ${isAct ? 'online' : 'idle'}">
            ${isAct ? 'â—ڈ ' + (currentLang === 'en' ? 'Active' : 'ظپط¹ط§ظ„') : 'âڈ¸ ' + (currentLang === 'en' ? 'Paused' : 'ظ…طھظˆظ‚ظپ')}
          </span>
        </div>
        <p class="text-xs text-muted mt-2">${currentLang === 'en' ? 'Target:' : 'ظ…ظ‚طµط¯:'} <strong class="mono-font">${target}</strong></p>
        <p class="text-xs text-muted">${currentLang === 'en' ? 'Schedule:' : 'ط²ظ…ط§ظ†â€Œط¨ظ†ط¯غŒ:'} ${time}</p>
        <p class="text-xs text-muted">${currentLang === 'en' ? 'Executor:' : 'ط§ع©ط§ظ†طھ ظ…ط¬ط±غŒ:'} ${account}</p>
        <div class="flex-between mt-4">
          <span class="mono-font text-xs text-cyan">${currentLang === 'en' ? 'Next run:' : 'ط§ط¬ط±ط§غŒ ط¨ط¹ط¯غŒ:'} ${nextRun}</span>
          <button class="btn btn-sm btn-outline" onclick="toggleTask(${task.id})">
            ${btnLabel}
          </button>
        </div>
      </div>
    `;
  }).join("");
}

window.toggleTask = function(taskId) {
  const task = scheduledTasks.find(t => t.id === taskId);
  if (!task) return;
  task.status = (task.status === 'active') ? 'paused' : 'active';
  task.nextRun = (task.status === 'active') ? 'ط¨ظ‡ ط²ظˆط¯غŒ' : 'ظ…طھظˆظ‚ظپ ط´ط¯ظ‡';
  task.nextRunEn = (task.status === 'active') ? 'Soon' : 'Paused';
  renderScheduledTasks();
  renderUpcomingActions();
  addLog("INFO", `ظˆط¶ط¹غŒطھ ظˆط¸غŒظپظ‡ ط²ظ…ط§ظ†â€Œط¨ظ†ط¯غŒ "${task.title}" ط¨ظ‡ ${task.status} طھط؛غŒغŒط± ع©ط±ط¯.`);
  addRecentEvent(`ظˆط¶ط¹غŒطھ طھط³ع© ط²ظ…ط§ظ†â€Œط¨ظ†ط¯غŒ آ«${task.title}آ» طھط؛غŒغŒط± غŒط§ظپطھ`, "cyan", false);
};

// --- 17. OTP Table Rendering & Quick Retrieval ---
function renderOTPs() {
  const tbody = document.getElementById("otp-history-table");
  if (!tbody) return;
  tbody.innerHTML = "";

  otpHistory.forEach(item => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${item.accountName}</strong></td>
      <td><span class="mono-font">${item.phone}</span></td>
      <td><span class="otp-code-highlight">${item.code}</span></td>
      <td><span class="mono-font text-xs">${item.time}</span></td>
      <td>
        <button class="btn btn-sm btn-outline" onclick="copyCode('${item.code}')">ًں“‹ ${currentLang === 'en' ? 'Copy' : 'ع©ظ¾غŒ ع©ط¯'}</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

window.copyCode = function(code) {
  navigator.clipboard.writeText(code).then(() => {
    alert(currentLang === 'fa' ? `ع©ط¯ ${code} ط¯ط± ع©ظ„غŒظ¾â€Œط¨ظˆط±ط¯ ع©ظ¾غŒ ط´ط¯.` : `Code ${code} copied to clipboard.`);
  }).catch(() => {
    alert(code);
  });
};

// --- 18. Terminal Activity Logs ---
function initActivityLog() {
  addLog("INFO", "ط³غŒط³طھظ… ط¨ط§ط±ع¯ط°ط§ط±غŒ ط´ط¯. ط§طھطµط§ظ„ ط¨ظ‡ ظˆظ„ظˆظ… /data ط¨ط±ظ‚ط±ط§ط± ط§ط³طھ.");
  addLog("SUCCESS", "طھظ…ط§ظ… غµ ظپط§غŒظ„ Session طھظ„ع¯ط±ط§ظ… ط¨ط§ ظ…ظˆظپظ‚غŒطھ طھط§غŒغŒط¯ ط§ط¹طھط¨ط§ط± ط´ط¯ظ†ط¯.");
  addLog("INFO", "ط³ط±ظˆغŒط³ ط´ظ†ظˆط¯ ع©ط¯ظ‡ط§غŒ ظˆط±ظˆط¯ طھظ„ع¯ط±ط§ظ… (OTP Listener) ط¨ط§ ظ…ظˆظپظ‚غŒطھ ط´ط±ظˆط¹ ط¨ظ‡ ع©ط§ط± ع©ط±ط¯.");
  addLog("INFO", "ظ…ط§عکظˆظ„ ظ‡ظˆط´ظ…ظ†ط¯ طھط´ط®غŒطµ ط§ط¯ظ„غŒط³طھ ظˆ ط¨ط§غŒâ€Œظ¾ط³ ظ…ط­ط¯ظˆط¯غŒطھ غ² ظپظˆظ„ط¯ط± ظپط¹ط§ظ„ ط´ط¯.");

  const clearBtn = document.getElementById("btn-clear-logs");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      const stream = document.getElementById("terminal-log-stream");
      if (stream) stream.innerHTML = "";
    });
  }
}

function addLog(type, message) {
  const stream = document.getElementById("terminal-log-stream");
  if (!stream) return;

  const now = new Date();
  const time = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;

  let tagClass = "info";
  if (type === "SUCCESS") tagClass = "success";
  if (type === "ACTION") tagClass = "action";

  const line = document.createElement("div");
  line.className = "terminal-line";
  line.innerHTML = `
    <span class="log-time">[${time}]</span>
    <span class="log-tag ${tagClass}">${escapeHtml(type)}</span>
    <span class="log-msg">${escapeHtml(message)}</span>
  `;

  stream.appendChild(line);
  // Memory optimization for 1GB RAM server/client: keep max 100 lines
  while (stream.children.length > 100) {
    stream.removeChild(stream.firstChild);
  }
  stream.scrollTop = stream.scrollHeight;
}


// ================= 19. SPECIALIZED BOT STARTER MODULE =================
let botStarterState = {
  targetUrl: "",
  parsedBotUsername: "@CryptoAirdropBot",
  parsedStartParam: "ref_98124",
  selectedMode: "simple", // simple | smart | manual | captcha
  accountLimit: 5,
  selectedAccounts: [], // Array of account IDs in prioritized order e.g. [1, 2, 3]
  activeStepIndex: 0,
  isOperating: false,
  stopRequested: false,
  currentCaptchaChallenge: null
};

// Initialize Bot Starter
function initBotStarter() {
  botStarterState.selectedAccounts = accounts.filter(a => a.status === 'online').map(a => a.id);
  renderBotPriorityAccounts();
  
  // Set default initial link if empty
  const urlInput = document.getElementById("bot-starter-url");
  if (urlInput && !urlInput.value) {
    urlInput.value = "https://t.me/CryptoAirdropBot?start=ref_98124";
    parseBotStartLink(urlInput.value);
  }
}

// 1. Parse Bot Link & Parameters
window.parseBotStartLink = function(input) {
  botStarterState.targetUrl = input.trim();
  const pill = document.getElementById("bot-parser-pill");
  const usernameEl = document.getElementById("parser-bot-username");
  const paramEl = document.getElementById("parser-bot-param");
  const statusBadge = document.getElementById("bot-parser-status");

  if (!input || input.trim().length === 0) {
    if (pill) pill.style.display = "none";
    if (statusBadge) {
      statusBadge.textContent = "ظ…ظ†طھط¸ط± ظˆط±ظˆط¯ ظ„غŒظ†ع©...";
      statusBadge.className = "badge-status idle";
    }
    botStarterState.parsedBotUsername = "";
    botStarterState.parsedStartParam = "";
    return;
  }

  let username = "";
  let param = "";

  const clean = input.trim();
  if (clean.includes("t.me/") || clean.includes("telegram.me/")) {
    const parts = clean.split(/t\.me\/|telegram\.me\//)[1];
    if (parts) {
      const qIdx = parts.indexOf("?");
      if (qIdx !== -1) {
        username = "@" + parts.substring(0, qIdx).replace("/", "");
        const query = parts.substring(qIdx + 1);
        const match = query.match(/(?:start|startattach|startgroup)=([^&]+)/i);
        if (match) param = match[1];
      } else {
        username = "@" + parts.replace("/", "");
      }
    }
  } else if (clean.startsWith("@")) {
    const spaceIdx = clean.indexOf(" ");
    if (spaceIdx !== -1) {
      username = clean.substring(0, spaceIdx);
      param = clean.substring(spaceIdx + 1).trim();
    } else {
      username = clean;
    }
  } else {
    username = "@" + clean;
  }

  botStarterState.parsedBotUsername = username;
  botStarterState.parsedStartParam = param;

  if (pill) {
    pill.style.display = "flex";
    if (usernameEl) usernameEl.textContent = username || "@Bot";
    if (paramEl) paramEl.textContent = param ? `start=${param}` : "start=ط¨ط¯ظˆظ† ظ¾ط§ط±ط§ظ…طھط±";
  }

  if (statusBadge) {
    statusBadge.textContent = "ظ„غŒظ†ع© طھط§غŒغŒط¯ ط´ط¯ âœ”ï¸ڈ";
    statusBadge.className = "badge-status online";
  }
};

// 2. Render & Manage Priority Accounts for Bot Starter
function renderBotPriorityAccounts() {
  const container = document.getElementById("bot-accounts-priority-list");
  const badgeCount = document.getElementById("bot-selected-count-badge");
  const orderTextEl = document.getElementById("bot-priority-order-text");
  if (!container) return;

  if (badgeCount) {
    badgeCount.textContent = `${botStarterState.selectedAccounts.length} / ${botStarterState.accountLimit}`;
  }

  if (orderTextEl) {
    if (botStarterState.selectedAccounts.length > 0) {
      const names = botStarterState.selectedAccounts.map(id => {
        const a = accounts.find(acc => acc.id === id);
        return a ? a.name : `ط§ع©ط§ظ†طھ ${id}`;
      }).join(" â‍” ");
      orderTextEl.innerHTML = `<span class="text-xs text-muted">طھط±طھغŒط¨ ط§ظˆظ„ظˆغŒطھ ط§ط¬ط±ط§: </span><span class="text-xs text-cyan font-bold">${names}</span>`;
    } else {
      orderTextEl.innerHTML = `<span class="text-xs text-pink">ظ‡غŒع† ط§ع©ط§ظ†طھغŒ ط§ظ†طھط®ط§ط¨ ظ†ط´ط¯ظ‡ ط§ط³طھ.</span>`;
    }
  }

  container.innerHTML = accounts.map(acc => {
    const priorityIndex = botStarterState.selectedAccounts.indexOf(acc.id);
    const isSelected = priorityIndex !== -1;
    const isOnline = acc.status === "online";
    const badgeText = isSelected ? `#${priorityIndex + 1}` : "â€”";

    return `
      <div class="priority-card ${isSelected ? 'selected' : ''}" onclick="toggleBotAccountPriority(${acc.id})">
        <div class="priority-card-info">
          <div class="acc-mini-avatar">${isOnline ? 'ًں¤–' : 'âڑ ï¸ڈ'}</div>
          <div>
            <div class="font-bold text-xs">${acc.name}</div>
            <div class="mono-font text-xs text-muted">${acc.phone}</div>
          </div>
        </div>
        <div class="bot-priority-badge-pill" title="ط§ظˆظ„ظˆغŒطھ ط§ط¬ط±ط§">${badgeText}</div>
      </div>
    `;
  }).join("");
}

window.toggleBotAccountPriority = function(accId) {
  const idx = botStarterState.selectedAccounts.indexOf(accId);
  if (idx !== -1) {
    botStarterState.selectedAccounts.splice(idx, 1);
  } else {
    if (botStarterState.selectedAccounts.length >= botStarterState.accountLimit) {
      alert(currentLang === 'fa' 
        ? `ط³ظ‚ظپ ظ…ط¬ط§ط² طھط¹ط¯ط§ط¯ ط§ع©ط§ظ†طھâ€Œظ‡ط§ (${botStarterState.accountLimit}) ظ¾ط± ط´ط¯ظ‡ ط§ط³طھ. ظ„ط·ظپط§ظ‹ ط¹ط¯ط¯ ط³ظ‚ظپ ط±ط§ ط§ظپط²ط§غŒط´ ط¯ظ‡غŒط¯ غŒط§ غŒع© ط§ع©ط§ظ†طھ ط±ط§ ظ„ط؛ظˆ ع©ظ†غŒط¯.` 
        : `Account limit (${botStarterState.accountLimit}) reached. Increase the limit or deselect an account.`);
      return;
    }
    botStarterState.selectedAccounts.push(accId);
  }
  renderBotPriorityAccounts();
};

window.selectAllBotAccountsSequential = function() {
  const limit = botStarterState.accountLimit;
  botStarterState.selectedAccounts = accounts.slice(0, limit).map(a => a.id);
  renderBotPriorityAccounts();
};

window.selectOnlineBotAccountsOnly = function() {
  const limit = botStarterState.accountLimit;
  botStarterState.selectedAccounts = accounts.filter(a => a.status === 'online').slice(0, limit).map(a => a.id);
  renderBotPriorityAccounts();
};

window.clearBotAccountsPriority = function() {
  botStarterState.selectedAccounts = [];
  renderBotPriorityAccounts();
};

window.updateBotAccountLimit = function(val) {
  const num = parseInt(val) || 5;
  botStarterState.accountLimit = num;
  if (botStarterState.selectedAccounts.length > num) {
    botStarterState.selectedAccounts = botStarterState.selectedAccounts.slice(0, num);
  }
  renderBotPriorityAccounts();
};

// 3. Mode Switcher
window.selectBotStartMode = function(mode) {
  botStarterState.selectedMode = mode;

  document.querySelectorAll(".bot-mode-card").forEach(c => c.classList.remove("active"));
  const activeCard = document.getElementById(`mode-card-${mode}`);
  if (activeCard) activeCard.classList.add("active");

  const subSmart = document.getElementById("subpanel-mode-smart");
  const subManual = document.getElementById("subpanel-mode-manual");
  const captchaView = document.getElementById("captcha-interactive-viewport");

  if (subSmart) subSmart.style.display = (mode === "smart") ? "block" : "none";
  if (subManual) subManual.style.display = (mode === "manual") ? "block" : "none";
  if (captchaView && mode !== "captcha") captchaView.style.display = "none";
  if (captchaView && mode === "captcha") captchaView.style.display = "block";
};

// 4. Execution Engine
window.executeBotStarterOperation = function() {
  if (botStarterState.isOperating) return;

  const urlInput = document.getElementById("bot-starter-url");
  const url = urlInput ? urlInput.value.trim() : "";
  if (!url) {
    alert(currentLang === 'fa' ? "ظ„ط·ظپط§ظ‹ ظ„غŒظ†ع© غŒط§ ظ†ط§ظ… ع©ط§ط±ط¨ط±غŒ ط±ط¨ط§طھ ط±ط§ ظˆط§ط±ط¯ ع©ظ†غŒط¯!" : "Please enter the bot link or username!");
    return;
  }

  if (botStarterState.selectedAccounts.length === 0) {
    alert(currentLang === 'fa' ? "ط­ط¯ط§ظ‚ظ„ غŒع© ط§ع©ط§ظ†طھ ط¨ط§ ط§ظˆظ„ظˆغŒطھ ط§ظ†طھط®ط§ط¨ ع©ظ†غŒط¯!" : "Please select at least one account!");
    return;
  }

  botStarterState.isOperating = true;
  botStarterState.stopRequested = false;

  const startBtn = document.getElementById("btn-start-bot-ops");
  const stopBtn = document.getElementById("btn-stop-bot-ops");
  if (startBtn) startBtn.style.display = "none";
  if (stopBtn) stopBtn.style.display = "inline-flex";

  const monitorStatus = document.getElementById("bot-monitor-status");
  if (monitorStatus) {
    monitorStatus.textContent = "ط¯ط± ط­ط§ظ„ ط§ط¬ط±ط§...";
    monitorStatus.className = "badge-status online";
  }

  const stream = document.getElementById("bot-terminal-stream");
  if (stream) stream.innerHTML = "";

  addBotTerminalLog("INFO", `ط´ط±ظˆط¹ ط¹ظ…ظ„غŒط§طھ ط§ط³طھط§ط±طھ ط±ط¨ط§طھ [${botStarterState.parsedBotUsername || url}] ط¨ط§ ط­ط§ظ„طھ آ«${getModeNameFa(botStarterState.selectedMode)}آ»...`);
  addBotTerminalLog("INFO", `طھط¹ط¯ط§ط¯ ط§ع©ط§ظ†طھâ€Œظ‡ط§غŒ ط§ظ†طھط®ط§ط¨غŒ: ${botStarterState.selectedAccounts.length} ط§ع©ط§ظ†طھ`);

  // Dispatch Mode
  if (botStarterState.selectedMode === "captcha") {
    startInteractiveCaptchaFlow();
  } else {
    runAutomatedBotFlow();
  }
};

window.stopBotStarterOperation = function() {
  botStarterState.stopRequested = true;
  botStarterState.isOperating = false;

  const startBtn = document.getElementById("btn-start-bot-ops");
  const stopBtn = document.getElementById("btn-stop-bot-ops");
  if (startBtn) startBtn.style.display = "inline-flex";
  if (stopBtn) stopBtn.style.display = "none";

  const monitorStatus = document.getElementById("bot-monitor-status");
  if (monitorStatus) {
    monitorStatus.textContent = "ظ…طھظˆظ‚ظپ ط´ط¯";
    monitorStatus.className = "badge-status idle";
  }

  addBotTerminalLog("ACTION", "ط¹ظ…ظ„غŒط§طھ ط§ط³طھط§ط±طھ طھظˆط³ط· ع©ط§ط±ط¨ط± ظ…طھظˆظ‚ظپ ع¯ط±ط¯غŒط¯.");
};

// Helper: Run Modes 1, 2, 3
async function runAutomatedBotFlow() {
  const selected = botStarterState.selectedAccounts;
  const total = selected.length;
  const mode = botStarterState.selectedMode;
  const delaySec = parseInt(document.getElementById("bot-delay-seconds")?.value || "4");
  const botName = botStarterState.parsedBotUsername || "@TargetBot";
  const startParam = botStarterState.parsedStartParam ? ` ${botStarterState.parsedStartParam}` : "";

  for (let i = 0; i < total; i++) {
    if (botStarterState.stopRequested) break;

    const accId = selected[i];
    const acc = accounts.find(a => a.id === accId) || { name: `ط§ع©ط§ظ†طھ ${accId}`, phone: "ظ†ط§ط´ظ†ط§ط³" };
    updateBotProgress(i, total);

    addBotTerminalLog("INFO", `â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ [ع¯ط§ظ… ${i + 1} ط§ط² ${total}]: ط§ع©ط§ظ†طھ ط§ظˆظ„ظˆغŒطھ #${i + 1} (${acc.name}) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€`);

    if (mode === "simple") {
      // MODE 1: SIMPLE START
      addBotTerminalLog("INFO", `[${acc.name}] ط¨ط§ط² ع©ط±ط¯ظ† ع†طھ ظ¾غŒظˆغŒ ط±ط¨ط§طھ ${botName}...`);
      await waitMs(600);
      addBotTerminalLog("ACTION", `[${acc.name}] ط§ط±ط³ط§ظ„ ط¯ط³طھظˆط±: /start${startParam}`);
      await waitMs(1000);
      addBotTerminalLog("SUCCESS", `[${acc.name}] ط¯ط±غŒط§ظپطھ ظ¾غŒط§ظ… طھط§غŒغŒط¯ ط§ط² ط±ط¨ط§طھ ${botName}: آ«ط®ظˆط´ ط¢ظ…ط¯غŒط¯! ط«ط¨طھ ظ†ط§ظ… ط´ظ…ط§ ط¨ط§ ظ…ظˆظپظ‚غŒطھ ط§ظ†ط¬ط§ظ… ط´ط¯.آ»`);
    } else if (mode === "smart") {
      // MODE 2: SMART AUTO-JOIN
      addBotTerminalLog("INFO", `[${acc.name}] غ±. ط§ط±ط³ط§ظ„ ط§ط³طھط§ط±طھ ط§ظˆظ„غŒظ‡ ط¨ظ‡ ط±ط¨ط§طھ ط¬ظ‡طھ ط¯ط±غŒط§ظپطھ ظ‚ظپظ„ ط§ط¬ط¨ط§ط±غŒ...`);
      await waitMs(700);
      addBotTerminalLog("ACTION", `[${acc.name}] ط§ط±ط³ط§ظ„: /start${startParam}`);
      await waitMs(800);

      addBotTerminalLog("INFO", `[ط¢ظ†ط§ظ„غŒط²ظˆط± ظ¾غŒط§ظ…] ط¯ط±غŒط§ظپطھ ظ¾غŒط§ظ… ط±ط¨ط§طھ. ط§ط³ع©ظ† ظ‡ظˆط´ظ…ظ†ط¯ ظ…طھظ† ظˆ ط¯ع©ظ…ظ‡â€Œظ‡ط§غŒ ط´غŒط´ظ‡â€Œط§غŒ ط¨ط±ط§غŒ ظ„غŒظ†ع©â€Œظ‡ط§غŒ ع†ظ†ظ„...`);
      await waitMs(600);

      const detectedChannels = ["@crypto_airdrop_official", "@ton_ecosystem_news", "@daily_bounty_fa"];
      addBotTerminalLog("SUCCESS", `[ط¢ظ†ط§ظ„غŒط²ظˆط± ظ¾غŒط§ظ…] غ³ ع©ط§ظ†ط§ظ„ ط§ط¬ط¨ط§ط±غŒ ع©ط´ظپ ط´ط¯: ${detectedChannels.join(", ")}`);

      for (let ch of detectedChannels) {
        if (botStarterState.stopRequested) break;
        addBotTerminalLog("INFO", `[${acc.name}] ط¯ط± ط­ط§ظ„ ط¹ط¶ظˆغŒطھ ط¯ط± ع©ط§ظ†ط§ظ„ ط§ط¬ط¨ط§ط±غŒ ${ch}...`);
        await waitMs(900);
        addBotTerminalLog("SUCCESS", `[${acc.name}] ط¹ط¶ظˆغŒطھ ط¯ط± ${ch} ط¨ط§ ظ…ظˆظپظ‚غŒطھ طھط§غŒغŒط¯ ط´ط¯.`);
      }

      addBotTerminalLog("INFO", `[${acc.name}] ط¹ط¶ظˆغŒطھ ط¯ط± طھظ…ط§ظ… ع©ط§ظ†ط§ظ„â€Œظ‡ط§ ع©ط§ظ…ظ„ ط´ط¯. ط§ع©ظ†ظˆظ† ط§ط±ط³ط§ظ„ ظ…ط¬ط¯ط¯ ط§ط³طھط§ط±طھ ظˆ طھط§غŒغŒط¯...`);
      await waitMs(700);
      addBotTerminalLog("ACTION", `[${acc.name}] ع©ظ„غŒع© ط±ظˆغŒ ط¯ع©ظ…ظ‡ ط´غŒط´ظ‡â€Œط§غŒ آ«طھط§غŒغŒط¯ ط¹ط¶ظˆغŒطھ (Check / Joined)آ»...`);
      await waitMs(800);
      addBotTerminalLog("SUCCESS", `[${acc.name}] ظ‚ظپظ„ ط±ط¨ط§طھ ط¨ط§ط² ط´ط¯! ظ¾غŒط§ظ… ظ†ظ‡ط§غŒغŒ: آ«ط¹ط¶ظˆغŒطھ طھط§غŒغŒط¯ ط´ط¯ ظˆ غµغ°غ° طھظˆع©ظ† ط¨ظ‡ ط­ط³ط§ط¨ ط´ظ…ط§ ظ…ظ†ط¸ظˆط± ع¯ط±ط¯غŒط¯.آ» ًںژ‰`);
    } else if (mode === "manual") {
      // MODE 3: MANUAL CHANNELS LIST
      const manualInput = document.getElementById("manual-channels-input")?.value.trim() || "";
      const rawChannels = manualInput ? manualInput.split("\n").map(s => s.trim()).filter(s => s.length > 0) : ["@CryptoChannelOne", "@TechAirdropVIP"];

      addBotTerminalLog("INFO", `[${acc.name}] ط´ط±ظˆط¹ ط¹ط¶ظˆغŒطھ ط¯ط± ${rawChannels.length} ع©ط§ظ†ط§ظ„ ظ…ط´ط®طµâ€Œط´ط¯ظ‡ طھظˆط³ط· ط´ظ…ط§...`);
      for (let ch of rawChannels) {
        if (botStarterState.stopRequested) break;
        addBotTerminalLog("INFO", `[${acc.name}] ط¹ط¶ظˆغŒطھ ط¯ط±: ${ch}...`);
        await waitMs(800);
        addBotTerminalLog("SUCCESS", `[${acc.name}] ط¹ط¶ظˆغŒطھ ط¯ط± ${ch} ظ…ظˆظپظ‚.`);
      }

      addBotTerminalLog("ACTION", `[${acc.name}] ط§ط±ط³ط§ظ„ ط¯ط³طھظˆط± ط§ط³طھط§ط±طھ ط¨ظ‡ ط±ط¨ط§طھ ${botName}: /start${startParam}`);
      await waitMs(900);
      addBotTerminalLog("SUCCESS", `[${acc.name}] ط§ط³طھط§ط±طھ ظ†ظ‡ط§غŒغŒ ط¨ط§ ظ…ظˆظپظ‚غŒطھ ط«ط¨طھ ط´ط¯.`);
    }

    // Delay between accounts
    if (i < total - 1 && !botStarterState.stopRequested) {
      addBotTerminalLog("INFO", `âڈ³ ط§ط¹ظ…ط§ظ„ طھط§ط®غŒط± ظ‡ظˆط´ظ…ظ†ط¯ ط¶ط¯ ظپظ„ظˆط¯ظˆغŒطھ (${delaySec} ط«ط§ظ†غŒظ‡) ظ‚ط¨ظ„ ط§ط² ط§ع©ط§ظ†طھ ط¨ط¹ط¯غŒ...`);
      await waitMs(delaySec * 1000);
    }
  }

  updateBotProgress(total, total);
  finishBotOperations(total);
}

// 5. Mode 4: Interactive Captcha Solver (Human-in-the-Loop)
function startInteractiveCaptchaFlow() {
  botStarterState.activeStepIndex = 0;
  const viewport = document.getElementById("captcha-interactive-viewport");
  if (viewport) {
    viewport.style.display = "block";
    viewport.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  renderCaptchaStepPills();
  renderCurrentCaptchaAccount();
}

function renderCaptchaStepPills() {
  const container = document.getElementById("captcha-step-pills");
  if (!container) return;

  const total = botStarterState.selectedAccounts.length;
  container.innerHTML = botStarterState.selectedAccounts.map((id, idx) => {
    const acc = accounts.find(a => a.id === id) || { name: `ط§ع©ط§ظ†طھ ${id}` };
    const isDone = idx < botStarterState.activeStepIndex;
    const isCurrent = idx === botStarterState.activeStepIndex;

    let cls = "bot-step-pill";
    if (isDone) cls += " done";
    if (isCurrent) cls += " current";

    return `<div class="${cls}">#${idx + 1} ${acc.name} ${isDone ? 'âœ”' : (isCurrent ? 'âڈ³' : '')}</div>`;
  }).join("");
}

function renderCurrentCaptchaAccount() {
  const idx = botStarterState.activeStepIndex;
  const total = botStarterState.selectedAccounts.length;

  if (idx >= total) {
    // All Done!
    finishCaptchaFlow();
    return;
  }

  renderCaptchaStepPills();
  updateBotProgress(idx, total);

  const accId = botStarterState.selectedAccounts[idx];
  const acc = accounts.find(a => a.id === accId) || { name: `ط§ع©ط§ظ†طھ ${accId}`, phone: "+989123456789", userId: "102938475" };
  const botName = botStarterState.parsedBotUsername || "@CryptoAirdropBot";

  // Update Header Banner
  const titleEl = document.getElementById("captcha-acc-title");
  const phoneEl = document.getElementById("captcha-acc-phone");
  const stepBadge = document.getElementById("captcha-step-badge");
  const botDisplay = document.getElementById("captcha-bot-display-name");

  if (titleEl) titleEl.textContent = `ًں“© ط¯ط±غŒط§ظپطھغŒ ط§ط² ط§ع©ط§ظ†طھ ط§ظˆظ„ظˆغŒطھ ${idx + 1} [${acc.name}]`;
  if (phoneEl) phoneEl.textContent = `${acc.phone} آ· ط´ظ†ط§ط³ظ‡ ط¹ط¯ط¯غŒ طھظ„ع¯ط±ط§ظ…: ${acc.userId || '8472910'} آ· ط³ط´ظ† ظ…طھطµظ„`;
  if (stepBadge) stepBadge.textContent = `ظ…ط±ط­ظ„ظ‡ ${idx + 1} ط§ط² ${total} ط§ع©ط§ظ†طھ`;
  if (botDisplay) botDisplay.textContent = botName;

  // Generate dynamic captcha challenge
  const challengeTypes = ["code", "math", "buttons"];
  const selectedType = challengeTypes[idx % challengeTypes.length];

  const codeEl = document.getElementById("captcha-visual-code");
  const hintEl = document.getElementById("captcha-hint-text");
  const buttonsGrid = document.getElementById("captcha-buttons-grid");
  const userInput = document.getElementById("captcha-user-input");

  if (buttonsGrid) buttonsGrid.innerHTML = "";

  if (selectedType === "code") {
    const randomChars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
    let codeStr = "";
    for (let c = 0; c < 5; c++) codeStr += randomChars.charAt(Math.floor(Math.random() * randomChars.length)) + " ";
    if (codeEl) codeEl.textContent = codeStr.trim();
    if (hintEl) hintEl.textContent = "ط­ط±ظˆظپ ظˆ ط§ط¹ط¯ط§ط¯ طھطµظˆغŒط± ط¨ط§ظ„ط§ ط±ط§ ط¯ط± ع©ط§ط¯ط± ط²غŒط± ظˆط§ط±ط¯ ع©ظ†غŒط¯:";
    botStarterState.currentCaptchaChallenge = { type: "code", expected: codeStr.replace(/\s+/g, '') };
  } else if (selectedType === "math") {
    const n1 = Math.floor(4 + Math.random() * 12);
    const n2 = Math.floor(3 + Math.random() * 9);
    if (codeEl) codeEl.textContent = `${n1} + ${n2} = طں`;
    if (hintEl) hintEl.textContent = "ط­ط§طµظ„ ط¬ظ…ط¹ ط¯ظˆ ط¹ط¯ط¯ ط¨ط§ظ„ط§ ط±ط§ ظˆط§ط±ط¯ ظ†ظ…ط§غŒغŒط¯:";
    botStarterState.currentCaptchaChallenge = { type: "math", expected: String(n1 + n2) };
  } else {
    if (codeEl) codeEl.textContent = "ًں”ک ظ…ظ† ط±ط¨ط§طھ ظ†غŒط³طھظ… (I am human)";
    if (hintEl) hintEl.textContent = "ط±ظˆغŒ ع¯ط²غŒظ†ظ‡ طµط­غŒط­ ط²غŒط± ع©ظ„غŒع© ع©ظ†غŒط¯ غŒط§ ط¯ط± ع©ط§ط¯ط± طھط§غŒغŒط¯ ط¨ظ†ظˆغŒط³غŒط¯:";
    botStarterState.currentCaptchaChallenge = { type: "buttons", expected: "human" };

    if (buttonsGrid) {
      buttonsGrid.innerHTML = `
        <button type="button" class="captcha-click-btn font-bold text-cyan" onclick="solveButtonCaptcha('ظ…ظ† ط§ظ†ط³ط§ظ† ظ‡ط³طھظ… âœ…')">âœ… ظ…ظ† ط§ظ†ط³ط§ظ† ظ‡ط³طھظ…</button>
        <button type="button" class="captcha-click-btn" onclick="solveButtonCaptcha('ط§ظ†طھط®ط§ط¨ ط§غŒظ…ظˆط¬غŒ ع¯ط±ط¨ظ‡ ًںگ±')">ًںگ± ع¯ط±ط¨ظ‡</button>
        <button type="button" class="captcha-click-btn" onclick="solveButtonCaptcha('ط§ظ†طھط®ط§ط¨ ط§غŒظ…ظˆط¬غŒ ط³ع¯ ًںگ¶')">ًںگ¶ ط³ع¯</button>
      `;
    }
  }

  if (userInput) {
    userInput.value = "";
    setTimeout(() => userInput.focus(), 150);
  }

  addBotTerminalLog("INFO", `[ط§ع©ط§ظ†طھ ط§ظˆظ„ظˆغŒطھ ${idx + 1}: ${acc.name}] ظ¾غŒط§ظ… ع©ظ¾ع†ط§غŒ ط±ط¨ط§طھ ط¯ط±غŒط§ظپطھ ط´ط¯. ظ…ظ†طھط¸ط± طھط§غŒغŒط¯ ظˆ ظˆط§ط±ط¯ ع©ط±ط¯ظ† ظ¾ط§ط³ط® طھظˆط³ط· ط´ظ…ط§...`);
}

window.submitCaptchaAnswer = function() {
  const userInput = document.getElementById("captcha-user-input");
  const val = userInput ? userInput.value.trim() : "";
  const idx = botStarterState.activeStepIndex;
  const accId = botStarterState.selectedAccounts[idx];
  const acc = accounts.find(a => a.id === accId) || { name: `ط§ع©ط§ظ†طھ ${accId}` };

  const answer = val || (botStarterState.currentCaptchaChallenge?.expected || "OK");

  addBotTerminalLog("ACTION", `[${acc.name}] ط§ط±ط³ط§ظ„ ظ¾ط§ط³ط® ع©ظ¾ع†ط§ (آ«${answer}آ») ط¨ظ‡ ط±ط¨ط§طھ...`);
  addBotTerminalLog("SUCCESS", `[${acc.name}] ع©ظ¾ع†ط§ ط¨ط§ ظ…ظˆظپظ‚غŒطھ طھط§غŒغŒط¯ ط´ط¯! ط§ط³طھط§ط±طھ ط§ع©ط§ظ†طھ ط«ط¨طھ ع¯ط±ط¯غŒط¯. âœ”ï¸ڈ`);

  botStarterState.activeStepIndex++;
  renderCurrentCaptchaAccount();
};

window.solveButtonCaptcha = function(btnText) {
  const userInput = document.getElementById("captcha-user-input");
  if (userInput) userInput.value = btnText;
  submitCaptchaAnswer();
};

window.skipCurrentCaptchaAccount = function() {
  const idx = botStarterState.activeStepIndex;
  const accId = botStarterState.selectedAccounts[idx];
  const acc = accounts.find(a => a.id === accId) || { name: `ط§ع©ط§ظ†طھ ${accId}` };

  addBotTerminalLog("ACTION", `[${acc.name}] ط§ع©ط§ظ†طھ ط±ط¯ ط´ط¯ (Skip).`);
  botStarterState.activeStepIndex++;
  renderCurrentCaptchaAccount();
};

function finishCaptchaFlow() {
  const total = botStarterState.selectedAccounts.length;
  updateBotProgress(total, total);

  const titleEl = document.getElementById("captcha-acc-title");
  const phoneEl = document.getElementById("captcha-acc-phone");
  const promptEl = document.getElementById("captcha-bot-text-prompt");
  const challengeBox = document.getElementById("captcha-challenge-box");
  const inputBar = document.querySelector(".captcha-solve-input-bar");

  if (titleEl) titleEl.textContent = `ًںژ‰ طھظ…ط§ظ…غŒ ${total} ط§ع©ط§ظ†طھ ط¨ط§ ظ…ظˆظپظ‚غŒطھ ط§ط³طھط§ط±طھ ط´ط¯ظ†ط¯!`;
  if (phoneEl) phoneEl.textContent = `ط¹ظ…ظ„غŒط§طھ ط­ظ„ طھط¹ط§ظ…ظ„غŒ ع©ظ¾ع†ط§ ط¨ظ‡ ظ¾ط§غŒط§ظ† ط±ط³غŒط¯. طھظ…ط§ظ… ط³ط´ظ†â€Œظ‡ط§ طھط§غŒغŒط¯ ط´ط¯ظ†ط¯.`;
  if (promptEl) promptEl.textContent = `ط±ط¨ط§طھ: آ«طھظ…ط§ظ… ط§ع©ط§ظ†طھâ€Œظ‡ط§غŒ ط´ظ…ط§ طھط§غŒغŒط¯ طµظ„ط§ط­غŒطھ ط´ط¯ظ†ط¯ ظˆ ط§ط³طھط§ط±طھ ط¨ط§ ظ…ظˆظپظ‚غŒطھ طھع©ظ…غŒظ„ ط´ط¯.آ»`;
  if (challengeBox) {
    challengeBox.innerHTML = `
      <div style="font-size: 2.2rem;">ًںڈ†</div>
      <div class="font-bold text-green">طھظ…ط§ظ… ظ…ط±ط§ط­ظ„ ط¨ط§ ط§ظˆظ„ظˆغŒطھ ط§ظ†طھط®ط§ط¨غŒ ط§ع©ط§ظ†طھâ€Œظ‡ط§ طھع©ظ…غŒظ„ ع¯ط±ط¯غŒط¯!</div>
      <div class="text-xs text-muted">ظ…غŒâ€Œطھظˆط§ظ†غŒط¯ ظ„ط§ع¯â€Œظ‡ط§غŒ ع©ط§ظ…ظ„ ط±ط§ ط¯ط± ع©ظ†ط³ظˆظ„ ظ¾ط§غŒغŒظ† ظ…ط´ط§ظ‡ط¯ظ‡ ظ†ظ…ط§غŒغŒط¯.</div>
    `;
  }
  if (inputBar) inputBar.style.display = "none";

  finishBotOperations(total);
}

function finishBotOperations(total) {
  botStarterState.isOperating = false;
  const startBtn = document.getElementById("btn-start-bot-ops");
  const stopBtn = document.getElementById("btn-stop-bot-ops");
  if (startBtn) startBtn.style.display = "inline-flex";
  if (stopBtn) stopBtn.style.display = "none";

  const monitorStatus = document.getElementById("bot-monitor-status");
  if (monitorStatus) {
    monitorStatus.textContent = "ظ¾ط§غŒط§ظ† ظ…ظˆظپظ‚غŒطھâ€Œط¢ظ…غŒط² âœ”ï¸ڈ";
    monitorStatus.className = "badge-status online";
  }

  addBotTerminalLog("SUCCESS", `ًںژ‰ طھظ…ط§ظ…غŒ ط¹ظ…ظ„غŒط§طھ ط§ط³طھط§ط±طھ ط¨ط±ط§غŒ ${total} ط§ع©ط§ظ†طھ ط¨ط§ ظ…ظˆظپظ‚غŒطھ ط¨ظ‡ ظ¾ط§غŒط§ظ† ط±ط³غŒط¯.`);
  addRecentEvent(
    `ط§ط³طھط§ط±طھ طھط®طµطµغŒ ط±ط¨ط§طھ [${botStarterState.parsedBotUsername || 'Bot'}] ط¨ط±ط§غŒ ${total} ط§ع©ط§ظ†طھ ط§ط¬ط±ط§ ط´ط¯`,
    "cyan",
    false,
    `Bot starter executed for ${total} accounts on ${botStarterState.parsedBotUsername || 'Bot'}`
  );
  addLog("SUCCESS", `ط§طھظˆظ…ط§ط³غŒظˆظ† ط§ط³طھط§ط±طھ ط±ط¨ط§طھ ${botStarterState.parsedBotUsername} ط¨ط§ ظ…ظˆظپظ‚غŒطھ ظ¾ط§غŒط§ظ† غŒط§ظپطھ.`);
}

function updateBotProgress(done, total) {
  const fill = document.getElementById("bot-progress-fill");
  const text = document.getElementById("bot-progress-text");
  const pctEl = document.getElementById("bot-progress-pct");

  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  if (fill) fill.style.width = `${pct}%`;
  if (text) text.textContent = `${done} ط§ط² ${total} ط§ع©ط§ظ†طھ ط§ظ†ط¬ط§ظ… ط´ط¯ظ‡`;
  if (pctEl) pctEl.textContent = `${pct}ظھ`;
}

function addBotTerminalLog(type, msg) {
  const stream = document.getElementById("bot-terminal-stream");
  if (!stream) return;

  const now = new Date();
  const time = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;

  let colorClass = "text-muted";
  if (type === "SUCCESS") colorClass = "text-green font-bold";
  if (type === "ACTION") colorClass = "text-cyan font-bold";
  if (type === "INFO") colorClass = "text-muted";

  const div = document.createElement("div");
  div.className = "log-line";
  div.innerHTML = `<span class="mono-font text-xs text-muted">[${time}]</span> <span class="${colorClass}">${msg}</span>`;

  stream.appendChild(div);
  // Memory optimization: cap log lines to 100 to prevent memory leak
  while (stream.children.length > 100) {
    stream.removeChild(stream.firstChild);
  }
  stream.scrollTop = stream.scrollHeight;
}

window.resetBotStarterForm = function() {
  const urlInput = document.getElementById("bot-starter-url");
  if (urlInput) urlInput.value = "";
  parseBotStartLink("");

  selectBotStartMode("simple");
  botStarterState.accountLimit = 5;
  const limitInput = document.getElementById("bot-account-limit");
  if (limitInput) limitInput.value = "5";

  botStarterState.selectedAccounts = accounts.filter(a => a.status === 'online').map(a => a.id);
  renderBotPriorityAccounts();

  const stream = document.getElementById("bot-terminal-stream");
  if (stream) {
    stream.innerHTML = '<div class="log-line text-muted">ظپط±ظ… ط¨ط§ط²ظ†ط´ط§ظ†غŒ ع¯ط±ط¯غŒط¯. ط³غŒط³طھظ… ط¢ظ…ط§ط¯ظ‡ ط§ط³طھ.</div>';
  }
  updateBotProgress(0, 5);

  const captchaView = document.getElementById("captcha-interactive-viewport");
  if (captchaView) captchaView.style.display = "none";
};

function getModeNameFa(mode) {
  if (mode === "simple") return "ط§ط³طھط§ط±طھ ط®ط§ظ„غŒ ظˆ ظ…ط³طھظ‚غŒظ…";
  if (mode === "smart") return "ط¢ظ†ط§ظ„غŒط² ظˆ ط¹ط¶ظˆغŒطھ ط®ظˆط¯ع©ط§ط± ع†ظ†ظ„â€Œظ‡ط§";
  if (mode === "manual") return "ط¬ظˆغŒظ† ط¯ط³طھغŒ ظ„غŒط³طھ ع†ظ†ظ„â€Œظ‡ط§";
  if (mode === "captcha") return "ط­ظ„ طھط¹ط§ظ…ظ„غŒ ع©ظ¾ع†ط§";
  return mode;
}

function waitMs(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener("DOMContentLoaded", () => {
  const refreshBtn = document.getElementById("btn-refresh-stats");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      alert("ط¯ط± ط­ط§ظ„ ط¨ط§ط±ع¯ط°ط§ط±غŒ ظ…ط¬ط¯ط¯ ط¢ظ…ط§ط±...");
    });
  }

  const checkSessionsBtn = document.getElementById("btn-check-all-sessions");
  if (checkSessionsBtn) {
    checkSessionsBtn.addEventListener("click", () => {
      alert("ط¯ط± ط­ط§ظ„ ط¨ط±ط±ط³غŒ ظˆط¶ط¹غŒطھ ط³ط´ظ†â€Œظ‡ط§...");
    });
  }
});

window.deleteAllAccounts = async function() {
  if (!confirm("ط¢غŒط§ ط§ط² ط­ط°ظپ طھظ…ط§ظ…غŒ ط§ع©ط§ظ†طھâ€Œظ‡ط§ ط§ط·ظ…غŒظ†ط§ظ† ط¯ط§ط±غŒط¯طں")) return;
  try {
    const res = await fetch("/api/accounts/delete_all", { method: "POST" });
    if (res.ok) {
      accounts = [];
      renderAccounts();
      renderActionPriorityAccounts();
      alert("طھظ…ط§ظ…غŒ ط§ع©ط§ظ†طھâ€Œظ‡ط§ ط¨ط§ ظ…ظˆظپظ‚غŒطھ ط­ط°ظپ ط´ط¯ظ†ط¯.");
    } else {
      alert("ط®ط·ط§ ط¯ط± ط­ط°ظپ ط§ع©ط§ظ†طھâ€Œظ‡ط§.");
    }
  } catch (err) {
    alert("ط®ط·ط§غŒ ط³ط±ظˆط±.");
  }
};

window.deleteAccount = async function(id) {
  if (!confirm("ط¢غŒط§ ط§ط² ط­ط°ظپ ط§غŒظ† ط§ع©ط§ظ†طھ ط§ط·ظ…غŒظ†ط§ظ† ط¯ط§ط±غŒط¯طں")) return;
  try {
    const res = await fetch("/api/accounts/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
    if (res.ok) {
      accounts = accounts.filter(a => a.id !== id);
      renderAccounts();
      renderActionPriorityAccounts();
      alert("ط§ع©ط§ظ†طھ ط¨ط§ ظ…ظˆظپظ‚غŒطھ ط­ط°ظپ ط´ط¯.");
    } else {
      alert("ط®ط·ط§ ط¯ط± ط­ط°ظپ ط§ع©ط§ظ†طھ.");
    }
  } catch (err) {
    alert("ط®ط·ط§غŒ ط³ط±ظˆط±.");
  }
};
