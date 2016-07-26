'use strict';

var idleTimer; // the 5s timer that checks idleness
window.onload = resetTimer;
document.onmousemove = resetTimer;
document.onkeypress = resetTimer;

function logout() {
    console.log('You are now logged out.');
    //location.href = 'logout.php'
};

function resetTimer() {
    console.log('Realoding timer');
    clearTimeout(idleTimer);
    idleTimer = setTimeout(logout, 5000); // 1000 millisec = 1 sec
};

console.log('\'Allo \'Allo! Content script');
