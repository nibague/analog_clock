
// Clock update script
const hourHand = document.getElementById('hour-hand');
const minuteHand = document.getElementById('minute-hand');
const secondHand = document.getElementById('second-hand');
const display = document.getElementById('display-clock');

function pad(n){ return n < 10 ? '0' + n : n; }

function updateClock(){
    const now = new Date();
    const hours24 = now.getHours();
    const hours = hours24 % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // update textual display (HH:MM:SS) using 24-hour hours for readability
    if(display) display.innerText = `${pad(hours24)}:${pad(minutes)}:${pad(seconds)}`;

    // compute angles
    const hourAngle = (hours + minutes / 60 + seconds / 3600) * 30; // 360/12 = 30
    const minuteAngle = (minutes + seconds / 60) * 6; // 360/60 = 6
    const secondAngle = seconds * 6; // each second = 6 degrees (360/60)

    // apply transforms (keep the translateX used in CSS)
    if(hourHand) hourHand.style.transform = `translateX(-50%) rotate(${hourAngle}deg)`;
    if(minuteHand) minuteHand.style.transform = `translateX(-50%) rotate(${minuteAngle}deg)`;
    if(secondHand) {
        // Remove any transition during the 59->0 second change
        if(seconds === 0) {
            secondHand.style.transition = 'none';
            requestAnimationFrame(() => {
                secondHand.style.transform = `translateX(-50%) rotate(${secondAngle}deg)`;
                requestAnimationFrame(() => {
                    secondHand.style.transition = '';
                });
            });
        } else {
            secondHand.style.transform = `translateX(-50%) rotate(${secondAngle}deg)`;
        }
    }
}

// initialize and start interval
updateClock();
setInterval(updateClock, 1000);


