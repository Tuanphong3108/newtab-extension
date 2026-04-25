chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // Lệnh đóng tab cũ vẫn giữ nguyên nếu bro cần dùng cho mục đích khác
    if (request.action === "BYE_BYE_TAB" && sender.tab) {
        chrome.tabs.remove(sender.tab.id);
    }
    
    // Ghi đè thẳng vào tab hiện tại
    if (request.action === "OPEN_AI" && sender.tab) {
        chrome.tabs.update(sender.tab.id, { url: "chrome://contextual-tasks" });
    }
});