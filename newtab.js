/**
 * Logic điều hướng thông minh cho New Tab
 * Online: Nhúng iframe để giữ thanh địa chỉ sạch
 * Offline: Nhảy trực tiếp sang trang fallback local
 */

const frame = document.getElementById('mainFrame');
const onlineUrl = "https://tuanphong3108.github.io/newtab/index.html?extension=true";
const offlineUrl = "fallback.html";

function initNewTab() {
    if (navigator.onLine) {
        // Nếu có mạng: Dùng iframe để nhúng trang GitHub
        // Cách này giúp thanh địa chỉ giữ nguyên chrome://newtab
        frame.style.display = "block";
        frame.src = onlineUrl;

        // Dự phòng: Nếu sau 4 giây vẫn không load được (mạng lag/chặn)
        // thì thoát khỏi "vỏ bọc" và nhảy sang fallback luôn
        const fallbackTimer = setTimeout(() => {
            try {
                if (!frame.contentWindow || frame.contentWindow.length === 0) {
                    window.location.replace(offlineUrl);
                }
            } catch (e) {
                // Cross-origin error nghĩa là đã load được trang ngoài thành công
            }
        }, 4000);

        frame.onload = () => clearTimeout(fallbackTimer);
    } else {
        // Nếu không có mạng: Nhảy trực tiếp sang file fallback.html
        window.location.replace(offlineUrl);
    }
}

// Chạy khi DOM sẵn sàng
document.addEventListener('DOMContentLoaded', initNewTab);

// Theo dõi trạng thái mạng
window.addEventListener('online', () => {
    if (window.location.href.includes("newtab.html")) initNewTab();
});

window.addEventListener('offline', () => {
    window.location.replace(offlineUrl);
});


window.addEventListener("message", (event) => {
    // 1. Logic Tự hủy (Giữ nguyên của bro)
    if (event.data === "CLOSE_NEW_TAB") {
        console.log("Phát lệnh tự hủy kép!");

        if (typeof chrome !== 'undefined' && chrome.runtime) {
            chrome.runtime.sendMessage({ action: "BYE_BYE_TAB" });
        }

        if (typeof chrome !== 'undefined' && chrome.tabs) {
            chrome.tabs.getCurrent((tab) => {
                if (tab) {
                    chrome.tabs.remove(tab.id);
                }
            });
        }
    }

    // 2. Logic Mở AI Mode (Thêm mới)
    if (event.data === "OPEN_AI_MODE") {
        console.log("Yêu cầu background mở Chế độ AI...");
        if (typeof chrome !== 'undefined' && chrome.runtime) {
            chrome.runtime.sendMessage({ action: "OPEN_AI" });
        }
    }
});