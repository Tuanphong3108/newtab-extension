/**
 * Logic hiển thị cho trang Fallback Offline
 * Tách riêng để tuân thủ CSP
 */

function updateClock() {
    const clockElement = document.getElementById('clock');
    const dateElement = document.getElementById('date');

    if (!clockElement || !dateElement) return;

    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    clockElement.innerText = `${hours}:${minutes}`;
    
    // Format ngày tháng tiếng Việt thuần túy
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.innerText = now.toLocaleDateString('vi-VN', options);
}

// Cập nhật mỗi giây
setInterval(updateClock, 1000);

// Chạy ngay lần đầu
document.addEventListener('DOMContentLoaded', updateClock);