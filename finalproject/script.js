/* ==========================================
   STAYEASE HOTEL BOOKING - JAVASCRIPT LOGIC
   ========================================== */

// Global state variables to keep track of booking details
let currentRoomPrice = 0;
let currentRoomName = "";

// 1. SELECT ROOM FUNCTIONALITY
function selectRoom(roomName, price) {
    currentRoomName = roomName;
    currentRoomPrice = price;

    // Form input fields ko auto-fill karna
    const roomInput = document.getElementById('selected-room');
    if (roomInput) {
        roomInput.value = roomName;
    }

    // Price ko initial calculation ke mutabiq update karna
    calculateTotalPrice();

    // Smooth scroll karke booking form section par le jana
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// 2. DYNAMIC PRICE CALCULATION
const guestInput = document.getElementById('guest-count');
if (guestInput) {
    guestInput.addEventListener('input', calculateTotalPrice);
}

function calculateTotalPrice() {
    const guests = parseInt(document.getElementById('guest-count').value) || 1;
    const totalPriceElement = document.getElementById('total-price');

    if (currentRoomPrice === 0) {
        totalPriceElement.innerText = "$0";
        return;
    }

    // Simple Calculation Logic: Base Price + ($25 per extra guest after 1 guest)
    const extraGuestCharge = (guests - 1) * 25;
    const finalTotal = currentRoomPrice + extraGuestCharge;

    totalPriceElement.innerText = `$${finalTotal}`;
}

// 3. AVAILABILITY CHECKER FORM SUBMIT
const availabilityForm = document.getElementById('check-availability-form');
if (availabilityForm) {
    availabilityForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Page reload hone se rokna

        const checkin = document.getElementById('checkin').value;
        const checkout = document.getElementById('checkout').value;
        const roomFilter = document.getElementById('room-type-filter').value;

        // Date Validation Logic
        if (new Date(checkin) >= new Date(checkout)) {
            alert("⚠️ Error: Check-Out date hamesha Check-In date ke baad ki honi chahiye!");
            return;
        }

        alert(`🔍 Rooms Available! Hum ne dates check kar li hain. Please niche se apni pasand ka "${roomFilter}" room select karen.`);
        
        // Target rooms area smoothly
        document.getElementById('rooms').scrollIntoView({ behavior: 'smooth' });
    });
}

// 4. RESERVATION FORM SUBMIT & LIVE HISTORY INJECTION
const reservationForm = document.getElementById('reservation-form');
if (reservationForm) {
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Form default submit action rokna

        if (!currentRoomName) {
            alert("❌ Pehle please upar se koi ek Room select karen!");
            return;
        }

        const fullName = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const guests = document.getElementById('guest-count').value;

        // Custom Random Booking ID Generator
        const bookingId = "STE-" + Math.floor(1000 + Math.random() * 9000);

        // History Table ke andar naya data inject karna
        const historyBody = document.getElementById('history-body');
        const newRow = document.createElement('tr');

        newRow.innerHTML = `
            <td>#${bookingId}</td>
            <td>${fullName}</td>
            <td>${currentRoomName}</td>
            <td>Upcoming Stay (${guests} Guests)</td>
            <td><span class="status status-confirmed">Confirmed</span></td>
        `;

        // Nayi row ko table mein sab se upar dikhane ke liye insertBefore use kiya
        historyBody.insertBefore(newRow, historyBody.firstChild);

        // Success Alert Message
        alert(`🎉 Mubarak ho ${fullName}! Aap ki booking successfully confirm ho chuki hy.\nBooking ID: #${bookingId}`);

        // Form reset aur total reset karna
        reservationForm.reset();
        currentRoomPrice = 0;
        currentRoomName = "";
        document.getElementById('total-price').innerText = "$0";

        // Smooth scroll to history section
        document.getElementById('history').scrollIntoView({ behavior: 'smooth' });
    });
}