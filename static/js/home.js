const serverUrl     = "http://localhost:3000/";
const title         = document.querySelector("#title");
const balanceIcon   = document.querySelector(".balance-icon");
const submitBtn     = document.querySelector("#submit-btn");
const flashScreen   = document.querySelector(".flash-screen");
const walletAddress = document.querySelector("#wallet-address");

const getData = async param => {
    const path = new URL(param, serverUrl).href;
    const res = await fetch(path);
    return await res.json();
}

const showBalance = async () => {
    try {
        const balance = await getData("/balance");
        title.innerText = String(balance.balance).concat(" POL");
        setTimeout(() => {
            title.innerText = "설문조사";
        }, 2000);
    }
    catch(err) {
        alert(err);
    }
}

const submitForm = async () => {
    try {
        const data = await getData("/transfer");
        flashScreen.classList.add("active");
        const { destAddress } = data;
        walletAddress.innerText = destAddress;
        setTimeout(() => {
            flashScreen.classList.remove("active");
        }, 3000);
    }
    catch(err) {
        alert(err);
    }
}

balanceIcon.addEventListener('click', showBalance);
submitBtn.addEventListener('click', submitForm);
