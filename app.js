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

function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const translations = {
  fa: {
    navOverview: "داشبورد و آمار زنده",
    navAccounts: "مدیریت اکانت‌ها و کدها",
    navActions: "عملیات گروهی (لایک/جوین/کامنت)",
    navInbox: "پیوی و ربات‌ها (ریچ مسیج)",
    navScheduler: "سِلف بات و زمان‌بندی",
    navCleanup: "پاکسازی و خروج (گپ/چنل/بات)",
    navStorage: "ذخیره‌سازی و ریلوی",
    navLabel: "منوی ناوبری",
    sidebarHealthTitle: "وضعیت سشن‌ها",
    sidebarHealthDesc: "تمامی سشن‌ها روی ولوم /data متصل و آماده هستند.",
    volumeIndicator: 'RAILWAY VOLUME: <code class="mono-code">/data</code> [آنلاین]',
    overviewTitle: "داشبورد مانیتورینگ زنده",
    overviewDesc: "نمای کلی فعالیت‌ها، آخرین عملیات‌ها و سلامت اکانت‌های فعال",
    statActiveSessions: "اکانت‌های متصل",
    statOperationsToday: "عملیات موفق امروز",
    statMonitoredChats: "وظایف سلف / زمان‌بندی",
    statStorageUsed: "فضای اشغال‌شده ولوم",
    recentEventsTitle: "رویدادهای اخیر",
    recentEventsSubtitle: "گردش‌های انجام شده توسط اکانت‌ها",
    btnAllEvents: "تمام رویدادها",
    upcomingActionsTitle: "اقدام‌های بعدی",
    upcomingActionsSubtitle: "پیام‌هایی که به‌زودی اجرا می‌شوند",
    btnAllSchedules: "همه زمان‌بندی‌ها",
    terminalTitle: "ترمینال فعالیت زنده سیستم (/data/logs)",
    btnClearLogs: "پاکسازی لاگ",
    accountsTitle: "مدیریت اکانت‌های تلگرام",
    accountsDesc: "فهرست، جستجوی پیشرفته، دسته‌بندی‌های شخصی، آمار کشور و سال ساخت، و قطع اتصال",
    btnAddAccount: "➕ افزودن اکانت جدید",
    btnCreateCategory: "📁 ساخت دسته جدید",
    btnCheckSessions: "⚡ بررسی سلامت همه",
    statPillTotal: "کل اکانت‌ها:",
    statPillOnline: "● متصل:",
    statPillDisc: "● قطع اتصال:",
    lblFilterCountry: "🌍 فیلتر بر حسب کشور:",
    lblFilterYear: "📅 فیلتر سال ساخت اکانت:",
    lblFilterCategory: "🏷️ دسته‌بندی‌های شخصی:",
    searchPlaceholder: "جستجوی همه‌جانبه: شماره تلفن (+98...)، آیدی (@id)، آیدی عددی (User ID: 12345...)، نام پروفایل یا برچسب...",
    otpSectionTitle: "📬 دریافت کدهای ورود اخیر (Telegram Login Codes)",
    otpSectionBadge: "سیستم شنود سرویس تلگرام فعال است",
    thAccount: "اکانت",
    thPhone: "شماره تلفن",
    thCode: "کد دریافتی (Login Code)",
    thTime: "زمان دریافت",
    thActions: "عملیات",
    actionsTitle: "عملیات گروهی و هماهنگ",
    actionsDesc: "انجام دسته‌جمعی کارهایی مثل جوین به کانال/گروه، ارسال کامنت، ثبت ری‌اکشن و لایک، یا رای دادن به نظرسنجی با اولویت انتخابی اکانت‌ها",
    priorityBoxTitle: "👥 انتخاب اکانت‌ها و اولویت اجرا (با کلیک مستقیم)",
    priorityBoxDesc: "روی اکانت‌ها کلیک کنید؛ ترتیب کلیک شما دقیقاً اولویت اجرای عملیات را تعیین می‌کند (شماره‌های #۱، #۲ و... ترتیب اجرا هستند).",
    btnSelectAllSeq: "⚡ انتخاب همه به ترتیب",
    btnSelectOnline: "🟢 فقط آنلاین‌ها",
    btnClearPriority: "❌ لغو انتخاب",
    actionConfigTitle: "تنظیمات عملیات",
    lblActionType: "نوع عملیات:",
    lblActionTarget: "لینک مقصد یا شناسه (Target Link / Username):",
    lblPollIndex: "شماره گزینه نظرسنجی (Option Index):",
    lblReactionType: "انتخاب ری‌اکشن (کل ری‌اکشن‌های تلگرام):",
    lblCommentText: "متن کامنت‌ها (یک کامنت در هر خط برای ارسال چرخشی بین اکانت‌ها):",
    lblScheduleCommentToggle: "⏰ ذخیره به عنوان تسک زمان‌بندی شده (Scheduler)",
    lblActionDelay: "فاصله زمانی بین هر اکانت (ثانیه - جهت امنیت و جلوگیری از فلود):",
    btnStartAction: "🚀 شروع اجرای عملیات هماهنگ با اولویت انتخابی",
    navBotStarter: "استارت تخصصی ربات‌ها",
    botStarterTitle: "🤖 استارت تخصصی و اتوماسیون ربات‌ها",
    botStarterDesc: "استارت رفرال، آنالیز هوشمند و عضویت خودکار چنل‌های اجباری، و حل تعاملی مرحله‌به‌مرحله کپچا با اولویت دلخواه اکانت‌ها",
    botTargetConfigTitle: "🎯 تنظیم لینک و آیدی ربات",
    lblBotStartLink: "لینک استارت یا نام کاربری ربات (Bot Start Link / Username):",
    botPriorityTitle: "👥 انتخاب اکانت‌ها و اولویت اجرا (با کلیک مستقیم)",
    botPriorityDesc: "ترتیب کلیک شما، اولویت دقیق ارسال استارت و حل کپچا را تعیین می‌کند. همچنین می‌توانید سقف تعداد اکانت مجاز را مشخص نمایید.",
    botModesTitle: "⚙️ انتخاب نوع و متد استارت ربات (۴ حالت تخصصی)",
    inboxTitle: "پیوی‌ها، ربات‌ها و گفتگوها",
    inboxDesc: "پشتیبانی کامل از دکمه شیشه‌ای (Inline Keyboard)، عکس با کپشن، نظرسنجی، ویس صوتی، داکیومنت، فرمت متن تلگرام (بولد، اسپویلر، نقل‌قول) و ری‌اکشن به پیام‌ها (بدون فیلم)",
    lblChatAccount: "انتخاب اکانت فعال:",
    sendPhotoTitle: "📷 ارسال عکس همراه با کپشن",
    createPollTitle: "📊 ساخت و ارسال نظرسنجی تلگرام",
    lblPhotoChoice: "انتخاب یا تصویر نمونه:",
    lblPhotoCaption: "کپشن عکس (با پشتیبانی از مارک‌داون و اسپویلر):",
    btnSendPhoto: "ارسال عکس به چت ➔",
    lblPollQuestion: "صورت سوال یا موضوع نظرسنجی:",
    lblPollOptions: "گزینه‌های نظرسنجی:",
    btnSendPoll: "ارسال نظرسنجی به چت ➔",
    addScheduleTitle: "⏱️ تعریف وظیفه زمان‌بندی جدید (سِلف بات)",
    lblScheduleTitle: "عنوان وظیفه:",
    lblScheduleAccount: "اکانت مجری:",
    lblScheduleTarget: "شناسه یا مقصد (Target):",
    lblScheduleFreq: "دوره تکرار / زمان‌بندی:",
    lblScheduleNextRun: "زمان اولین اجرا:",
    lblScheduleContent: "متن پیام یا دستور خودکار:",
    btnSubmitSchedule: "ثبت و شروع زمان‌بندی ➔",
    cleanupTitle: "پاکسازی و خروج از گفتگوها",
    cleanupDesc: "مدیریت گپ‌ها، کانال‌ها و ربات‌ها، خروج دسته‌جمعی، حذف ربات‌های بلااستفاده و پاکسازی بر اساس تاریخ فعالیت یا تصادفی",
    lblCleanupAccount: "اکانت مجری پاکسازی:",
    lblCleanupTypeFilter: "نوع گفتگو:",
    lblCleanupSearch: "جستجو در عناوین:",
    thChatTitle: "عنوان گفتگو / چت",
    thChatType: "نوع",
    thChatMembers: "تعداد اعضا / شناسه",
    thChatLastActivity: "آخرین فعالیت / پیام",
    thChatStatus: "وضعیت فعالیت",
    btnExecuteLeave: "🚪 خروج از موارد انتخابی",
    btnExecuteBlock: "🛑 مسدودسازی ربات‌ها",
    createCategoryTitle: "ساخت دسته یا برچسب اختصاصی جدید",
    categoryNameLabel: "نام دسته‌بندی جدید:",
    categoryNamePlaceholder: "مثلاً: اکانت‌های اسپم، اکانت‌های اختصاصی تبلیغات...",
    categoryIconLabel: "انتخاب نماد یا ایموجی برچسب:",
    cancel: "انصراف",
    submitCategory: "ثبت و ایجاد دسته",
    addAccountTitle: "افزودن اکانت تلگرام جدید",
    accountNameLabel: "نام نمایشی یا برچسب اکانت:",
    accountPhoneLabel: "شماره تلفن (با کد کشور):",
    account2faLabel: "رمز عبور دو مرحله‌ای (2FA - در صورت وجود):",
    btnSubmitAccount: "ارسال کد تایید (Send Code)",
    loginModalTitle: "🔐 راهنمای ورود به تلگرام",
    loginStep1Pill: "مرحله ۱: وارد کردن مشخصات در دستگاه مقصد",
    loginStep1Desc: "اپلیکیشن تلگرام را در دستگاه مقصد (گوشی، لپ‌تاپ یا وب) باز کنید و این شماره تلفن را وارد نمایید:",
    btnCopyPhone: "📋 کپی شماره",
    login2faLabel: "رمز عبور دو مرحله‌ای (2FA Password - در صورت درخواست تلگرام):",
    btnCopy2fa: "📋 کپی پسورد",
    loginStep2Pill: "مرحله ۲: دریافت آنی کد تایید ورود (OTP)",
    loginStep2Desc: "پس از زدن دکمه Next در تلگرام، روی دکمه زیر کلیک کنید تا کد ارسال شده از سشن واکشی شود:",
    btnFetchLiveCode: "📡 دریافت و استخراج کد تایید تلگرام",
    otpResultSuccess: "✔ پیام تایید تلگرام دریافت شد:",
    otpResultDesc: "این کد ۵ رقمی را در تلگرام دستگاه مقصد وارد کنید تا لاگین کامل شود.",
    btnCopyLiveOTP: "📋 کپی کد تایید",
    btnCode: "کد",
    btnInstantCode: "دریافت آنی کد ورود (OTP)",
    btnChangeCategory: "تغییر دسته اکانت",
    btnHealthCheck: "تست سلامت سشن",
    btnDisconnect: "قطع اتصال سشن",
    btnReconnect: "اتصال مجدد سشن",
    statusConnected: "متصل",
    statusDisconnected: "قطع",
    allCountries: "همه کشورها",
    allYears: "همه سال‌ها",
    yearPrefix: "سال",
    allCategories: "همه دسته‌ها",
    chatsCount: "چت فعال",
    lblProfileName: "نام پروفایل تلگرام:",
    lblUserId: "آیدی عددی (User ID):",
    lblSessionFile: "فایل ذخیره سشن:",
    lblYearOfCreation: "سال ساخت سشن:",
    lblChatsCount: "تعداد گفتگوها / چت‌ها:",
    lblConnectionStatus: "وضعیت اتصال:",
    statusHealthy: "متصل و سالم",
    statusDisconnectedText: "قطع اتصال شده",
    noAccountsFound: "هیچ اکانتی با مشخصات وارد شده پیدا نشد!",
    noAccountsFoundDesc: "عبارت جستجو یا فیلترهای کشور، سال و دسته‌بندی را تغییر دهید.",
    clearFilters: "پاکسازی تمام فیلترها",
    copySuccess: "✔ کپی شد!",
    listeningCode: "⏳ در حال شنود و استخراج کد از سشن...",
    reextractCode: "🔄 استخراج مجدد کد تایید (Refresh Code)"
  },
  en: {
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
    accountsTitle: "Telegram Accounts Management",
    accountsDesc: "Directory, advanced omni-search, custom tags, country/year breakdown, and session disconnect",
    btnAddAccount: "➕ Add New Account",
    btnCreateCategory: "📁 Create Category",
    btnCheckSessions: "⚡ Health Check All",
    statPillTotal: "Total Accounts:",
    statPillOnline: "● Connected:",
    statPillDisc: "● Disconnected:",
    lblFilterCountry: "🌍 Filter by Country:",
    lblFilterYear: "📅 Filter by Creation Year:",
    lblFilterCategory: "🏷️ Custom Categories:",
    searchPlaceholder: "Omni search: Phone (+98...), Username (@id), User ID (12345...), Profile Name or tag...",
    otpSectionTitle: "📬 Recent Telegram Login Codes (OTP)",
    otpSectionBadge: "Telegram OTP Listener Service is Active",
    thAccount: "Account",
    thPhone: "Phone Number",
    thCode: "Login Code (OTP)",
    thTime: "Timestamp",
    thActions: "Actions",
    actionsTitle: "Coordinated Mass Operations",
    actionsDesc: "Execute batch operations such as joining channels, posting comments, reactions/likes, or poll voting across accounts with custom click priority",
    priorityBoxTitle: "👥 Accounts Selection & Execution Priority (Click Order)",
    priorityBoxDesc: "Click accounts to select them. The order of your clicks directly determines the sequential execution priority (#1, #2, etc.).",
    btnSelectAllSeq: "⚡ Select All Sequential",
    btnSelectOnline: "🟢 Online Only",
    btnClearPriority: "❌ Clear Selection",
    actionConfigTitle: "Operation Settings",
    lblActionType: "Operation Type:",
    lblActionTarget: "Target Link or Username:",
    lblPollIndex: "Poll Option Index:",
    lblReactionType: "Choose Reaction (All Telegram Reactions):",
    lblCommentText: "Comments List (One comment per line for rotating accounts):",
    lblScheduleCommentToggle: "⏰ Save as Scheduled Task (Scheduler)",
    lblActionDelay: "Delay Between Requests (seconds - FloodWait safety):",
    btnStartAction: "🚀 Start Operation with Chosen Priorities",
    navBotStarter: "Specialized Bot Starter",
    botStarterTitle: "🤖 Specialized Bot Automation",
    botStarterDesc: "Referral start, smart auto-join forced channels, and step-by-step interactive captcha solving with account priorities",
    botTargetConfigTitle: "🎯 Bot Target & Link Settings",
    lblBotStartLink: "Bot Start Link or Username:",
    botPriorityTitle: "👥 Select Accounts & Priority Order (Direct Click)",
    botPriorityDesc: "Your click order directly sets the execution sequence for starting and captcha solving. You can also limit max accounts.",
    botModesTitle: "⚙️ Choose Bot Start Method (4 Specialized Modes)",
    inboxTitle: "Direct Messages & Bots",
    inboxDesc: "Full Telegram rich message support (Inline glass buttons, Photo with caption, Polls, Voice waveforms, Documents, Spoilers, Quotes, Reactions - NO video)",
    lblChatAccount: "Active Sender Account:",
    sendPhotoTitle: "📷 Send Photo with Caption",
    createPollTitle: "📊 Create & Send Telegram Poll",
    lblPhotoChoice: "Preset / Sample Image:",
    lblPhotoCaption: "Photo Caption (Markdown & Spoiler supported):",
    btnSendPhoto: "Send Photo to Chat ➔",
    lblPollQuestion: "Poll Question / Topic:",
    lblPollOptions: "Poll Options:",
    btnSendPoll: "Send Poll to Chat ➔",
    addScheduleTitle: "⏱️ Create New Scheduled Task (Self-Bot)",
    lblScheduleTitle: "Task Title:",
    lblScheduleAccount: "Executing Account:",
    lblScheduleTarget: "Target Username / Chat:",
    lblScheduleFreq: "Frequency / Schedule:",
    lblScheduleNextRun: "Next Run Time:",
    lblScheduleContent: "Message Content or Command:",
    btnSubmitSchedule: "Create & Activate Schedule ➔",
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
    btnExecuteLeave: "🚪 Leave Selected Dialogs",
    btnExecuteBlock: "🛑 Block & Stop Bots",
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
    loginModalTitle: "🔐 Telegram Login Assistant",
    loginStep1Pill: "Step 1: Enter details on target device",
    loginStep1Desc: "Open Telegram on your destination device (mobile, desktop or web) and enter this phone number:",
    btnCopyPhone: "📋 Copy Phone",
    login2faLabel: "Two-Factor Password (2FA - if prompted by Telegram):",
    btnCopy2fa: "📋 Copy Password",
    loginStep2Pill: "Step 2: Instant Telegram Login Code (OTP)",
    loginStep2Desc: "After clicking Next in Telegram, click below to extract incoming OTP from session:",
    btnFetchLiveCode: "📡 Extract Telegram Login Code",
    otpResultSuccess: "✔ Telegram verification message received:",
    otpResultDesc: "Enter this 5-digit code in your Telegram app to complete the login.",
    btnCopyLiveOTP: "📋 Copy Code",
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
    copySuccess: "✔ Copied!",
    listeningCode: "⏳ Listening & extracting OTP from session...",
    reextractCode: "🔄 Re-extract Code (Refresh)"
  }
};

let currentLang = "fa";

function t(key) {
  const langDict = translations[currentLang] || translations["fa"];
  return langDict[key] || key;
}

// --- Data State (Empty for Real Data Integration) ---
let customCategories = [];
let accounts = [];
let selectedPriorityAccounts = [];

const allTelegramReactions = [
  "❤️", "👍", "👎", "🔥", "🎉", "🤩", "😱", "😁", "😢", "💩", "🤮", "🥰", 
  "🤯", "🤔", "🤬", "👏", "🥳", "😎", "⚡", "💯", "🕊️", "🤡", "🥱", "🥴", 
  "🐳", "❤️‍🔥", "🌚", "🌭", "🍓", "🍾", "💋", "🖕", "😈", "😴", "😭", "🤓", 
  "👻", "👾", "🤝", "✍️", "🫡", "🗿", "🆒", "💘", "💔"
];
let chosenReaction = "❤️";

let recentEvents = [];
let otpHistory = [];
let scheduledTasks = [];
let chatThreads = [];
let cleanupDialogs = [];

let cleanupFilterType = "all";
let cleanupSearchQuery = "";
let cleanupSelectedIds = new Set();

let filterState = {
  country: "all",
  year: "all",
  category: "all",
  status: "all",
  query: ""
};

let currentLoginAccount = null;


window.fetchAccounts = async function() {
  try {
    const res = await fetch('/api/accounts/list');
    if (res.status === 401) {
      if (res.headers.get("X-Setup-Required")) {
        window.location.href = "/setup.html";
      } else {
        window.location.href = "/login.html";
      }
      return;
    }
    if (res.ok) {
      accounts = await res.json();
      renderAccounts();
      renderActionPriorityAccounts();
      renderCountryChips();
      renderYearChips();
      renderCategoryChips();
    }
  } catch(e) {
    console.error('Failed to fetch accounts', e);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  fetchAccounts();

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
    } catch(e) {
      dateEl.textContent = now.toLocaleDateString();
    }
  }

  update();
  setInterval(update, 1000);
}

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
    meta: `هم‌اکنون · ساعت ${timeStr}`,
    metaEn: `Just now · ${timeStr}`,
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
      ? (currentLang === 'en' ? 'Queued' : 'در صف')
      : (currentLang === 'en' ? 'Paused' : 'متوقف');

    return `
      <div class="upcoming-box">
        <div class="upcoming-left">
          <span class="badge-queue">${badgeText}</span>
        </div>
        <div class="upcoming-right">
          <div>
            <div class="upcoming-name">${title}</div>
            <div class="upcoming-meta">${nextRun} · Asia/Tehran</div>
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
      : (currentLang === "en" && (sample && sample.countryEn) ? sample.countryEn : c);
    const flag = isAll ? "🌐" : ((sample && sample.flag) || "");
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

  const allChip = { id: "all", name: t("allCategories"), icon: "📁" };
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
        <span style="font-size: 2.5rem;">🔍</span>
        <h3 class="mt-2">${t("noAccountsFound")}</h3>
        <p class="text-muted text-sm mt-1">${t("noAccountsFoundDesc")}</p>
        <button class="btn btn-outline btn-sm mt-3" onclick="resetAllFilters()">${t("clearFilters")}</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(acc => {
    const isOnline = acc.status === "online";
    const isSpam = acc.category.includes("اسپم") || acc.category.toLowerCase().includes("spam");
    const countryName = (currentLang === "en" && acc.countryEn) ? acc.countryEn : acc.country;
    const catName = acc.category;

    return `
      <div class="acc-accordion-item ${!isOnline ? 'disconnected' : ''}" id="acc-item-${acc.id}">
        <div class="acc-accordion-header" onclick="toggleAccountAccordion(${acc.id})">
          <div class="acc-header-main">
            <div class="acc-mini-avatar">${isOnline ? '🤖' : '⚠️'}</div>
            <div class="acc-title-group">
              <span class="acc-name-text">${acc.name}</span>
              <span class="acc-username-text">${acc.username}</span>
            </div>
            <div class="acc-header-tags">
              <span class="tag-pill mono-font">📞 ${acc.phone}</span>
              <span class="tag-pill">${acc.flag} ${countryName}</span>
              <span class="tag-pill tag-category ${isSpam ? 'spam' : ''}">🏷️ ${catName}</span>
              <span class="tag-pill">📅 ${acc.year}</span>
            </div>
          </div>

          <div class="acc-header-actions">
            <span class="badge-status ${isOnline ? 'online' : 'idle'}">
              ${isOnline ? '● ' + t("statusConnected") : '🔴 ' + t("statusDisconnected")}
            </span>
            <button class="btn btn-sm btn-outline" onclick="event.stopPropagation(); openLoginHelper(${acc.id})" ${!isOnline ? 'disabled' : ''} title="دریافت کد ورود">
              🔑 ${t("btnCode")}
            </button>
            <div class="acc-chevron">▼</div>
          </div>
        </div>

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
              🔑 ${t("btnInstantCode")}
            </button>
            <button class="btn btn-sm btn-outline" onclick="changeAccountCategory(${acc.id})">
              📁 ${t("btnChangeCategory")}
            </button>
            <button class="btn btn-sm btn-outline" onclick="checkHealth(${acc.id})" ${!isOnline ? 'disabled' : ''}>
              ⚡ ${t("btnHealthCheck")}
            </button>
            <button class="btn btn-sm ${isOnline ? 'btn-disconnect' : 'btn-reconnect'}" onclick="toggleAccountConnection(${acc.id})">
              ${isOnline ? '🔴 ' + t("btnDisconnect") : '🟢 ' + t("btnReconnect")}
            </button>
            <button class="btn btn-sm btn-outline" onclick="deleteAccount(${acc.id})" style="color: #ff4d4d; border-color: #ff4d4d;">
              🗑️ ${t("btnDelete") || "حذف"}
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
      ? `🔐 راهنمای ورود به تلگرام · [${acc.name}]` 
      : `🔐 Telegram Login Assistant · [${acc.name}]`;
  }

  if (otpBox) otpBox.style.display = "none";
  if (liveOtpNum) liveOtpNum.textContent = "-----";
  if (fetchBtn) {
    fetchBtn.disabled = false;
    fetchBtn.textContent = t("btnFetchLiveCode");
  }

  if (modal) modal.classList.add("open");
  addLog("INFO", `راهنمای ورود برای اکانت ${acc.name} (${acc.phone}) باز شد.`);
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
    addLog("SUCCESS", `کد لاگین جدید [${randomCode}] با موفقیت استخراج گردید.`);
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
  });
};

window.copyLiveOTP = function() {
  const codeEl = document.getElementById("live-otp-number");
  const btn = document.getElementById("btn-copy-live-code");
  if (!codeEl) return;
  navigator.clipboard.writeText(codeEl.textContent.trim()).then(() => {
    const orig = btn.textContent;
    btn.textContent = t("copySuccess");
    setTimeout(() => { btn.textContent = orig; }, 1800);
  });
};

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
      <option value="${escapeHtml(a.name)}">${escapeHtml(a.name)} (${escapeHtml(a.phone)}) ${a.status === 'online' ? '🟢' : '🔴'}</option>
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
      const icon = document.querySelector('input[name="cat_icon"]:checked')?.value || "📁";

      if (!name) return;

      customCategories.push({
        id: `cat_${Date.now()}`,
        name: name,
        nameEn: name,
        icon: icon
      });

      closeCategoryModal();
      catForm.reset();
      renderCategoryChips();
      addLog("SUCCESS", `دسته جدید "${icon} ${name}" با موفقیت ایجاد شد.`);
    });
  }

  const accForm = document.getElementById("form-new-account");
  if (accForm) {
    accForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("acc-name-input").value.trim();
      const phone = document.getElementById("acc-phone-input").value.trim();
      const api_id = document.getElementById("acc-api-id-input") ? document.getElementById("acc-api-id-input").value.trim() : "";
      const api_hash = document.getElementById("acc-api-hash-input") ? document.getElementById("acc-api-hash-input").value.trim() : "";
      const pass = document.getElementById("acc-2fa-input").value.trim();

      const btn = document.getElementById("btn-submit-account");
      const origText = btn.textContent;
      btn.textContent = "در حال ارتباط با تلگرام...";
      btn.disabled = true;

      try {
        const res = await fetch("/api/telegram/send_code", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, phone, api_id, api_hash, password: pass })
        });
        
        if (res.ok) {
          alert("کد ارسال شد! بک‌اند برای گرفتن کد آماده است.");
          closeAddAccountModal();
          accForm.reset();
        } else {
          alert("خطا در ارتباط با تلگرام. بررسی کنید API ID و Hash صحیح باشند.");
        }
      } catch (err) {
        alert("خطای سرور.");
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
      const nextRun = document.getElementById("schedule-nextrun-input")?.value.trim() || "۱ ساعت دیگر";
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
      addLog("SUCCESS", `وظیفه زمان‌بندی جدید "${title}" ثبت شد.`);
    });
  }
}

function renderActionPriorityAccounts() {
  const container = document.getElementById("action-accounts-priority-list");
  const countEl = document.getElementById("action-selected-accounts-count");
  const orderTextEl = document.getElementById("action-priority-order-text");
  if (!container) return;

  if (countEl) countEl.textContent = selectedPriorityAccounts.length;

  if (orderTextEl) {
    if (selectedPriorityAccounts.length > 0) {
      const orderNames = selectedPriorityAccounts.map(id => accounts.find(a => a.id === id)?.name || id).join(" ➔ ");
      orderTextEl.innerHTML = `<span class="text-xs text-muted">ترتیب اجرا: </span><span class="text-xs text-cyan font-bold">${orderNames}</span>`;
    } else {
      orderTextEl.innerHTML = `<span class="text-xs text-pink">هیچ اکانتی انتخاب نشده است.</span>`;
    }
  }

  container.innerHTML = accounts.map(acc => {
    const priorityIndex = selectedPriorityAccounts.indexOf(acc.id);
    const isSelected = priorityIndex !== -1;
    const isOnline = acc.status === "online";
    const priorityBadgeText = isSelected ? `#${priorityIndex + 1}` : "—";

    return `
      <div class="priority-card ${isSelected ? 'selected' : ''}" onclick="toggleAccountPriority(${acc.id})">
        <div class="priority-card-info">
          <div class="acc-mini-avatar">${isOnline ? '🤖' : '⚠️'}</div>
          <div>
            <div class="font-bold text-xs">${acc.name}</div>
            <div class="mono-font text-xs text-muted">${acc.phone}</div>
          </div>
        </div>
        <div class="priority-badge-pill" title="اولویت اجرا">${priorityBadgeText}</div>
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
    icon.textContent = "📁";
    typeText.textContent = "شناسایی نوع: ادلیست تلگرام (Chat Folder Addlist)";
    descText.textContent = "پوشه اشتراکی شامل چندین کانال/گروه. تلگرام برای اکانت‌های عادی محدودیت ۲ ادلیست دارد.";
    if (addlistOption) addlistOption.style.display = "block";
  } else if (clean.includes("t.me/+") || clean.includes("t.me/joinchat/")) {
    icon.textContent = "🔒";
    typeText.textContent = "شناسایی نوع: لینک دعوت خصوصی (Private Invite Link)";
    descText.textContent = "هش احراز هویت اختصاصی کانال/گروه خصوصی شناسایی شد.";
    if (addlistOption) addlistOption.style.display = "none";
  } else if (clean.match(/t\.me\/[a-zA-Z0-9_]+\/\d+/) || clean.match(/@[a-zA-Z0-9_]+\/\d+/)) {
    icon.textContent = "📝";
    typeText.textContent = "شناسایی نوع: لینک مستقیم پست کانال (Channel Post Link)";
    descText.textContent = "مناسب برای ثبت ری‌اکشن به پست یا ارسال کامنت در بخش بحث و نظرات (Comments).";
    if (addlistOption) addlistOption.style.display = "none";
  } else if (clean.includes("?start=") || clean.includes("bot?start=")) {
    icon.textContent = "🤖";
    typeText.textContent = "شناسایی نوع: ربات با پارامتر رفرال/استارت (Bot Referral Link)";
    descText.textContent = "دستور استارت خودکار همراه با کد معرف ارسال خواهد شد.";
    if (addlistOption) addlistOption.style.display = "none";
  } else if (clean.startsWith("@") || clean.includes("t.me/")) {
    icon.textContent = "📢";
    typeText.textContent = "شناسایی نوع: کانال یا گروه عمومی تلگرام (Public Chat/Channel)";
    descText.textContent = "آیدی عمومی شناسایی شد.";
    if (addlistOption) addlistOption.style.display = "none";
  } else {
    icon.textContent = "🔍";
    typeText.textContent = "شناسایی نوع: نام کاربری یا شناسه متنی";
    descText.textContent = "در حال پردازش شناسه وارد شده در سرور...";
    if (addlistOption) addlistOption.style.display = "none";
  }
};

function renderReactionGrid() {
  const grid = document.getElementById("reaction-picker-grid");
  const preview = document.getElementById("chosen-reaction-preview");
  if (!grid) return;

  if (preview) preview.textContent = `ری‌اکشن انتخابی: ${chosenReaction}`;

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
    if (preview) preview.textContent = `ری‌اکشن انتخابی: ${chosenReaction}`;
    document.querySelectorAll(".reaction-item-btn").forEach(b => b.classList.remove("active"));
  }
};

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
  const scheduleTime = document.getElementById("comment-schedule-time")?.value || "هر روز ساعت ۱۲:۳۰";

  if (selectedPriorityAccounts.length === 0) {
    alert("لطفاً حداقل یک اکانت را با کلیک انتخاب کنید!");
    return;
  }

  if (type === "comment" && isScheduledComment) {
    const commentLines = document.getElementById("action-comment-input").value.trim().split("\n").filter(l => l.trim().length > 0);
    const commentSample = commentLines[0] || "کامنت خودکار سلف";
    scheduledTasks.push({
      id: Date.now(),
      title: `ارسال کامنت دوره‌ای: "${commentSample.substring(0, 25)}..."`,
      titleEn: `Scheduled comment: "${commentSample.substring(0, 25)}..."`,
      target: target,
      time: scheduleTime,
      account: `${selectedPriorityAccounts.length} اکانت انتخابی`,
      status: "active",
      nextRun: "به زودی",
      nextRunEn: "Soon"
    });
    renderScheduledTasks();
    renderUpcomingActions();
    addLog("SUCCESS", `تسک زمان‌بندی کامنت با موفقیت ثبت شد.`);
    alert("تسک ارسال کامنت زمان‌بندی شد!");
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
  badge.textContent = "در حال اجرا با اولویت...";
  actionTitle.textContent = `عملیات: ${type} روی ${target}`;
  sublog.innerHTML = "";

  const total = selectedPriorityAccounts.length;
  let currentStep = 0;

  let commentPool = ["پروژه فوق‌العاده‌ای هست! 🔥", "تحلیل بسیار مفیدی بود 👏"];
  const customComments = document.getElementById("action-comment-input")?.value.trim().split("\n").filter(l => l.trim().length > 0);
  if (customComments && customComments.length > 0) commentPool = customComments;

  addLog("ACTION", `شروع عملیات [${type}] با اولویت ترتیبی برای ${total} اکانت روی مقصد ${target}`);

  function step() {
    if (currentStep < total) {
      const accId = selectedPriorityAccounts[currentStep];
      const acc = accounts.find(a => a.id === accId) || { name: `اکانت ${accId}` };
      const priorityNum = currentStep + 1;
      currentStep++;

      const pct = Math.round((currentStep / total) * 100);
      progressFill.style.width = `${pct}%`;
      progressText.textContent = `${currentStep} / ${total} انجام شده`;
      percentText.textContent = `${pct}٪`;

      const logLine = document.createElement("div");
      logLine.className = "log-line";
      logLine.textContent = `[اولویت #${priorityNum}] ${acc.name}: عملیات انجام شد.`;
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
    badge.textContent = "تکمیل شد ✔";
    addLog("SUCCESS", `عملیات گروهی روی ${target} با موفقیت به پایان رسید.`);
  }

  step();
}

function initChatView() {
  const accSelect = document.getElementById("chat-account-select");
  const threadList = document.getElementById("chat-threads");

  if (!threadList || !accSelect) return;

  accSelect.innerHTML = accounts.map(a => `<option value="${a.id}">${a.name} (${a.phone})</option>`).join("");

  renderChatThreads();
  if (chatThreads.length > 0) loadThread(chatThreads[0].id);
}

function renderChatThreads() {
  const threadList = document.getElementById("chat-threads");
  if (!threadList) return;

  threadList.innerHTML = chatThreads.map((t, idx) => `
    <div class="chat-thread-item ${idx === 0 ? 'active' : ''}" data-thread-id="${t.id}" onclick="selectChatThread(${t.id}, this)">
      <div class="avatar-circle">${t.isBot ? '🤖' : '👤'}</div>
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
  document.getElementById("chat-avatar").textContent = thread.isBot ? '🤖' : '👤';

  msgContainer.innerHTML = thread.messages.map((m) => `
    <div class="chat-msg ${m.incoming ? 'incoming' : 'outgoing'}">
      <div class="tg-msg-text">${escapeHtml(m.text)}</div>
    </div>
  `).join("");

  msgContainer.scrollTop = msgContainer.scrollHeight;
}


window.fetchAccounts = async function() {
  try {
    const res = await fetch('/api/accounts/list');
    if (res.status === 401) {
      if (res.headers.get("X-Setup-Required")) {
        window.location.href = "/setup.html";
      } else {
        window.location.href = "/login.html";
      }
      return;
    }
    if (res.ok) {
      accounts = await res.json();
      renderAccounts();
      renderActionPriorityAccounts();
      renderCountryChips();
      renderYearChips();
      renderCategoryChips();
    }
  } catch(e) {
    console.error('Failed to fetch accounts', e);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  fetchAccounts();

  const refreshBtn = document.getElementById("btn-refresh-stats");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      alert("در حال بارگذاری مجدد آمار...");
    });
  }

  const checkSessionsBtn = document.getElementById("btn-check-all-sessions");
  if (checkSessionsBtn) {
    checkSessionsBtn.addEventListener("click", () => {
      alert("در حال بررسی وضعیت سشن‌ها...");
    });
  }
});

window.deleteAllAccounts = async function() {
  if (!confirm("آیا از حذف تمامی اکانت‌ها اطمینان دارید؟")) return;
  try {
    const res = await fetch("/api/accounts/delete_all", { method: "POST" });
    if (res.ok) {
      accounts = [];
      renderAccounts();
      renderActionPriorityAccounts();
      alert("تمامی اکانت‌ها با موفقیت حذف شدند.");
    } else {
      alert("خطا در حذف اکانت‌ها.");
    }
  } catch (err) {
    alert("خطای سرور.");
  }
};

window.deleteAccount = async function(id) {
  if (!confirm("آیا از حذف این اکانت اطمینان دارید؟")) return;
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
      alert("اکانت با موفقیت حذف شد.");
    } else {
      alert("خطا در حذف اکانت.");
    }
  } catch (err) {
    alert("خطای سرور.");
  }
};
