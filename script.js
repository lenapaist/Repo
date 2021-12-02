"use strict";
let title,
    screens,
    screenPrice,
    rollback = 10,
    adaptive,
    allServicePrices,
    fullPrice,
    servicePercentPrice,
    service1,
    service2;

const isNumber = function (num) {
    if (!/\s/.test(num)) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    }
    return false;
};

const asking = function () {
    title = prompt("Как называется Ваш проект?");

    screens = prompt("Какие типы экранов нужно разработать?");

    do {
        screenPrice = prompt("Сколько будет стоить данная работа?");
    } while (!isNumber(screenPrice));

    adaptive = confirm("Нужен ли адаптив на сайте?");
};

const getAllServicePrices = function () {
    let sum = 0;
    for (let i = 0; i < 2; i++) {
        let price;
        if (i === 0) {
            service1 = prompt("Какой дополнительный тип услуги нужен?");
        } else if (i === 1) {
            service2 = prompt("Какой дополнительный тип услуги нужен?");
        }
        while (!isNumber(price)) {
            price = prompt("Сколько это будет стоить?");
        }
        sum += Number(price);
    }
    return sum;
};

function getFullPrice(screenPrice, allServicePrices) {
    return Number(screenPrice) + Number(allServicePrices);
}

function getTitle() {
    let firstLetter = title.trim().split("")[0].toUpperCase();
    let otherLetter = title.slice(1).toLowerCase();
    let result = firstLetter + otherLetter;
    return result;
}

function getServicePercentPrices() {
    return Math.ceil(fullPrice - fullPrice * (rollback / 100));
}

const showTypeOf = function (variable) {
    console.log(variable, typeof variable);
};

const getRollBackMessage = function (price) {
    if (price > 30000) {
        return "Даем скидку в 10%";
    } else if (price > 15000 && price < 30000) {
        return "Даем скидку в 5%";
    } else if (price > 0 && price < 15000) {
        return "Скидка не предусмотрена";
    } else if (price < 0) {
        return "Что-то пошло не так";
    }
};

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice(screenPrice, allServicePrices);
servicePercentPrice = getServicePercentPrices();

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log("allServicePrices", allServicePrices);
console.log(screens.split(""));
console.log(getRollBackMessage(fullPrice));
console.log(servicePercentPrice);
