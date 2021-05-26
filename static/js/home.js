const serverUrl     = "http://localhost:3000/";
const wrap          = document.querySelector(".wrap");
const title         = document.querySelector("#title");
const balanceIcon   = document.querySelector(".balance-icon");
const submitBtn     = document.querySelector("#submit-btn");
const flashScreen   = document.querySelector(".flash-screen");
const walletAddress = document.querySelector("#wallet-address");
const syncBtn       = document.querySelector("#sync-btn");
const balanceVal    = document.querySelector("#balance-val");
const intro         = document.querySelector(".intro");
const introCard     = document.querySelectorAll(".intro-card");
const loader        = document.querySelector(".loader");

const getData = async param => {
    const path = new URL(param, serverUrl).href;
    const res = await fetch(path);
    return await res.json();
}

const showBalance = async () => {
    try {
        const balance = await getData("/balance");
        balanceVal.innerText = String(balance.balance);
    }
    catch(err) {
        alert(err);
    }
}

const submitForm = async () => {
    try {
        loader.classList.add("active");
        const data = await getData("/transfer");
        loader.classList.remove("active");

        flashScreen.classList.add("active");
        const walletAddressVal = data.walletAddress;
        walletAddress.innerText = walletAddressVal;
        setTimeout(() => {
            flashScreen.classList.remove("active");
            wrap.classList.remove("active");
            intro.classList.add("active");
        }, 3000);

    }
    catch(err) {
        alert(err);
    }
}

const showPoll = e => {
    const target = e.target;
    const split = target.innerText.split(" ");
    split.pop();
    const pollTitle = split.join(" ");

    intro.classList.remove("active");
    wrap.classList.add("active");

    title.innerText = pollTitle;
}

syncBtn.addEventListener('click', showBalance);
submitBtn.addEventListener('click', submitForm);
introCard.forEach(card => card.addEventListener('click', showPoll))

document.addEventListener('DOMContentLoaded', showBalance);
